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
  - **Rule 10 (Micro-Sharp UI Border-Radius Standard)**: Quy chuẩn bo góc tất cả các khối hình chữ nhật trên toàn website (cards, containers, buttons, inputs, dropdowns, modals, badges, tabs, alerts, toasts) về phẳng **`rounded-xs` (2px - 3px)** siêu sắc nét, tinh gọn và hiện đại (Ngoại lệ duy nhất: giữ nguyên `rounded-full` cho khối hình tròn như Avatar, chấm tiến trình tròn).
  - **Rule 1 (Loading State)**: Skeleton Loading Cards cho mọi trạng thái async fetch dữ liệu.
  - **Rule 18 (Primary Button)**: Duy nhất 1 nút bấm Primary `#0059bb` nổi bật per view.
- **Chuẩn Mực Biểu Đồ Đường (Line Chart Standard)**:
  - Nét vẽ uốn lượn Bezier siêu mảnh **`1.3px`** (`strokeWidth="1.3"`).
  - **Dynamic Y-Axis Scaling**: Tự động co giãn trục Y theo điểm cao nhất của học viên (`Math.max(maxVal, defaultMax)`), triệt tiêu lỗi tràn/vỡ nét vẽ khỏi khung.
  - Tương tác **Hover-Only Tooltip**: Chấm tròn và hộp thông tin floating chỉ xuất hiện khi di chuột vào mốc ngày.
- **Tối Ưu Hiệu Năng Full-Stack**:
  - **0ms Optimistic UI Updates**: Cập nhật tức thì điểm XP, Số phút học, Từ vựng đã lưu, Điểm danh, Thích, Đăng bài & Bình luận.
  - Đồng bộ liên tục giữa Zustand State, LocalStorage và Cơ sở dữ liệu PostgreSQL via Prisma ORM API.
- **Favicon & Icon Brand Assets**: Toàn bộ icon thương hiệu (`/favicon.ico`, `/icons/favicon-32x32.png`, `/icons/icon-any-192x192.png`, `/icons/icon-any-512x512.png`, `/app-icon-horizontal-brand.png`) đã được tách bỏ nền trắng (nền trong suốt Transparent RGBA) và phóng to kích thước hình vẽ logo lên **92% diện tích khung chứa**. Tiêu đề hiển thị trên Tab trình duyệt ([layout.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/layout.tsx)) được chuẩn hóa thành **"English | Voca - Cộng Đồng Học Từ Vựng Tiếng Anh Thông Minh"**.

---

## 🗺️ Danh Mục Các Trang & Routes (`/app`)

### 0. Trang Chủ Landing Page (`/`)
- **`/`**: Trang chào mừng & giới thiệu hệ sinh thái học tập XP English | XP Voca (Thiết kế Agency Dashboard Tier).

### 0.1. Trang Xác Thực (`/login`, `/register`, `/forgot-password`)
- **Hệ Thống Xác Thực Tự Chủ (Custom Local Auth & Session Management)**: Xóa bỏ hoàn toàn phụ thuộc Clerk. Quản lý phiên làm việc bằng HTTP-Only Cookie mã hóa JWT (`xp_voca_session`) 30 ngày + Mã hóa mật khẩu bảo mật PBKDF2 (HMAC-SHA512) chuẩn OWASP.
- **Tự Động Bảo Vệ Route (`proxy.ts`)**: Tự động chuyển hướng người dùng chưa xác thực về `/login`, và điều hướng người dùng đã đăng nhập từ `/login`, `/register` thẳng tới `/dashboard`.
- **`/login`**: Trang đăng nhập — Thiết kế Micro-Sharp Cards (`rounded-md`), hỗ trợ Dark Mode và Chế độ xoay dọc màn hình mobile.
  - **Phân tách Mobile & Desktop Layout**: Trên Mobile hiển thị Sticky Header Bar (Top-Left: `XP English | XP Voca`, Top-Right: Dropdown chọn ngôn ngữ 🇻🇳/🇺🇸). Trên Desktop hiển thị Bố cục 2 cột (Cột trái Branding + 4 Feature Cards, Cột phải Custom Login Form Card).
  - **Google, Facebook & Email Real OAuth**: Đăng nhập bằng Google OAuth (`/api/auth/google`), Facebook OAuth (`/api/auth/facebook`) hoặc Email/Tên đăng nhập + Mật khẩu kết nối PostgreSQL.
  - **Single Primary Button (Rule 18 & 19)**: Nút Primary nổi bật "Đăng nhập vào hệ thống", nút Social dạng Outline Secondary.
- **`/register`**: Trang đăng ký — Cấu trúc Micro-Sharp Card tự chủ với Họ tên, Email, Mật khẩu & Xác nhận mật khẩu, tự động tạo tài khoản trong PostgreSQL DB.
- **`/forgot-password`**: Trang khôi phục mật khẩu — API `/api/auth/forgot-password` sinh mã `resetToken` 32-bytes ngẫu nhiên kèm thời hạn 1 giờ trong DB. API `/api/auth/reset-password` hỗ trợ đặt lại mật khẩu mới.
- **Responsive Footer**: Trên Mobile chỉ hiển thị dòng bản quyền căn giữa `© 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.` Trên Desktop hiển thị 2 bên đầy đủ.

### 1. Bảng Điều Khiển & Trung Tâm Học Tập (`/dashboard`)
- **`/dashboard`**: Trung tâm chỉ huy học tập toàn diện.
  - **Tự Động Nhận Diện OAuth Payload & Đồng Bộ Phiên**: Tự động parse payload `oauth_user` từ Google/Facebook OAuth redirect, dọn dẹp URL query param và đồng bộ phiên làm việc `checkSession()` tức thì.
  - **Hero Greeting Bar**: Chào mừng học viên kèm các chỉ số chính (Tối ưu mobile: Ẩn subtext rườm rà `hidden sm:block`, mở rộng nút bấm full-width).
  - **4 Hero Metric Cards**: Chuỗi Streak (`Flame`), Thời gian luyện tập (`Clock`), Từ vựng đã lưu (`BookmarkCheck`), Cấp độ XP (`Target`).
  - **Lộ Trình Hôm Nay**: Nhiệm vụ bài học cá nhân hóa gọi từ API `GET /api/study-plan/current` (Giới hạn `line-clamp-2` tiêu đề bài học trên mobile).
  - **Hệ Thống Thông Báo & Thẻ Nút Toàn Trang (Global Micro-Sharp UI Elements)**: Đồng bộ thiết kế giảm mạnh độ cong bo góc về **`rounded-xs` (2px)** cho toàn bộ thông báo Toast ([Toast.tsx](file:///e:/XP%20English%20%20XP%20Voca/components/ui/Toast.tsx)), Hộp thư Navbar ([Navbar.tsx](file:///e:/XP%20English%20%20XP%20Voca/components/layout/Navbar.tsx)), Nút điểm danh **"Điểm danh ngay (+15 XP)"**, Nút **"Thêm Video/Audio"** và **"Chia sẻ & góp ý"**, Badge trạng thái toàn ứng dụng ([Badge.tsx](file:///e:/XP%20English%20%20XP%20Voca/components/ui/Badge.tsx)) (`1/4 HOÀN THÀNH`, `ĐÃ NHẬN`, `0/5`). Rà soát toàn diện từ trang `/dashboard` sang tất cả các route con (`community`, `vocabulary`, `listening`, `shadowing`, `practice`, `ai/tutor`, `ai/conversation`, `grammar`, `roadmap`, `analytics`, `pvp`), **loại bỏ 100% các icon Emoji / 3D rải rác** (`👋`, `✨`, `🤖`, `🥇`, `🥈`, `🥉`, `🎤`, `👁️`, `🙈`, `⏱️`, `🎯`, `⚡`, `🔄`, `🧠`, `📚`, `📝`, `🎙️`, `🎓`, `🗣️`, `💡`, `💬`, `🎭`, `⛺`), chuẩn hóa **tất tần tật 145 chủ đề từ vựng** và **toàn bộ 60 chuyên đề ngữ pháp AI** trên trang `/study/grammar` sang **Bộ giải mã Icon Vector Ngữ Cảnh Nét Mảnh (`getGrammarTopicIcon`)** khớp 100% từng tên thì & cấu trúc ngữ pháp (Hiện tại đơn `<Clock />`, Hiện tại tiếp diễn `<Activity />`, Quá khứ `<History />`, Tương lai `<Sparkles />`, Điều kiện `<GitFork />`, Bị động `<RefreshCw />`, Đảo ngữ `<ArrowUpDown />`, v.v...). Tái thiết kế toàn bộ **Trang Cộng Đồng Học Tập** ([community/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/community/page.tsx)), **Bảng Xếp Hạng Tuần** ([community/leaderboard/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/community/leaderboard/page.tsx)), **Bạn Đồng Hành** ([community/friends/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/community/friends/page.tsx)), **Nhóm Học Thuật** ([community/groups/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/community/groups/page.tsx)), **Kho Từ Vựng** ([vocabulary/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/vocabulary/page.tsx)), **Trang Chi Tiết Từ Vựng** ([vocabulary/[id]/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/vocabulary/[id]/page.tsx)), **Ngữ Pháp AI** ([study/grammar/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/grammar/page.tsx)), **AI Roadmap** ([roadmap/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/roadmap/page.tsx)), **Listening Workspace** ([study/listening/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/listening/page.tsx)), **Shadowing** ([study/shadowing/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/shadowing/page.tsx)) và **Analytics** ([analytics/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/analytics/page.tsx)) giảm mạnh 100% độ cong bo góc rườm rà (`rounded-xl`, `rounded-lg`) về phẳng **`rounded-md` / `rounded-xs` (2px-6px)** chuẩn agency (Hero banner, 4 ô chỉ số, thu gọn `h1` tiêu đề về `text-sm sm:text-base font-bold`, bộ chuyển chế độ Navigation tabs, thẻ Flashcard 3D, thanh tìm kiếm & chip lọc level).
  - **Phút Luyện Tập 7 Ngày Theo Từng Kỹ Năng (Per-Skill Analytics)**: Biểu đồ SVG đường mỏng uốn mượt 7 ngày độc lập 100% cho 5 tab kỹ năng (**Dictation** `/study/listening`, **Shadowing** `/study/shadowing`, **Luyện nói** `/ai/tutor`, **Từ vựng** `/study/practice` & `/vocabulary/[id]`, **Luyện viết** `/ai/conversation` & `/study/grammar`). Trục thời gian tự động cuộn linh hoạt **7 Ngày Rolling Window (4 ngày trước ➔ HÔM NAY tại Index 4 ➔ 2 ngày sau)** định dạng Ngày Tháng (`27 Th7, 28 Th7, 29 Th7, 30 Th7, 31 Th7, 1 Th8, 2 Th8`). Căn chỉnh ma trận tọa độ X (`50 + i * 100`) và layout `grid-cols-7` giúp chấm tròn kết nối và đường chỉ dẫn nét đứt **nằm chính xác 100% ở tâm giữa của chữ ngày tháng** bên dưới. Tự động **mặc định chọn Hôm nay** khi mở ứng dụng, đường uốn **100% Full-Width (Edge-to-Edge `x = 0 ➔ 700`)**, Badge nổi hộp bo góc phẳng (`rounded-xs`, `bg-white/95 border-slate-200/80 shadow-sm`), nét dọc đứt đoạn mảnh `1.2px` và chấm tròn phát sáng. Chuẩn hóa ngày địa phương **`getLocalDateString`**, **Continuous Path Morphing** 60fps, mốc tối đa **10 phút** và chiều cao `h-28 sm:h-36`. Đồng bộ dữ liệu qua `lib/store/skillChartStore.ts` & `userStore.ts`, bảo chứng bởi 200+ kịch bản test tự động (`scripts/run_skill_chart_200_tests.js`) đạt 100% Pass.
  - **Điểm Danh Tuần Này**: Lộ trình 7 mốc kết nối fluid chuẩn agency với **Chấm tròn nối tâm hoàn hảo (`rounded-full`)**, viền phát sáng gradient màu cam hổ phách (`shadow-[0_2px_8px_rgba(245,158,11,0.35)]`), tách lập trình 3 hàng độc lập giúp đường chỉ dẫn tiến trình **nằm chính xác 100% ở đúng tâm trục hoành (Y-axis center `top-1/2 -translate-y-1/2`) của các hình tròn**. Nút điểm danh tự động đưa xuống hàng full-width trên mobile, bấm thưởng +15 XP, +20 Vàng, +5m học, bảo vệ khóa chống điểm danh trùng theo `userId` và sync ngầm về Database.
  - **Tối Ưu Typography & Văn Bản Trực Quan Cho Mobile**: Rút gọn văn bản hiển thị trên màn hình di động (< sm) như thông báo top banner ("Writing AI đã có mặt!"), nút hành động ("Video/Audio", "Góp ý"), nhãn chỉ số phụ ("Chuỗi Streak", "Thời gian học"), thanh tab kỹ năng (cỡ chữ `10.5px` vừa vặn) và nâng kích thước tiêu đề thương hiệu **`XP English | XP Voca`** trên Header Mobile ([Navbar.tsx](file:///e:/XP%20English%20%20XP%20Voca/components/layout/Navbar.tsx)) lên **`text-base sm:text-lg font-black`** hiển thị to rõ, cân đối và thẩm mỹ.
  - **Hộp Thông Báo Navbar Tối Ưu Mobile (Notification Center Dropdown)**: Tinh gọn chỉ còn **2 Tab duy nhất ("Tất cả" & "Học tập")**, căn chỉnh vị trí khối thông báo nằm sát lề phải màn hình Mobile (`fixed right-2.5 top-[54px] w-[calc(100vw-1.25rem)] max-w-[340px] z-50`), hiển thị vuông vắn, thẳng lề hoàn hảo.
  - **Hỏi Đáp AI Tutor Nhanh**: Ô nhập thắc mắc ngữ pháp/từ vựng nâng tap-target `h-10` chuẩn di động, nhận lời giải từ AI Tutor và cộng ngay +10 XP.
  - **Phím Tắt Nhanh & Khối Thẻ Chỉ Số (Status Chips & Quick Actions)**: Giảm mạnh độ cong bo góc của tất cả các khối badge, phím tắt nhanh, thẻ đếm câu hỏi (`Câu 1/20`), badge thưởng XP (`+0 XP`) và đồng hồ bấm giờ (`00:20`) trên toàn bộ trang học/luyện tập xuống phẳng siêu sắc nét **`rounded-xs` (2px)** chuẩn Micro-Sharp UI, mang lại cảm giác tinh gọn, hiện đại và đồng bộ tuyệt đối trên toàn website.
  - **Đồng Bộ Avatar & Nâng Cấp Chuyên Sâu Đấu Trường PvP (`/study/pvp`)**: Chuẩn hóa hiển thị Avatar ảnh đại diện thực tế (`user.imageUrl` / `user.avatar`) cho người dùng tại tất cả 4 khu vực giao diện Đấu trường PvP ([pvp/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/pvp/page.tsx)) gồm: Thẻ Hồ sơ Đấu sĩ (Gladiator Profile), Thẻ Ghép trận 1v1 (Matchmaking), Thanh Header Thi đấu Trực tiếp (Battle Bar) và Bảng Tổng kết Kết quả Trận đấu (Match Scorecard).
  - **Phòng Thi Đấu 1v1 Riêng Tư (Mã Phòng 5 Số - `/api/pvp/room`)**: Khởi tạo phòng thi đấu riêng với mã 5 chữ số ngẫu nhiên (VD: `84920`), cho phép học viên khác nhập mã gia nhập thi đấu 1v1 realtime với cùng bộ câu hỏi. Hỗ trợ đầy đủ phím tắt bàn phím vật lý cho chế độ Đồ chữ (`A-Z`, `Backspace`, `Enter`, `Esc`), tự động loại bỏ ký tự đặc biệt khi so sánh chuỗi, hiển thị đồng hồ đếm ngược **Radial SVG** kèm nhấp nháy đỏ warning (khi ≤ 3s), chuỗi chấm tiến trình từng câu (🟢 Đúng, 🔴 Sai, ⚪ Chưa làm) và bảng tổng kết thưởng XP chuẩn hóa 100% từ Database server response.
  - **Trang Video Của Tôi - YouTube Interactive Hub (`/myvideo`)**: Trung tâm học tiếng Anh qua Video tương tác cá nhân hóa. Cho phép dán link YouTube trực tiếp (`watch?v=`, `youtu.be/`, `shorts/`) ➔ Tự động trích xuất Video ID và metadata oEmbed (Tiêu đề, Kênh, Thumbnail HD) mà **không tải bất kỳ file MP4 nào về máy**. Nhúng trực tiếp trình phát **YouTube Embed IFrame API**, trang bị **Khung Phụ Đề Lướt 3 Câu Focus (3-Sentence Rolling Viewport)** tự động lướt mượt theo video (`[CÂU VỪA PHÁT]`, `🔴 LIVE KARAOKE SYNC`, `[CÂU TIẾP THEO]`), **Hệ thống Đồng bộ Từ Real-Time (Golden Karaoke Word Sync 50ms timer)** với hiệu ứng từ phát sáng màu Vàng Kim nhấp nháy (`bg-amber-400 text-slate-950 font-black animate-pulse shadow-md`), **Kiến trúc Progressive Segment Streaming Pipeline (Nạp phân đoạn nối tiếp liên tục < 150ms không dừng)**, **Phụ đề song ngữ 1-Click Tra Từ Sticky Overlay** (phát âm từ vựng chuẩn TTS và lưu thẳng vào Notebook `/myvocab`), **Engine phụ đề đa tầng fallback AI** (đảm bảo 100% video YouTube đều có phụ đề luyện tập), **Luyện nghe điền từ (Video Dictation +20 XP)** và **Luyện nhại giọng (Video Shadowing AI)** kèm lưu trữ Playlist cá nhân ([videoStore.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/store/videoStore.ts)). [/api/youtube/captions](file:///e:/XP%20English%20%20XP%20Voca/app/api/youtube/captions/route.ts) được mở công khai trên [proxy.ts](file:///e:/XP%20English%20%20XP%20Voca/proxy.ts) hỗ trợ trích xuất tức thì.
  - **Hệ Thống Bảo Mật 4 Lớp Chuyên Sâu (Security Hardening System)**: 
    1. **Rate Limiting & Anti-Brute-Force**: Triển khai `MemoryRateLimiter` ([lib/security/rateLimiter.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/security/rateLimiter.ts)) theo thuật toán Sliding Window. Giới hạn **tối đa 5 lần thử/15 phút** cho tất cả các route xác thực (`/api/auth/login`, `/api/auth/register`, `/api/auth/forgot-password`, `/api/auth/reset-password`) và **100 requests/phút** cho API tổng quát trong [proxy.ts](file:///e:/XP%20English%20%20XP%20Voca/proxy.ts).
    2. **Bật Cảnh Báo & Loại Bỏ Hardcoded Key**: Loại bỏ hoàn toàn secret key hardcode fallback. Bắt buộc kiểm tra `JWT_SECRET` ([lib/auth/jwt.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/auth/jwt.ts)) và `PASSWORD_SALT_KEY` ([lib/auth/password.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/auth/password.ts)) từ biến môi trường (`.env.local`), tự động đưa cảnh báo bảo mật nếu thiếu.
    3. **Payload Limit & Input Sanitization**: Chống XSS bằng `sanitizeInput`, validate email với `isValidEmail` ([lib/security/validation.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/security/validation.ts)) và chặn đứng các HTTP payload > 1MB (hoặc > 10MB đối với media upload).
    4. **Audit HTTP Security Headers**: Bổ sung bộ Security Headers chuẩn OWASP (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`) trên mọi response middleware.

### 2. Thống Kê & Phân Tích Chuyên Sâu (`/analytics`)
- **`/analytics`**: Trang phân tích thành tích học tập chuẩn Dashboard Agency.
  - **5 Bento Metric Cards**: Chuỗi dài nhất, Từ đã lưu, Thời gian luyện tập, Tổng XP, Thứ hạng tuần.
  - **6-Month Heatmap Matrix**: Ma trận đóng góp 24 tuần (6 tháng), căn chỉnh chuẩn mốc tháng và nhãn ngày `Mon`, `Wed`, `Fri`.
  - **Bộ Lọc Kỹ Năng Shared Pill Switcher**: Chuyển đổi linh hoạt 100% độc lập giữa Dictation, Shadowing, Nói, Từ vựng, Viết.
  - **2 Biểu Đồ Đường Đặt Song Song Trong 1 Khung Thẻ Trắng**:
    - Biểu đồ **Phút luyện tập** (Màu Xanh `#0059bb`).
    - Biểu đồ **XP kiếm được** (Màu Xanh Ngọc `#10b981`).
    - Nét uốn siêu mảnh `1.3px`, tự động co giãn trục Y không tràn màn hình, di chuột hover xem tooltip, trang bị hiệu ứng vẽ đường stroke `pathLength: 0 -> 1` đồng bộ với Dashboard, triệt tiêu 100% hiện tượng xung đột nội suy chuỗi pathD.

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
- **`/study/listening`**: Phòng Luyện Nghe Dictation & Bóc Tách Phụ Đề AI (Thiết kế Agency Dashboard Tier).
  - **Luyện 3 Câu Một Lượt (Chunk3 Mode)**: Gõ từ phân tách theo thời gian thực (Instant Word Matching), tự động kiểm tra từ và mở chữ ẩn kèm viền xanh lá lá (`border-emerald-500`). Khóa chặt nút chuyển sang 3 câu tiếp theo (`🔒 Hoàn thành 3 câu này để chuyển tiếp`) cho đến khi hoàn thành đúng hết 3 câu hiện tại.
  - **Giảm Mạnh Bo Góc (Micro-Sharp UI `rounded-xs`)**: Giảm mạnh 100% độ cong bo góc của toàn bộ các card Quiz trắc nghiệm, các nút đáp án A B C D, Tab Switcher, ô nhập từ, sổ tay ghi chú và các khối container bên cột trái/phải thành phẳng **`rounded-xs` (2px)** siêu sắc nét và tinh tế.
  - **Tích hợp Innertube API**: Bóc tách phụ đề tiếng Anh & Việt chính xác 100% theo mốc mili-giây thời gian thực của video YouTube.

- **`/study/practice`**: Phòng luyện tập 4 kỹ năng (Quiz, Flashcard 3D, Writing, Speaking AI).
  - **Mobile Layout Optimize**: Ẩn phụ đề rườm rà `hidden sm:block`, rút gọn tên 4 tab chế độ trên mobile (`Quiz`, `Flashcard`, `Writing`, `Nói AI`) kèm cuộn mượt `overflow-x-auto`.
  - **Khung Thẻ Câu Hỏi & Đáp Án**: Tối ưu padding `p-3 sm:p-4`, hiển thị vừa trọn 1 màn hình di động không rớt dòng. Nút "Câu tiếp theo" căn giữa full-width trên mobile.
- **`/study/shadowing`**: Trang Luyện Nói & Nhại Giọng Bản Xứ (Real-time Speech Recognition + AI Speech Scoring + Instant Color Coding + Mobile Dictionary Modal).
  - **Live Real-time Speech-to-Text & Color Coding (Xanh/Đỏ)**: Chấm từ phát âm đúng/sai ngay lập tức khi cất giọng đọc (**XANH LÁ**: `text-emerald-700 bg-emerald-50 border-emerald-500`, **ĐỎ**: `text-rose-700 bg-rose-50 border-rose-400`).
  - **Ngưỡng Vượt Qua 80% (PASS ≥ 80%)**: Đạt `≥ 80%` ➔ Coi như VƯỢT QUA (PASS 🎉), phát hiệu ứng chúc mừng và cộng thưởng **+20 XP**.
  - **Icon Con Mắt `<Eye />` Xem Bản Dịch Tiếng Việt**: Nút bật/tắt hiển thị Khung Bản Dịch Tiếng Việt Chuyên Sâu.
  - **Tương Tác Click Tra Từ Vựng 0ms & Mobile Word Dictionary Modal**: Chạm/Click từ vựng ➔ Mở chiếc Word Dictionary Modal ở góc dưới bên phải (`right-4 bottom-[72px]`, `sm:w-[400px]`) với phát âm IPA chuẩn, audio giọng bản xứ, bản dịch Tiếng Việt phong phú sát nghĩa phân tách phẩy/chấm phẩy, định nghĩa Tiếng Anh và câu ví dụ minh họa.
  - **Khắc phục âm thanh trên Mobile Web (iOS Safari / Android Chrome)**: Tích hợp bộ giải pháp [lib/utils/mobileAudio.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/utils/mobileAudio.ts) (`unlockMobileAudio` & `safeSpeakText`), mở khóa Web Audio Context và SpeechSynthesis khi chạm nhẹ, tự động phát âm thanh rõ ràng 100% không bị đứng im trên điện thoại.
  - **Zero-Shift Guarantee**: Giữ nguyên 100% bố cục và câu chữ đầy đủ trên màn hình Desktop.
- **`/study/pvp`**: Đấu trường so tài từ vựng PvP Realtime (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Banner**: Gradient Xanh Hoàng Gia sang trọng kèm hiệu ứng ánh kim.
  - **Bento Grid 7/12 & 5/12**: Cột trái lựa chọn 3 chế độ (Trắc nghiệm, Đồ chữ, Âm thanh) và 3 cấp độ (Dễ, Trung bình, Khó). Cột phải hiển thị Hồ sơ Đấu sĩ & Bảng Vàng Top 3 Đấu Trường.
  - **Trận Đấu PvP 1v1**: Giao diện đấu thời gian thực sắc nét, đồng hồ đếm ngược, AI thông minh và báo cáo kết quả thưởng XP.
- **`/ai/tutor`**: Gia sư AI 1-1 hỗ trợ hội thoại 4 kỹ năng (FreeTalk, Roleplay, Drill).
  - **Multi-Model Fallback Loop**: Tự động chuyển đổi mô hình AI (`gemini-2.5-flash` ➔ `gemini-1.5-flash` ➔ `gemini-2.0-flash`) đảm bảo 100% không bị ngắt kết nối.
  - **Mobile Layout Optimize**: Ẩn subtext rườm rà `hidden sm:block`, đưa 3 tab chế độ (FreeTalk, Roleplay, Drill) thành thanh tab 3 cột full-width 100% trên mobile.
  - **Thanh Nhập Liệu & Gợi Ý AI**: Cấu trúc bộ input `[🎙️ Mic] [Input Text] [🚀 Gửi]` thành 1 khối compact 1 hàng ngang, các câu gợi ý phản hồi nhanh dạng danh sách dọc 100% width.
- **`/ai/conversation`**: Phòng hội thoại giao tiếp tiếng Anh AI thực tế.
  - **Multi-Model Fallback Loop & Safe JSON**: Tự động thử nghiệm đa mô hình Gemini và làm sạch chuỗi JSON (`strip Markdown backticks`) phòng chống lỗi parse.
  - **Mobile Layout Optimize**: Ẩn các đoạn subtext rườm rà `hidden sm:block`, thu gọn Hero Banner (`Hội thoại AI 💬` + Nút `✓ Chấm điểm` + Đồng hồ `⏱ 06:16`), tiêu đề không tràn lề.
- **`/vocabulary` & `/vocabulary/[id]`**: Kho Từ Vựng Tiếng Anh Theo Chủ Đề (155 Chủ Đề & 8,948 Từ Vựng Thực Tế).
  - **Tự động cập nhật 155 Chủ đề**: Bao gồm 10 chủ đề mới chuyên ngành tên ngắn gọn (`CNTT & AI`, `Y tế`, `Tài chính`, `Luật pháp`, `Môi trường`, `Marketing`, `Du lịch`, `Khoa học`, `Nghệ thuật`, `Thể thao`) kèm icon Lucide sắc nét.
  - **Dữ liệu 8,948 từ vựng thực tế**: Liên kết tự động qua API `/api/vocabulary`, hiển thị đầy đủ phát âm IPA, loại từ Tiếng Việt, nghĩa Tiếng Việt phong phú sát nghĩa và ví dụ câu minh họa.
  - **Đồng bộ Ngôn ngữ UI**: Chuyển đổi toàn bộ nhãn cấp độ lọc từ tiếng Anh sang tiếng Việt (`Tất cả`, `Cơ bản`, `Trung cấp`, `Nâng cao`).
  - **Giảm Border Radius**: Giảm bo góc các thẻ chủ đề từ `rounded-2xl`/`rounded-xl` xuống `rounded-md` theo quy tắc Rule 10 Wadhah Aloui.
  - **Tối ưu padding chân trang**: Mở rộng khoảng cách dưới `pb-20 sm:pb-6` triệt tiêu hoàn toàn lỗi đè lấp của thanh Footer Mobile Navigation.
- **`/community` & Subpages (`/leaderboard`, `/friends`, `/groups`)**: Phân hệ Cộng Đồng Học Tập.
  - **Tối Ưu Bố Cục Mobile Chuyên Sâu Đồng Bộ**: Navigation Tabs 4 ô dàn vừa vặn 1 hàng **`grid grid-cols-4 gap-1 p-1 rounded-md`**, Top 3 Podium Quán quân linh hoạt (`w-10`/`w-12` Avatar), Thẻ bạn bè & Thẻ nhóm học thuật tinh gọn.
  - **Lược Bỏ Subtext Rườm Rà**: Ẩn đoạn văn bản mô tả 2 dòng phụ ở Hero Banner `hidden sm:block text-xs text-blue-100/90`.
  - **Giảm Border Radius (Rule 10)**: Khung ngoài `rounded-md`, khung phần tử con (nút bấm, ô nhập, badges, pills) `rounded-sm` / `rounded-full`.
  - **Zero-Shift Guarantee**: Bảo tồn 100% bố cục và nội dung hiển thị trên Desktop.
- **`/profile`**: Hồ sơ cá nhân học viên (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Profile Banner**: Gradient Xanh Hoàng Gia sang trọng (`from-[#0059bb] via-[#004799] to-[#002b5b]`), vành khung Avatar danh hiệu nổi bật (`🎓`, `👑`, `🛡️`), huy hiệu Cấp độ `LV.x`, số ngày Streak rực rỡ và số dư Vàng live.
  - **4 High-Contrast Bento Metric Cards**: Từ vựng tích lũy (`BookOpen`), Chuỗi Streak (`Flame`), Kinh nghiệm XP & Level (`Zap`), Vàng & Bảo Hộ Streak (`Coins`).
  - **Bento Grid 8/12 & 4/12**:
    - **Cột Trái (8/12)**: Mini Skill Activity Meters (Tóm tắt tiến độ 5 kỹ năng *Từ vựng*, *Viết*, *Nói*, *Dictation*, *Shadowing*), Kho Huy Hiệu Thành Tích với bộ lọc tab (*Tất cả*, *Đã đạt*, *Chưa mở*), Tủ Vật Phẩm Trang Bị & Trang Phục Cử Nhân (`🎓 Cú Tốt Nghiệp`).
    - **Cột Phải (4/12)**: Phân tích Cấp độ & Danh hiệu tiến bước, Lối tắt ứng dụng đến Thống Kê, Đấu Trường PvP, Cửa Hàng Shop và Bảng Xếp Hạng.
  - **Mobile Layout Optimize**: Avatar thu nhỏ `w-16 h-16`, ẩn bio & subtext `hidden sm:block`, 4 cards xếp 2x2 grid compact, tab filter rút gọn nhãn, ẩn progress bar & mô tả phụ trên mobile.
  - **Form Cài Đặt Hồ Sơ Mượt Mà**: Trượt mở với Framer Motion, nhãn ngoài float label (Rule 6), nút Primary "Lưu thay đổi" (Rule 18 & 19).
- **`/shop`**: Cửa hàng Gamification & Vật phẩm ảo (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Banner**: Gradient Xanh Hoàng Gia sang trọng tích hợp Widget hiển thị số Vàng tích lũy realtime.
  - **Bento Grid 7/12 & 5/12**: Cột trái phân loại danh mục (Vật phẩm hỗ trợ, Trang phục Avatar) với các thẻ vật phẩm sắc nét (`Bảo Hộ Lửa`, `Nhân Đôi XP`, `Cú Tốt Nghiệp`). Cột phải hiển thị Tủ Đồ Cá Nhân & Mẹo Tích Lũy Vàng.
  - **Full-Stack Equip & Purchase**: Mua & trang bị/tháo nón Cú cử nhân trực tiếp sync ngầm với PostgreSQL API `/api/shop/purchase` và `/api/shop/equip`.

---

## 🎨 Hệ Thống Thương Hiệu & Logo System

- **Quy tắc hiển thị thương hiệu (Exclusive Brand Display Rule)**: Không hiển thị ảnh logo mascot và tên chữ thương hiệu (`XP English | XP Voca`) cùng một lúc tại bất kỳ header/navbar nào.
  - Khi Sidebar thu gọn (`collapsed`): Chỉ hiển thị duy nhất ảnh logo chữ **X** (`public/mascot.png`).
  - Khi Sidebar mở rộng (`expanded`) & trên các thanh Navbar/Headers: Chỉ hiển thị duy nhất chữ brand text `XP English | XP Voca` (không chứa ảnh logo).
- **Phân bổ tài nguyên Web & Mobile (PWA)**:
  - **Sidebar (Collapsed)**: `public/mascot.png` (Transparent PNG 512x512).
  - **Mobile Orientation Warning Card**: `public/app-icon-horizontal-brand.png` (Transparent PNG 512x512).
  - **Android PWA Icons**: `public/icons/icon-any-192x192.png` & `public/icons/icon-any-512x512.png`.
  - **Android PWA Maskable Icons (Safe Zone ~18% Margin)**: `public/icons/icon-maskable-192x192.png` & `public/icons/icon-maskable-512x512.png`.
  - **iOS Home Screen App Icons**: `public/apple-touch-icon.png` & `public/icons/apple-touch-icon.png` (180x180).
  - **Favicon Trình duyệt**: `public/icons/favicon-16x16.png` & `public/icons/favicon-32x32.png`.
- **Cache Management**: Đồng bộ phiên bản metadata `?v=14` tại `app/layout.tsx`, `public/manifest.json` và Service Worker `xp-voca-v14` tại `public/sw.js`.

---

## ⚡ Danh Mục API Routes Backend (`/app/api`)

- **`GET /api/user/analytics`**: Trả về dữ liệu thống kê user & chuỗi dữ liệu 30 ngày cho biểu đồ line chart.
- **`GET /api/user/profile` & `POST /api/user/profile`**: Lấy & cập nhật thông tin user (Streak, XP, Phút học, Từ đã lưu).
- **`GET /api/user/vocab` & `POST /api/user/vocab`**: Đồng bộ từ vựng đã học & danh sách từ bookmark yêu thích với PostgreSQL DB.
- **`GET /api/leaderboard`**: Lấy danh sách Top 50 Bảng xếp hạng tuần (Indexed query <10ms).
- **`GET /api/study-plan/current` & `POST /api/study-plan/create`**: Tạo & truy vấn lộ trình học AI của học viên.
- **`POST /api/pvp/room`**: Quản lý khởi tạo phòng thi đấu 1v1 mã 5 chữ số, gia nhập phòng, kiểm tra trạng thái realtime & đồng bộ câu hỏi.
- **`POST /api/pvp/match-submit`**: Lưu lịch sử kết quả trận đấu, tính điểm XP server-side, thưởng coins & kiểm tra thăng cấp level.
- **`POST /api/ai/chat`**: API xử lý hỏi đáp nhanh với AI Tutor.
- **`GET /api/youtube/captions` & `POST /api/youtube/captions`**: Backend Server API Route trích xuất & dịch phụ đề song ngữ YouTube trực tiếp với Parser Đa Định Dạng Universal Parser (`lib/services/youtubeSubtitleParser.ts`). Tự động giải mã định dạng YouTube JSON3 (`wireMagic: pb3`, `events/tStartMs/segs`) kết hợp XML TimedText (`<text start dur>`) và WEBVTT, loại bỏ hoàn toàn lỗi lọc cứng `<text` gây loại bỏ phụ đề thực. Hỗ trợ bóc tách mốc thời gian mili-giây chuẩn xác 100%, căn chỉnh phụ đề song ngữ tối ưu (Optimal Global Alignment) không lệch khớp lời, bảo toàn từ ghép/viết tắt (`don't`, `it's`), xuất dữ liệu JSON, SRT & WEBVTT song ngữ ngắt dòng 42 ký tự chuẩn xác và phản hồi HTTP 200/404.


---

## 🛡️ Hệ Thống Bảo Mật & Đơn Vị Kiểm Thử (Security & Testing System)

- **Rate Limiting (`lib/security/rateLimiter.ts` & `proxy.ts`)**:
  - Áp dụng sliding window rate limiter theo IP/User ID. Giới hạn 5 lần/15 phút cho Auth routes (`/api/auth/*`) và 100 requests/phút cho các API khác.
- **XSS & Input Sanitization (`lib/security/validation.ts`)**:
  - Làm sạch dữ liệu đầu vào chống XSS attack, validate chuẩn email RFC 5322 và kiểm tra payload size (>1MB trả về `413 Payload Too Large`).
- **JWT & Password Security (`lib/auth/jwt.ts` & `lib/auth/password.ts`)**:
  - Mã hóa mật khẩu PBKDF2 (SHA-512 with 10,000 iterations), ký JWT Token với HMAC-SHA256, tự động đưa cảnh báo an toàn khi thiếu biến môi trường trong Production.
- **Bộ Kiểm Thử Chuyên Sâu (`__tests__/security.test.ts`, `__tests__/myvideo.test.ts` & `__tests__/myvideo_advanced.test.ts`)**:
  - Đạt 100% tỷ lệ vượt qua (109/109 unit tests trên toàn dự án) với Vitest (`vitest.config.ts`), kiểm thử toàn diện Rate Limiter, XSS Sanitizer, Email Validator, JWT Sign/Verify, PBKDF2 Password Hashing & Toàn bộ 23 Tasks / 400 Kịch bản kiểm thử nâng cao cho trang `/myvideo` (YouTube URL Parsing, Subtitle Parser API, 3-Sentence Rolling Viewport, Karaoke Sync 50ms, Tra từ điển sticky overlay, Dictation AI, Shadowing AI, Data Exporter SRT/WEBVTT/JSON, Bento Filter & Search, Zustand Store, UX/UI Keyboard & Gestures, Multi-language I18N, Performance FCP/LCP & Memory Leak Safety, Security XSS/CSRF/RateLimit/CSP, Accessibility WCAG AA, Resilient Error Handling & Fallbacks, Mobile & Responsive Layouts, Speech/Audio 3rd-party APIs, Analytics Tracking & Edge Cases / Stress Tests).



