"use client";
import React from "react";
import { YouTubeVideoItem } from "@/stores/videoStore";
import { VideoCardItem } from "../shared/VideoCardItem";

export interface PlaylistTabPaneProps {
  savedVideos: YouTubeVideoItem[];
  activeVideo: YouTubeVideoItem;
  onSelectVideo: (video: YouTubeVideoItem) => void;
}

export function PlaylistTabPane({
  savedVideos,
  activeVideo,
  onSelectVideo,
}: PlaylistTabPaneProps) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block pb-1">
        DANH SÁCH BÀI HỌC CỦA BẠN ({savedVideos.length})
      </span>

      {savedVideos.map((vid) => (
        <VideoCardItem
          key={vid.id}
          video={vid}
          variant="playlist"
          isActive={activeVideo.id === vid.id}
          onSelectVideo={onSelectVideo}
        />
      ))}
    </div>
  );
}
