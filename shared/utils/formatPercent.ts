export interface FormatPercentOptions {
  /** Số chữ số thập phân tối đa (mặc định: 0 - lấy phần nguyên) */
  decimals?: number;
  /** Lược bỏ số 0 thừa ở cuối hay không (mặc định: true -> 50%, 12.5%; false -> 50.00%, 12.50%) */
  trimZero?: boolean;
  /** Phương thức lấy giá trị: 'floor' (lấy phần nguyên) hoặc 'round' (làm tròn số nguyên) (mặc định: 'floor') */
  mode?: "floor" | "round";
}

/**
 * Định dạng phần trăm hiển thị. Mặc định chỉ lấy phần nguyên (0 chữ số thập phân).
 * An toàn tuyệt đối với NaN, Infinity, số âm và giá trị vượt 100.
 */
export function formatPercent(
  value: number,
  options?: FormatPercentOptions
): string {
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    return "0%";
  }
  const decimals = options?.decimals ?? 0;
  const trimZero = options?.trimZero ?? true;
  const mode = options?.mode ?? "floor";
  const clamped = Math.min(100, Math.max(0, value));

  if (decimals === 0) {
    const intVal = mode === "round" ? Math.round(clamped) : Math.floor(clamped);
    return `${intVal}%`;
  }

  if (trimZero) {
    const factor = Math.pow(10, decimals);
    const rounded = (mode === "floor" ? Math.floor(clamped * factor) : Math.round(clamped * factor)) / factor;
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
