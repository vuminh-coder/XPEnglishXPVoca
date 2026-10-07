import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng Học Trực Tuyến (Study Rooms)",
  description:
    "Phòng tự học tập trung Pomodoro cùng cộng đồng, đồng bộ thời gian thực, bảng xếp hạng năng suất và âm thanh tập trung thư giãn.",
};

export default function StudyRoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
