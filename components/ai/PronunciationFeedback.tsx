export default function PronunciationFeedback({ score }: { score: number }) {
  return (
    <div className="p-3 bg-green-50 text-green-700 rounded-xl text-xs font-bold text-center">
      Điểm phát âm chuẩn: {score}/100
    </div>
  );
}