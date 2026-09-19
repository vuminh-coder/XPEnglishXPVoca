export interface FormatPercentOptions {
  /** Số chữ số thập phân tối đa (mặc định: 2) */
  decimals?: number;
  /** Lược bỏ số 0 thừa ở cuối hay không (mặc định: true -> 50%, 12.5%; false -> 50.00%, 12.50%) */
  trimZero?: boolean;
}

/**
 * Định dạng phần trăm hiển thị với tối đa 2 chữ số thập phân.
 * An toàn tuyệt đối với NaN, Infinity, số âm và giá trị vượt 100.
 */
export function formatPercent(
  value: number,
  options?: FormatPercentOptions
): string {
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    return "0%";
  }
  const decimals = options?.decimals ?? 2;
  const trimZero = options?.trimZero ?? true;
  const clamped = Math.min(100, Math.max(0, value));

  if (trimZero) {
    const factor = Math.pow(10, decimals);
    const rounded = Math.round(clamped * factor) / factor;
    return `${rounded}%`;
  }

  return `${clamped.toFixed(decimals)}%`;
}

/**
 * Làm tròn giá trị phần trăm kiểu số (number) về tối đa N chữ số thập phân.
 * Dùng cho cả tính toán CSS width và logic tính điểm.
 */
export function roundPercent(value: number, decimals: number = 2): number {
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    return 0;
  }
  const clamped = Math.min(100, Math.max(0, value));
  const factor = Math.pow(10, decimals);
  return Math.round(clamped * factor) / factor;
}
