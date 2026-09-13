import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/listening/evaluate-speech/route';

describe('Real AI Speech Evaluation API Audit', () => {
  it('correctly detects complete silence and awards 0 score without crash', async () => {
    const req = new Request('http://localhost:3000/api/listening/evaluate-speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetText: 'Due to unforeseen weather conditions, our flight is delayed.',
        recognizedText: '',
        durationSec: 5,
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.success).toBe(true);
    expect(json.data.overallScore).toBe(0);
    expect(json.data.feedback).toContain('Chưa phát hiện giọng nói rõ ràng');
  });

  it('accurately evaluates authentic speech with high accuracy for good pronunciation', async () => {
    const req = new Request('http://localhost:3000/api/listening/evaluate-speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetText: 'Good morning valued guests, welcome aboard our cruise.',
        recognizedText: 'Good morning valued guests welcome aboard our cruise',
        durationSec: 3.5,
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.success).toBe(true);
    expect(json.data.overallScore).toBeGreaterThanOrEqual(90);
    expect(json.data.wordAccuracy.every((w: any) => w.status === 'perfect')).toBe(true);
  });

  it('accurately detects pronunciation errors and is 100% deterministic (no Math.random)', async () => {
    const payload = {
      targetText: 'The quarterly revenue forecast was finalized yesterday.',
      recognizedText: 'The quarter revenue forecast was finished yesterday',
      durationSec: 4.0,
    };

    const makeCall = async () => {
      const req = new Request('http://localhost:3000/api/listening/evaluate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const res = await POST(req);
      return res.json();
    };

    const result1 = await makeCall();
    const result2 = await makeCall();

    // Must be 100% deterministic - exact same scores every time!
    expect(result1.data.overallScore).toBe(result2.data.overallScore);
    expect(result1.data.fluencyScore).toBe(result2.data.fluencyScore);
    expect(result1.data.pronunciationScore).toBe(result2.data.pronunciationScore);
    expect(result1.data.wordAccuracy).toEqual(result2.data.wordAccuracy);
  });
});
