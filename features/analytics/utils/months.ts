const SHORT_MONTHS = [
  "Thg 1",
  "Thg 2",
  "Thg 3",
  "Thg 4",
  "Thg 5",
  "Thg 6",
  "Thg 7",
  "Thg 8",
  "Thg 9",
  "Thg 10",
  "Thg 11",
  "Thg 12",
];

/** 6 tháng cuộn gần nhất (cũ → mới), mỗi tháng chiếm 4 tuần trên ma trận hoạt động. */
export function getRollingMonthList(today: Date = new Date()) {
  const list: { name: string; startIndex: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    list.push({ name: SHORT_MONTHS[d.getMonth()], startIndex: (5 - i) * 4 });
  }
  return list;
}
