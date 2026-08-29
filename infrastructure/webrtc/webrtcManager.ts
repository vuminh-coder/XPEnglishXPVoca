/**
 * WebRTC Mesh Manager for Multi-User Voice Channels
 * Manages RTCPeerConnections, ICE candidates, and SDP negotiation.
 */

export interface PeerConnectionConfig {
  roomId: string;
  userId: string;
  onRemoteTrack?: (peerId: string, stream: MediaStream) => void;
  onPeerLeave?: (peerId: string) => void;
}

export class WebRTCManager {
  private roomId: string;
  private userId: string;
  private localStream: MediaStream | null = null;
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private remoteStreams: Map<string, MediaStream> = new Map();
  private onRemoteTrackCallback?: (peerId: string, stream: MediaStream) => void;
  private onPeerLeaveCallback?: (peerId: string) => void;
  private pollingInterval: NodeJS.Timeout | null = null;

  private rtcConfig: RTCConfiguration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
    ],
  };

  constructor(config: PeerConnectionConfig) {
    this.roomId = config.roomId;
    this.userId = config.userId;
    this.onRemoteTrackCallback = config.onRemoteTrack;
    this.onPeerLeaveCallback = config.onPeerLeave;
  }

  public setLocalStream(stream: MediaStream) {
    this.localStream = stream;
    // Add local tracks to existing peer connections
    this.peerConnections.forEach((pc) => {
      stream.getTracks().forEach((track) => {
        const senders = pc.getSenders();
        const existingSender = senders.find((s) => s.track?.kind === track.kind);
        if (!existingSender) {
          pc.addTrack(track, stream);
        }
      });
    });
  }

  public createPeerConnection(targetPeerId: string): RTCPeerConnection {
    if (this.peerConnections.has(targetPeerId)) {
      return this.peerConnections.get(targetPeerId)!;
    }

    const pc = new RTCPeerConnection(this.rtcConfig);
    this.peerConnections.set(targetPeerId, pc);

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        pc.addTrack(track, this.localStream!);
      });
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignal(targetPeerId, { type: "candidate", candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      const stream = event.streams[0] || new MediaStream([event.track]);
      this.remoteStreams.set(targetPeerId, stream);
      this.onRemoteTrackCallback?.(targetPeerId, stream);
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === "disconnected" || pc.iceConnectionState === "failed" || pc.iceConnectionState === "closed") {
        this.closePeer(targetPeerId);
      }
    };

    return pc;
  }

  public async initiateCall(targetPeerId: string) {
    const pc = this.createPeerConnection(targetPeerId);
    const offer = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: false,
    });
    await pc.setLocalDescription(offer);
    await this.sendSignal(targetPeerId, { type: "offer", sdp: offer });
  }

  public async handleSignal(senderPeerId: string, signal: any) {
    let pc = this.peerConnections.get(senderPeerId);
    if (!pc) {
      pc = this.createPeerConnection(senderPeerId);
    }

    if (signal.type === "offer") {
      await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await this.sendSignal(senderPeerId, { type: "answer", sdp: answer });
    } else if (signal.type === "answer") {
      if (pc.signalingState !== "stable") {
        await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
      }
    } else if (signal.type === "candidate") {
      if (pc.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
      }
    }
  }

  private async sendSignal(targetPeerId: string, payload: any) {
    try {
      await fetch(`/api/study-rooms/${this.roomId}/signal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: this.userId,
          targetId: targetPeerId,
          payload,
        }),
      });
    } catch (err) {
      console.error("Error sending WebRTC signal:", err);
    }
  }

  public startSignalPolling() {
    if (this.pollingInterval) return;
    this.pollingInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/study-rooms/${this.roomId}/signal?userId=${this.userId}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.signals)) {
          for (const item of data.signals) {
            await this.handleSignal(item.senderId, item.payload);
          }
        }
      } catch (err) {
        console.error("Signal polling error:", err);
      }
    }, 1500);
  }

  public stopSignalPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  public closePeer(peerId: string) {
    const pc = this.peerConnections.get(peerId);
    if (pc) {
      pc.close();
      this.peerConnections.delete(peerId);
    }
    this.remoteStreams.delete(peerId);
    this.onPeerLeaveCallback?.(peerId);
  }

  public closeAll() {
    this.stopSignalPolling();
    this.peerConnections.forEach((pc) => pc.close());
    this.peerConnections.clear();
    this.remoteStreams.clear();
  }
}
