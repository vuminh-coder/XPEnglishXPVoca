# XP English & XP Voca - Hệ Thống Học Tiếng Anh Thông Minh AI (Agency Dashboard Tier)

Ứng dụng web nâng cấp toàn diện cho việc học từ vựng, luyện nghe, thi thử trắc nghiệm, tạo lộ trình AI cá nhân hóa và theo dõi thống kê học tập chuyên sâu.

---

## 🎨 Design Tokens & Chuẩn Mực Thiết Kế (Agency Dashboard Tier)

- **Màu Sắc Thương Hiệu Chủ Đạo**: `#0059bb` (Royal XP English Blue)
- **Bảng Màu Phụ Hài Hòa (Tailored Palette)**:
  - **Amber Gold `#f59e0b`**: Huy hiệu Bảng Xếp Hạng Top 1-3, Crown Podium, Điểm danh Streak & Thưởng Vàng.
  - **Emerald `#10b981`**: Thưởng XP, Từ vựng đã lưu (`BookmarkCheck`), Thành tích & Đáp án đúng.
  - **Rose `#f43f5e`**: Cảnh báo, Cán mốc mục tiêu, Lượt thích & Đáp án sai.
  - **Sky `#0284c7`**: Thời gian luyện tập, Bình luận, Tương tác & Trợ lý AI.
  - **Indigo `#6366f1`**: Cấp độ Level, Nhóm học tập chuyên sâu.
- **Tiêu Chuẩn Bo Góc & Spacing (Tuân thủ Quy tắc UI/UX Wadhah Aloui)**:
  - **Rule 10 (Border-Radius Scaling)**: Bo góc bên ngoài Thẻ Card chính `rounded-lg` (8px), phần tử con bên trong `rounded-md` (6px) hoặc `rounded-sm` (4px).
  - **Rule 1 (Loading State)**: Skeleton Loading Cards cho mọi trạng thái async fetch dữ liệu.
  - **Rule 18 (Primary Button)**: Duy nhất 1 nút bấm Primary `#0059bb` nổi bật per view.
- **Chuẩn Mực Biểu Đồ Đường (Line Chart Standard)**:
  - Nét vẽ uốn lượn Bezier siêu mảnh **`1.3px`** (`strokeWidth="1.3"`).
  - **Dynamic Y-Axis Scaling**: Tự động co giãn trục Y theo điểm cao nhất của học viên (`Math.max(maxVal, defaultMax)`), triệt tiêu lỗi tràn/vỡ nét vẽ khỏi khung.
  - Tương tác **Hover-Only Tooltip**: Chấm tròn và hộp thông tin floating chỉ xuất hiện khi di chuột vào mốc ngày.
- **Tối Ưu Hiệu Năng Full-Stack**:
  - **0ms Optimistic UI Updates**: Cập nhật tức thì điểm XP, Số phút học, Từ vựng đã lưu, Điểm danh, Thích, Đăng bài & Bình luận.
  - Đồng bộ liên tục giữa Zustand State, LocalStorage và Cơ sở dữ liệu PostgreSQL via Prisma ORM API.

---

## 🗺️ Danh Mục Các Trang & Routes (`/app`)

### 0. Trang Chủ Landing Page (`/`)
- **`/`**: Trang chào mừng & giới thiệu hệ sinh thái học tập XP English | XP Voca (Thiết kế Agency Dashboard Tier).

### 0.1. Trang Xác Thực (`/login` & `/register`)
- **`/login`**: Trang đăng nhập — Thiết kế Dashboard Micro-Sharp Cards, hỗ trợ Dark Mode.
  - **2-Column Layout**: Cột trái Branding + 4 Feature Cards (3,900+ Từ vựng, Gamification & PvP, AI Tutor 24/7, Listening & Speaking). Cột phải Clerk `<SignIn>` form.
  - **Skeleton Loading**: Dashboard-style solid card skeleton (không kính mờ).
  - **Nền**: `bg-white dark:bg-[#050505]` đồng bộ Dashboard, không blob/glass effects.
  - **Clerk Appearance**: `borderRadius: 0.5rem`, `rounded-lg` cards, `rounded-md` inputs/buttons.
- **`/register`**: Trang đăng ký — Cùng thiết kế với Login, 4 Feature Cards riêng (Miễn phí 100%, Spaced Repetition, Bảng Xếp Hạng, Writing AI).
- **Shared CSS**: `app/(auth)/auth.css` — gộp từ Login.css + Register.css, xóa blob/glass, thêm dark mode.
- **Logo Rule**: Footer Desktop chỉ hiển thị brand text `XP English | XP Voca`, không ảnh mascot.

### 1. Bảng Điều Khiển & Trung Tâm Học Tập (`/dashboard`)
- **`/dashboard`**: Trung tâm chỉ huy học tập toàn diện.
  - **Hero Greeting Bar**: Chào mừng học viên kèm các chỉ số chính (Tối ưu mobile: Ẩn subtext rườm rà `hidden sm:block`, mở rộng nút bấm full-width).
  - **4 Hero Metric Cards**: Chuỗi Streak (`Flame`), Thời gian luyện tập (`Clock`), Từ vựng đã lưu (`BookmarkCheck`), Cấp độ XP (`Target`).
  - **Lộ Trình Hôm Nay**: Nhiệm vụ bài học cá nhân hóa gọi từ API `GET /api/study-plan/current` (Giới hạn `line-clamp-2` tiêu đề bài học trên mobile).
  - **Phút Luyện Tập 7 Ngày**: Biểu đồ đường mỏng 1.5px uốn mượt 7 ngày gần nhất & Hàng tab kỹ năng cuộn mượt `overflow-x-auto`.
  - **Điểm Danh Tuần Này**: Lộ trình 7 nút kết nối fluid. Nút **"🔥 Điểm danh ngay (+15 XP)"** tự động đưa xuống hàng full-width trên mobile, bấm thưởng +15 XP, +20 Vàng, +5m học và sync ngầm về Database.
  - **Hỏi Đáp AI Tutor Nhanh**: Ô nhập thắc mắc ngữ pháp/từ vựng nâng tap-target `h-10` chuẩn di động, nhận lời giải từ AI Tutor và cộng ngay +10 XP.
  - **Phím Tắt Nhanh (Quick Actions Grid)**: Lưới 2x2 siêu gọn trên mobile nhờ ẩn subtext badge phụ (`hidden sm:block`), giữ icon & tiêu đề nổi bật.

### 2. Thống Kê & Phân Tích Chuyên Sâu (`/analytics`)
- **`/analytics`**: Trang phân tích thành tích học tập chuẩn Dashboard Agency.
  - **5 Bento Metric Cards**: Chuỗi dài nhất, Từ đã lưu, Thời gian luyện tập, Tổng XP, Thứ hạng tuần.
  - **6-Month Heatmap Matrix**: Ma trận đóng góp 24 tuần (6 tháng), căn chỉnh chuẩn mốc tháng và nhãn ngày `Mon`, `Wed`, `Fri`.
  - **Bộ Lọc Kỹ Năng Shared Pill Switcher**: Chuyển đổi linh hoạt giữa Dictation, Shadowing, Nói, Từ vựng, Viết.
  - **2 Biểu Đồ Đường Đặt Song Song Trong 1 Khung Thẻ Trắng**:
    - Biểu đồ **Phút luyện tập** (Màu Xanh `#0059bb`).
    - Biểu đồ **XP kiếm được** (Màu Xanh Ngọc `#10b981`).
    - Nét uốn siêu mảnh `1.3px`, tự động co giãn trục Y không tràn màn hình, di chuột hover xem tooltip.

### 3. Lộ Trình Học Cá Nhân Hóa AI (`/roadmap`)
- **`/roadmap`**: Lộ trình học từ A1 tới C1 thiết kế theo mô hình Bento Grid 3/4 + 1/4.
  - **Modal Chọn Mục Tiêu 2 Bước**: Chọn mục tiêu (TOEIC, IELTS, Giao tiếp) và Cấp độ hiện tại.
  - **Checklist Chặng Đường & Bài Học**: Lịch học phân bố theo từng tuần kèm trạng thái Hoàn thành / Đang học / Khóa.
  - **Full-Stack Persistence**: Lưu và đồng bộ mục tiêu ngầm qua API `/api/study-plan/current`.

### 4. Bảng Xếp Hạng & Cộng Đồng (`/community`)
- **`/community/leaderboard`**: Bảng vinh danh chiến binh XP English.
  - **Spotlight Hero Banner**: Gradient Xanh Hoàng Gia sang trọng kèm đồng hồ đếm ngược reset tuần.
  - **Bộ 3 Thẻ Podium 3D Top 1-3**: Vàng #1, Bạc #2, Đồng #3 thiết kế huy hiệu metallic nổi bật.
  - **Danh Sách Hạng 4-50**: Stream danh sách học viên kèm highlight vị trí của bạn.
  - **Thanh Điều Hướng Thông Minh**: Nút **`[ ← Quay lại trang Thống kê ]`** CHỈ hiển thị khi học viên truy cập từ `/analytics?from=analytics`.
- **`/community`**: Bảng tin mạng xã hội học tập (đăng bài +20 XP, thích, bình luận, Optimistic UI 0ms).
- **`/community/friends`**: Quản lý bạn bè, tìm kiếm học viên API `/api/friends/search`.
- **`/community/groups`**: Câu lạc bộ & Nhóm học tập (Khởi tạo nhóm Cấp 15+).

### 5. Học Từ Vựng & Luyện Nghe (`/vocabulary` & `/listening`)
- **`/vocabulary`**: Kho 3,900+ từ vựng phân theo chủ đề (TOEIC, IELTS, VSTEP, Giao tiếp).
  - **Mobile Layout Optimize**: Ô tìm kiếm nổi bật ngay dưới Mobile Header Bar không bị lấp khuất, ẩn subtext rườm rà `hidden sm:block`.
  - **4 Bento Stats Cards**: Format gọn 1 hàng (`12 từ/ngày`, `8 phút/buổi`, `86% SRS`), không bị rớt chữ.
  - **Theme Cards Grid**: Thu nhỏ độ cao thẻ 35% trên mobile, gộp Icon + Title trên 1 hàng flex ngang, gộp Độ khó & Tiến trình trên 1 hàng chân thẻ. Căn giữa nút "Khám phá thêm" full-width trên mobile.
- **`/vocabulary/[id]`**: Thẻ học Flashcard thông minh, tích hợp âm thanh & lưu từ yêu thích (`toggleFavorite`).
- **`/listening`**: Phòng luyện nghe Dictation & Shadowing chuẩn audio.

- **`/study/practice`**: Phòng luyện tập 4 kỹ năng (Quiz, Flashcard 3D, Writing, Speaking AI).
  - **Mobile Layout Optimize**: Ẩn phụ đề rườm rà `hidden sm:block`, rút gọn tên 4 tab chế độ trên mobile (`Quiz`, `Flashcard`, `Writing`, `Nói AI`) kèm cuộn mượt `overflow-x-auto`.
  - **Khung Thẻ Câu Hỏi & Đáp Án**: Tối ưu padding `p-3 sm:p-4`, hiển thị vừa trọn 1 màn hình di động không rớt dòng. Nút "Câu tiếp theo" căn giữa full-width trên mobile.
- **`/study/pvp`**: Đấu trường so tài từ vựng PvP Realtime (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Banner**: Gradient Xanh Hoàng Gia sang trọng kèm hiệu ứng ánh kim.
  - **Bento Grid 7/12 & 5/12**: Cột trái lựa chọn 3 chế độ (Trắc nghiệm, Đồ chữ, Âm thanh) và 3 cấp độ (Dễ, Trung bình, Khó). Cột phải hiển thị Hồ sơ Đấu sĩ & Bảng Vàng Top 3 Đấu Trường.
  - **Trận Đấu PvP 1v1**: Giao diện đấu thời gian thực sắc nét, đồng hồ đếm ngược, AI thông minh và báo cáo kết quả thưởng XP.
- **`/ai/tutor`**: Gia sư AI 1-1 hỗ trợ hội thoại 4 kỹ năng (FreeTalk, Roleplay, Drill).
  - **Mobile Layout Optimize**: Ẩn subtext rườm rà `hidden sm:block`, đưa 3 tab chế độ (FreeTalk, Roleplay, Drill) thành thanh tab 3 cột full-width 100% trên mobile.
  - **Thanh Nhập Liệu & Gợi Ý AI**: Cấu trúc bộ input `[🎙️ Mic] [Input Text] [🚀 Gửi]` thành 1 khối compact 1 hàng ngang, các câu gợi ý phản hồi nhanh dạng danh sách dọc 100% width.
- **`/ai/conversation`**: Phòng hội thoại giao tiếp tiếng Anh AI.
- **`/profile`**: Hồ sơ cá nhân học viên (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Profile Banner**: Gradient Xanh Hoàng Gia sang trọng (`from-[#0059bb] via-[#004799] to-[#002b5b]`), vành khung Avatar danh hiệu nổi bật (`🎓`, `👑`, `🛡️`), huy hiệu Cấp độ `LV.x`, số ngày Streak rực rỡ và số dư Vàng live.
  - **4 High-Contrast Bento Metric Cards**: Từ vựng tích lũy (`BookOpen`), Chuỗi Streak (`Flame`), Kinh nghiệm XP & Level (`Zap`), Vàng & Bảo Hộ Streak (`Coins`).
  - **Bento Grid 8/12 & 4/12**:
    - **Cột Trái (8/12)**: Mini Skill Activity Meters (Tóm tắt tiến độ 5 kỹ năng *Từ vựng*, *Viết*, *Nói*, *Dictation*, *Shadowing*), Kho Huy Hiệu Thành Tích với bộ lọc tab (*Tất cả*, *Đã đạt*, *Chưa mở*), Tủ Vật Phẩm Trang Bị & Trang Phục Cử Nhân (`🎓 Cú Tốt Nghiệp`).
    - **Cột Phải (4/12)**: Phân tích Cấp độ & Danh hiệu tiến bước, Lối tắt ứng dụng đến Thống Kê, Đấu Trường PvP, Cửa Hàng Shop và Bảng Xếp Hạng.
  - **Form Cài Đặt Hồ Sơ Mượt Mà**: Trượt mở với Framer Motion, nhãn ngoài float label (Rule 6), nút Primary "Lưu thay đổi" (Rule 18 & 19).
- **`/shop`**: Cửa hàng Gamification & Vật phẩm ảo (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Banner**: Gradient Xanh Hoàng Gia sang trọng tích hợp Widget hiển thị số Vàng tích lũy realtime.
  - **Bento Grid 7/12 & 5/12**: Cột trái phân loại danh mục (Vật phẩm hỗ trợ, Trang phục Avatar) với các thẻ vật phẩm sắc nét (`Bảo Hộ Lửa`, `Nhân Đôi XP`, `Cú Tốt Nghiệp`). Cột phải hiển thị Tủ Đồ Cá Nhân & Mẹo Tích Lũy Vàng.
  - **Full-Stack Equip & Purchase**: Mua & trang bị/tháo nón Cú cử nhân trực tiếp sync ngầm với PostgreSQL API `/api/shop/purchase` và `/api/shop/equip`.

---

## ⚡ Danh Mục API Routes Backend (`/app/api`)

- **`GET /api/user/analytics`**: Trả về dữ liệu thống kê user & chuỗi dữ liệu 30 ngày cho biểu đồ line chart.
- **`GET /api/user/profile` & `POST /api/user/profile`**: Lấy & cập nhật thông tin user (Streak, XP, Phút học, Từ đã lưu).
- **`GET /api/user/vocab` & `POST /api/user/vocab`**: Đồng bộ từ vựng đã học & danh sách từ bookmark yêu thích với PostgreSQL DB.
- **`GET /api/leaderboard`**: Lấy danh sách Top 50 Bảng xếp hạng tuần (Indexed query <10ms).
- **`GET /api/study-plan/current` & `POST /api/study-plan/create`**: Tạo & truy vấn lộ trình học AI của học viên.
- **`POST /api/ai/chat`**: API xử lý hỏi đáp nhanh với AI Tutor.
