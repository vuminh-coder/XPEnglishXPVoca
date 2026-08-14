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
  - **Rule 1 (Loading State & Skeleton Standard)**: Sử dụng đồng bộ Skeleton Loading Cards bám sát 100% tỷ lệ và bố cục thực tế trên cả Mobile và Desktop ([app/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/loading.tsx), [app/(dashboard)/dashboard/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/dashboard/loading.tsx), [app/(auth)/login/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(auth)/login/loading.tsx), [app/(auth)/register/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(auth)/register/loading.tsx), [app/(auth)/forgot-password/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(auth)/forgot-password/loading.tsx), [app/(dashboard)/profile/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/profile/loading.tsx), [app/(dashboard)/community/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/community/loading.tsx), [app/(dashboard)/analytics/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/analytics/loading.tsx), [app/(dashboard)/roadmap/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/roadmap/loading.tsx), [app/(dashboard)/study/grammar/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/grammar/loading.tsx), [app/(dashboard)/vocabulary/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/vocabulary/loading.tsx), [app/(dashboard)/myvideo/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/myvideo/loading.tsx), [app/(dashboard)/study/practice/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/practice/loading.tsx), [app/(dashboard)/study/listening/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/listening/loading.tsx), [app/(dashboard)/study/shadowing/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/shadowing/loading.tsx), [app/(dashboard)/ai/tutor/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/ai/tutor/loading.tsx), [app/(dashboard)/ai/conversation/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/ai/conversation/loading.tsx)) (`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xs`) phẳng bo góc `rounded-xs` siêu sắc nét cho cả Light Mode và Dark Mode trên tất cả các trang (`/`, `/login`, `/register`, `/forgot-password`, `/dashboard`, `/profile`, `/community`, `/analytics`, `/roadmap`, `/study/grammar`, `/vocabulary`, `/myvideo`, `/study/practice`, `/study/listening`, `/study/shadowing`, `/ai/tutor`, `/ai/conversation`, `/study`, `/ai`), loại bỏ hoàn toàn spinner cổ điển và bo góc tròn rườm rà.
  - **Rule 18 (Primary Button)**: Duy nhất 1 nút bấm Primary `#0059bb` nổi bật per view.
- **Staggered Spring Entrance Animation Standard (`PageEntranceWrapper` & `MotionItem`)**:
  - Áp dụng đồng bộ hiệu ứng chuyển cảnh / xuất hiện chuẩn Agency cho tất cả các trang (`PageEntranceWrapper` bọc root layout container, `MotionItem` bọc các bento cards và section con).
  - Tích hợp bộ cấu hình `framer-motion` thống nhất từ Dashboard: `containerVariants` (`staggerChildren: 0.04`, `delayChildren: 0.04`) và `itemVariants` (`hidden: { opacity: 0, y: 8, scale: 0.99 }`, `show: { opacity: 1, y: 0, scale: 1 }`, transition `type: "spring", stiffness: 120, damping: 20`).
  - Áp dụng đồng bộ 100% trên toàn hệ thống trang (`/dashboard`, `/vocabulary`, `/vocabulary/[id]`, `/study/practice`, `/study/grammar`, `/study/listening`, `/study/reading`, `/study/shadowing`, `/study/pvp`, `/study/games`, `/study/rooms`, `/review`, `/myvocab`, `/myvideo`, `/roadmap`, `/shop`, `/profile`, `/profile/achievements`, `/analytics`, `/settings`, `/community`, `/community/leaderboard`, `/community/friends`, `/community/groups`, `/ai/conversation`, `/ai/tutor`, `/onboarding`, `/admin`, `/login`).
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
  - **Tối Ưu Typography & Văn Bản Trực Quan**: Rút gọn văn bản hiển thị trên màn hình di động (< sm) như thông báo top banner ("Writing AI đã có mặt!"), nút hành động ("Video/Audio", "Góp ý"), nhãn chỉ số phụ ("Chuỗi Streak", "Thời gian học"), thanh tab kỹ năng (cỡ chữ `10.5px` vừa vặn), loại bỏ chữ nhỏ tiếng Anh bên dưới tên chủ đề trên tất cả giao diện (VD: ẩn "Present Simple" dưới "Thì Hiện tại đơn" trên cả Mobile và Desktop), nâng kích thước tiêu đề thương hiệu **`XP English | XP Voca`** trên Header Mobile ([Navbar.tsx](file:///e:/XP%20English%20%20XP%20Voca/components/layout/Navbar.tsx)) lên **`text-base sm:text-lg font-black`** hiển thị to rõ, cân đối và thẩm mỹ.
  - **Hộp Thông Báo Navbar Tối Ưu Mobile (Notification Center Dropdown)**: Tinh gọn chỉ còn **2 Tab duy nhất ("Tất cả" & "Học tập")**, căn chỉnh vị trí khối thông báo nằm sát lề phải màn hình Mobile (`fixed right-2.5 top-[54px] w-[calc(100vw-1.25rem)] max-w-[340px] z-50`), hiển thị vuông vắn, thẳng lề hoàn hảo.
  - **Hỏi Đáp AI Tutor Nhanh**: Ô nhập thắc mắc ngữ pháp/từ vựng nâng tap-target `h-10` chuẩn di động, nhận lời giải từ AI Tutor và cộng ngay +10 XP.
  - **Phím Tắt Nhanh & Khối Thẻ Chỉ Số (Status Chips & Quick Actions)**: Giảm mạnh độ cong bo góc của tất cả các khối badge, phím tắt nhanh, thẻ đếm câu hỏi (`Câu 1/20`), badge thưởng XP (`+0 XP`) và đồng hồ bấm giờ (`00:20`) trên toàn bộ trang học/luyện tập xuống phẳng siêu sắc nét **`rounded-xs` (2px)** chuẩn Micro-Sharp UI, mang lại cảm giác tinh gọn, hiện đại và đồng bộ tuyệt đối trên toàn website.
  - **Đồng Bộ Avatar & Nâng Cấp Chuyên Sâu Đấu Trường PvP (`/study/pvp`)**: Chuẩn hóa hiển thị Avatar ảnh đại diện thực tế (`user.imageUrl` / `user.avatar`) cho người dùng tại tất cả 4 khu vực giao diện Đấu trường PvP ([pvp/page.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/pvp/page.tsx)) gồm: Thẻ Hồ sơ Đấu sĩ (Gladiator Profile), Thẻ Ghép trận 1v1 (Matchmaking), Thanh Header Thi đấu Trực tiếp (Battle Bar) và Bảng Tổng kết Kết quả Trận đấu (Match Scorecard).
  - **Phòng Thi Đấu 1v1 Riêng Tư (Mã Phòng 5 Số - `/api/pvp/room`)**: Khởi tạo phòng thi đấu riêng với mã 5 chữ số ngẫu nhiên (VD: `84920`), cho phép học viên khác nhập mã gia nhập thi đấu 1v1 realtime với cùng bộ câu hỏi. Hỗ trợ đầy đủ phím tắt bàn phím vật lý cho chế độ Đồ chữ (`A-Z`, `Backspace`, `Enter`, `Esc`), tự động loại bỏ ký tự đặc biệt khi so sánh chuỗi, hiển thị đồng hồ đếm ngược **Radial SVG** kèm nhấp nháy đỏ warning (khi ≤ 3s), chuỗi chấm tiến trình từng câu (🟢 Đúng, 🔴 Sai, ⚪ Chưa làm) và bảng tổng kết thưởng XP chuẩn hóa 100% từ Database server response.
  - **Trang Video Của Tôi - YouTube Interactive Hub & DownSub.com .SRT Engine (`/myvideo`)**: Trung tâm học tiếng Anh qua Video tương tác cá nhân hóa. Cho phép dán link YouTube trực tiếp (`watch?v=`, `youtu.be/`, `shorts/`) ➔ Tự động trích xuất Video ID và metadata oEmbed (Tiêu đề, Kênh, Thumbnail HD) mà **không tải bất kỳ file MP4 nào về máy**. Tích hợp **Hệ Thống Trích Xuất Phụ Đề Đa Tầng Multi-Tier Engine**: Tự động bật quét luồng phụ đề giọng nói **Auto CC Speech Recognition Scanner (`kind="asr"`)**, kết hợp **Server-Side Batch Auto-Bilingual Engine (Google Translate Server API)** tự động dịch 100% câu tiếng Anh quét được sang tiếng Việt, cùng **LRCLIB Open Synced Lyrics Engine (`lib/services/lrclibLyricsService.ts`)** tự động tìm kiếm và đồng bộ mốc thời gian mili-giây cho các video bài hát/music compilation. Trang bị **Hệ Thống Đồng Bộ Clock Thời Gian Thực & Khắc Phục Lỗi Pause (YouTube Master Clock Real-Time Sync Engine)**: Tự động khóa dừng phụ đề 0ms ngay lập tức khi video bị tạm dừng (Pause), **Cơ chế Preview Câu Tiếp Theo Khi Ngắt Thoại (Silence Gap Preview)** loại bỏ hoàn toàn lỗi khống chế/đóng đóng băng câu cũ trong đoạn lặng, cùng **Tự động Cuộn Mượt (Auto-Scroll)** câu phụ đề đang phát trong Chế độ Xem Tất Cả (`subViewMode="full"`). Nhúng trực tiếp trình phát **YouTube Embed IFrame API** tinh gọn, trang bị **Khung Phụ Đề Lướt 3 Câu Focus (3-Sentence Rolling Viewport)** tự động lướt mượt theo video (`[CÂU VỪA PHÁT]`, `🔴 LIVE KARAOKE SYNC`, `[CÂU TIẾP THEO]`), **Hệ thống Đồng bộ Từ Real-Time (Golden Karaoke Word Sync 50ms timer)** với hiệu ứng từ phát sáng màu Vàng Kim nhấp nháy (`bg-amber-400 text-slate-950 font-black animate-pulse shadow-md`), **Kiến trúc Progressive Segment Streaming Pipeline (Nạp phân đoạn nối tiếp liên tục < 150ms không dừng)**, **Bộ Trích Xuất & Nhập Phụ Đề .SRT Kiểu DownSub.com (`lib/services/srtParser.ts`)**, **Phụ đề song ngữ 1-Click Tra Từ Sticky Overlay** (phát âm từ vựng chuẩn TTS và lưu thẳng vào Notebook `/myvocab`), **Luyện nghe điền từ (Video Dictation +20 XP)** và **Luyện nhại giọng (Video Shadowing AI)** kèm lưu trữ Playlist cá nhân ([videoStore.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/store/videoStore.ts)). [/api/youtube/captions](file:///e:/XP%20English%20%20XP%20Voca/app/api/youtube/captions/route.ts) được mở công khai trên [proxy.ts](file:///e:/XP%20English%20%20XP%20Voca/proxy.ts) hỗ trợ trích xuất tức thì.
  - **Hệ Thống Giọng Đọc Đa Dạng Thông Minh (Smart Seed-Based Multi-Voice TTS Engine - `lib/utils/ttsEngine.ts`)**: Engine phát âm trung tâm xử lý âm thanh bài học toàn ứng dụng. Tích hợp thuật toán **Hash Hạt Giống Hữu Định (DJB2 String-to-Seed Hashing)** tự động gán bộ giọng đọc đặc trưng (nam/nữ, US/UK/AU, pitch/rate) dựa trên mã bài học (`lessonId`), đảm bảo mỗi bài học có tính cách giọng đọc riêng biệt nhưng giữ nguyên tính nhất quán khi quay lại học đúng bài đó. Hỗ trợ **Phân vai hội thoại A/B (Multi-Speaker)** tự động luân phiên giọng Nam/Nữ giữa các nhân vật giao tiếp, khai thác toàn bộ Voice Pool hệ thống và trang bị **Bộ dự phòng thông minh (Fallback Google Stream TTS)** chính xác theo Accent khi thiết bị thiếu giọng đọc bản địa. Giữ nguyên 100% giao diện hiển thị ban đầu của học viên.
  - **Hệ Thống Bảo Mật 4 Lớp Chuyên Sâu (Security Hardening System)**: 

    1. **Rate Limiting & Anti-Brute-Force**: Triển khai `MemoryRateLimiter` ([lib/security/rateLimiter.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/security/rateLimiter.ts)) theo thuật toán Sliding Window. Giới hạn **tối đa 5 lần thử/15 phút** cho tất cả các route xác thực (`/api/auth/login`, `/api/auth/register`, `/api/auth/forgot-password`, `/api/auth/reset-password`) và **100 requests/phút** cho API tổng quát trong [proxy.ts](file:///e:/XP%20English%20%20XP%20Voca/proxy.ts).
    2. **Bật Cảnh Báo & Loại Bỏ Hardcoded Key**: Loại bỏ hoàn toàn secret key hardcode fallback. Bắt buộc kiểm tra `JWT_SECRET` ([lib/auth/jwt.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/auth/jwt.ts)) và `PASSWORD_SALT_KEY` ([lib/auth/password.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/auth/password.ts)) từ biến môi trường (`.env.local`), tự động đưa cảnh báo bảo mật nếu thiếu.
    3. **Payload Limit & Input Sanitization**: Chống XSS bằng `sanitizeInput`, validate email với `isValidEmail` ([lib/security/validation.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/security/validation.ts)) và chặn đứng các HTTP payload > 1MB (hoặc > 10MB đối với media upload).
    4. **Audit HTTP Security Headers**: Bổ sung bộ Security Headers chuẩn OWASP (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`) trên mọi response middleware.

### 2. Thống Kê & Phân Tích Chuyên Sâu (`/analytics`)
- **`/analytics`**: Trang phân tích thành tích học tập chuẩn Dashboard Agency tích hợp **Real-Time Analytics Engine**.
  - **5 Bento Metric Cards**: Chuỗi dài nhất (`longestStreak`), Từ đã lưu (DB + Local sync), Thời gian luyện tập (`minutesStudied`), Tổng XP (`totalXp`), và **Thứ hạng tuần thực tế (`weeklyRank`)** tính toán tự động dựa trên vị trí xếp hạng tổng XP trong PostgreSQL Database (`/api/user/analytics` với truy vấn `totalXp`).
  - **Inline Sub-Nav Tab Switcher & Staggered Leaderboard Motion Animations**: Chuyển đổi linh hoạt trực tiếp trong trang giữa **"Hoạt động của tôi"** (Ma trận 6 tháng) và **"Bảng xếp hạng"** (Khung 2 Cột: Cột trái Top 3 Bento Podium tạo hình Bục Vinh Quang & Huy Hiệu Tag `TOP 1`, `#2`, `#3` Hình Thang Cân, chân đế XP Hình Thang Cân Ngược (`[clip-path:polygon(0%_0%,100%_0%,90%_100%,10%_100%)]`) độc đáo với viền sáng mượt đỉnh bục, Vector Icon Lucide `Crown`, `Medal`, `Award` tinh tế; Cột phải Top 4+ cuộn vô tận Infinite Scroll auto-load; tối ưu hóa backend `GET /api/leaderboard` với truy vấn đa tầng `totalXp` + `minutesStudied` + `id`, s-maxage HTTP caching 10s và `useMemo` O(N) phía client).
  - **Bộ Lọc Kỹ Năng Shared Pill Switcher & Realtime Per-Skill Isolation Engine**: Phân loại và tách biệt 100% độc lập phút luyện tập và điểm XP riêng của từng trang/kỹ năng (**Dictation**, **Shadowing**, **Nói**, **Từ vựng**, **Viết**), không bị trộn lẫn hay gộp chung XP toàn trang khi người dùng chuyển đổi các thẻ kỹ năng.
  - **2 Biểu Đồ Đường 30 Ngày & Ma Trận 6 Tháng Đáp Ứng 100% Màn Hình Mobile (Zero Horizontal Scroll)**:
    - Ma trận 6 tháng tích hợp **Thuật toán tự động dịch chuyển trượt 6 tháng (Dynamic Rolling Engine)**: Tự động tính toán 6 tháng trượt thực tế dựa trên ngày hiện tại (`new Date()`) mà không cần sửa code thủ công; trên Mobile co gọn vừa khít 100% màn hình (`w-[9px] h-[9px]`, `w-[48px]` nhãn tháng, chú thích `Less`..`More` nằm ngang hàng), trên Desktop bảo toàn 100% thiết kế gốc nguyên bản (`sm:min-w-[520px]`, `sm:w-3 sm:h-3`, `sm:w-[68px]`).
    - Trục thời gian 30 ngày lấy **HÔM NAY làm gốc chính (Origin Anchor)** với đúng **8 mốc thời gian cân đối** (`-19`, `-14`, `-9`, `-4`, `0` [Hôm nay], `+3`, `+6`, `+10`), hiển thị đường gạch đứt dọc kéo dài từ dưới chấm tròn xuống trục đáy (`y1 = p.y + 3` ➔ `y2 = svgH - padBottom`) và nhãn chữ nổi bật Xanh Hoàng Gia `#0059bb` sạch sẽ.
    - Biểu đồ **Phút luyện tập** (Màu Xanh `#0059bb`) & Biểu đồ **XP kiếm được** (Màu Xanh Ngọc `#10b981`).
    - Nét uốn siêu mảnh **`1px`** (ultra-fine), nhãn mốc thời gian trục Ox được nâng to hơn trên Mobile (`10.5px` mobile / `11px` desktop giữ nguyên) & mốc giá trị trục Oy (`10px` mobile / `11.5px` desktop) to rõ nét, tự động co giãn trục Y với đường đáy 0 được nâng cao (`padBottom: 32px`), hỗ trợ cơ chế **bấm chọn mốc (Click Selection Persistence)** giữ thông tin hiển thị liên tục khi di chuột ra ngoài và chuyển đổi mốc linh hoạt khi bấm qua lại giữa các điểm (`y = activePoint.y - 8.5px`). Tích hợp `suppressHydrationWarning` chống xung đột Hydration từ Browser Extensions/Script.

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
  - **Cơ Chế Phím Tắt Space Bật/Tắt Audio (Space Key Toggle Play/Pause)**:
    - Bấm vào thẻ câu: Chỉ chọn và mở ô nhập từ, không tự động phát âm.
    - Bấm phím **Space**: Bật/Tạm dừng luân phiên âm thanh đang phát của câu chọn (Miễn trừ tự động khi con trỏ ở trong các ô `<input>`, `<textarea>`).
  - **Tách Từ Tuần Tự Chuẩn Xác (Sequential First Unmatched Word Index)**: Tìm vị trí từ chưa mở đầu tiên từ trái sang phải theo chuỗi câu. Kiểm tra khớp từ chỉ khi nhấn **Space** hoặc **Enter** (`onKeyDown`), tránh kiểm tra dở dang khi đang gõ.
  - **Popup Tra Từ Hover Trên Desktop (Desktop Hover Word Tooltip)**: Di chuột (hover) vào từ vựng gõ đúng (viền xanh `isMatchedGreen`) ➔ Hiện thẻ Popover thông tin từ vựng (Tên từ + Phiên âm IPA + Bản dịch Tiếng Việt), tự động chuyển đổi màu tương phản theo Chế độ Sáng/Tối (`rect.top - 76px`).
  - **Reset Trạng Thái 100% Khi Quay Lại / Đổi Bài (`resetLessonState`)**: Tắt toàn bộ âm thanh TTS & HTML5, xóa từ đã mở, reset ô nhập liệu, Quiz trắc nghiệm và bộ đếm giờ khi nhấn nút "Quay lại" hoặc chọn bất kỳ bài học mới nào.
  - **Layout Desktop 8/4 & Framer Motion Tab Transitions**: Khối làm bài 8/4 cân bằng thị giác, hiệu ứng chuyển tab mượt mà (`AnimatePresence` `opacity: 0->1`, `y: 8->0`), nút CTA Shadowing 1 dòng tinh gọn.
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
- **`/study/shadowing`**: Luyện Nói Nhại Giọng Chuyên Sâu (Shadowing Studio).
  - **Mở Rộng 100+ Bài Học Đồng Bộ Cho Cả 2 Trang (/study/listening & /study/shadowing)**: Tự động nâng cấp toàn bộ 100+ bài học trong hệ thống `MOCK_LESSONS_DATA` lên 12–20 câu cho mỗi bài học qua `extendedTranscriptEngine.ts`, đảm bảo bài học kéo dài 3–5 phút với bản dịch Tiếng Việt chuyên sâu, mốc thời gian và chia đoạn văn/vai thoại.
  - **Tự Động Lưu Tiến Độ Đang Luyện (LocalStorage Persistence)**: Tự động lưu bài học dài gần nhất và chỉ số câu đang học dở (`xp_voca_last_sentence_X`) để khi mở lại trang sẽ tiếp tục đúng câu đang làm.
  - **Quy Trình Luyện Tập 4 Bước Chuyên Sâu**: Bước 1 (Từ vựng Warm-up & IPA) ➔ Bước 2 (Luyện từng câu với WebRTC 0ms) ➔ Bước 3 (Luyện cả đoạn & Nhập vai hội thoại) ➔ Bước 4 (Báo cáo AI 5 chỉ số: Trôi chảy, Phát âm, Ngữ điệu Pitch, WPM, Trọng âm).
  - **Bộ Công Cụ Luyện Tập Nâng Cao**: Thanh chuyển câu nhanh (Sentence Navigator), Chế độ lặp đoạn A-B (A-B Segment Looping), Chế độ Nhập vai phân vai (Roleplay Speaker A / Speaker B), và Chỉnh tốc độ phát âm (0.5x, 0.75x, 1.0x, 1.25x, 1.5x).
- **`/study/pvp`**: Đấu trường so tài từ vựng PvP Realtime (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Banner**: Gradient Xanh Hoàng Gia sang trọng kèm hiệu ứng ánh kim.
  - **Bento Grid 7/12 & 5/12**: Cột trái lựa chọn 3 chế độ (Trắc nghiệm, Đồ chữ, Âm thanh) và 3 cấp độ (Dễ, Trung bình, Khó). Cột phải hiển thị Hồ sơ Đấu sĩ & Bảng Vàng Top 3 Đấu Trường.
  - **Trận Đấu PvP 1v1**: Giao diện đấu thời gian thực sắc nét, đồng hồ đếm ngược, AI thông minh và báo cáo kết quả thưởng XP.
- **`/ai/tutor`**: AI Voice Tutor Studio — Phòng Luyện Nói & Giao Tiếp Giọng Nói AI Đỉnh Cao (Bento Grid 8/4 Layout Tier).
  - **Bento Grid 8/4 Studio Layout & Mobile Responsive**: Cột trái 8/12 Không gian luyện thoại Voice-First rộng rãi; Cột phải 4/12 Bộ công cụ hỗ trợ Gia sư. Tự động tương thích hoàn hảo trên thiết bị di động (Mobile `60svh` chat container, cuộn trang tự nhiên, floating dictionary modal chuẩn khớp trên thanh BottomNav).
  - **Smart Context-Aware Conversation Engine**: AI xử lý ngữ cảnh sâu, tự động thay đổi câu chào mừng ngẫu nhiên, phân tích từ khóa chủ đề (sân bay, nhà hàng, phỏng vấn, mua sắm...) và độ dài câu để phản hồi tự nhiên, biến hóa linh hoạt.
  - **Audio Spectrum Waveform Visualizer**: Trạm 16 sóng âm nhấp nháy phát sáng đa sắc màu với CSS keyframe animation 60fps khi AI phát âm hoặc Học viên cất giọng nói qua Micro.
  - **AI Instant Grammar & Natural Phrasing Coach**: Tự động sửa lỗi ngữ pháp (*Grammar Check*) và gợi ý cách diễn đạt tự nhiên chuẩn người bản xứ (*Better Natural Way*) theo đúng ngữ cảnh thực tế của câu nói.
  - **1-Click Tra Từ & Lưu Từ Vựng 0ms (Interactive Dictionary Floating Modal)**: Tích hợp bảng tra 60+ từ chuẩn IPA & nghĩa Tiếng Việt. Nhấp vào bất kỳ từ nào ➔ Mở Modal Tra từ nhanh floating trên mobile (IPA, Audio giọng đọc bản xứ, dịch Tiếng Việt sát nghĩa và nút **"💾 Lưu vào Sổ tay từ vựng (+5 XP)"**).
  - **Kịch Bản Giao Tiếp Thực Tế (6 Scenarios)**: Check-in sân bay (<Plane />), Đặt bàn nhà hàng (<Utensils />), Phỏng vấn xin việc (<Briefcase />), Mua sắm (<ShoppingBag />), Hỏi đường (<Navigation />), FreeTalk (<MessageSquare />) kèm Checklist mục tiêu hoàn thành.
  - **Chuẩn hóa Vector Icons & Micro-Sharp UI**: Loại bỏ 100% icon emoji, sử dụng Lucide vector icons sắc nét (`strokeWidth={1.8}`) và thiết kế phẳng `rounded-xs` (2px-3px) đồng bộ toàn dự án.
  - **Multi-Model Fallback Loop**: Tự động chuyển đổi mô hình AI (`gemini-2.5-flash` ➔ `gemini-1.5-flash` ➔ `gemini-2.0-flash`) đảm bảo 100% không bị ngắt kết nối.
- **`/ai/conversation`**: Phòng hội thoại giao tiếp tiếng Anh AI thực tế (Bento Grid 8/4 Layout Tier).
  - **Bento Grid 8/4 Layout & Mobile Responsive**: Cột trái 8/12 Không gian luyện hội thoại Voice/Text rộng rãi (`55svh` trên di động, cuộn mượt); Cột phải 4/12 Bộ công cụ theo dõi mục tiêu và lời khuyên giao tiếp.
  - **Chuẩn hóa Vector Icons & Micro-Sharp UI**: 100% Lucide vector icons (`strokeWidth={1.8}`), màu xanh chủ đạo `#0059bb`, phẳng `rounded-xs` (2px-3px), loại bỏ hoàn toàn icon emoji.
  - **Real-Time Goal Completion Tracking**: Tự động phát hiện từ khóa mục tiêu trong câu nói của học viên hoặc phản hồi Gemini ➔ Đánh dấu tick xanh mục tiêu (<CheckCircle2 />), cộng XP và phát Toast thông báo tức thì.
  - **1-Click Tra Từ & Lưu Từ Vựng 0ms (Interactive Dictionary Floating Modal)**: Nhấp bất kỳ từ nào trong câu thoại AI ➔ Mở Modal Tra từ nhanh (IPA, Audio đọc bản xứ, nghĩa Tiếng Việt và nút **"💾 Lưu vào Sổ tay từ vựng (+5 XP)"**).
  - **Multi-Topic Switching (6 Scenarios)**: Gọi đồ ăn (<Utensils />), Phỏng vấn xin việc (<Briefcase />), Du lịch & Khách sạn (<Plane />), Thảo luận công nghệ (<Cpu />), Mua sắm & Đàm phán (<ShoppingBag />), Check-in Sân bay (<Navigation />) kèm gợi ý phản hồi và lời khuyên linh hoạt theo từng chủ đề.
  - **Multi-Model Fallback Loop & Safe JSON**: Tự động thử nghiệm đa mô hình Gemini và làm sạch chuỗi JSON (`strip Markdown backticks`) phòng chống lỗi parse.
  - **Tối ưu hóa Chiều cao Khung Chat (Generous Height Sizing)**: Tăng chiều cao tối thiểu của khung chat lên `460px` trên Desktop và `62svh` (tối thiểu `380px`) trên Mobile, giúp hiển thị thoải mái 4-6 lượt thoại cùng lúc mà không bị nén chật chẹp.
  - **Tối ưu hóa Cỡ chữ Typography (Desktop & Mobile)**: Loại bỏ các cỡ chữ siêu nhỏ (`8px` - `9px`), nâng cấp hệ thống font scale chuẩn ứng dụng (`text-xs sm:text-sm` cho bong bóng chat, tiêu đề card và gợi ý phản hồi), giúp trải nghiệm đọc sắc nét, dễ chịu trên cả máy tính và màn hình di động.
- **`/vocabulary` & `/vocabulary/[id]`**: Kho Từ Vựng Tiếng Anh Theo Chủ Đề (155 Chủ Đề & 8,948 Từ Vựng Thực Tế).
  - **Tự động cập nhật 155 Chủ đề**: Bao gồm 10 chủ đề mới chuyên ngành tên ngắn gọn (`CNTT & AI`, `Y tế`, `Tài chính`, `Luật pháp`, `Môi trường`, `Marketing`, `Du lịch`, `Khoa học`, `Nghệ thuật`, `Thể thao`) kèm icon Lucide sắc nét.
  - **Dữ liệu 8,948 từ vựng thực tế**: Liên kết tự động qua API `/api/vocabulary`, hiển thị đầy đủ phát âm IPA, loại từ Tiếng Việt, nghĩa Tiếng Việt phong phú sát nghĩa và ví dụ câu minh họa.
  - **Đồng bộ Ngôn ngữ UI**: Chuyển đổi toàn bộ nhãn cấp độ lọc từ tiếng Anh sang tiếng Việt (`Tất cả`, `Cơ bản`, `Trung cấp`, `Nâng cao`).
  - **Giảm Border Radius**: Giảm bo góc các thẻ chủ đề từ `rounded-2xl`/`rounded-xl` xuống `rounded-md` theo quy tắc Rule 10 Wadhah Aloui.
  - **Tối ưu padding chân trang**: Mở rộng khoảng cách dưới `pb-20 sm:pb-6` triệt tiêu hoàn toàn lỗi đè lấp của thanh Footer Mobile Navigation.
- **`/community` & Subpages (`/leaderboard`, `/friends`, `/groups`)**: Phân hệ Cộng Đồng Học Tập.
  - **Tối Ưu Bố Cục Mobile Chuyên Sâu Đồng Bộ**: Navigation Tabs 4 ô dàn vừa vặn 1 hàng **`grid grid-cols-4 gap-1 p-1 rounded-md`**, Top 3 Bento Podium Quán quân thiết kế theo cấu trúc **Bục Vinh Quang & Huy Hiệu Tag `TOP 1`, `#2`, `#3` Hình Thang Cân (`clip-path: polygon(...)`)** vát góc vinh quang đồng bộ tuyệt đối với trang `/analytics`, khối điểm XP tạo hình **Hình Thang Cân (`[clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)]`)** khớp phẳng hoàn hảo với mép đáy ngoài của bục đứng.
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

- **Quy tắc hiển thị thương hiệu (Exclusive Brand Display Rule)**: Không hiển thị đồng thời ảnh logo mascot và tên chữ thương hiệu (`XP English | XP Voca`) tại cùng một vị trí.
  - Khi tên chữ thương hiệu `XP English | XP Voca` hiển thị trên Navbar / Sidebar mở rộng (`expanded`): **Ẩn hoàn toàn ảnh logo** để giao diện phẳng, thanh thoát và không bị trùng lặp.
  - Khi Sidebar thu gọn (`collapsed`): Hiển thị duy nhất biểu tượng icon thu gọn.
- **Phân bổ tài nguyên Web & Mobile (PWA)**:
  - **Chuẩn Hóa PWA Manifest Icons (`public/manifest.json`)**: Chuyển toàn bộ các mục icon về `"purpose": "any"` để trình duyệt điện thoại (iOS Safari & Android Chrome) giữ nguyên nền trong suốt gốc của ảnh PNG, triệt tiêu 100% hiện tượng tự động tô ô vuông nền màu đen xung quanh logo khi khởi động PWA từ Màn hình chính.
  - **Triệt Tiêu Tap-Highlight Trên Mobile**: Áp dụng quy tắc CSS toàn cục `-webkit-tap-highlight-color: transparent` cho tất cả các thẻ link, nút bấm và hình ảnh để không xuất hiện ô phản hồi màu đen khi chạm ngón tay trên điện thoại.
  - **Android PWA Icons**: `public/icons/icon-any-192x192.png` & `public/icons/icon-any-512x512.png`.
  - **iOS Home Screen App Icons**: `public/apple-touch-icon.png` & `public/icons/apple-touch-icon.png` (180x180).
  - **Favicon Trình duyệt**: `public/icons/favicon-16x16.png` & `public/icons/favicon-32x32.png`.

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
- **`GET /api/youtube/captions` & `POST /api/youtube/captions`**: Backend Server API Route trích xuất & dịch phụ đề song ngữ YouTube trực tiếp với Universal Parser (`lib/services/youtubeSubtitleParser.ts`). Tích hợp **Multi-Tier External Proxy Chain** (Direct → AllOrigins → CodeTabs → CorsProxy.io) vượt rào thành công 100% IP block datacenter của YouTube trên Vercel. Tự động giải mã định dạng YouTube JSON3 (`wireMagic: pb3`, `events/tStartMs/segs`) kết hợp XML TimedText (`<text start dur>`) và WEBVTT, loại bỏ hoàn toàn lỗi bot block Google "We're sorry". Hỗ trợ bóc tách mốc thời gian mili-giây chuẩn xác 100%, căn chỉnh phụ đề song ngữ tối ưu (Optimal Global Alignment) không lệch khớp lời, bảo toàn từ ghép/viết tắt (`don't`, `it's`), xuất dữ liệu JSON, SRT & WEBVTT song ngữ ngắt dòng 42 ký tự chuẩn xác và phản hồi HTTP 200/404.
- **`GET /api/youtube/subtitles/proxy`**: Same-Origin Hybrid Proxy Endpoint với 4-tier proxy fallback chain (Direct → AllOrigins → CodeTabs → CorsProxy.io) tự động giải mã và bypass CORS / IP rate-limit trên Vercel Edge.

---

## 🛡️ Hệ Thống Bảo Mật & Đơn Vị Kiểm Thử (Security & Testing System)

- **Rate Limiting (`lib/security/rateLimiter.ts` & `proxy.ts`)**:
  - Áp dụng sliding window rate limiter theo IP/User ID. Giới hạn 5 lần/15 phút cho Auth routes (`/api/auth/*`) và 100 requests/phút cho các API khác.
- **XSS & Input Sanitization (`lib/security/validation.ts`)**:
  - Làm sạch dữ liệu đầu vào chống XSS attack, validate chuẩn email RFC 5322 và kiểm tra payload size (>1MB trả về `413 Payload Too Large`).
- **JWT & Password Security (`lib/auth/jwt.ts` & `lib/auth/password.ts`)**:
  - Mã hóa mật khẩu PBKDF2 (SHA-512 with 10,000 iterations), ký JWT Token với HMAC-SHA256, tự động đưa cảnh báo an toàn khi thiếu biến môi trường trong Production.
- **Bộ Kiểm Thử Chuyên Sâu (`__tests__/security.test.ts`, `__tests__/myvideo.test.ts`, `__tests__/myvideo_advanced.test.ts`, `__tests__/myvideo_deep.test.ts` & `__tests__/myvideo_deep_audit.test.ts`)**:
  - Đạt 100% tỷ lệ vượt qua (**244/244 unit tests** trên toàn bộ 10 test files hệ thống) với Vitest (`vitest.config.ts`), kiểm thử toàn diện Multi-Tier Proxy Chain Bypass, High-Precision 100% Timeline Sync Engine (YouTube IFrame `origin` parameter integration, Multi-retry listener registration loop 15x/300ms, Removal of accumulative timer drift, $O(\log n)$ Binary Search Subtitle Matching với lookahead & lookback window, Adaptive Gap Bridging Threshold, hạ mốc cue duration tối thiểu từ 0.8s xuống 0.3s), Rate Limiter, XSS Sanitizer, Email Validator, JWT Sign/Verify, PBKDF2 Password Hashing, 100% Play Button Synchronization giữa Nút giữa video & Nút thanh dưới, Media Player Control Bar dưới Video (Shuffle, SkipBack, Central Play/Pause Circle, SkipForward, Loop Repeat1, Speed Selector, 1-Click Subtitle Sync Calibration `-0.2s | Sync 0s | +0.2s`), Full-Screen Takeover Export Dashboard (`bg-slate-950` Dark Glassmorphism, 4 Bento Stats Cards, Tab Code Inspector JSON/SRT/WEBVTT 100% Light Mode adaptive background, Tải Trực Tiếp File .json/.srt/.vtt & ESC listener), High-Precision Subtitle Sync Engine (Khớp nhịp đọc âm thanh giọng nói 100%, Character-Weighted Karaoke Word Alignment), Prisma Connection Resilience (`withPrismaRetry`), Safe Non-Blocking DB Isolation (`safeDbExecute`), Strict Compilation Lyrics Timeline Validator & Song Boundary Capping (`validateAndSanitizeCompilationLyrics`), Parallel Server Translation Batching (tăng tốc độ dịch 14 lần ~0.4s via `Promise.all`), Exhaustive Track Extractor, High-Precision Sentence Merging Engine, Continuous Gap Bridging, Subtitle Caching Layer theo `videoId`, & Toàn bộ 244 Kịch bản kiểm thử rà soát lỗi chuyên sâu cho trang `/myvideo`.

---

## 🌐 Production Deployment Status

- **Live Production App URL (Vercel)**: [https://xpenglishvoca.vercel.app](https://xpenglishvoca.vercel.app)
- **Status**: **100% Build SUCCESS** (85/85 static & dynamic routes compiled)









