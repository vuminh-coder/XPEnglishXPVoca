import fs from "fs";

const content = fs.readFileSync("README.md", "utf8");
const lines = content.split("\n");
lines.forEach((line, idx) => {
  if (line.includes("Rewrite The Stars") || line.includes("Kurzgesagt") || line.includes("Bảng Kiểm Kê") || line.includes("Chuẩn Hóa 100% Verbatim")) {
    console.log(`${idx + 1}: ${line}`);
  }
});
