<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI/UX Design Guidelines

These rules are based on Wadhah Aloui's 19 UI/UX rules and MUST be followed for all interface modifications:

1. **Trạng thái tải (Loading):** Dùng Skeleton Loading thay vì spinner cổ điển.
2. **Tìm kiếm / Chọn quốc gia:** Vừa cho gõ từ khóa vừa cho cuộn danh sách.
3. **Khoảng cách nhóm (Spacing):** Nhóm liên quan sát nhau, nhóm không liên quan xa hơn (ví dụ: khoảng cách nhãn-input hẹp hơn khoảng cách giữa các input).
4. **Bộ lọc giá:** Dùng thanh trượt (slider) hai đầu.
5. **Nhất quán phong cách:** Đồng bộ kiểu dáng, bo góc, màu sắc của các nhóm thành phần tương tự.
6. **Nhãn cho ô nhập (Label):** Luôn dùng nhãn ngoài (external label) hoặc float label, không dùng placeholder làm nhãn.
7. **Nội dung dài:** Thêm nút "Read more" để mở rộng văn bản.
8. **Ưu tiên thông tin:** Làm nổi bật số liệu chính bằng kích cỡ lớn và màu nhấn.
9. **Khoảng cách trong lưới (Grid):** Dùng khoảng cách cột và hàng đồng đều, nhất quán.
10. **Bo góc / Hình dạng:** Giảm kích thước bo góc của phần tử con bên trong so với card bên ngoài (ví dụ: `calc(outer_radius - padding)`).
11. **Hướng dẫn nhập liệu (Input mask):** Dùng mask để hướng dẫn định dạng.
12. **Gợi ý trong thanh tìm kiếm:** Điền placeholder chỉ dẫn rõ ràng (ví dụ: "Artists, Albums, Songs...").
13. **Vị trí nút hành động (CTA):** Đặt nút chính ở phần dưới hoặc cạnh dưới màn hình gần vùng ngón tay cái.
14. **Chọn 2–3 giá trị:** Hiển thị trực tiếp các tùy chọn (ví dụ: Yes/No, checkbox), không giấu trong dropdown.
15. **Kiểu ô nhập (Input box):** Dùng khung bao quanh (box border) hoàn chỉnh thay vì chỉ gạch dưới.
16. **Căn chỉnh nội dung:** Căn chỉnh dữ liệu theo đặc thù (mã số căn giữa, văn bản/email căn trái).
17. **Màu sắc ở chế độ tối (Dark mode):** Giảm độ bão hòa (saturation) của các màu nhấn để chống mỏi mắt.
18. **Số lượng nút chính (Primary button):** Chỉ dùng duy nhất một nút primary nổi bật, các nút còn lại là secondary/ghost.
19. **Văn bản trên nút:** Dùng động từ hành động rõ ràng (ví dụ: "Submit", "Cancel", "Confirm") thay vì mơ hồ.

