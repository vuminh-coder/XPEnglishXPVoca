# XP English & XP Voca - Hệ Thống Học Tiếng Anh Thông Minh AI (Agency Dashboard Tier)

Ứng dụng web nâng cấp toàn diện cho việc học từ vựng, luyện nghe, thi thử trắc nghiệm, tạo lộ trình AI cá nhân hóa và theo dõi thống kê học tập chuyên sâu.

---

## 🏛️ Kiến Trúc Hệ Thống & Cấu Trúc Thư Mục (Feature-Based Modular Architecture)

Dự án áp dụng mô hình **Feature-Based Modular Architecture** kết hợp **Next.js 16 App Router**:

- **`features/`**: Chứa toàn bộ logic nghiệp vụ, components, hooks, services, data và utilities phân chia độc lập theo từng tính năng (`listening`, `shadowing`, `vocabulary`, `exam-prep`, `grammar`, `reading`, `study-rooms`, `gamification`, `community`, `ai-tutor`).
- **`shared/`**: Chứa các thành phần dùng chung thực sự (`components/ui`, `components/layout`, `components/feedback`, `utils`, `constants`, `types`).
- **`infrastructure/`**: Tách biệt mã nguồn tích hợp hệ thống bên ngoài (`api`, `auth`, `database`, `security`, `webrtc`).
- **`stores/`**: Chứa toàn bộ các Zustand stores quản lý trạng thái tập trung.
- **`app/`**: Next.js App Router mỏng đóng vai trò Orchestrator điều hướng.

Chi tiết xem tại tài liệu kiến trúc chuyên sâu: [ARCHITECTURE.md](file:///e:/XP%20English%20%20XP%20Voca/ARCHITECTURE.md).

---

## 🎨 Design Tokens & Chuẩn Mực Thiết Kế (Agency Dashboard Tier)

- **Màu Sắc Thương Hiệu Chủ Đạo**: `#0059bb` (Royal XP English Blue)
- **Bảng Màu Phụ Hài Hòa & Quy Tắc 60 - 30 - 10 (Tailored Semantic Palette)**:
  - **60% Nền & Cấu trúc**: Trắng tinh khiết `white` / Xám Slate tối giản `slate-900` với viền siêu mỏng `slate-200/slate-800` giữ độ tập trung tối đa cho người học.
  - **30% Thương hiệu**: Xanh hoàng gia `#0059bb` cho các nút bấm Primary, Icon nhận diện và Tab đang chọn.
  - **10% Điểm nhấn ngữ nghĩa (Semantic Accents)**:
    - **Amber Gold `#f59e0b`**: Huy hiệu Bảng Xếp Hạng Top 1-3, Crown Podium, Điểm danh Streak & Thưởng Vàng.
    - **Emerald `#10b981`**: Thưởng XP, Từ vựng đã lưu (`BookmarkCheck`), Thành tích & Đáp án đúng.
    - **Indigo / Purple `#8b5cf6`**: Gemini AI Tutor, Ngữ pháp AI, Trợ lý hội thoại.
    - **Sky `#0284c7`**: Thời gian luyện tập, Bình luận, Tương tác cộng đồng.
    - **Cherry Red / Rose `#f43f5e` / `#e11d48`**: Dùng có chọn lọc cho Phòng Thi Thử Đề Chuẩn (`/study/exam-prep`), Đếm ngược thời gian gấp gáp, Báo lỗi sai cần sửa và Trái tim sinh mệnh PvP Arena (Tuyệt đối không dùng làm màu nền chung).
    - **Soft Pink `#ec4899`**: Giới hạn cho chủ đề Thời trang/Làm đẹp hoặc Quà tặng đặc biệt.
- **Tiêu Chuẩn Bo Góc & Spacing (Tuân thủ Quy tắc UI/UX Wadhah Aloui)**:
  - **Rule 20 (Semantic Color Distribution)**: Tuân thủ nghiêm ngặt tỷ lệ 60-30-10, bảo vệ mắt và giữ vững tính nhận diện học thuật cao cấp.
  - **Rule 10 (Micro-Sharp UI Border-Radius Standard)**: Quy chuẩn bo góc tất cả các khối hình chữ nhật trên toàn website (cards, containers, buttons, inputs, dropdowns, modals, badges, tabs, alerts, toasts) về phẳng **`rounded-xs` (2px - 3px)** hoặc **`rounded-xl` (12px)** siêu sắc nét, tinh gọn và hiện đại (Ngoại lệ duy nhất: giữ nguyên `rounded-full` cho khối hình tròn như Avatar, chấm tiến trình tròn).
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
- **Kiến Trúc Backend & Hạ Tầng Đám Mây 0 Đồng (Zero-Cost Free Tier Architecture)**:
  - **Serverless API Routes (Next.js trên Vercel)**: Chạy 100% miễn phí trên gói Vercel Hobby, tự động cấp HTTPS SSL, mở rộng không giới hạn và không tốn phí duy trì máy chủ.
  - **Cơ Sở Dữ Liệu PostgreSQL (Prisma ORM)**: Tích hợp gói Free Tier đám mây (Supabase / Neon / Render) dung lượng 500MB - 1GB, lưu trữ hàng chục nghìn người dùng và hàng triệu bản ghi bài tập/lịch sử học tập.
  - **Trợ Lý AI & Gia Sư Trực Tuyến**: Khai thác gói Google Gemini API Free Tier (15 lượt gọi/phút, 1.500 lượt gọi/ngày) phục vụ giải thích ngữ pháp, chấm bài viết và hội thoại thông minh.
  - **Đồng Bộ Dữ Liệu Toàn Diện (Full-Stack Data Persistence)**:
    - **Spaced Repetition SM-2 (`/review` & `/myvocab`)**: Đồng bộ hàng đợi ôn tập, chu kỳ lặp lại ngắt quãng, điểm số thành thạo và từ yêu thích về bảng `user_vocabulary` qua `/api/user/vocab` & `/api/user/vocab/review-submit`.
    - **Phòng Học Nhóm & Pomodoro Realtime (`/study/rooms`)**: Xây dựng sảnh phòng học nhóm đa danh mục, đồng hồ Pomodoro 25:00 / 5:00, danh sách thành viên trực tuyến và khung trò chuyện trực tiếp hỗ trợ gọi `@AI Mentor` qua `/api/study-rooms`.
    - **Hồ Sơ & Cài Đặt (`/profile` & `/settings`)**: Lưu vĩnh viễn Họ tên, Bio, Avatar Emoji/URL và Mục tiêu điểm số vào bảng `profiles` qua `PATCH /api/user/profile`.
    - **Lộ Trình & Kế Hoạch Học Tập (`/roadmap` & `/study/plan`)**: Đồng bộ trạng thái hoàn thành nhiệm vụ từng ngày và tự động cộng thưởng XP qua `/api/study-plan/task-complete`.
- **Favicon & Icon Brand Assets**: Toàn bộ icon thương hiệu (`/favicon.ico`, `/icons/favicon-32x32.png`, `/icons/icon-any-192x192.png`, `/icons/icon-any-512x512.png`, `/app-icon-horizontal-brand.png`) đã được tách bỏ nền trắng (nền trong suốt Transparent RGBA) và phóng to kích thước hình vẽ logo lên **92% diện tích khung chứa**. Tiêu đề hiển thị trên Tab trình duyệt ([layout.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/layout.tsx)) được chuẩn hóa thành **"English | Voca - Cộng Đồng Học Từ Vựng Tiếng Anh Thông Minh"**.

---

## 🗺️ Danh Mục Các Trang & Routes (`/app`)

### 0. Trang Chủ Landing Page (`/`)
- **`/`**: Trang chào mừng & giới thiệu hệ sinh thái học tập XP English | XP Voca (Thiết kế Agency Dashboard Tier).
  - **Hệ Thống Bo Góc Đa Tầng (Hierarchy Radius Standard)**: Áp dụng `rounded-2xl` cho Thẻ Flashcard Tương Tác Wanderlust, 5 Thẻ Bento Tính Năng, Khung Chat Demo Gia Sư AI 1-1, Báo Cáo Thông Minh, Thẻ Đánh Giá Học Viên và Banner CTA Chân Trang; `rounded-xl` cho Nút bấm Primary/Secondary, ô chat và hộp chỉ số; `rounded-lg` cho Badges & Chips.
  - **Hero Section & Thẻ Flashcard Wanderlust**: Tích hợp phát âm chuẩn IPA trực tiếp (`speechSynthesis`), vòng tròn hiển thị 80% độ nhớ và chu kỳ lặp lại ngắt quãng Spaced Repetition.
  - **Lưới Bento 5 Đột Phá Hệ Sinh Thái**: Thẻ SRS với đồ thị đường cong quên lãng SVG, Thẻ Kho từ vựng & Bộ từ riêng, Thẻ Đấu trường PvP trực tiếp 1-on-1, Thẻ Dictation & IPA, Thẻ Bảng Xếp Hạng & Thăng Cấp XP Quán Quân.
  - **Demo Gia Sư AI 24/7**: Trực quan hóa hội thoại 1-1 phản xạ với trợ lý AI bản ngữ kèm tính năng cộng thưởng tức thì `+15 XP`.
  - **Skeleton Loading Khớp 100% Hình Học ([app/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/loading.tsx))**: Tái hiện chuẩn xác 100% từng pixel Navbar, Hero Section, 5 Thẻ Bento và Banner chân trang, loại bỏ hoàn toàn layout shift (0px shift).

### 0.1. Trang Xác Thực (`/login`, `/register`, `/forgot-password`)
- **Hệ Thống Xác Thực Tự Chủ (Custom Local Auth & Session Management)**: Xóa bỏ hoàn toàn phụ thuộc Clerk. Quản lý phiên làm việc bằng HTTP-Only Cookie mã hóa JWT (`xp_voca_session`) 30 ngày + Mã hóa mật khẩu bảo mật PBKDF2 (HMAC-SHA512) chuẩn OWASP.
- **Tự Động Bảo Vệ Route (`proxy.ts`)**: Tự động chuyển hướng người dùng chưa xác thực về `/login`, và điều hướng người dùng đã đăng nhập từ `/login`, `/register` thẳng tới `/dashboard`.
- **`/login`**: Trang đăng nhập — Thiết kế Agency Dashboard Tier chuẩn mực, hỗ trợ Dark Mode và Chế độ xoay dọc màn hình mobile.
  - **Phân tách Mobile & Desktop Layout**: Trên Mobile hiển thị Sticky Header Bar cao 56px (Top-Left: `XP English | XP Voca`, Top-Right: Dropdown chọn ngôn ngữ 🇻🇳/🇺🇸 `rounded-xl`). Trên Desktop hiển thị Bố cục 2 cột (Cột trái Branding + 4 Feature Cards `rounded-2xl`, Cột phải Custom Login Form Card `rounded-2xl`).
  - **Google, Facebook & Email Real OAuth**: Đăng nhập bằng Google OAuth (`/api/auth/google`), Facebook OAuth (`/api/auth/facebook`) hoặc Email/Tên đăng nhập + Mật khẩu kết nối PostgreSQL với các nút bấm `h-11 rounded-xl`.
  - **Single Primary Button (Rule 18 & 19)**: Duy nhất 1 nút Primary nổi bật "Đăng nhập vào hệ thống" (`bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold h-11 rounded-xl active:scale-95`).
  - **Skeleton Loading Khớp 100% Hình Học ([app/(auth)/login/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28auth%29/login/loading.tsx))**: Tái hiện chuẩn xác từng pixel bố cục 2 cột và các thành phần `rounded-2xl` / `rounded-xl` (0px shift).
- **`/register`**: Trang đăng ký — Thiết kế Agency Dashboard Tier chuẩn mực, hỗ trợ Dark Mode và Chế độ xoay dọc màn hình mobile.
  - **Phân tách Mobile & Desktop Layout**: Trên Mobile hiển thị Sticky Header Bar cao 56px (Top-Left: `XP English | XP Voca`, Top-Right: Dropdown chọn ngôn ngữ 🇻🇳/🇺🇸 `rounded-xl`). Trên Desktop hiển thị Bố cục 2 cột (Cột trái Branding + 4 Feature Cards `rounded-2xl`, Cột phải Custom Register Form Card `rounded-2xl`).
  - **Google, Facebook & Email Real OAuth**: Đăng ký nhanh bằng Google OAuth, Facebook OAuth hoặc Biểu mẫu đăng ký tự chủ kết nối PostgreSQL với các ô nhập `h-11 rounded-xl`.
  - **Single Primary Button (Rule 18 & 19)**: Duy nhất 1 nút Primary nổi bật "Đăng ký tài khoản ngay" (`bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold h-11 rounded-xl active:scale-95`).
  - **Skeleton Loading Khớp 100% Hình Học ([app/(auth)/register/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28auth%29/register/loading.tsx))**: Tái hiện chuẩn xác từng pixel bố cục 2 cột và các thành phần `rounded-2xl` / `rounded-xl` (0px shift).
- **`/forgot-password`**: Trang khôi phục mật khẩu — Thiết kế Agency Dashboard Tier chuẩn mực, hỗ trợ Dark Mode và Chế độ xoay dọc màn hình mobile.
  - **Phân tách Mobile & Desktop Layout**: Trên Mobile hiển thị Sticky Header Bar cao 56px (Top-Left: `XP English | XP Voca`, Top-Right: Dropdown chọn ngôn ngữ 🇻🇳/🇺🇸 `rounded-xl`). Trên Desktop hiển thị Bố cục 2 cột (Cột trái Branding + 4 Feature Cards `rounded-2xl`, Cột phải Custom Forgot Password Form Card `rounded-2xl`).
  - **Trạng thái gửi thành công (Success State)**: Hiển thị huy hiệu Emerald `CheckCircle2` kích thước lớn `rounded-2xl` cùng hướng dẫn kiểm tra email và nút quay lại đăng nhập `h-11 rounded-xl`.
  - **Skeleton Loading Khớp 100% Hình Học ([app/(auth)/forgot-password/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28auth%29/forgot-password/loading.tsx))**: Tái hiện chuẩn xác từng pixel bố cục 2 cột và các thành phần `rounded-2xl` / `rounded-xl` (0px shift).
- **Responsive Footer**: Trên Mobile chỉ hiển thị dòng bản quyền căn giữa `© 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.` Trên Desktop hiển thị 2 bên đầy đủ.

### 1. Bảng Điều Khiển & Trung Tâm Học Tập (`/dashboard`)
- **`/dashboard`**: Trung tâm chỉ huy học tập toàn diện (Thiết kế kế thừa chuẩn mực thẩm mỹ cao cấp từ **Listening Studio** `/study/listening` & `?id=34`).
  - **Hệ Thống Bảng Màu Hòa Hợp Chuẩn Agency (Analogous-Complementary System)**: Đồng bộ ma trận màu sắc cân bằng giữa nhận diện thương hiệu **Royal Blue (`#0059bb`)**, ngọn lửa Streak **Warm Amber & Orange (`#f59e0b` / `#f97316`)**, độ tập trung **Electric Sky (`#06b6d4`)**, vốn từ tích lũy **Emerald (`#10b981`)** và thành tích lên cấp **Indigo (`#8b5cf6`)**. Tuân thủ nghiêm ngặt **Quy tắc Wadhah Aloui số 17** (giảm độ bão hòa màu nhấn ở Chế độ Tối sang tông pastel dịu mắt `dark:text-sky-400`, `dark:text-amber-400`, `dark:text-emerald-400`, chống mỏi mắt 100%).
  - **Cơ Chế Co Giãn Fluid Width Khi Thu Gọn Sidebar**: Áp dụng hệ thống container linh hoạt **Fluid Scalable Container (`max-w-[1600px] 2xl:max-w-[1760px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12`)**. Khi thu gọn/đóng Sidebar trên màn hình lớn (1440px - 1920px), toàn bộ bố cục Dashboard tự động dãn rộng mượt mà, triệt tiêu 100% khoảng trống trắng thừa ở 2 bên mép lề.
  - **Hệ Thống Phân Cấp Typography & Icon Sắc Nét**: Sử dụng thống nhất font chữ **`Be Vietnam Pro`**, 6 tầng kích cỡ chữ rõ rệt (Hero Title, Section Header, Key Metrics với `font-mono tabular-nums`, Labels `text-[11px]`, Buttons `text-xs sm:text-sm`, Badge `text-[10px]`), cùng bộ Icon Lucide React nét `stroke-[2]` đến `stroke-[2.2]` canh giữa quang học (100% không chứa icon emoji thô).
  - **Thanh Header Đỉnh Dùng Chung Cao Cấp (`AppTopHeader` 56px `h-14` Baseline)**: Component dùng chung [`shared/components/layout/AppTopHeader.tsx`](file:///e:/XP%20English%20%20XP%20Voca/shared/components/layout/AppTopHeader.tsx) chuẩn Agency, trang bị nút **Hamburger Menu (`Menu` 3 gạch ngang)** mở nhanh Sidebar ngăn kéo trên Mobile/Tablet (`lg:hidden`), khe cắm linh hoạt cho cụm nút chuyển chế độ hình con nhộng (`HeaderPillContainer` & `HeaderPillItem`), **Khối Danh Ngôn Truyền Cảm Hứng Mỗi Ngày (Daily Inspiration Quote)** có âm thanh TTS & quay số ngẫu nhiên, nút bấm chuyển đổi **Chế độ Sáng / Tối (`Sun` / `Moon`)**, và **Avatar người dùng** liên kết trực tiếp tới trang Cá nhân `/profile`.
  - **Hero Greeting & Cụm 4 Thẻ Chỉ Số Double-Bezel**: Khung thông tin học viên kèm avatar thực tế, huy hiệu Level CEFR (A1-C2), thanh tiến trình XP Level và 4 thẻ Double-Bezel (`rounded-xl` lồng trong `rounded-2xl`): Chuỗi Streak (`Flame`), Thời gian luyện tập (`Clock`), Vốn từ đã tích lũy (`BookmarkCheck`), Cấp độ XP (`Target`).
  - **Lộ Trình Hôm Nay (Today's Mission Control Deck)**: Thẻ nhiệm vụ trung tâm với tiêu đề bài học gọi từ `/api/study-plan/current`, 3 chip thông số (`Mục tiêu`, `Thời gian ~15m`, `Thưởng +50 XP`), thanh tiến trình gradient và nút bấm chính **Button-in-Button** (`Bắt đầu học ngay ↗`) với bố cục **nằm ngang hàng nhau (Horizontal Layout)** mượt mà trên cả Mobile và Desktop (`flex items-center justify-between`).
  - **Phút Luyện Tập 7 Ngày Theo Từng Kỹ Năng (Per-Skill Analytics Dock)**: Thiết kế thanh chọn kỹ năng 5 tab (Dictation, Shadowing, Luyện nói, Từ vựng, Luyện viết) kết nối trực tiếp với **Hệ thống theo dõi thời gian thực `useStudyTimeTracker`** từ tất cả các phòng học (`/study/listening`, `/study/shadowing`, `/ai/tutor`, `/vocabulary`, `/study/grammar`, `/study/practice`), lưu trữ vào **PostgreSQL Backend** (`DailySkillPractice` & `/api/user/skill-practice`). Biểu đồ SVG đường cong Bezier siêu mượt với gradient vùng sáng trong suốt, trục Ox/Oy to rõ sắc nét (`text-[22px] font-extrabold`), chiều cao viewBox 210px cao ráo và trực quan.
  - **Điểm Danh Tuần Này (Fluid Connected Track)**: Lộ trình 7 mốc kết nối fluid với chấm tròn nối tâm, viền phát sáng gradient màu cam hổ phách, hiệu ứng xung lực nhịp tim ngày hôm nay và nút bấm xúc giác nhận thưởng `+15 XP, +20 Vàng, +5m học`.
  - **Bảng Xếp Hạng Mini & Nhiệm Vụ Hàng Ngày**: Phân loại theo "Tuần / Tháng" và "Thời gian / Điểm XP", hiển thị Top 3 chiến binh và hàng người dùng viền xanh highlight. Danh sách nhiệm vụ với icon phân loại màu, thanh tiến trình con và nút nhận thưởng XP một chạm.
  - **Hỏi Đáp AI Tutor Nhanh (Interactive Workspace)**: Thiết kế dạng Dictation Workspace với nhãn ngoài, ô nhập câu hỏi, nút gửi kèm loading spinner và hộp thoại câu trả lời AI hỗ trợ phát âm TTS.
  - **Cụm 4 Phím Tắt Bento Đáy Trang (Grid 2x2 Mobile & 4 Cột Desktop)**: 4 thẻ truy cập siêu tốc (Luyện nghe, Luyện nói, Thi thử, Đấu trường PvP) với bố cục thông minh **Grid 2x2 trên Mobile** (`grid-cols-2 lg:grid-cols-4`), header responsive tự động bẻ dòng, hiệu ứng nhấc thẻ hover lift `whileHover={{ y: -3 }}`, đệm đáy an toàn `pb-24 sm:pb-8` chống che khuất bởi Bottom Bar.
  - **Skeleton Loading Khớp 100% Hình Học (Zero Layout Shift)**: Trang bị `app/(dashboard)/dashboard/loading.tsx` tái hiện chuẩn xác từng pixel cấu trúc giao diện thật: Header `h-14` với 3 pill tab, Hero Card màu Xanh Hoàng Gia với thanh tiến trình & nút CTA nằm ngang, Biểu đồ kỹ năng 5 tab với lưới 210px và 7 cột ngày, Điểm danh 7 mốc fluid track, và Cụm 4 phím tắt Bento Grid 2x2 trên Mobile.
  - **Thanh Điều Hướng Đáy Mobile (Bottom Navigation Dock)**: Thiết kế thanh đáy `shared/components/layout/BottomNav.tsx` đồng bộ phong cách Dashboard với hiệu ứng **Active Pill Indicator** (`layoutId="mobileBottomNavActivePill"`), viền kính mờ `backdrop-blur-xl`, icon sắc nét và typography `text-[9.5px] font-black text-[#0059bb]` dễ đọc.
  - **Thanh Bên Mobile Drawer Header**: Phần đỉnh ngăn kéo `shared/components/layout/Sidebar.tsx` trang bị chuẩn xác chữ thương hiệu **`XP English | XP Voca`** và nút bấm thu gọn icon **`PanelLeftClose`** (`[| <]`) đồng bộ 100% với giao diện Desktop.

### 2. Thống Kê & Phân Tích Chuyên Sâu (`/analytics`)
- **`/analytics`**: Trang phân tích thành tích học tập chuẩn Dashboard Agency tích hợp **Real-Time Analytics Engine**, kết nối trực tiếp với **Cơ sở dữ liệu PostgreSQL Neon (`daily_skill_practice` & `profiles`)** và thanh điều hướng đỉnh **`AppTopHeader` (56px Baseline)**.
  - **Kiến Trúc Luồng Dữ Liệu Thời Gian Thực (End-to-End Data Pipeline)**:
    - **Thu thập thời gian học (`useStudyTimeTracker`)**: Tự động đo thời gian học tập thực tế từ tất cả các phòng học (`/study/listening`, `/study/shadowing`, `/ai/conversation`, `/ai/tutor`, `/vocabulary/[id]`, `/study/practice`, `/study/grammar/[id]`), tự động lọc thời gian treo máy (>90s) và gửi batch ngầm mỗi 30s hoặc khi chuyển tab/thoát trang.
    - **Cộng dồn điểm XP theo kỹ năng (`awardXp`)**: Mỗi khi học viên trả lời đúng câu hỏi, hoàn thành bài nghe chép chính tả hay hội thoại AI, `awardXp(amount, skill)` sẽ kích hoạt phép toán cộng dồn nguyên tử (atomic increment) cả phút học và điểm XP riêng biệt của kỹ năng đó vào bảng `daily_skill_practice` qua API `POST /api/user/skill-practice`.
    - **Cơ chế Đồng Bộ Đa Tầng (Cache-First + Background Database Sync)**: Lưu trữ tức thời vào LocalStorage để cập nhật UI 0ms, đồng thời tải và hợp nhất (merge) dữ liệu từ PostgreSQL qua `GET /api/user/analytics` và `GET /api/user/skill-practice` mà không bao giờ lo mất dữ liệu khi đổi trình duyệt/thiết bị.
  - **Thanh Header Đỉnh Đồng Bộ (`AppTopHeader`)**: Tích hợp nút Hamburger mở Sidebar, 2 Tab hình con nhộng (`HeaderPillContainer` & `HeaderPillItem`) chuyển đổi nhanh giữa **"Hoạt Động Của Tôi"** và **"Bảng Xếp Hạng XP"**, cùng nút hành động Primary góc phải `[ ⚡ Luyện Tập Ngay +15 XP ]` dẫn trực tiếp vào phòng luyện từ vựng. Đã đăng ký `pathname?.startsWith("/analytics")` vào `isHeaderIntegratedActive` tại [layout.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/layout.tsx) để triệt tiêu Navbar thừa trên mobile và mở rộng không gian hiển thị tràn viền sát nóc.
  - **Lưới 5 Thẻ Chỉ Số Bento Cao Cấp (Double-Bezel Top 5 Metric Cards)**:
    - **Chuỗi dài nhất (`longestStreak`)**: Icon `Flame` trong nền hổ phách `bg-amber-50 dark:bg-amber-950/40 text-amber-500`.
    - **Từ vựng đã thuộc (`savedWords`)**: Icon `BookmarkCheck` trong nền ngọc bích `bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500`.
    - **Thời gian học (`minutesStudied`)**: Icon `Clock` trong nền xanh hoàng gia `bg-blue-50 dark:bg-blue-950/40 text-[#0059bb]`.
    - **Tổng điểm tích lũy (`totalXp`)**: Icon `Target` trong nền tím AI `bg-purple-50 dark:bg-purple-950/40 text-purple-500`.
    - **Hạng tuần thực tế (`weeklyRank`)**: Icon `Trophy` trong nền vàng hoàng kim `bg-amber-50 dark:bg-amber-950/40 text-amber-500` tính toán tự động dựa trên vị trí xếp hạng trong PostgreSQL Database.
  - **Tab 1 — Ma Trận Hoạt Động 6 Tháng & Biểu Đồ Kỹ Năng 30 Ngày**:
    - **Ma trận 6 tháng (GitHub Contribution Style)**: Khung chứa `rounded-2xl`, các ô ma trận `rounded-sm` với 4 thang độ màu xanh hoàng gia chuẩn (`#0059bb`, `#0059bb`/70, `#0059bb`/35, `slate-100`), tích hợp tooltip tương tác hiển thị chính xác số hoạt động theo từng ngày truy vấn trực tiếp từ PostgreSQL Neon DB.
    - **Biểu đồ luyện tập 30 ngày (2 SVG Line Charts)**: Dải chọn 5 kỹ năng (`Dictation`, `Shadowing`, `Nói`, `Từ vựng`, `Viết`) với hiệu ứng trượt mượt mà `layoutId="activeSkillAnalyticsIndicator"`. Hai đồ thị đường cong Bezier dạng sóng cao 210px (`viewBox="0 0 700 210"`) tự động co giãn trục Y không tràn biên, nét uốn 1.8px thanh thoát, floating text cách đỉnh sóng 12px, hàng 8 mốc thời gian căn lề `paddingLeft: "7.43%", paddingRight: "1.43%"` khớp chính xác 100% với Dashboard.
  - **Tab 2 — Bảng Xếp Hạng XP Thành Tích (Leaderboard Studio)**:
    - **Bục Vinh Danh Top 3 Bento Podium**: Cấu trúc bục Top 1 (Vàng Hoàng Kim ở giữa cao nhất), Top 2 (Bạc Silver bên trái), Top 3 (Đồng Bronze bên phải) với hiệu ứng viền phát sáng nhẹ, huy hiệu vương miện và điểm XP to rõ.
    - **Danh Sách Top 4 Trở Đi**: Danh sách cuộn vô tận với thẻ `rounded-xl`, viền tinh tế, huy hiệu cấp độ `Lv` bo viền sắc nét, và nổi bật đặc biệt thẻ của chính người dùng (`isSelf`) bằng viền và nền xanh hoàng gia dịu (`bg-[#0059bb]/10 border-[#0059bb]/40 font-bold`).
  - **Khung Xương Tải Trang Đồng Bộ Hình Học (Zero Layout Shift)**: Tệp `app/(dashboard)/analytics/loading.tsx` tái hiện chuẩn xác từng pixel của `AppTopHeader`, Lưới 5 thẻ chỉ số, Khung ma trận Heatmap và 2 đồ thị đường cong, đảm bảo 0px layout shift khi tải trang.

### 3. Lộ Trình Học Cá Nhân Hóa AI (`/roadmap`)
- **`/roadmap`**: Hệ thống lộ trình học cá nhân hóa thông minh chuẩn Agency Tier tích hợp **`AppTopHeader` (56px Baseline)** và bố cục **Bento Grid 8/12 Lộ Trình + 4/12 Inspector Hướng Dẫn**:
  - **Thanh Header Đỉnh Đồng Bộ (`AppTopHeader`)**: Tích hợp các Tab Pill (`HeaderPillContainer` & `HeaderPillItem`): **"Lộ Trình Mục Tiêu"**, **"Đổi Mục Tiêu AI"**, **"Thống Kê Tiến Độ"** (`/analytics`) cùng nút hành động nhanh. Đã đăng ký `pathname === "/roadmap" || pathname?.startsWith("/roadmap")` vào `isHeaderIntegratedActive` tại [layout.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/layout.tsx) để triệt tiêu Navbar thừa trên mobile và mở rộng không gian hiển thị tràn viền sát nóc.
  - **Step 1: Khung Thiết Lập Mục Tiêu AI 2 Bước (`Goal Setting Form`)**:
    - **Hero Spotlight Banner (`rounded-2xl`)**: Gradient Xanh Hoàng Gia sang trọng (`from-[#0059bb] via-[#004fba] to-[#00388a]`) kèm hiệu ứng ambient blur orbs, huy hiệu `AI Goal Setting Step` và `Khung Chuẩn CEFR, TOEIC & IELTS`.
    - **3 Thẻ Định Hướng Mục Tiêu (`rounded-xl`)**: *Luyện Thi* (GraduationCap), *Công Sở* (Briefcase), *Du Lịch* (Globe) với viền chọn nổi bật `ring-2 ring-[#0059bb]/20`.
    - **2 Khối Chứng Chỉ Kỳ Thi (`rounded-xl`)**: *TOEIC Listening & Reading* (📊) và *IELTS Academic* (🎓).
    - **Dải 4 Mốc Điểm Số Target (`rounded-xl font-mono`)**: Điểm 550, 750, 850, 950 (TOEIC) hoặc Band 5.5, 6.5, 7.5, 8.5 (IELTS).
    - **Trình Độ Hiện Tại & Thời Gian Cam Kết**: Ô chọn trình độ A1-B1 và bộ hiển thị số giờ/tuần kèm số phút/ngày `rounded-xl`.
    - **Full-Stack Persistence**: Đồng bộ ngầm trạng thái mục tiêu qua API `/api/study-plan/generate` và lưu cache `localStorage` 0ms.
  - **Step 2: Dòng Chặng Học & Thẻ Bài Học Cá Nhân Hóa (`Pathway Timeline & Lesson Cards`)**:
    - **Hero Banner Lộ Trình (`rounded-2xl`)**: Hiển thị chứng chỉ mục tiêu, tiến độ hoàn thành `% Hoàn Thành` dạng pill và nút "Đổi Mục Tiêu AI".
    - **Khung Từng Chặng Học (`rounded-2xl`)**: Header chặng với Badge `Chặng 1/2/3`, tiêu đề chặng, mô tả mục tiêu và **Hộp Rương Thưởng Bí Ẩn** (`Chest Reward Badge rounded-xl` phát sáng khi hoàn thành chặng: `+250 XP & +100 Coins`).
    - **Thẻ Bài Học Chi Tiết (`rounded-xl`)**: Checkbox tròn tùy chỉnh với hiệu ứng toggle 0ms nhận điểm thưởng `+XP` ngay lập tức, badge kỹ năng có icon nhận diện (`Luyện Nghe`, `Đọc Hiểu`, `Luyện Nói AI`, `Luyện Viết`, `Ngữ Pháp AI`, `Từ Vựng`), mô tả ngày học và nút `[ ▷ Luyện Ngay ]` dẫn trực tiếp tới phòng học tương ứng.
    - **Thẻ Hướng Dẫn Inspector Cột Phải (`lg:col-span-4 rounded-2xl sticky`)**: Hiển thị bài học đang chọn, mẹo làm bài ăn điểm (*Exam Score Tips* trong khung `rounded-xl`), mức thưởng XP và nút Primary kích hoạt bài học.
  - **Khung Xương Tải Trang Đồng Bộ Hình Học (`roadmap/loading.tsx`)**: Tái hiện chuẩn xác 100% từng pixel Header 56px, Hero Banner, 2 Khung Chặng học bên trái và Thẻ Inspector bên phải, đảm bảo 0px layout shift.

### 4. Bảng Xếp Hạng & Cộng Đồng (`/community`)
- **`/community`**: Mạng xã hội học tập tương tác chuẩn Agency Tier tích hợp **`AppTopHeader` (56px Baseline)** và bố cục **Bento Grid 8/12 Feed + 4/12 Sidebar Widgets**:
  - **Thanh Header Đỉnh Đồng Bộ (`AppTopHeader`)**: Tích hợp 4 Tab Pill (`HeaderPillContainer` & `HeaderPillItem`): **"Bảng Tin"** (`/community`), **"Xếp Hạng"** (`/community/leaderboard`), **"Bạn Bè"** (`/community/friends`), **"Nhóm Học"** (`/community/groups`), cùng nút Primary `[ ✍️ Đăng Bài Viết +20 XP ]`. Đã đăng ký `pathname === "/community" || pathname?.startsWith("/community")` vào `isHeaderIntegratedActive` tại [layout.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/layout.tsx) để triệt tiêu Navbar thừa trên mobile và mở rộng không gian hiển thị tràn viền sát nóc.
  - **Hero Spotlight Banner (`rounded-2xl`)**: Gradient Xanh Hoàng Gia sang trọng (`from-[#0059bb] via-[#004fba] to-[#00388a]`) kèm hiệu ứng ambient blur orbs, hiển thị huy hiệu `1,240+ Học Viên Online` và `Thưởng +20 XP / Bài đăng`.
  - **Khung Tạo Bài Viết (`rounded-2xl`)**: Ô nhập `textarea` bo góc `rounded-xl`, gợi ý hashtag nhanh (`#MeoHocTuVung`, `#LuyenThiTOEIC`, `#IELTSWriting`) và nút đăng bài với **Optimistic UI 0ms** nhận ngay +20 XP.
  - **Dòng Bảng Tin & Tương Tác (`Feed Stream`)**: Thẻ bài viết `rounded-2xl`, header tác giả với `UserAvatar`, badge `Member` bo viền, tag từ vựng `rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#0059bb]`, thanh đếm tương tác (Lượt thích màu Rose, Bình luận màu Blue), và khu vực bình luận mở rộng mượt mà.
  - **Cụm 3 Widget Bento Cột Phải (`lg:col-span-4`)**:
    - **Widget 1 (Top 3 Tuần `rounded-2xl`)**: Bục vinh danh thu nhỏ Top 1, Top 2, Top 3 kèm điểm XP và liên kết xem toàn bộ bảng xếp hạng.
    - **Widget 2 (Nhóm Học Nổi Bật `rounded-2xl`)**: Danh sách CLB IELTS, Hội cày 3000 từ TOEIC kèm số lượng thành viên.
    - **Widget 3 (Mẹo AI Ghi Nhớ Nhanh `rounded-2xl`)**: Thẻ mẹo ghi nhớ chủ động (Active Recall) nền xanh hoàng gia dịu.
- **`/community/leaderboard`**: Bảng vinh danh chiến binh XP English tuần:
  - **Spotlight Hero Banner (`rounded-2xl`)**: Gradient Xanh Hoàng Gia kèm đồng hồ đếm ngược reset tuần và badge vị trí của người dùng.
  - **Bục Quán Quân Bento 3D Top 1-3 (`rounded-2xl`)**: Vàng Quán Quân #1 (ở giữa cao nhất), Bạc Á Quân #2, Đồng Hạng Ba #3 thiết kế huy hiệu metallic nổi bật.
  - **Danh Sách Hạng 4-50 (`rounded-2xl`)**: Stream danh sách học viên với huy hiệu cấp độ `Lv` và highlight vị trí của bạn (`isCurrentUser`).
  - **Thanh Điều Hướng Thông Minh**: Nút **`[ ← Quay lại trang Thống kê ]`** CHỈ hiển thị khi học viên truy cập từ `/analytics?from=analytics`.
- **`/community/friends`**: Quản lý bạn bè và gợi ý bạn học đồng hành:
  - Khung tìm kiếm bạn bè `rounded-xl` theo username, danh sách lời mời kết bạn đang chờ, danh sách bạn bè hiện tại và widget gợi ý bạn học đồng hành (+10 XP / lời mời).
- **`/community/groups`**: Câu lạc bộ & Nhóm học thuật chuyên sâu:
  - Danh sách nhóm học tập (IELTS Speaking, 3000 Từ TOEIC, v.v.), tham gia nhóm 1 chạm và tính năng khởi tạo nhóm mới dành cho học viên Cấp 15+.
- **Hệ Thống Khung Xương Tải Trang Đồng Bộ Hình Học 100% (Zero Layout Shift Skeletons)**:
  - **`community/loading.tsx`**: Tái hiện chuẩn xác 100% từng pixel Header 56px, Hero Banner, Khung đăng bài và 3 khối widget cột phải.
  - **`community/leaderboard/loading.tsx`**: Tái hiện 100% Header 56px (Tab Xếp Hạng active), Bục Quán Quân Top 1-3 và Danh sách Hạng 4+.
  - **`community/friends/loading.tsx`**: Tái hiện 100% Header 56px (Tab Bạn Bè active), Khung tìm kiếm và Danh sách bạn bè.
  - **`community/groups/loading.tsx`**: Tái hiện 100% Header 56px (Tab Nhóm Học active), Lưới 2x2 câu lạc bộ và Widget nhóm của bạn.

### 5. Học Từ Vựng & Luyện Nghe (`/vocabulary` & `/listening`)
- **`/vocabulary`**: Kho Từ Vựng Tiếng Anh Toàn Diện (Bao gồm Kho Cơ Bản A1-A2 & Kho Trung/Cao Cấp B1-C2).
  - **Kho Từ Vựng Cơ Bản Nhất Hàng Ngày (`lib/data/basicVocabularies.ts`)**: Cung cấp **1.248+ từ vựng nền tảng A1-A2 thiết yếu nhất** phân bổ tối đa qua **60 Chủ Đề Cơ Bản Nhất Hàng Ngày**:
    1. *Chào hỏi & Giao tiếp xã giao* (`t_basic_greetings`) - 30 từ
    2. *Giới thiệu bản thân & Đại từ* (`t_basic_introductions`) - 35 từ
    3. *Số đếm & Số thứ tự* (`t_basic_numbers`) - 25 từ
    4. *Màu sắc & Hình khối* (`t_basic_colors_shapes`) - 21 từ
    5. *Gia đình & Người thân* (`t_basic_family`) - 20 từ
    6. *Nhà cửa & Đồ dùng sinh hoạt* (`t_basic_home_objects`) - 24 từ
    7. *Hành động & Động từ hàng ngày* (`t_basic_daily_verbs`) - 20 từ
    8. *Ăn uống & Thực phẩm* (`t_basic_food_drinks`) - 23 từ
    9. *Cảm xúc & Tính từ thông dụng* (`t_basic_emotions_adjectives`) - 22 từ
    10. *Thời gian, Ngày tháng & Mùa* (`t_basic_time_calendar`) - 22 từ
    11. *Động vật quen thuộc* (`t_basic_animals`) - 22 từ
    12. *Bộ phận cơ thể* (`t_basic_body_parts`) - 22 từ
    13. *Trang phục cơ bản* (`t_basic_clothes`) - 20 từ
    14. *Địa điểm & Chỉ đường* (`t_basic_places_directions`) - 22 từ
    15. *Thời tiết & Thiên nhiên* (`t_basic_weather_nature`) - 20 từ
    16. *Nghề nghiệp & Việc làm* (`t_basic_jobs_occupations`) - 20 từ
    17. *Phương tiện giao thông* (`t_basic_transportation`) - 20 từ
    18. *Trường học & Dụng cụ học tập* (`t_basic_school_stationery`) - 20 từ
    19. *Sở thích & Thể thao* (`t_basic_hobbies_sports`) - 20 từ
    20. *Mua sắm & Tiền tệ* (`t_basic_shopping_money`) - 20 từ
    21. *Cây cối & Hoa quả* (`t_basic_plants_fruits`) - 20 từ
    22. *Sức khỏe & Y tế* (`t_basic_health_medical`) - 20 từ
    23. *Dụng cụ nhà bếp & Nấu ăn* (`t_basic_kitchen_utensils`) - 20 từ
    24. *Văn phòng & Công nghệ cơ bản* (`t_basic_office_tech`) - 20 từ
    25. *Thành phố & Công trình* (`t_basic_city_buildings`) - 20 từ
    26. *Tính cách & Phẩm chất* (`t_basic_personality_traits`) - 20 từ
    27. *Giới từ & Vị trí không gian* (`t_basic_prepositions_positions`) - 20 từ
    28. *Giác quan & Cảm nhận* (`t_basic_senses_perceptions`) - 20 từ
    29. *Kỳ nghỉ & Du lịch* (`t_basic_vacation_tourism`) - 20 từ
    30. *Giải trí & Nghệ thuật* (`t_basic_entertainment_arts`) - 20 từ
    31. *Đo lường & Kích cỡ* (`t_basic_measurements_sizes`) - 20 từ
    32. *Dụng cụ & Sửa chữa* (`t_basic_tools_repair`) - 20 từ
    33. *Thiên tai & Thời tiết xấu* (`t_basic_severe_weather`) - 20 từ
    34. *Địa hình & Cảnh quan* (`t_basic_landforms_landscapes`) - 20 từ
    35. *Sinh vật biển & Đại dương* (`t_basic_marine_life`) - 20 từ
    36. *Côn trùng & Sâu bọ* (`t_basic_insects_bugs`) - 20 từ
    37. *Gia vị & Hương vị* (`t_basic_spices_herbs`) - 20 từ
    38. *Bánh ngọt & Tráng miệng* (`t_basic_bakery_desserts`) - 20 từ
    39. *Đồ uống & Trà sữa* (`t_basic_drinks_beverages`) - 20 từ
    40. *Dọn dẹp & Việc nhà* (`t_basic_cleaning_chores`) - 20 từ
    41. *Phụ kiện thời trang* (`t_basic_fashion_accessories`) - 20 từ
    42. *Phòng ngủ & Giấc ngủ* (`t_basic_bedroom_sleep`) - 20 từ
    43. *Phòng tắm & Vệ sinh* (`t_basic_bathroom_toiletries`) - 20 từ
    44. *Cảm giác cơ thể* (`t_basic_bodily_sensations`) - 20 từ
    45. *Cảm xúc & Thái độ sống* (`t_basic_feelings_attitudes`) - 20 từ
    46. *Mối quan hệ & Xã hội* (`t_basic_relationships_social`) - 20 từ
    47. *Giao tiếp & Thư tín* (`t_basic_conversation_communication`) - 20 từ
    48. *Hình học & Họa tiết* (`t_basic_geometry_patterns`) - 20 từ
    49. *Chất liệu & Vật liệu* (`t_basic_materials_substances`) - 20 từ
    50. *Âm thanh & Nhạc cụ* (`t_basic_sounds_instruments`) - 20 từ
    51. *Ánh sáng & Thị giác* (`t_basic_light_visual_effects`) - 20 từ
    52. *Vận động cơ thể & Thể dục* (`t_basic_body_movements`) - 20 từ
    53. *Dịch vụ & Tiện ích công* (`t_basic_convenience_services`) - 20 từ
    54. *Sân bay & Nhà ga* (`t_basic_airport_station_travel`) - 20 từ
    55. *Khách sạn & Lưu trú* (`t_basic_hotel_accommodation`) - 20 từ
    56. *Ẩm thực đường phố & Ăn vặt* (`t_basic_street_food_snacks`) - 20 từ
    57. *Giai đoạn cuộc đời & Tuổi tác* (`t_basic_life_stages_age`) - 20 từ
    58. *Lễ hội & Phong tục* (`t_basic_holidays_customs`) - 20 từ
    59. *An toàn & Luật lệ* (`t_basic_safety_warnings_rules`) - 20 từ
    60. *Thiết bị điện tử & Gia dụng* (`t_basic_appliances_gadgets`) - 20 từ
  - **Hệ Thống Phân Cấp 2 Kho Từ Vựng Riêng Biệt (Dual Vocabulary Bank)**:
    - **Nút 1: "Từ vựng cơ bản" (A1 - A2)**: Nạp trực tiếp từ `lib/data/basicVocabularies.ts` gồm **60 Chủ đề cơ bản hàng ngày (1.248+ từ vựng thiết yếu)** đầy đủ phiên âm IPA quốc tế, từ loại và 2 câu ví dụ song ngữ thực tế cho mỗi từ.
    - **Nút 2: "Từ vựng nâng cao" (B1 - C2)**: Nạp trực tiếp từ `lib/data/advancedVocabularies.ts` gồm **155 Chủ đề nâng cao, học thuật, TOEIC, IELTS & chuyên ngành (8.900+ từ vựng)**.
    - **Bộ Chuyển Đổi Tab 2 Nút (Segmented Level Switcher)**: Thiết kế tối giản, sắc nét với icon Lucide chuẩn Dashboard (`BookOpen` & `GraduationCap`), cho phép chuyển đổi tức thời giữa 2 kho từ vựng từ 2 file riêng biệt mà không cần tải lại trang.
  - **Tích hợp API & UI 0ms**: Toàn bộ từ vựng được liên kết trực tiếp vào API `/api/vocabulary`, hỗ trợ học qua Flashcard 3D, Luyện Quiz trắc nghiệm, Nghe phát âm chuẩn IPA và tra từ điển chi tiết.
  - **Mobile Layout Optimize**: Ô tìm kiếm nổi bật ngay dưới Mobile Header Bar không bị lấp khuất, ẩn subtext rườm rà `hidden sm:block`.
  - **4 Bento Stats Cards**: Tự động hiển thị các chỉ số tương ứng theo cấp độ (Cơ bản: 60 bộ từ / 1.248+ từ; Nâng cao: 155 bộ từ / 8.900+ từ).
  - **Theme Cards Grid**: Thu nhỏ độ cao thẻ 35% trên mobile, gộp Icon + Title trên 1 hàng flex ngang, gộp Độ khó & Tiến trình trên 1 hàng chân thẻ. Căn giữa nút "Khám phá thêm" full-width trên mobile.
- **`/vocabulary/[id]`**: Thẻ học Flashcard thông minh, tích hợp âm thanh & lưu từ yêu thích (`toggleFavorite`).
- **`/study/listening`**: Phòng Luyện Nghe Dictation & Chép Chính Tả Từng Câu AI (Thiết kế Single-Sentence Focus Dictation Studio Chuẩn Bento).
  - **Đồng Bộ Nền Canvas Xám Nhạt Cao Cấp (`bg-[#f8fafc] dark:bg-[#050505]`)**: Toàn bộ hệ thống bento cards màu trắng tinh khôi (`bg-white dark:bg-slate-900`) nổi bật tự nhiên với độ sâu thị giác (visual depth), viền hairline mềm mại và bóng đổ nhẹ `shadow-sm`, loại bỏ hiện tượng trắng bẹt hòa lẫn nền.
  - **Hệ Thống Điều Hướng URL Theo ID (`/study/listening?id=36` hoặc `?id=N`)**: Tự động nhận diện tham số ID trên URL để nạp bài học tương ứng, tự động thu gọn Sidebar khi vào làm bài và mở rộng lại khi bấm Quay lại.
  - **Thanh Đỉnh Thống Nhất Tràn Viền (`StudioTopHeader.tsx`)**: Header chuẩn hoá cho cả 2 trang với thanh bar ngang phẳng `w-full px-5 sm:px-6 py-2 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800`, gồm nút Quay lại `←`, Tiêu đề bài học nổi bật to rõ (`font-display`), Nút Bookmark `☆`, Segmented Switcher `[🎙️ Shadowing]` ⟷ `[🎧 Dictation]` nằm ngay cạnh tiêu đề, cùng cụm nút công cụ phòng thu bên phải (`Layout`, `Columns`, `Rows`, `Maximize`, `Keyboard Shortcuts`). Đã loại bỏ hoàn toàn khối badge cấp độ (`INTERMEDIATE` / `B2`) giúp thanh header tinh gọn và tập trung tối đa vào nội dung bài học.
  - **Bố Cục 100vh Zero-Scroll Studio (Không Cần Cuộn Trang)**: Toàn bộ không gian làm bài (`?id=...`) được khóa cố định theo chiều cao màn hình `100dvh` (`h-screen max-h-screen overflow-hidden`), bám sát lề thanh Sidebar thu gọn (72px) và mép phải màn hình. Tất cả 4 khối làm việc được tính toán padding tinh gọn để hiển thị trọn vẹn trong một màn hình duy nhất, chỉ để lại khoảng thở tự nhiên (~25px-30px) ở đáy mà không gây thanh cuộn trang.
  - **Bố Cục 2 Cột Liền Mạch Ngăn Cách Bằng Vạch Đứng (`border-l`)**:
    - **Cột Trái (Flex 1 - Main Dictation Workspace)**:
      - **Khối Audio Waveform Studio (`StudioWaveformCard.tsx`)**: Khung card `rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 shadow-sm p-3.5 sm:p-4 space-y-2.5`, bố cục 2 góc rìa trên (Trái: Trạng thái Sóng âm câu + chấm nhịp điệu phát sáng, Phải: Đồng hồ số điện tử `00:09 / 00:23` dạng pill `font-mono tabular-nums text-xs sm:text-sm`), phổ sóng âm 41 thanh Pinned Caps căn giữa với hiệu ứng Fluid Harmonic Wave `h-11 sm:h-12`, hàng 5 nút điều khiển (`|◁`, `↺` có số 5, Master Play Button hình tròn nổi bật viền phản quang `w-11 h-11 sm:w-12 sm:h-12`, `↻` có số 5, `▷|`), và dock chọn tốc độ viên nang `rounded-full p-0.5 [0.5x  0.75x  1x  1.25x  1.5x]`.
      - **Dòng Meta Phản Xạ & Thanh Tiện Ích**: `#2  0/13 từ  Khớp: 0%  [Enter] [Ctrl]`, Thanh công cụ tiện ích `rounded-xl px-3.5 py-2` (`Lưu câu`, `Báo cáo`, `-A/+A` chỉnh cỡ chữ 4 cấp, switch `Tự động tiếp`, switch `Ẩn dịch (i)`).
      - **Trình Nhập Liệu Chép Chính Tả (`DictationWorkspace.tsx`)**: Bố cục trực quan công thái học mới: Dải từ vựng (`Word Tokens Track`) được đặt ở phía trên (`rounded-xl`), hiển thị toàn bộ token từ của câu trên 1 hàng ngang duy nhất cuộn mượt tự động theo tiến trình gõ; Ô nhập liệu chép chính tả (`Điền câu đã nghe...`) đặt ngay phía dưới (`rounded-xl`), đi kèm hàng nút công cụ tiện ích (`✨ Chữ cái đầu Alt+H`, `👁 Xem từ Alt+R`, `👁 Xem dịch`, `↺ Làm lại`).
      - **Hệ Thống Skeleton Loading 6 Trạng Thái Khớp 100% Hình Học (Zero Layout Shift)**: Tự động phân nhánh hiển thị Skeleton Loading tái hiện chuẩn xác từng pixel cho cả 6 trường hợp trên toàn bộ 3 trang Studio:
        1. `/study/listening` (Listing mode - Khung xương lưới bài nghe với ảnh 47% dạng ngang trên Mobile và thẻ dọc 4 cột trên Desktop).
        2. `/study/listening?id=...` (Studio mode - Khung xương Sóng âm 44-bar + Khối từ + Ô nhập + Danh sách phụ đề).
        3. `/study/shadowing` (Listing mode - Khung xương lưới bài nói với ảnh 47% dạng ngang trên Mobile và thẻ dọc 4 cột trên Desktop).
        4. `/study/shadowing?id=...` (Studio mode - Khung xương Sóng âm + Thẻ câu 1 hàng + Nút thu âm/chấm điểm + Danh sách phụ đề).
        5. `/study/reading` (Listing mode - Khung xương danh mục bài đọc A1-A2 & B1-C2 với ảnh 47% dạng ngang trên Mobile và thẻ dọc trên Desktop, trang bị tại `app/(dashboard)/study/reading/loading.tsx`).
        6. `/study/reading?id=...` (Studio mode - Khung xương Đọc tương tác 2 cột: Cột trái 60% đoạn văn bản + Kệ từ vựng; Cột phải 40% thẻ câu hỏi trắc nghiệm & 4 ô đáp án A/B/C/D).
        - Triệt tiêu 100% hiện tượng giật nhảy layout (Zero CLS) trên thiết bị di động, tuân thủ nghiêm ngặt Quy tắc UI/UX #1 (Dùng Skeleton thay vì Spinner cổ điển).
      - **Màn Hình Mobile & Tablet (`< lg`, < 1024px)**:
        - **Chế độ Studio Immersion**: Tự động ẩn `BottomNav` và `Navbar` chung để giải phóng trọn vẹn ~120px không gian chiều dọc cho bài học.
        - **Header & Mobile Switcher Scale Chuẩn Công Thái Học**:
          - Thanh `StudioTopHeader` được tăng độ thoáng (`py-2.5 sm:py-3`), tiêu đề rõ nét (`text-sm sm:text-base font-bold`), nút quay lại và pill chế độ `[ 🎤 Nói ] [ 🎧 Nghe ]` dễ thao tác.
          - Thanh chuyển tab Mobile `🎧 Luyện chép (1/14)` và `📑 Danh sách phụ đề (14)` nâng cấp font `text-sm sm:text-[15px] font-bold`, icon `w-4 h-4` và đường gạch chân bo tròn `h-[2.5px] bg-blue-600 rounded-t-full` cân đối hoàn hảo với toàn trang.
          - `🎧 Luyện chép (1/14)`: Tối ưu 100% không gian cho khối Sóng âm + Khung nhập liệu + Token từ vựng + 4 nút thao tác đáy (hỗ trợ touch target ≥ 42px).
          - `📑 Danh sách phụ đề (14)`: Hiển thị đầy đủ danh sách câu, tiến độ và gợi ý từ vựng. Khi chạm vào bất kỳ câu nào, hệ thống tự động chuyển mượt về tab luyện chép câu đó.
        - Tự động ẩn phím tắt bàn phím vật lý (`[Alt+H]`, `[Alt+R]`, `Enter`, `Ctrl`) trên thiết bị cảm ứng, giữ giao diện tinh gọn và tập trung.
  - **Tra Từ Điển Popover & Mobile Word Dictionary Modal (`selectedWord`)**: Chạm vào bất kỳ từ vựng nào để mở modal tra nghĩa, phát âm IPA và ví dụ.

- **`/study/practice`**: Phòng Luyện Tập Từ Vựng Đa Chế Độ Tương Tác 4-in-1 (Quiz Não Bộ, Flashcard 3D SRS, Writing Gõ Chính Tả & Speaking AI).
  - **Đồng Bộ Bố Cục & Thẩm Mỹ Chuẩn 60-30-10**: Toàn bộ 4 chế độ sử dụng chung cấu trúc khung thẻ mục tiêu cân đối `min-h-[160px] sm:min-h-[185px]`, dải gradient `from-slate-50 via-white to-blue-50/25` (`dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20`), viền hairline `border-slate-200/90 dark:border-slate-800` và đệm chuẩn mực.
  - **Hàng Thông Tin Đỉnh & Đáy Đồng Nhất (Top & Bottom Metadata Rows)**:
    - **Hàng Đỉnh (Top Row)**: Huy hiệu nhận diện chế độ (Quiz Não bộ `Brain`, Flashcard `Layers`, Writing `PenLine`), Loại từ `[ Danh từ (n.) ]`, Cấp độ CEFR `[ B2 ]`, Bộ đếm thời gian 15s đếm ngược từng câu (`⏱️ 15s`) tự động đổi màu cảnh báo, và Nút Sổ tay từ vựng nhanh dạng icon-only `[ 🔖 ]` (`w-7 h-7`).
    - **Hàng Đáy (Bottom Row)**: Góc trái hiển thị thư mục chủ đề `📁 Chủ đề: ...`, góc phải hiển thị cụm phím nhanh gọn gàng trên 1 hàng ngang duy nhất (`⌨️ Phím nhanh:`).
  - **Chế Độ 1: Quiz Não Bộ Trắc Nghiệm**: 4 thẻ đáp án tương tác chuẩn Slate card `bg-slate-50/80 hover:bg-blue-50/50 hover:border-[#0059bb]`, phím tắt nhanh `1`, `2`, `3`, `4`, `A`, `B`, `C`, `D`, `Numpad`.
  - **Chế Độ 2: Flashcard 3D SRS Xoay Lật Độc Lập**: Khối thẻ từ vựng trung tâm xoay 180° trong không gian 3D (`[perspective:1000px]`, `[transform-style:preserve-3d]`) khi click hoặc bấm phím `Space`; đi kèm 3 nút đánh giá ghi nhớ SRS thanh lịch (`[1] Chưa nhớ (+5XP)`, `[2] Nhớ tốt (+10XP)`, `[3] Rất dễ (+15XP)`).
  - **Chế Độ 3: Writing Gõ Chính Tả & Kiểm Tra Tức Thì**: Ô nhập liệu gõ từ tiếng Anh tự động nhận con trỏ (`autofocus`), tích hợp nút gợi ý ký tự đầu `💡 Gợi ý: r _ _ _ _ (10 ký tự)`, và nộp bài kiểm tra siêu tốc với phím `Enter`.
  - **Thanh Điều Hướng Đáy & Phản Hồi Trạng Thái (Bottom Action Bar)**: Bộ đôi nút `[ < Câu trước ]` - `[ Câu tiếp theo > ]` bo góc `rounded-xl` kẹp thanh phản hồi kết quả dạng Pill Badge nổi bật (`✓ Chính xác! (+10 XP)` / `✕ Chưa đúng! Đáp án: ...`).
  - **Cột Phải Word Lab & Context Insights (4/12)**: Thẻ hồ sơ từ vựng, nút Bookmark lưu nhanh, phiên âm IPA, câu ví dụ thực tế song ngữ font chữ thẳng đứng và mẹo ghi nhớ ngắt quãng SRS.

- **`/study/exam-prep`**: Đấu Trường Thi Thử Đề Chuẩn Quốc Tế ETS / IELTS / TOEIC 2026 (Bento 3 Chế Độ Toàn Diện).
  - **Top Bar Header Chuẩn Hóa (`AppTopHeader` 56px Baseline)**: Đồng bộ với toàn bộ phân hệ `/study` với dải Pill chuyển đổi Edge-to-Edge (`[ 🎯 Thi thử đề (Active) ]` `[ 💡 Luyện từ vựng ]` `[ 🎧 Dictation ]` `[ 🎙️ Shadowing ]`).
  - **Chế Độ 1: Exam Hub / Test Bank (Ngân Hàng 37 Đề Chuẩn & AI Exam Generator)**:
    - **Hero Bento Banner**: Nền Slate thanh lịch điểm xuyết ánh sáng Rose/Cherry `#f43f5e` tạo cảm giác phòng thi chuẩn quốc tế nghiêm túc, tập trung.
    - **Bộ Lọc Đa Kỹ Năng 4-Skill Matrix**: Lọc tức thì theo `[ 🎧 Listening ]` `[ 📖 Reading ]` `[ 🎙️ Speaking AI ]` `[ ✍️ Writing AI ]`.
    - **Thẻ 37 Đề Thi Chuẩn Hóa**: Bo góc `rounded-2xl`, hiển thị sao độ khó ⭐, thời gian làm bài, số câu và nút CTA chính `[ Bắt đầu ↵ ]` (`rounded-xl`).
  - **Chế Độ 2: Live Test Workspace (Phòng Thi Trực Tuyến)**:
    - **Thanh Header Chuẩn Hóa Theo Phong Cách AppTopHeader (`h-14` 56px Baseline)**: Trải dài toàn chiều ngang, đính cố định trên cùng (`sticky top-0 z-30`), tích hợp nút `[← Thoát bài thi]`, icon well tài liệu, badge phân loại đề thi, bộ đếm ngược thời gian `Clock` và nút `[Nộp bài ngay]` nổi bật.
    - Dual-Panel Split View tối ưu cho từng kỹ năng (`ListeningWorkspace`, `ReadingWorkspace`, `SpeakingStudioWorkspace`, `WritingStudioWorkspace`).
    - Thanh điều hướng nổi ngón tay cái dưới đáy màn hình trên Mobile (`[Trước]`, `[Ghim ⭐]`, `[Phiếu 📋]`, `[Tiếp]`).
  - **Trang Báo Cáo Chấm Điểm Độc Lập (`/study/exam-prep/result`)**:
    - **Thanh Header Chuẩn Hóa `AppTopHeader` (56px Baseline)**: Đính cố định trên cùng (`sticky top-0 z-30`), tích hợp dải Pill chuyển Tab (`[ 1. Điểm Số ]`, `[ 2. Lời Giải (N) ]`, `[ 3. Lộ Trình AI ]`) cùng 2 nút hành động trực tiếp bên phải: `[← Danh Sách Đề]` và `[🔄 Thi Lại]`.
    - **Tab 1: Bento Score Overview**: SVG Radial Gauge đo độ chuẩn xác, 4 thẻ Double-Bezel metrics (Câu đúng, Câu sai, Câu bỏ qua, Tốc độ làm bài), cùng bảng phân tích Grade từng Part.
    - **Tab 2: Master-Detail Bento Review Studio (Lời Giải Chuyên Sâu Nguyên Bản)**:
      - *Cột Trái (lg:col-span-4)*: Sticky Question Navigator với 5 bộ lọc trạng thái cân đối (Tất cả câu hỏi full-width, lưới 2x2: Đúng, Sai, Bỏ qua, Đánh dấu với Lucide Icons), Dropdown chọn Part, và **Bảng Ma Trận Câu Hỏi Chuẩn Hóa Theo UI Phiếu Thi (`h-10` `rounded-xl` 2 dòng hiển thị số câu + đáp án đã chọn `A/B/C/D` + icon ngôi sao ghim)** kèm 3 badge chú thích tổng số câu Đúng/Sai/Bỏ qua trực quan.
      - *Cột Phải (lg:col-span-8)*: Rich Question Deep Inspector gồm Thanh trạng thái câu, Audio Player Studio xanh `#ebf3fe` kèm Transcript, Lưới phương án A/B/C/D phân biệt `✓ ĐÁP ÁN CHÍNH XÁC` & `✗ BẠN ĐÃ CHỌN`, Hộp lời giải chuyên sâu hổ phách `FormattedExplanation` (hỗ trợ phân tích Gemini AI 1-click), và Stepper chuyển câu.
    - **Tab 3: AI Cognitive Diagnostic & Action Roadmap Studio (Tái Thiết Kế Chuẩn Agency)**:
      - *Tầng 1 (Asymmetrical Bento 8-4)*: 
        - **Radar Năng Lực 5 Trục Cốt Lõi AI (8/12 - Khối Nổi Bật Tinh Tế & Sắc Nét)**: Biểu đồ ngũ giác SVG Polygon lớn với mạng nhện 5 tầng, **5 tiêu chí năng lực vi mô đặt trực tiếp tại 5 góc biểu đồ bằng chữ thuần túy (không khối viền, màu sắc ngữ nghĩa sắc nét)**: `Từ vựng ETS` (Xanh hoàng gia), `Ngữ pháp` (Tím AI), `Phản xạ âm` (Xanh ngọc bích), `Bắt bẫy đề` (Đỏ Rose), `Tốc độ đọc` (Vàng Hổ phách), kết hợp 5 thẻ Bento tiến độ năng lực bên phải.
        - **Dự Phóng Điểm Số & Cố Vấn Gemini AI (4/12)**: Thẻ so sánh điểm bài thi hiện tại vs điểm mục tiêu khả thi (+200-260đ), tích hợp Khung lộ trình gia tăng điểm số 3 chặng và nút gọi Gemini AI Coach tư vấn chiến lược 1-click.
      - *Tầng 2 (1 Cột 2 Hàng Xếp Chồng Full-Width)*:
        - **Hàng 1: Lỗ Hổng Trọng Điểm & Bẫy Cần Sửa Gấp (Full-Width)**: Khung lớn trải rộng với lưới 3 thẻ bẫy đề thi (`Part 1`, `Part 2`, `Part 3`), gắn nhãn `Khẩn Cấp` / `Cần Lưu Ý` và nút tương tác trực tiếp `[Xem câu sai Part N ↗]` (nhảy thẳng sang Tab 2 lọc đúng Part).
        - **Hàng 2: Điểm Mạnh Đã Làm Chủ & Phân Bổ Thời Lượng 14 Ngày (Full-Width)**: Ghi nhận các kỹ năng xuất sắc và phân bổ thời lượng biểu ôn luyện 45 phút mỗi ngày (20p Dictation + 15p Sửa bẫy + 10p Flashcard SRS).
      - *Tầng 3 (Chronological Action Hub)*: Lộ trình hành động 3 chặng kết nối liền mạch (*Chặng 1: Giải Mã Bẫy Câu Sai ➔ Chặng 2: Luyện Dictation Nghe ➔ Chặng 3: Ôn Trí Nhớ Từ Vựng SRS*) với các nút CTA hành động trực tiếp.
  - **Khung Xương Tải Trang (`loading.tsx`)**: Nâng cấp toàn diện theo chuẩn Skeleton Bento `rounded-2xl` & `rounded-xl` đồng bộ khổ rộng Dashboard, triệt tiêu 100% giật nhảy layout (Zero Layout Shift).

- **`/study/shadowing`**: Phòng Luyện Nói & Nhại Giọng Bản Xứ AI (Studio AI Speaking & Shadowing Bento 2 Cột).
  - **Đồng Bộ Nền Canvas Xám Nhạt Cao Cấp (`bg-[#f8fafc] dark:bg-[#050505]`)**: Các khối Bento Card trắng tinh khôi nổi bật tự nhiên trên nền canvas với chiều sâu và bóng đổ mềm mại `shadow-sm`.
  - **Hero Announcement Banner**: Thiết kế gradient `rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/60 dark:from-slate-900 dark:to-blue-950/30 border border-blue-200/70 shadow-sm`, icon well bo góc `rounded-xl`, badge tròn `rounded-full` và nút khám phá `rounded-xl`.
  - **Danh Sách 10 Bài Đọc Nằm Ngang**: Thẻ Bento Cards `rounded-2xl border-slate-200/90 hover:border-blue-500 hover:shadow-md`, ảnh bìa `rounded-xl`, các huy hiệu cấp độ & hoàn thành dạng pill `rounded-full`.
  - **Modal Khám Phá 100+ Bài Học**: Container bo góc lớn `rounded-3xl shadow-2xl`, ô tìm kiếm `rounded-xl`, bộ lọc cấp độ dạng viên nang `rounded-full`, từng dòng bài học `rounded-xl` với thumbnail `rounded-xl`.
  - **Thanh Đỉnh Thống Nhất (`StudioTopHeader.tsx`)**: Đồng bộ 100% với trang Listening gồm Back `←`, Level Badge, Tiêu đề bài học, Bookmark `☆`, Đồng hồ bấm giờ học tập `00:00` và Mode Switcher `[🎙️ Shadowing (Active)]` ⟷ `[🎧 Dictation]`.
  - **Bento Grid 2 Cột Đối Xứng (Cột Trái 5/12 + Cột Phải 7/12)**:
    - **Cột Trái (5/12 - Audio & Phụ Đề)**:
      - `<StudioWaveformCard>` ở trên (Bố cục Studio Bento 2 tầng: Trạng thái âm thanh và đồng hồ thời gian đặt ở 2 góc rìa trên cùng của Card, phổ sóng âm giọng nói tự nhiên Pinned Pill Caps 41 thanh acoustic với 5 thanh ngắn nhỏ đều nhau ở 2 đầu rìa chuẩn ảnh mẫu, căn giữa thuần nổi không khối nền không border, bảng màu tối thanh lịch Monochrome Slate `bg-slate-800 dark:bg-slate-100` khi phát kết hợp hoạt ảnh Fluid Harmonic Wave lượn sóng mạnh mẽ nhưng siêu mượt mà dạng dòng nước, Master Play Button viền phản quang `w-14 h-14 sm:w-16 sm:h-16`, 4 nút phụ bo tròn và speed pill dock `rounded-full`).
      - `<InteractiveTranscriptSidebar>` ở dưới (Giao diện tối giản, trực quan: Tab `Phụ đề` / `Gợi ý từ vựng`, thanh tiến độ mỏng thanh lịch, toggle ẩn/hiện chữ, danh sách thẻ câu gọn gàng với thẻ active viền xanh nổi bật, thẻ hoàn thành tích xanh ngọc bích, và các thẻ từ vựng then chốt có nút phát âm riêng từng từ).
    - **Cột Phải (7/12 - AI Speaking Studio)**:
      - **Header Meta & Actions Card**: Khung `rounded-2xl` `#1  8 từ  [ 🗣️ Ghép câu kế tiếp (0/2) ⓘ ]`, `[Lưu câu]`, `[Báo cáo]`.
      - **Khung Câu Trọng Tâm (Focus Sentence Card)**: Khung `rounded-2xl` với 3 chip toggles `rounded-lg`, câu tiếng Anh chữ to rõ nét hỗ trợ realtime color coding + nhấp tra từ điển tức thì; dòng phiên âm IPA chi tiết dưới từng từ; khung bản dịch tiếng Việt chuyên sâu; helper `ⓘ Nhấn vào từ để tra nghĩa`.
      - **Microphone Device Picker & Master Recording Capsule**: Bộ chọn Micro thiết bị `🎙️ Micro: Default... ⌄`, Nút ghi âm capsule lớn `rounded-2xl` `[ 🎙️ Nhấn để bắt đầu ghi âm (Tối đa 30 giây) ]` (khi đang thu chuyển viền đỏ nhấp nháy kèm sóng âm live).
      - **So Sánh Dual-Track & AI Speech Assessment 6 Chỉ Số**: So sánh Giọng mẫu vs Giọng của bạn; Chấm điểm 6 tiêu chí AI trong khung card `rounded-xl` phân cấp rõ ràng (Overall Score, Fluency, Pronunciation, Intonation, Completeness, Speed WPM, Stress); Thẻ nhận xét từ AI Voice Coach.
      - **Thanh Luyện Tập Phụ Dưới Đáy (Bottom Practice Sub-bar)**: Khung `rounded-2xl` với Prompt `"Nghe và lặp lại câu trên"`, dải word mask tokens preview `[ •• ] [ •••••••• ] ...`, bộ điều khiển mini `[|<] (▶) 0.5x 0.75x [1x] 1.5x`, và nút `Tiếp theo ➔`.
  - **Tương Tác Click Tra Từ Vựng 0ms & Mobile Word Audio Trigger**: 
    - **Trên Mobile (`< 768px`)**: Chạm/nhấn trực tiếp vào bất kỳ từ vựng nào sẽ tự động kích hoạt **phát âm chuẩn bản xứ của từ đó tức thì (0ms TTS)** mà không gây che khuất màn hình hay nổi khối popover.
    - **Trên Desktop/Tablet**: Mở Word Dictionary Modal ở góc phải với cấu trúc `rounded-2xl shadow-2xl`, hiển thị nghĩa, giải thích chi tiết, câu ví dụ với font chữ đứng thẳng (`not-italic`), phát âm IPA chuẩn.
    - **Khắc Phục Hoàn Toàn Border Clipping**: Bổ sung padding dọc `py-1.5 sm:py-2 px-1` cho thanh cuộn ngang token giúp các khối từ khi hover hiển thị trọn vẹn 100% viền bao quanh không bị lẹm.
  - **Khắc phục âm thanh trên Mobile Web (iOS Safari / Android Chrome)**: Tích hợp `mobileAudio.ts` (`unlockMobileAudio` & `safeSpeakText`), mở khóa Web Audio Context 100% không bị treo tiếng.
  - **Đồng Bộ Màu Sắc Thương Hiệu Toàn Diện**: Chuyển đổi 100% các thành phần màu `indigo` cũ sang **Royal Blue (`blue-600`, `sky-400`, `bg-blue-50`)** đồng bộ với toàn bộ ứng dụng.
  - **📐 Quy Chuẩn Bo Góc Cân Đối & Tinh Gọn (`app/globals.css` `@theme` & `:root`)**:
    - `rounded-xl`: `10px` (Khung Player Studio, Dictation Workspace, Transcript Sidebar, Header điều hướng, Thẻ bài học Listing).
    - `rounded-lg`: `8px` (Ô nhập câu chép chính tả, Thumbnail bài đọc, Hộp danh từ riêng, Dải đệm tokens từ).
    - `rounded-md`: `6px` (Thẻ Timer `00:10`, Thẻ từ Token `...`, Nút chức năng `Chữ cái đầu`/`Xem từ`, Nút chuyển câu, Buttons, Badges cấp độ).
    - `rounded-sm`: `4px` & `rounded-xs`: `2px` (Phím tắt KBD `Alt+H`/`Alt+R`, Tooltips).
    - `rounded-full`: `9999px` (Nút Master Play tròn đen, Capsule speed dock, Pill switches).
  - **🔤 Thang Phân Cấp Cỡ Chữ 5 Tầng (Typography Hierarchy Scale)**:
    - `Tier 1 (16px - 18px / Bold)`: Câu tiếng Anh đang học, Từ vựng chính, Tiêu đề bài học đỉnh.
    - `Tier 2 (13px - 14px / Bold-Mono)`: Đồng hồ số Timer `00:10 / 00:23`, Tiến độ `2/9` và `22%`, Bản dịch câu, Nút CTA `Câu tiếp theo ➔`.
    - `Tier 3 (12px / Semi-bold)`: Tab `Phụ đề` / `Gợi ý bài học`, Nút tiện ích `Lưu câu`/`Báo cáo`/`Chữ cái đầu`/`Xem từ`.
    - `Tier 4 (11px / Medium-Mono)`: Nhãn `"Tiến độ"`, `"Hiện"`, Phiên âm IPA, Loại từ `(n)/(v)`.
    - `Tier 5 (9px - 10px / Mono-Bold)`: Phím tắt `<kbd>Alt+H</kbd>`, `<kbd>Enter</kbd>`, Badge `[ ĐANG HỌC ]`, số 5s tua nhanh.
- **`/myvideo`**: Thư Viện Video & YouTube Subtitle Studio (Tái Thiết Kế Chuẩn Agency Dashboard Tier).
  - **Đồng Bộ Hoàn Toàn Với Sidebar (`Sidebar.tsx`)**:
    - Mục **"Video của tôi"** trên Sidebar được chuẩn hóa icon máy quay `<Video className="w-[21px] h-[21px]" strokeWidth={1.9} />` thay cho icon Ngôi sao `<Star>`.
    - Dải Pill trên Header đồng bộ 100% tên gọi & icon với Sidebar: `[ 🎬 Video của tôi (Active) ]` `[ 🎧 Dictation ]` `[ 🎙️ Shadowing ]` `[ 📑 Danh sách từ ]`.
  - **Thanh Header Đỉnh Dùng Chung Cao Cấp (`AppTopHeader` 56px Baseline)**: 
    - **Trên Desktop (≥ 1024px)**: Dính sát mép trên `top-0` và mép phải Sidebar (nhờ `layout.tsx` tích hợp `isHeaderIntegratedActive` zero-padding), ẩn Avatar/Theme thừa (đã có ở chân Sidebar), tích hợp Cụm nút thao tác nhanh `[ + Nhập SRT ]` & `[ ⚡ XP-Sub ]` và Danh ngôn truyền cảm hứng mỗi ngày.
    - **Trên Mobile (< 1024px)**: 1 Header duy nhất (loại bỏ double header `Navbar`), nút Hamburger mở Drawer Sidebar, dải Pill co gọn icon thông minh, đầy đủ nút Theme Toggle & Avatar.
  - **Spotlight Hero Banner & 4 Thẻ Micro-Metric Double-Bezel**:
    - Thẻ Tổng Video (`Video` - 30 video), Thời lượng học (`Clock` - 2.8h), Câu phụ đề tương tác (`Layers` - 1.2k+ câu), Video yêu thích (`Star` - 12 bài & 68% tiến độ).
    - Cấu trúc Double-Bezel chuẩn Dashboard (`rounded-xl` lồng trong `rounded-2xl` với nền `bg-slate-50/80 dark:bg-slate-950/60`).
  - **YouTube Import Studio Deck**: Khung dán URL YouTube thông minh, tích hợp bộ chọn Thư mục (`Giao tiếp`, `TED Talks`, `Business`, `Movies`, `News`, `IELTS/TOEIC`, `Tổng hợp`), Cấp độ (Easy, Medium, Hard), nút nạp tự động `1-Click Nạp Phụ Đề Chuẩn` và phím tắt mở `XP-Sub Extractor`.
  - **Master-Detail Bento Grid Tỷ Lệ Vàng (`1.62fr : 1fr`)**:
    - **Cột Trái (Player Studio 1.62fr)**:
      - Trình phát YouTube IFrame nhúng 60fps đồng bộ thời gian thực mốc mili-giây.
      - Media Control Bar: Nút Play/Pause lớn, nút Tráo câu ngẫu nhiên `Shuffle`, Lặp câu `Repeat1`, và Capsule Speed Dock `[0.5x, 0.75x, 1.0x, 1.25x, 1.5x]`.
      - Khung Video Meta & Lộ trình bài học: Tiêu đề, Tác giả/Kênh, Cấp độ CEFR, Thời lượng và Thanh tiến độ hoàn thành gradient.
    - **Cột Phải (Interactive Multi-Tab Dock 1fr)**:
      - **3 Tab Tương Tác**: `[ 📑 Phụ đề cuộn ]` (Rolling Karaoke 3 câu với highlight câu hiện tại, phiên âm IPA, nghĩa tiếng Việt, nhấp tra từ điển 0ms), `[ ✍️ Chép chính tả ]` (Dictation chép từ bị khuyết, chấm điểm AI +20 XP), và `[ 🎙️ Luyện nói ]` (Shadowing ghi âm waveform, chấm điểm phát âm).
  - **Thanh Tìm Kiếm & Bộ Lọc Đa Tầng**: Ô tìm kiếm video theo từ khóa, 4 trạng thái lọc (`Tất cả`, `Đang học`, `Đã xong`, `Yêu thích`), dải cuộn ngang phân loại chuyên ngành 8 danh mục.
  - **Kho Video Bento Grid**: Hiển thị lưới video 3 cột với Thumbnail sắc nét 16:9, nút Play overlay, huy hiệu thời lượng, ngôi sao yêu thích, thanh tiến trình học và nút `Luyện tập ngay ↵`.
  - **3 Modal Độc Lập Chuẩn Hóa (`rounded-2xl`)**:
    - *XP-Sub AI Extractor Enterprise Modal (Thiết kế Agency Tier)*: Trích xuất & đồng bộ phụ đề song ngữ tự chủ 100% từ YouTube Server (JSON, SRT, VTT) với giao diện 2 bước (Bước 1: Chọn Track gốc & Ngôn ngữ dịch với bộ chọn bo cong; Bước 2: Bảng xem trước Live Preview từng câu kèm phát âm TTS và thanh tìm kiếm từ vựng nhanh).
    - *SRT / VTT Direct Import Modal (Thiết kế Agency 2-Mode)*: Giao diện Modal cao cấp hỗ trợ 2 chế độ (1) Kéo thả Upload File trực tiếp từ thiết bị với khung nét đứt Dropzone hiện đại và (2) Dán văn bản trực tiếp kèm bộ phân tích phụ đề Live Parser hiển thị tức thì số lượng câu và thẻ xem trước 2 câu đầu tiên chuẩn mili-giây.
    - *Export Subtitles Takeover Studio (Thiết kế Executive Agency)*: Báo cáo kỹ thuật và kiểm thử trích xuất phụ đề song ngữ mốc mili-giây với 4 thẻ Metric Double-Bezel (Thời lượng, Số câu, Số từ, Tỷ lệ dịch Google Neural), thanh Tab điều khiển Segmented Control 4 định dạng (.SRT, .VTT, .JSON, Full View), bộ chuyển đổi kích thước chữ linh hoạt 3 nấc (12px / 14.5px Chuẩn / 17px Lớn) cùng bộ Code Terminal Editor chuyên nghiệp.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện toàn bộ bố cục Dashboard với dải 4 Pills Header, cụm Quick Action Buttons, 4 Metric Cards Double-Bezel, Bento Grid 1.62fr : 1fr và lưới video, triệt tiêu 100% hiện tượng giật nhảy layout khi tải trang.
  - **Hệ Thống Nhận Diện Icon & Typography Chuẩn Hóa**:
    - Thay thế hoàn toàn icon Sét bằng icon **Lấp lánh AI (`Sparkles`)** phối sắc Tím AI (`fill-purple-500/40 text-purple-600 dark:text-purple-400` trên nền `bg-purple-500/10`) đại diện cho công nghệ trích xuất phụ đề thông minh XP-Sub AI Engine chuẩn Quy tắc UI/UX #20.
- **`/vocabulary`**: Kho Từ Vựng Tiếng Anh Thông Minh (Thiết kế Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**:
    - Tích hợp `AppTopHeader` với dải 4 Pill Actions chuyển cấp độ nhanh: `[ 📗 60 Chủ Đề Cơ Bản ]`, `[ 📘 155 Chủ Đề Nâng Cao ]`, `[ 🎯 Luyện Từ Vựng ]`, `[ 🏆 Thi Thử Đề ]`.
    - Dải danh ngôn truyền cảm hứng song ngữ phát âm TTS và nút chuyển nhanh `[ ✨ Luyện Trí Nhớ Flashcards ]` nổi bật.
  - **Hero Studio Toolbar & Segmented Level Switcher**:
    - Khung công cụ `rounded-2xl` với đường viền ambient blue rực rỡ, icon `BookOpen` / `GraduationCap` trong vòng tròn màu mềm, ô tìm kiếm từ vựng & chủ đề thông minh tích hợp nút xóa nhanh và bộ đếm kết quả realtime.
    - Bộ chuyển đổi 2 chế độ cấp độ trực quan dạng Segmented Control: `[ 📗 Từ Vựng Cơ Bản (60 Chủ Đề) • 1.248+ Từ ]` vs `[ 📘 Từ Vựng Nâng Cao (155 Chủ Đề) • 8.900+ Từ ]`.
  - **4 Thẻ Chỉ Số Bento Double-Bezel (Executive Metric Cards)**:
    - Thẻ 1: **Bộ Chủ Đề Khả Dụng** (60 bộ A1-A2 hoặc 155 bộ B1-C2 - Xanh Hoàng Gia `#0059bb`).
    - Thẻ 2: **Kho Từ Vựng Chuẩn** (1.248+ từ hoặc 8.900+ từ - Lục Bảo `#10b981` 100% IPA & Song ngữ).
    - Thẻ 3: **Nhịp Độ Khuyến Nghị** (10-15 từ / 6-10 phút hàng ngày - Hổ Phách `#f59e0b`).
    - Thẻ 4: **Chuẩn Trí Nhớ SRS** (86% Spaced Repetition Memory - Tím AI `#8b5cf6`).
  - **Lưới Thẻ Chủ Đề Bento Grid Chuẩn Agency (`Double-Bezel Theme Cards`)**:
    - Thẻ chủ đề bo góc `rounded-2xl`, hiệu ứng đổ bóng và viền kép chống rung giật, biểu tượng ngữ nghĩa Lucide chuyên biệt (CNTT, Y tế, Tài chính, Du lịch, Thể thao, Thời tiết...), tiêu đề tiếng Việt in đậm, phụ đề tiếng Anh chữ đứng thẳng (100% không dùng chữ nghiêng).
    - Phân cấp độ khó 3 mức (A1-A2, B1-B2, C1-C2) và thanh tiến trình gradient Royal Blue mượt mà.
  - **Khung Xương Tải Trang Đồng Bộ Hình Học 100% (`loading.tsx`)**: Tái hiện toàn bộ cấu trúc Header, Toolbar, 4 Metric Cards Double-Bezel và lưới Theme Cards 16 ô, triệt tiêu 100% hiện tượng giật nhảy layout.

- **`/vocabulary/[id]`**: Phòng Học & Khám Phá Từ Vựng Tương Tác 4 Chế Độ (Thiết kế Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**:
    - Tích hợp nút Back `[ ← Kho Từ Vựng ]`, dải 4 Pill Actions chuyển chế độ tức thì: `[ 🎴 Flashcard 3D ]`, `[ 📋 Danh Sách Từ ]`, `[ ⚡ Kiểm Tra Nhanh ]`, `[ 🤖 Cố Vấn AI ]`, và nút CTA ôn tập nhanh `[ ⚡ Luyện Ngay +15 XP ]`.
  - **Hero Header Banner & 4 Thẻ Chỉ Số Bento Double-Bezel**:
    - Khung Hero `rounded-2xl` với đường viền ambient blue, biểu tượng chủ đề `w-12 h-12 rounded-2xl`, nhãn cấp độ CEFR và độ khó `★ N/5`.
    - 4 Thẻ Bento Metric Cards: Tổng Số Từ, Đã Thuộc, Từ Yêu Thích, Tiến Độ Làm Chủ (với thanh tiến trình gradient mượt mà).
  - **Phòng Học Flashcard 3D Studio Đẳng Cấp**:
    - Thẻ lật 3D hai mặt mượt mà (`perspective-[1500px]`), từ vựng cỡ lớn `text-3xl sm:text-4xl`, phát âm bản xứ to rõ, câu ví dụ thực tế đặt trong khung nổi bật (100% không dùng chữ nghiêng), hỗ trợ đầy đủ phím tắt bàn phím (`Space` lật thẻ, `←` / `→` chuyển từ).
  - **Lưới Danh Sách Từ Vựng Tra Cứu (Vocabulary Bento Grid)**:
    - Thanh công cụ tìm kiếm và lọc 4 trạng thái (`Tất cả`, `Chưa thuộc`, `Đã thuộc`, `Yêu thích`), lưới thẻ từ vựng `rounded-2xl` 4 cột hiển thị phiên âm IPA, giải nghĩa tiếng Việt Xanh Hoàng Gia, và thanh đo mức độ thành thạo 5 sao.
  - **Bài Tập Trắc Nghiệm (Quiz Studio) & Trợ Lý Cố Vấn AI Coach**:
    - Chế độ kiểm tra nhanh với 4 lựa chọn lớn `rounded-xl`, phản hồi đúng/sai tức thì và tổng kết điểm số thưởng XP.
    - Hộp chat AI Tutor màu Tím AI `#8b5cf6` với 3 nút gợi ý câu hỏi 1-Click thông minh.
  - **Khung Xương Tải Trang Đồng Bộ Hình Học 100% (`loading.tsx`)**: Tái hiện toàn bộ bố cục Header 56px, Hero Banner, 4 Metric Cards và khung Flashcard 3D, triệt tiêu hoàn toàn giật nhảy layout.

- **`/study/grammar`**: Hệ Thống Kho 60 Chuyên Đề Ngữ Pháp AI (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**:
    - Dải 4 Pill Actions lọc cấp độ chuẩn: `[ 📚 Tất Cả ]`, `[ 🟢 Nền Tảng 500+ ]`, `[ 🔵 Bứt Phá 750+ ]`, `[ 🟣 Chinh Phục 900+ ]` và nút CTA `[ ⚡ Học Bài Đầu Tiên +15 XP ]` chuyển hướng tới `/study/grammar/present_simple`.
  - **Kho 60 Chuyên Đề Ngữ Pháp Chuẩn CEFR B1-C2 (`GRAMMAR_TOPICS` & `grammarContent.ts`)**:
    - Phân chia 3 tầng cấp độ: 20 bài Nền tảng (Thì cơ bản, danh từ, đại từ, mạo từ, so sánh), 20 bài Trung cấp (Thì hoàn thành, câu bị động, điều kiện, quan hệ, danh động từ, tường thuật), và 20 bài Nâng cao (Mệnh đề danh từ, đảo ngữ, rút gọn, bị động kép, câu chẻ, cấu trúc song hành).
    - Hệ thống biểu tượng Lucide SVG chuyên biệt, nhãn mục tiêu kỳ thi (TOEIC Part 5/6, IELTS Writing/Speaking Band 7.0+), và nút chuyển tiếp `[ Học ngay → ]` liên kết trực tiếp tới `/study/grammar/[id]`.
  - **Khung Xương Tải Trang Đồng Bộ Hình Học 100% (`loading.tsx`)**: Tái hiện toàn bộ bố cục Header, Banner, 4 Metric Cards và lưới bài học, triệt tiêu 100% layout shift.

- **`/study/grammar/[id]`**: Studio Chi Tiết Chuyên Đề Ngữ Pháp Độc Lập & Phòng Luyện Trắc Nghiệm AI Phân Tích Chuyên Sâu.
  - **Chuẩn Hóa Dynamic Route**: Hỗ trợ nhận diện tự động cả định dạng slug `present-simple` và `present_simple`.
  - **Đồng Bộ Header Studio (`AppTopHeader`)**: Nút Back `[ ← Kho Ngữ Pháp ]` (quay về `/study/grammar`), dải 2 Pill chuyển đổi `[ 📖 Lý Thuyết ]` và `[ ⚡ Luyện Tập AI ]`, cùng nút CTA `[ ⚡ Thi Thử AI +15 XP ]`.
  - **Studio Lý Thuyết & Cẩm Nang Ngữ Pháp Cốt Lõi**:
    - **Mẹo Ghi Nhớ Nhanh & Trọng Tâm**: Thẻ Bento xanh nổi bật với biểu tượng `Sparkles` lấp lánh.
    - **Cấu Trúc & Công Thức Cốt Lõi**: Lưới 3 cột phân loại màu sắc (+ Khẳng định Xanh ngọc, - Phủ định Đỏ Rose, ? Nghi vấn Xanh hoàng gia).
    - **Từ Nhận Biết & Trạng Từ Chỉ Thời Gian**: Hộp mây từ vựng nhận diện nhanh dạng Chip `rounded-xl`.
    - **Ứng Dụng Đề Thi & Ví Dụ Ngữ Cảnh Thực Tế**: Câu ví dụ song ngữ nổi bật từ trọng tâm, kèm lưu ý bẫy đề thi.
    - **Cảnh Báo Bẫy Thi TOEIC & IELTS (❌ vs ✅)**: Bảng so sánh trực quan câu sai vs câu đúng, bảo vệ học viên khỏi các bẫy ngữ pháp kinh điển.
  - **Phòng Luyện Trắc Nghiệm AI Studio (2-Column Options Grid & Instant Feedback)**:
    - Khối câu hỏi độc lập `rounded-2xl` với thanh tiến trình mượt mà và nút `Đổi 5 câu khác`.
    - **Lưới 4 Đáp Án 2 Cột (`grid-cols-2`)**: Tích hợp phím tắt số `1, 2, 3, 4` và phím chữ `A, B, C, D`, phản hồi thị giác tức thì (Xanh Emerald khi đúng, Đỏ Rose khi sai).
    - **Thanh Điều Hướng Chuyển Câu Dưới Cùng**: `[ < Câu Trước ]`, bộ đếm `[ Câu N / Total ]`, và nút `[ Câu Tiếp Theo > ]` / `[ Nộp Bài +15 XP ]` đồng bộ hoàn toàn với Flashcard.
    - Hỗ trợ phím tắt toàn diện: `1-4`, `A-D`, `Space / Enter ↵`, `←`, `→`.
  - **Cố Vấn AI Tutor Companion 4/12**: Hộp thoại trò chuyện tương tác với Gemini AI, nút gợi ý câu hỏi 1-Click thông minh và nút gửi gradient Tím AI `#8b5cf6`.
  - **Khung Xương Tải Trang Chi Tiết (`loading.tsx`)**: Tái hiện toàn bộ bố cục Header và khung Studio lý thuyết.

- **`/study/pvp`**: Đấu trường so tài từ vựng PvP Realtime (Thiết kế Agency Dashboard Tier).
  - **Spotlight Hero Banner**: Gradient Xanh Hoàng Gia sang trọng kèm hiệu ứng ánh kim.
  - **Bento Grid 7/12 & 5/12**: Cột trái lựa chọn 3 chế độ (Trắc nghiệm, Đồ chữ, Âm thanh) và 3 cấp độ (Dễ, Trung bình, Khó). Cột phải hiển thị Hồ sơ Đấu sĩ & Bảng Vàng Top 3 Đấu Trường.
  - **Trận Đấu PvP 1v1**: Giao diện đấu thời gian thực sắc nét, đồng hồ đếm ngược, AI thông minh và báo cáo kết quả thưởng XP.
- **`/study/exam-prep`**: Đấu Trường Thi Thử Đề Thực Tế (Unified Exam Configurator Studio for TOEIC & IELTS 4 Skills).
  - **Tích hợp thanh điều hướng Sidebar (`components/layout/Sidebar.tsx`)**: Đã bổ sung mục **"Thi thử đề" (`/study/exam-prep`)** dưới danh mục LUYỆN TẬP.
  - **Kho Đề Thi Chuẩn Quốc Tế 2026 (Cấu Trúc Mô-đun Tách File Riêng Biệt `lib/data/exam-papers/`)**: Đã tách và tổ chức toàn bộ kho đề thi thành các file độc lập đặt trong thư mục chuyên biệt `lib/data/exam-papers/`, mỗi đề thi là một file `.ts` riêng biệt tương ứng với mã đề, tự động tổng hợp qua `index.ts` và bảo toàn 100% đường dẫn URL dạng `http://localhost:3000/study/exam-prep?id=1` (hoặc `?id=N` / `?id=toeic_lr_2026_01`):
    1. [`toeic_lr_2026_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_lr_2026_01.ts) (`toeic_lr_2026_01`): ETS TOEIC 2026 Official Test #01 (200 câu hỏi chuẩn ETS Parts 1-7).
    2. [`toeic_lr_2026_02.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_lr_2026_02.ts) (`toeic_lr_2026_02`): ETS TOEIC 2026 Official Test #02 (200 câu hỏi chuẩn ETS Parts 1-7 tích hợp hệ thống phân tích lời giải chuyên sâu 4 tầng: 🎯 Đáp án & Dẫn chứng, 🔍 Dịch nghĩa trọn vẹn, ⚠️ Phân tích bẫy thi ETS Trap Alert, 💡 Từ vựng & Điểm ngữ pháp then chốt).
    3. [`toeic_sw_2026_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_sw_2026_01.ts) (`toeic_sw_2026_01`): TOEIC Speaking & Writing AI Studio #01 (19 câu Speaking Q1-11 & Writing Q1-8 tích hợp AI Studio chấm điểm phát âm WebRTC, bài nói mẫu 4 bước Band 8, kỹ thuật nối âm/ngắt cụm hơi, câu viết mẫu 3/3, email công sở 4/4 và bài luận Opinion Essay 350+ từ C1/C2 chấm điểm Gemini AI).
    4. [`toeic_full_4k_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_full_4k_01.ts) (`toeic_full_4k_01`): TOEIC Master 4-Skills Simulation #01 (Trọn bộ 219 câu hỏi 4 Kỹ năng: 100 câu Nghe Parts 1-4, 100 câu Đọc Parts 5-7, 11 câu Nói AI Q201-211 và 8 câu Viết AI Q212-219 tích hợp hệ thống chuyển giao kỹ năng mượt mà, phiếu trả lời 219 câu tối ưu cuộn và báo cáo điểm số 4 kỹ năng toàn diện).
    5. [`ielts_academic_4k_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_academic_4k_01.ts) (`ielts_academic_4k_01`): IELTS Academic Official Test #01 (85 câu hỏi chuẩn Cambridge Academic: 40 câu Listening 4 Sections, 40 câu Reading 3 Passage học thuật chuyên sâu về Rạn san hô / Giấc ngủ & Trí nhớ / Khảo cổ học Dệt may, 3 Phần Speaking AI và 2 Task Writing AI Task 1 & Task 2 với thang tính điểm chuẩn Cambridge Band 1.0 - 9.0).
    6. [`ielts_speaking_pro_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_speaking_pro_01.ts) (`ielts_speaking_pro_01`): IELTS Speaking AI Studio #01 (Trọn bộ 3 Parts chuẩn Cambridge: Part 1 Personal Interview về Công nghệ & Thói quen kỹ thuật số, Part 2 Cue Card 2 phút về Đột phá Chỉnh sửa gen CRISPR-Cas9 kèm chiến lược ghi chú 4-Box, Part 3 In-Depth Discussion về Đạo đức AI & Thị trường lao động với bài mẫu Band 9.0, phiên âm IPA và phân tích 4 tiêu chí quốc tế).
    7. [`ielts_writing_master_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_writing_master_01.ts) (`ielts_writing_master_01`): IELTS Academic Writing Task 1 & Task 2 #01 (Chuyên sâu Task 1 Biểu đồ Năng lượng tái tạo 4 nước 2015-2025 với báo cáo mẫu Band 9.0 195 từ và Task 2 Bài luận Nghị luận Xã hội 350+ từ C2 về Giáo dục Đại học Miễn phí vs Học phí tích hợp Gemini AI chấm 4 tiêu chí Cambridge).
    8. [`ielts_academic_4k_02.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_academic_4k_02.ts) (`ielts_academic_4k_02`): IELTS Academic Official Test #02 (Trọn bộ 85 câu hỏi Cambridge: 40 câu Listening về Trung tâm thể thao / Bảo tàng hàng hải / Đảo nhiệt đô thị London / Định vị sóng âm cá voi, 40 câu Reading về Tính toán lượng tử trong y dược / Kỹ thuật Nhà thờ Gothic / Con đường tơ lụa trên biển, 3 Phần Speaking AI và 2 Task Writing AI Task 1 Quy trình khử mặn nước biển & Task 2 Triết học AI vs Nghệ thuật nhân loại).
    9. [`toeic_lr_2026_03.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_lr_2026_03.ts) (`toeic_lr_2026_03`): ETS TOEIC 2026 Official Test #03 (Trọn bộ 200 câu hỏi Nghe & Đọc: 100 câu Listening Parts 1-4 về Đàm phán phần mềm CRM / Vaccine nhạy nhiệt Zurich / Năng lượng mặt trời Austin / Phòng sạch kính hiển vi Cambridge và 100 câu Reading Parts 5-7 bao quát báo cáo bền vững ESG khách sạn / Hội nghị thượng đỉnh AI San Francisco / Báo giá tủ máy chủ Dallas / Hợp đồng thuê thiết bị công trình Phoenix với phiếu làm bài 200 câu chuẩn ETS).
    10. [`ielts_academic_4k_03.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_academic_4k_03.ts) (`ielts_academic_4k_03`): IELTS Academic Official Test #03 (Trọn bộ 85 câu hỏi Cambridge: 40 câu Listening về Đăng ký Homestay Melbourne / Vườn thực vật bảo tồn Alpine / Viễn thám radar sông băng Patagonia / Cắt tỉa khớp thần kinh não bộ, 40 câu Reading về Nền văn minh thủy lực Angkor Wat / Địa hóa vi nhựa kỷ Anthropocene / Nghệ thuật biểu tượng hang động tiền sử Franco-Cantabria, 3 Phần Speaking AI và 2 Task Writing AI Task 1 Biểu đồ rác thải nhựa toàn cầu & Task 2 Cấm đồ nhựa dùng 1 lần vs Trợ cấp vật liệu sinh học).
    11. [`toeic_mini_speed_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_mini_speed_01.ts) (`toeic_mini_speed_01`): TOEIC Speed Sprint Test 2026 #01 (50 câu hỏi phản xạ tốc độ trong 35 phút: 20 câu Listening Parts 1-4 về Bàn họp hiện đại / Kính hiển vi phòng lab / Kiểm tra an toàn kho số 4 / Thông báo chuyến bay San Francisco và 30 câu Reading Parts 5-7 bao quát Nâng cấp máy chủ mạng công ty / Trụ sở an ninh mạng Apex Dublin / Báo giá tiệc Gala sinh học NovaBiotech).
    12. [`ielts_academic_4k_04.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_academic_4k_04.ts) (`ielts_academic_4k_04`): IELTS Academic Official Test #04 (Trọn bộ 85 câu hỏi Cambridge: 40 câu Listening về Điện mặt trời cộng đồng / Kính thiên văn không gian James Webb / Tài chính vi mô M-Pesa Kenya / Phát quang sinh học đáy biển sâu, 40 câu Reading về Kinh tế chú ý & Thần kinh học tập trung sâu / Kỹ thuật đường hầm chìm đáy biển Fehmarnbelt / Công nghệ nano phỏng sinh học Biomimicry, 3 Phần Speaking AI và 2 Task Writing AI Task 1 Cơ cấu năng lượng điện toàn cầu 2010 vs 2025 & Task 2 Bài luận 360+ từ C2 Thám hiểm vũ trụ vs Giải quyết khủng hoảng Trái Đất).
    13. [`toeic_sw_2026_02.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_sw_2026_02.ts) (`toeic_sw_2026_02`): TOEIC Speaking & Writing AI Studio #02 (Chuyên sâu chủ đề Chuỗi cung ứng Công nghệ cao & AI Doanh nghiệp: 11 câu Speaking AI gồm Lễ khởi công nhà máy vi mạch 2nm / An ninh mạng đám mây / Kho hậu cần tự động / Phỏng vấn giao thực phẩm thông minh / Lịch trình hội nghị FinTech & AI / Bài nói quan điểm làm việc từ xa và 8 câu Writing AI gồm 5 câu viết theo ảnh công nghệ / 2 Email phản hồi khiếu nại giao hàng chip y tế & chính sách phúc lợi HR / 1 Bài luận nghị luận 300+ từ Tự động hóa AI vs Đào tạo nâng cao nhân sự).
    14. [`ielts_academic_4k_05.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_academic_4k_05.ts) (`ielts_academic_4k_05`): IELTS Academic Official Test #05 (Trọn bộ 85 câu hỏi Cambridge chuẩn Band 9.0: 40 câu Listening về Tình nguyện viên bảo tồn cá voi New Zealand / Trung tâm điện toán lượng tử siêu hàn Cavendish / Nông nghiệp khí canh Aeroponics khép kín / Miệng phun thủy nhiệt đáy biển sâu & Sinh vật hóa tự dưỡng, 40 câu Reading về Kiến trúc gỗ khối lớn CLT & Khử carbon / Trục Não - Ruột - Hệ vi sinh vật & Thuốc tâm sinh học Psychobiotics / Quản lý bức xạ mặt trời & Bơm Sol khí tầng bình lưu, 3 Phần Speaking AI Kiến trúc bền vững & Cầu dây văng Millau Viaduct và 2 Task Writing AI Task 1 Quy trình sản xuất gỗ CLT & Cân bằng carbon vs Task 2 Bài luận C2 360+ từ Địa kỹ thuật làm mát Trái Đất vs Cắt giảm khí thải triệt để).
    15. [`ielts_general_4k_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_general_4k_01.ts) (`ielts_general_4k_01`): IELTS General Training Official Test #01 (Trọn bộ 85 câu hỏi chuẩn Định cư & Việc làm quốc tế: 40 câu Listening về Hợp đồng thuê chung cư Vancouver / Khu thể thao phục hồi chức năng Gold Coast / Học nghề An ninh mạng đám mây CompTIA / Lịch sử đèn biển Fresnel & định vị hàng hải, 40 câu Reading chuẩn General về Giao thông thẻ PRESTO & Bảo hiểm y tế OHIP Toronto / Công thái học văn phòng & Quy trình khiếu nại nhân sự / Kinh tế đô thị ban đêm 24-Hour City & Quy hoạch Agent of Change, 3 Phần Speaking AI và 2 Task Writing AI Task 1 Viết thư trang trọng khiếu nại chủ nhà sửa chữa thiết bị vs Task 2 Bài luận xã hội Nhập cư lao động tay nghề cao vs Đào tạo nội địa).
    16. [`toeic_lr_2026_04.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_lr_2026_04.ts) (`toeic_lr_2026_04`): ETS TOEIC 2026 Official Test #04 (Trọn bộ 200 câu hỏi Nghe & Đọc: 100 câu Listening Parts 1-4 về Trạm sạc xe tải điện cảng Rotterdam / Phòng sạch vi mạch quang học / Khảo sát trang trại điện gió / Nâng cấp tản nhiệt chất lỏng trung tâm dữ liệu AI Dublin / Đàm phán sảnh hội chợ y sinh Basel và 100 câu Reading Parts 5-7 bao quát Chuyển đổi nền tảng ERP SAP S/4HANA đám mây / Hóa đơn vận tải biển quang học / Đấu thầu thiết bị quang khắc vi mạch EUV bán dẫn Dresden 210 triệu Euro với phiếu làm bài 200 câu chuẩn ETS).
    17. [`ielts_academic_4k_06.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_academic_4k_06.ts) (`ielts_academic_4k_06`): IELTS Academic Official Test #06 (Trọn bộ 85 câu hỏi Cambridge chuẩn Band 9.0: 40 câu Listening về Tình nguyện viên bảo tồn san hô Great Barrier Cairns / Tham quan lò phản ứng nhiệt hạch từ trường Tokamak Culham CCFE / Đồ án Thạc sĩ liệu pháp tế bào miễn dịch CAR-T King's College / Khảo cổ học thiên văn Vòng tròn đá Stonehenge, 40 câu Reading về Nhà máy nhiệt điện mặt trời tháp tập trung CSP & Pin muối nóng chảy 565°C / Thần kinh học về Hội chứng Siêu trí nhớ tự thuật HSAM / Bí ẩn đại hạn hán 200 năm dẫn đến sự sụp đổ văn minh Indus, 3 Phần Speaking AI và 2 Task Writing AI Task 1 Sơ đồ chu trình tạo năng lượng nhiệt hạch Tokamak vs Task 2 Bài luận C2 360+ từ An toàn Trí tuệ Nhân tạo Tổng quát AGI & Hiệp ước quốc tế).
    18. [`ielts_listening_sprint_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_listening_sprint_01.ts) (`ielts_listening_sprint_01`): IELTS Listening Sprint Intensive #01 (Chuyên sâu 40 câu hỏi Nghe Sections 1-4 trong 35 phút: Đặt chỗ cắm trại Banff, Bảo tàng hàng không Smithsonian, Rừng tảo bẹ Tasmania và Ruộng bậc thang Inca Moray).
    19. [`toeic_listening_master_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_listening_master_01.ts) (`toeic_listening_master_01`): TOEIC Listening Master 100 #01 (Chuyên sâu 100 câu hỏi Nghe Parts 1-4 chuẩn ETS 2026 trong 45 phút: Chuỗi cung ứng chip 3nm Tokyo, tự động hóa kho AGV, ký kết hợp tác quốc tế, và hội nghị chuyển đổi số Frankfurt).
    20. [`ielts_reading_sprint_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_reading_sprint_01.ts) (`ielts_reading_sprint_01`): IELTS Academic Reading Master #01 (Chuyên sâu 40 câu hỏi Đọc Passages 1-3 trong 60 phút: Mảng kính thiên văn vô tuyến SKA 1km², Tâm lý học nhận thức Hội chứng Kẻ giả mạo Impostor Syndrome và Kỹ thuật đập cự thạch Marib Ả Rập).
    21. [`toeic_reading_master_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_reading_master_01.ts) (`toeic_reading_master_01`): TOEIC Reading Master 100 #01 (Chuyên sâu 100 câu hỏi Đọc Parts 5-7 chuẩn ETS 2026 trong 75 phút: Mệnh đề quan hệ rút gọn, bảo mật đám mây, hóa đơn cảng Hamburg và đấu thầu quang điện mặt trời Nevada 52.5 triệu USD).
    22. [`ielts_speaking_pro_02.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_speaking_pro_02.ts) (`ielts_speaking_pro_02`): IELTS Speaking AI Studio #02 (Chuyên sâu 3 Phần Nói chuẩn Cambridge chấm điểm AI: Không gian xanh đô thị, Cue Card phát minh của Nikola Tesla, Xe tự hành & Giáo dục liên ngành STEAM).
    23. [`toeic_speaking_pro_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_speaking_pro_01.ts) (`toeic_speaking_pro_01`): TOEIC Speaking AI Intensive #01 (Chuyên sâu 11 câu hỏi Nói chuẩn ETS: Đọc to phát âm, miêu tả tranh kho vận/hội đồng, xử lý lịch trình hội thảo AI Silicon Valley và bài nói quan điểm 60s về tuần làm việc 4 ngày).
    24. [`ielts_writing_master_02.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_writing_master_02.ts) (`ielts_writing_master_02`): IELTS Academic Writing Master #02 (Chuyên sâu 2 Task Viết chuẩn Cambridge: Task 1 Biểu đồ kết hợp Mixed Charts khí thải & năng lượng tái tạo vs Task 2 Bài luận Trách nhiệm tái chế rác thải điện tử E-waste của tập đoàn công nghệ).
    25. [`toeic_writing_pro_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_writing_pro_01.ts) (`toeic_writing_pro_01`): TOEIC Writing AI Intensive #01 (Chuyên sâu 8 câu hỏi Viết chuẩn ETS: 5 câu viết theo ảnh công sở/công nghệ, 2 email phản hồi sự cố đám mây & đàm phán hợp đồng, 1 bài luận quan điểm 300+ từ về tài trợ học tập trọn đời).
    26. [`toeic_lr_sprint_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_lr_sprint_01.ts) (`toeic_lr_sprint_01`): TOEIC LR Speed Sprint #02 (100 câu Nghe & Đọc trong 60 phút: 50 câu Listening Parts 1-4 và 50 câu Reading Parts 5-7 bao quát chuỗi cung ứng FinTech Singapore và xe điện tự hành Austin).
    27. [`ielts_lr_combo_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_lr_combo_01.ts) (`ielts_lr_combo_01`): IELTS Academic L&R Master #01 (80 câu Nghe & Đọc học thuật trong 95 phút: 40 câu Listening Trạm nghiên cứu Svalbard / Robot hang động và 40 câu Reading Đô thị bọt biển Sponge Cities / Giấc ngủ REM / Văn minh Minoan Crete).
    28. [`toeic_sw_2026_03.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_sw_2026_03.ts) (`toeic_sw_2026_03`): TOEIC Speaking & Writing AI #03 (19 câu Nói & Viết AI trong 80 phút: 11 câu Speaking AI Trung tâm dữ liệu AI / Lễ khánh tiết và 8 câu Writing AI hợp đồng máy chủ & bài luận văn hóa đổi mới).
    29. [`ielts_sw_combo_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_sw_combo_01.ts) (`ielts_sw_combo_01`): IELTS Academic S&W Master #01 (5 câu Nói & Viết học thuật trong 75 phút: 3 Phần Speaking AI Nông nghiệp thông minh / Dự án môi trường và 2 Task Writing AI Sơ đồ xử lý nước thải khép kín vs Bài luận Lò phản ứng hạt nhân SMR).
    30. [`ielts_ls_interactive_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_ls_interactive_01.ts) (`ielts_ls_interactive_01`): IELTS Listening & Speaking AI #01 (43 câu Nghe & Nói AI trong 50 phút: 40 câu Listening Bảo tồn động vật Serengeti và 3 Phần Speaking AI Du lịch sinh thái bền vững).
    31. [`toeic_ls_interactive_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_ls_interactive_01.ts) (`toeic_ls_interactive_01`): TOEIC Listening & Speaking AI #01 (61 câu Nghe & Nói AI trong 50 phút: 50 câu Listening Cảng container Busan và 11 câu Speaking AI Tự động hóa cảng biển).
    32. [`ielts_rw_synthesis_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_rw_synthesis_01.ts) (`ielts_rw_synthesis_01`): IELTS Academic R&W Master #01 (42 câu Đọc & Viết học thuật trong 120 phút: 40 câu Reading Trồng rừng Miyawaki / Siêu dẫn nhiệt độ phòng và 2 Task Writing AI Sơ đồ trồng rừng vs Bài luận Bằng sáng chế y sinh).
    33. [`toeic_rw_business_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_rw_business_01.ts) (`toeic_rw_business_01`): TOEIC Reading & Writing Business #01 (58 câu Đọc & Viết AI trong 90 phút: 50 câu Reading Hợp đồng thương mại điện tử / Đấu thầu trạm biến áp và 8 câu Writing AI Cung ứng cảm biến MEMS).
    34. [`ielts_lw_studio_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_lw_studio_01.ts) (`ielts_lw_studio_01`): IELTS Listening & Writing Integration #01 (42 câu Nghe & Viết học thuật trong 95 phút: 40 câu Listening Kính thiên văn vi sóng Hawaii và 2 Task Writing AI Quang phổ CMB vs Bài luận Thám hiểm không gian sâu).
    35. [`toeic_lw_workplace_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_lw_workplace_01.ts) (`toeic_lw_workplace_01`): TOEIC Listening & Writing Corporate #01 (58 câu Nghe & Viết AI trong 75 phút: 50 câu Listening Báo cáo tài chính R&D y tế Basel và 8 câu Writing AI Đàm phán bằng sáng chế dược phẩm).
    36. [`ielts_rs_studio_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/ielts_rs_studio_01.ts) (`ielts_rs_studio_01`): IELTS Reading & Speaking Academic #01 (43 câu Đọc & Nói AI trong 75 phút: 40 câu Reading Dòng hải lưu Atlantic AMOC / Siêu thành phố nổi Oceanix và 3 Phần Speaking AI Tái định cư ven biển).
    37. [`toeic_rs_business_01.ts`](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/toeic_rs_business_01.ts) (`toeic_rs_business_01`): TOEIC Reading & Speaking Professional #01 (61 câu Đọc & Nói AI trong 65 phút: 50 câu Reading Báo cáo ESG chuỗi cung ứng xanh và 11 câu Speaking AI Điện mặt trời áp mái doanh nghiệp).
  - **Chuẩn Hóa Layout & Micro-Hero Toolbar Đồng Bộ ([PageEntranceWrapper](file:///e:/XP%20English%20%20XP%20Voca/components/shared/PageEntranceAnimation.tsx))**: Loại bỏ các thẻ bao bọc lồng nhau và margin/padding lệch chuẩn; đồng bộ 100% không gian làm bài thi và danh sách đề thi theo phong cách **Agency Micro-Hero Toolbar (`bg-[#ebf3fe] dark:bg-blue-950/40 border-[#d5e5fe]`)** đồng nhất với các phòng học khác (`/study/practice`, `/study/listening`, `/study/shadowing`).
  - **Tự Động Thu Gọn Sidebar Khi Vào Luyện Tập/Làm Bài (Global Auto-Collapse Sidebar Workspace)**: Tự động kích hoạt cơ chế thu gọn thanh bên `setSidebarCollapsed(true)` trên **tất cả các trang luyện tập và thi cử** (`/study/exam-prep`, `/study/listening`, `/study/shadowing`, `/ai/tutor`, `/ai/conversation`, `/study/rooms`, `/vocabulary/[id]`), tối đa hóa diện tích hiển thị nội dung, tập trung cao độ vào bài làm mà không làm mất khả năng mở lại Sidebar khi cần.
  - **Tối Ưu & Nâng Cấp Thẻ Danh Mục Đề Thi ([Exam Cards Grid](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/exam-prep/page.tsx))**:
    - **Hệ Thống Badge Phân Loại Màu Sắc Theo Định Dạng**: Tự động áp dụng bảng màu chuyên biệt cho từng nhóm đề thi (IELTS Academic: Sky Blue, 4-Skills Master: Royal Purple, Speaking & Writing: Hổ phách Amber, IELTS Speaking: Emerald, IELTS Writing: Indigo, TOEIC LR: Corporate Blue).
    - **Cân Bằng Đường Cơ Sở Tiêu Đề (Baseline Vertical Alignment)**: Thiết lập `line-clamp-2 min-h-[2.4rem]` giúp toàn bộ 3 cột thẻ trên lưới giữ nguyên chiều cao thẳng hàng, chống thụt thò khi tên đề thi dài ngắn khác nhau.
    - **Hiệu Ứng Nâng Thẻ & Tương Tác**: Bổ sung viền hover tinh tế `hover:border-[#0059bb]/40 hover:shadow-xs`, nút *"Vào thi"* phản hồi cảm ứng mượt mà `active:scale-95`.
    - **Bộ Lọc Phân Khúc 5 Nhóm Thông Minh**: Lọc nhanh *Tất cả bộ đề, IELTS Academic, TOEIC Nghe & Đọc, TOEIC Nói & Viết, TOEIC Full 4K*.
  - **Nút Bật/Tắt Ẩn/Mở Phiếu Trả Lời (`showAnswerSheet`)**: Cho phép ẩn Phiếu trả lời để mở rộng màn hình bài thi **Full Width 12/12 (`col-span-12`)** siêu thoáng mắt. Phiếu trả lời thiết kế chuẩn **6 cột 1 hàng (`grid-cols-6`)** với chữ số to đậm `text-sm font-black`.
  - **Tối Ưu Giao Diện Xem Lại Lời Giải Trên Mobile (Mobile Review & Explanation Optimization)**:
    - **Thanh Điều Khiển Audio & Lời Thoại Toàn Năng (Mobile-First Audio & Transcript Engine)**: Tối ưu hoá bố cục linh hoạt `flex-col sm:flex-row`, chống co ép vỡ dòng chữ trên màn hình hẹp, tự động rút gọn nhãn nút trên di động (`"Lời Thoại"` / `"Phát Audio"` trên mobile, `"Xem Lời Thoại (Transcript)"` / `"Phát Lại Audio"` trên desktop). Tích hợp bộ chuyển tốc độ phát âm (`0.8x`, `1.0x`, `1.25x`), cơ chế tự động dừng phát khi chuyển câu (`selectedReviewQIndex`), giải pháp phát âm đa tầng (Audio MP3 -> Tự động Fallback sang Smart TTS Speech `speakLessonText`), nút 1-click sao chép transcript (`navigator.clipboard`) kèm Toast thông báo và drawer hiển thị lời thoại có giới hạn chiều cao `max-h-56 overflow-y-auto` tinh tế không che khuất phần câu hỏi và lời giải chuyên sâu.
    - **Chuẩn Hóa Toàn Diện Dữ Liệu Toàn Bộ 37 Đề Thi Chuẩn ETS & Cambridge ([exam-papers](file:///e:/XP%20English%20%20XP%20Voca/lib/data/exam-papers/))**:
      - **Khớp Hình Ảnh Part 1 Đạt 98% – 100%**: Kiểm duyệt và cập nhật 84/84 hình ảnh HD `w=800` trên toàn bộ kho đề sát thực 100% với hành động câu hỏi và phương án đúng (họp nhóm, gõ laptop văn phòng, bản vẽ công trình, trạm sạc xe điện, ký thỏa thuận, tàu cao tốc, phòng hội đồng, kính hiển vi, cao ốc, xe nâng kho bãi, phiến bán dẫn, thuyết trình số liệu, lắp ráp robot, tàu container cập cảng, tuabin gió và quầy lễ tân khách sạn).
      - **Đồng Bộ Kịch Bản Thoại Transcript & Âm Thanh Phát Lại (Review Listening Engine)**: Cấu trúc đầy đủ trường `passageText` chứa trọn vẹn câu hỏi và các phương án `(A), (B), (C), (D)` cho toàn bộ các phần nghe; tích hợp giọng đọc AI bản xứ chuẩn ETS/Cambridge khi học viên bấm phát lại lời thoại.
      - **Hệ Thống Lời Giải Chuyên Sâu 4 Tầng & Zero Italic**: Nâng cấp toàn diện lời giải 4 tầng (🎯 Đáp án đúng & Dẫn chứng, 🔍 Dịch nghĩa trọn vẹn, ⚠️ Phân tích bẫy thi ETS, 💡 Từ vựng & Ngữ pháp trọng tâm), đồng bộ chính xác 100% nhãn đáp án, tuân thủ tuyệt đối quy tắc không dùng chữ nghiêng.
    - **Chuẩn Hóa, Gộp & Khử Trùng Lặp Toàn Diện Kho Từ Vựng Nền Tảng & Nâng Cao ([basicVocabularies](file:///e:/XP%20English%20%20XP%20Voca/lib/data/basicVocabularies.ts) & [advancedVocabularies](file:///e:/XP%20English%20%20XP%20Voca/lib/data/advancedVocabularies.ts))**:
      - **Khử 100% Từ Vựng Lỗi Hậu Tố Số Đếm & Khử Trùng Lặp Intra-Theme**: Loại bỏ triệt để toàn bộ 4.946 từ nhân tạo bị nối số thừa (như `revenue 17`, `algorithm 2`, `database 3`, `cybersecurity 4`); thực hiện gộp và khử trùng lặp các từ trong từng chủ đề (0 duplicate words per theme), bảo toàn 5.240 từ vựng tiếng Anh độc nhất đạt chuẩn học thuật.
      - **Quy Hoạch & Chuẩn Hóa 155 Danh Mục Chủ Đề Ngữ Nghĩa**: Tái cấu trúc 155 chủ đề từ vựng nâng cao với tên gọi tiếng Việt và tiếng Anh chuẩn mực, icon sinh động, phân loại độ khó thực tế và số lượng từ vựng hiển thị trung thực theo đúng dữ liệu thực tế.
      - **Tối Ưu Đồng Bộ Constants & API Zero-Latency**: Đồng bộ `MOCK_THEMES` trong [lib/constants/index.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/constants/index.ts) trực tiếp từ nguồn dữ liệu chuẩn, đảm bảo tốc độ phản hồi 0ms trên giao diện và API `/api/vocabulary`.
    - **Kiến Trúc Tự Phục Hồi Kết Nối Cơ Sở Dữ Liệu PostgreSQL ([lib/prisma.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/prisma.ts))**:
      - **Tự Động Bổ Sung Tham Số Connection Pooling Tối Ưu**: Tự động cấu hình `connection_limit=10`, `pool_timeout=20`, `connect_timeout=15` vào chuỗi kết nối PostgreSQL nhằm ngăn ngừa tình trạng cạn kiệt socket hoặc nghẽn kết nối nhàn rỗi.
      - **Universal Query Auto-Healing Extension (`$extends`)**: Bọc toàn bộ các thao tác truy vấn của mọi Model (`$allModels.$allOperations`) bằng cơ chế bắt lỗi ngắt socket (`10054 ConnectionReset`, `ECONNRESET`, `Closed`, `P1001`), tự động đóng socket hỏng, kết nối lại và retry với thuật toán Exponential Backoff 3 lần, đảm bảo 100% không bao giờ làm gián đoạn hay crash API của người dùng.
    - **Bộ Phân Tích Định Dạng & Ngắt Dòng Lời Giải Tự Động ([FormattedExplanation](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/exam-prep/components/FormattedExplanation.tsx))**: Tự động phân tách cấu trúc dòng, chuyển đổi các ký tự markdown `**in đậm**`, các câu trích dẫn mẫu (thành khối quote viền hổ phách `border-l-2 border-amber-400 bg-white/70`), mã từ vựng `` `từ vựng` `` (thành pill badge bo tròn viền hổ phách), danh sách gạch đầu dòng `- ` (thành bullet dot tròn cam), danh sách số `1. 2.`, và tự động ngắt dòng/giãn cách phân tầng giữa các đề mục emoji (`🎯`, `🗣️`, `🔍`, `💡`), loại bỏ hoàn toàn các ký tự `**` thô rườm rà.
    - **Header Hộp Lời Giải Chuyên Sâu**: Thiết kế `flex-col sm:flex-row` chống vỡ dòng chữ tiêu đề "Lý Do & Lời Giải Chuyên Sâu" trên màn hình hẹp, nút "Hỏi AI Giải Thích Thêm" kéo dãn toàn chiều ngang màn hình di động dễ bấm với ngón tay cái, giữ nguyên layout cạnh nhau trên Desktop (`sm:flex-row`).
    - **Thanh Chuyển Câu Stepper Xem Lại**: Nút `[ < Trước ]` và `[ Tiếp > ]` chống ngắt dòng chữ (`whitespace-nowrap min-w-[76px]`), ẩn chỉ dẫn bàn phím `(Dùng phím ← / →...)` trên thiết bị di động (`hidden sm:block`) và giữ nguyên đầy đủ chữ "Câu Trước", "Câu Tiếp Theo" trên Desktop.
  - **Khối Điều Hướng Desktop Tiện Dụng**: Nút `[ ★ Đánh Dấu Câu ]` được đặt sát cạnh nút `[ Câu tiếp > ]` bên góc phải màn hình, tạo thành cụm thao tác tiến câu hỏi và gắn cờ trực quan, trong khi nút `[ < Câu trước ]` nằm cố định bên trái.
  - **Specialized Workspace Engine Cho 4 Kỹ Năng**:
    - **`ListeningWorkspace` & Động Cơ Âm Thanh Mobile Toàn Năng ([mobileAudio.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/utils/mobileAudio.ts) & [ttsEngine.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/utils/ttsEngine.ts))**:
      - **Micro-Silent Buffer Hardware Unlock**: Tự động mở khóa phần cứng âm thanh DAC trên iOS/Android ngay từ lần chạm đầu tiên của người dùng bằng buffer siêu ngắn 1ms, xử lý triệt để chính sách Autoplay Policy của trình duyệt di động.
      - **Server-Side TTS Audio Streaming Proxy ([/api/tts](file:///e:/XP%20English%20%20XP%20Voca/app/api/tts/route.ts))**: Phát âm thanh trực tiếp từ backend Next.js với định dạng chuẩn `audio/mpeg`, loại bỏ 100% các lỗi 403 Forbidden, CORS và hạn chế cross-origin trên toàn bộ trình duyệt di động (iOS Safari, Android Chrome, Samsung Internet, Webview).
      - **Cơ Chế Watchdog Chống Treo Tiếng**: Bổ sung bộ đếm thời gian giám sát tự động dọn sạch tiến trình âm thanh treo trên Safari di động, đảm bảo âm thanh phát mượt mà, đồng bộ và liên tục trên mọi trang.
      - **Tối Ưu & Phân Tách Trạng Thái Sidebar Mobile / Desktop Hoàn Toàn ([Sidebar.tsx](file:///e:/XP%20English%20%20XP%20Voca/components/layout/Sidebar.tsx))**:
        - **Duy Trì Khối Header Chuẩn & Ẩn Nội Dung Trực Quan Trên Mobile (`invisible lg:visible`)**: Giữ nguyên vẹn 100% khối container header phía trên cùng (`min-h-[57px]` kèm đường kẻ phân tách `border-b`) nhằm bảo toàn cấu trúc hình học và khoảng cách bố cục nguyên bản của Sidebar; đồng thời ẩn các phần tử chữ "XP English | XP Voca" và nút `[|<]` trên Mobile để ngăn chặn người dùng vô tình bấm làm thay đổi trạng thái Desktop.
        - **Bảo Toàn Giao Diện Menu Mobile Đầy Đủ (Drawer Full Width)**: Khi người dùng mở thanh bên trên Mobile, giao diện luôn hiển thị đầy đủ tên danh mục, tiêu đề phân mục và thẻ thông tin tài khoản người dùng trực quan, ngay cả khi phiên làm việc trên Desktop đang ở chế độ thu gọn 72px.
      - **Header 2 Dòng Responsive**: Tách nút Thoát, Đồng Hồ Đếm Ngược, Nộp Bài lên dòng 1; Tên đề thi & Badge xuống dòng 2; bảo toàn 100% Header 1 dòng trên Desktop.
      - **Part 1 Photographs Mobile Adaptive Frame**: Khung ảnh tự động co giãn thông minh (`h-52 sm:h-64 md:h-full max-h-[340px]`), loại bỏ hiện tượng co giật và vỡ layout; hỗ trợ cơ chế tự động Fallback `onError` đảm bảo 100% không bao giờ gặp biểu tượng ảnh lỗi; các thẻ đáp án A/B/C/D tự động ngắt dòng `break-words` và đạt chuẩn vùng chạm ngón tay cái `min-h-[44px]` thân thiện cho di động.
      - **Khử Hoàn Toàn Khoảng Trắng Lề Trái 72px**: Tách biệt CSS `.main-content.sidebar-collapsed` chỉ áp dụng `margin-left: 72px` trên Desktop (`>= 1024px`), đặt `margin-left: 0` trên Mobile.
      - **Thanh Điều Hướng Ghim Cố Định Đáy Màn Hình (Fixed Pinned Bottom Bar)**: Thanh điều hướng câu hỏi di động được căn chỉnh bố cục 3 phần hoàn hảo: Nút `[ < Trước ]` bám sát rìa trái, Nút `[ Tiếp > ]` bám sát rìa phải, cụm `[ ★ Ghim ]` và `[ 📋 1/200 ]` được gom nhóm căn chính xác vào tâm giữa màn hình (`justify-between`), ghim cố định vững chắc sát đáy (`fixed bottom-0 left-0 right-0 z-40 lg:hidden p-2.5 px-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl`), tối ưu thao tác ngón cái (Thumb-zone) và không bao giờ bị trôi khi cuộn câu hỏi; trong khi **Desktop sử dụng khối nút điều hướng in-flow bên trong thẻ câu hỏi mà không có thanh fixed đáy**.
      - **Phiếu Trả Lời Dạng Bottom Sheet Drawer**: Chuyển ma trận 200 nút trả lời cồng kềnh trên mobile thành Modal Bottom Sheet tiện lợi khi chạm vào nút `[ 📋 1/200 ]`.
      - **Trau Chuốt & Rút Gọn Chữ Thừa Trên Mobile Hub**: Rút gọn các nút chuyển tab `Đề Chuẩn` / `Tạo Đề AI`, 4 nhãn kỹ năng `Nghe` / `Đọc` / `Nói AI` / `Viết AI` (ẩn phần tiếng Anh trong ngoặc), và 5 tab danh mục chuyển sang định dạng lưới **`grid grid-cols-5 gap-1 w-full`** (`Tất cả` / `TOEIC 4K` / `Nói+Viết` / `IELTS Nói` / `IELTS Viết`) vừa vặn 100% bề ngang màn hình điện thoại, **triệt tiêu hoàn toàn thanh cuộn ngang/lướt ngang (Zero Horizontal Scroll)**; trong khi **Desktop sử dụng dấu chấm phân cách hiện đại `Nghe • Listening`, `Đọc • Reading` với khoảng cách rộng rãi, loại bỏ hoàn toàn dấu ngoặc đơn dính chữ**.
    - **Đồng Bộ Hóa URL Đề Thi (`?id=1` / `?id=N`)**: Khi người dùng bắt đầu thi đề số 1 (hoặc bất kỳ đề nào), hệ thống tự động gán tham số ID lên thanh địa chỉ (ví dụ: `http://localhost:3000/study/exam-prep?id=1`). Cho phép truy cập trực tiếp qua liên kết hoặc chia sẻ URL để tự động mở thẳng bài thi vào phòng thi tương ứng. Khi quay lại danh sách đề, URL được dọn sạch về `/study/exam-prep`.
    - **`ReadingWorkspace`**: Cam kết bài đọc luôn luôn hiển thị sóng đôi bên trái (Always-Visible Passage Split View) + Dòng câu hỏi bên phải. Tối ưu typography chuẩn đọc báo quốc tế (loại bỏ nút `-A A A+` rườm rà, tăng kích cỡ chữ `text-sm sm:text-[15px]` và làm đậm nét chữ `font-medium text-slate-900 dark:text-slate-100` rõ ràng, êm mắt).
    - **`SpeakingStudioWorkspace`**: Quy trình 3 Phase Stepper Studio (Prep timer 45s/60s ➔ Micro pulse 60fps + STT Live Transcript 0ms ➔ Báo cáo AI 5 chỉ số).
    - **`WritingStudioWorkspace`**: Distraction-Free Essay Editor + Live Word Counter + Gemini AI Evaluator chấm 4 tiêu chí chuẩn Cambridge.
    - **`SkillTransitionBridge`**: Màn hình chuyển giao kỹ năng 30 giây nghỉ ngơi.
  - **Unified Control Panel Studio**: Gộp 100% hai khối rời rạc cũ thành duy nhất 1 Bảng Điều Khiển Hợp Nhất, hỗ trợ chuyển đổi linh hoạt giữa Chế độ Đề thi chuẩn ETS/Cambridge và Chế độ Tạo đề AI Gemini.
  - **Visual 5-Star Difficulty Rating**: Loại bỏ đoạn chữ Max pts rườm rà, thay bằng hệ thống 5 ngôi sao đánh giá độ khó visual màu vàng hổ phách.
  - **Hệ Thống Chấm Điểm & Phân Tích Lời Giải Chuyên Sâu Master-Detail Bento Split Studio ([examScoringEngine.ts](file:///e:/XP%20English%20%20XP%20Voca/lib/utils/examScoringEngine.ts))**:
    - **Thuật Toán Quy Đổi Điểm Chuẩn Quốc Tế Cho 3 Đề Thi Đầu**:
      - **Đề 1 & Đề 2 (TOEIC L&R 200 câu)**: Quy đổi chính xác theo thang điểm ETS TOEIC `Listening (5 - 495 PTS)` + `Reading (5 - 495 PTS)` = `Tổng Điểm (10 - 990 PTS)` kèm ma trận chuẩn đoán 7 Part.
      - **Đề 3 (TOEIC Speaking & Writing AI Studio 19 câu)**: Quy đổi chính xác theo thang điểm chuẩn ETS quốc tế `Speaking (0 - 200 PTS / Level 1-8)` + `Writing (0 - 200 PTS / Level 1-9)` = `Tổng Điểm (0 - 400 PTS)` kèm hệ thống chuẩn đoán chuyên sâu cho 5 task Nói (Read Aloud, Describe Picture, Respond Questions, Info Provided, Opinion) và 3 task Viết (Write Sentence, Email Request, Opinion Essay 300+ words).
      - **Đề 4 (TOEIC 4 Kỹ Năng)** & **Đề IELTS (Cambridge Band 1.0 - 9.0)**: Tích hợp đầy đủ sub-scores Listening, Reading, Speaking AI, Writing AI trên thanh Banner kết quả Glassmorphism.
    - **Hệ Thống Typography Chuẩn Hóa & Đồng Bộ Toàn Trang**:
      - Toàn bộ văn bản giao diện (tiêu đề, nhãn, nút bấm, hướng dẫn, câu tiếng Anh và bản dịch tiếng Việt) sử dụng font chuẩn **`Be Vietnam Pro`** (`font-sans`), đồng bộ tỉ lệ và khoảng cách chữ tự nhiên.
      - Font monospace (`font-mono`) chỉ dùng chuẩn mực cho các thành phần số đo kỹ thuật: Bộ đếm thời gian `00:00 / 00:07`, nấc tốc độ `1x`, chuỗi dấu chấm ẩn từ `••••`, và các phím tắt `Enter`, `Ctrl`, `Alt+H`, `Alt+R`.
      - **Khung bản dịch câu**: Tiêu đề sử dụng định dạng tự nhiên `Bản dịch câu:` (`text-xs font-semibold font-sans`) đi cùng icon `Languages`, không bị in hoa thô cứng, kèm văn bản dịch tiếng Việt mượt mà không bị lặp tiền tố `Việt:`.
    - **Tab 1: Bento Score & Performance Dashboard**: Thẻ vinh danh kết quả với vòng tròn đo điểm **SVG Radial Score Gauge** phát sáng đa sắc được tối ưu tỷ lệ hoàn hảo trên Mobile (`w-[88px] h-[88px]` to rõ, cân xứng với cụm điểm số bên cạnh) và Desktop (`sm:w-24 sm:h-24`), 2 thẻ kính con cho điểm Nghe/Đọc (/495), 4 thẻ chỉ số nhanh Double-Bezel (Câu Đúng, Câu Sai, Bỏ Qua, Tốc độ trung bình giây/câu) và danh sách Part có tiêu đề tinh gọn kèm icon `TrendingUp` nổi bật (loại bỏ chữ tiếng Anh thừa `ETS Standard Benchmark`), căn chỉnh các thanh tiến trình thẳng hàng 100% theo trục dọc bằng CSS Grid (`grid-cols-12`). Nút hành động chính `Xem Chi Tiết Từng Câu` kéo dài **Full-width (`w-full`)** trên Mobile, đi kèm 2 nút chân trang chia đều **48% mỗi bên (`w-[48%]`)** nằm sát mép trái/phải cực kỳ tiện dụng; trong khi **Desktop giữ nguyên nút chính căn giữa và nút chân trang rộng rãi**.
    - **Tab 2: Master-Detail Bento Review Studio (Giải Quyết 100% Cuộn Chuột)**: Huy hiệu đếm số lượng câu hỏi (`200`) được ẩn trên Mobile (`hidden sm:inline-block`) giúp 3 Tab hiển thị gọn gàng trên đúng 1 dòng duy nhất (`1. Điểm số`, `2. Lời giải`, `3. Lộ trình AI`), hiển thị đầy đủ trên Desktop.
      - **Cột Trái (3.8/12 — Sticky Question Navigator)**: Ghim cố định khi cuộn trang, tích hợp bộ lưới lọc trạng thái 5 thẻ gọn gàng (`Tất cả`, `Đúng`, `Sai`, `Bỏ qua`, `Đánh dấu`) kèm chấm màu và số lượng cụ thể; dropdown chọn Part có icon định hướng; ma trận bảng số 6 cột chuẩn ETS với trạng thái màu dịu mắt khi chưa chọn (`emerald/15`, `rose/15`, `amber/20`, `white`) và **nổi bật rực rỡ kèm viền sáng khi đang chọn xem**; thanh trạng thái chân trang hiển thị câu đang xem.
      - **Cột Phải (8.2/12 — Rich Question Inspector)**: Thanh phát Audio Waveform có nút bật/tắt Lời thoại (Transcript), đoạn văn đọc hiểu báo chí, so sánh 4 đáp án A/B/C/D với viền sáng màu phân biệt tuyệt đối (`✓ ĐÁP ÁN CHÍNH XÁC` vs `✗ BẠN ĐÃ CHỌN`), kèm **Khung Lời Giải Chuyên Sâu** phân tích dẫn chứng và bẫy đề thi.
      - **Nút "🤖 Hỏi AI Coach Giải Thích Thêm"** kết nối API `/api/ai/exam-explain` sử dụng Gemini AI phân tích ngữ pháp, từ vựng và mẹo làm bài theo thời gian thực.
      - Hỗ trợ phím tắt bàn phím `ArrowLeft` / `ArrowRight` để chuyển câu tức thì.
    - **Tab 3: AI Chẩn Đoán & Action Studio**: Báo cáo phân loại Điểm mạnh (`Mastered Competencies`) vs Lỗ hổng trọng yếu cần củng cố (`Priority Areas`). Từng thẻ lỗ hổng được trang bị **Huy hiệu Khẩn Cấp / Cần Lưu Ý** dạng Soft Pill với chấm trạng thái phát sáng (`animate-pulse`), độ chính xác chi tiết cho từng Part, phân tích lời khuyên chuyên biệt và nút 1-Click `"Xem lại Part này →"` nhảy thẳng sang Tab 2; kết hợp 3 thẻ hành động Studio 1-Click chuyển nhanh sang Dictation (+50 XP), Ôn Từ Vựng SRS (+30 Vàng), hoặc Phòng Luyện Ngữ Pháp AI (+40 XP).
  - **Hệ Thống Backend Persistence & Đồng Bộ PostgreSQL (`/api/exams/attempts`, `/api/exams/stats`)**:
    - **`POST /api/exams/attempts`**: Xác thực học viên qua `getAuthenticatedUserId()`. Lưu trữ toàn bộ kết quả bài thi (`ExamAttempt`, `QuestionAnswer`) vào PostgreSQL thông qua Prisma transaction an toàn, tự động liên kết `ExamType` & `Exam`, đồng thời cộng điểm XP, Vàng và số phút học vào hồ sơ học viên.
    - **`GET /api/exams/attempts`**: Truy vấn 10 lượt thi gần nhất kèm điểm số chi tiết từng kỹ năng.
    - **`GET /api/exams/stats`**: Tổng hợp thống kê tổng số đề đã hoàn thành, điểm TOEIC cao nhất, Band IELTS cao nhất, tỷ lệ chính xác trung bình và biểu đồ tiến độ điểm số 7 ngày.
  - **Cơ Chế LocalStorage Auto-Save Session & Phục Hồi Khi Tải Lại Trang (Crash Recovery Engine)**: Tự động lưu tiến trình làm bài (`userAnswers`, `secondsRemaining`, `flaggedQuestions`, `currentQuestionIndex`) vào `localStorage` trong suốt quá trình làm bài, tự động dọn dẹp khi nộp bài hoặc thoát đề; đi kèm Modal xác nhận nộp bài hiển thị chi tiết 3 badge thống kê: *Đã làm*, *Chưa làm*, *Đánh dấu ghim*.
  - **Cân Bằng Phân Bổ Đáp Án Chuẩn Quốc Tế Cho Toàn Bộ 37 Bộ Đề Thi (Answer Key Equalizer)**: Áp dụng thuật toán hoán vị lựa chọn đưa tỷ lệ phân bổ đáp án của 100% đề thi trắc nghiệm về mức chuẩn tự nhiên: **~25% A, ~25% B, ~25% C, ~25% D** (Part 2 TOEIC 3 lựa chọn đạt ~30-36%), đồng bộ hóa câu giải thích tiếng Việt `explanation` trỏ đúng vào phương án đúng mới; bảo chứng bởi bộ kiểm thử tự động `__tests__/exam_bank_audit.test.ts` (100% Pass across all 37 papers).
  - **Trình Tạo Đề Thi AI (`/api/ai/exam-generate`) & API Phân Tích Lời Giải AI (`/api/ai/exam-explain`)**: Kết nối Google Gemini API tự động sinh đề thi mới và phân tích chuyên sâu lý do Đúng/Sai cho từng câu hỏi.
- **`/ai/tutor`**: AI Voice Tutor Studio — Phòng Thu Luyện Nói & Giao Tiếp Giọng Nói AI Tự Do 1-1 (Agency Zen Studio Bento 8/4 Tier).
  - **Bố Cục Bento Grid 8/4 Tinh Gọn & Micro-Hero Banner**: Đồng bộ 100% với ngôn ngữ thiết kế toàn hệ thống. Banner trên cùng tích hợp badge `AI VOICE TUTOR` kéo dài đĩnh đạc trên Desktop (`sm:min-w-[155px]`), nút *"Hoàn thành & Chấm điểm"* màu xanh emerald và đồng hồ đếm thời gian thực.
  - **Cột Trái (8/12 - Voice Chat Studio Rộng Rãi)**: Tối ưu không gian luyện thoại Voice-First (`h-[42svh] sm:h-[48svh] lg:h-[380px] xl:h-[430px]`), bong bóng chat song ngữ tinh tế, dải gợi ý thuần chữ to rõ (Click phát âm ngay), dock thu âm liên tục (Voice-Only) không đứt quãng với nút Micro tròn lớn, cơ chế **Toggle-to-Send** thông minh (Bấm lần 1 để nói, bấm lần 2 để dừng và tự động gửi).
  - **Hệ Thống Đánh Giá & Chấm Điểm Động 4 Trụ Cột (Dynamic Voice Evaluation Engine)**:
    - **Guard Check chống hoàn thành rỗng**: Bắt buộc học viên tương tác ít nhất 1 câu để AI có dữ liệu chấm điểm thực tế.
    - **4 Thước đo giọng nói**: Phát âm (`Pronunciation Score`), Tương tác (`Turns`), Thời gian luyện tập và Độ chuẩn xác ngữ pháp (`Grammar Accuracy`).
    - **Hệ thống Xếp Hạng & Thưởng XP Động**: `Hạng S (90-100 pts) ➔ +45 XP`, `Hạng A (80-89 pts) ➔ +35 XP`, `Hạng B (70-79 pts) ➔ +25 XP`, `Hạng C (<70 pts) ➔ +15 XP`.
    - **Lời Nhận Xét Cá Nhân Hóa Theo 3 Huấn Luyện Viên**:
      - **Emma (🇬🇧 IELTS Coach)**: Phân tích ngữ điệu Anh-Anh, độ liên kết và sự mạch lạc trong câu.
      - **Alex (🇺🇸 Tech & Business Coach)**: Nhận xét phản xạ nhanh, tính trực diện và từ vựng thực tế.
      - **Chloe (🇦🇺 Friendly Tutor)**: Lời động viên ấm áp, khen ngợi sự tự tin và phản xạ tự nhiên.
  - **Quy Chuẩn Phông Chữ Đứng Thẳng Đồng Bộ Toàn Diện (Zero-Italic Typography Policy)**: Loại bỏ 100% định dạng chữ nghiêng (`italic`), toàn bộ nội dung từ gợi ý diễn đạt, nhận xét của Huấn luyện viên, mẹo chủ đề đến bong bóng chat đều sử dụng phông chữ đứng chuẩn hệ thống `Be Vietnam Pro` (`font-sans` / `font-display`) sắc nét, phẳng và hiện đại.
  - **Hộp Sửa Lỗi Ngữ Pháp Chuẩn Hóa**: Khung Double-bezel xám đá cao cấp (`slate-50/dark:slate-900`), badge so sánh lỗi đỏ-xanh, loại bỏ 100% dấu ngoặc đơn `()` bọc ngoài phần giải thích, kèm nút Loa nghe phát âm câu diễn đạt tự nhiên chuẩn bản xứ.
  - **Hoàn Thành & Chấm Điểm Thế Chỗ Trực Tiếp (In-Place Screen Replacement)**: Thay thế trực tiếp khung chat bằng Scorecard Bento Grid 8/4 toàn diện (Huy hiệu Hạng, Điểm Phản Xạ thực tế, 4 Ô chỉ số nhanh, Lời nhận xét của Coach, Từ vựng tiêu biểu, Lịch sử chat đóng mở mượt mà và nút *"Luyện Buổi Mới"*).
- **`/ai/conversation`**: AI Conversation Studio — Phòng Luyện Giao Tiếp AI 1-1 Theo Chủ Đề (Agency Zen Studio Bento 8/4 Tier).
  - **Bento Grid 8/4 Layout & Bộ Chọn Chủ Đề Tối Giản Mở Rộng**: Dropdown chọn chủ đề nhanh `[ 🍔 Nhà hàng & Gọi món ▾ ]` kéo dài mở rộng trên Desktop (`sm:min-w-[220px] md:min-w-[250px]`) cùng badge `AI CONVERSATION` (`sm:min-w-[155px]`), giải phóng 100% diện tích màn hình cho không gian hội thoại chính.
  - **Nhập Liệu Viết Bàn Phím Tự Do & Dải Gợi Ý Thuần Chữ**: Cho phép gõ bàn phím tự do (`readOnly={false}`), hỗ trợ phím **Enter** gửi nhanh; hiển thị 3 từ vựng trọng tâm + 2 cụm câu mở đầu to rõ (`text-xs sm:text-sm`), không viền hộp, hover tĩnh lặng và nhấp chuột phát âm ngay lập tức.
  - **Quy Chuẩn Phông Chữ Đứng Thẳng Đồng Bộ (Zero-Italic Typography Policy)**: Loại bỏ hoàn toàn chữ nghiêng ở câu gợi ý diễn đạt và mẹo chủ đề, đồng bộ 100% phông chữ đứng chuẩn `Be Vietnam Pro`.
  - **Backend Logic Gợi Ý Động & Nhận Diện Mục Tiêu (`/api/ai/chat`)**: Tích hợp Gemini AI với prompt cấu trúc chặt chẽ và kho từ điển Fallback 6 chủ đề chính, tự động phân tích ngữ pháp, gợi ý diễn đạt tự nhiên sạch sẽ, sinh đúng **3 từ vựng trọng tâm** + **2 câu gợi ý mở đầu** và tự động tick hoàn thành mục tiêu hội thoại.
  - **Thuật Toán Chấm Điểm Theo Chủ Đề & Tình Huống (Goal-Oriented Dynamic Scoring)**:
    - **Công thức trọng số khoa học**: $\text{Score} = (40\% \times \text{Mục tiêu}) + (30\% \times \text{Ngữ pháp}) + (20\% \times \text{Tương tác}) + (10\% \times \text{Vốn từ})$.
    - **Xếp hạng S/A/B/C & Thưởng XP động**: Tự động phân cấp từ `+15 XP` đến `+45 XP` theo thành tích thực tế của buổi nói chuyện.
  - **Cột Phải Hợp Nhất (Unified Single Sidebar Card)**: Tích hợp 2 phân đoạn sạch sẽ: Checklist Mục tiêu nói (Tick xanh realtime) + Danh sách từ vựng then chốt & Mẹo giao tiếp 1 câu ngắn gọn.
  - **Hoàn Thành & Chấm Điểm Thế Chỗ Trực Tiếp (In-Place Screen Replacement)**: Thay thế trực tiếp khung chat bằng Bảng Báo Cáo & Chấm Điểm Buổi Hội Thoại Toàn Diện (Huy hiệu Hạng, Điểm phản xạ thực tế, % hoàn thành mục tiêu, chuẩn ngữ pháp, xem lại lịch sử chat, nút *"Luyện Buổi Mới"*).
  - **Skeleton Loading Đạt Chuẩn (Quy Tắc 1 UI/UX)**: Khớp 100% tỷ lệ và bố cục Bento 8/4 của giao diện thực tế.
- **`/study/listening`**: Studio Luyện Nghe & Chép Chính Tả Chuyên Sâu (Dictation Workspace Studio - Single-Sentence Focus Flow).
  - **Đồng Bộ Hóa URL Trực Tiếp (`/study/listening?id=1` hoặc `?id=9`)**: Tự động nhận diện và phân giải tham số `?id=1`, `?id=9`, ... (hoặc mã bài học `listen_001`), tự động đồng bộ đường dẫn trên trình duyệt và tự động thu gọn Sidebar khi vào không gian học.
  - **Khối Điều Khiển Sóng Âm Acoustic Studio Siêu Mảnh Nhấp Nhô Bất Chợt (`StudioWaveformCard.tsx`)**:
    - **Dải Sóng Âm Phổ Thực Tế Nhấp Nhô Bất Chợt (`JAGGED_ACOUSTIC_SPEECH_SPIKES_95`)**: 95 vạch sóng siêu mảnh `1.2px - 1.8px` đặt siêu sát nhau (`gap: 1px - 1.5px`), tái lập độ tương phản cao với các đỉnh nhọn bất chợt lên xuống tự nhiên của âm thanh giọng nói; hiệu ứng dao động 60fps mượt mà, tự nhiên theo nhịp thở âm học (0.7s - 1.1s, `easeInOut`), loại bỏ hoàn toàn cảm giác giật/khựng.
    - **Typography & Icon Mở Rộng Sắc Nét & Dock Tốc Độ Hiệu Ứng Trượt (Spring LayoutId)**: Tiêu đề in đậm `text-sm font-bold`, biểu tượng `Volume2 w-4.5`, đồng hồ kỹ thuật số `text-[15px] font-extrabold`, cụm nút `Play/Pause w-14` (Rule 18), `Tua 5s w-10.5` với icon `w-5.5` to rõ; **dock chọn tốc độ `[0.5x, 0.75x, 1x, 1.25x, 1.5x]` tích hợp hiệu ứng con trượt mượt mà (Framer Motion `layoutId="activeSpeedPillIndicator"`)** lướt chuẩn vật lý khi chuyển đổi.
    - **Bộ Phím Tắt Điều Khiển Studio Đa Dạng**: `Space` (Phát/Tạm dừng), `Ctrl` (Nghe lại từ đầu câu), `Enter` (Sang câu tiếp theo), `← / →` (Tua lùi/nhanh 5s), `Alt+H` (Gợi ý chữ đầu), `Alt+R` (Mở trọn vẹn từ).
  - **Thanh Tiện Ích Đầy Đủ (Sentence Utility Toolbar)**:
    - **Lưu câu (Bookmark)**: Lưu câu vào sổ tay luyện tập cá nhân `localStorage`, thưởng ngay +5 XP và cập nhật icon vàng nổi bật.
    - **Báo cáo (Report)**: Toast ghi nhận đóng góp phản hồi về câu đọc/bản dịch.
    - **Bộ Điều Chỉnh Cỡ Chữ (`-A / +A`)**: 4 nấc kích thước font chữ (Tiêu chuẩn 14px ➔ 16px ➔ 18px ➔ Rất lớn 20px) lưu theo phiên người dùng.
    - **Công Tắc Tự Động Tiếp & Ẩn Bản Dịch**: Switch pill trực quan cho phép tự động nhảy câu tiếp theo khi gõ đúng 100% hoặc ẩn dịch để tối đa hóa sự tập trung.
  - **Ô Nhập Liệu Chuẩn Studio (`DictationWorkspace.tsx`)**: Hỗ trợ gõ trực tiếp câu/từ nghe được theo thời gian thực (real-time typing matching: gõ từ + Space/Enter ➔ tự động đối chiếu, chuyển trạng thái từ sang màu Xanh Ngọc Emerald, phát hiệu ứng haptic phản hồi và cộng +5 XP).
  - **Thanh Nhận Diện Danh Từ Riêng (Proper Noun Pill Bar)**: Tự động trích xuất các tên riêng/địa danh (`ⓘ Danh từ riêng: [ IT ] [ London ] ...`) giúp người học không bị tắc nghẽn vô cớ khi nghe các danh từ riêng khó đánh vần.
  - **Mạng Lưới Khối Từ Che Thích Ứng & Tự Động Định Tâm (Auto-Centering Word Mask Track)**:
    - Số lượng dấu chấm `•` thể hiện **chính xác 1:1 theo độ dài ký tự** của từng từ (VD: `I` ➔ `•`, `have` ➔ `••••`, `renovation` ➔ `••••••••••`), bảo toàn dấu câu gốc.
    - **Khi Thu Gọn Sidebar (`sidebarCollapsed = true`)**: Tự động chuyển đổi thành 1 hàng ngang **ẩn hoàn toàn thanh cuộn xám (`hide-scrollbar`)**; tích hợp cơ chế **tự động cuộn định tâm từ tiếp theo (`scrollIntoView({ inline: 'center' })`)** ngay khi học viên gõ đúng từ, người học không cần phải chạm tay hay lướt chuột thủ công.
    - **Khi Mở Sidebar (`sidebarCollapsed = false`)**: Giữ nguyên bố cục nhiều hàng tự nhiên (`flex-wrap`).
  - **Khối Phụ Đề & Không Gian Chuyên Biệt Gợi Ý Bài Học (`InteractiveTranscriptSidebar.tsx`)**:
    - **Tab 1: Phụ Đề Tương Tác**: Thẻ câu đang học nổi bật với viền Emerald 2 lớp và huy hiệu `ĐANG HỌC` rực rỡ; thẻ hoàn thành với tích xanh thanh lịch; câu chưa học dạng danh sách tối giản.
    - **Tab 2: Chuyên Biệt Gợi Ý Bài Học (Dedicated Lesson Recommendations)**: Hiển thị danh sách các bài học đề xuất thông minh cùng trình độ / chủ đề với ảnh thumbnail, huy hiệu cấp độ, số câu, thời lượng và nút *"Học ngay ➔"* chuyển bài trực tiếp 1-click kèm nút *"Đổi gợi ý ↺"*.
  - **Màn Hình Tổng Kết & Xem Lại Toàn Bộ Bài Song Ngữ Khi Hoàn Thành (`isLessonFinished = true`)**:
    - **Bento Summary Card**: Điểm thưởng +50 XP, tổng thời gian học mm:ss, số câu chép đúng 100%, xếp hạng thành tích.
    - **Đoạn Văn Hoàn Chỉnh & Bản Dịch Toàn Bài**: Xem lại toàn bộ transcript song ngữ với nút nghe từng câu riêng biệt.
    - **Bộ Câu Hỏi Quiz Trắc Nghiệm**: Kiểm tra mức độ hiểu bài, đồng bộ điểm thưởng XP qua API `/api/listening/progress`.
    - **Thanh Hành Động Tiếp Bước**: Luyện lại từ đầu, chuyển sang Shadowing AI, làm bài Quiz hoặc sang bài học tiếp theo.
    - **Trên Mobile & Desktop**: Tự động trang bị nút **Hamburger Menu (`Menu` 3 gạch ngang)** mở nhanh Sidebar, cụm Mode Switcher Pill đồng bộ 100% Sidebar theo từng trang (Trang Luyện Đọc: `[ 📖 Luyện Đọc ] [ 🎧 Dictation ] [ 🎙️ Shadowing ]`; Trang Dictation: `[ 🎧 Dictation ] [ 🎙️ Shadowing ] [ 📖 Luyện Đọc ]`; Trang Shadowing: `[ 🎙️ Shadowing ] [ 🎧 Dictation ] [ 📖 Luyện Đọc ]`), nút chuyển đổi **Chế độ Sáng / Tối (`Sun` / `Moon`)**, và **Avatar người dùng** liên kết trực tiếp tới `/profile`. Khi vào phòng đọc bài (`?id=...`), tự động chuyển sang nút **Back (`ArrowLeft`)** + Tiêu đề bài + Badge CEFR + Bộ điều khiển studio (Timer / Font Zoomer / Toggle dịch).
- **`/vocabulary` & `/vocabulary/[id]`**: Kho Từ Vựng Tiếng Anh Theo Chủ Đề (155 Chủ Đề & 8,948 Từ Vựng Thực Tế).
  - **Tự động cập nhật 155 Chủ đề**: Bao gồm 10 chủ đề mới chuyên ngành tên ngắn gọn (`CNTT & AI`, `Y tế`, `Tài chính`, `Luật pháp`, `Môi trường`, `Marketing`, ` Du lịch`, `Khoa học`, `Nghệ thuật`, `Thể thao`) kèm icon Lucide sắc nét.
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

## 🎯 Đấu Trường Thi Thử Quốc Tế & Ngân Hàng 37 Đề Chuẩn ETS/IELTS (`/study/exam-prep`)

- **Bố Cục 3 Chế Độ (3-Mode Bento Architecture)**:
  - **Chế độ 1: Exam Hub / Test Bank**: Bộ cấu hình 4 kỹ năng độc lập (Nghe, Đọc, Nói AI, Viết AI), tích hợp AI Exam Generator (`Gemini 2.5`), phân loại độ khó 5 sao và bộ lọc preset 1-click.
  - **Chế độ 2: Live Test Workspace**: Dual-panel Split View (60/40), thanh toolbar đếm giờ chuẩn xác, tự động thu gọn Sidebar khi thi, tích hợp AI Text-to-Speech đa giọng bản xứ (US/UK/AU), Web Speech STT chấm phát âm Speaking thời gian thực và AI Essay Writing Grader.
  - **Chế độ 3: Master-Detail Bento Review Studio**:
    - **Tab 1 - Bento Score Dashboard**: Đồng hồ SVG Radial Gauge, 4 thẻ Double-Bezel Metrics và bảng phân tích Part căn gióng thẳng hàng 100%.
    - **Tab 2 - Lời Giải Chuyên Sâu**: Split screen 2 cột (Desktop) và Mobile Swipe Carousel + Bottom Sheet Drawer (Mobile) điều hướng 200 câu hỏi, so sánh đáp án A/B/C/D, bóc tách bẫy đề thi và mẹo ngữ pháp độc quyền.
    - **Tab 3 - AI Diagnostic Studio**: Phân tích điểm mạnh, Soft Pill Badges phát sáng (`animate-pulse`) cảnh báo lỗ hổng Khẩn Cấp / Cần Lưu Ý kèm nút 1-click chuyển đến Part cần ôn luyện.
- **Tối Ưu Tương Thích Màn Hình Mobile (Multi-Device Mobile Optimization)**:
  - **Tuyệt đối 100% không ảnh hưởng Desktop**: Toàn bộ thay đổi bọc trong Tailwind responsive utility classes (`hidden lg:block`, `lg:hidden`, `sm:`, `md:`).
  - **Thumb-Zone Floating Navigation Bar**: Thanh điều hướng nổi ngón tay cái dưới đáy màn hình trên mobile (`[Trước]`, `[Ghim ⭐]`, `[Phiếu 📋]`, `[Tiếp]`).
  - **Mobile Question Carousel & Bottom Sheet Drawer**: Dải số câu vuốt ngang trên mobile kết hợp Bottom Sheet trượt mở bảng 200 câu mà không làm che khuất đề bài.
  - **Mobile Collapsible Passage**: Cho phép thu gọn/mở rộng bài đọc Reading linh hoạt trên màn hình hẹp.

### 📚 Danh Mục Ngân Hàng 37 Đề Thi Chuẩn Hóa 100% (Unique Question Bank)
Toàn bộ 37 đề thi trong thư mục `lib/data/exam-papers/` đã được rà soát và tái thiết kế 100%, loại bỏ hoàn toàn mã lặp loop-fills/clone placeholders, phân bổ đồng đều xác suất đáp án A/B/C/D (25% mỗi key) và biên soạn ngữ liệu học thuật/thương mại C1/C2 chân thực:

1. **TOEIC Full L&R 200-Câu (Exams 1, 2, 9, 16)**: `toeic_lr_2026_01` (200Q), `toeic_lr_2026_02` (200Q), `toeic_lr_2026_03` (200Q), `toeic_lr_2026_04` (200Q) — Đầy đủ 100 câu Listening (6 Photos, 25 Q&A, 39 Conversations/13 hội thoại, 30 Talks/10 bài nói) + 100 câu Reading (30 Part 5, 16 Part 6/4 memos, 54 Part 7 Single/Double/Triple Passages).
2. **IELTS Academic 4-Skills 85-Câu (Exams 4, 8, 10, 12, 14, 17)**: `ielts_academic_4k_01` đến `06` (85Q mỗi đề: 40 Listening, 40 Reading, 3 Speaking Parts, 2 Writing Tasks).
3. **IELTS General Training 4-Skills (Exam 15)**: `ielts_general_4k_01` (85Q).
4. **TOEIC Speaking & Writing AI Studio (Exams 3, 13, 28, 23, 25)**: `toeic_sw_2026_01` (19Q), `toeic_sw_2026_02` (19Q), `toeic_sw_2026_03` (19Q), `toeic_speaking_pro_01` (11Q), `toeic_writing_pro_01` (8Q).
5. **IELTS Speaking & Writing Pro (Exams 6, 7, 22, 24, 29)**: `ielts_speaking_pro_01` (3Q), `ielts_speaking_pro_02` (3Q), `ielts_writing_master_01` (2Q), `ielts_writing_master_02` (2Q), `ielts_sw_combo_01` (5Q).
6. **Kỹ Năng Đơn Tốc Độ (Exams 11, 18, 19, 20, 21)**: `toeic_mini_speed_01` (50Q), `ielts_listening_sprint_01` (40Q), `toeic_listening_master_01` (100Q), `ielts_reading_sprint_01` (40Q), `toeic_reading_master_01` (100Q).
7. **Combo 2 Kỹ Năng Độc Đáo (Exams 26, 27, 30, 31, 32, 33, 34, 35, 36, 37)**:
   - `toeic_lr_sprint_01` (100Q - 50L + 50R)
   - `ielts_lr_combo_01` (80Q - 40L + 40R)
   - `ielts_ls_interactive_01` (43Q - 40L + 3S)
   - `toeic_ls_interactive_01` (61Q - 50L + 11S)
   - `ielts_rw_synthesis_01` (42Q - 40R + 2W)
   - `toeic_rw_business_01` (58Q - 50R + 8W)
   - `ielts_lw_studio_01` (42Q - 40L + 2W)
   - `toeic_lw_workplace_01` (58Q - 50L + 8W)
   - `ielts_rs_studio_01` (43Q - 40R + 3S)
   - `toeic_rs_business_01` (61Q - 50R + 11S)
8. **Master 4-Skills All-in-One (Exam 5)**: `toeic_full_4k_01` (219Q).

---

## 📖, 🎧 & 🎙️ Smart Audio & Reading Studios (`/study/reading`, `/study/listening` & `/study/shadowing`)

1. **Studio-Aligned Continuous Top Bar Header (`AppTopHeader` 56px Baseline)**:
   - Chiều cao chuẩn `h-14` (56px) với viền đáy `border-b border-slate-200/90 dark:border-slate-800` chạy thẳng tắp mép-sang-mép (Edge-to-Edge), khớp 100% với Header Sidebar và Top Header của Dashboard.
   - **Trên Mobile**: Tự động trang bị nút **Hamburger Menu (`Menu` 3 gạch ngang)** mở nhanh Sidebar, cụm Mode Switcher Pill theo từng trang (Trang Luyện Đọc: `[ 📖 Luyện Đọc ] [ 🎧 Luyện Nghe ] [ 🎙️ Luyện Nói ]`; Trang Luyện Nghe: `[ 🎧 Luyện Nghe ] [ 🎙️ Luyện Nói ]`; Trang Shadowing: `[ 📖 Luyện Đọc ] [ 🎧 Luyện Nghe ] [ 🎙️ Luyện Nói ]`), nút chuyển đổi **Chế độ Sáng / Tối (`Sun` / `Moon`)**, và **Avatar người dùng** liên kết trực tiếp tới `/profile`. Khi vào phòng đọc bài (`?id=...`), tự động chuyển sang nút **Back (`ArrowLeft`)** + Tiêu đề bài + Badge CEFR + Bộ điều khiển studio (Timer / Font Zoomer / Toggle dịch).
   - **Trên Desktop**: Giữ nguyên vẹn 100% thanh tìm kiếm nhanh `h-9 rounded-xl` (`w-44 xs:w-56 sm:w-72`), nút hành động chính (Tạo bài AI / Khám phá 100+ bài), và các điều khiển studio riêng của từng trang.

2. **Spacious Zero-Clutter Studio Canvas**:
   - Loại bỏ các khối hộp thông số rườm rà chiếm diện tích, tạo không gian thoáng đãng tập trung trực diện vào bài học.
   - Canvas nền `bg-slate-50/60 dark:bg-slate-950` sạch sẽ, phân tách hai hàng bài học rõ ràng:
     - **A1 - A2 Cơ bản**: Mẫu câu ngắn, giao tiếp nền tảng, Email/Thông báo (8 bài / 2 hàng × 4 cột).
     - **B1 - C2 Nâng cao**: Phỏng vấn, diễn thuyết & Báo chí/Khoa học (8 bài / 2 hàng × 4 cột).

3. **Thẻ Bài Học Studio Tương Thích Hoàn Hảo Mobile & Desktop**:
   - **Trên Mobile (`< 640px`)**: Bố cục danh sách ngang (`flex-row gap-3`) tinh gọn với ảnh Thumbnail chiếm đúng **47% chiều rộng card** (`w-[47%] aspect-[16/10]`), phần nội dung văn bản bên phải (`53%`) hiển thị tiêu đề `text-[13px]` 2 dòng kèm badge level, trạng thái đã học và thời lượng/số câu mà không chiếm dụng nhiều chiều cao màn hình.
   - **Trên Desktop (`>= 640px`)**: Bố cục thẻ dọc đa cột (`sm:flex-col`, `md:grid-cols-3`, `xl:grid-cols-4`) giữ nguyên 100% tỷ lệ ảnh chuẩn `w-full aspect-[16/10]`, padding `p-3` và khung Double-Bezel lồng nhau sang trọng.
   - **Thanh Điều Hướng Đáy Mobile (`BottomNav`)**: Tự động hiển thị đầy đủ trên giao diện duyệt bài (Listing Mode) của cả 3 trang Luyện Đọc, Luyện Nghe và Shadowing; tự động ẩn mượt mà thông qua Zustand Store `hideBottomNav` khi người học bấm chọn bài để bước vào phòng thu Studio tập trung cao độ.

4. **Interactive Dual-Pane Reading Studio (`/study/reading?id=...`)**:
   - **Cột Trái (60%)**: Văn bản đọc tương tác với tính năng tra cứu từ điển tức thì khi bấm vào từ bất kỳ (kèm IPA, phát âm, từ loại và nghĩa tiếng Việt), bản dịch toàn bài có thể ẩn/hiện, và giá từ vựng quan trọng (Vocabulary Shelf).
   - **Cột Phải (40%)**: Bộ câu hỏi trắc nghiệm tương tác với chấm điểm tức thì, giải thích chi tiết đáp án và phần thưởng +20 XP/câu.
   - **Tự động thu gọn Sidebar (`setSidebarCollapsed(true)`)** khi truy cập trực tiếp bằng URL `?id=...` hoặc chọn bài đọc.

5. **Single-Sentence Shadowing Focus Studio (`/study/shadowing?id=...`)**:
   - **Cột Trái (65%)**: `StudioWaveformCard` chuẩn âm thanh bản xứ với sóng âm 44-bar, tốc độ 0.75x-1.5x, tua 5s; Thanh tiện ích câu (`-A / +A`, Tự động tiếp, Ẩn dịch, Lưu câu, Báo cáo); Khung thu âm & Chấm điểm phát âm AI cao cấp (Nút Mic động, nhận diện giọng nói thời gian thực, bảng điểm AI 6 tiêu chí: Fluency, Pronunciation, Intonation, Completeness, WPM, Stress).
   - **Cột Phải (35%)**: `InteractiveTranscriptSidebar` hiển thị toàn bộ câu trong bài, trạng thái hoàn thành, vai nói Speaker A/B và nhảy câu tức thì.
   - **Màn hình Hoàn thành 1 khối (Unified 1-Block Screen)**: Chúc mừng hoàn thành bài +50 XP, xem lại toàn bộ transcript có nút nghe từng câu, nút Luyện lại và nút chuyển nhanh sang Bài tiếp theo.

---

## 🎙️ AI Voice Tutor Studio (`/ai/tutor`)

1. **Dashboard-Aligned Brand Top Header (`AppTopHeader`)**:
   - Header chuẩn `h-14` (56px) với viền đáy `border-b border-slate-200/90 dark:border-slate-800` chạy Edge-to-Edge.
   - Cụm Mode Switcher Pill đồng bộ Sidebar: `[ 🎙️ Luyện Nói AI ] [ ✨ Luyện Viết AI ]` (`/ai/tutor` & `/ai/conversation`) với chỉ báo Active Tab Xanh Hoàng Gia.
   - Hiển thị đồng hồ đếm thời lượng luyện tập `font-mono tabular-nums font-bold` và nút CTA *"Chấm điểm"* / *"Luyện Buổi Mới"*.

2. **Dashboard Bento Design System (Quy Chuẩn 60 - 30 - 10 & Nested Radius)**:
   - **Bảng Màu**: 60% Nền Canvas `bg-slate-50/60 dark:bg-slate-950` & Thẻ `bg-white dark:bg-slate-900`; 30% Xanh Hoàng Gia `#0059bb` (Nút Primary, Bong bóng chat User, Tab active); 10% Điểm nhấn (Amber thời lượng/hạng S, Emerald chấm điểm cao, Purple AI Coach).
   - **Hệ Thống Bo Góc Phân Tầng (Nested Radius)**: Khung Bento ngoài `rounded-xl`, khung con/ô nhập `rounded-lg`, badge/pill `rounded-md`, nút Micro tròn `rounded-full`.
   - **Viền & Bóng Đổ**: `border border-slate-200/90 dark:border-slate-800` kết hợp `shadow-md shadow-slate-200/50 dark:shadow-black/40`.

3. **Voice Chat Stream & 16-Band Acoustic Spectrum Dock (Cột Trái 8/12)**:
   - Bong bóng thoại AI cao cấp có khả năng tra từ tức thì 1-click (IPA, nghĩa tiếng Việt, phát âm) và bản dịch song ngữ.
   - Khung sửa lỗi ngữ pháp & diễn đạt tự nhiên (Grammar Correction & Natural Phrasing) tích hợp.
   - Nút Micro Toggle-to-Send: Bấm lần 1 để nói (nhận diện realtime), bấm lần 2 để dừng và tự động gửi.
   - Phổ sóng âm 16-band trực quan hiển thị nhịp điệu khi người dùng nói hoặc AI phản hồi.

4. **Persona Selector & Voice Controls (Cột Phải 4/12)**:
   - 3 Huấn luyện viên AI chuyên biệt (Emma - British IELTS Coach, Alex - American Business Coach, Chloe - Australian Friendly Tutor).
   - Segmented Speed Dock tùy chỉnh tốc độ nói (`0.75x`, `1.0x`, `1.25x`).
   - Kệ từ vựng theo ngữ cảnh (Vocabulary Shelf) hỗ trợ nghe phát âm và lưu vào sổ tay (+5 XP).

5. **In-Place Scorecard & Summary (Màn Hình Tổng Kết Điểm Số)**:
   - Thay thế trực quan luồng chat tại chỗ (không dùng popup modal che khuất).
   - Bảng điểm phản xạ 4 tiêu chí Double-Bezel (Thời gian nói, Lượt tương tác, Điểm phát âm, Chuẩn ngữ pháp).
   - Nhận xét chi tiết từ Huấn luyện viên AI và danh sách phân tích ngữ pháp tổng hợp.

---

## ✨ AI Writing & Conversation Studio (`/ai/conversation`)

1. **Dashboard-Aligned Brand Top Header (`AppTopHeader`)**:
   - Header chuẩn `h-14` (56px) Edge-to-Edge đồng bộ dải tab chuyển đổi: `[ 🎙️ Luyện Nói AI ] [ ✨ Luyện Viết AI (Active) ]` (`/ai/tutor` & `/ai/conversation`).
   - Tự động thu gọn trên Mobile (`[ ✨ Luyện Viết AI ] [ 🎙️ ]`) và mở rộng trên Desktop.
   - Đồng hồ đếm thời gian thực hành `font-mono tabular-nums font-bold` + Nút *"Chấm điểm"* / *"Luyện Buổi Mới"*.

2. **Dashboard Bento Design System (Quy Chuẩn 60 - 30 - 10 & Nested Radius)**:
   - **Bảng Màu**: 60% Nền Canvas `bg-slate-50/60 dark:bg-slate-950` & Thẻ `bg-white dark:bg-slate-900`; 30% Xanh Hoàng Gia `#0059bb`; 10% Điểm nhấn (Amber mục tiêu/mẫu câu, Emerald hoàn thành/sửa ngữ pháp).
   - **Hệ Thống Bo Góc Phân Tầng (Nested Radius)**: Thẻ Bento ngoài `rounded-xl`, khung con/ô nhập `rounded-lg`, badge/pill `rounded-md`. Loại bỏ 100% `rounded-xs` (2px).
   - **Viewport-Locked Studio Trên Desktop**: Khóa chiều cao `lg:h-screen lg:overflow-hidden`, loại bỏ cuộn trang ngoài, chat stream cuộn nội bộ tự động `flex-1 min-h-0 overflow-y-auto`.

3. **Writing & Voice Companion Studio (Cột Trái 8/12)**:
   - Header hiển thị chủ đề đang chọn kèm số lượng mục tiêu phản xạ đã hoàn tất.
   - Luồng hội thoại tương tác thông minh hỗ trợ tra từ điển 1-click `IPA_DICTIONARY` và bản dịch song ngữ.
   - Khung sửa lỗi ngữ pháp & diễn đạt tự nhiên (Grammar Correction & Natural Phrasing) tích hợp.
   - Dock nhập văn bản kết hợp Micro thu âm toggle và phổ sóng âm 16-band trực quan.

4. **Goals Checklist & Contextual Vocabulary Deck (Cột Phải 4/12)**:
   - **Mục Tiêu Giao Tiếp (Goals Checklist)**: Tự động đánh dấu hoàn thành theo thời gian thực khi người học sử dụng đúng từ khóa mục tiêu.
   - **Kệ Từ Vựng Ngữ Cảnh**: 3 từ vựng trọng tâm kèm phát âm loa 1-click, hiển thị đầy đủ không bị cắt chữ.
   - **Mẫu Câu Gợi Ý Phản Xạ**: 2 mẫu câu tự nhiên có thể bấm 1-click để gửi tin nhắn ngay lập tức.

5. **In-Place Scorecard & Summary (Báo Cáo Tổng Kết)**:
   - Bảng điểm 4 tiêu chí Double-Bezel: Mục tiêu hoàn thành (40%), Chuẩn ngữ pháp (30%), Độ tương tác (20%), Vốn từ vựng (10%).
   - Danh sách ghi chú lỗi ngữ pháp và mẹo giao tiếp chuyên sâu.

---

## 💡 Vocabulary Practice Studio (`/study/practice`)

1. **Master Top Header (`AppTopHeader`)**:
   - Header chuẩn `h-14` (56px) Edge-to-Edge với dải Tab chuyển đổi: `[ 💡 Luyện Từ Vựng (Active) ]` `[ 🎧 Dictation ]` `[ 🎙️ Shadowing ]` `[ 📖 Luyện Đọc ]`.
   - Tiến độ phiên học **25 câu hỏi ngẫu nhiên** (`Câu 1/25` đến `Câu 25/25`), Thưởng XP `+XX XP` và Đồng hồ đếm thời gian `MM:SS`.
   - **Tích Hợp Data Thật 100% (Live Backend API Database)**: Nạp trực tiếp 25 từ vựng ngẫu nhiên từ API `/api/vocabulary?limit=25&random=true` (kho 1.248+ từ vựng phân bổ theo 60 chủ đề), hỗ trợ bộ lọc `?themeId=...` và `?level=...`.

2. **Dashboard Bento Design System (Quy Chuẩn 60 - 30 - 10 & Nested Radius)**:
   - **Bảng Màu**: 60% Nền Canvas `bg-slate-50/60 dark:bg-slate-950` & Thẻ `bg-white dark:bg-slate-900`; 30% Xanh Hoàng Gia `#0059bb`; 10% Điểm nhấn (Amber XP, Emerald câu đúng).
   - **Hệ Thống Bo Góc Phân Tầng (Nested Radius)**: Thẻ Bento ngoài `rounded-2xl`, khung câu hỏi/ô trắc nghiệm `rounded-xl`, badge/pill `rounded-md`. Loại bỏ 100% `rounded-xs` (2px).
   - **Đồng Hồ Đếm Ngược 30s/Câu**: Tự động chuyển màu cảnh báo **Slate (30s - 7s) ➔ Vàng Amber (6s - 4s) ➔ Đỏ Rose nhấp nháy (≤ 3s)**.

3. **4-in-1 Sub-Mode Practice Arena (Cột Trái 8/12)**:
   - **Quiz Arena**: Trắc nghiệm 4 đáp án 2x2 phản xạ nhanh, hỗ trợ phím tắt số `1` `2` `3` `4` hoặc `A` `B` `C` `D` và phím `Enter` sang câu kế.
   - **Flashcard Arena**: Khối trung tâm lật 3D độc lập (`[transform-style:preserve-3d]`), loại bỏ `italic`, phím nhanh `[ Space: Lật ]` và 3 nút đánh giá độ nhớ SRS (`[ 1: Chưa nhớ ]` +5XP, `[ 2: Nhớ tốt ]` +10XP, `[ 3: Rất dễ ]` +15XP).
   - **Writing Arena**: Gõ chính xác từ vựng tiếng Anh kèm autofocus tự động, nút gợi ý chữ cái đầu `💡 Gợi ý (-7 XP)` và phím `Enter` nộp bài kiểm tra.
   - **Speaking Arena**: Thu âm giọng đọc qua Micro & Web Speech STT, phím tắt `Space` bắt đầu nói, chấm điểm tương đồng phát âm theo % và thưởng +15 XP.

4. **Word Lab & Context Insights (Cột Phải 4/12)**:
   - Thẻ thông tin từ vựng chuyên sâu (IPA, từ loại, cấp độ CEFR, loa phát âm bản xứ).
   - Ví dụ câu ngữ cảnh thực tế (Contextual Examples) có loa phát âm từng câu.
   - Nút Bookmark lưu vào Sổ tay từ vựng (+5 XP).

5. **In-Place Scorecard & Summary (Báo Cáo Tổng Kết)**:
   - Thẻ chúc mừng hoàn thành buổi học + Tổng XP thưởng + Tỷ lệ ghi nhớ % + Thời gian học.
   - Nút Luyện lại, Chuyển sang Luyện nghe Dictation và Về Bảng điều khiển.

6. **Skeleton Loading Khớp 1:1 (`app/(dashboard)/study/practice/loading.tsx`)**:
   - Đảm bảo Zero Cumulative Layout Shift (Zero CLS) khi tải trang.

---

## 🌐 Production Deployment Status

- **Live Production App URL (Vercel)**: [https://xpenglishvoca.vercel.app](https://xpenglishvoca.vercel.app)
- **Status**: **100% Build SUCCESS** (90/90 static & dynamic routes compiled)










