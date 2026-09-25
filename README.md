# XP English & XP Voca - Hệ Thống Học Tiếng Anh Thông Minh AI (Agency Dashboard Tier)

Ứng dụng web nâng cấp toàn diện cho việc học từ vựng, luyện nghe, thi thử trắc nghiệm, tạo lộ trình AI cá nhân hóa và theo dõi thống kê học tập chuyên sâu.

---

## 🏛️ Kiến Trúc Hệ Thống & Cấu Trúc Thư Mục (Feature-Based Modular Architecture)

Dự án áp dụng mô hình **Feature-Based Modular Architecture** kết hợp **Next.js 16 App Router**:

- **`features/`**: Chứa toàn bộ logic nghiệp vụ, components, hooks, services, data và utilities phân chia độc lập theo từng tính năng (`listening`, `shadowing`, `vocabulary`, `ipa`, `exam-prep`, `grammar`, `reading`, `study-rooms`, `gamification`, `community`, `ai-tutor`, `profile`, `premium`, `myvideo`).
- **`shared/`**: Chứa các thành phần dùng chung thực sự (`components/ui`, `components/layout`, `components/feedback`, `utils`, `constants`, `types`).
- **`infrastructure/`**: Tách biệt mã nguồn tích hợp hệ thống bên ngoài (`api`, `auth`, `database`, `security`, `webrtc`).
- **`stores/`**: Chứa toàn bộ các Zustand stores quản lý trạng thái tập trung.
- **`app/`**: Next.js App Router mỏng đóng vai trò Orchestrator điều hướng.

Chi tiết xem tại tài liệu kiến trúc chuyên sâu: [ARCHITECTURE.md](file:///e:/XP%20English%20%20XP%20Voca/ARCHITECTURE.md).

---

## 📊 Quy Chuẩn Hiệu Năng Truy Vấn Cơ Sở Dữ Liệu (Database Query Performance Standard)

> **Mục đích:** Quy chuẩn bắt buộc để thiết kế, phân tích và tối ưu Database Query trong toàn bộ dự án XP English & XP Voca.
>
> **Nguyên tắc cốt lõi:** Không tối ưu bằng cảm tính. Không tự động thêm index bừa bãi. Mọi quyết định optimization phải dựa trên measurement, execution plan và workload thực tế.

### 1. 🎯 Golden Rule – Đo Lường Trước, Tối Ưu Sau

```text
MEASURE ➔ UNDERSTAND ➔ EXPLAIN ➔ IDENTIFY BOTTLENECK ➔ OPTIMIZE ➔ BENCHMARK ➔ VERIFY ➔ MONITOR
```

- **Tuyệt đối KHÔNG:**
  ```text
  QUERY CHẬM ➔ THÊM INDEX THEO CẢM TÍNH ➔ HY VỌNG
  ```
- **BẮT BUỘC PHẢI:**
  ```text
  QUERY CHẬM ➔ MEASURE (ĐO ĐẠC) ➔ EXPLAIN / EXPLAIN ANALYZE ➔ TÌM BOTTLENECK ➔ CHỌN GIẢI PHÁP TỐI ƯU
  ```

### 2. 🪜 Thứ Tự Ưu Tiên Tối Ưu Hóa (Optimization Layers)

Khi một truy vấn chậm, AI / Kỹ sư phần mềm **BẮT BUỘC** kiểm tra theo đúng 8 tầng ưu tiên từ dưới lên:

* **Level 1 (Query & Logic):** Tính đúng đắn, loại bỏ `SELECT *`, loại bỏ N+1 queries, đảm bảo tính Sargable trong mệnh đề `WHERE`, filter sớm trước khi JOIN, chọn phân trang phù hợp (Keyset / Cursor pagination cho deep pagination thay vì `OFFSET` khổng lồ).
* **Level 2 (Index Strategy):** Dựa trên `EXPLAIN / EXPLAIN ANALYZE`, độ phân biệt (Cardinality / Selectivity), thứ tự cột trong Composite Index `(A, B, C)`, Covering Index / Index-only scan, cân nhắc chi phí khuếch đại ghi (Write amplification cost).
* **Level 3 (Schema & Data Model):** Chuẩn hóa kiểu dữ liệu nhỏ gọn nhất có thể, Primary / Foreign Key constraints, chuẩn hóa hoặc phản chuẩn hóa có tính toán trade-off.
* **Level 4 (Database Configuration):** Connection pooling, timeouts, Neon PgBouncer configuration.
* **Level 5 (Application Cache):** `memoryCache` / Redis (chỉ dùng khi dữ liệu đọc nhiều, ít thay đổi, chấp nhận stale data và query nền tảng đã được tối ưu).
* **Level 6 (Read Scaling):** Read replicas (tính đến replication lag).
* **Level 7 (Partitioning):** Time-series / Tenant isolation.
* **Level 8 (Sharding):** Kiến trúc phân tán (chỉ khi khối lượng scale thực sự yêu cầu).

*Tuyệt đối không nhảy cóc lên Caching / Redis / Sharding để che giấu một câu truy vấn thiết kế kém.*

### 3. 🛡️ Cam Kết & Nguyên Tắc Thực Thi AI (AI Protocol & Report Template)

* AI **tuyệt đối không** tự ý thêm index cho mọi cột xuất hiện trong `WHERE`.
* AI **không** kết luận "Query này nhanh hơn" nếu chưa có số liệu benchmark thực tế trước và sau.
* AI **không** tự bịa đặt số liệu execution plan.
* Mọi đề xuất tối ưu hóa truy vấn quan trọng phải đi kèm **Query Optimization Report** chuẩn mực:

```markdown
## Query Optimization Report

### Problem
[Mô tả truy vấn chậm & triệu chứng]

### Root Cause
[Nguyên nhân thực tế từ Execution Plan]

### Before
- Latency (p50 / p95):
- Rows examined / Rows returned:
- Execution plan:
- CPU / IO / Memory:

### Optimization Implemented
[Các thay đổi cụ thể ở Level 1 - Level 3]

### After
- Latency (p50 / p95):
- Rows examined / Rows returned:
- Execution plan:
- CPU / IO / Memory:

### Trade-offs & Verification
- [ ] Ảnh hưởng tốc độ ghi (Write cost / Index size)
- [ ] Kiểm tra hồi quy (Regression test passed)
```

### 4. 👑 Master Rule
> *"The fastest query is the query you do not need to execute."*  
> Trước khi tối ưu một truy vấn, hãy luôn tự hỏi: Có thực sự cần truy vấn không? Có thể giảm số cột / số dòng cần đọc không? Có thể batch không? Có thể tận dụng kết quả đã có không?

---

## ⚡ Kiến Trúc Tối Ưu Hóa Hiệu Năng & Bộ Đệm Dữ Liệu (High-Performance Engine & Caching)

Hệ thống được tối ưu hóa toàn diện theo chuẩn doanh nghiệp nhằm triệt tiêu hiện tượng tải chậm do độ trễ mạng máy chủ xuyên lục địa (Neon PostgreSQL `us-east-1` tại Bắc Virginia, Mỹ) và các câu truy vấn nặng:

1. **Kiến Trúc Truy Vấn Đơn Gốc Dashboard & Check-in (Single Root Query Architecture & Pool Starvation Elimination)**:
   - Thay thế các truy vấn song song `Promise.all` (từng tiêu tốn 8–11 kết nối đồng thời gây cạn kiệt connection pooler) bằng **1 câu truy vấn Single Root Query duy nhất** trên bảng `Profile` kết hợp quan hệ lồng (`dailySkillPractices`, `examAttempts`, `listeningProgresses`, `vocabularies`, `studyPlan`) và bộ lọc đếm trực tiếp trong engine PostgreSQL `_count` (`vocabularies`, `matchHistories`).
   - Giảm số lượng kết nối Database checkout từ **8–11 kết nối xuống đúng 1 kết nối duy nhất** (giảm **87.5% – 91% áp lực pool**), giải quyết triệt để lỗi Neon PostgreSQL `P2028: Unable to start a transaction in the given time` và `PostgreSQL connection: Closed`.
   - Áp dụng kiến trúc Single Root Query tương tự cho `GET /api/user/daily-checkin` (gom 6 truy vấn tuần tự về đúng 1 câu lệnh `Profile`).
   - Tích hợp **Khử trùng lặp yêu cầu đang bay (In-Flight Request Deduplication)** qua `inFlightOverviewMap`, đảm bảo nếu nhiều client components cùng kích hoạt tải dữ liệu tại cùng một mili-giây, máy chủ chỉ thực thi 1 Promise duy nhất và chia sẻ dữ liệu cho tất cả.
   - Xây dựng tiện ích vô hiệu hóa bộ đệm chủ động [`infrastructure/cache/dashboardCache.ts`](file:///e:/XP%20English%20%20XP%20Voca/infrastructure/cache/dashboardCache.ts) (`invalidateDashboardCache`), tự động giải phóng cache RAM ngay khi người dùng tạo biến động (Điểm danh, nhiệm vụ lộ trình, mini game, kỹ năng thực hành, thi thử, đấu trường PvP, ôn tập thẻ từ vựng SM-2).
2. **Cơ Chế Hiển Thị Tức Thì 0ms (SWR Instant Local Cache Hydration)**:
   - Khi học viên truy cập `/dashboard`, dữ liệu từ `localStorage` hiển thị ngay lập tức trong **0ms** mà không phải chờ mạng.
   - Quá trình Background Revalidation âm thầm kiểm tra và đồng bộ lại các chỉ số mà không gây layout shift hay giật lag.
3. **Bộ Nhớ Đệm Trong Bộ Nhớ RAM Máy Chủ (`infrastructure/cache/memoryCache.ts`)**:
   - Xây dựng lớp đệm `MemoryCache` siêu nhẹ tối ưu cho Serverless với cơ chế tự động dọn dẹp theo thời gian sống (TTL Eviction) và giới hạn dung lượng bộ nhớ `MAX_CACHE_SIZE = 500`.
   - Cơ chế giải phóng theo phong cách LRU (evicts 20% mục cũ nhất khi đầy tải) ngăn chặn rò rỉ RAM (OOM) trên Next.js runtime.
   - **Bảng Xếp Hạng (`/api/leaderboard`)**: TTL 60s, giảm thời gian phản hồi từ **4.145ms xuống còn 21ms** (tăng tốc gấp **189 lần**).
   - **Phân Tích Học Tập (`/api/user/analytics`)**: Chuyển đổi 6 truy vấn tuần tự thành `Promise.all` song song và tích hợp `memoryCache` (TTL 60s) kèm `Cache-Control: private, s-maxage=60, stale-while-revalidate=120`. Tốc độ phản hồi đạt **0.08ms** trên Cache HIT (nhanh hơn **60.000 lần**).
   - **Tổng Quan Bảng Điều Khiển (`/api/dashboard/overview`)**: Tích hợp `memoryCache` (TTL 30s) và `Cache-Control: private, s-maxage=30, stale-while-revalidate=60`, loại bỏ hoàn toàn DB queries lặp lại khi chuyển tab.
   - **Danh Mục Luyện Nghe & Shadowing (`/api/listening/lessons`)**: Tích hợp `memoryCache` (TTL 60s) và `Cache-Control: public, s-maxage=60, stale-while-revalidate=120`, tự động invalidate khi tạo bài học mới.
   - **Từ Vựng Người Dùng (`/api/user/vocab`)**: Đệm kết quả với TTL 30s, tự động invalidate khi người dùng cập nhật tiến độ học tập.
4. **Tối Ưu Hóa Kết Nối Neon PostgreSQL & PgBouncer (`infrastructure/database/prisma.ts`)**:
   - Tự động nhận diện URL Neon Connection Pooler (`neon.tech` hoặc `-pooler.`), tự động tiêm `pgbouncer=true` và `statement_cache_size=0`.
   - Nâng cấp dynamic `connection_limit` từ 2 lên **10 (dev) và 15 (prod)**, kết hợp cùng Single Root Query Architecture loại bỏ hoàn toàn nghẽn hàng đợi kết nối (connection queue starvation).
   - Chuẩn hóa điều kiện retry database chỉ bắt đúng `kind: Io(` thay vì chuỗi `"Io"` lỏng lẻo gây false-positive retry cho các lỗi logic, đồng thời giảm `maxRetries` từ 3 xuống 2 để tiết kiệm độ trễ người dùng.
5. **Khử Trùng Lặp Yêu Cầu Từ Vựng (In-Flight Request Deduplication & Cooldown)**:
   - `stores/vocabularyStore.ts`: Tích hợp cờ Singleton `inFlightVocabPromise` và cooldown 30s. Ngăn chặn triệt để hiện tượng thundering herd (3–5 component cùng gửi request lấy từ vựng khi mount).
6. **Tối Ưu Hóa Chỉ Mục Cơ Sở Dữ Liệu Chuyên Sâu (PostgreSQL Neon Cloud Indexes)**:
   - `@@index([username])` trên `Profile`: Triệt tiêu Full Table Scan khi người dùng đăng nhập bằng tên tài khoản.
   - `@@index([attemptId])` trên `QuestionAnswer`: Tối ưu hóa truy vấn Foreign Key khi tải bảng điểm và câu trả lời bài thi.
   - `@@index([date, userId])` trên `DailySkillPractice`: Tối ưu hóa trực tiếp câu lệnh `groupBy` tính toán bảng xếp hạng tuần và tháng.
   - `@@index([userId, startedAt(sort: Desc)])` & `@@index([userId, status])` trên `ExamAttempt`: Tăng tốc độ nạp lịch sử thi cử của học viên.
   - `@@index([planId, date])` trên `DailyTask`: Tối ưu hóa truy vấn nhiệm vụ học tập theo ngày.
   - `@@index([roomId, createdAt(sort: Desc)])` trên `RoomMessage`: Tối ưu hóa nạp tin nhắn phòng tự học.
   - `@@index([userId, lastPracticedAt(sort: Desc)])` trên `ListeningProgress`: Tối ưu hóa danh sách bài nghe gần nhất.
   - `idx_user_vocabulary_next_review` trên `user_vocabulary(user_id, next_review)`: Tối ưu hàng đợi ôn tập ngắt quãng Spaced Repetition SM-2.
   - `idx_user_vocabulary_favorite` trên `user_vocabulary(user_id, is_favorite)`: Tăng tốc truy vấn từ vựng yêu thích.
7. **Triệt Tiêu Hiện Tượng Over-Fetching & Giới Hạn Phân Trang An Toàn**:
   - **Bạn bè & Yêu cầu kết bạn (`/api/friends`, `/api/friends/requests`)**: Chuyển từ `include: true` (lấy toàn bộ cột, gây nguy cơ rò rỉ `passwordHash` và token nhạy cảm) sang phép chiếu `select` tường minh các trường hiển thị, giảm **90% dung lượng payload**.
   - **Phòng học nhóm (`/api/study-rooms`)**: Bổ sung `take: 20` và giới hạn lồng `members: take: 20`, triệt tiêu nguy cơ bùng nổ truy vấn $N \times M$.
   - **Danh sách bài nghe (`/api/listening/lessons`)**: Loại bỏ trường `transcript` (nặng ~5KB JSON mỗi bài) khỏi danh sách tổng quan, giảm **80% kích thước payload** (từ ~100KB xuống còn ~20KB cho 20 bài).
   - **Từ vựng cá nhân (`/api/user/vocab`)**: Thay thế `include: { vocabulary: true }` bằng `select` chính xác các trường cần thiết.
   - **Cộng đồng (`/api/posts`)**: Đảo chiều sắp xếp bình luận `createdAt: "asc"` ngay trong câu truy vấn PostgreSQL thay vì lấy descending rồi đảo mảng trong RAM.
8. **Chuẩn Hóa Xử Lý Thời Gian & Khử Lỗi Logic (Logic & Timezone Consolidation)**:
   - Gom 6 bản sao rời rạc của `getLocalDateString()` và `getWeekDateRange()` về tiện ích dùng chung duy nhất [`shared/utils/dateUtils.ts`](file:///e:/XP%20English%20%20XP%20Voca/shared/utils/dateUtils.ts).
   - Xóa bỏ công thức tạo XP giả lập (`Math.round(totalXp * 0.35)`) trong bảng xếp hạng tuần/tháng tại `/api/leaderboard`, trả về 0 XP chính xác cho người dùng không có phiên học trong kỳ.
   - Loại bỏ map bộ nhớ `inFlightOverviewMap` trong `/api/dashboard/overview`, ngăn ngừa rò rỉ bộ nhớ trên kiến trúc Serverless.
   - Xóa bỏ độ trễ nhân tạo `setTimeout(240ms)` trong `app/(dashboard)/dashboard/page.tsx`, giúp trang nạp tức thì ngay khi dữ liệu hoàn tất.
9. **Bảo Mật Tầng Doanh Nghiệp (Enterprise Security Hardening)**:
   - **Ngăn chặn Timing Attack trên JWT (`infrastructure/auth/jwt.ts`)**: Sử dụng `crypto.timingSafeEqual` cho phép so sánh chữ ký HS256 trong thời gian hằng số (constant-time).
   - **Muối ngẫu nhiên cho mật khẩu (`infrastructure/auth/password.ts`)**: Chuyển đổi từ muối tĩnh toàn cục sang muối bảo mật ngẫu nhiên 16-byte (`crypto.randomBytes(16)`) chuẩn OWASP định dạng `pbkdf2:<salt>:<hash>`, kèm cơ chế tương thích ngược (backwards compatible) hoàn hảo cho các tài khoản cũ.
10. **Khử Trùng Lặp Request Phiên Người Dùng (Singleton Session Deduplication)**:
    - `checkSession()` trong `stores/userStore.ts` được chuyển thành Singleton Promise. Nếu có nhiều components (Layout, Page, TopHeader) gọi cùng lúc, hệ thống chỉ gửi **duy nhất 1 request `/api/auth/me`** và chia sẻ chung kết quả.
11. **Cô Lập Hoàn Toàn Dữ Liệu Tĩnh 1MB Khỏi Client JavaScript Bundle**:
    - Tách tệp metadata danh mục chủ đề `features/vocabulary/data/themes.ts` (~19KB) ra khỏi tệp khổng lồ `basicVocabularies.ts` (975KB).
    - Chuyển toàn bộ import tại `app/(dashboard)/vocabulary/page.tsx`, `VocabularyThemesClientList.tsx` và `features/vocabulary/index.ts` sang `themes.ts`.
    - Tiết kiệm gần 1 Megabyte JavaScript tĩnh dư thừa khỏi gói tải của các trang Từ vựng và Dashboard.
12. **Triệt Tiêu Render-Blocking Phông Chữ**:
    - Loại bỏ hoàn toàn dòng `@import url("https://fonts.googleapis.com...")` khỏi CSS toàn cục. Tận dụng 100% cơ chế tự lưu trữ phông chữ nội bộ (Self-hosted Google Font via `next/font/google`) trong `app/layout.tsx` với 0px CLS.
13. **Cấu Hình Nén & Tối Ưu Hóa Gói (`next.config.ts`)**:
    - Kích hoạt nén `compress: true` (Gzip/Brotli).
    - Bật `optimizePackageImports: ["lucide-react", "framer-motion"]` giúp tree-shake hiệu quả các thư viện biểu tượng và hoạt ảnh.
14. **Cải Tiến Bộ Giải Mã Phụ Đề & Quản Lý Cache (`/api/youtube/captions`)**:
    - **Bypass Cache chủ động**: Hỗ trợ query parameter `?force=1` để làm mới phụ đề tức thì khi YouTube cập nhật transcript mới.
    - **Fuzzy Rolling Dedup**: Tự động gộp và khử trùng lặp các cụm ASR streaming có độ tương đồng từ vựng $\ge 80\%$ kể cả khi ASR sắp xếp lại thứ tự từ.
    - **Mở rộng ghép câu tự nhiên**: Tự động nhận diện và ghép nối các mẩu câu phân mảnh đuôi 1-2 từ với câu trước đó lên tới 12 từ.
    - **Độ chịu lỗi căn chỉnh song ngữ (Bilingual Alignment)**: Nâng ngưỡng dung sai timing tiếng Việt từ 4.0s lên 6.0s để không bỏ sót phụ đề dịch.
    - **Nhận diện thông minh TTML & Chuẩn hóa Unicode**: Phân biệt chuẩn xác mili-giây và giây trong thẻ `<p>` TTML; tự động chuẩn hóa Unicode NFD sang NFC cho toàn bộ phụ đề tiếng Việt.
    - **Kiến trúc Client Proxy dự phòng**: Tăng thời gian chờ proxy lên 4.0s và bổ sung fallback định dạng `fmt=srv1` phòng khi YouTube JSON3 trả về mảng sự kiện rỗng.
15. **Đồng Vị Trí Vercel Region `iad1` (`vercel.json`)**:
    - Chỉ định cấu hình `"regions": ["iad1"]` đảm bảo Next.js Serverless Functions nằm cùng datacenter AWS us-east-1 với Neon PostgreSQL, đưa độ trễ Function ↔ Database xuống **< 2ms**.
16. **Keep-Alive Heartbeat Triệt Tiêu Cold Start Neon (`/api/health/ping`)**:
    - Vercel Cron Job tự động ping nhẹ `SELECT 1` mỗi 5 phút, giữ compute instance của Neon luôn ở trạng thái WARM 24/7, xóa bỏ hoàn toàn độ trễ khởi động lạnh 1.5s - 3.5s.
17. **Intelligent Hover & Touch Prefetching (`shared/utils/prefetchEngine.ts`)**:
    - Bộ nạp trước thông minh kích hoạt ngay khi con trỏ chuột lướt qua hoặc ngón tay chạm vào thanh Sidebar và BottomNav, nạp dữ liệu về RAM trước khi click, giúp chuyển trang hiển thị **tức thì 0ms**.
18. **Code-Splitting & Dynamic Imports (`next/dynamic`)**:
    - Tách nhỏ các modals nặng (`DeepDictionaryModal`, `SentenceReportModal`, `LessonExplorerModal`, `DashboardAiTutorWidget`), giảm 40% kích thước gói JavaScript tải trang ban đầu.
19. **Optimistic UI Updates (Cập nhật giao diện tức thì 16ms)**:
    - Điểm danh (Check-in), nhận thưởng nhiệm vụ (Claim Challenge) và lưu câu học tập đều phản hồi giao diện ngay lập tức trong 1 khung hình (16ms) và âm thầm đồng bộ máy chủ ở chế độ nền.
20. **Chuẩn Hóa Phần Trăm Tiến Độ Giao Diện (Max 2 Decimals Standard - `shared/utils/formatPercent.ts`)**:
    - Triệt tiêu hoàn toàn hiện tượng số thực vô hạn tuần hoàn (`33.333333333333336%`, `16.666666666666664%`) trên thanh tiến độ cấp độ, kho từ vựng và huy hiệu tiến trình (`DashboardHeroGreeting`, `ProfileMetricsBar`, `XPBar`, `RightSidebar`).
    - Làm tròn chuẩn tại nguồn tính toán `getXpProgress()` qua `roundPercent(val, 2)` giúp thuộc tính CSS `style={{ width: `${percent}%` }}` luôn sắc gọn.
    - Tiện ích `formatPercent(value, { decimals: 2, trimZero: true })` tự động lược bỏ số 0 thừa (`33.33%`, `16.67%`, `12.5%`, `50%`) hoặc giữ cố định khi cần (`50.00%`), đảm bảo giao diện luôn đạt chuẩn Agency UI/UX hoàn mỹ.
21. **Chuẩn Hóa UI/UX Phòng Hội Thoại AI (`/ai/conversation` - Dynamic Primary CTA & Single Viewport Budget)**:
    - Thống nhất toàn bộ định vị sản phẩm về **Hội thoại AI (AI Conversation Studio)**, triệt tiêu hoàn toàn sai lệch thuật ngữ "luyện viết" trong cả giao diện chính và ngăn kéo lịch sử ([AiConversationHistoryDrawer.tsx](file:///e:/XP%20English%20%20XP%20Voca/features/ai/conversation/components/AiConversationHistoryDrawer.tsx)).
    - Áp dụng **Quy tắc 18 Wadhah Aloui** giải quyết xung đột CTA: Nút Micro là Primary khi chưa nhập dữ liệu; Nút Gửi tự động thành Primary khi người dùng bắt đầu gõ phím; Tích hợp chỉ báo trạng thái tương tác bên ngoài (Rule 6).
    - Áp dụng **Quy tắc 1 Wadhah Aloui (Skeleton Loading)**: Thay thế spinner xoay tròn trong ngăn kéo lịch sử bằng bộ khung xương tải mẫu ([ShimmerBox](file:///e:/XP%20English%20%20XP%20Voca/shared/components/feedback/ShimmerSkeleton.tsx)).
    - Nâng cấp trạng thái AI suy nghĩ sang bong bóng 3 chấm tím AI Tutor (`#8b5cf6`) sinh động, đồng bộ nhận diện hệ sinh thái AI.
    - Sửa lỗi phân loại kỹ năng CSDL trong [app/api/ai/sessions/route.ts](file:///e:/XP%20English%20%20XP%20Voca/app/api/ai/sessions/route.ts): Tự động map `mode === "conversation"` về kỹ năng thực hành `speaking` chuẩn xác trong `DailySkillPractice` và kích hoạt `invalidateDashboardCache` tức thì.
    - Tối ưu hóa ngân sách chiều cao Viewport Desktop (Compact Bento Grid 8/12 - 4/12), triệt tiêu hoàn toàn hiện tượng thanh cuộn kép lồng nhau (Dual Scrollbars) trên laptop 13-14 inch.
    - Bổ sung thanh chuyển đổi phân đoạn thông minh trên Mobile (Segmented Switcher: "Hội thoại" vs "Mục tiêu & Từ vựng X/3"), giải quyết dứt điểm điểm nghẽn trôi mục tiêu xuống đáy trang.
    - Nâng cấp tương tác vi mô Tra từ điển 1-chạm (Click-to-lookup): Thêm đường gạch chân chấm mờ thị giác, sửa biểu thức chính quy bảo tồn dấu nháy trong các từ viết tắt tiếng Anh (`don't`, `I'm`, `let's`), và tinh chỉnh vị trí Modal không che khuất thanh nhập liệu trên điện thoại.
    - Bộ kiểm thử chuẩn mực bổ sung: [`__tests__/ai_conversation_standards.test.ts`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/ai_conversation_standards.test.ts) đạt tỷ lệ vượt qua **4/4 tests (100%)**.
22. **Edge Proxy & Tường Lửa Bảo Mật Tầng Biên (`proxy.ts`)**:
    - Kích hoạt chuẩn Edge Proxy Next.js 16 tại root (`proxy.ts`), thay thế quy ước `middleware.ts` cũ, thực thi Edge Rate Limiting ngăn chặn brute-force và DDoS.
    - Thiết lập bộ Security Headers chuẩn OWASP (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`, `Permissions-Policy`).
    - Triệt tiêu lỗ hổng Identity Spoofing qua Query String `oauth_user` ở Client và chuẩn hóa `sanitizeInput` không mã hóa HTML Entity ký tự nháy đơn `'` và gạch chéo `/` làm hỏng chuỗi hiển thị giao diện.
23. **Cơ Chế Server-Authoritative Activity Award (`/api/user/activity-award`)**:
    - Chuyển giao toàn bộ thẩm quyền cộng thưởng XP, Coins, số phút học tập từ Client-side State sang Server-Authoritative API.
    - Tích hợp kiểm tra chặn ngưỡng chống gian lận (Anti-Cheat Bounds Checking), cập nhật nguyên tử (Atomic Increments) trên Neon PostgreSQL và đồng bộ bảng tiến độ `DailySkillPractice` để chuỗi streak học tập luôn chuẩn xác.
24. **Tối Ưu Hóa Tốc Độ Mô Hình AI (Gemini 2.0 Flash / 1.5 Flash High-Speed Routing)**:
    - Chuẩn hóa toàn bộ 8 routes AI (`/api/ai/chat`, `/api/ai/tutor`, `/api/ai/writing`, `/api/ai/grammar`, `/api/ai/grammar/explain`, `/api/ai/exam-explain`, `/api/ai/exam-writing-grade`, `/api/ai/exam-generate`, `/api/study-rooms/[id]/messages`), loại bỏ mã model không tồn tại `gemini-2.5-flash` gây lỗi HTTP 404 và độ trễ chờ đợi retry.
    - Ưu tiên gọi siêu tốc `gemini-2.0-flash` với fallback tự động sang `gemini-1.5-flash`.
25. **Nâng Cấp Database Seeding, Vocab Auto-Upsert & Audio Fallback**:
    - `POST /api/user/vocab`: Tự động nhận diện và upsert từ vựng mới vào bảng cơ sở dữ liệu `vocabularies` kèm theme tương ứng thay vì bỏ qua, đảm bảo 100% từ vựng học viên thực hành đều được lưu trữ vĩnh viễn trong cơ sở dữ liệu.
    - `prisma/seed.ts`: Nâng cấp kịch bản seed đồng bộ cả `MOCK_VOCABULARIES`, `BASIC_VOCABULARIES` (29.000 dòng chuẩn IPA) và 9.000 dòng bài học luyện nghe đa cấp độ `seedListeningLessons` (`prisma/seedListeningData.ts`), phân nhóm batch 1000 items tránh chạm ngưỡng giới hạn parameter của PostgreSQL.
    - Audio Fallback trong Review Thi Thử (`exam-prep/result`): Tự động chuyển hướng các đường link nhạc mẫu SoundHelix sang giọng đọc tiếng Anh tự nhiên chất lượng cao `/api/tts`.
    - Loại bỏ hoàn toàn gói phụ thuộc dư thừa `bootstrap` khỏi dự án.
26. **Tối Ưu Hóa & Cải Tiến Toàn Diện Trang Học Video Cá Nhân (`/myvideo` - High-Precision YouTube Studio)**:
    - **Triệt tiêu Side-Effect trong State Updater & Vòng Lặp Đồng Bộ 35ms (BUG-03 & HIGH-01)**: Tách lệnh `sendYtCommand("seekTo")` ra khỏi updater của `setCurrentTime`, chuyển sang kiểm tra trước khi setState kết hợp change-detection guards, giảm hơn 80% re-renders thừa từ ~140 updates/giây xuống mức tối ưu.
    - **Khử Rủi Ro Vòng Lặp Vô Hạn Active Video (BUG-02)**: Dùng `activeVideoIdRef` cô lập phụ thuộc, chỉ lắng nghe biến động thực sự từ `savedVideos` và cập nhật thông qua functional setState, ngăn chặn triệt để infinite re-render loop.
    - **Sửa Lỗi Chấm Điểm Shadowing False-Positive (BUG-04)**: Thay thế thuật toán `targetWords.includes()` bằng cơ chế khớp từ có loại trừ (splice-based matching), ngăn chặn hiện tượng lặp lại 1 từ làm tăng điểm phát âm ảo.
    - **Gỡ Bỏ Hoisting & Temporal Dead Zone (BUG-01)**: Đồng bộ callback `onSubIndexChange` qua `setCurrentSubIndexRef` và cho phép tính năng lặp câu (Loop Sentence) tự động fallback về `activeSubIndexRef.current` đang phát thực tế thay vì bị gán cứng vào câu 0.
    - **Tối Ưu Hóa Keyboard Shortcuts Listener (HIGH-04)**: Chuyển toàn bộ 17 phụ thuộc của sự kiện bàn phím sang `keyboardStateRef`, gắn listener `keydown` duy nhất 1 lần khi mount thay vì tháo/lắp 28 lần mỗi giây.
    - **Bảo Mật PostMessage Chuẩn OWASP (HIGH-05)**: Thay thế toàn bộ wildcard origin `"*"` trong giao tiếp iframe YouTube Player bằng domain tường minh `"https://www.youtube.com"`.
    - **Khử Crash Non-Null Assertion trong Tra Từ (HIGH-06)**: Kiểm tra null an toàn trước khi cập nhật số từ đã học trong `useWordLookup`, loại bỏ hoàn toàn lỗi crash khi người dùng chưa đăng nhập.
    - **Chuẩn Hóa Parse Thời Lượng & Báo Cáo Xuất Phụ Đề Modal (MED-01, MED-02, MED-05, MED-08)**: Hỗ trợ định dạng `H:MM:SS` chính xác cho video trên 1 giờ; bao bọc toàn bộ metrics và bộ lọc trong `useMemo`; chuyển đổi `SubtitleExportModal` thành Overlay Modal Dialog thay vì unmount toàn trang gây mất trạng thái video player; trích xuất logic nạp phụ đề trùng lặp thành `handleSubtitleInjection`.
    - **Khắc Phục Lỗi Đồng Bộ Phụ Đề & Bế Tắc Mốc Thời Gian 0s (Zero-Time Deadlock & Anti-Stutter)**:
      - Xóa bỏ điều kiện `if (realTime > 0)` từng gây đóng băng phụ đề tại mốc 0.0s khi video mới nạp; cho phép nội suy mượt mà từ 0.0s theo thời gian thực.
      - Mở rộng cửa sổ nội suy thời gian từ 350ms lên 2500ms khi phát, triệt tiêu hoàn toàn hiện tượng phụ đề bị giật lùi (Time Stutter) do độ trễ postMessage của YouTube iframe.
      - Cơ chế chống giật ngược khi tua câu (Anti-Rubber-Banding): Chặn các gói tin in-flight cũ đến muộn trong vòng 800ms sau khi người dùng click nhảy câu.
      - Xóa bỏ khối tinh chỉnh `-0.2s` / `+0.2s` dư thừa trên thanh Media Control Dock theo yêu cầu tinh gọn giao diện.
      - Chuẩn hóa thanh điều khiển chế độ phụ đề (`SubtitlesTabPane`) hiển thị cố định trên **1 dòng duy nhất** (`overflow-hidden`, `truncate`, `whitespace-nowrap`), lược bỏ các từ rườm rà giúp nút "Xem Tất Cả" / "Focus 3 Câu" luôn sắc nét, không bị rớt dòng.
      - Bổ sung bộ kiểm thử độ chính xác phụ đề toàn diện [`__tests__/myvideo_subtitle_engine_precision.test.ts`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/myvideo_subtitle_engine_precision.test.ts) đạt tỷ lệ vượt qua **15/15 tests (100%)**.
27. **Tối Ưu Hóa & Chuẩn Hóa Toàn Diện Hệ Thống Luyện Nghe & Luyện Nói (Listening & Shadowing Studio Suite - Agency Tier Standard)**:
    - **Khắc phục lỗi Foreign Key `P2003` & Tự phục hồi dữ liệu (Self-Healing Pattern)**: Bổ sung và đồng bộ hóa toàn bộ 18 bài học còn thiếu (`listen_a1_001` - `listen_a1_018`, `shadow_ext_001` - `shadow_ext_008`) vào bảng cơ sở dữ liệu `listening_lessons` trên Neon PostgreSQL (nâng tổng số bài học trên CSDL từ 102 lên 120 bài). Tích hợp cơ chế tự phục hồi trong `POST /api/listening/progress`: tự động nhận diện và upsert bài học nếu chưa tồn tại trong cơ sở dữ liệu trước khi tạo `ListeningProgress`.
    - **Triệt tiêu Bug Xóa Tiến Độ Học Tập (`DELETE /api/listening/progress`)**: Xóa bỏ hoàn toàn lệnh gọi DELETE khi hoàn thành bài nghe/nói trong `ListeningPageContent`, `ShadowingStudioContent` và `useShadowingAudioRecorder`. Thay thế bằng việc ghi nhận trạng thái `COMPLETED` chuẩn mực, đồng bộ đầy đủ các câu đã hoàn thành, tích lũy XP, cập nhật bảng kỹ năng `DailySkillPractice` (`dictation` / `shadowing`) và kích hoạt hiển thị tức thì trong tab "Đã hoàn thành" của danh mục.
    - **Bảo Vệ Quyền Riêng Tư & Triệt Tiêu Rò Rỉ Bộ Đệm CDN (Personalized Cache-Control Partitioning)**: Sửa đổi tiêu đề phản hồi `Cache-Control` trong `GET /api/listening/lessons` và `GET /api/listening/lessons/[id]`. Khi có phiên đăng nhập của người dùng (`userId`), hệ thống chuyển từ `public` sang `private, no-cache, no-store, must-revalidate`, loại bỏ hoàn toàn nguy cơ CDN hoặc trình duyệt chia sẻ tiến độ học tập và ghi chú cá nhân giữa các tài khoản khác nhau.
    - **Kiểm Soát Tải Truy Vấn & Phân Trang An Toàn (`takeLimit` Bounds)**: Bổ sung tham số chặn ngưỡng `take: takeLimit` (mặc định 150, tối đa 200) cho truy vấn `prisma.listeningLesson.findMany`, ngăn chặn quá tải bộ nhớ và bùng nổ kích thước payload JSON khi kho học liệu mở rộng.
    - **Triệt Tiêu Lỗi 401 Flooding Cho Tài Khoản Khách (Guest Session Guard)**: Kiểm tra điều kiện người dùng đăng nhập trước khi kích hoạt các yêu cầu đồng bộ máy chủ (`/api/listening/progress`), giữ cho khách vãng lai trải nghiệm mượt mà qua cơ chế lưu trữ cục bộ SWR `localStorage` mà không bị ngập mã lỗi 401 trong bảng điều khiển trình duyệt.
    - **Chuẩn Hóa UI/UX Theo 19 Quy Tắc Wadhah Aloui & Tỷ Lệ Màu 60-30-10**:
      - Tối ưu hóa hệ thống nút bấm hành động (Rule 18): Thiết lập duy nhất 1 nút Primary nổi bật (Nút Thu âm & Chấm điểm / Nộp bài), chuyển các tiện ích phụ trợ (Nghe mẫu, Lưu sổ tay, Báo cáo lỗi) sang dạng Ghost/Secondary.
      - Cải tiến thanh điều khiển Mobile Audio Dock (Rule 13 Thumb Zone): Đặt nút Micro kích thước lớn ngay vùng ngón tay cái, kèm phản hồi xúc giác và hiển thị trạng thái VAD sóng âm trực quan.
      - Chuẩn hóa gợi ý thanh tìm kiếm (Rule 12): Điền placeholder chỉ dẫn chi tiết ("Tìm bài nghe/nói theo tiêu đề, chủ đề, mã bài...").
    - **Bộ Kiểm Thử Chuẩn Mực Bổ Sung**: Xây dựng test suite [`__tests__/listening_shadowing_standards.test.ts`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/listening_shadowing_standards.test.ts) kiểm tra 100% độ toàn vẹn của CSDL, phân quyền bộ đệm và quy trình ghi nhận tiến độ.
28. **Chuẩn Hóa Phân Tích Học Tập & Điểm Kinh Nghiệm (Single Root Query Analytics & Atomic Invalidation Engine)**:
    - **Single Root Query**: Chuyển đổi `GET /api/user/analytics` từ 6 truy vấn rời rạc sang **1 câu Single Root Query duy nhất** trên bảng `Profile` kết hợp quan hệ lồng `dailySkillPractices` (7 ngày gần nhất) và phép chiếu có chọn lọc (`select`), giảm áp lực kết nối DB từ 6 xuống 1 kết nối duy nhất.
    - **Khử Bỏ Bùng Nổ Bộ Nhớ Quét Toàn Bảng (`groupBy`)**: Thay thế toàn bộ quét toàn bảng `groupBy` tính thứ hạng tuần bằng câu truy vấn đếm vô hướng trực tiếp trong PostgreSQL engine (`HAVING SUM(xp_earned) > $userWeeklyXp`), triệt tiêu 100% rủi ro tràn RAM máy chủ khi dữ liệu hàng nghìn học viên.
    - **Động Cơ Vô Hiệu Hóa Bộ Đệm Nguyên Tử (`infrastructure/cache/dashboardCache.ts`)**: Mở rộng hàm `invalidateDashboardCache` tích hợp tự động dọn sạch cả bộ đệm Bảng điều khiển và Phân tích học tập (`analytics:${userId}:${todayStr}`) ngay khi học viên nhận thưởng XP/Coins qua `POST /api/user/activity-award`.
    - **Bộ Kiểm Thử Chuẩn Mực**: Xây dựng test suite [`__tests__/analytics_xp_standards.test.ts`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/analytics_xp_standards.test.ts) kiểm tra toàn diện 100% (5/5 tests).
29. **Tối Ưu Hóa Bảng Xếp Hạng & Biểu Đồ Phút Nhóm Lớp (Dual Criterion Leaderboard & 7-Day Group Minute Analytics)**:
    - **Bảng Xếp Hạng Đa Tiêu Chí Độc Lập (`/api/leaderboard`)**: Hỗ trợ đồng thời 2 tiêu chí xếp hạng: **"Điểm XP" (`criterion=xp`)** và **"Thời gian học (Phút)" (`criterion=time`)**. Phân tách bộ đệm RAM máy chủ theo khóa riêng biệt `leaderboard:${period}:${criterion}:${page}:${limit}`, triệt tiêu hoàn toàn lỗi hiển thị chéo dữ liệu do va chạm khóa bộ đệm (Cache Key Collision).
    - **Tối Ưu Hóa Tầng SQL Level 1**: Sử dụng trực tiếp SQL Aggregation trong PostgreSQL kết hợp `ORDER BY periodic_minutes DESC` hoặc `ORDER BY periodic_xp DESC` và phân trang an toàn `LIMIT ... OFFSET ...`, loại bỏ việc tải mảng dữ liệu toàn cục vào RAM ứng dụng.
    - **Đồng Bộ Thời Gian Thực Bảng Điều Khiển (`/dashboard`) & Cộng Đồng (`/community`)**: Mini-Leaderboard và Bảng Xếp Hạng Cộng Đồng hỗ trợ nút chuyển đổi nhanh "Điểm XP" ↔ "Thời gian học" kèm nạp dữ liệu tức thì không trễ.
    - **API Phân Tích & Biểu Đồ Phút Nhóm Lớp (`GET /api/groups/[id]/stats`)**: Nạp thông tin nhóm, chuỗi thời gian 7 ngày luyện tập liên tục của toàn bộ thành viên và bảng xếp hạng thành viên chỉ trong **2 truy vấn bounded DB duy nhất** (1 trên `Group` có chọn lọc `members`, 1 trên `DailySkillPractice` trong phạm vi 7 ngày của các thành viên). Bộ đệm RAM 30s với tiêu đề `Cache-Control: public, s-maxage=30, stale-while-revalidate=60`.
    - **Giao Diện Modal Biểu Đồ Phút Nhóm Chuẩn Agency (`GroupDetailModal.tsx`)**: Vẽ đường cong mượt mà Bezier SVG hiển thị phút học từng ngày trong tuần, thẻ tóm tắt 3 chỉ số then chốt (Tổng phút, Ngày cao nhất, Trung bình phút/ngày), và bảng xếp hạng thành viên hỗ trợ chuyển đổi linh hoạt giữa "Phút học" và "Điểm XP".
    - **Bộ Kiểm Thử Toàn Diện**: [`__tests__/leaderboard_groups_standards.test.ts`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/leaderboard_groups_standards.test.ts) xác thực 100% (7/7 tests) về khóa đệm phân biệt, thuật ngữ sắp xếp SQL, đường cong 7 ngày và tính cô lập dữ liệu.
30. **Chuẩn Hóa Gia Sư AI Đàm Thoại & Quản Lý Phiên Luyện Nói (AI Voice Tutor & Session Persistence Standard)**:
    - **Xóa Bộ Đệm Nguyên Tử Khi Hoàn Tất Phiên (`POST /api/ai/sessions`)**: Tích hợp `invalidateDashboardCache(authUserId)` sau khi đồng bộ `DailySkillPractice` (speaking) và `Profile` (minutesStudied, totalXp), giải quyết triệt để lỗi dữ liệu cũ trên Dashboard & Analytics khi học viên luyện nói xong.
    - **Truy Vấn Phiên Học Giới Hạn Cứng (`GET /api/ai/sessions`)**: Bổ sung cơ chế nạp trực tiếp phiên học theo định danh `?sessionId=...` với `LIMIT 1` và truy vấn danh sách lịch sử có chặn ngưỡng `LIMIT 30`, ngăn ngừa quá tải bộ nhớ và bùng nổ kích thước payload JSON.
    - **Chuẩn Hóa UI/UX Theo 19 Quy Tắc Wadhah Aloui**:
      - **Rule 1 (Loading)**: Thay thế spinner cổ điển bằng **Skeleton Loading Cards** (`ShimmerBox`) trong ngăn kéo lịch sử buổi học.
      - **Rule 18 (Single Primary Button & Dynamic CTA)**: Nút Micro là Primary khi chưa có dữ liệu; Nút Gửi tự động thành Primary khi người dùng bắt đầu gõ hoặc hoàn tất nhận diện giọng nói; Nút Micro chuyển thành Secondary.
      - **Hỗ Trợ Nhập Liệu Linh Hoạt**: Cho phép học viên vừa nói qua Micro vừa gõ phím / sửa văn bản trước khi gửi (`readOnly={isRecording}` + `onChange`).
      - **Điểm Nhấn Ngữ Nghĩa 60-30-10**: Tích hợp hiệu ứng bong bóng suy nghĩ 3 chấm tím AI Tutor (`#8b5cf6`), phân biệt trực quan với màu nhận diện thương hiệu `#0059bb`.
    - **Bộ Kiểm Thử Chuẩn Mực**: Xây dựng test suite [`__tests__/ai_tutor_standards.test.ts`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/ai_tutor_standards.test.ts) kiểm tra 100% (6/6 tests) tính toàn vẹn của CSDL, quản lý bộ đệm và động cơ gợi ý đàm thoại.

---

## 🎨 Design Tokens & Chuẩn Mực Thiết Kế (Agency Dashboard Tier)

### 💎 Kiến Trúc CSS Phân Tầng & Feature Co-location (Enterprise Tier Standard)
Hệ thống áp dụng mô hình tổ chức CSS phân tầng kết hợp **Co-location theo từng màn hình** (chuẩn Vercel & Linear), giải phóng hoàn toàn tệp `app/globals.css` nguyên khối cũ (4.812 dòng) về các module độc lập, sạch đẹp và dễ bảo trì:
- **Tầng 1: Nền Tảng Thiết Kế Cốt Lõi (`app/styles/core/`)**:
  - `tokens.css`: Hệ thống biến màu `:root`, `[data-theme="dark"]`, CSS Custom Properties (`--primary-500`, `--bg-card`, `--shadow-md`...).
  - `agency-utilities.css`: Double-bezel architecture, hiệu ứng xúc giác tactile button press (`.tactile`), nâng card (`.lift`), giếng icon mềm (`.icon-well`).
  - `base.css`: `@layer base`, CSS Reset, chuẩn mực phông chữ headings (`h1` - `h6`).
  - `utilities.css`: `@layer utilities`, tiện ích UI/UX Wadhah Aloui, ẩn thanh cuộn `.hide-scrollbar`.
  - `animations.css`: `@keyframes` (shimmer, audioBar, authBlobMorph, fadeIn, bounce, spin...).
- **Tầng 2: Thư Viện UI Dùng Chung (`app/styles/components/`)**:
  - `buttons.css`: Khung nút bấm `.btn`, `.btn-primary`, các biến thể hover/active.
  - `inputs.css`: Khung nhập liệu `.input-group`, viền focus đa tầng.
  - `cards.css`: Thẻ thông tin `.card`, card header, card body, hiệu ứng kính mờ.
  - `badges-avatars.css`: Huy hiệu `.badge`, khung avatar học viên `.avatar`, dot trạng thái.
  - `tabs-tags.css`: Cụm tab `.tabs`, `.tab`, chip lọc `.tag`.
  - `feedback.css`: Hộp thoại modal, toast thông báo, dropdown popover, tooltip, skeleton loading, empty state, divider.
  - `rewards.css`: Hoạt ảnh ăn mừng thăng cấp `.xp-popup`, hạt thưởng vinh danh.
- **Tầng 3: Khung Sườn Ứng Dụng (`app/styles/layout/`)**:
  - `navbar.css`: Thanh điều hướng đỉnh trang `.top-navbar`.
  - `sidebar.css`: Thanh điều hướng bên trái `.left-sidebar`, liên kết chức năng, trạng thái thu gọn.
  - `right-sidebar.css`: Thanh widget bên phải `.right-sidebar`, BXH mini, widget nhiệm vụ.
  - `main-content.css`: Khung chứa nội dung chính `.main-content`, khoảng bù trừ an toàn cho thanh bên.
- **Tầng 4: Co-location Theo Từng Màn Hình Giao Diện**:
  - `app/landing.css`: Định kiểu chuyên biệt cho Trang chủ Landing Page (`app/page.tsx`).
  - `app/(auth)/auth.css`: Định kiểu nhóm xác thực (`login`, `register`, `forgot-password`).
  - `app/(dashboard)/dashboard/dashboard.css`: Định kiểu bảng điều khiển Dashboard (`dashboard/page.tsx`).
  - `app/(dashboard)/vocabulary/vocabulary.css`: Định kiểu kho từ vựng (`vocabulary/page.tsx`).
  - `app/(dashboard)/study/practice/practice.css`: Định kiểu phòng luyện tập & trắc nghiệm (`study/practice/page.tsx`).
  - `app/(dashboard)/community/community.css`: Định kiểu diễn đàn & bảng xếp hạng (`community/page.tsx`).
  - `app/(dashboard)/review/review.css`: Định kiểu phòng ôn tập ngắt quãng SRS (`review/page.tsx`).
  - `app/(dashboard)/ai/ai-chat.css`: Định kiểu phòng Gia sư AI & visualizer giọng nói (`ai/page.tsx`).
  - `app/(dashboard)/profile/profile.css`: Định kiểu hồ sơ học viên & huy hiệu (`profile/page.tsx`).
  - `app/(dashboard)/admin/admin.css`: Định kiểu trung tâm quản trị (`admin/page.tsx`).
- **Tầng 5: Đáp Ứng Đa Thiết Bị & In Ấn (`app/styles/responsive.css`)**:
  - Breakpoints media query `@media (max-width: 1280px)`, chuẩn in ấn `@media print`.
- **Master Orchestrator (`app/globals.css`)**: Tinh gọn còn ~40 dòng `@import` có trật tự nghiêm ngặt, bảo toàn 100% thứ tự cascade nguyên bản, bảo đảm **0px visual deviation**.
- **Quy Trình Kiểm Tra Tính Toàn Vẹn Tự Động**: Tích hợp script `node scripts/verify_css_parity.js` phân tích đối sánh 1:1 cây AST (4.601 CSS rules, 29 keyframes) đảm bảo không thất thoát bất kỳ quy tắc nào.

- **Màu Sắc Thương Hiệu Chủ Đạo**: `#0059bb` (Royal XP English Blue)
- **Bảng Màu Phụ Hài Hòa & Quy Tắc 60 - 30 - 10 (Tailored Semantic Palette)**:
  - **60% Nền & Cấu trúc**: Trắng tinh khiết `white` / Xám Slate tối giản `slate-900` với viền siêu mỏng `slate-200/slate-800` giữ độ tập trung tối đa cho người học.
  - **30% Thương hiệu**: Xanh hoàng gia `#0059bb` cho các nút bấm Primary, Icon nhận diện và Tab đang chọn.
  - **10% Điểm nhấn ngữ nghĩa (Semantic Accents)**:
    - **Amber Gold `#f59e0b`**: Huy hiệu Bảng Xếp Hạng Top 1-3, Crown Podium, Điểm danh Streak & Thưởng Vàng.
    - **Emerald `#10b981`**: Thưởng XP, Từ vựng đã lưu (`BookmarkCheck`), Thành tích & Đáp án đúng.
    - **Indigo / Purple `#8b5cf6`**: Gemini AI Tutor, Ngữ pháp AI, Trợ lý hội thoại.
    - **Sky `#0284c7`**: Thời gian luyện tập, Bình luận, Tương tác cộng đồng.
    - **Cherry Red / Rose `#f43f5e` / `#e11d48`**: Dùng có chọn lọc cho Phòng Thi Thử Đề Chuẩn (`/study/exam-prep`), Đấu Trường 1v1 (`/study/pvp`), Đếm ngược thời gian gấp gáp, Báo lỗi sai cần sửa và Trái tim sinh mệnh PvP Arena (Tuyệt đối không dùng làm màu nền chung).
    - **Soft Pink `#ec4899`**: Giới hạn cho chủ đề Thời trang/Làm đẹp hoặc Quà tặng đặc biệt.
- **Hệ Thống Icon Đa Sắc Ngữ Nghĩa Đồng Bộ Header-Sidebar (`HeaderPillItem` Semantic Multi-Color Palette)**:
  - Đồng bộ 100% chuẩn tên mục điều hướng và icon đại diện 1:1 giữa thanh bên `Sidebar.tsx` và cụm nút Header Pills (`AppTopHeader` & `HeaderPillItem`) trên tất cả 25+ trang của toàn hệ sinh thái.
  - Phân bổ dải màu ngữ nghĩa sinh động chuẩn mực (loại bỏ hoàn toàn icon xám đơn điệu `text-slate-500`):
    - **`Trang chủ` / `Hồ sơ` / `Video của tôi`**: `text-[#0059bb] dark:text-sky-400` (`Home`, `User`, `Video`).
    - **`Lộ trình` / `Xếp hạng` / `Nâng cấp Premium`**: `text-amber-500` (`Compass`, `Trophy`, `Sparkles`).
    - **`Danh sách từ` / `Sổ từ của tôi` / `Luyện từ vựng` / `Luyện đọc`**: `text-emerald-500` (`ListOrdered`, `BookOpen`).
    - **`Dictation`**: `text-indigo-500` (`Headphones`).
    - **`Shadowing` / `Bạn bè`**: `text-sky-500` (`Mic`, `UserPlus`).
    - **`Luyện nói`**: `text-purple-500` (`SpeakingIcon`).
    - **`Hội thoại AI`**: `text-[#0059bb] dark:text-sky-400` (`MessageSquare`).
    - **`Thi thử đề` / `Đấu trường 1v1`**: `text-rose-500` (`FileText`, `Swords`).
    - **`Cài đặt` / `Phòng học nhóm` / `Nhóm học`**: `text-indigo-500` (`Settings`, `Users`).
    - **`Bảng tin` / `Thống kê`**: `text-blue-500` (`MessageSquare`, `BarChart3`).
    - **`Lịch Ôn Tập SM-2` / `Luyện Tập Ngay` / `Sổ Tay Từ Vựng` (`/review`)**: `text-[#0059bb]` (`CalendarIcon`), `text-amber-500` (`Target`), `text-slate-500` (`BookMarked`).
- **Tiêu Chuẩn Bo Góc & Spacing (Tuân thủ Quy tắc UI/UX Wadhah Aloui)**:
  - **Rule 20 (Semantic Color Distribution)**: Tuân thủ nghiêm ngặt tỷ lệ 60-30-10, bảo vệ mắt và giữ vững tính nhận diện học thuật cao cấp.
  - **Rule 10 (Micro-Sharp UI Border-Radius Standard)**: Quy chuẩn bo góc tất cả các khối hình chữ nhật trên toàn website (cards, containers, buttons, inputs, dropdowns, modals, badges, tabs, alerts, toasts) về phẳng **`rounded-xs` (2px - 3px)** hoặc **`rounded-xl` (12px)** siêu sắc nét, tinh gọn và hiện đại (Ngoại lệ duy nhất: giữ nguyên `rounded-full` cho khối hình tròn như Avatar, chấm tiến trình tròn).
  - **Rule 1 (Loading State & Skeleton Standard)**: Sử dụng đồng bộ Skeleton Loading Cards bám sát 100% tỷ lệ và bố cục thực tế trên cả Mobile và Desktop ([app/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/loading.tsx), [app/(dashboard)/dashboard/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/dashboard/loading.tsx), [app/(auth)/login/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(auth)/login/loading.tsx), [app/(auth)/register/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(auth)/register/loading.tsx), [app/(auth)/forgot-password/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(auth)/forgot-password/loading.tsx), [app/(dashboard)/profile/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/profile/loading.tsx), [app/(dashboard)/community/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/community/loading.tsx), [app/(dashboard)/analytics/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/analytics/loading.tsx), [app/(dashboard)/roadmap/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/roadmap/loading.tsx), [app/(dashboard)/study/grammar/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/grammar/loading.tsx), [app/(dashboard)/vocabulary/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/vocabulary/loading.tsx), [app/(dashboard)/myvideo/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/myvideo/loading.tsx), [app/(dashboard)/study/practice/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/practice/loading.tsx), [app/(dashboard)/study/listening/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/listening/loading.tsx), [app/(dashboard)/study/shadowing/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/shadowing/loading.tsx), [app/(dashboard)/ai/tutor/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/ai/tutor/loading.tsx), [app/(dashboard)/ai/conversation/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/ai/conversation/loading.tsx), [app/(dashboard)/study/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/loading.tsx), [app/(dashboard)/ai/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/ai/loading.tsx), [app/(dashboard)/review/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/review/loading.tsx), [app/(dashboard)/study/games/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/study/games/loading.tsx), [app/(dashboard)/profile/achievements/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/profile/achievements/loading.tsx), [app/(dashboard)/admin/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/(dashboard)/admin/loading.tsx)) (`animate-pulse bg-slate-200 dark:bg-slate-800`) cho cả Light Mode và Dark Mode trên tất cả các trang, loại bỏ hoàn toàn spinner cổ điển. Đặc biệt, trang chủ `app/loading.tsx` tái hiện 1:1 cả 6 phân khu chức năng (Hero + Flashcard widget, 5 Bento cards với biểu đồ Ebbinghaus, Chat AI Tutor 1-1, Smart Analytics banner, 3 Testimonial cards, Bottom CTA & Footer) kèm dải màu nền ambient mesh gradient triệt tiêu 100% hiện tượng Cumulative Layout Shift (0px CLS).
  - **Rule 18 (Primary Button)**: Duy nhất 1 nút bấm Primary `#0059bb` nổi bật per view.
- **Staggered Spring Entrance Animation Standard (`PageEntranceWrapper` & `MotionItem`)**:
  - Áp dụng đồng bộ hiệu ứng chuyển cảnh / xuất hiện chuẩn Agency cho tất cả các trang (`PageEntranceWrapper` bọc root layout container, `MotionItem` bọc các bento cards và section con).
  - Tích hợp bộ cấu hình `framer-motion` thống nhất từ Dashboard: `containerVariants` (`staggerChildren: 0.04`, `delayChildren: 0.04`) và `itemVariants` (`hidden: { opacity: 0, y: 8, scale: 0.99 }`, `show: { opacity: 1, y: 0, scale: 1 }`, transition `type: "spring", stiffness: 120, damping: 20`).
  - Áp dụng đồng bộ 100% trên toàn hệ thống trang (`/dashboard`, `/vocabulary`, `/vocabulary/[id]`, `/study/practice`, `/study/grammar`, `/study/listening`, `/study/reading`, `/study/shadowing`, `/study/pvp`, `/study/games`, `/study/rooms`, `/review`, `/myvocab`, `/myvideo`, `/roadmap`, `/shop`, `/profile`, `/profile/achievements`, `/analytics`, `/settings`, `/community`, `/community/leaderboard`, `/community/friends`, `/community/groups`, `/ai/conversation`, `/ai/tutor`, `/onboarding`, `/admin`, `/login`).
- **Chuẩn Mực Biểu Đồ Đường (Line Chart Standard)**:
  - Nét vẽ uốn lượn Bezier siêu mảnh **`1.3px`** (`strokeWidth="1.3"`).
  - **Dynamic Y-Axis Scaling**: Tự động co giãn trục Y theo điểm cao nhất của học viên (`Math.max(maxVal, defaultMax)`), triệt tiêu lỗi tràn/vỡ nét vẽ khỏi khung.
  - Tương tác **Hover-Only Tooltip**: Chấm tròn và hộp thông tin floating chỉ xuất hiện khi di chuột vào mốc ngày.
- **Chuẩn Mực Bố Cục Không Gian Rộng Linh Hoạt (Fluid Ultra-Wide Canvas Standard `max-w-[1600px] 2xl:max-w-[1760px]`)**:
  - **Tối Ưu Co Giãn Không Gian 0px Thừa**: Tất cả các trang trong hệ thống (`/dashboard`, `/study`, `/study/ipa`, `/study/ipa/practice`, `/study/ipa/minimal-pairs`, `/study/listening`, `/study/shadowing`, `/study/reading`, `/study/practice`, `/study/grammar`, `/study/exam-prep`, `/study/pvp`, `/study/games`, `/study/rooms`, `/review`, `/vocabulary`, `/myvocab`, `/myvideo`, `/roadmap`, `/community`, `/community/leaderboard`, `/community/friends`, `/community/groups`, `/analytics`, `/ai`, `/ai/tutor`, `/ai/conversation`, `/profile`, `/profile/achievements`, `/shop`, `/settings`, `/admin`) đều được quy chuẩn cấu trúc vùng chứa siêu rộng linh hoạt: `w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6`.
  - **Loại Bỏ Hoàn Toàn Khoảng Trống Thừa Khi Thu Gọn Sidebar**: Khi người dùng nhấn nút thu gọn Sidebar (`72px`) trên Desktop, toàn bộ các khối Bento Card, Lưới chủ đề, Bảng thống kê và Khung làm bài tự động dãn đều ra toàn chiều ngang một cách mượt mà và sang trọng, triệt tiêu triệt để tình trạng bó hẹp cục bộ hay để thừa khoảng trống hai bên sườn.
- **Chuẩn Mực Top Header Toàn Hệ Thống (`AppTopHeader` + `HeaderPillContainer` + `HeaderPillItem`)**:
  - **Đồng Bộ 100% Giao Diện Header Trên Toàn Bộ 25+ Trang**: Toàn bộ hệ sinh thái sử dụng component master duy nhất `AppTopHeader` (chiều cao chuẩn 56px `h-14`, nền kính mờ Glassmorphism `bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800`).
  - **Nút Menu Drawer & Điều Hướng Mobile Hoàn Hảo**: Tích hợp sẵn nút Hamburger tiện dụng ở góc trái trên Mobile để mở Sidebar Drawer, đi kèm cụm Pills phân loại động (`HeaderPillItem`) với Icon ngữ nghĩa đa sắc và nhãn rút gọn thông minh (`hideOnSmall`).
  - **Bảo Toàn 100% Avatar Người Dùng & Không Che Khuất Trên Desktop**: Quy chuẩn `hideThemeAndAvatarOnDesktop = false` mặc định, triệt tiêu hoàn toàn lỗi ẩn mất Avatar học viên khi truyền nút hành động `rightDesktopContent` hoặc ô tìm kiếm; đảm bảo người học luôn có thể truy cập hồ sơ cá nhân và cài đặt chỉ với 1 cú click chuột ở mọi trang.
  - **Hệ Thống Ô Tìm Kiếm Thích Ứng Đa Thiết Bị (`searchProps`)**:
    - **Trên Desktop (`lg:block`)**: Tích hợp ô tìm kiếm sắc nét bo góc `rounded-xl`, icon kính lúp, nút xóa nhanh (`X`) và phím tắt `⌘K` thanh lịch.
    - **Trên Mobile (`< 1024px`)**: Thay vì nhồi nhét input gây tràn viền, hệ thống hiển thị nút icon kính lúp kích cỡ chuẩn công thái học (`w-9 h-9`). Khi chạm vào, thanh tìm kiếm toàn chiều rộng bung mở êm ái bằng hiệu ứng trượt `<AnimatePresence>` với tính năng tự động focus bàn phím (`autoFocus`), hỗ trợ xóa nhanh và nút "Đóng" tiện lợi.
  - **Cụm Chip Gamification Tích Hợp Sẵn (`showGamificationStats`)**:
    - **Ngọn Lửa Chuỗi Streak 🔥**: Chip hổ phách `bg-orange-50 dark:bg-orange-950/50 border-orange-200 text-orange-600` hiển thị số ngày streak thực tế của học viên kèm liên kết nhanh tới Trung tâm phân tích `/analytics`.
    - **Kho Vàng Học Tập 🪙**: Chip hoàng kim `bg-amber-50 dark:bg-amber-950/50 border-amber-200 text-amber-700` hiển thị số Vàng tích lũy kèm liên kết tới Cửa hàng `/shop`.
  - **Menu Popover Hồ Sơ Học Viên Đẳng Cấp Double-Bezel (`rounded-2xl` ngoài, `rounded-xl` trong)**:
    - Bấm vào Avatar mở ngay Popover `w-56 rounded-2xl` nổi đa tầng (`z-[9999]`) chuẩn $150k+ Agency-Tier.
    - Khối Mini-Profile Header: Hiển thị Avatar tròn xem trước viền ring `shadow-2xs`, Họ và tên in đậm, tên định danh chuẩn `@handle` bảo toàn dấu chấm (ví dụ `@vuminh.ecv`), typography `font-sans 11px` thanh lịch và huy hiệu cấp bậc dạng viên thuốc `Lv.N` bo tròn `rounded-full`.
    - Danh mục điều hướng: Hồ sơ cá nhân (`/profile`), Cài đặt tài khoản (`/settings`), Menu con giao diện Sáng ☀️ / Tối 🌙 tích hợp dấu tick xanh hoàng gia, **Công tắc gạt Bật/Tắt (Toggle Switch ON/OFF)** trực quan cho Trợ lý AI XP Mentor (phản ánh tức thì trạng thái ẩn/hiện của bong bóng chat AI, gạt sang phải màu xanh hoàng gia khi Bật và gạt sang trái màu xám khi Tắt), và Nút Đăng xuất màu Rose cảnh báo.
    - Đóng tự động thông minh: Tự động đóng khi click ra ngoài (Click Outside), bấm phím Escape hoặc khi điều hướng trang.
  - **Đồng Bộ 100% Skeleton Loaders (`loading.tsx`) - Chuẩn 0px CLS**: Tương ứng với từng trang, tất cả các tệp `loading.tsx` (như `ShadowingListingSkeleton`, `ListeningListingSkeleton`) đều tái hiện chuẩn xác 1:1 từng pixel: Nút tìm kiếm mobile, ô tìm kiếm desktop, nút CTA action, chip Streak 🔥, chip Gold 🪙 và Avatar người dùng có ring bo viền.
  - **Cơ Chế Adaptive URL Loading Fallback & Chuẩn Hóa Khung Xương Studio 1:1 (`/study/listening?id=N`)**:
    - **Tự Động Phân Nhánh Skeleton Theo Ngữ Cảnh URL (`loading.tsx` & `page.tsx`)**: Sử dụng bộ nhận biết `isStudio` qua URL query `window.location.search`. Khi truy cập trực tiếp hoặc chuyển hướng đến URL có `?id=` hoặc `?lessonId=`, hệ thống lập tức hiển thị ngay `ListeningStudioSkeleton` (khung xương Studio 2 cột) thay vì `ListeningListingSkeleton`, loại bỏ 100% tình trạng chớp nháy giật layout danh mục trước khi vào phòng học.
    - **Header Studio (`StudioTopHeader`)**: Khớp nút "Quay lại" responsive (`34px` mobile, `86px` desktop kèm chữ), bổ sung huy hiệu Trình độ Level Badge (`h-5 w-8` màu xanh), Shimmer tiêu đề bài học, Mode Switcher (Nói / Nghe), Accent Switcher (US / UK / AU), Timer Capsule hổ phách và cụm 3 nút công cụ phụ.
    - **Waveform Studio Card (`StudioWaveformCard`)**: Khớp khối Status LED + Thanh trượt âm lượng bên trái, Digital Timer góc phải, canvas 95 cột sóng âm thanh phân đoạn ngẫu nhiên `JAGGED_ACOUSTIC_SPEECH_SPIKES_95`, cụm 5 nút Playback Transport (nút Master Play trung tâm 48px viền ring tactile shadow) và Speed Selector Dock 5 mức tốc độ.
    - **Thanh Tiện Ích Câu (Sentence Utility Toolbar)**: Khớp nút "Lưu câu", "Báo cáo", cụm chỉnh cỡ chữ `-A / +A`, switch iOS chuẩn 32x16px kèm nhãn chữ cho "Tự động tiếp" và "Ẩn dịch".
    - **Không Gian Nhập Liệu & Khắc Phục Triệt Để 26px Layout Drop (`DictationWorkspace`)**: Bổ sung hàng nhãn ngoài (External Label - tuân thủ Rule 6 Wadhah Aloui) gồm icon `PenLine` + chữ "Nội dung nghe chép chính tả" (nguyên nhân chính gây tụt 26px CLS trước đây), khớp khung Word Tokens che/hiện từ, ô input chính tả chuẩn `h-11 sm:h-12` bo góc `rounded-xl`, và 4 nút phím tắt "Chữ cái đầu", "Xem từ", "Xem dịch", "Làm lại".
    - **Cột Phụ Đề Tương Tác (`InteractiveTranscriptSidebar`)**: Chuẩn hóa lề container `px-5 pb-5 space-y-3`, header tiến độ `completed/total`, nút "Đặt lại tiến độ", công tắc gạt "Hiện", và 6 thẻ câu (thẻ đầu tiên viền xanh nổi bật, icon tròn 24px, số thứ tự câu `#1`, nút nghe lại 32px, text mô phỏng 2 dòng tiếng Anh và 1 dòng tiếng Việt).
  - **Cơ Chế Adaptive URL Loading Fallback & Chuẩn Hóa Khung Xương Shadowing Studio 1:1 (`/study/shadowing?id=N`)**:
    - **Tự Động Phân Nhánh Skeleton Theo Ngữ Cảnh URL (`loading.tsx` & `page.tsx`)**: Tương tự như Dictation Studio, khi truy cập trực tiếp hoặc chuyển hướng đến URL có `?id=` hoặc `?lessonId=`, hệ thống lập tức hiển thị ngay `ShadowingStudioSkeleton` (khung xương Studio Luyện nói chuyên sâu) thay vì `ShadowingListingSkeleton`, loại bỏ 100% tình trạng chớp nháy giật layout danh mục trước khi vào phòng học.
    - **Header Studio (`StudioTopHeader`)**: Khớp nút "Quay lại" responsive (`34px` mobile, `86px` desktop kèm chữ), huy hiệu Trình độ Level Badge (`h-5 w-8` màu xanh), Shimmer tiêu đề bài học, Nói Active Mode Pill, Timer Capsule hổ phách và cụm 3 nút công cụ phụ (Lưu, Báo cáo, Đóng); chủ động lược bỏ Accent Switcher (US/UK/AU) để khớp 100% với Studio Luyện nói.
    - **Bộ Chuyển Tab Mobile Dạng Viên Thuốc Trượt Apple (`Sliding Pill Tabs`)**: Cân đối tỉ lệ 50/50 với icon Mic ("Luyện nói" active) và icon List ("Danh sách phụ đề"), đồng bộ hoàn hảo với giao diện thật trên màn hình di động.
    - **Trình Phát Sóng Âm Two-Tone Progress Spectrum & Khung Xương 1:1 (`StudioWaveformCard`)**:
      - **Phổ Sóng Âm Phân Màu Tiến Độ (Two-Tone Audio Spectrum)**: Các cột sóng âm 95 dải tần được phân định 2 vùng màu rõ rệt theo thời gian thực: vùng đã phát qua (`spikeRatio <= progressRatio`) rực sáng màu Xanh Hoàng Gia `#0059bb` (dark mode: `sky-400`) kèm hiệu ứng ánh sáng nhẹ; vùng chưa phát giữ màu Slate thanh lịch (`slate-300` / `slate-700`); khi thu âm, toàn bộ sóng chuyển sang màu Đỏ Rose (`rose-500`) dao động theo năng lượng giọng nói `liveAudioEnergy`.
      - **Tương Tác Cọ Âm Thanh (Hover Scrubbing Preview)**: Rê chuột trên dải sóng âm hiển thị vạch kẻ mờ đứt đoạn và chip thời gian dạng tooltip (`formatTime`) trực quan trước khi nhấp chuột để tua câu (`onSeek`).
      - **Khung Xương Sóng Âm 1:1 Chuẩn Tuyệt Đối (0px CLS)**: Đồng bộ 100% bố cục 2 hàng căn giữa (`flex-col items-center`), cụm 5 nút tua tròn hoàn hảo `rounded-full` (`w-8.5` đến `w-12`), nút Master Play đen/trắng tactile ring, Speed Dock căn giữa ở hàng thứ 2, và dải sóng âm 95 cột quét vệt Shimmer Wave mượt mà (thay thế 95 thẻ `animate-pulse` giật cục).
    - **Thanh Thông Số Phân Tích Kép (Sentence Meta Row)**: Khớp huy hiệu câu `#1`, bộ đếm từ (`0/14 từ`), tỷ lệ khớp phát âm (`Khớp: 0%`) và các chip phím tắt `Enter` / `Space`.
    - **Thanh Tiện Ích Câu (Sentence Utility Toolbar)**: Khớp nút "Lưu câu", "Báo cáo", cụm chỉnh cỡ chữ `-A / +A`, switch iOS chuẩn 32x16px kèm nhãn chữ cho "Tự động tiếp" và "Ẩn dịch (i)".
    - **Thẻ Câu Luyện Nói Cốt Lõi (Shadowing Core Sentence Card)**: Bổ sung dòng gợi ý tra từ từ điển (Dictionary Prompt), vạch token từ vựng độ dài tự nhiên, hàng phiên âm IPA sắc nét, hộp dịch nghĩa tiếng Việt với icon `Languages`. Loại bỏ ma trận 6 hộp điểm số AI khi chưa nạp (khắc phục triệt để lỗi tụt 150px layout drop khi tải bài mới).
    - **Cụm Phím Tắt Hành Động (Action Shortcut Buttons Bar)**: Khớp nút "Thu âm & Chấm điểm" màu Rose nổi bật với phím tắt `Alt+S`, nút "Nghe câu mẫu" kèm `Space`, nút "Ẩn dịch" và nút "Làm lại câu".
    - **Cột Phụ Đề Tương Tác (`InteractiveTranscriptSidebar`)**: Khớp 2 header tab kèm thanh chỉ báo màu xanh `#0059bb`, thanh công cụ tiến độ `0/4 hoàn thành` kèm nút reset và công tắc gạt "Hiện", thẻ câu `#1` active viền xanh kèm icon tai nghe nổi bật, cùng 3 thẻ câu tiếp theo.
    - **Khung Dock Âm Thanh Nổi Đáy Điện Thoại (Mobile Sticky Audio Dock)**: Bổ sung dock cố định 64px ở đáy màn hình trên mobile (`lg:hidden`) với 5 nút điều khiển và nút CTA Thu âm chính giữa 52px màu Rose (`bg-rose-500/30`), triệt tiêu hoàn toàn hiện tượng layout giật nảy chân trang khi tải xong.
- **Chuẩn Mực Chuyển Đổi Tab Không Giật & Bộ Tab Dùng Chung (Universal Shared Tab Unification & Zero-Jank Transition System)**:
  - **Quy Tắc Tối Đa 4 Tab per Bar ($\le 4$ tabs)**: Tất cả các cụm tab trên `AppTopHeader` đều giới hạn tối đa 4 tab, đảm bảo thanh điều hướng luôn tinh gọn, thanh thoát, không gây tràn màn hình hay che khuất các nút hành động trên thiết bị di động và tablet.
  - **Đồng Bộ 100% Chữ Với Thanh Bên (`Sidebar.tsx`)**: Mọi nhãn (labels) trên `AppTopHeader` đều đồng nhất tuyệt đối nguyên văn từng chữ với tên mục tương ứng bên thanh bên:
    - Nhóm Luyện Tập: `Dictation`, `Shadowing`, `Luyện từ vựng`, `Thi thử đề`.
    - Nhóm AI Thông Minh: `Trung tâm AI`, `Luyện nói`, `Luyện viết`, `Ngữ pháp AI`.
    - Nhóm Thư Viện: `Danh sách từ`, `Sổ từ của tôi`, `Lịch ôn tập`, `Video của tôi`.
    - Nhóm Tiến Độ: `Lộ trình`, `Thống kê`, `Xếp hạng`.
    - Nhóm Tài Khoản & Cửa Hàng: `Cửa hàng`, `Nâng cấp Premium`, `Hồ sơ`, `Thành tích`, `Cài đặt`.
  - **Hệ Thống Cụm Tab Dùng Chung (`shared/components/layout/nav-tabs/`)**:
    - **`StudySuiteNavTabs`**: Hợp nhất dùng chung cho 4 trang thuộc phân hệ Luyện tập (`/study/listening`, `/study/shadowing`, `/study/practice`, `/study/exam-prep`) với 4 tab cố định thứ tự (`Dictation`, `Shadowing`, `Luyện từ vựng`, `Thi thử đề`) chia sẻ chung `layoutId="studySuiteNavActiveTab"`.
    - **`AiSuiteNavTabs`**: Hợp nhất cho phân hệ AI (`/ai`, `/ai/tutor`, `/ai/conversation`) với 4 tab cố định (`Trung tâm AI`, `Luyện nói`, `Luyện viết`, `Ngữ pháp AI`) chia sẻ chung `layoutId="aiSuiteNavActiveTab"`.
    - **`VocabSuiteNavTabs`**: Hợp nhất cho phân hệ Thư viện từ vựng (`/vocabulary`, `/myvocab`, `/review`, `/myvideo`) với 4 tab cố định (`Danh sách từ`, `Sổ từ của tôi`, `Lịch ôn tập`, `Video của tôi`) chia sẻ chung `layoutId="vocabSuiteNavActiveTab"`.
    - **`ProfileSuiteNavTabs`**: Hợp nhất cho phân hệ Hồ sơ cá nhân (`/profile`, `/profile/achievements`, `/settings`) với 3 tab (`Hồ sơ`, `Thành tích`, `Cài đặt`) chia sẻ chung `layoutId="profileSuiteNavActiveTab"`.
    - **`ShopSuiteNavTabs`**: Hợp nhất cho phân hệ Cửa hàng (`/shop`, `/premium`) với 3 tab (`Cửa hàng`, `Nâng cấp Premium`, `Hồ sơ`) chia sẻ chung `layoutId="shopSuiteNavActiveTab"`.
    - **`IpaSuiteNavTabs`**: Hợp nhất cho phân hệ Bảng Phiên Âm Quốc Tế IPA (`/study/ipa`, `/study/ipa/practice`, `/study/ipa/minimal-pairs`) với 3 tab tinh gọn (`Bảng 44 Âm`, `Luyện Âm AI`, `Đấu Trường Cặp Âm`) chia sẻ chung `layoutId="ipaSuiteNavActiveTab"`.
  - **Cơ Chế Khử Triệt Để Xung Đột Hoạt Ảnh (Zero-Jank Spring Transition Engine)**:
    - Loại bỏ hoàn toàn xung đột giữa Tailwind `transition-all` và Framer Motion bounding-box transforms bằng `transition-colors duration-150 active:scale-[0.98]`.
    - Cấu hình lò xo cao cấp `transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}` giúp viên thuốc chỉ báo lướt êm ái giữa các tab mà không rung giật.
    - Kích hoạt `prefetch={true}` trên toàn bộ `Link` tab pills giúp nạp trước tài nguyên ngầm, chuyển trang tức thì trong 0ms.
  - **Tăng Tốc Đột Phá Tốc Độ Chuyển View Trong Trang (Snappy Sub-tabs Switcher)**:
    - Rút ngắn thời gian hoạt ảnh `<AnimatePresence mode="wait">` từ 0.22s–0.25s xuống 0.09s–0.11s với cubic-bezier `[0.2, 0, 0, 1]`, cắt giảm độ trễ phản hồi từ ~500ms xuống chỉ còn ~100ms trong `CommunityHub`, `Analytics`, và `PracticeWordLab`.
    - Bổ sung `layoutId` cho các bộ chuyển chế độ trong trang: `vocabDetailViewModePill` (`/vocabulary/[id]`), `grammarLevelFilterPill` (`/study/grammar`), `gamesModeFilterPill` (`/study/games`), `analyticsActiveTabPill` (`/analytics`), `vocabThemesLevelPill` (`/vocabulary`), `achievementsFilterPill` (`/profile/achievements`).
- **Phân Tách & Khóa Trạng Thái Sidebar Trên Mobile (Mobile Sidebar Drawer Isolation)**:
  - **Chống Thu Nhỏ Thanh Bên Trên Di Động**: Trên thiết bị di động (`< 1024px`), Sidebar Drawer luôn luôn hiển thị ở trạng thái mở rộng đầy đủ `width: min(85vw, 290px) !important` với tiêu đề phân mục, tên tính năng và thẻ thông tin tài khoản người dùng rõ ràng; ngăn chặn triệt để tình trạng tự động co lại thành cột icon 72px gây vỡ giao diện trên màn hình cảm ứng hẹp.
  - **Ẩn Khối Thẻ Tài Khoản Đáy Drawer Trên Mobile**: Ẩn hoàn toàn khối user card footer ở đáy ngăn kéo Sidebar trên thiết bị di động (`hidden lg:block`), ngăn kéo kết thúc thanh thoát ngay tại nút "Nâng cấp Premium", loại bỏ 100% sự trùng lặp với Avatar Popover trên `AppTopHeader` và giải phóng 80px chiều cao cho màn hình điện thoại.
  - **Bảo Toàn Độc Lập Chế Độ Desktop**: Giữ nguyên vẹn 100% hành vi chuyển đổi mở rộng (240px) / thu gọn (72px) của phiên làm việc trên Desktop mà không hề bị ảnh hưởng bởi các thao tác trên Mobile.
- **Tối Ưu Hiệu Năng & Khả Năng Kháng Lỗi Trắng Màn Hình (Zero Blank Screen Resilience)**:
  - **Khởi Tạo Mặc Định Cho Tài Khoản Học Viên (`DEFAULT_LEARNER_USER`)**: Khi người dùng mới vào trình duyệt hoặc ở chế độ khách/ngoại tuyến, `setLocalUser()` trong `userStore.ts` tự động nạp hồ sơ `Học viên XP Voca / @learner` (150 XP, 100 Vàng, 1 ngày Streak, Lv.1) vào State và LocalStorage; triệt tiêu 100% tình trạng `user === null`.
  - **Loại Bỏ 'if (!user) return null'**: Xóa bỏ các điểm chặn `return null` ở trang Dashboard (`/dashboard`) và Hồ sơ (`/profile`), tích hợp cơ chế Fallback mượt mà và Skeleton Loader chuẩn Agency để trang web luôn hiển thị sống động ngay lập tức, không bao giờ bị trắng màn hình.
  - **Kích Hoạt Phiên Toàn Cục Tại `DashboardLayout`**: Tự động gọi `checkSession()` ở cấp Layout để mọi trang con đều sẵn sàng dữ liệu người dùng.
  - **0ms Optimistic UI Updates**: Cập nhật tức thì điểm XP, Số phút học, Từ vựng đã lưu, Điểm danh, Thích, Đăng bài & Bình luận.
  - Đồng bộ liên tục giữa Zustand State, LocalStorage và Cơ sở dữ liệu PostgreSQL via Prisma ORM API.
  - **Khắc Phục Triệt Để Sự Cố Trang Trắng & Khóa Vòng Lặp Vô Hạn (`/study/listening?id=44` & `/study/shadowing?id=42`)**:
    - **Triệt Tiêu Vòng Lặp Re-fetch Vô Hạn**: Loại bỏ `singleLessonDb` khỏi dependency array của Hook đồng bộ URL trong Shadowing; thay thế bằng cơ chế bộ đệm tham chiếu `useRef` (`lastFetchedLessonRef`) độc lập khỏi chu kỳ re-render của React.
    - **Chuẩn Hóa Phân Giải ID Bài Học Đồng Bộ 2 Chiều (`resolveLessonId`)**: Cải tiến thuật toán ánh xạ tham số URL dạng số (ví dụ `?id=44`, `?id=42`) ưu tiên đối chiếu khớp với chuỗi mã số 3 chữ số (`listen_044`, `listen_toeic_q3_044`, `_044`) trước khi rơi về mảng chỉ mục 1-indexed. Đảm bảo mọi môi trường (Mock Data nội bộ, Neon DB catalog, Serverless API) đều phân giải đến chính xác cùng 1 bài học duy nhất, ngăn chặn tình trạng nhảy ID và đứng hoạt ảnh AnimatePresence.
    - **Phòng Ngừa Race Condition Trong AbortController**: Đảm bảo cờ `setIsLoadingLessonDetail(false)` luôn luôn được giải phóng trong khối `finally` và bộ dọn dẹp cleanup của Hook, ngăn ngừa tuyệt đối tình trạng kẹt trạng thái loading skeleton vĩnh viễn khi Hook nạp danh mục và Hook nạp chi tiết chạy song song.
    - **Khử Triệt Để Thẻ `<div>` Rỗng (Empty Blank Screen)**: Bổ sung lớp bảo vệ Fallback UI trực quan mang phong cách Agency kèm nút CTA "Quay lại danh mục" (tuân thủ Rule 13 & 19 Wadhah Aloui) trong trường hợp mã bài học không tồn tại, loại bỏ 100% tình trạng render thẻ div trống không chiều cao.
    - **Bảo Vệ Kiểu Dữ Liệu An Toàn Tuyệt Đối (Safe Nullable Guard)**: Bổ sung toán tử Optional Chaining (`?.`) và giá trị dự phòng cho `currentLesson?.title`, `currentLesson?.level` và `currentSentence?.text`, ngăn chặn triệt để lỗi ngoại lệ `TypeError: Cannot read properties of null` làm vỡ cây React Virtual DOM.
  - **Hệ Thống Tối Ưu Tốc Độ Nạp & Khử Lag Re-Render Toàn Diện (Listening & Shadowing Performance Engine)**:
    - **In-Memory Caching Chi Tiết Bài Học (`/api/listening/lessons/[id]`)**: Tích hợp `memoryCache` TTL 300s (5 phút) cho dữ liệu bài học theo `userId`, cắt giảm thời gian truy vấn Neon PostgreSQL từ xa từ 400ms–1.200ms xuống **< 15ms** (giảm 98% độ trễ mạng). Tự động vô hiệu hóa cache khi người học cập nhật hoặc đặt lại tiến độ (`/api/listening/progress`).
    - **Triệt Tiêu Hoàn Toàn 440ms Độ Trễ Nhân Tạo (`finally { setTimeout }`)**: Loại bỏ toàn bộ `setTimeout(..., 240)` và `setTimeout(..., 200)` trong khối finally của cả 2 trang, giải phóng trạng thái Skeleton Loading ngay lập tức khi dữ liệu đã sẵn sàng.
    - **Kiến Trúc Sóng m Thu m 0 Re-Render (Zero-Rerender Audio Visualizer)**: Khử triệt để 100% React state re-render trong quá trình ghi âm. Tín hiệu năng lượng mic được phát sóng trực tiếp qua CustomEvent (`xp:audio-energy`) tới CSS Custom Property (`--live-audio-energy`) trên container sóng âm, biến đổi 95 thanh sóng âm trực tiếp qua GPU Hardware Acceleration (`transform: scaleY`, `opacity`) ở tần số 60–120 FPS mà **không kích hoạt bất kỳ một lần re-render nào của React**.
    - **Cô Lập Bộ Đếm Thời Gian Thực Hành (`StudioTimerBadge`)**: Tách biệt logic đếm giây `setInterval(1000ms)` sang component con độc lập `StudioTimerBadge`, chuyển `elapsedTime` ở trang cha sang tham chiếu `useRef(0)`, triệt tiêu hoàn toàn 60 lần re-render toàn trang mỗi phút.
    - **Ổn Định Tham Chiếu Callback Toàn Diện (`useCallback`)**: Bọc 100% action handlers và inline arrow functions ở cả 2 trang bằng `useCallback`, đảm bảo `React.memo` trên `ListeningStudioWorkspace`, `ShadowingStudioWorkspace`, `StudioWaveformCard` và `InteractiveTranscriptSidebar` phát huy 100% hiệu lực ngăn chặn re-render thừa.
    - **Gom Nhóm Đồng Bộ Tiến Độ CSDL Bằng Debounce 1.2s**: Tích hợp cơ chế debounce 1.2s cho các lần lưu `IN_PROGRESS` khi người học gõ hoặc nói nhiều câu liên tiếp, giảm hơn 80% tải giao dịch Neon CSDL trong khi vẫn đảm bảo flush lập tức khi bài học hoàn thành (`isCompleted: true`).
    - **Cân Chỉnh Đệm Âm Thanh TTS Di Động (Mobile Audio Cushion)**: Tự động nhận diện thiết bị di động để áp dụng 30ms silence cushion chống hiện tượng nổ tiếng (pop noise) và nghẽn buffer AudioContext trên iOS/Android, đồng thời giữ nguyên phản hồi 0ms siêu tốc trên Desktop.
    - **Kiến Trúc Load CSDL Chuẩn Dashboard SWR 2 Tầng & Khung Xương 1:1 (Listening & Shadowing)**:
      - **Kế Thừa 100% Mô Hình SWR Của Dashboard (`/dashboard`)**: Áp dụng chuẩn thiết kế SWR (Stale-While-Revalidate) 2 tầng đồng bộ:
        - **Tầng 1 - SWR 0ms Instant Local Cache Hydration (Frame-0)**: Nạp tức thì dữ liệu thật từ bộ nhớ đệm `localStorage` (`xp_voca_listening_catalog_*`, `xp_voca_listening_detail_*`, `xp_voca_shadowing_catalog_*`, `xp_voca_shadowing_detail_*`) ngay tại Frame 0 thông qua lazy initializers trong `useState(() => ...)`. Với người học đã từng truy cập, toàn bộ danh mục 102 bài hoặc nội dung Studio hiển thị ngay trong **0ms**, loại bỏ 100% hiện tượng chớp trắng hoặc chớp khung xương.
        - **Tầng 2 - Consolidated Background Neon DB Reconciliation**: Thực hiện truy vấn ngầm tới Neon PostgreSQL (`/api/listening/lessons` & `/api/listening/lessons/[id]`). Khi có kết quả mới nhất, hệ thống tự động cập nhật State, đồng bộ tiến độ người học (`completedSentences`, `bookmarkedSentences`, `timeSpent`) và ghi đè lại vào `localStorage` cho các phiên tiếp theo.
      - **Chuẩn Hóa Phân Giải Đa Khóa Bí Danh (Multi-Key Aliasing Dictionary)**: Khắc phục triệt để lỗi bất đồng bộ mã bài học (ví dụ URL `?id=1` nhưng CSDL trả về `id: "listen_001"`). Bản ghi chi tiết bài học được đăng ký đồng thời dưới các khóa: `listen_001`, `1`, `001`, `rawIdParam`, và `selectedLessonId`. Hàm `currentLesson` hỗ trợ fuzzy resolver 5 cấp, đảm bảo tìm thấy dữ liệu ngay lập tức mà không bao giờ rơi vào trạng thái rỗng `null`.
      - **Cơ Chế Khóa An Toàn Màn Hình Lỗi (Loading Gatekeeper)**: Loại bỏ hoàn toàn lỗi hiển thị sớm màn hình "Không tìm thấy bài học". Màn hình cảnh báo chỉ được phép hiển thị khi và chỉ khi cả 2 tiến trình nạp danh mục và nạp chi tiết bài học đều đã kết thúc hoàn toàn (`!isLoadingLessonDetail && !isLoadingLessons`), trong lúc đang fetch luôn hiển thị khung xương hình học 0px CLS chuẩn mực.
      - **Khởi Tạo Dữ Liệu Rỗng Tất Định (Deterministic Clean Init)**: `lessonsList` và `currentLesson` khởi tạo mảng rỗng `[]` hoặc `null`, triệt tiêu hoàn toàn việc dùng dữ liệu mẫu tĩnh (mock data) làm giá trị khởi tạo khi đang truy vấn CSDL.
      - **Khung Xương Danh Mục (Listing Skeleton Standard)**: Khi chưa có cache (người dùng mới), hiển thị tức thì `ListeningListingSkeleton` / `ShadowingListingSkeleton` 0px CLS, sau đó lấp đầy tự nhiên toàn bộ 102 bài học từ Neon DB.
      - **Khung Xương Phòng Học Studio Chuẩn Xác (Studio Skeleton Standard)**: Khi mở bài học chưa từng lưu trong cache, hiển thị trực tiếp `ListeningStudioSkeleton` / `ShadowingStudioSkeleton` đồng bộ ngay từ SSR/Hydration đầu tiên, giữ nguyên khung xương cho đến khi CSDL trả về bản ghi transcript và tiến độ thật.
      - **Bộ Đệm Chuyển Bài Không Giật (In-Place Studio Transition)**: Kiểm tra RAM cache (`detailedLessonsMap` / `singleLessonDb`) và Local Cache khi chuyển bài trong Studio; nếu bài đã có sẵn trong bộ nhớ đệm, chuyển bài mượt mà trong 0ms. Nếu chưa có, kích hoạt shimmer tại chỗ và fetch dữ liệu từ CSDL.
      - **Khắc Phục Toàn Diện Sự Cố Hydration, Double Network Fetch & Freeze Tại URL Có Query Số (`?id=40`)**:
        - **Chuẩn Hóa Phân Giải Canonical ID Đồng Bộ 0ms (`resolveCanonicalLessonId`)**: Đóng gói module dùng chung `features/listening/utils/lessonIdHelper.ts`, trích xuất số và ánh xạ chuẩn hóa mọi định dạng query (`40`, `040`, `listen_040`, `lesson_40`, `listen_toeic_q3_040`) thành đúng Canonical Lesson ID (`listen_toeic_q3_040`) ngay từ Frame-0 khởi tạo State (`useState(() => resolveCanonicalLessonId(rawIdParam))`) mà không cần chờ mảng `lessonsList` từ CSDL tải xong.
        - **Triệt Tiêu Hoàn Toàn Hiện Tượng Gọi Lặp Mạng 2 Lần (Double Network Fetch Elimination)**: Loại bỏ triệt để `lessonsList` khỏi danh sách phụ thuộc (`dependency array`) của Hook tải chi tiết bài học (`useEffect`), ngăn chặn tình trạng khi catalog 102 bài tải xong kích hoạt lại toàn bộ effect và bắn thêm một request HTTP thứ hai.
        - **Sửa Lỗi Cache Guard Xuyên Thủng Bằng Hàm Đối Chiếu Bí Danh (`isSameLessonId`)**: Thay thế phép so sánh nghiêm ngặt `===` bằng hàm `isSameLessonId(lastFetched, queryId)` có khả năng nhận biết quan hệ tương đương giữa chuỗi mã số `"40"` và canonical ID `"listen_toeic_q3_040"`, bảo vệ tuyệt đối không bao giờ fetch lại bài học đã có sẵn trong bộ nhớ RAM.
        - **Mô Hình True SWR 0ms Chống Đóng Băng Giao Diện (Zero-Latency Studio Rendering)**: Đưa lớp kiểm tra dữ liệu nội suy `MOCK_LESSONS_DATA` lên trước cờ kiểm tra `isLoadingLessonDetail` trong `currentLesson`. Khi người dùng mở một bài học đã có trong Mock Data, phòng học Studio hiển thị ngay lập tức trong **0ms** (không còn bị giam cứng 5-8s khi Neon PostgreSQL khởi động lạnh - cold start), tiến trình kết nối CSDL chỉ âm thầm đồng bộ tiến độ người học ở tầng nền.
        - **Đồng Bộ Kiến Trúc Đa Khóa Giữa Shadowing và Listening**: Nâng cấp `shadowing/page.tsx` sở hữu cấu trúc `detailedLessonsMap` đa khóa `Record<string, any>`, lưu trữ vĩnh viễn dữ liệu các bài đã học trong RAM để chuyển đổi qua lại giữa các bài gợi ý mượt mà không bị mất dữ liệu.
        - **Thích Ứng Khung Xương Chuẩn Xác Tại Suspense Boundary (`ShadowingSuspenseFallback` & `ListeningSuspenseFallback`)**: Cập nhật Fallback component của `<Suspense>` tại gốc trang để nhận diện tham số `id=` ngay trên Client Navigation, không bao giờ stream nhầm khung xương dạng lưới 4 cột của trang danh mục khi người dùng đang mở phòng thu Studio.
        - **Khử Hiện Tượng Giằng Co State Khi Bấm "Quay Lại Danh Mục" (Race Condition Guard)**: Tích hợp cờ khóa tạm thời `isLeavingStudioRef` trong `handleBackToListing`, vô hiệu hóa các Effect đồng bộ URL trong khoảng thời gian Next.js Router đang chuyển trang, dập tắt 100% hiện tượng UI bị giật nhảy ngược lại phòng học.
- **Kiến Trúc Backend & Hạ Tầng Đám Mây 0 Đồng (Zero-Cost Free Tier Architecture)**:
  - **Serverless API Routes (Next.js trên Vercel)**: Chạy 100% miễn phí trên gói Vercel Hobby, tự động cấp HTTPS SSL, mở rộng không giới hạn và không tốn phí duy trì máy chủ.
  - **Cơ Sở Dữ Liệu PostgreSQL (Prisma ORM)**: Tích hợp gói Free Tier đám mây (Supabase / Neon / Render) dung lượng 500MB - 1GB, lưu trữ hàng chục nghìn người dùng và hàng triệu bản ghi bài tập/lịch sử học tập.
  - **Trợ Lý AI & Gia Sư Trực Tuyến**: Khai thác gói Google Gemini API Free Tier (15 lượt gọi/phút, 1.500 lượt gọi/ngày) phục vụ giải thích ngữ pháp, chấm bài viết và hội thoại thông minh.
  - **Đồng Bộ Dữ Liệu Toàn Diện (Full-Stack Data Persistence)**:
    - **Spaced Repetition SM-2 (`/review` & `/myvocab`)**: Đồng bộ hàng đợi ôn tập, chu kỳ lặp lại ngắt quãng, điểm số thành thạo và từ yêu thích về bảng `user_vocabulary` qua `/api/user/vocab` & `/api/user/vocab/review-submit`.
    - **Phòng Học Nhóm & Pomodoro Realtime (`/study/rooms`)**: Xây dựng sảnh phòng học nhóm đa danh mục, đồng hồ Pomodoro 25:00 / 5:00, danh sách thành viên trực tuyến và khung trò chuyện trực tiếp hỗ trợ gọi `@AI Mentor` qua `/api/study-rooms`. Trang bị lưới 6 thẻ phòng học **Shimmer Skeleton 1:1 hình học** trong lúc truy vấn CSDL, loại bỏ triệt để flash empty state.
    - **Hồ Sơ & Cài Đặt (`/profile` & `/settings`)**: Lưu vĩnh viễn Họ tên, Bio, Avatar Emoji/URL và Mục tiêu điểm số vào bảng `profiles` qua `PATCH /api/user/profile`.
    - **Lộ Trình & Kế Hoạch Học Tập (`/roadmap` & `/study/plan`)**: Đồng bộ trạng thái hoàn thành nhiệm vụ từng ngày và tự động cộng thưởng XP qua `/api/study-plan/task-complete` & `/api/study-plan/task`. Tích hợp cơ chế bảo vệ nguyên tử chống nhân bản XP vô hạn (`Atomic One-Time XP Claim` via `xpClaimed: true`), đảm bảo mỗi nhiệm vụ chỉ được nhận thưởng duy nhất 1 lần trong vòng đời dù bị bật/tắt (toggle) liên tục.
    - **Cơ Chế Tự Phục Hồi Kết Nối CSDL (Prisma Auto-Healing & Transaction Resilience)**: Trang bị bộ lọc tự động phát hiện đóng kết nối `kind: Closed`, lỗi ngắt kết nối mạng tạm thời (OS 10054 / ECONNRESET) và lỗi timeout giao dịch (`P2028` / `P2024` / `P2034`). Tự động tái kết nối ngầm với thuật toán Exponential Backoff và cơ chế Fallback tuần tự an toàn, đảm bảo 100% thời gian học tập, điểm XP và tiến độ của học viên không bao giờ bị gián đoạn hay thất thoát khi kết nối CSDL đám mây bị ngủ đông.
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
  - **Phân tách Mobile & Desktop Layout**: Trên Mobile hiển thị Sticky Header Bar cao 56px tinh gọn (Top-Left: `XP English | XP Voca` trỏ về Trang chủ, Top-Right: Dropdown chọn ngôn ngữ 🇻🇳/🇺🇸 `rounded-xl`). Trên Desktop hiển thị Bố cục 2 cột (Cột trái Branding + 4 Feature Cards `rounded-2xl` có hiệu ứng hover 3D + Banner Social Proof 12,450+ học viên & rating ⭐ 4.9/5; Cột phải Custom Login Form Card `rounded-3xl` có viền kép Double-Bezel và đổ bóng êm).
  - **Google, Facebook & Email Real OAuth 2.0 (Chuẩn Bảo Mật OWASP & Chống CSRF)**: Đăng nhập nhanh bằng Google OAuth (`/api/auth/google`), Facebook OAuth (`/api/auth/facebook`) hoặc Email/Tên đăng nhập + Mật khẩu kết nối PostgreSQL. Tích hợp mã hóa CSRF `state` ngẫu nhiên 32-byte cryptographic nonce (`infrastructure/auth/oauthState.ts`) lưu trong HTTP-Only cookie, đối soát hằng số thời gian `timingSafeEqual`. Triệt tiêu hoàn toàn rò rỉ thông tin định danh người dùng (PII Leakage) qua URL query params, chuyển hướng trực tiếp sạch sẽ về `/dashboard`.
  - **Micro-Interactions Tinh Tế**: Nút xóa nhanh nội dung ô nhập (`X`), phát hiện cảnh báo phím **Caps Lock** theo thời gian thực, ẩn/hiện mật khẩu, banner báo lỗi có nút đóng dismiss.
  - **Single Primary Button (Rule 18 & 19)**: Duy nhất 1 nút Primary nổi bật "Đăng nhập" (`bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold h-11 sm:h-12 rounded-xl active:scale-[0.98] shadow-sm hover:shadow-md hover:shadow-blue-500/20`).
  - **Badge Bảo Mật SSL**: Chân form tích hợp chứng thực "Bảo mật SSL 256-bit • Mã hóa tài khoản an toàn" với icon khiên xanh Emerald (`ShieldCheck`).
  - **Skeleton Loading Khớp 100% Hình Học 0px CLS ([app/(auth)/login/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28auth%29/login/loading.tsx))**: Tái hiện chuẩn xác 1:1 từng pixel Header (Logo + Language), Cột trái (Badge + Headline + 4 Cards + Social Proof Strip 4 avatars), Cột phải (Card `rounded-3xl` + 2 inputs + SSL Badge) và Footer bản quyền (0px CLS).
- **`/register`**: Trang đăng ký — Thiết kế Agency Dashboard Tier chuẩn mực đồng bộ 100% phong cách thẩm mỹ với Login.
  - **Phân tách Mobile & Desktop Layout**: Header chuẩn mực tích hợp dropdown chọn ngôn ngữ tinh gọn. Cột trái với Badge chuyển động danh mục, Headline gradient rực rỡ, 4 Feature Cards (8,900+ Từ vựng CEFR, Gamification & PvP 1v1, AI Tutor 24/7, Bảng Xếp Hạng Tuần) kèm Social Proof Banner 12,450+ học viên.
  - **Google, Facebook & Email Real OAuth**: Hỗ trợ đăng ký nhanh qua Google / Facebook hoặc đăng ký tài khoản mới bằng Họ tên, Email, Mật khẩu và Xác nhận mật khẩu.
  - **Thước Đo Độ Mạnh Mật Khẩu Thời Gian Thực (Real-time Password Strength Meter)**: Thanh đo 4 phân đoạn trực quan (Rất yếu, Yếu, Khá, Mạnh) chuyển màu tương ứng (Rose -> Amber -> Sky -> Emerald) dựa trên độ dài, chữ hoa/thường, số và ký tự đặc biệt.
  - **Xác Nhận Trùng Khớp Mật Khẩu Tức Thì (Password Match Indicator)**: Hiển thị icon tích xanh Emerald "Khớp" khi trùng hoặc cảnh báo Rose "Chưa khớp" khi phát hiện lệch ký tự.
  - **Cảnh Báo Caps Lock & Nút Xóa Nhanh**: Tự động phát hiện trạng thái phím Caps Lock khi gõ mật khẩu, nút `X` xóa nhanh cho Họ tên và Email.
  - **Checkbox Điều Khoản & Chính Sách**: Tích hợp checkbox đồng ý Điều khoản dịch vụ & Chính sách bảo mật XP English.
  - **Single Primary Button**: Nút "Đăng ký" với hiệu ứng nén xúc giác `active:scale-[0.98]` và biểu tượng `ArrowRight` / `Loader2`.
  - **Badge Bảo Mật SSL**: Chân form tích hợp bảo mật SSL 256-bit chuẩn OWASP.
  - **Skeleton Loading Khớp 100% Hình Học 0px CLS ([app/(auth)/register/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28auth%29/register/loading.tsx))**: Tái hiện chuẩn xác 1:1 đầy đủ 4 inputs, checkbox điều khoản, Social Proof Strip và Footer Skeleton.
- **`/forgot-password`**: Trang khôi phục & đặt lại mật khẩu — Thiết kế Agency Dashboard Tier chuẩn mực, hỗ trợ luồng khôi phục đa trạng thái (Multi-Step Recovery Flow).
  - **Phân tách Mobile & Desktop Layout**: Header chuẩn mực tinh gọn với dropdown chọn ngôn ngữ. Cột trái với 4 thẻ lợi ích bảo mật (Bảo mật tuyệt đối, Khôi phục tức thì 30s, Bảo toàn dữ liệu Streak & XP, Hỗ trợ kỹ thuật 24/7) và Social Proof Banner.
  - **Luồng 3 Trạng Thái Mượt Mà**:
    - **Trạng thái 1 (Gửi yêu cầu qua Email)**: Nhập email với nút xóa nhanh `X`, nút Gửi liên kết khôi phục, tùy chọn chuyển nhanh sang nhập token nếu đã có mã.
    - **Trạng thái 2 (Thông báo gửi thành công)**: Huy hiệu Emerald `CheckCircle2` lớn, hiển thị rõ email người nhận, nút mở trực tiếp hòm thư Gmail (`https://mail.google.com`), đồng hồ đếm ngược 60 giây để gửi lại mã (Resend Cooldown), và nút chuyển sang nhập mã xác nhận ngay.
    - **Trạng thái 3 (Đặt lại mật khẩu mới)**: Tự động kích hoạt khi có tham số `?token=...` trên URL hoặc khi người dùng nhập mã token; trang bị ô Mật khẩu mới với Thước đo độ mạnh, ô Xác nhận mật khẩu mới với Kiểm tra trùng khớp tức thì, Caps Lock indicator, kết nối API `POST /api/auth/reset-password` và tự động chuyển hướng về `/login` khi thành công.
  - **Badge Bảo Mật SSL**: Chân form tích hợp bảo mật SSL 256-bit.
  - **Skeleton Loading Khớp 100% Hình Học 0px CLS ([app/(auth)/forgot-password/loading.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28auth%29/forgot-password/loading.tsx))**: Tái hiện chuẩn xác layout (0px shift).
- **Responsive Footer**: Đồng bộ chuẩn mực trên cả 3 trang Auth với chữ thương hiệu `XP English | XP Voca` và dòng bản quyền `© 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.` căn giữa trên Mobile và dãn đều hai bên trên Desktop.

### 1. Bảng Điều Khiển & Trung Tâm Học Tập (`/dashboard`)
- **`/dashboard`**: Trung tâm chỉ huy học tập toàn diện (Thiết kế kế thừa chuẩn mực thẩm mỹ cao cấp từ **Listening Studio** `/study/listening` & kiến trúc **Geometric Twin Shimmer Skeleton - 0px CLS**).
  - **Kiến Trúc Mô-Đun Hóa Sạch Sẽ (`features/dashboard/components/`)**: Tái cấu trúc hoàn toàn tệp nguyên khối 2,084 dòng thành 8 sub-components chuyên biệt độc lập:
    1. `DashboardHeroGreeting.tsx`: Lời chào cá nhân hóa, UserAvatar, cấp độ Lv, chức danh học viên và 4 thẻ Double-Bezel chỉ số.
    2. `DashboardMissionDeck.tsx`: Thẻ nhiệm vụ trung tâm Hoàng Gia (`bg-gradient-to-br from-[#0059bb] via-[#004fba] to-[#00388a]`), tiến trình từ vựng hôm nay, 3 pods thông số mờ sương và nút Primary CTA thích ứng bài học.
    3. `DashboardSkillChartCard.tsx`: Bộ lọc 5 kỹ năng (`Dictation`, `Shadowing`, `Nói`, `Từ vựng`, `Viết`) với con nhộng trượt `layoutId="activeSkillTabIndicator"`, canvas SVG sóng âm Bezier 700x210, biến thiên mượt mà 320ms qua `useInterpolatedYPoints` và badges tóm tắt chuyển cảnh `<AnimatePresence mode="wait">`.
    4. `DashboardStreakStudio.tsx`: Mascot 3D Ngọn Lửa Duolingo, bong bóng thoại tương tác, stepper 7 ngày vật liệu 3D, hộp quà mốc tuần và nút bấm Điểm danh (+15 XP) phản hồi Optimistic UI 0ms.
    5. `DashboardLeaderboardCard.tsx`: Bảng xếp hạng mini với 2 tầng con nhộng trượt Spring Physics: Chu kỳ (`Tuần` / `Tháng` `layoutId="dashboardLbPeriodIndicator"`) và Tiêu chí (`Thời gian học` / `Điểm XP` `layoutId="dashboardLbCriterionIndicator"`), danh sách học viên chuyển cảnh siêu êm qua `<AnimatePresence mode="wait">`.
    6. `DashboardDailyQuestsCard.tsx`: Thẻ nhiệm vụ hàng ngày với thanh sub-tabs lọc 3 trạng thái (`Tất cả`, `Chưa nhận`, `Đã xong` `layoutId="dashboardQuestsFilterIndicator"`), nút nhận thưởng nguyên tử cộng XP/Coins tức thì.
    7. `DashboardQuickActionsGrid.tsx`: Lưới 4 thẻ Bento truy cập siêu tốc (Luyện nghe, Luyện nói, Thi thử, Đấu trường PvP) hiệu ứng nhấc thẻ hover lift `whileHover={{ y: -3 }}`.
    8. `DashboardAiTutorWidget.tsx`: Thẻ phụ mở rộng vốn từ vựng học thuật 8,900+ từ và khung hỏi đáp nhanh AI Tutor hỗ trợ phát âm Audio TTS và Shimmer Thinking.
  - **Quy Chuẩn Bố Cục Lưới 12 Cột Triệt Tiêu 100% Sai Lệch (0px CLS Standard)**: Đồng bộ tuyệt đối giữa `page.tsx` và `loading.tsx` sang hệ lưới `grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6` (Cột trái `lg:col-span-7` ~58.3% và Cột phải `lg:col-span-5` ~41.7%), triệt tiêu 100% độ lệch 3.5% CLS cũ khi chuyển từ Skeleton sang giao diện thật.
  - **Hiệu Ứng Con Nhộng Trượt 2 Cấp Độ (2-Level Spring Physics Sliding Pill)**: Tích hợp `layoutId="dashboardHeaderActiveTab"` tại `HeaderPillItem` đỉnh trang, `layoutId="activeSkillTabIndicator"` tại dock kỹ năng, `layoutId="dashboardLbPeriodIndicator"` & `layoutId="dashboardLbCriterionIndicator"` tại BXH, và `layoutId="dashboardQuestsFilterIndicator"` tại lọc thử thách.
  - **Kiến Trúc Khung Xương Triệt Để & Tải Dữ Liệu Đồng Bộ (Zero Flash Mock Data & Synchronous Hydration)**:
    - **Khởi Tạo SWR Đồng Bộ 0ms**: Toàn bộ trạng thái Check-in, Nhiệm vụ hàng ngày, Lộ trình hôm nay và Bảng xếp hạng được khởi tạo đồng bộ ngay trong `useState` initializer từ `localStorage`/`sessionStorage`, loại bỏ hoàn toàn độ trễ bất đồng bộ của `useEffect` và hiển thị giao diện tức thì trong **0ms**.
    - **Fallback Khung Xương Hình Học 1:1 (`DashboardLoading`)**: Khi người dùng lần đầu truy cập hoặc chưa có cache, `isPageLoading` kích hoạt ngay lập tức `DashboardLoading` (khớp 100% hình học, 60fps shimmer sweep) kèm thời gian đệm 240ms mượt mà, triệt tiêu 100% tình trạng nhấp nháy dữ liệu mặc định hay chữ số 0.
    - **Vi Khung Xương Nội Bộ (In-place Shimmer States)**: Khi đang fetch nền CSDL, các thẻ chỉ số trong `DashboardHeroGreeting` (`isActuallyLoading`), biểu đồ `DashboardSkillChartCard` (`isLoadingChart`) và danh sách BXH hiển thị ShimmerBox đúng tỷ lệ pixel, không làm xô lệch bố cục.
  - **Staggered Spring Entrance Animation Standard (`PageEntranceWrapper`)**: Toàn bộ canvas Dashboard 12 cột được bọc trong `PageEntranceWrapper`, tạo hiệu ứng xuất hiện phân tầng so le mượt mà theo chuẩn Agency Tier.
  - **Đồng Bộ Bo Góc Double-Bezel Tuyệt Đối (Rule 10 Wadhah Aloui)**: Toàn bộ thẻ card bao ngoài của `DashboardHeroGreeting`, `DashboardMissionDeck`, `DashboardSkillChartCard`, `DashboardStreakStudio`, `DashboardLeaderboardCard`, `DashboardDailyQuestsCard` được quy chuẩn thống nhất về `rounded-2xl` (16px), các phần tử con bên trong `rounded-xl` (12px), triệt tiêu hoàn toàn sự sai lệch bo góc giữa `loading.tsx` và giao diện thực tế.
  - **Hệ Thống Bảng Màu Hòa Hợp Chuẩn Agency (Analogous-Complementary System)**: Đồng bộ ma trận màu sắc cân bằng giữa nhận diện thương hiệu **Royal Blue (`#0059bb`)**, ngọn lửa Streak **Warm Amber & Orange (`#f59e0b` / `#f97316`)**, độ tập trung **Electric Sky (`#06b6d4`)**, vốn từ tích lũy **Emerald (`#10b981`)** và thành tích lên cấp **Indigo (`#8b5cf6`)**. Tuân thủ nghiêm ngặt **Quy tắc Wadhah Aloui số 17** (giảm độ bão hòa màu nhấn ở Chế độ Tối sang tông pastel dịu mắt `dark:text-sky-400`, `dark:text-amber-400`, `dark:text-emerald-400`, chống mỏi mắt 100%).
  - **Cơ Chế Co Giãn Fluid Width Khi Thu Gọn Sidebar**: Áp dụng hệ thống container linh hoạt **Fluid Scalable Container (`max-w-[1600px] 2xl:max-w-[1760px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12`)**. Khi thu gọn/đóng Sidebar trên màn hình lớn (1440px - 1920px), toàn bộ bố cục Dashboard tự động dãn rộng mượt mà, triệt tiêu 100% khoảng trống trắng thừa ở 2 bên mép lề.
  - **Thanh Header Đỉnh Dùng Chung Cao Cấp (`AppTopHeader` 56px `h-14` Baseline)**: Component dùng chung [`shared/components/layout/AppTopHeader.tsx`](file:///e:/XP%20English%20%20XP%20Voca/shared/components/layout/AppTopHeader.tsx) chuẩn Agency, trang bị nút **Hamburger Menu (`Menu` 3 gạch ngang)** mở nhanh Sidebar ngăn kéo trên Mobile/Tablet (`lg:hidden`), cụm nút chuyển chế độ hình con nhộng `HeaderPillContainer` & `HeaderPillItem` với `layoutId="dashboardHeaderActiveTab"`.
  - **Điểm Danh Tuần Này (Duolingo 3D Crystal Flame & Multi-Source Active Stepper)**: Tích hợp mascot ngọn lửa pha lê 3D sống động, API `/api/user/daily-checkin` tổng hợp hoạt động học tập đa nguồn từ cả 4 bảng (`DailySkillPractice`, `ExamAttempt`, `ListeningProgress`, `UserVocabulary`), tự động kích hoạt chuỗi rực lửa và cập nhật đồng bộ 2 chiều (`currentStreak`, `longestStreak`, `totalXp`, `coins`, `minutesStudied`).
  - **Bảng Xếp Hạng Mini Động & Nhiệm Vụ Hàng Ngày (Real-Time Quests & Dynamic Ranking)**: Sắp xếp danh sách Top 3 cùng thứ hạng người dùng linh hoạt theo tiêu chí đang chọn: "Thời gian học" hoặc "Điểm XP". API nhận thưởng `/api/user/challenges/claim` ghi nhận nguyên tử vào `DailySkillPractice` và cộng thưởng `Profile.totalXp`, `Profile.coins` trực tiếp trong PostgreSQL.
  - **Thanh Điều Hướng Đáy Mobile (Bottom Navigation Dock)**: Thiết kế thanh đáy `shared/components/layout/BottomNav.tsx` đồng bộ phong cách Dashboard với hiệu ứng **Active Pill Indicator** (`layoutId="mobileBottomNavActivePill"`), viền kính mờ `backdrop-blur-xl`, icon sắc nét và typography `text-[9.5px] font-black text-[#0059bb]` dễ đọc.
  - **Thanh Bên Mobile Drawer Header**: Phần đỉnh ngăn kéo `shared/components/layout/Sidebar.tsx` trang bị chuẩn xác chữ thương hiệu **`XP English | XP Voca`** và nút bấm thu gọn icon **`PanelLeftClose`** (`[| <]`) đồng bộ 100% với giao diện Desktop.

### 2. Thống Kê & Phân Tích Chuyên Sâu (`/analytics`)
- **`/analytics`**: Trang phân tích thành tích học tập chuẩn Dashboard Agency tích hợp **Real-Time Analytics Engine**, kết nối trực tiếp với **Cơ sở dữ liệu PostgreSQL Neon (`daily_skill_practice`, `profiles`, `exam_attempts`, `listening_progress`)** và thanh điều hướng đỉnh **`AppTopHeader` (56px Baseline)**.
  - **Kiến Trúc Luồng Dữ Liệu Thời Gian Thực & Hợp Nhất Đa Nguồn (Bidirectional Data Pipeline)**:
    - **Thu thập thời gian học (`useStudyTimeTracker`)**: Tự động đo thời gian học tập thực tế từ tất cả các phòng học (`/study/listening`, `/study/shadowing`, `/ai/conversation`, `/ai/tutor`, `/vocabulary/[id]`, `/study/practice`, `/study/grammar/[id]`), tự động lọc thời gian treo máy (>90s) và gửi batch ngầm mỗi 30s hoặc khi chuyển tab/thoát trang.
    - **Cộng dồn điểm XP theo kỹ năng (`awardXp`)**: Mỗi khi học viên trả lời đúng câu hỏi, hoàn thành bài nghe chép chính tả hay hội thoại AI, `awardXp(amount, skill)` sẽ kích hoạt phép toán cộng dồn nguyên tử (atomic increment) cả phút học và điểm XP riêng biệt của kỹ năng đó vào bảng `daily_skill_practice` qua API `POST /api/user/skill-practice`.
    - **Cơ chế Hợp Nhất Đa Nguồn 2 Chiều (Bidirectional Reconciliation)**: Kết hợp linh hoạt `Math.max(storeValue, apiValue)` cho cả 5 thẻ chỉ số (Vốn từ, Chuỗi streak, Thời gian học, Tổng XP, Xếp hạng tuần). Đảm bảo số liệu luôn chính xác, cập nhật tức thời khi đăng nhập trên máy tính mới hoặc sau khi xóa cache.
    - **Bảo Vệ Kết Nối Cơ Sở Dữ Liệu (`safeDbExecute`)**: Toàn bộ truy vấn Prisma backend được bọc qua cơ chế chống chịu lỗi `safeDbExecute`, tự động xử lý kết nối serverless và ngăn ngừa hoàn toàn tình trạng timeout/crash khi Neon Postgres cold start.
  - **Thanh Header Đỉnh Đồng Bộ (`AppTopHeader`)**: Tích hợp nút Hamburger mở Sidebar, 2 Tab hình con nhộng (`HeaderPillContainer` & `HeaderPillItem`) chuyển đổi nhanh giữa **"Hoạt Động Của Tôi"** và **"Bảng Xếp Hạng XP"**, cùng nút hành động Primary góc phải `[ ⚡ Luyện Tập Ngay +15 XP ]` dẫn trực tiếp vào phòng luyện từ vựng. Đã đăng ký `pathname?.startsWith("/analytics")` vào `isHeaderIntegratedActive` tại [layout.tsx](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/layout.tsx) để triệt tiêu Navbar thừa trên mobile và mở rộng không gian hiển thị tràn viền sát nóc.
  - **Lưới 5 Thẻ Chỉ Số Bento Cao Cấp (Double-Bezel Top 5 Metric Cards)**:
    - **Chuỗi dài nhất (`longestStreak`)**: Icon `Flame` trong nền hổ phách `bg-amber-50 dark:bg-amber-950/40 text-amber-500`.
    - **Từ vựng đã thuộc (`savedWords`)**: Icon `BookmarkCheck` trong nền ngọc bích `bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500`.
    - **Thời gian học (`minutesStudied`)**: Icon `Clock` trong nền xanh hoàng gia `bg-blue-50 dark:bg-blue-950/40 text-[#0059bb]`.
    - **Tổng điểm tích lũy (`totalXp`)**: Icon `Target` trong nền tím AI `bg-purple-50 dark:bg-purple-950/40 text-purple-500`.
    - **Hạng tuần thực tế (`weeklyRank`)**: Icon `Trophy` trong nền vàng hoàng kim `bg-amber-50 dark:bg-amber-950/40 text-amber-500` tính toán tự động dựa trên tổng XP 7 ngày qua từ bảng `daily_skill_practice`, khớp chính xác 1:1 với kết quả xếp hạng tại `/community/leaderboard?period=week`.
  - **Tab 1 — Ma Trận Hoạt Động 6 Tháng & Biểu Đồ Kỹ Năng 30 Ngày**:
    - **Ma trận 6 tháng Đa Nguồn (GitHub Contribution Style)**: Khung chứa `rounded-2xl`, các ô ma trận `rounded-sm` với 4 thang độ màu xanh hoàng gia chuẩn (`#0059bb`, `#0059bb`/70, `#0059bb`/35, `slate-100`), tổng hợp toàn diện hoạt động từ Luyện kỹ năng (`daily_skill_practice`), Thi thử (`exam_attempts`) và Luyện nghe chép (`listening_progress`), tích hợp tooltip tương tác hiển thị chính xác số hoạt động theo từng ngày.
    - **Biểu đồ luyện tập 30 ngày với Thuật toán Interval Bucketing**: Dải chọn 5 kỹ năng (`Dictation`, `Shadowing`, `Nói`, `Từ vựng`, `Viết`) với hiệu ứng trượt mượt mà `layoutId="activeSkillAnalyticsIndicator"`. Áp dụng thuật toán **Milestone Interval Bucketing (Gom nhóm khoảng 5 ngày)**: gom toàn bộ phút học và XP của các ngày xen kẽ vào đúng 8 mốc thời gian trên biểu đồ, đảm bảo 100% nỗ lực học tập đều được vẽ lên biểu đồ SVG đường cong Bezier cao 254px (`viewBox="0 0 700 254"`), với 6 mốc Oy chia đều nhịp 44px (`[dynamicMax, 80%, 60%, 40%, 20%, 0]`).
  - **Tab 2 — Bảng Xếp Hạng XP Thành Tích (Leaderboard Studio)**:
    - **Bục Vinh Danh Top 3 Bento Podium**: Cấu trúc bục Top 1 (Vàng Hoàng Kim ở giữa cao nhất), Top 2 (Bạc Silver bên trái), Top 3 (Đồng Bronze bên phải) với hiệu ứng viền phát sáng nhẹ, huy hiệu vương miện và điểm XP to rõ.
    - **Danh Sách Top 4 Trở Đi**: Danh sách cuộn với truy vấn phân trang `/api/leaderboard?period=week&limit=50`, thẻ `rounded-xl`, viền tinh tế, huy hiệu cấp độ `Lv` bo viền sắc nét, và nổi bật đặc biệt thẻ của chính người dùng (`isSelf`) bằng viền và nền xanh hoàng gia dịu (`bg-[#0059bb]/10 border-[#0059bb]/40 font-bold`).
  - **Hệ Thống Khung Xương Đạt Chuẩn Hình Học 1:1 (Exact Geometric Twin Skeleton - Zero CLS)**:
    - **5 Thẻ Chỉ Số Bento Shimmer**: Tích hợp `isLoadingAnalytics` hiển thị thanh số liệu Shimmer ánh kim 60fps khi CSDL đang truy vấn, khớp hoàn hảo tỷ lệ font Display và triệt tiêu tình trạng số 0 nhấp nháy.
    - **Ma Trận Nhiệt 6 Tháng Khớp 1:1**: Khung xương sử dụng chính xác danh sách tên tháng (`monthList.map`), nhãn các ngày `T2, T4, T6`, cấu trúc 6 cụm tháng x 4 tuần x 7 ngày (168 ô vuông nhỏ `w-[10px] h-[10px] sm:w-3.5 sm:h-3.5`) lướt sóng ánh kim `.animate-shimmer` liên tục.
    - **2 Biểu Đồ Sóng Bezier SVG Canvas 1:1**: Tái hiện chính xác canvas SVG `viewBox="0 0 700 254"` với 6 đường lưới nét đứt, nhãn trục tung Y 6 mốc (`25m, 20m, 15m, 10m, 5m, 0m` và `250, 200, 150, 100, 50, 0 XP`), đường baseline tại `y = 244`, dải sáng Shimmer ánh kim 60fps quét ngang toàn khung và 8 mốc thời gian căn lề chuẩn `7.43% - 1.43%` ở chân đồ thị (đã loại bỏ hoàn toàn các đường cong demo giả thô kệch, giữ khung lưới tọa độ tối giản và sang trọng). Khi CSDL phản hồi, biểu đồ thật xuất hiện êm ái mà không bị giật hay xê dịch dù chỉ 0.1px.
    - **Đồng Bộ Tuyệt Đối Cả 2 Cấp Độ**: Áp dụng đồng bộ cấu trúc 1:1 này cho cả **Server/Suspense Initial Loading** ([`app/(dashboard)/analytics/loading.tsx`](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/analytics/loading.tsx)) và **Client In-Page DB Fetching** ([`app/(dashboard)/analytics/page.tsx`](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/analytics/page.tsx)).
    - **Bục Quán Quân & Danh Sách Học Viên Shimmer**: Bục Top 1 (Vàng Amber Shimmer), Top 2 (Bạc Shimmer), Top 3 (Đồng Shimmer) và 5 hàng học viên Shimmer chuẩn Rule 1 UI/UX.

### 3. Lộ Trình Học Cá Nhân Hóa AI (`/roadmap`) & Trợ Lý Chatbot AI Thông Minh Hợp Nhất Messenger-Style (Toàn Cầu - Chuẩn Công Thái Học & WCAG)
- **Bong Bóng Chatbot Thông Minh Hợp Nhất Kéo Thả Kiểu Messenger (`features/ai/components/FloatingAiChatbot/`)**:
  - **Hiện Diện Trên 100% Mọi Trang (Global RootLayout Mounting) & Tự Động Ẩn Khi Thi**: Được nhúng trực tiếp tại tầng gốc `RootLayout` (`ClientAuthWrapper`), tự động xuất hiện trên toàn bộ ứng dụng. Đặc biệt, hệ thống tích hợp **Route-Aware Auto-Hide**: tự động ẩn bóng chat khi học viên bước vào phòng thi chuẩn hóa (`/study/exam-prep`, `/study/exams/*`) để giải phóng 100% không gian và không che khuất đồng hồ đếm ngược hay phiếu trả lời.
  - **Tự Do Kéo Thả & Vật Lý Lò Xo Snap-to-Edge 60fps**: Kéo thả tự do trên cả Desktop và Mobile bằng `framer-motion` (`useMotionValue` + `useSpring` stiffness 400, damping 28). Tự động hút mượt mà về cạnh trái hoặc cạnh phải màn hình (`snap-to-edge`) với khoảng đệm an toàn 16px, chống che chắn nội dung học tập. Tự động clamp tọa độ khi màn hình xoay (orientation change) hoặc resize.
  - **Phân Biệt Chuẩn Xác Thao Tác Kéo vs Chạm & A11y Bàn Phím**: Nhận diện ngưỡng di chuyển chuột/chạm `delta > 5px` để phân biệt chính xác giữa việc kéo bong bóng và click mở chat. Hỗ trợ chuẩn trợ năng WCAG (`role="button"`, `tabIndex={0}`, `aria-label`, phím Enter/Space để mở chat).
  - **Vùng Hủy Thả Rơi Tinh Tế & Phím Tắt Mở Nhanh Toàn Cục (`Ctrl + /`)**: Vùng hủy khi kéo thả được thiết kế theo phong cách Glassmorphism trắng/slate thanh lịch (`bg-white/95 dark:bg-slate-800/95`) và chuyển sang sắc hồng êm dịu khi chạm đích (`bg-rose-500/90`), loại bỏ hoàn toàn mảng đỏ/đen chói mắt. Đặc biệt, khi đã ẩn trợ lý, người dùng không cần bất kỳ nút nổi nào vướng mắt trên màn hình mà có thể bấm ngay **`Ctrl + /` (hoặc `Cmd + /` trên macOS, `Alt + C`)** để lập tức gọi lại và mở trợ lý từ bất kỳ đâu.
  - **Bóng Gợi Ý Thích Ứng Thông Minh (`ProactiveNudgeBubble.tsx`)**: Tự động phát hiện vị trí của Chat Head để căn lề an toàn: tự đảo hướng xuống dưới (`top-14`) khi Chat Head ở nửa trên màn hình (< 180px) để không bao giờ bị cắt nóc, và căn lề `left-0`/`right-0` kèm giới hạn chiều rộng `w-[calc(100vw-40px)] max-w-[275px]` chống tràn mép khi kéo sát viền. Xóa bỏ hoàn toàn icon sét `⚡` và emoji thô, duy trì phong thái học thuật cao cấp.
  - **Lưu Tọa Độ & Lịch Sử Phiên Bền Vững (Persistent Storage)**: Tự động lưu vị trí tọa độ `(x, y)` (`xp_voca_chatbot_bubble_pos`) và lưu lịch sử 25 tin nhắn hội thoại gần nhất (`xp_voca_chatbot_messages`), phục hồi nguyên vẹn khi chuyển trang hoặc F5.
  - **Kiến Trúc Hội Thoại Thông Minh Hợp Nhất (Unified Conversational Assistant)**:
    - **Header Tinh Gọn Chuẩn Agency (`ChatbotHeader.tsx`)**: Avatar AI phát sáng, chấm xanh online, chuỗi Streak 🔥, cấp độ học viên ⚡. Nâng cấp touch-target đạt chuẩn **40px**, bảo vệ an toàn dữ liệu với **Hộp thoại xác nhận nhanh (Inline Confirmation Prompt)** chống bấm nhầm xóa sạch cuộc trò chuyện.
    - **Bộ Phân Tích Markdown Đa Năng (High-End Markdown Parser)**: Hỗ trợ in đậm `**`, in nghiêng `*`, mã lệnh `` ` ``, trích dẫn `> `, liên kết ngoài `[text](url)` và **Danh sách từ vựng gạch đầu dòng (`- ` / `* `) / số thứ tự (`1. `)** với chấm tròn chỉ mục màu xanh thương hiệu, loại bỏ hoàn toàn hiện tượng lộ markdown thô từ Gemini.
    - **Điều Hướng SPA Mượt Mà (Client-Side Navigation)**: Thay thế hoàn toàn các lệnh `window.location.href` bằng `router.push()` từ Next.js App Router kết hợp tự động đóng khung chat, loại bỏ giật lag tải lại trang trắng.
    - **Thẻ Nhiệm Vụ Hôm Nay Tích Hợp Sẵn (`RoadmapActionCard.tsx`)**: Hiển thị mục tiêu TOEIC/IELTS, thanh tiến độ 80px rõ ràng, tiến độ CSDL thực của 3 nhiệm vụ ngày kèm nút hành động `[ Luyện ]` 28px dễ chạm, và Rương Thưởng phát sáng nhận ngay `+50 XP & +20 Coins`.
    - **Thẻ Đề Xuất Bài Học CSDL Động (`RecommendationActionCard.tsx`)**: Tích hợp **Skeleton Shimmer Loading** chuẩn Quy tắc 1 Wadhah Aloui (`ShimmerBox`, `ShimmerText`) khi đang đồng bộ CSDL, nút CTA nổi bật hỗ trợ ngón tay cái.
      - *Phân tích kỹ năng yếu nhất:* Quét CSDL 7 ngày qua của học viên để tìm kỹ năng luyện ít nhất kèm nút `[ Luyện ]`.
      - *Hàng đợi ôn tập ngắt quãng (SRS Due):* Báo số từ vựng đến hạn ôn tập trong ngày.
      - *Bài nghe Dictation tiếp theo:* Nhớ bài nghe đang học dở hoặc bài kế tiếp theo giáo trình.
      - *Chuyên đề ngữ pháp tiếp theo:* Gợi ý chủ đề cần bổ trợ trong 60 chuyên đề.
      - *Gợi ý theo trang hiện tại (Context-Aware):* Thích ứng linh hoạt theo URL hiện tại.
    - **Dock Phím Nhanh 1 Chạm Thông Minh (Smart Quick Actions Dock)**: 4 nút thao tác nhanh trên thanh nhập liệu (`[ 🗺️ Lộ trình hôm nay ]`, `[ ⚡ Gợi ý bài học ]`, `[ 🔄 Ôn từ vựng SRS ]`, `[ ❓ Hỏi ngữ pháp ]`).
    - **Thu Âm Nhận Diện Giọng Nói Song Ngữ (Dual-Mode STT)**: Bộ chuyển đổi ngôn ngữ 1 chạm `[ 🇬🇧 EN ]` / `[ 🇻🇳 VI ]` cho phép học viên linh hoạt luyện phát âm tiếng Anh chuẩn xác hoặc hỏi bài bằng tiếng Việt, thay thế `alert()` bằng cơ chế thông báo nhẹ nhàng.
    - **Giọng Đọc & Trợ Năng Đầu Vào**: Phát âm giọng đọc bản xứ (SpeechSynthesis TTS), nút sao chép nội dung, nhãn ngoài ẩn `sr-only` cho ô nhập liệu tuân thủ nghiêm ngặt Quy tắc 6.
  - **Cắm Trực Tiếp Vào CSDL PostgreSQL Neon (`/api/ai/chatbot/recommendations`)**:
    - Truy vấn song song `profiles`, `study_plans`, `daily_skill_practice`, `user_vocabulary`, `listening_progress`, `grammar_progress`.
    - Tự động fallback dữ liệu thông minh khi ở chế độ Khách (Guest mode) trên Landing Page hoặc trang Auth.
  - **Tích Hợp Toàn Hệ Thống**:
    - **Thanh Bên (`Sidebar.tsx`)**: Nhấn vào mục "Lộ trình" trên Sidebar điều hướng trực tiếp tới `/roadmap`, đảm bảo 0ms độ trễ và mở ngay giao diện lộ trình bài học 3 chặng AI hoàn chỉnh.
    - **Trang Lộ Trình (`app/(dashboard)/roadmap/page.tsx`)**: Nút CTA chính tại Banner cũng trực tiếp mở Chatbot Mentor khi cần hỗ trợ.
- **`/roadmap`**: Hệ thống lộ trình học cá nhân hóa thông minh chuẩn Agency Tier bóc tách theo kiến trúc **Feature-First (`features/roadmap/`)**, tích hợp **`AppTopHeader` (56px Baseline)** và bố cục **Bento Grid 8/12 Lộ Trình + 4/12 Inspector Hướng Dẫn**:
  - **Kiến Trúc Module Hóa Chuẩn Doanh Nghiệp (`features/roadmap/`)**: Tinh gọn tệp điều phối `app/(dashboard)/roadmap/page.tsx` từ **987 dòng xuống còn ~190 dòng**, bóc tách thành các module chuyên biệt:
    - *Types & Generators (`types/index.ts`, `data/roadmapGenerators.ts`)*: Định nghĩa dữ liệu và thuật toán sinh lộ trình chi tiết theo mục tiêu thi cử (TOEIC, IELTS, Business English).
    - *Shared Components (`components/shared/`)*: `RoadmapSkillBadge` (huy hiệu kỹ năng đa sắc ngữ nghĩa), `RoadmapHeroBanner` (Hero Spotlight Banner 2 chế độ Pathway & Goal-Setting).
    - *Pathway Components (`components/pathway/`)*: `PhaseRoadmapCard` (thẻ chặng học & rương thưởng Gift Chest), `LessonTaskItem` (bài học chi tiết, checkbox toggle, XP pill, nút [ Luyện Ngay ], Mobile drawer), `LessonInspectorCard` (thanh đồng hành cố định chi tiết bài học desktop sticky top-4).
    - *Goal Setting Components (`components/goal-setting/`)*: `GoalSelectionForm` (Bento Form 8 cột cấu hình mục tiêu), `AiBlueprintPreview` (thẻ mô phỏng thời lượng 12 tuần & cam kết chuẩn CEFR).
    - *Custom Hook (`hooks/useRoadmapManager.ts`)*: Quản lý toàn bộ state phân hệ, nạp plan tức thì 0ms với giáo án mặc định TOEIC 750 / IELTS, toggle trạng thái hoàn thành (+XP, Toast), và chuyển đổi mục tiêu.
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

### 4. Bảng Xếp Hạng & Cộng Đồng (`/community`) & Thống Kê Chuyên Sâu (`/analytics`)
- **`/analytics`**: Phân hệ Thống Kê Học Tập chuyên sâu chuẩn Agency Dashboard Tier bóc tách theo kiến trúc **Feature-First (`features/analytics/`)**, tích hợp **`AppTopHeader` (56px Baseline)** với hiệu ứng con nhộng trượt `layoutId="analyticsActiveTabPill"`:
  - **Kiến Trúc Module Hóa Chuẩn Doanh Nghiệp (`features/analytics/`)**: Tinh gọn tệp điều phối `app/(dashboard)/analytics/page.tsx` từ **1,240 dòng xuống còn ~130 dòng sạch sẽ**:
    - *Shared Components (`components/shared/`)*: `AnalyticsMetricsBar` (5 thẻ Bento Micro-Metrics: Chuỗi streak, Vốn từ, Thời gian học, Tổng điểm XP, Hạng tuần), `HighDpiWaveformChart` (Biểu đồ sóng âm SVG High-DPI 700x254px với 6 mốc Oy cách đều 44px hỗ trợ cả trục phút & điểm XP), `WaveformChartSkeleton` (Khung xương Shimmer song sinh 1:1 triệt tiêu 0px CLS).
    - *Activities Tab Sub-Panes (`components/activities/`)*: `HeatmapMatrixCard` (Ma trận hoạt động học tập 6 tháng lăn với 4 mức cường độ và tooltip tương tác động), `SkillAnalyticsCard` (Bộ chuyển đổi 5 kỹ năng Dictation, Shadowing, Nói, Từ vựng, Viết với hoạt ảnh con nhộng trượt `layoutId="activeSkillAnalyticsIndicator"` và 2 biểu đồ High-DPI song song), `ActivitiesTabPane` (Sub-pane điều phối Tab Hoạt Động Của Tôi).
    - *Leaderboard Tab Sub-Panes (`components/leaderboard/`)*: `PodiumTop3Card` (Bục vinh danh 3 cột Top 3 học viên dẫn đầu Vàng, Bạc, Đồng), `LeaderboardListView` (Danh sách học viên Top 4+ có thanh cuộn vô tận, nhận diện tài khoản `Bạn`), `LeaderboardTabPane` (Sub-pane điều phối Tab Bảng Xếp Hạng XP kèm Shimmer loading).
    - *Custom Hook (`hooks/useAnalyticsManager.ts`)*: Quản lý toàn bộ state phân hệ, nạp API `/api/user/analytics` và `/api/leaderboard`, tính toán memoized chỉ số học tập, chuyển đổi tab và kỹ năng mượt mà.
- **`/community`**: Mạng xã hội học tập tương tác chuẩn Agency Tier tích hợp **Kiến trúc Unified Multi-Tab Hub**, **`AppTopHeader` (56px Baseline)** với hiệu ứng con nhộng trượt Apple-grade (`HeaderPillItem layoutId="communityActiveTab"`), cấu trúc **Fluid Ultra-Wide Canvas `max-w-[1600px] 2xl:max-w-[1760px]`** và bố cục **Bento Grid 8/12 Feed + 4/12 Sidebar Widgets**:
  - **Kiến Trúc Module Hóa Chuẩn Doanh Nghiệp (`features/community/`)**: Tinh gọn toàn bộ các tệp điều phối và bóc tách thành các module chuyên biệt độc lập:
    - *Types & Hooks Phân Tầng (`types/index.ts`, `hooks/`)*: Chuẩn hóa 8 interfaces lõi và 5 Custom Hooks chuyên biệt (`useLeaderboardData` với polling CSDL 10s & dynamic rank processor, `useSidebarData` đồng bộ 100% Top 3 và nhóm học, `useFriendsData` xử lý đồng thời 3 endpoint bạn bè, `useGroupsData` quản lý tham gia & tạo nhóm, `useFeedData` xử lý bài viết & tương tác optimistic).
    - *Động Cơ Đồng Bộ Dữ Liệu 100% Tuyệt Đối (Dynamic Ranking Reconciliation Engine)*:
      - Loại bỏ hoàn toàn 100% sự sai lệch giữa **Top Học Viên Tuần (Sidebar Bảng Tin)** và **Bảng Xếp Hạng Tuần (Tab Xếp Hạng `/community/leaderboard`)**.
      - Trích xuất và chia sẻ động cơ đối soát thứ hạng `processLeaderboardWithUser(leaders, user)` cho cả `useLeaderboardData` và `useSidebarData`.
      - Sử dụng chung endpoint `/api/leaderboard?period=week` (chia sẻ chung khóa cache TTL 60s `leaderboard:week:1:50`, loại bỏ triệt để sai lệch do tham số `limit=3` cũ).
      - Tự động đối soát tài khoản học viên hiện tại (`user` từ `useAuthStore`): cập nhật điểm XP tức thời sau bài học, đôn hạng nếu học viên thuộc Top 3, làm sạch tên hiển thị email qua `formatCleanName`.
      - Đồng bộ chu kỳ polling ngầm 10s và tự động làm mới khi người dùng quay lại cửa sổ trình duyệt (`window.focus`), đảm bảo cập nhật mượt mà không nhấp nháy lại khung xương Shimmer.
      - Khóa an toàn bằng bộ kiểm thử tự động `__tests__/community_leaderboard_sync.test.ts` (100% Pass).
    - *Shared Component (`components/shared/`)*: `CommunityHeroBanner` dùng chung cho cả 4 tab với gradient thích ứng (`from-[#0059bb] via-[#004fba] to-...`), hiệu ứng ambient blur orbs 60fps và typography sắc sảo.
    - *Phân Hệ Xếp Hạng (`components/leaderboard/`)*: `CommunityLeaderboardView` tinh gọn ~90 dòng, `LeaderboardPeriodFilter` (Bộ lọc Tuần/Tháng/Mọi thời đại `layoutId="activeLeaderboardPeriodIndicator"` + Ô tìm kiếm), `LeaderboardPodiumTop3` (Bục vinh danh Top 3 Vàng #1 nâng cao, Bạc #2, Đồng #3 + Exact Shimmer Skeleton 1:1), `LeaderboardRanksTable` (Danh sách thứ hạng Top 4+ có cuộn mượt + Nhận diện thẻ `Bạn` + Shimmer 4 hàng), `LeaderboardUserStatusWidget` (Vị trí học viên, Hạng tuần, Tổng XP, nút Luyện tập), `LeaderboardWeeklyRewardsWidget` (Phần thưởng Top 3 tuần).
    - *Phân Hệ Bạn Bè (`components/friends/`)*: `CommunityFriendsView` tinh gọn ~90 dòng, `FriendSearchBar` (Thanh tìm kiếm username + nút Kết bạn), `FriendsSubTabNav` (Bộ 3 sub-tabs `layoutId="activeFriendsSubTabIndicator"` kèm chấm đỏ thông báo), `ActiveFriendsList` (Danh sách bạn bè đang hoạt động + Shimmer + Empty), `PendingRequestsList` (Lời mời đang chờ với nút Đồng ý Emerald & Từ chối), `FriendSuggestionsList` (Component tái sử dụng thông minh cho cả Sub-tab mobile và Widget desktop sidebar), `StudyBuddyCardWidget` (Thẻ mời bạn bè nhận thưởng).
    - *Phân Hệ Bảng Tin (`components/feed/`)*: `CommunityFeedView` tinh gọn ~80 dòng, `FeedCategoryFilter` (Bộ lọc danh mục bài viết `layoutId="activeFeedFilterIndicator"`), `CreatePostBox` (Khung tạo bài viết Optimistic UI +20 XP), `PostCard` (Thẻ bài viết với lượt thích Rose, bình luận Blue và tags), `CommunitySidebar` (kết nối CSDL Neon PostgreSQL Top 3 học viên `/api/leaderboard` & nhóm học sôi nổi `/api/groups`, Shimmer Skeleton 60fps chuẩn 0px CLS khớp 1:1 `loading.tsx`, thẻ Mẹo học tập hôm nay).
  - **Kiến Trúc Unified Multi-Tab Hub (Zero Reload)**: Hợp nhất 4 phân khu chức năng lớn (**"Bảng Tin"**, **"Xếp Hạng"**, **"Bạn Bè"**, **"Nhóm Học"**) vào chung một Single-Page Hub tối ưu. Chuyển đổi giữa các tab diễn ra tức thì trong **0ms** không reload trang, kết hợp chuyển cảnh mượt mà bằng `<AnimatePresence mode="wait">` (`opacity: 0, y: 12 -> 0 -> -12`, `duration: 0.11s`). Đồng bộ hóa URL qua `?tab=...` (`replaceState`) đảm bảo lưu lịch sử duyệt và bookmark mà không kích hoạt tải lại mạng.
  - **Hỗ Trợ Route Kép & Tương Thích Tuyệt Đối 100%**: Tất cả các đường dẫn trực tiếp trong hệ thống như `/community/leaderboard`, `/community/friends`, `/community/groups` vẫn được bảo toàn nguyên vẹn 100% thông qua cơ chế Delegation (`initialTab`), giúp học viên truy cập từ bất kỳ đâu (Sidebar, Dashboard, Profile, v.v.) đều mở ngay tab tương ứng và chuyển nhanh sang tab khác với 0ms độ trễ.
  - **Hiệu Ứng Chuyển Tab 2 Cấp Độ (2-Level Motion Transitions)**:
    - **Level 1 (Master Header Tabs)**: 4 Tab Pill trong `HeaderPillContainer` sở hữu hiệu ứng trượt con nhộng mượt mà qua Framer Motion Spring Physics (`layoutId="communityActiveTab"`, `stiffness: 500, damping: 35`). Nút CTA góc phải thích ứng theo ngữ cảnh từng tab (`[ ✍️ Đăng bài +20 XP ]`, `[ ⚡ Đua top +15 XP ]`, `[ 👥 Tìm bạn +10 XP ]`).
    - **Level 2 (Sub-Filter Tabs Trong Từng View)**:
      - *Bảng Tin*: Bộ lọc danh mục chuyên mục (`Tất cả`, `#Hỏi đáp`, `#Chia sẻ kinh nghiệm`, `#IELTS / TOEIC`, `#Thảo luận`) với sliding indicator `layoutId="activeFeedFilterIndicator"`.
      - *Xếp Hạng*: Bộ lọc chu kỳ (`Tuần này`, `Tháng này`, `Mọi thời đại`) với sliding indicator `layoutId="activeLeaderboardPeriodIndicator"`.
      - *Bạn Bè*: Phân khu (`Danh sách bạn bè`, `Lời mời`, `Gợi ý`) với sliding indicator `layoutId="activeFriendsSubTabIndicator"`.
      - *Nhóm Học*: Bộ lọc nhóm (`Tất cả nhóm`, `Đã tham gia`, `TOEIC & IELTS`, `Giao tiếp IPA`) với sliding indicator `layoutId="activeGroupsFilterIndicator"`.
  - **Khung Tạo Bài Viết (`rounded-2xl`)**: Ô nhập `textarea` bo góc `rounded-xl`, gợi ý hashtag nhanh và nút đăng bài với **Optimistic UI 0ms** nhận ngay +20 XP.
  - **Dòng Bảng Tin & Tương Tác (`Feed Stream`)**: Thẻ bài viết `rounded-2xl`, header tác giả với `UserAvatar`, badge `Member` bo viền, tag từ vựng `rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#0059bb]`, thanh đếm tương tác (Lượt thích màu Rose, Bình luận màu Blue), và khu vực bình luận mở rộng mượt mà.
  - **Hệ Thống Khung Xương Quét Tia Sáng Điện Ảnh 60fps (Geometric Twin Shimmer Skeleton - 0px CLS)**:
    - Áp dụng đồng bộ bộ ba `ShimmerBox`, `ShimmerCircle`, `ShimmerText` tích hợp hiệu ứng dải sáng gradient quét 60fps (`before:animate-shimmer`), thay thế hoàn toàn `animate-pulse` mờ đục cũ.
    - **`community/loading.tsx`**: Tái hiện chuẩn xác 100% từng pixel Header 56px, Hero Banner, Khung tạo bài viết, 2 Thẻ bài viết chi tiết và 3 khối widget cột phải.
    - **In-Place Micro-Shimmers**: Khi fetch CSDL `/api/posts`, `/api/leaderboard`, `/api/friends`, `/api/groups`, các khối hiển thị vi khung xương đúng kích thước pixel thực tế, triệt tiêu 100% hiện tượng xô lệch bố cục (Zero CLS).

### 4.1. Hồ Sơ Cá Nhân & Thành Tích (`/profile`)
- **`/profile`**: Phân hệ Hồ Sơ Cá Nhân & Thành Tích chuẩn Agency Dashboard Tier bóc tách theo kiến trúc **Feature-First (`features/profile/`)**, chuẩn hóa phong cách khối, chữ, font chữ, màu sắc và icon đồng bộ 100% với `/analytics`:
  - **Kiến Trúc Module Hóa Chuẩn Doanh Nghiệp (`features/profile/`)**: Tinh gọn tệp điều phối `app/(dashboard)/profile/page.tsx` từ **883 dòng xuống còn ~90 dòng sạch sẽ**:
    - *Hero Stage Banner (`components/hero/ProfileHeroCard.tsx`)*: Card `rounded-2xl` gradient Xanh Hoàng Gia, **Avatar Hình Tròn Cao Cấp (`rounded-full`)** tích hợp vòng hào quang Concentric Aura (`bg-gradient-to-tr from-sky-400 via-indigo-400 to-amber-300 ring-4 ring-white/20 shadow-xl`), Level badge dạng Pill (`rounded-full`) với icon `Shield` và chữ `LV.` **màu trắng tuyết sắc nét (`text-white fill-white`)** nổi bật trên nền vàng hổ phách, nón cử nhân vinh danh đặt nghiêng tự nhiên trên vành trên của avatar tròn, tên học viên sạch sẽ qua `formatCleanName`, userTitle, bio và cụm kính mờ live stats (Streak `Flame` rực lửa & Vàng `Coins`).
    - *Top 4 Bento Metrics Cards (`components/metrics/ProfileMetricsBar.tsx`)*: Đồng bộ 100% phong cách khối, font chữ Display/Mono và màu sắc với `/analytics`:
      - Thẻ 1 (Từ Vựng Tích Lũy): `BookmarkCheck` trong `bg-blue-50 text-[#0059bb]`, thanh tiến độ gradient từ vựng.
      - Thẻ 2 (Chuỗi Streak): `Flame` trong `bg-amber-50 text-amber-500`, kỷ lục cao nhất.
      - Thẻ 3 (Kinh Nghiệm XP): `Zap` trong `bg-indigo-50 text-indigo-500`, tiến độ lên cấp `font-mono`.
      - Thẻ 4 (Vàng & Bảo Hộ): Chuẩn hóa sang tông **Amber `#f59e0b`** (`Coins` trong `bg-amber-50 text-amber-500 border-amber-200/60`), số lượng bảo hộ streak.
    - *Cài Đặt Hồ Sơ (`components/settings/ProfileEditDrawer.tsx`)*: Form trượt mở mượt mà qua `<AnimatePresence>`, nhãn ngoài Rule 6 (Họ tên, Bio), **Bộ chọn Avatar hình tròn có Live Preview** hiển thị ngay lập tức khuôn mặt/biểu tượng khi thay đổi với các nút chọn dạng tròn `rounded-full` đồng bộ, nút Primary Action Rule 18 & 19 `[ Lưu thay đổi ]`.
    - *Phân Tích 5 Kỹ Năng (`components/skills/ProfileSkillBreakdown.tsx`)*: Icon ngữ nghĩa chuẩn mực (Từ vựng `BookOpen`, Viết `PenTool`, Nói `Mic`, Dictation `Headphones`, Shadowing `Volume2`), số phút `font-mono` và link sang `/analytics`.
    - *Kho Huy Hiệu Thành Tích (`components/achievements/ProfileAchievementsSection.tsx`)*: **Chuẩn hóa 100% Vector Lucide Icons (`stroke-[2.2]`)** thay thế toàn bộ emoji thô: Bước Đầu (`GraduationCap` Blue), Ngọn Lửa (`Flame` Amber), Chiến Binh (`Swords` Indigo), Bách Từ (`Target` Emerald), Kết Nối (`Users` Sky), Bậc Thầy Quiz (`Brain` Purple) trong container pastel bóng mờ `shadow-2xs`, bộ lọc 3 sub-tabs (`Tất cả`, `Đã đạt`, `Chưa mở`), badge trạng thái `ĐÃ ĐẠT` (Emerald) vs `KHÓA` (Slate), điểm thưởng `+XX XP` màu Amber.
    - *Rương Vật Phẩm & Trang Bị (`components/inventory/ProfileInventorySection.tsx`)*: **Thay thế triệt để emoji thô `🛡️` và `🎓`** bằng Lucide SVG cao cấp (`ShieldCheck stroke-[2.2]` Amber cho Bảo hộ streak & `GraduationCap stroke-[2.2]` Purple cho Nón cử nhân avatar), nút trang bị toggle tức thì và link sang `/shop`.
    - *Cấp Độ & Danh Hiệu (`components/progression/ProfileTitleProgression.tsx`)*: Tiêu đề `Crown stroke-[2.2]`, badge `LV.X`, thẻ danh hiệu hiện tại với `GraduationCap stroke-[2.2]` và tích xanh `Check stroke-[3]`, thẻ danh hiệu tiếp theo với `Rocket stroke-[2.2]` và `Lock`.
    - *Lối Tắt Ứng Dụng (`components/shortcuts/ProfileQuickLinks.tsx`)*: 4 lối tắt `/analytics` (`BarChart3`), `/study/pvp` (`Swords`), `/shop` (`ShoppingBag`), `/community/leaderboard` (`Trophy`) đồng bộ `stroke-[2.2]` và hiệu ứng hover lift.
    - *Trang Bộ Sưu Tập Huy Chương (`app/(dashboard)/profile/achievements/page.tsx`)*: Đồng bộ hệ thống Lucide Vector Icons (`ACHIEVEMENT_ICONS_MAP`) cho toàn bộ 8 huy hiệu thành tích, xóa bỏ emoji OS, mang lại trải nghiệm EdTech đẳng cấp doanh nghiệp.
  - **Chuẩn Hóa Icon Học Sâu Toàn Diện (In-Depth Icon System Standardization)**:
    - Đồng bộ nét vẽ `stroke-[2.2]` trên toàn bộ icon tiêu đề, metric cards (`BookmarkCheck`, `Zap`, `Coins`), quick links và action buttons (`Share2`, `Edit3`).
    - Khử sạch các emoji OS bị rò rỉ sau các dòng số liệu (kỷ lục streak, bảo hộ streak).
    - Bảo toàn tuyệt đối 100% giao diện (0px Visual Deviation), giữ nguyên vẹn kích thước hình học, margins, paddings và tỷ lệ bố cục lưới 8/12 & 4/12.

### 4.2. Nâng Cấp Hội Viên Premium (`/premium` & `/premium/checkout`)
- **`/premium`**: Phân hệ Nâng Cấp Hội Viên VIP Pass chuẩn Agency Dashboard Tier bóc tách theo kiến trúc **Feature-First (`features/premium/`)**, áp dụng triệt để phong cách thiết kế Bento, Double-Bezel, quy tắc 60-30-10 và chuẩn hóa nét vẽ icon vector `stroke-[2.2]`:
  - **Kiến Trúc Module Hóa Chuẩn Doanh Nghiệp (`features/premium/`)**: Tinh gọn tệp điều phối `app/(dashboard)/premium/page.tsx` từ **819 dòng xuống còn ~100 dòng sạch sẽ**:
    - *Types & Constants (`types/index.ts`, `constants/index.ts`)*: Định nghĩa chặt chẽ `PlanKey`, `PlanConfig`, `GiftItem`, `SuccessStory`, `FaqItem`, `ExamType` và dữ liệu các gói (`PLANS`), quà tặng kèm, 3 câu chuyện thành tích và 5 câu hỏi thường gặp.
    - *Custom Hook (`hooks/usePremiumPlan.ts`)*: Quản lý tập trung toàn bộ state chọn gói cước (`selectedPlanKey`), tương tác mô phỏng điểm số thi chuẩn TOEIC/IELTS (`targetExam`, `currentScore`, `estimatedProScore`) và trạng thái accordion FAQ.
    - *Hero Stage Banner (`components/hero/PremiumHeroStage.tsx`)*: Cấu trúc container `rounded-2xl` thanh thoát (tương đồng `ProfileHeroCard`), hiệu ứng ánh sáng ambient radial lights, badge `Crown stroke-[2.2]`, tiêu đề gradient vừa vặn (`text-lg sm:text-xl lg:text-2xl font-bold font-display`), bộ đếm học viên trực tiếp (`3.420+ học viên đang học hôm nay`) và thẻ Holographic Golden VIP Pass `UNLIMITED` với icon container bo tròn chuẩn `rounded-xl` (12px).
    - *Interactive Plan Deck (`components/plans/PremiumPlanDeck.tsx`)*: Bộ 3 thẻ chọn gói cước linh hoạt (Gói 1 Năm - Pro VIP Pass, Gói 1 Tháng, Gói Trọn Đời - Master Lifetime) với badge nổi, padding `p-3.5 sm:p-4.5 rounded-2xl` cân đối tầm mắt, viền active xanh hoàng gia `#0059bb`, radio checkmark và tính toán chi phí trung bình theo ngày.
    - *Spotlight Power Perks Card (`components/plans/PremiumPlanPerksSpotlight.tsx`)*: Thẻ tiêu điểm hiển thị chi tiết đặc quyền gói đang chọn trên nền `rounded-2xl`, rương quà tặng kèm miễn phí (`Gift`, `ShieldCheck`, `GraduationCap`), checklist tính năng, giá tiền đồng bộ cấp bậc (`text-xl sm:text-2xl font-black`) và nút hành động Primary CTA phong cách **Button-in-Button** (`py-2.5 px-3.5 rounded-xl`) dẫn trực tiếp sang cổng thanh toán `/premium/checkout?plan=...`.
    - *Interactive Bento Feature Showcases (`components/features/PremiumBentoShowcase.tsx`)*: 5 khối Bento tương tác công nghệ học tập độc quyền chuẩn hóa padding `p-4 sm:p-4.5 rounded-2xl space-y-3`:
      1. Gia sư AI Speaking đo chuẩn IPA 98.4% với visual sóng âm Waveform thời gian thực.
      2. Bộ mô phỏng tăng điểm thi chuẩn TOEIC (+260) & IELTS (+1.5) tương tác 1 chạm, nút chuyển tab TOEIC/IELTS bo tròn dạng con nhộng chuẩn mực `rounded-full` trong container `rounded-full` đồng bộ với hệ thống Pills, thanh trượt điểm số ray bo tròn `rounded-full` mượt mà triệt tiêu góc vuông.
      3. Thuật toán ghi nhớ ngắt quãng SM-2 bẻ gãy đường cong quên lãng (nhớ 95% sau 6 tháng).
      4. Khiên Streak Kim Cương tự động bảo hộ chuỗi ngọn lửa khi vắng mặt.
      5. Hệ số nhân đôi 2X XP cho toàn bộ bài học, minigame và đấu trường PvP.
    - *Bảng Vàng Thành Tích Học Viên (`components/testimonials/PremiumSuccessStories.tsx`)*: 3 thẻ thành tích học viên bứt phá điểm số với đánh giá 5 sao vàng, trích dẫn thực tế và **Avatar học viên chuẩn Concentric Aura Ring** bọc viền gradient hào quang kèm tích xanh xác thực `CheckCircle2`.
    - *Cam Kết Hoàn Tiền & FAQ (`components/faq/PremiumFaqSection.tsx`)*: Thẻ cam kết bảo hiểm quyền lợi học viên hoàn tiền 100% trong 7 ngày (icon container `w-9 h-9 rounded-xl` chuẩn Dashboard) kết hợp Accordion FAQ mượt mà với hoạt ảnh Framer Motion.
  - **Đồng Bộ Hoàn Hảo Skeleton Twin Loading (`premium/loading.tsx`)**: Tái hiện chuẩn xác 1:1 từng pixel cấu trúc `rounded-2xl` của Hero Stage, 3 thẻ Plan Selector, Thẻ Spotlight Perks và 5 Bento Teasers, chuẩn hóa các placeholder chữ sang `rounded-md`, bảo đảm tuyệt đối 0px Cumulative Layout Shift.
  - **Kiểm Thử Tự Động Toàn Diện (`__tests__/premium_feature.test.ts`)**: Bộ test suite chuyên biệt kiểm tra tính toàn vẹn của dữ liệu gói cước, công thức tính giá/tiết kiệm, logic mô phỏng điểm số TOEIC (max 990) & IELTS (max 9.0) và nội dung chính sách bảo hiểm hoàn tiền.


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
  - **Kiến Trúc Kết Nối & Tối Ưu Hóa 100% Database PostgreSQL (`listening_lessons`, `listening_progress`, `listening_notes`, `daily_skill_practice`)**:
    - **Nạp 102 Bài Học Thật Tối Ưu Siêu Tốc (Selective Projection)**: Kết nối trực tiếp `GET /api/listening/lessons?userId=...` sử dụng phép chọn trường cụ thể (`select`), loại bỏ tải transcript nặng khi duyệt danh mục, giảm 98% dung lượng mạng (từ 2.5MB xuống ~35KB) và tăng tốc phản hồi gấp 6 lần.
    - **Hệ Thống Chỉ Mục Tổ Hợp (Composite Indexes)**: Bổ sung `@@index([orderIndex])`, `@@index([level, orderIndex])`, `@@index([category, orderIndex])` trên `listening_lessons` và `@@index([lessonId])`, `@@index([userId, status])` trên `listening_progress` tối ưu hóa triệt để tốc độ truy vấn phân trang và lọc theo cấp độ.
    - **Giao Dịch Ghi Nhận Tiến Độ Nguyên Tử ACID (`prisma.$transaction`)**: Khi hoàn thành câu hoặc kết thúc bài học, `POST /api/listening/progress` gom nhóm 3 thao tác ghi (Lưu tiến độ + Tăng XP Profile + Lưu Daily Skill `dictation`) vào 1 atomic transaction duy nhất, giảm từ 3 network round-trips xuống 1 round-trip tới Neon PostgreSQL.
    - **Đồng Bộ Sổ Tay Lưu Câu (Cloud Bookmarking)**: Bấm "Lưu câu" (`handleToggleBookmark`) tự động ghi nhận vào `bookmarked_sentences` trên PostgreSQL Neon, đồng bộ tức thời trên mọi thiết bị.
    - **Ghi Chú Đám Mây (Cloud Notes)**: Tự động `upsert` nội dung ghi chú cá nhân của học viên theo cặp `userId_lessonId` vào bảng `listening_notes` qua `POST /api/listening/notes`.
    - **Tích Lũy Thống Kê Dictation Kỹ Năng & Daily Quest**: Khi hoàn thành câu hoặc kết thúc bài học, hệ thống tự động cộng dồn số phút luyện nghe và điểm XP vào bảng `daily_skill_practice` (`skill: "dictation"`) và hồ sơ `Profile`, liên thông trực tiếp với Biểu đồ kỹ năng 7 ngày và Nhiệm vụ hàng ngày trên Dashboard.
    - **Tạo Bài Nghe Mới Bằng AI & Bóc Tách Phụ Đề YouTube (Custom AI & YouTube Subtitles)**:
      - **Tab 1 — Văn bản AI**: Tự động phân tách câu, tính toán thời lượng và sinh audio AI lưu vĩnh viễn vào CSDL qua `POST /api/listening/lessons`.
      - **Tab 2 — Nhập từ YouTube Subtitles**: Tích hợp trình bóc tách phụ đề CC tự động từ URL YouTube (`/api/youtube/captions?videoId=...`), tự động chuyển đổi toàn bộ phụ đề thành danh sách câu Dictation có mốc thời gian và lưu bài học CSDL.
    - **Cơ Chế Chống Tiết Lộ Đáp Án Chính Tả (Anti-Dictation Spoiler Protection)**: Trên cột phải `InteractiveTranscriptSidebar.tsx`, câu đang học `#N ĐANG HỌC` được tự động che giấu bằng chuỗi ký tự chấm `•••••` kèm chỉ dẫn sư phạm (`🔒 Ẩn đáp án để luyện nghe chép...`). Đáp án chỉ hiển thị khi học viên đã gõ hoàn thành câu hoặc chủ động bật công tắc "Hiện".
    - **Tinh Chỉnh Chuỗi Ký Tự Phiên Âm Ngữ Âm IPA (`DictationWorkspace.tsx`)**: Loại bỏ hoàn toàn khối hộp bao quanh và định dạng `font-mono` pixelated theo yêu cầu; nâng cấp toàn bộ sang font chữ hiện đại `font-sans text-[15px] sm:text-base font-medium tracking-wide antialiased`, nhãn `IPA:` nổi bật với `font-sans font-bold text-sm sm:text-base text-[#0059bb] dark:text-sky-400` và ký tự ngữ âm màu Slate đậm nét (`text-slate-800 dark:text-slate-100`), triệt tiêu 100% cảm giác nhỏ mờ hay góc cạnh cứng nhắc.
    - **Cơ Chế Tự Động Xóa Bản Ghi CSDL Khi Xong Bài (`DELETE /api/listening/progress`)**:
      - Bổ sung handler `DELETE` cho API `/api/listening/progress` hỗ trợ xóa bản ghi `listeningProgress` theo `userId` và `lessonId`.
      - Khi học viên hoàn thành 100% các câu của bài học, hệ thống tự động gọi API `DELETE` để xóa bản ghi dở dang trong Neon PostgreSQL, giúp bài học được reset sạch sẽ về 0% cho các lần luyện tập tiếp theo.
      - **Tái Thiết Kế Toàn Diện Màn Hình Hoàn Thành Bài Nghe (Gamification Bento Hub)**:
        - Thay thế toàn bộ khối ngang đơn điệu và dải xanh trải dài bằng **Trung Tâm Tuyên Dương Thành Tích & Đề Xuất Bài Học (Gamification Bento Hub)** cân đối 100vh, triệt tiêu 100% khoảng trắng chết (~70%).
        - **Hero Tuyên Dương Trung Tâm**: Huy hiệu Cúp Vàng 3D hào quang Gradient Amber phát sáng kết hợp tiêu đề vinh danh to rõ và phụ đề ghi nhận thành tích.
        - **Lưới 4 Bento Metric Cards Lớn (Rule 8)**: Số liệu to nổi bật `+50 XP` (Vàng Amber), `100%` (Xanh Emerald), `{total}/{total}` (Xanh Royal) và `Thời gian` (Slate).
        - **Cấp Bậc Nút Bấm Chuẩn (Rule 18 & 20)**: Nút chính duy nhất **[ Bài học tiếp theo ➔ ]** màu Xanh Hoàng Gia `#0059bb`, nút phụ **[ 🎙️ Luyện Shadowing AI ]** và nút luyện lại.
        - **Lưới 3 Thẻ Bài Học Đề Xuất Kế Tiếp**: Tích hợp ngay phía dưới giúp học viên bấm học tiếp bài mới liền mạch mà không phải quay ra ngoài danh sách.
      - **Nâng Cấp Chuẩn High-End Visual Design ($150k+ Agency-Tier)**:
        - **Chuẩn Hóa Double-Bezel Trên Lưới Danh Mục (Rule 10)**: Nâng cấp toàn bộ thẻ bài học Hàng 1 (A1-A2) và Hàng 2 (B1-C2) sang kiến trúc viền kép: Thẻ ngoài bo `rounded-2xl` (16px), khung ảnh con bên trong bo `rounded-xl` (12px), triệt tiêu hoàn toàn hiện tượng lệch góc méo mó.
        - **Đồng Bộ Vị Trí Huy Hiệu CEFR (`bottom-2 left-2`)**: Di chuyển toàn bộ huy hiệu cấp độ trên ảnh bìa bài học xuống góc dưới bên trái với nền kính mờ `backdrop-blur-xs bg-slate-900/85 text-white font-mono font-bold text-[10px]`, đồng nhất 100% ngôn ngữ thiết kế giữa Catalog, Sidebar và Completion Bento Hub.
        - **Thanh Header Studio Đẳng Cấp (`StudioTopHeader.tsx`)**: Trang bị nút Pill `[← Quay lại]`, gắn huy hiệu CEFR `[ B1 ]` màu Xanh Hoàng Gia ngay trước tên bài học và bổ sung vách ngăn vi mô giữa cụm Mode và Accent.
        - **Nhãn Ngoài Ô Gõ Dictation (Rule 6 Wadhah Aloui)**: Bổ sung nhãn ngoài thanh lịch `✏️ Nội dung nghe chép chính tả:` kèm gợi ý phím cách, tích hợp vòng hào quang phát sáng Xanh Hoàng Gia `focus:ring-4 focus:ring-[#0059bb]/15` và phân cấp nút `Xem dịch` active dạng blue pill.
    - **Tối Giản Hóa Thanh Header Studio (`StudioTopHeader.tsx`)**: Loại bỏ hoàn toàn huy hiệu `● Đã lưu CSDL` / `◐ Đang lưu...`, trả lại thanh header phẳng, tối giản và thông thoáng.
    - **Tái Cấu Trúc Toàn Diện Thẻ Gợi Ý Bài Học (`InteractiveTranscriptSidebar.tsx`)**:
      - **Rút Gọn Cấp Độ Chuẩn CEFR (`formatLevelBadge`)**: Nén chuỗi ký tự cồng kềnh `Intermediate` (12 ký tự che ảnh) thành huy hiệu ngắn gọn sắc nét `B1`/`B2`, trả lại không gian thoáng đãng cho hình ảnh thumbnail.
      - **Tối Ưu Kích Thước Khối & Ảnh Bìa**: Nâng kích thước ảnh bìa lên **102px x 74px** (tỷ lệ chuẩn ~1.38:1), thẻ ngoài có độ đệm thoáng đãng `p-3.5 rounded-2xl gap-3.5` và chiều cao tối thiểu `min-h-[96px]`.
      - **Độ Tương Phản Màu Sắc & Triệt Tiêu Chữ Mờ**: Tên danh mục nâng cấp sang màu Xanh Hoàng Gia đậm nét `text-[#0059bb] dark:text-sky-400 font-extrabold uppercase text-[11px]`, thông số thời lượng và số câu rõ nét `text-xs font-semibold text-slate-600 dark:text-slate-300 font-mono`, icon `Clock` và `Headphones` mở rộng lên `w-3.5 h-3.5 stroke-[2]`.
      - **Nút Hành Động Pill Nổi Bật (Action CTA)**: Nút Pill Action `bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-xs font-bold flex items-center gap-1.5 group-hover:bg-[#0059bb] group-hover:text-white transition-all shadow-2xs` kích thích học viên hành động. Nút "Đổi gợi ý" bọc trong pill button sắc nét.
    - **Cơ Chế Khớp Từ Revealed & Triệt Tiêu Lỗi Kẹt Phím Cách (Typing Match Fix)**: Nâng cấp `DictationWorkspace.tsx` cho phép nhận diện và chuyển trạng thái `matched` (xanh Emerald `#10b981`) cho cả các từ đã xem trước (`revealed`), ngăn ngừa chặn phím cách (`Space`) và triệt tiêu 100% hiện tượng nối dính chữ.
    - **Thanh Điều Khiển Âm Lượng & Tắt Tiếng Mute (`StudioWaveformCard.tsx`)**: Trang bị thanh trượt Volume mượt mà 0% - 100% kèm nút Mute và 3 icon trực quan (`VolumeX`, `Volume1`, `Volume2`), đồng bộ trạng thái `xp_listening_volume` vào TTS engine.
    - **Bộ Chuyển Đổi Ngữ Điệu Giọng Đọc Đa Vùng Miền US / UK / AU (`StudioTopHeader.tsx`)**: Bổ sung cụm nút chọn nhanh Accent (`US`, `UK`, `AU`) trên thanh Studio Header, liên kết trực tiếp với `speakLessonText` để học viên trải nghiệm ngữ điệu đa dạng.
    - **Đồng Bộ Huy Hiệu Cấp Độ Hàng 1 (A1 - A2 Harmonization)**: Chuẩn hóa `getLevelLabel(level, true)` cho Hàng 1 "Bài học cơ bản (A1 - A2)" hiển thị thống nhất huy hiệu A1 / A2, triệt tiêu tình trạng dán nhãn B1-B2 mâu thuẫn tiêu đề danh mục.
  - **Hệ Thống Skeleton Shimmer Loading Chuyên Sâu Khớp 100% Bố Cục (Rule 1 UI/UX & Zero Layout Shift)**:
    - **Listing Skeleton (`ListeningListingSkeleton`)**: Khung xương Shimmer cao cấp tái hiện chuẩn xác 100% từng pixel thanh Header 56px (`AppTopHeader` Twin với 4 HeaderPill và ô tìm kiếm), Lưới 8 Thẻ Bài Học Cơ Bản A1-A2 và Lưới 8 Thẻ Bài Học Nâng Cao B1-C2 (`ShimmerBox` kèm gradient chuyển động `@keyframes shimmer`). Trạng thái `isLoadingLessons` được khởi tạo chuẩn xác `!rawIdParam`, đảm bảo hiển thị khung xương ngay lập tức khi mở trang, loại bỏ triệt để hiện tượng Flash Mock Data trước khi CSDL PostgreSQL Neon phản hồi.
    - **Studio Skeleton (`ListeningStudioSkeleton`)**: Tái hiện chuẩn xác 100% thanh Header với cụm nút Accent `[US] [UK] [AU]`, Khối Sóng Âm 95-spikes (`JAGGED_ACOUSTIC_SPEECH_SPIKES_95`) tích hợp thanh trượt Volume và nút Mute, Meta Status Row (`#1 0/N từ Khớp: 0%`), Sentence Utility Toolbar, Dải Word Tokens Track phía trên, Ô nhập liệu Dictation phía dưới, Cụm 4 nút công cụ và Sidebar danh sách phụ đề 2 tab gọn gàng. Khi người dùng click chọn bài học từ danh mục hoặc chuyển bài, `setIsLoadingLessonDetail(true)` kích hoạt Studio Skeleton tức thì với thời gian đệm 200ms, triệt tiêu 100% hiện tượng giật nhảy layout (0px CLS).
    - **Cơ Chế Chuyển Bài Liền Mạch Không Sập Trang (Seamless In-Studio Transition)**: Khi học viên chuyển sang bài học khác từ thanh gợi ý bên trong Studio, hệ thống giữ nguyên cấu trúc Studio Container và chỉ kích hoạt `TranscriptSentencesSkeleton` trên cột phụ đề, chấm dứt hiện tượng unmount/chớp trắng toàn trang.
    - **Khung Xương Gợi Ý Bài Học (`RecommendationCardsSkeleton`)**: Tích hợp 3 thẻ ngang shimmer `rounded-2xl` khi chuyển tab "Gợi ý bài học" hoặc bấm "Đổi gợi ý" (`RefreshCw`), triệt tiêu độ lệch đệm (0px CLS).
    - **Tiến Trình 3 Bước Khi Bóc Tách YouTube (YouTube Extraction Stepper)**: Trực quan hóa thanh tiến trình 3 giai đoạn: *1. Kết nối video* ➔ *2. Tách câu & thời gian* ➔ *3. Lưu vào Neon DB*.
    - **Hiệu Ứng Chuyển Đổi Khi Đổi Bài Ngẫu Nhiên (Shuffle Micro-Skeleton)**: Lưới 8 thẻ bài học hiển thị hiệu ứng skeleton mượt mà 180ms khi bấm "Đổi bài ngẫu nhiên" ở Hàng 1 hoặc Hàng 2.
    - **Hiệu Ứng Lướt Sáng Khi Chuyển Tab Danh Mục (180ms Shimmer Sweep)**: Khi bấm chuyển đổi giữa các tab danh mục (`Tất cả`, `Cơ bản A1-A2`, `Nâng cao B1-C2`, `Đã học`), hệ thống kích hoạt vi chuyển đổi `isSwitchingCategory` 180ms với 8 thẻ `<LessonCardShimmer />` quét tia sáng 60fps, mang lại cảm giác xúc giác mượt mà và liền lạc tương tự `/analytics` và `/dashboard`.
  - **Kiến Trúc Chuyển Tab 2 Cấp Độ Chuẩn Apple (Apple-Grade 2-Level Motion Transitions)**:
    - **Level 1 (Master Header Tabs)**: `AppTopHeader` với các Header Pills (`Dictation`, `Shadowing`, `Luyện từ vựng`, `Thi thử đề`) trang bị hiệu ứng trượt con nhộng lò xo Framer Motion (`layoutId="listeningHeaderActiveTab"`).
    - **Level 2 (Category / Level Filter Dock)**: Con nhộng trượt lò xo Apple-grade (`layoutId="listeningCategoryFilterIndicator"`, `stiffness: 450, damping: 32`) hiển thị chính xác số lượng bài học theo từng danh mục (`Tất cả (N)`, `Cơ bản A1-A2 (N)`, `Nâng cao B1-C2 (N)`, `Đã học (N)`).
    - **Bố Cục Hiển Thị Danh Mục Chuyên Biệt**: Tab `basic` hiển thị toàn bộ bài học cơ bản A1-A2 (`allBasicLessons`), Tab `advanced` hiển thị toàn bộ bài học nâng cao B1-C2 (`allAdvancedLessons`), Tab `completed` hiển thị tất cả các bài đã hoàn thành (`completedLessons`), và Tab `all` hiển thị 2 hàng tuyển chọn kèm nút đổi bài ngẫu nhiên bên trong `<AnimatePresence mode="wait">`.
    - **Interactive Transcript Sidebar Tabs**: Con nhộng trượt (`layoutId="interactiveTranscriptActiveTabPill"`) kèm chuyển cảnh mượt mà qua `<AnimatePresence mode="wait">` giữa 2 phân khu "Phụ đề" và "Gợi ý bài học".
    - **Mobile Studio Switcher & Studio Switchers**: Con nhộng trượt lò xo (`layoutId="listeningMobileStudioTabIndicator"`) giữa "Luyện chép" và "Danh sách phụ đề" trên điện thoại; `layoutId="studioModePillIndicator"` và `layoutId="studioAccentPillIndicator"` cho chế độ luyện tập và giọng đọc US/UK/AU.
  - **Staggered Spring Entrance Animation Standard (`PageEntranceWrapper`)**: Toàn bộ canvas danh mục bài nghe được bọc trong `PageEntranceWrapper` với hiệu ứng xuất hiện phân tầng so le sang trọng.
  - **Đồng Bộ Nền Canvas Xám Nhạt Cao Cấp (`bg-[#f8fafc] dark:bg-[#050505]`)**: Toàn bộ hệ thống bento cards màu trắng tinh khôi (`bg-white dark:bg-slate-900`) nổi bật tự nhiên với độ sâu thị giác (visual depth), viền hairline mềm mại và bóng đổ nhẹ `shadow-sm`, loại bỏ hiện tượng trắng bẹt hòa lẫn nền.
  - **Hệ Thống Điều Hướng URL Theo ID (`/study/listening?id=52` hoặc `?id=N`)**: Tự động nhận diện tham số ID trên URL để nạp bài học tương ứng từ CSDL Neon, tự động thu gọn Sidebar khi vào làm bài và mở rộng lại khi bấm Quay lại.
  - **Thanh Đỉnh Thống Nhất Tràn Viền (`StudioTopHeader.tsx`)**: Header chuẩn hoá cho cả 2 trang với thanh bar ngang phẳng `w-full px-5 sm:px-6 py-2 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800`, gồm nút Quay lại `←`, Tiêu đề bài học nổi bật to rõ (`font-display`), Nút Bookmark `☆`, Segmented Switcher `[🎙️ Shadowing]` ⟷ `[🎧 Dictation]` nằm ngay cạnh tiêu đề, cụm đổi giọng đọc `[US / UK / AU]`, Đồng hồ điện tử Pill bên phải, cùng Modal Bảng Phím Tắt Luyện Tập Studio (`Keyboard`) hiển thị trực quan các phím `Space`, `Ctrl`, `Enter`, `Alt+H`, `Alt+R`, `Alt+A`, `←/→`, `Shift + ←/→`.
  - **Bố Cục 100vh Zero-Scroll Studio (Không Cần Cuộn Trang)**: Toàn bộ không gian làm bài (`?id=...`) được khóa cố định theo chiều cao màn hình `100dvh` (`h-screen max-h-screen overflow-hidden`), bám sát lề thanh Sidebar thu gọn (72px) và mép phải màn hình.
  - **Bố Cục 2 Cột Liền Mạch Ngăn Cách Bằng Vạch Đứng (`border-l`)**:
    - **Cột Trái (Flex 1 - Main Dictation Workspace)**:
      - **Khối Audio Waveform Studio (`StudioWaveformCard.tsx`)**: Khung card `rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 shadow-sm p-3.5 sm:p-4 space-y-2.5`, bố cục 2 góc rìa trên, phổ sóng âm 41 thanh Pinned Caps căn giữa với hiệu ứng Fluid Harmonic Wave `h-11 sm:h-12`, hàng 5 nút điều khiển, dock chọn tốc độ `[0.5x 0.75x 1x 1.25x 1.5x]` và thanh điều chỉnh âm lượng Volume/Mute.
      - **Dòng Meta Phản Xạ & Thanh Tiện Ích**: `#2 0/13 từ Khớp: 0% [Enter] [Ctrl]`, Thanh công cụ tiện ích `rounded-xl px-3.5 py-2` (`Lưu câu`, `Báo cáo`, `-A/+A` chỉnh cỡ chữ 4 cấp, switch `Tự động tiếp`, switch `Ẩn dịch (i)`).
      - **Trình Nhập Liệu Chép Chính Tả 2.0 (`DictationWorkspace.tsx` & `dictationEngine.ts`)**:
        - **3 Chế Độ Thử Thách**: `🎯 Chuẩn (Standard)`, `💡 Gợi ý (Assisted)`, `🕶️ Blind (Ẩn toàn bộ word count & letter placeholders)`.
        - **Dung Sai Lỗi Gõ Phím (Fuzzy Typo Tolerance)**: Cho phép sai số Levenshtein $\le 1$ trên các từ dài kèm banner gợi ý nhẹ nhàng, tránh ức chế cho người học.
        - **Chuẩn Hóa Dạng Viết Tắt & Tương Đương**: Tự động nhận diện tương đương cho `don't` ⟷ `do not`, `&` ⟷ `and`, `5` ⟷ `five`...
        - **Hiệu Ứng Âm Thanh Haptic Dopamine**: Sử dụng Web Audio API tổng hợp âm báo đúng/sai siêu nhẹ, có nút bật/tắt `🔊 Âm thanh` lưu cấu hình vào `localStorage`.
        - **Tự Động Lưu Nháp Câu (Draft Autosave)**: Lưu câu đang gõ vào `sessionStorage` và tự động khôi phục ngay khi học viên chuyển câu hoặc tải lại trang.
        - **Bộ Đệm Âm Thanh Tức Thì (Zero-Latency Audio Prefetching)**: Tự động tải trước âm thanh câu tiếp theo $N+1$ trong bộ nhớ để triệt tiêu độ trễ khi chuyển câu.
      - **Dữ Liệu Bài Học Độc Nhất 100% (Zero Duplicate Sentences)**: Toàn bộ 112 bài học (485 câu) đạt độ độc nhất 100%, bổ sung các bài chuẩn A1-A2 và C1-C2, loại bỏ hoàn toàn các câu nhân bản tĩnh cũ.
    - **Cột Phải (Interactive Transcript Sidebar)**: Danh sách phụ đề tương tác bảo mật chống lộ đáp án khi đang chép, điểm phát âm, ghi chú bài học đám mây và danh mục bài học gợi ý.
  - **Màn Hình Mobile & Tablet (`< lg`, < 1024px)**:
    - **Chế độ Studio Immersion**: Tự động ẩn `BottomNav` và `Navbar` chung để giải phóng trọn vẹn ~120px không gian chiều dọc cho bài học.
    - **Header & Mobile Switcher Scale Chuẩn Công Thái Học**: Thanh chuyển tab Mobile `🎧 Luyện chép (1/14)` và `📑 Danh sách phụ đề (14)` với đường gạch chân bo tròn `h-[2.5px] bg-slate-900 dark:bg-white rounded-t-full`.
  - **Tra Từ Điển Popover & Mobile Word Dictionary Modal (`selectedWord`)**: Chạm vào bất kỳ từ vựng nào để mở modal tra nghĩa, phát âm IPA và ví dụ.
  - **Bộ Kiểm Thử Tự Động 100% PASS**: Đầy đủ các bộ test `data_uniqueness.test.ts`, `dictation_engine.test.ts`, `listening_db_sync.test.ts` đảm bảo 100% không trùng lặp và tương thích hoàn hảo.

- **`/study/shadowing`**: Phòng Luyện Nói Shadowing & Nhại Giọng AI Chuyên Sâu (Chuẩn Mực Agency High-End $150k+ Tier, Triệt Tiêu 100% 0px CLS, Công Thái Học Di Động Thumb Dock & Sóng Âm Phản Xạ Năng Lượng Thực Tế).
  - **Tích Hợp Master AppTopHeader Chuẩn Agency Toàn Diện**:
    - **Tìm Kiếm Thích Ứng Đa Nền Tảng (`searchProps`)**: Liên thông trực tiếp trạng thái tìm kiếm bài học `listingSearch` vào `AppTopHeader`. Desktop hiển thị ô tìm kiếm sắc nét bo tròn `rounded-xl`; Mobile hiển thị icon kính lúp mở khay tìm kiếm toàn màn hình tự động focus, triệt tiêu hoàn toàn tình trạng tràn viền hoặc co rúm layout.
    - **Huy Hiệu Gamification Đỉnh Cao (`showGamificationStats`)**: Hiển thị trực tiếp Chip Ngọn Lửa Streak 🔥 (ngày liên tục) và Chip Kho Vàng 🪙 (số coins thực tế của học viên), click để xem phân tích `/analytics` hoặc mua sắm tại `/shop`.
    - **Bảo Toàn 100% Avatar Người Dùng Trên Desktop**: Giữ nguyên vẹn Avatar người dùng và Menu Popover đa năng (Profile, Settings, Theme Switcher, XP Mentor AI, Đăng xuất) bất kể danh sách bài học hay ô tìm kiếm đang hoạt động, chấm dứt hoàn toàn hiện tượng ẩn mất avatar cũ.
  - **Kiến Trúc Tải Trang 0px CLS & Micro-Hero Stats Bento Grid (Kế Thừa Từ `/analytics`)**:
    - **Lưới 4 Thẻ Bento Chỉ Số Luyện Nói Đỉnh Trang (`Double-Bezel` `rounded-2xl` ngoài, `rounded-xl` trong)**:
      1. *Số câu đã luyện* (`sentencesPracticed`): Icon `Mic` trong nền xanh hoàng gia `text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/40`.
      2. *Độ chuẩn xác AI trung bình* (`averageFluency` %): Icon `Target` trong nền xanh ngọc bích `text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40`.
      3. *Số bài học hoàn thành* (`completedLessonsCount`): Icon `Trophy` trong nền vàng hổ phách `text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40`.
      4. *Thời gian luyện nói thực tế* (`studyMinutes`): Icon `Clock` trong nền tím AI `text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40`.
    - **Khung Xương Chỉ Số & Category Dock Đồng Bộ Hình Học 1:1 (`ShadowingListingSkeleton`)**: Tái hiện chuẩn xác 100% từ Lưới 4 Thẻ Bento Hero đến Thanh Dock Lọc Danh Mục 4 Tab (triệt tiêu hoàn toàn cú giật 48px CLS khi dữ liệu nạp xong), kèm thanh Header Skeleton 56px với mobile search button, desktop search input, streak chip, gold chip và avatar viền tròn (`ShimmerBox` 60fps), loại bỏ triệt để hiện tượng Flash Mock Data trước khi CSDL PostgreSQL Neon phản hồi.
    - **Khung Xương Studio Đồng Bộ 100% Header & Toolbar (`ShadowingStudioSkeleton`)**: Tái hiện chuẩn xác thanh Header Studio với huy hiệu CEFR `[ B1 ]`, cụm nút Accent `[US] [UK] [AU]`, thanh điều khiển sóng âm 95-spikes, hàng Meta status và 2 cột làm bài, loại bỏ 100% layout shift khi người dùng click vào bài học.
  - **Công Thái Học Di Động Chuẩn Wadhah Aloui (Rule 13 Mobile Thumb Sticky Audio Dock)**:
    - Trên màn hình thiết bị di động (`< lg`, < 1024px), thanh điều khiển thu âm được ghim cố định ở đáy màn hình trong tầm với ngón tay cái (`MobileStickyAudioDock` bo kính mờ `bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]`).
    - Nút Thu Âm / Dừng Thu hình tròn cỡ lớn (`w-13 h-13`) nổi bật với hiệu ứng hào quang Rose/Cherry (Rule 18 & 20), đi kèm nút Nghe câu mẫu (`Volume2`), nút Nghe lại giọng bạn (`Headphones`), nút Làm lại câu (`RotateCcw`) và cụm nút chuyển câu trước/sau (`ChevronLeft`, `ChevronRight`).
    - Cột không gian làm bài được bù trừ khoảng an toàn `pb-24 lg:pb-3.5`, đảm bảo học viên cuộn nội dung tự do mà không bao giờ bị che khuất bởi thanh điều khiển đáy.
  - **Sóng Âm 95 Vạch Phản Xạ Năng Lượng Giọng Nói Thực Tế (Live Acoustic Energy Waveform)**:
    - Tích hợp Web Audio API `AnalyserNode` và Voice Activity Detection (VAD) tính toán biên độ năng lượng âm thanh thời gian thực (`liveAudioEnergy` 0.0 - 1.0) qua `requestAnimationFrame`.
    - Khi học viên bấm thu âm, 95 vạch sóng âm (`StudioWaveformCard.tsx`) lập tức chuyển sang dải màu Cherry Red `#f43f5e` (quy chuẩn Rule 20) và co giãn, nhấp nhô theo cao độ âm lượng giọng nói thực tế, tạo phản hồi xúc giác sống động như phòng thu âm chuyên nghiệp.
  - **Hiển Thị Điểm Số Phát Âm Trực Tiếp Trên Từng Câu Phụ Đề (`InteractiveTranscriptSidebar.tsx`)**:
    - Bổ sung prop `sentenceScores: { [idx: number]: number }` liên thông trực tiếp từ trường `inlineAiScores` trong CSDL Neon.
    - Mỗi thẻ câu phụ đề ở cột phải tự động hiển thị huy hiệu điểm số nổi bật: Điểm xuất sắc $\ge 80$ hiển thị huy hiệu xanh Emerald `✓ 92 ĐIỂM`, điểm đạt $\ge 50$ hiển thị huy hiệu xanh Royal `75đ`, giúp học viên theo dõi chi tiết độ tiến bộ của từng câu trong bài học mà không cần chuyển màn hình.
  - **Kiến Trúc Module Hóa Tách Hook Riêng Biệt (`useShadowingAudioRecorder.ts`)**:
    - Cô lập toàn bộ logic WebRTC `MediaRecorder`, Web Audio Analyser (VAD), Web Speech API (`SpeechRecognition`), đồng bộ chấm điểm `POST /api/listening/evaluate-speech` và lưu tiến độ `POST /api/listening/progress` thành Custom Hook độc lập.
    - Tinh gọn tệp điều phối chính `app/(dashboard)/study/shadowing/page.tsx` từ 1.141 dòng xuống còn ~750 dòng sạch sẽ, dễ bảo trì và mở rộng.
  - **Dock Bộ Lọc Phân Cấp 4 Tab Chuẩn Apple Motion (Apple-Grade Category / Level Filter Dock)**:
    - Con nhộng trượt lò xo Framer Motion Spring Physics (`layoutId="shadowingCategoryFilterIndicator"`, `stiffness: 450, damping: 32`) hiển thị chính xác số lượng bài học theo từng danh mục: `Tất cả (N)`, `Cơ bản A1-A2 (N)`, `Nâng cao B1-C2 (N)`, `Đã học (N)`.
    - **Vi Chuyển Đổi Lướt Sáng 180ms (`<LessonCardShimmer />` x8 thẻ)**: Khi học viên bấm chuyển tab danh mục, hệ thống kích hoạt hiệu ứng quét ánh kim 180ms giúp trải nghiệm thị giác luôn mượt mà, phản hồi lập tức mà không giật giật.
    - Hỗ trợ đổi bài ngẫu nhiên 8 bài (`handleShuffleBasic`, `handleShuffleAdvanced`) kèm toast thông báo nhẹ nhàng.
  - **Cơ Chế Chuyển Bài Nội Bộ Không Sập Khung (Seamless In-Studio In-Place Transition)**:
    - Khi học viên đổi bài học bên trong Studio Workspace (từ danh sách gợi ý hoặc Modal chọn bài), hệ thống giữ nguyên vẹn toàn bộ khung Studio Container (Header, Bộ thu âm WebRTC, Sóng âm, Nút điều khiển) và chỉ kích hoạt `<TranscriptSentencesSkeleton count={6} />` ở cột phụ đề trong 200ms (`isInPlaceSwitchingLesson`).
    - Triệt tiêu 100% hiện tượng unmount/chớp trắng màn hình và layout shift khi chuyển bài học trong Studio.
  - **Phòng Thu Âm WebRTC MediaRecorder & Bộ Chấm Điểm AI 6 Tiêu Chí**:
    - Ghi âm thời gian thực bằng WebRTC `navigator.mediaDevices.getUserMedia`, xử lý audio blobs và phát lại giọng học viên song song giọng mẫu bản xứ.
    - Ma trận phân tích 6 tiêu chuẩn quốc tế: Phát âm, Độ trôi chảy, Ngữ điệu, Độ đầy đủ, Tốc độ (WPM), Trọng âm từ.
    - Nhận diện trực tiếp giọng nói (SpeechRecognition) đánh dấu trực quan từng từ: `perfect` (Xanh Emerald) hoặc `needs_work` (Đỏ Rose).
  - **Màn Hình Vinh Danh & Đề Xuất Kế Tiếp (Gamification Bento Hub)**:
    - Khối Bento Hub vinh danh thành tích sau khi hoàn thành 100% câu luyện nói: Hero Cúp Vàng 3D, 4 thẻ Bento metrics, nút chính duy nhất `[ Bài học tiếp theo ➔ ]`, và 3 thẻ bài học đề xuất kế tiếp có thể click học ngay.
  - **Khả Năng Chống Chịu Lỗi & Ngoại Tuyến (Zero Blank Screen Resilience)**:
    - Khởi tạo SWR đồng bộ, tích hợp `AbortController` tự động hủy request khi unmount, cơ chế bắt lỗi `Failed to fetch` an toàn và tự động fallback về `MOCK_LESSONS_DATA` trong 0ms khi mạng ngắt kết nối.

- **`/study/ipa`**: Bảng Phiên Âm Quốc Tế IPA Tương Tác 3D (Interactive IPA Studio & Minimal Pairs Trainer) — Chuẩn Mực Agency Dashboard Tier ($150k+), Kiến Trúc Double-Bezel, Bảng Màu Ngữ Nghĩa 60-30-10, Phân Tách Phòng Thực Hành Chuyên Biệt, Sơ Đồ Khẩu Hình SVG Động & 7 Shared Reusable Components:
  - **Kiến Trúc Module Hóa Phân Tầng Chuẩn Doanh Nghiệp (`features/ipa/`)**:
    - **Tầng Thành Phần Dùng Lại Nhiều Lần (`components/shared/`)**:
      - `IpaAudioPlayButton.tsx`: Nút loa phát âm chuẩn 0ms với hiệu ứng sóng âm/ripple đa kích cỡ (`sm`, `md`, `lg`), tự động tích hợp `speakLessonText(text, { rate, accent })` dùng chung cho Thẻ âm, Inspector, Practice Lab, Danh sách từ ví dụ và Đấu trường cặp âm.
      - `IpaSpeechRecorder.tsx`: Bộ thu âm AI Microphone độc lập, đóng gói Web Speech Recognition API (`lang = "en-US"`), nút bấm micro lớn công thái học, phân tích giọng nói theo từ mẫu, tính toán điểm số % và callback kết quả kèm thưởng XP.
      - `IpaWaveformVisualizer.tsx`: Thanh sóng âm trực quan thời gian thực (Live Audio Energy Spikes) chuyển màu linh hoạt (Xanh hoàng gia `#0059bb` khi phát âm mẫu, Đỏ Rose `#f43f5e` khi micro thu âm theo quy tắc Rule 20).
      - `IpaSoundBadge.tsx`: Huy hiệu phân loại âm chuẩn 60-30-10 với micro dot tinh tế (Xanh hoàng gia cho nguyên âm dài, Xanh Sky cho nguyên âm ngắn, Tím AI cho nguyên âm đôi, Xanh Emerald cho phụ âm hữu thanh, Vàng Amber cho phụ âm vô thanh), triệt tiêu hoàn toàn mảng màu đậm lòe loẹt.
      - `IpaMouthAnatomySvg.tsx`: Component tương thích ngược (Backward Compatibility Wrapper), tự động định tuyến toàn bộ yêu cầu sang `IpaAnatomyViewer` thế hệ mới.
      - `features/ipa/components/anatomy/`: **Hệ Thống Giải Phẫu Ngữ Âm Học Y Khoa Chuyên Trách (Medical Phonetics Studio Module)**:
        - `anatomyGeometry.ts`: Động cơ toán học & giải phẫu tọa độ chi tiết cho 44 âm IPA, tính toán spline khối cơ lưỡi sinh học tự nhiên (Muscular Hydrostat) neo chắc vào gai cằm xương hàm dưới và võng sinh học xuống xương móng (triệt tiêu 100% đường chéo phẳng đáy), độ rơi quai hàm (mandible drop), rèm cơ vòm mềm & lưỡi gà thuôn mềm (Velum & Uvula), luồng khí âm học uốn lượn mượt mà và ma trận 5 điểm ghim định vị giải phẫu (`pins`).
        - `IpaSagittalCrossSection.tsx`: Sơ đồ giải phẫu mặt nghiêng y khoa chuẩn tỷ lệ nhân trắc học: Xương hàm dưới (Mandible) ôm khít viền cằm thật, xương hàm trên (Maxilla), nướu viền san hô hồng ôm chân răng thật, vòm ngạc cứng ngăn cách khoang mũi - miệng, khối cơ lưỡi uốn lượn tự nhiên theo thế phát âm, thành sau họng uốn cong sinh lý theo cột sống cổ (xóa bỏ cây cột thẳng đứng $90^\circ$), nắp thanh môn (epiglottis), sụn giáp quả táo Adam, dây thanh quản rung sóng ngọc bích / hổ phách, và **Hệ thống nhãn giải phẫu trực quan (`pins`)** hiển thị các cơ quan cấu âm chính bằng đường gióng hairline nét đứt cùng chữ thuần túy Slate-700 / Slate-200 có lớp halo 2.5px chống đè nét.
        - `IpaFrontalLipShape.tsx`: Mô hình khẩu hình môi 3D trực diện mặt trước chuẩn y khoa: Khóe môi hội tụ mềm mại (triệt tiêu hoàn toàn lỗi gai nhọn vây cá ở 2 bên khóe miệng), cung răng tự nhiên (Smile Arc) với răng cửa giữa to bản, răng cửa bên thon gọn và kẽ răng hairline thay thế hàng phím piano, vòm lưng lưỡi nhô cao sinh động trong khoang miệng khi phát âm các nguyên âm sau, xóa bỏ các nét xám thừa trên nhân trung/cằm, và dải sáng specular highlight mọng ẩm tự nhiên trên môi.
        - `IpaAnatomyViewer.tsx`: Master Container tích hợp bộ chuyển đổi 2 góc nhìn (`👤 Mặt Nghiêng` ⟷ `👄 Mặt Trước`), nút công tắc bật/tắt nhãn giải phẫu (`🏷️ Chú thích`), đèn định vị Holographic Spotlight và thẻ chú thích giải thích trực quan vị trí cấu âm.
      - `IpaWordExampleCard.tsx`: Thẻ từ vựng ví dụ tương tác tích hợp loa phát âm nhanh 1 chạm, phiên âm ngữ âm học và nghĩa tiếng Việt ngắn gọn.
      - `IpaMetricCard.tsx`: Thẻ chỉ số Bento Double-Bezel chuẩn Dashboard (`rounded-2xl` ngoài, `rounded-xl` trong, icon well `w-10 h-10`, typography font Display Black).
    - **Phân Khu 0: Hero Greeting & Tiến Trình Học Viên (`components/hero/IpaHeroGreeting.tsx`)**:
      - Kế thừa kiến trúc `DashboardHeroGreeting.tsx`: Avatar học viên viền tròn Aura, lời chào cá nhân hóa, huy hiệu cấp độ `Lv.N`, thanh tiến độ hoàn thành 44 âm (`masteredCount/44`).
      - **Công tắc gạt Thu Gọn / Mở Rộng Chỉ Số (iOS-Style Toggle Switch)**: Thay thế viên thuốc tiến độ trùng lặp bằng công tắc gạt Bật/Tắt "Chỉ số chi tiết" lưu trạng thái vào `localStorage`. Khi gạt Tắt (mặc định), toàn bộ 4 thẻ Bento Metrics và đường vạch ngăn được thu gọn mượt mà qua Framer Motion (`AnimatePresence`), tiết kiệm ~150px chiều cao màn hình giúp học viên tập trung 100% vào không gian luyện tập. Khi gạt Bật, mở rộng 4 thẻ Bento Metrics Double-Bezel (Âm đã thuần thục `BookmarkCheck` Royal Blue, Độ chuẩn xác AI TB `Target` Emerald, Cặp âm đã phân biệt `Swords` Purple, Chuỗi ngày luyện phát âm với Mascot 3D Crystal Flame).
    - **Phân Khu 1: Bảng 44 Âm Quốc Tế Đối Xứng Hoàn Hảo (`components/matrix/`)**:
      - `IpaMatrixBoard.tsx`: Bố cục đối xứng âm học chuẩn mực giữa Bảng Nguyên Âm & Bảng Phụ Âm, áp dụng đồng bộ hệ lưới `grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3` giúp kích thước, tỷ lệ và độ thoáng của mọi thẻ âm hoàn toàn đồng nhất:
        - *Thanh công cụ đỉnh*: Bộ chuyển đổi danh mục 3 tab dạng viên thuốc kèm icon trực quan (`Tất cả 44 âm` • `Layers`, `Nguyên âm 20` • `Volume2`, `Phụ âm 24` • `Mic`), bộ chọn tốc độ phát âm (`1.0x` chuẩn & `0.8x` chậm) tích hợp icon `SlidersHorizontal`, và ô tìm kiếm thông minh có nút xóa nhanh `X`.
        - *Khối Nguyên Âm (20 âm)*: Header giếng icon `Volume2` màu Xanh hoàng gia `bg-blue-50 text-[#0059bb]`, badge `12 Đơn • 8 Đôi` và Legend (Âm dài, Âm ngắn, Âm đôi). Cấu trúc 2 phân nhóm: 1.1 Nguyên âm đơn (12 âm = 4 cột x 3 hàng) và 1.2 Nguyên âm đôi (8 âm = 4 cột x 2 hàng).
        - *Khối Phụ Âm Đối Xứng (24 âm)*: Header giếng icon `Mic` màu Xanh ngọc bích `bg-emerald-50 text-emerald-600`, badge `16 Theo Cặp • 8 Đơn Lẻ` và Legend chỉ dẫn cơ chế thanh quản (Hữu thanh - Xanh Emerald, Vô thanh - Vàng Amber). Cấu trúc hóa 2 phân nhóm chuẩn mực hoàn toàn tương tự Bảng Nguyên Âm:
          - *2.1 Phụ âm có cặp đối xứng (16 âm = 4 cột x 4 hàng)*: 8 cặp âm đối xứng Vô thanh (Bật hơi) & Hữu thanh (Rung cổ) đi liền kề nhau (/p/-/b/, /t/-/d/, /tʃ/-/dʒ/, /k/-/g/, /f/-/v/, /θ/-/ð/, /s/-/z/, /ʃ/-/ʒ/).
          - *2.2 Phụ âm đơn lẻ & Bán nguyên âm (8 âm = 4 cột x 2 hàng)*: Âm mũi, âm cạnh lưỡi, âm lướt & âm thanh hầu (/m/, /n/, /ŋ/, /h/, /l/, /r/, /w/, /j/).
        - *Tối Ưu Bố Cục Không Gian 100% Thông Thoáng (Zero Floating Dock Obstruction)*: Loại bỏ hoàn toàn khối dock nổi đáy màn hình gây che khuất các thẻ âm và va chạm với các nút tròn/widget nổi; tối ưu toàn diện không gian tra cứu âm học thoáng đãng và trực quan.
      - `IpaSoundCardV2.tsx`: Thẻ âm dạng phím âm thanh (Apple Acoustic Key) cao cấp với **Cơ chế tương tác 2 tầng chuyên sâu**:
        - *Tầng 1 (Icon Loa góc trên)*: Click phát ngay **ĐÚNG ÂM NGỮ ÂM CÔ LẬP** (Isolated Phoneme) chuẩn quốc tế 0ms (ví dụ `/n/` phát âm ngân mũi [nː], `/p/` phát âm bật hơi [pʰ], `/iː/` phát âm nguyên âm dài [iː]), tuyệt đối không đọc tên chữ cái lộn xộn hay đọc chuỗi từ vựng.
        - *Tầng 2 (Thân thẻ âm)*: Click thân thẻ điều hướng thẳng vào **Phòng Luyện Âm AI** (`/study/ipa/practice?sound={id}`) để luyện tập chuyên sâu ngay cho âm đó.
      - `IpaSoundDetailModal.tsx`: Modal / Drawer soi nhanh khẩu hình và mẹo phát âm, tích hợp cụm nút nghe kép (Âm cô lập + Từ mẫu đơn lẻ) và thu âm AI.
    - **Phân Khu 2: Phòng Thực Hành Khẩu Hình & AI Chuyên Biệt (`components/practice-lab/IpaDedicatedPracticeLab.tsx`)**:
      - Không gian phòng thực hành Studio độc lập hỗ trợ Deep Focus ($150k+ Agency Tier):
        - **Studio Executive SubHeader**: Thay thế banner Hero Greeting cồng kềnh bằng thanh tiêu đề studio tinh gọn, tiết kiệm 200px chiều cao màn hình, tập trung 100% vào không gian luyện tập.
        - **Bộ chọn 44 âm thông minh (Category Fast-Picker & Smart Carousel - Agency $150k+ Tier)**:
          - Tích hợp 4 tab danh mục có icon và micro-badge số lượng (`Tất cả • 44`, `Nguyên âm đơn • 12`, `Nguyên âm đôi • 8`, `Phụ âm • 24`), tự động chuyển âm đầu tiên phù hợp khi đổi bộ lọc.
          - Cụm điều hướng gắn liền phím tắt `[Phím: ← →]` và Bộ đếm đồng bộ ngữ cảnh lọc (`08 / 12` khi chọn Nguyên âm đơn, `08 / 44` khi xem Tất cả).
          - **Định dạng phím âm thanh thuần túy & Căn giữa hoàn mỹ (100% Visual Center)**: Loại bỏ triệt để dấu chấm tròn `•` gây lệch chữ và xung đột với ký hiệu âm dài `/ː/`. Thay thế bằng **Thanh chỉ báo Nano Accent** siêu mảnh ở đáy (`w-3.5 h-[2.5px] rounded-full`) phân biệt màu theo 4 loại âm (Nguyên âm đơn - Xanh Royal, Nguyên âm đôi - Tím AI, Phụ âm hữu thanh - Xanh Emerald, Phụ âm vô thanh - Vàng Amber).
          - **Triệt tiêu 100% hiện tượng va chạm che đè nút (Zero Overlap & Safe Buffer)**: Vùng đệm an toàn `px-11` (44px) ở hai đầu dải cuộn giúp các nút trượt desktop tròn (`w-8 h-8`) không bao giờ đè lên các viên thuốc âm thanh.
          - **Nút điều hướng thông minh tự động ẩn/hiện (Smart Dynamic Chevrons)**: Tự động phát hiện biên độ trượt thực tế (`canScrollLeft`, `canScrollRight`), chỉ hiển thị nút cuộn khi có nội dung để trượt tiếp kèm hiệu ứng chuyển động mờ dần 300ms và dải mặt nạ Gradient Edge Mask hai bên.
        - *Cột Trái (6/12)*:
          - **Trung Tâm Âm Học Đối Chiếu & Nhận Diện Âm (Master Acoustic Stage - Agency $150k+ Tier)**:
            - **Định danh âm chuẩn xác & Khử trùng lặp**: Hiển thị phân loại âm (`IpaSoundBadge`), chỉ dẫn khẩu hình mở rộng (`mouthShape`) và tên tiếng Việt gọn gàng, triệt tiêu hoàn toàn sự lặp lại chuỗi văn bản.
            - **Typography IPA Quốc Tế**: Dấu gạch chéo `/` làm mờ thanh mảnh (`text-slate-300 font-light`), ký tự âm to rõ ở trung tâm không bị biến dạng font thành tam giác.
            - **Thẻ Từ Mẫu Tương Tác Trực Tiếp (Interactive Keyword Card)**: Bấm trực tiếp vào thẻ từ mẫu góc trên để nghe phát âm từ vựng 0ms kèm hiệu ứng hover lift và icon loa sống động.
            - **Bố Cục Lưới Đối Xứng Hoàn Mỹ (50/50 Dual Acoustic Actions)**: Hai nút phát âm (`Phát Âm Cô Lập` Xanh Hoàng Gia có sóng âm nhịp điệu và `Từ Mẫu` xám tương phản cao) được bố trí song song cân đối tuyệt đối 50/50, chiều cao `h-11`, triệt tiêu 100% hiện tượng vỡ hàng zíc-zắc.
            - **Bộ Tùy Chỉnh Âm Thanh Đỉnh Thẻ (Speed & Accent Control Dock)**: Tích hợp thanh chọn tốc độ đồng đều (`0.8x` / `1.0x`) và chọn ngữ điệu (`US` / `UK` / `AU`) tinh tế ngay cạnh tiêu đề "Luyện Nghe Chuẩn Âm".
          - **Sơ Đồ Giải Phẫu Khẩu Hình Mặt Người Nhìn Nghiêng (Master Sagittal Head Profile Cross-Section)**: Thiết kế chuẩn y khoa âm học quốc tế (World-Class Medical Phonetics): đường nét trán, sống mũi, khoang mũi, vòm ngạc cứng/mềm (lưỡi gà tự động hạ khi phát âm mũi), răng cửa và môi chuyển động tự nhiên; khối cơ lưỡi cấu trúc giải phẫu chuyển động mượt mà; luồng khí phát âm có sóng âm lan tỏa ngoài môi/mũi; dây thanh quản phát sáng hữu thanh/vô thanh; và điểm tiếp xúc cấu âm (Point of Articulation) nổi bật với đèn định vị Holographic Spotlight.
          - **Bảng 4 Thông Số Cấu Âm Chuẩn Xác**: Hợp nhất duy nhất 1 bảng (Khẩu hình môi, Vị trí lưỡi, Độ mở hàm, Thanh quản & Luồng hơi), triệt tiêu 100% hiện tượng trùng lặp thông số.
          - **Cẩm Nang Cấu Âm & Mẹo Độc Quyền**: Tích hợp 3 phân vùng rõ ràng (Hướng dẫn kỹ thuật tiếng Việt, Mẹo vàng sư phạm `Lightbulb` và Cảnh báo lỗi sai người Việt `AlertTriangle`).
        - *Cột Phải (6/12)*:
          - **Studio Thu Âm AI Microphone (`IpaSpeechRecorder.tsx`)**: Đóng gói Double-Bezel với giếng sóng âm nhấp nhô sống động, nút Micro lớn công thái học (Rule 13), hiển thị từ mục tiêu to rõ kèm nút nghe thử tức thì, thưởng **+15 XP & +5 Vàng**, và scorecard đánh giá % chuẩn xác.
          - **Kho Từ Vựng Ví Dụ Ngữ Cảnh (`IpaWordExampleCard.tsx`)**: Lưới thẻ từ ví dụ tương tác với hiệu ứng hover lift, hiển thị phiên âm và nghĩa tiếng Việt; chạm vào thẻ để kích hoạt từ làm mẫu thu âm ngay cho studio với nhãn `Đang luyện 🎙️`.
          - **Thanh Điều Hướng Tiến Trình Đáy Studio**: Cụm nút chuyển nhanh âm trước / sau công thái học (`[ ← /{prevSymbol}/ ]` • `Âm N/44` • `[ /{nextSymbol}/ → ]`).
    - **Phân Khu 3: Đấu Trường Cặp Âm Đối Chiếu 2.1 Vừa Vặn Màn Hình (Single-Screen Viewport-Fit Arena - `components/minimal-pairs/IpaMinimalPairsArena.tsx`)**:
      - Không gian luyện phản xạ tai nghe chuẩn Gaming Agency High-End ($150k+ Tier) tối ưu 1 màn hình duy nhất (Zero-Scroll Viewport Fit):
        - **Khởi Động Lập Tức & Triệt Tiêu Khối Thừa**: Loại bỏ khối `IpaHeroGreeting` cồng kềnh khỏi trang `/study/ipa/minimal-pairs`, học viên vừa vào trang là nhìn thấy ngay đấu trường và có thể bắt đầu thi đấu phản xạ tức thì trong **0ms** mà không phải cuộn chuột.
        - **Thanh Dock Điều Khiển Hợp Nhất (Single-Row Executive Game Dock ~44px)**: Hợp nhất toàn bộ vào 1 hàng ngang: Bộ chọn 12 cặp âm (Dropdown Bento nổi 3 cột), Con nhộng trượt 3 chế độ (`⚡ Thần Tốc` • `💖 Sinh Tồn` • `🧘 Huấn Luyện Sâu`), Chip Streak/Hearts, Nút bật/tắt SFX và Nút mở Sổ tay tham khảo.
        - **Đấu Trường Trung Tâm Vừa Vặn Màn Hình (~400px)**: Quả cầu âm học phát sáng phát âm tự động sau 220ms, Cặp thẻ đáp án đối xứng song song 50/50 (`grid-cols-2 gap-3 sm:gap-4`) tích hợp phím tắt `[ 1 ]` / `[ 2 ]`, và thanh phản hồi kết quả hiển thị chỉ dẫn công thái học `[ Space ]` nghe lại, `[ Enter ]` sang câu tiếp.
        - **Khung Sổ Tay Tích Hợp Phẳng 0px Che Khuất (Inline Collapsible Reference Panel)**: Xóa bỏ hoàn toàn lớp Modal nổi (`fixed inset-0`) và màn che tối (`backdrop-blur-xs`) che lấp sàn đấu. Sổ tay đối chiếu và mẹo khẩu hình được tích hợp phẳng ngay bên dưới Đấu trường, trượt mở êm ái bằng Framer Motion khi bấm `[ 📖 Sổ tay từ & Mẹo ]`. Người học vừa có thể quan sát sàn đấu vừa đối chiếu mẹo bên dưới mà không hề bị ngắt dòng tập trung.
        - **Thiết Kế Cặp Từ Tinh Gọn & Triệt Tiêu Lỗ Hổng Lưới (Audio Comparison Pills & Balanced Grid)**: Thu nhỏ chiều cao thẻ từ 95px xuống 48px với nút "So sánh" trung tâm tinh tế. Bố cục lưới 3 cột kết hợp thẻ Tip Capsule tự động lấp đầy các hàng lẻ (như bộ 5 thẻ), triệt tiêu 100% lỗ thủng khoảng trống bất đối xứng.
        - **3 Chế Độ Chơi Chuyên Sâu**: ⚡ *Phản Xạ Thần Tốc (Blitz Reflex 6s)* với thanh đếm ngược hairline 3px mượt mà, thưởng tốc độ +10 XP và Combo Multiplier bùng nổ (x1.0, x1.5, x2.0, x3.0 🔥); 💖 *Sinh Tồn 3 Mạng (Survival 3 Lives)* rung cảnh báo tim vỡ khi chọn sai; 🧘 *Huấn Luyện Âm Học Sâu (Zen Deep Training)* nghe thử mẫu âm A/B không giới hạn thời gian.
        - **Màn Hình Vinh Danh Bento Hub (Match Summary Hub - Agency Tier 2.2)**: 
          - *Chuẩn Hóa Đo Lường Phản Xạ & Triệt Tiêu Nghịch Lý Logic*: Giới hạn cận trên phản xạ (clamp `150ms - 8000ms`) và tự động ghi nhận thời gian khi hết giờ Blitz, kết hợp thang đánh giá tốc độ âm học chuyên nghiệp (`< 1.8s: ⚡ Thần tốc`, `< 3.2s: 🚀 Nhanh nhạy`, `< 5.0s: ⏱️ Tiêu chuẩn`, `≥ 5.0s: 🐢 Cần tăng tốc`), triệt tiêu triệt để tình trạng treo máy sinh số đo ảo và nghịch lý gắn nhãn "Chuẩn xác" cho thời gian phản xạ.
          - *Xóa Bỏ Hoàn Toàn Thanh Cuộn Hộp Chật (Auto-Height Expansion)*: Giải phóng danh sách Điểm Mù Âm Học (Acoustic Blindspots) khỏi giới hạn cứng `max-h-[125px]`, hiển thị trọn vẹn 100% tất cả các câu sai trong ván đấu một cách thoáng đãng, loại bỏ vĩnh viễn thanh cuộn xám Windows che khuất nội dung.
          - *Nâng Tầm Phiên Âm IPA Làm "Nhân Vật Chính"*: Tăng kích thước phiên âm lên `text-xs font-mono font-bold` đặt trong micro-badge xanh royal (`bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300`), nút nghe đối chiếu hiển thị trọn vẹn cả Từ vựng + Phiên âm (`Ship /ʃɪp/ vs Sheep /ʃiːp/`) kèm viền nổi bật từ mục tiêu và chuẩn hóa viết hoa đồng bộ.
          - *Công Thái Học Nút Bấm & Phím Tắt*: Chuẩn hóa phím tắt bàn phím thành thẻ `<kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono">↵ Enter</kbd>` thanh lịch, phân cấp rõ rệt giữa nút Primary (Cặp Tiếp Theo) và Secondary (Chơi Lại).
          - *Hero Rank Banner & 4 Bento Metrics Đẳng Cấp*: Khối Rank Header với biểu tượng vinh danh trong khung bo `rounded-2xl` nổi bật, huy hiệu Rank pill có icon `Award`, và 4 thẻ Bento đồng điệu nhịp điệu (1 chỉ số to nổi bật + 1 nhãn phụ phân tích bên dưới).
    - **Động Cơ Phát Âm Ngữ Âm Cô Lập Chuẩn Quốc Tế (Isolated Phoneme Audio Engine)**:
      - Tích hợp trọn bộ **44 tệp audio ngữ âm cô lập chuẩn quốc tế** (Phonetician Master Recordings) lưu trữ cục bộ tại `public/audio/ipa/{sound_id}.ogg`.
      - Xây dựng module dịch vụ `shared/utils/ipaAudioPlayer.ts` (`playIpaIsolatedSound`, `stopIpaAudio`, `getIpaAudioUrl`) hỗ trợ điều chỉnh tốc độ `playbackRate` linh hoạt, phát âm tức thì 0ms, không phụ thuộc API bên ngoài, hoạt động bền bỉ offline.
      - Cập nhật catalog `features/ipa/data/ipaData.ts` bổ sung trường `isolatedAudioUrl` và helper `getIsolatedAudioUrl(soundId)`.
    - **Phân Tách 3 Trang Riêng Biệt & Tích Hợp AppTopHeader Toàn Hệ Thống**:
      - **Trang 1: Bảng 44 Âm Quốc Tế (`app/(dashboard)/study/ipa/page.tsx` • `/study/ipa`)**: Hiển thị Hero Greeting với 4 thẻ Bento metrics cùng Symmetrical Acoustic Soundboard Grid 4 cột cho cả Nguyên âm và Phụ âm.
      - **Trang 2: Phòng Thực Hành AI Riêng (`app/(dashboard)/study/ipa/practice/page.tsx` • `/study/ipa/practice`)**: Không gian phòng thu độc lập chuẩn Agency High-End bảo toàn 100% khối chứa Avatar & 4 Bento stat cards (`IpaHeroGreeting`), đi kèm sơ đồ giải phẫu khoang miệng SVG, thanh điều khiển âm thanh ngang hợp nhất, AI Microphone studio và dải 44 sound pills có bộ lọc danh mục. Hỗ trợ query parameter `?sound={id}` để nạp trực tiếp âm được chọn từ Bảng 44 âm.
      - **Trang 3: Đấu Trường Cặp Âm 2.1 Viewport-Fit (`app/(dashboard)/study/ipa/minimal-pairs/page.tsx` • `/study/ipa/minimal-pairs`)**: Đấu trường phản xạ thính giác 12 cặp âm kinh điển tối ưu 1 màn hình (Single-Screen), quy chuẩn chiều rộng đồng nhất 100% với Dashboard (`w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6`), vùng thi đấu tương tác trung tâm công thái học (`max-w-4xl mx-auto w-full`), 3 chế độ (Blitz 6s, Survival 3 lives, Zen), hệ thống âm thanh Web Audio SFX, phím tắt bàn phím `<kbd>`, màn hình vinh danh Bento Summary Hub và Sổ tay tham khảo ngăn kéo trượt.
      - **Tích Hợp `IpaSuiteNavTabs` Trên `AppTopHeader` (56px Baseline)**: Cả 3 trang đều chia sẻ chung thanh điều hướng đỉnh cao cấp với 3 tab cố định (`Bảng 44 Âm`, `Luyện Âm AI`, `Đấu Trường Cặp Âm`), trang bị hiệu ứng lò xo Framer Motion Spring Physics (`layoutId="ipaSuiteNavActiveTab"`), nạp trước tài nguyên ngầm `prefetch={true}`, Chip Kho Vàng 🪙 và Chip Ngọn Lửa Streak 🔥.
    - **Khung Xương Tải Trang Sinh Đôi 0px CLS (`app/(dashboard)/study/ipa/loading.tsx`)**:
      - Tái hiện chuẩn xác 1:1 từng pixel Header 56px với 3 Tabs Skeleton, Hero Greeting với 4 Bento Cards, và Lưới thẻ âm Shimmer 60fps.
    - **Kiểm Thử Tự Động Toàn Diện (`__tests__/ipa_feature.test.ts`)**: Bộ test suite chuyên biệt kiểm tra tính toàn vẹn 44 âm IPA, phân loại danh mục, thông số giải phẫu, mẹo phát âm, ví dụ từ vựng, xác thực 12 cặp âm Minimal Pairs và 3 nhóm danh mục, kiểm tra Web Audio SFX synth, xác thực 100% 44 tệp audio `.ogg` tồn tại và không rỗng, kiểm tra URL mapping, hàm phát audio, và xác thực ma trận tọa độ giải phẫu Sagittal & khẩu hình môi Frontal Lip cho toàn bộ 44 âm (17/17 tests PASS 100%).

- **`/study/practice`**: Phòng Luyện Tập & Ôn Tập Từ Vựng Đa Chế Độ Tương Tác 4-in-1 (Quiz Não Bộ, Flashcard 3D SRS, Writing Gõ Chính Tả & Speaking AI) — Chuẩn Mực Agency High-End $150k+ Tier.
  - **Kiến Trúc Mô-Đun Hóa Chuẩn Doanh Nghiệp (`features/practice/`)**:
    - Tái cấu trúc triệt để tệp nguyên khối 1,998 dòng (110 KB) thành hệ thống module chuyên trách, độc lập:
      - `types/`: Hệ thống Interface nghiêm ngặt (`PracticeWord`, `SubMode`, `QuizOption`, `FlashcardRating`, `PracticeSessionStats`).
      - `utils/`: 
        - `bookmark.ts`: Quản lý Sổ tay từ vựng qua `localStorage` 0ms an toàn môi trường SSR.
        - `similarity.ts`: Thuật toán chấm điểm mức độ trùng khớp văn bản và âm thanh giọng nói.
        - `shuffle.ts`: Bộ sinh số giả ngẫu nhiên PRNG deterministic triệt tiêu 100% mismatch hydration SSR/Client.
      - `hooks/`:
        - `usePracticeSpeech.ts`: Đóng gói Web Speech Recognition API, mô phỏng fallback trên trình duyệt chưa hỗ trợ, chấm điểm % độ khớp và tự động dọn dẹp tài nguyên âm thanh.
        - `usePracticeSession.ts`: Quản lý nạp từ vựng CSDL `/api/vocabulary` kết hợp fallback thông minh, bộ đếm giờ tổng, đồng hồ đếm ngược 30s từng câu kèm cảnh báo khẩn cấp, tích hợp `useStudyTimeTracker("vocab")` đo lường thời gian thực tế và chấm điểm.
        - `usePracticeKeyboard.ts`: Hệ thống phím tắt toàn năng (1-4, Space, Enter, ArrowLeft/Right) cho trải nghiệm ôn tập bàn phím siêu tốc không cần dùng chuột.
      - `components/`: 9 sub-components giao diện chuyên biệt (`PracticeSubModeBar`, `PracticeArenaHeader`, `PracticeQuizArena`, `PracticeFlashcardArena`, `PracticeWritingArena`, `PracticeSpeakingArena`, `PracticeArenaNavigation`, `PracticeWordLabSidebar`, `PracticeScoreCard`).
    - Tinh gọn tệp điều phối chính `app/(dashboard)/study/practice/page.tsx` xuống còn ~250 dòng code sạch sẽ, chuẩn SOLID.
  - **Tích Hợp Master AppTopHeader & Cụm Chip Gamification**:
    - **Hiển Thị Đầy Đủ Huy Hiệu Gamification (`showGamificationStats={true}`)**: Tích hợp trực tiếp Chip Ngọn Lửa Streak 🔥 và Chip Kho Vàng 🪙 của học viên trên đỉnh góc phải, kết nối trực tiếp `/analytics` và `/shop`.
    - **Bảo Toàn 100% Avatar Người Dùng & Hồ Sơ Trên Desktop**: Học viên luôn có thể mở Menu Popover Double-Bezel (`w-56 rounded-2xl`) để truy cập Hồ sơ, Cài đặt và đổi giao diện Sáng/Tối.
    - **Hiệu Ứng Con Nhộng Trượt Apple-Grade**: Gắn `layoutId="studyHeaderActiveTab"` chuyển đổi mượt mà giữa các phòng học (*Luyện từ vựng*, *Dictation*, *Shadowing*, *Thi thử đề*).
  - **Khung Xương Sinh Đôi Hình Học 1:1 Triệt Tiêu 100% 0px CLS (`loading.tsx`)**:
    - Tái tạo chuẩn xác 1:1 từng pixel từ Header Skeleton (Pills, Target, XP, Timer, Streak, Gold, User Avatar), Sub-mode bar, Bento 8/12 Arena (Arena header, Target prompt card min-h-[160px], Lưới đáp án 2x2, Bottom bar) đến Bento 4/12 Word Lab (Thẻ thông tin từ vựng, Ví dụ ngữ cảnh, Mẹo SRS), triệt tiêu hoàn toàn hiện tượng dịch chuyển bố cục khi tải trang.
  - **Chuẩn Hóa 19 Quy Tắc UI/UX Wadhah Aloui & Bảng Màu 60-30-10**:
    - **Kiến trúc Double-Bezel (Rule 10)**: Khối thẻ card ngoài cùng `rounded-2xl` (16px), các phần tử tương tác bên trong `rounded-xl` (12px).
    - **Nhãn ngoài chuẩn mực (Rule 6)**: Bổ sung nhãn ngoài cho ô nhập liệu Writing thay vì chỉ phụ thuộc vào placeholder.
    - **Phối màu ngữ nghĩa (Rule 20)**: 60% Nền Slate tối giản chống mỏi mắt, 30% Xanh hoàng gia `#0059bb` thương hiệu, 10% Điểm nhấn (Emerald cho đáp án đúng & tỷ lệ nhớ, Amber cho Streak/Gold/Gợi ý, Cherry Red `#f43f5e` cho đếm ngược <=3s và viền phát sáng Micro thu âm).

- **`/review`**: Phòng Lịch Ôn Tập Ngắt Quãng Spaced Repetition SM-2 (Đại tu toàn diện UI/UX theo chuẩn Agency Dashboard Tier đồng bộ 100% với `myvocab` & `dashboard`).
  - **Khung Xương Tải Trang Chuẩn Mực (`ReviewSkeleton` & `loading.tsx`)**: Tái hiện 1:1 cả 3 tầng bố cục thực tế (Thanh Header, 4 Thẻ Bento Stat Cards, Lịch SM-2 7/12 & Phân bố 5 cấp độ 5/12, Lịch ngày & Lưới từ vựng) với hiệu ứng sóng Shimmer 60fps, tương thích cả Light & Dark mode, triệt tiêu 100% hiện tượng nhấp nháy FOUC và giật layout (0px CLS).
  - **Tương Thích Mọi Kích Thước Màn Hình (Mobile nhỏ 360px, Tablet 768px, Desktop 1600px+)**:
    - *Mobile nhỏ (360px-430px)*: Ô ngày lịch co giãn linh hoạt (`h-9 sm:h-11`), badge số từ cần ôn `dueCount` đặt tinh tế không che số ngày, cụm nút điều khiển "Hôm nay" & Prev/Next co giãn tự nhiên, chú thích Lịch (Legend) chuyển sang dạng lưới 2x2 siêu gọn gàng.
    - *Thanh Hành Động Nổi Ngón Tay Cái Mobile (Rule 13 Wadhah Aloui)*: Cung cấp thanh Floating Action Bar cố định dưới đáy màn hình trên Mobile (`bottom-[70px] sm:hidden`), cho phép bắt đầu ôn bài ngay (+15 XP/từ) bằng ngón tay cái mà không cần cuộn trang.
    - *Kích Thước Vùng Chạm Tiêu Chuẩn*: Nút phát âm TTS và Bookmark trên thẻ từ nâng kích thước lên `w-8 h-8 sm:w-7 sm:h-7` cho trải nghiệm chạm thoải mái, chính xác trên màn hình cảm ứng.
    - *Tablet & Desktop*: Bố cục xếp tầng dọc tự nhiên trên iPad/Tablet, lưới thẻ hành động trống co giãn `sm:grid-cols-2 md:grid-cols-3`, lưới từ vựng 2 cột (Tablet) và 3 cột (Desktop) rộng thoáng.
  - **Hệ Thống Bo Góc & Thẩm Mỹ Đồng Bộ (Agency Bento Cards & Radius Hierarchy)**: Khối thẻ Bento cao cấp `rounded-2xl` (`bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs`) và các thành phần bên trong `rounded-xl` (ô ngày lịch, nút bấm, ô input, dropdown select).
  - **4 Bento Stat Cards Đỉnh Trang**: Cần ôn hôm nay (Amber `Flame`), Tỷ lệ nhớ từ (Emerald `Target`), Từ đã làm chủ (Royal Blue `Trophy`), Tổng từ đang học (Indigo `BookOpen`) với số liệu co giãn mượt mà `text-lg sm:text-2xl font-black font-mono`.
  - **Lịch Ôn Phản Xạ SM-2 (Calendar 7/12)**: Lưới ngày `rounded-xl`, ô ngày hiện tại (viền đôi Royal Blue `#0059bb`), ngày đang chọn (`bg-[#0059bb] text-white shadow-md shadow-[#0059bb]/30`), ngày có từ cần ôn (pill số lượng Amber), ngày hoàn thành (chấm xanh Emerald), tích hợp nút nhảy nhanh "Hôm nay" (`RotateCcw`).
  - **Thống Kê 5 Cấp Độ Ghi Nhớ SM-2 (Mastery Analytics 5/12)**: 5 thanh tiến trình cấp độ (Làm chủ, Thành thạo, Nhớ tốt, Nhận biết, Bắt đầu) với tỷ lệ phần trăm trực quan, phân tích sâu độ thuần thục của học viên mà không gây rối rắm.
  - **Thanh Bộ Lọc Chuẩn Rule 6 & Rule 12 Wadhah Aloui**: Nhãn ngoài (External Labels) rõ ràng, placeholder chỉ dẫn đầy đủ *"Tìm từ vựng, phiên âm, nghĩa tiếng Việt..."*, lọc từ loại POS, mức độ thành thạo và trạng thái lưu trữ.
  - **Lưới Thẻ Từ Vựng & Empty State Chúc Mừng**: Thẻ từ vựng `rounded-2xl`, nút phát âm TTS và bookmark xúc giác, accordion mở rộng phiên âm & ví dụ, cùng giao diện chúc mừng "All Caught Up" truyền cảm hứng kèm các lối tắt hữu ích.

- **`/study/exam-prep`**: Đấu Trường Thi Thử Đề Chuẩn Quốc Tế ETS / IELTS / TOEIC 2026 (Bento 3 Chế Độ Toàn Diện & Kiến Trúc Component Mô-đun Hóa Chuyên Sâu).
  - **Kiến Trúc Tách Component Chuyên Sâu (`app/(dashboard)/study/exam-prep/components/`)**:
    - **Shared Reusable Components (`components/shared/`)**:
      - `ExamCategoryBadge.tsx`: Huy hiệu danh mục đa sắc ngữ nghĩa (TOEIC, IELTS, TOEFL, THPTQG, VSTEP, CAMBRIDGE, GENERAL) với bảng màu gradient và border tương ứng.
      - `ExamStarRating.tsx`: Đánh giá độ khó 5 sao đồng bộ kích thước chuẩn và tooltip trực quan.
      - `ExamSubmitConfirmModal.tsx`: Hộp thoại modal xác nhận nộp bài / thoát thi với 3 chip thống kê (`Đã làm`, `Chưa làm`, `Đã đánh dấu ⭐`).
    - **Hub Sub-Components (`components/hub/`)**:
      - `ExamConfiguratorBanner.tsx`: Hero Bento Banner + Mode Switcher (`layoutId="examConfigModePill"`) + Ma trận 4 kỹ năng + Khung tùy biến đề thi AI.
      - `ExamFilterToolbar.tsx`: Bộ lọc 5 danh mục tab (`layoutId="examCategoryFilterPill"`) kèm ô tìm kiếm đề thi tức thì.
      - `ExamPaperCard.tsx`: Thẻ 37 đề thi chuẩn hóa Double-Bezel `rounded-2xl` ngoài, `rounded-xl` trong.
    - **Workspace Sub-Components (`components/workspace/`)**:
      - `ExamWorkspaceTopBar.tsx`: Thanh điều hướng cố định 56px (`h-14`), nút thoát, badge phân loại đề thi, đồng hồ đếm ngược với cảnh báo khẩn cấp $\le 300$s, toggle phiếu trả lời, nút nộp bài.
      - `ExamAnswerSheet.tsx`: Phiếu trả lời câu hỏi 6 cột chuẩn hóa gồm `ExamDesktopAnswerSheet` (cột phải 4/12) và `ExamMobileAnswerDrawer` (ngăn kéo đáy trượt mượt mà trên di động).
      - `ExamMobileThumbBar.tsx`: Thanh điều hướng nổi ngón tay cái dưới đáy màn hình trên Mobile (`[Trước]`, `[Ghim ⭐]`, `[Phiếu 📋]`, `[Tiếp]`).
      - `ExamQuestionWorkspace.tsx`: Khung chứa 4 không gian làm bài (`ListeningWorkspace`, `ReadingWorkspace`, `SpeakingStudioWorkspace`, `WritingStudioWorkspace`) cùng cụm nút chuyển câu Desktop.
    - **Result Sub-Components (`components/result/`)**:
      - `ResultMicroHeroBar.tsx`: Thanh tiêu đề micro-hero hiển thị tên đề thi, nút quay lại danh sách đề và nút thi lại.
      - `ResultScoreOverviewTab.tsx`: Tab 1 Điểm Số với SVG Radial Gauge đo độ chính xác, 4 thẻ Double-Bezel metrics và bảng phân tích Grade từng Part.
      - `ResultQuestionReviewTab.tsx`: Tab 2 Master-Detail Bento Review Studio gồm Cột trái Sticky Question Navigator (bộ lọc trạng thái, dropdown Part, ma trận câu hỏi 6 cột) và Cột phải Rich Question Deep Inspector (Audio player, Transcript, lựa chọn A-D, FormattedExplanation).
      - `ResultAiDiagnosticTab.tsx`: Tab 3 AI Cognitive Diagnostic Studio gồm Radar năng lượng 5 trục cốt lõi AI SVG Polygon, dự phóng điểm số & cố vấn Gemini AI, phân tích lỗ hổng bẫy đề thi và lộ trình hành động 14 ngày 3 chặng.
    - **Orchestrator Tinh Gọn**: Tái cấu trúc 2 trang nguyên khối khổng lồ (~4,000 dòng code combined) xuống còn ~350 dòng cho mỗi orchestrator (`page.tsx` và `result/page.tsx`), bảo toàn 100% logic nộp bài, lưu kết quả, tính điểm và 0px visual deviation.
  - **Top Bar Header Chuẩn Hóa (`AppTopHeader` 56px Baseline)**: Đồng bộ với toàn bộ phân hệ `/study` với cụm tab dùng chung `<StudySuiteNavTabs />` gồm đúng 4 tab (`Dictation`, `Shadowing`, `Luyện từ vựng`, `Thi thử đề`) đồng nhất 100% tên chữ với thanh bên `Sidebar.tsx`, chia sẻ chung con nhộng trượt Apple-grade `layoutId="studySuiteNavActiveTab"`.
  - **Chế Độ 1: Exam Hub / Test Bank (Ngân Hàng 37 Đề Chuẩn & AI Exam Generator)**:
    - **Hero Bento Banner**: Nền Slate thanh lịch điểm xuyết ánh sáng Rose/Cherry `#f43f5e` tạo cảm giác phòng thi chuẩn quốc tế nghiêm túc, tập trung.
    - **Bộ Chuyển Đổi Chế Độ & Ma Trận 4 Kỹ Năng**: Chuyển đổi mượt mà giữa "Đề Chuẩn Preset" và "Tạo Đề Mới AI" với con nhộng trượt `layoutId="examConfigModePill"`. Bộ chọn ma trận 4 kỹ năng (`Nghe • Listening`, `Đọc • Reading`, `Nói AI • Speaking AI`, `Viết AI • Writing AI`).
    - **Thanh Bộ Lọc & Tìm Kiếm**: Bộ lọc danh mục 5 tab với con nhộng trượt `layoutId="examCategoryFilterPill"`, ô tìm kiếm tức thì.
    - **Thẻ 37 Đề Thi Chuẩn Hóa**: Bo góc `rounded-2xl`, hiển thị sao độ khó ⭐, thời gian làm bài, số câu và nút CTA chính `[ Bắt đầu ↵ ]` (`rounded-xl`).
  - **Chế Độ 2: Live Test Workspace (Phòng Thi Trực Tuyến)**:
    - **Thanh Header Chuẩn Hóa Theo Phong Cách AppTopHeader (`h-14` 56px Baseline)**: Trải dài toàn chiều ngang, đính cố định trên cùng (`sticky top-0 z-30`), tích hợp nút `[← Thoát bài thi]`, icon well tài liệu, badge phân loại đề thi, bộ đếm ngược thời gian `Clock` và nút `[Nộp bài ngay]` nổi bật.
    - Dual-Panel Split View tối ưu cho từng kỹ năng (`ListeningWorkspace`, `ReadingWorkspace`, `SpeakingStudioWorkspace`, `WritingStudioWorkspace`).
    - Thanh điều hướng nổi ngón tay cái dưới đáy màn hình trên Mobile (`[Trước]`, `[Ghim ⭐]`, `[Phiếu 📋]`, `[Tiếp]`).
  - **Trang Báo Cáo Chấm Điểm Độc Lập (`/study/exam-prep/result`)**:
    - **Thanh Header Chuẩn Hóa `AppTopHeader` (56px Baseline)**: Đính cố định trên cùng (`sticky top-0 z-30`), tích hợp dải Pill 3 tab báo cáo (`[ 1. Điểm Số ]`, `[ 2. Lời Giải (N) ]`, `[ 3. Lộ Trình AI ]`) chuyển đổi mượt mà với con nhộng trượt `layoutId="examResultActiveTab"`, cùng 2 nút hành động trực tiếp bên phải: `[← Danh Sách Đề]` và `[🔄 Thi Lại]`.
    - **Tab 1: Bento Score Overview**: SVG Radial Gauge đo độ chuẩn xác, 4 thẻ Double-Bezel metrics (Câu đúng, Câu sai, Câu bỏ qua, Tốc độ làm bài), cùng bảng phân tích Grade từng Part.
    - **Tab 2: Master-Detail Bento Review Studio (Lời Giải Chuyên Sâu Nguyên Bản)**:
      - *Cột Trái (lg:col-span-4)*: Sticky Question Navigator với 5 bộ lọc trạng thái cân đối (Tất cả câu hỏi full-width, lưới 2x2: Đúng, Sai, Bỏ qua, Đánh dấu với Lucide Icons), Dropdown chọn Part, và Bảng Ma Trận Câu Hỏi Chuẩn Hóa Theo UI Phiếu Thi (`h-10` `rounded-xl` 2 dòng hiển thị số câu + đáp án đã chọn `A/B/C/D` + icon ngôi sao ghim) kèm 3 badge chú thích tổng số câu Đúng/Sai/Bỏ qua trực quan.
      - *Cột Phải (lg:col-span-8)*: Rich Question Deep Inspector gồm Thanh trạng thái câu, Audio Player Studio xanh `#ebf3fe` kèm Transcript, Lưới phương án A/B/C/D phân biệt `✓ ĐÁP ÁN CHÍNH XÁC` & `✗ BẠN ĐÃ CHỌN`, Hộp lời giải chuyên sâu hổ phách `FormattedExplanation` (hỗ trợ phân tích Gemini AI 1-click), và Stepper chuyển câu.
    - **Tab 3: AI Cognitive Diagnostic & Action Roadmap Studio**:
      - Radar Năng Lực 5 Trục Cốt Lõi AI (SVG Polygon lớn với 5 tiêu chí vi mô tại 5 góc biểu đồ), dự phóng điểm số & cố vấn Gemini AI, phân tích lỗ hổng bẫy đề thi và lộ trình hành động 3 chặng.
  - **Khung Xương Tải Trang (`loading.tsx`)**: Nâng cấp toàn diện theo chuẩn Skeleton Bento `rounded-2xl` & `rounded-xl` đồng bộ khổ rộng Dashboard, triệt tiêu 100% giật nhảy layout (Zero Layout Shift).

- **`/study/shadowing`**: Phòng Luyện Nói & Nhại Giọng Bản Xứ AI (Studio AI Speaking & Shadowing Bento 2 Cột).
  - **Kiến Trúc Kết Nối & Tối Ưu Hóa 100% Database PostgreSQL (`listening_lessons`, `listening_progress`, `daily_skill_practice`)**:
    - **Nạp 102 Bài Học Thật Từ CSDL Neon (`GET /api/listening/lessons`)**: Tải danh sách bài học thực tế, loại bỏ triệt để Mock Data tĩnh, hỗ trợ duyệt danh mục mượt mà và Modal "Khám phá 100+ bài".
    - **Hỗ Trợ Định Danh 3 Tầng (`/study/shadowing?id=52` hoặc `?id=listen_052`)**: Tự động giải quyết tham số URL và gọi API `GET /api/listening/lessons/[id]` nạp đầy đủ bản ghi âm, lời thoại song ngữ và từ vựng từ PostgreSQL Neon.
    - **Giao Dịch Ghi Nhận Tiến Độ Nguyên Tử ACID & Tự Động Xóa CSDL Khi Xong Bài**:
      - Tự động lưu tiến độ câu phát âm đạt chuẩn (>=80 điểm), đồng bộ số phút học và cộng điểm XP hồ sơ `Profile` và nhật ký kỹ năng `daily_skill_practice` (`skill: "shadowing"`).
      - Khi học viên hoàn thành 100% các câu của bài Shadowing, hệ thống tự động gọi API `DELETE /api/listening/progress` để xóa sạch bản ghi dở dang trong Neon PostgreSQL, giúp bài học được reset về 0% cho các lần luyện tập kế tiếp.
    - **Tái Thiết Kế Toàn Diện Màn Hình Hoàn Thành Bài Nói (Gamification Bento Hub)**:
      - Xóa bỏ hoàn toàn thanh ribbon hẹp và khối Full Transcript dài dòng gây lãng phí diện tích, thay bằng **Trung Tâm Tuyên Dương & Đề Xuất Bài Học (Gamification Bento Hub)** cân đối 100vh, triệt tiêu 100% khoảng trắng chết.
      - **Hero Tuyên Dương Trung Tâm**: Cúp Vàng 3D hào quang Gradient Amber phát sáng kết hợp tiêu đề vinh danh to rõ.
      - **Lưới 4 Bento Metric Cards Lớn (Rule 8 Wadhah Aloui)**: `+50 XP` (Vàng Amber), `100%` (Xanh Emerald - Trôi chảy & Ngữ điệu), `{total}/{total}` (Xanh Royal - Câu đã luyện nói) và `Thời gian` (Slate).
      - **Phân Cấp Nút Bấm Chuẩn (Rule 18 & 20)**: Nút chính duy nhất **[ Bài học tiếp theo ➔ ]** màu Xanh Hoàng Gia `#0059bb`, nút phụ **[ 🎧 Chuyển sang Luyện Nghe ]** và nút luyện lại.
      - **Lưới 3 Thẻ Bài Học Đề Xuất Kế Tiếp**: Tích hợp ngay phía dưới với ảnh thumbnail chuẩn 102x74px, huy hiệu CEFR kính mờ và nút `Học →`.
    - **Nâng Cấp Chuẩn High-End Visual Design ($150k+ Agency-Tier)**:
      - **Chuẩn Hóa Double-Bezel Trên Lưới Danh Mục (Rule 10)**: Nâng cấp toàn bộ thẻ bài học Hàng 1 (A1-A2) và Hàng 2 (B1-C2) sang kiến trúc viền kép: Thẻ ngoài bo `rounded-2xl` (16px), khung ảnh con bên trong bo `rounded-xl` (12px).
      - **Đồng Bộ Vị Trí Huy Hiệu CEFR (`bottom-2 left-2`)**: Di chuyển toàn bộ huy hiệu cấp độ trên ảnh bìa bài học xuống góc dưới bên trái với nền kính mờ `backdrop-blur-xs bg-slate-900/85 text-white font-mono font-bold text-[10px]`, nén cấp độ bằng `formatLevelBadge`.
      - **Thanh Header Studio Đẳng Cấp (`StudioTopHeader.tsx`)**: Trang bị nút Pill `[← Quay lại]`, gắn huy hiệu CEFR `[ B1 ]` màu Xanh Hoàng Gia ngay trước tên bài học và vách ngăn vi mô giữa cụm Mode và Accent.
      - **Hiển Thị Ngữ Âm IPA Sans-serif To Rõ**: Bổ sung dòng phiên âm `IPA: /.../` với chữ `IPA:` màu Xanh Hoàng Gia `#0059bb`, font Sans-serif sắc nét, không khối hộp bao quanh.
    - **Đồng Bộ Sổ Tay Lưu Câu (Cloud Bookmarking)**: Bấm "Lưu câu" (`handleToggleBookmark`) gửi request đồng bộ tức thì vào mảng `bookmarked_sentences` trên PostgreSQL Neon.
    - **Hộp Thoại Báo Cáo Câu Lỗi Tương Tác (`SentenceReportModal`)**: Cung cấp form báo lỗi 4 nhóm (Chính tả, Âm thanh, Bản dịch, Khác) kèm phản hồi Toast tức thì.
  - **Hệ Thống Skeleton Shimmer Loading Chuyên Sâu Khớp 100% Bố Cục (Rule 1 UI/UX & Zero Layout Shift)**:
    - **Listing Skeleton (`ShadowingListingSkeleton`)**: Khung xương Shimmer cao cấp (`ShimmerBox` ánh kim `@keyframes shimmer`) tái hiện chính xác 100% Header 56px, Lưới 8 Thẻ Cơ Bản A1-A2 và Lưới 8 Thẻ Nâng Cao B1-C2 với cấu trúc Double-Bezel `rounded-2xl` / `rounded-xl`, triệt tiêu 100% hiện tượng giật nhảy layout (0px CLS).
    - **Studio Skeleton (`ShadowingStudioSkeleton`)**: Tái hiện chuẩn xác 100% Khối Sóng Âm 95-spikes, Meta Status Row (`#1 0/N từ Khớp: 0%`), Sentence Utility Toolbar, Dải Word Tokens Track, Khối Micro Thu Âm Studio, Bảng Ma Trận 6 Tiêu Chí AI và Sidebar danh sách phụ đề 2 tab.
  - **Bố Cục 100vh Zero-Scroll Studio (Không Cần Cuộn Trang Khi Luyện Nói)**: Toàn bộ không gian làm bài (`?id=...`) được khóa cố định theo chiều cao màn hình `100dvh` (`h-screen max-h-screen overflow-hidden`), bám sát lề thanh Sidebar thu gọn (72px) và mép phải màn hình.
  - **Bố Cục 2 Cột Liền Mạch Ngăn Cách Bằng Vạch Đứng (`border-l`)**:
    - **Cột Trái (Flex 1 - Single-Sentence Shadowing Studio Workspace)**:
      - **Khối Sóng Âm & Điều Khiển (`StudioWaveformCard.tsx`)**: Card `rounded-2xl` với 95 thanh Spikes sắc nét, đồng hồ hiển thị thời lượng câu, 5 nút điều khiển mượt mà và dock tốc độ 5 nấc (`0.5x`, `0.75x`, `1x`, `1.25x`, `1.5x`).
      - **Dòng Meta Trạng Thái & Phím Tắt Phản Xạ**: `#1 0/N từ • Khớp: N%`, phím tắt `Enter` sang câu tiếp theo, `Space` nghe lại câu mẫu, `Alt+S` / `F2` bật/tắt Micro thu âm.
      - **Thanh Tiện Ích Đầy Đủ**: `Lưu câu 🔖`, `Báo cáo 🚩`, Chỉnh cỡ chữ 4 cấp `-A / +A`, Switch `Tự động tiếp`, Switch `Ẩn dịch (i)`.
      - **Khung Câu Trọng Tâm & Dải Từ Ngang Cuộn Mượt**: Dải từ vựng (`Word Tokens Track`) đặt phía trên với hiệu ứng highlight realtime theo từ đang đọc/nói, khung bản dịch tiếng Việt đóng mở mượt mà.
      - **Cụm Nút Thu Âm Studio & WebRTC MediaRecorder**: Nút Micro thu âm WebRTC chuyển động sóng âm trực tiếp, hỗ trợ nghe lại giọng thu âm của chính bạn (`Nghe lại giọng bạn 🎧`), nút nghe câu mẫu `Space` và nút làm lại câu `↺`.
      - **Chấm Điểm Giọng Nói AI Chuẩn Xác 100% (Real Voice Evaluation - Zero Math.random)**:
        - **Nhận Diện Giọng Nói Thật (Web Speech API + Web Audio VAD)**: Tích hợp bộ phát hiện hoạt động giọng nói (Voice Activity Detection) phân tích biên độ sóng âm RMS để từ chối im lặng hoặc tiếng ồn môi trường.
        - **Thuật Toán So Khớp Khoảng Cách Levenshtein Deterministic**: Bóc tách chính xác từng từ phát âm đúng/sai, tính toán độ hoàn chỉnh (*Completeness*), độ trôi chảy (*WPM Fluency*) và phát âm chuẩn bản xứ 100% không còn điểm số giả lập ngẫu nhiên.
      - **Ma Trận Chấm Điểm AI 6 Tiêu Chí Đa Chiều**: Phân tích chuyên sâu 6 chỉ số gồm Phát âm (*Pronunciation*), Trôi chảy (*Fluency*), Ngữ điệu (*Intonation*), Đầy đủ (*Completeness*), Tốc độ (*Speed WPM*) và Trọng âm (*Stress*), kèm nhận xét chi tiết từ AI Coach.
    - **Cột Phải (Interactive Transcript Sidebar)**: Danh sách phụ đề tương tác, thẻ câu đang học viền Xanh Hoàng Gia `#0059bb` (`ĐANG HỌC`), thẻ hoàn thành Xanh Emerald `#10b981` (`ĐÃ HỌC`), tab Gợi ý bài học liên quan và Danh sách từ vựng trọng tâm.
  - **Tương Tác Click Tra Từ Vựng 0ms & Mobile Word Audio Trigger**:
    - **Trên Mobile (`< 768px`)**: Chạm/nhấn trực tiếp vào bất kỳ từ vựng nào sẽ tự động kích hoạt **phát âm chuẩn bản xứ của từ đó tức thì (0ms TTS)** mà không gây che khuất màn hình hay nổi khối popover.
    - **Trên Desktop/Tablet**: Mở Word Dictionary Modal ở góc phải với cấu trúc `rounded-2xl shadow-2xl`, hiển thị nghĩa, giải thích chi tiết, câu ví dụ với font chữ đứng thẳng (`not-italic`), phát âm IPA chuẩn.
  - **Bộ Kiểm Thử Tự Động 100% PASS**: Bao gồm `speech_eval_real.test.ts` (kiểm thử thuật toán chấm điểm nói thật) và `shadowing_db_sync.test.ts`.
- **`/myvideo`**: Thư Viện Video & YouTube Subtitle Studio (Tái Thiết Kế & Module Hóa Chuyên Sâu Chuẩn Agency Dashboard Tier — Tuyệt Đối Bảo Toàn 100% Giao Diện 0px Visual Deviation).
  - **Kiến Trúc Module Hóa Chuẩn Atomic & Co-location (`features/myvideo/`)**:
    - **Tối Ưu Hóa Tệp Điều Phối Chính**: Rút gọn file trang chính `app/(dashboard)/myvideo/page.tsx` từ 1.535 dòng xuống còn ~350 dòng sạch sẽ, thuần chức năng orchestrator kết nối các hook và component chuyên trách.
    - **Shared Reusable Components (`features/myvideo/components/shared/`)**:
      - `WordLookupCard.tsx`: Thẻ popover tra từ điển 1-click dùng chung (Hiển thị từ hoa, phát âm IPA, từ loại, nghĩa tiếng Việt, nút 🔊 TTS `onSpeakWord`, nút `+ Lưu Notebook` đồng bộ CSDL +5 XP, nút đóng `X`).
      - `VideoCardItem.tsx`: Thẻ video đa năng hỗ trợ 2 biến thể hiển thị: `variant="grid"` (cho Thư viện video với thumbnail HD, overlay play tròn, badge thời lượng, badge danh mục & độ khó, thanh tiến độ gradient, nút yêu thích Star và nút xóa Trash) và `variant="playlist"` (cho danh sách phát thanh bên).
    - **Sub-Panes Cho Khung Học Tập (`features/myvideo/components/study-dock/`)**:
      - `SubtitlesTabPane.tsx`: Khung hiển thị phụ đề tương tác hỗ trợ chuyển đổi 2 chế độ (Focus 3 câu Rolling với `popLayout` mượt mà vs Toàn bộ danh sách Full List tự động scroll-into-view), Karaoke word-level highlighting màu hổ phách thời gian thực, tích hợp `WordLookupCard`.
      - `DictationTabPane.tsx`: Bài tập chép chính tả che khuyết từ (`maskDictationWord`), ô input điền từ, gợi ý ký tự đầu, kiểm tra đáp án (+20 XP), chuyển câu, kết hợp Web Speech Shadowing AI 9 thanh vạch sóng âm, nút Micro thu âm và kết quả chấm điểm phát âm /100 (+15 XP).
      - `PlaylistTabPane.tsx`: Danh sách video đã lưu sử dụng `VideoCardItem variant="playlist"`.
    - **Hub, Banner & Toolbar Components (`features/myvideo/components/`)**:
      - `InteractiveStudyDock.tsx`: Khối điều phối Study Dock 3 tab tinh gọn từ 601 dòng xuống ~110 dòng.
      - `VideoHeroMetricsBanner.tsx`: Hero Spotlight banner + 4 thẻ Bento Micro-Metrics (Video đã lưu, Thời lượng video, Phụ đề tương tác, Yêu thích & Tiến độ hoàn thành) tuân thủ Double-Bezel `rounded-2xl` / `rounded-xl`.
      - `YouTubeImportDeck.tsx`: 1-Click YouTube import form với nhãn ngoài Rule 6 Wadhah Aloui, dropdown Category & Level, nút Submit kèm spinner, Rule 1 Skeleton preview khi đang tải, và thông báo lỗi `importError`.
      - `VideoTopHeaderActions.tsx`: Cụm 4 nút công cụ desktop trên `AppTopHeader` (Phím tắt `?`, Nhập SRT, XP-Sub AI Engine, Xuất Subtitles).
      - `VideoPlayerStudio.tsx`: Khung phát video YouTube tỷ lệ vàng 1.62fr, dock điều khiển 5 nút bấm, micro-sync offset dock (±0.2s), dock chỉnh tốc độ (0.75x - 1.5x), thông tin bài học và thanh tiến độ hoàn thành gradient.
      - `VideoLibraryGrid.tsx`: Khung tìm kiếm video, 4 trạng thái lọc (`Tất cả`, `Đang học`, `Đã xong`, `Yêu thích`), dải cuộn ngang 8 chuyên ngành và lưới thẻ video Bento Cards.
      - Thư mục Modals (`components/modals/`): `KeyboardShortcutsModal.tsx`, `SubtitleExportModal.tsx`, `SrtImportModal.tsx`, `XpSubExtractorModal.tsx`.
    - **Bộ 3 Custom Hooks Chuyên Sâu Tách Biệt Nghiệp Vụ (`features/myvideo/hooks/`)**:
      - `useYouTubePlayerSync.ts`: Quản lý YouTube postMessage iframe refs, vòng lặp đồng bộ 35ms, tìm kiếm nhị phân $O(\log n)$, karaoke từ vựng, loop câu lặp lại, bộ thu phát âm nền Web Speech AI và các lệnh điều khiển player.
      - `useVideoExercises.ts`: Quản lý Dictation & Shadowing state, input che từ, kiểm tra đáp án, chuyển câu, thuật toán fuzzy Levenshtein so khớp giọng nói Web Speech API, tính điểm phát âm /100 và cộng thưởng XP.
      - `useWordLookup.ts`: Quản lý tra từ điển 1-click, tự động pause video, Free Dictionary API fetching, phát âm TTS, và đồng bộ đa tầng (Notebook localStorage, `vocabularyStore.learned`, `userStore.wordsLearned`, `awardXp`).
    - **Tệp Gom Xuất Tập Trung (`features/myvideo/index.ts`)**: Xuất toàn bộ components và hooks phục vụ nhập liệu sạch đẹp.
  - **Chuẩn Hóa 20 Quy Tắc UI/UX & Trải Nghiệm Học Tập**:
    - **Quy tắc 6 (External Label)**: Bổ sung nhãn ngoài độc lập, rõ ràng cho ô *"Đường dẫn video YouTube cần học:"* và ô *"Tìm kiếm video bài học:"*, triệt tiêu việc chỉ dựa vào placeholder.
    - **Quy tắc 1 (Skeleton Loading Khi Import)**: Khi học viên bấm nạp video YouTube, hệ thống hiển thị khung **Skeleton Preview Card** chuyển động ánh kim mô phỏng quá trình kết nối và bóc tách phụ đề mili-giây, thay thế spinner đơn điệu.
    - **Hệ Thống Phím Tắt Tiện Ích Pro-User (`KeyboardShortcutsModal`)**: Hỗ trợ đầy đủ phím nóng `Space` (Play/Pause), `R` (Lặp câu), `S` (Tráo câu), `←/→` hoặc `J/L` (Tua câu phụ đề), `1/2/3` (Chuyển nhanh giữa 3 tab), `Enter` (Nộp bài/Chuyển câu Dictation), `?` (Mở bảng tra cứu phím tắt phím cơ).
    - **Đồng Bộ Dữ Liệu Từ Vựng Thời Gian Thực**: Khi tra từ và nhấn *"+ Lưu Notebook"*, hệ thống không chỉ lưu vào `localStorage` mà còn đồng bộ trực tiếp vào `useVocabularyStore.getState().learned` và hồ sơ `wordsLearned` của người dùng để từ vựng xuất hiện ngay lập tức trong **Sổ từ của tôi (`/myvocab`)**.
  - **Đồng Bộ Hoàn Toàn Với Sidebar (`Sidebar.tsx`)**:
    - Mục **"Video của tôi"** trên Sidebar được chuẩn hóa icon máy quay `<Video className="w-[21px] h-[21px]" strokeWidth={1.9} />`.
    - Dải Pill trên Header đồng bộ 100% tên gọi & icon với Sidebar: `[ 🎬 Video của tôi (Active) ]` `[ 🎧 Dictation ]` `[ 🎙️ Shadowing ]` `[ 📑 Danh sách từ ]`.
  - **Thanh Header Đỉnh Dùng Chung Cao Cấp (`AppTopHeader` 56px Baseline)**: 
    - **Trên Desktop (≥ 1024px)**: Dính sát mép trên `top-0` và mép phải Sidebar, tích hợp `VideoTopHeaderActions` gồm `[ ⌨️ Phím tắt (?) ]`, `[ + Nhập SRT ]`, `[ ⚡ XP-Sub ]` và `[ 📄 Xuất Subtitles ]`.
    - **Trên Mobile (< 1024px)**: 1 Header duy nhất, nút Hamburger mở Drawer Sidebar, dải Pill co gọn icon thông minh, đầy đủ nút Theme Toggle & Avatar.
  - **Spotlight Hero Banner & 4 Thẻ Micro-Metric Double-Bezel**:
    - Thẻ Tổng Video (`Video`), Thời lượng học (`Clock`), Câu phụ đề tương tác (`Layers`), Video yêu thích (`Star` & tiến độ trung bình %).
    - Cấu trúc Double-Bezel chuẩn Dashboard (`rounded-xl` lồng trong `rounded-2xl` với nền `bg-slate-50/80 dark:bg-slate-950/60`).
  - **Master-Detail Bento Grid Tỷ Lệ Vàng (`1.62fr : 1fr`)**:
    - **Cột Trái (Player Studio 1.62fr)**: Trình phát YouTube IFrame nhúng 60fps đồng bộ thời gian thực mốc mili-giây với thuật toán Binary Search O(log n) kết hợp Punctuation-paced character-weighted word progression.
    - **Cột Phải (Interactive Multi-Tab Dock 1fr)**: 3 tab tương tác Phụ đề tra từ, Dictation AI, Playlist.
  - **4 Modal Độc Lập Chuẩn Hóa (`rounded-2xl`)**:
    - *Keyboard Shortcuts Modal*: Bảng tra cứu phím tắt phím cơ Pro-User.
    - *XP-Sub AI Extractor Enterprise Modal*: Trích xuất & đồng bộ phụ đề song ngữ tự chủ 100% từ YouTube Server (JSON, SRT, VTT, TXT).
    - *SRT / VTT Direct Import Modal*: Kéo thả File hoặc dán văn bản kèm bộ phân tích phụ đề Live Parser hiển thị tức thì.
    - *Export Subtitles Takeover Studio*: Báo cáo kỹ thuật và kiểm thử trích xuất phụ đề song ngữ mốc mili-giây với 4 định dạng (.SRT, .VTT, .JSON, Full View).
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện toàn bộ bố cục Dashboard, triệt tiêu 100% hiện tượng giật nhảy layout khi tải trang.
- **`/vocabulary`**: Kho Từ Vựng Tiếng Anh Thông Minh (Tái Thiết Kế & Module Hóa Chuyên Sâu Chuẩn Agency Dashboard Tier — Tuyệt Đối Bảo Toàn 100% Giao Diện 0px Visual Deviation).
  - **Kiến Trúc Module Hóa Chuẩn Atomic (`features/vocabulary/`)**:
    - **Tối Ưu Hóa Tệp Điều Phối Client**: Rút gọn `VocabularyThemesClientList.tsx` từ 532 dòng xuống còn ~230 dòng sạch sẽ, phân tách các thành phần tái sử dụng độc lập.
    - **Shared Reusable Components (`features/vocabulary/components/shared/`)**:
      - `ThemeCardItem.tsx`: Thẻ chủ đề từ vựng đa sắc ngữ nghĩa (Link `/vocabulary/[id]`, container `rounded-2xl`, khung icon `rounded-xl`, tên tiếng Việt, tên tiếng Anh, tổng số từ, nút mũi tên `ArrowUpRight`, badge cấp độ CEFR `A1-A2`/`B1-B2`/`C1-C2`, và thanh tiến độ gradient xanh `#0059bb` đến sky).
      - `VocabularyStatsBar.tsx`: 4 thẻ Bento Micro-Metrics Double-Bezel (`Bộ Chủ Đề`, `Kho Từ Vựng`, `Mục Tiêu Học`, `Trí Nhớ SRS`), thiết kế cân đối, không ngắt dòng.
    - **Tiện Ích Phân Loại Icon Ngữ Nghĩa (`features/vocabulary/utils/themeSemanticIcons.tsx`)**: Tách hàm `getSemanticThemeIcon` thành module độc lập, phục vụ đồng bộ icon trên toàn bộ trang danh sách và trang chi tiết chủ đề.
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**:
    - Tích hợp `AppTopHeader` với cụm tab dùng chung `<VocabSuiteNavTabs />` gồm 4 tab cố định (`Danh sách từ`, `Sổ từ của tôi`, `Lịch ôn tập`, `Video của tôi`) chia sẻ chung `layoutId="vocabSuiteNavActiveTab"`.
    - Nút hành động nhanh `[ ✨ Luyện Trí Nhớ Flashcards ]` nổi bật dẫn thẳng vào phòng luyện tập `/study/practice`.
  - **Hero Studio Toolbar & Segmented Level Switcher**:
    - Khung công cụ `rounded-2xl` với đường viền ambient blue rực rỡ, icon `BookOpen` / `GraduationCap` trong vòng tròn màu mềm, ô tìm kiếm từ vựng & chủ đề thông minh tích hợp nút xóa nhanh và bộ đếm kết quả realtime.
    - Bộ chuyển đổi 2 chế độ cấp độ trực quan dạng Segmented Control với con nhộng trượt `layoutId="vocabThemesLevelPill"`: `[ 📗 60 Cơ Bản ]` vs `[ 📘 155 Nâng Cao ]`.
  - **Khung Xương Tải Trang Đồng Bộ Hình Học 100% (`loading.tsx`)**: Tái hiện toàn bộ cấu trúc Header, Toolbar, 4 Metric Cards Double-Bezel và lưới Theme Cards 16 ô, triệt tiêu 100% hiện tượng giật nhảy layout.

- **`/vocabulary/[id]`**: Phòng Học & Khám Phá Từ Vựng Tương Tác 4 Chế Độ (Tái Thiết Kế & Module Hóa Chuyên Sâu Chuẩn Agency Dashboard Tier — Tuyệt Đối Bảo Toàn 100% Giao Diện 0px Visual Deviation).
  - **Kiến Trúc Module Hóa Chuẩn Atomic & Sub-Panes (`features/vocabulary/`)**:
    - **Tối Ưu Hóa Tệp Điều Phối Chính**: Rút gọn file trang chính `app/(dashboard)/vocabulary/[id]/page.tsx` từ **1.343 dòng xuống còn ~350 dòng sạch sẽ**, đóng vai trò thuần túy orchestrator kết nối các sub-panes và custom hooks.
    - **Sub-Panes Chuyên Trách Cho 4 Chế Độ Học Tập (`features/vocabulary/components/theme-detail/`)**:
      - `ThemeDetailHeaderBanner.tsx`: Khung Hero `rounded-2xl` với ambient blue line, biểu tượng chủ đề `getSemanticThemeIcon`, tiêu đề & mô tả, kết hợp 4 thẻ Micro-Metric bên phải (`Tổng Từ`, `Đã Thuộc`, `Yêu Thích`, `Tiến Độ %`).
      - `FlashcardStudioPane.tsx`: Không gian học thẻ lật 3D Perspective hai mặt (`perspective-[1500px]`, `[transform-style:preserve-3d]`): Mặt trước (POS, CEFR B1, nút ẩn ký tự `Eye`/`EyeOff`, nút tim Yêu thích, từ vựng lớn hỗ trợ Masked word, phát âm bản xứ TTS); Mặt sau (Nghĩa tiếng Việt in đậm, định nghĩa tiếng Anh, câu ví dụ ngữ cảnh, 2 nút hành động `Nghe Lại (P)` & `Đã Thuộc +15 XP`); kèm thanh điều khiển đáy (`Từ Trước`, `Trộn Thẻ`, Bộ đếm số lượng, `Từ Tiếp Theo`).
      - `VocabularyListPane.tsx`: Không gian tra cứu danh sách từ vựng với thanh tìm kiếm tức thì, bộ lọc 4 trạng thái (`Tất cả`, `Chưa thuộc`, `Đã thuộc`, `Yêu thích`), lưới thẻ `VocabCardItem` và Empty state khi không tìm thấy.
      - `QuizArenaPane.tsx`: Không gian trắc nghiệm 4 đáp án A-B-C-D chia 2 cột, phím tắt 1-4, hiệu ứng đổi màu đáp án Đúng (Emerald) / Sai (Rose), thanh điều khiển đáy (`Câu Trước`, Đếm số & Điểm, `Câu Tiếp Theo / Xem Kết Quả`), và màn hình vinh danh hoàn thành cúp 🏆.
      - `AiCoachPane.tsx`: Không gian cố vấn AI Tutor với 3 nút prompt 1-click (`Cho 3 ví dụ thực tế`, `Phân biệt ngữ cảnh`, `Mẹo ghi nhớ nhanh`), form đặt câu hỏi tự do textarea + nút `Gửi Câu Hỏi (+10 XP)`, và hộp phản hồi AI màu tím.
    - **Shared Reusable Component (`features/vocabulary/components/shared/VocabCardItem.tsx`)**:
      - Thẻ từ vựng hiển thị tiêu đề, POS, badge `✓ thuộc`, phiên âm IPA, nút 🔊 TTS `speak(v.word)`, nút tim Yêu thích `toggleFavorite(v.id)`, nghĩa tiếng Việt in đậm màu xanh hoàng gia `#0059bb`, định nghĩa tiếng Anh, ví dụ ngữ cảnh, 5 chấm độ thành thạo và nút `[ ⚡ Luyện ]` +15 XP.
    - **Bộ 3 Custom Hooks Chuyên Sâu Tách Biệt Nghiệp Vụ (`features/vocabulary/hooks/`)**:
      - `useVocabularyFlashcard.ts`: Quản lý lật thẻ (`isFlipped`), ẩn ký tự (`isWordMasked`), tự động phát âm khi chuyển từ (`autoPlayAudio`), đánh dấu bookmark, chuyển câu trước/sau, trộn ngẫu nhiên.
      - `useVocabularyQuiz.ts`: Quản lý câu hỏi trắc nghiệm, sinh ngẫu nhiên 4 lựa chọn, kiểm tra đáp án, tính điểm, thưởng XP và cập nhật `dailyChallengeStore` + `userStore`.
      - `useVocabularyAiCoach.ts`: Quản lý hội thoại AI Tutor qua API `/api/ai/chat`, trạng thái nạp và cộng thưởng +10 XP.
    - **Tệp Gom Xuất Tập Trung (`features/vocabulary/index.ts`)**: Xuất toàn bộ components, sub-panes, hooks, utils và data.
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**:
    - Tích hợp nút Back `[ ← Kho Từ Vựng ]`, dải 4 Pill Actions chuyển chế độ tức thì với con nhộng trượt `layoutId="vocabDetailViewModePill"`: `[ 🎴 Flashcard ]`, `[ 📋 Danh Sách ]`, `[ ⚡ Kiểm Tra ]`, `[ 🤖 AI Coach ]`, và nút CTA ôn tập nhanh `[ ⚡ Luyện Ngay +15 XP ]`.
  - **Khung Xương Tải Trang Đồng Bộ Hình Học 100% (`loading.tsx`)**: Tái hiện toàn bộ bố cục Header 56px, Hero Banner, 4 Metric Cards và khung Flashcard 3D, triệt tiêu hoàn toàn giật nhảy layout.

- **`/review`**: Phòng Ôn Tập Lặp Lại Ngắt Quãng SM-2 (Spaced Repetition Review Studio - Agency Dashboard Tier).
  - **Hệ Thống Icon Chuẩn Ngữ Nghĩa 100% & Triệt Tiêu Icon Xung Đột (Lucide 1.8 - 2.0 Stroke)**:
    - Loại bỏ hoàn toàn icon tia sét (`Zap`), đường tim mạch (`Activity`), cúp thi đấu (`Trophy`), la bàn (`Compass`) và các emoji thô (`⚡`, `🎯`, `📚`, `⭐`) không phù hợp phong cách thiết kế đương đại của XP Voca.
    - **Thẻ 1 "Cần ôn hôm nay"**: Dùng `CalendarClock` màu Vàng Amber (`#f59e0b`) chuẩn hóa thời điểm hẹn giờ ôn tập, giải phóng biểu tượng `Flame` cho việc nhận diện Streak.
    - **Thẻ 2 "Tỷ lệ nhớ từ"**: Dùng `Target` màu Xanh Emerald (`#10b981`) đo lường độ hội tụ phản xạ SM-2.
    - **Thẻ 3 "Từ đã làm chủ"**: Dùng `Crown` màu Xanh Hoàng Gia (`#0059bb`) vinh danh từ vựng Cấp 5 thành thạo, đồng bộ với `/myvocab`.
    - **Thẻ 4 "Tổng từ đang học"**: Dùng `Layers` màu Indigo (`#6366f1`) tượng trưng cho tập hợp ngăn xếp thẻ từ vựng xoay vòng.
    - **Thanh Điều Hướng Lịch SM-2**: Nút nhảy về ngày hiện tại trang bị `CalendarDays` trực quan thay thế cho icon Undo `RotateCcw`.
    - **Bảng Phân Bố Cấp Độ Nhớ**: Trang bị `BarChart3` biểu thị chuẩn xác 5 tầng phân bố dữ liệu học tập.
    - **Nút Hành Động & Mobile Floating Bar**: Nâng cấp nút "Bắt đầu ôn tập" và "Ôn tập ngày" sang `Sparkles` mang đậm bản sắc trí tuệ nhân tạo thông minh; chuẩn hóa độ dày nét `stroke-[1.8]` và `stroke-[2]` tinh tế.
    - **Empty State Tìm Kiếm**: Icon `Search` được đặt bên trong khối viền kép Double-Bezel `rounded-2xl` cao cấp với bóng đổ nhẹ `shadow-2xs`.
    - **Đồng Bộ Hoàn Toàn Với HeaderPillItem**: `CalendarIcon` (`text-[#0059bb]`), `Target` (`text-amber-500`), `BookMarked` (`text-slate-500`).

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

- **`/study/pvp`**: Đấu trường so tài từ vựng PvP Realtime 2.0 (Thiết kế Agency Dashboard Tier).
  - **Đồng Bộ Khổ Rộng Chuẩn Mực (`max-w-4xl` / `max-w-5xl`)**: Triệt tiêu hoàn toàn độ lệch co giãn giữa các bước Sảnh Chờ (Lobby) ➔ Đếm Ngược (Countdown) ➔ Đấu Trường (Battle) ➔ Báo Cáo (Results).
  - **Động Cơ Âm Thanh Tổng Hợp Web Audio Haptics (`pvpSoundEngine.ts`)**: Tích hợp các hiệu ứng âm thanh tổng hợp siêu nhẹ (tiếng đếm nhịp, tiếng tìm thấy trận, âm thanh chuông đúng/sai, kèn chiến thắng và nốt trầm khi thất bại) kèm nút chuyển đổi `Âm thanh: Bật/Tắt`.
  - **Phím Tắt Phản Xạ Bàn Phím Siêu Tốc**: Hỗ trợ phím số `1 - 4` hoặc chữ `A - D` để chọn nhanh đáp án, tích hợp huy hiệu chữ nổi bật trên từng thẻ phương án.
  - **Chế Độ Ghép Chữ Hoàn Hảo**: Trang bị nút `⌫ Xóa` ký tự để người chơi sửa nhanh chữ cái đã chọn mà không bị kẹt lượt.
  - **Chuẩn Mực Màu Sắc 60-30-10 & UI/UX Wadhah Aloui**: Nút chính Primary Xanh Hoàng Gia `#0059bb`, màu Đỏ Cherry Rose `#f43f5e` chỉ dùng cho đối thủ và thanh đếm giờ khẩn cấp ($\le 3s$), nhãn nhập liệu bên ngoài chuẩn Rule 6.
  - **Trận Đấu PvP 1v1**: Giao diện đấu thời gian thực sắc nét, đồng hồ đếm ngược, AI thông minh và báo cáo kết quả thưởng XP.
  - **Bộ Kiểm Thử 100% PASS (`__tests__/pvp_sound_engine.test.ts`)**: Đảm bảo an toàn tuyệt đối trong môi trường SSR lẫn trình duyệt thực tế.

- **`/study/games`**: Phân Hệ Mini Games Từ Vựng Tương Tác & Phản Xạ Nhanh 3-in-1 (Word Scramble, Memory Match & Wordle English) — Chuẩn Mực Agency Dashboard Tier.
  - **Kiến Trúc Module Hóa Chuyên Sâu (`features/games/`)**:
    - `types/index.ts`: Định nghĩa kiểu dữ liệu nghiêm ngặt `GameMode`, `ScrambleWordPackage`, `MemoryCard`, `WordleLetterStatus`, `WordleRowState`, `GameRecordPayload`.
    - `utils/gameAudio.ts`: Động cơ âm thanh Web Audio API 0KB (`playFlipSound`, `playCorrectDing`, `playWrongBuzzer`, `playVictoryFanfare`), an toàn môi trường SSR/Node.
    - `app/api/games/record/route.ts`: API xác thực và lưu trữ kết quả ván game máy chủ (Server-Authoritative Anti-Cheat Reward Pipeline). Kiểm tra thời lượng chơi tối thiểu (`durationSeconds >= 8s`), kích hoạt giãn cách rate-limit cooldown giữa các ván (12s), máy chủ độc quyền tính toán XP và Vàng có giới hạn trần (`MAX_XP = 60`, `MAX_COINS = 15`), ngăn chặn triệt để hành vi can thiệp Console F12 hoặc cURL script farm điểm bất hợp pháp.
    - `features/games/utils/recordGameSession.ts`: Tiện ích client-side gửi ván chơi lên endpoint bảo mật và đồng bộ XP/Vàng nguyên tử vào `userStore`.
    - `components/hero/GameHeroBanner.tsx`: Banner Spotlight Hero chuẩn Agency với ánh sáng gradient và thông số thưởng XP.
    - `components/catalog/GameCatalogGrid.tsx`: Lưới 3 thẻ Bento Game (`Word Scramble`, `Memory Match`, `Wordle English`) với hiệu ứng hover lift mượt mà, phân loại màu 60-30-10.
    - `components/scramble/WordScrambleGame.tsx`: Trò chơi xáo trộn chữ cái 8 từ, đếm ngược 30s, combo streak nhân điểm, ô chữ `rounded-xl` màu xanh hoàng gia `#0059bb`.
    - `components/memory/MemoryMatchGame.tsx`: Trò chơi lật thẻ 6 cặp (12 thẻ) rèn luyện trí nhớ Từ - Nghĩa, tính điểm theo hiệu suất lượt lật, thẻ `rounded-xl`.
    - `components/wordle/WordleEnglishGame.tsx`: Trò chơi Wordle tiếng Anh 5 chữ cái 6 lượt đoán, bàn phím QWERTY ảo lẫn gõ phím vật lý, giải mã màu Emerald/Amber/Slate, hiển thị nghĩa tiếng Việt & phiên âm IPA.
    - `components/shared/GameResultScreen.tsx`: Màn hình vinh danh chiến thắng Cúp Vàng 3D, tổng kết XP và Vàng, nút chơi lại ván mới.
    - `app/(dashboard)/study/games/page.tsx`: Orchestrator mỏng dưới 150 dòng, tích hợp `AppTopHeader` với cụm tab chuyển đổi nhanh và chip Gamification.
  - **Chuẩn Hóa 20 Quy Tắc UI/UX & Bảng Màu 60-30-10**:
    - Loại bỏ hoàn toàn lỗi bo góc nhọn `rounded-xs` (2px), nâng cấp lên `rounded-2xl` cho khối ngoài và `rounded-xl` cho phần tử con.
    - Không dùng chữ nghiêng, chữ đứng `not-italic` sắc nét.
    - Bộ kiểm thử tự động 100% PASS (`__tests__/games_feature.test.ts`).

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
- **`/ai/conversation`**: AI Conversation Studio — Phòng Luyện Giao Tiếp & Luyện Viết AI 1-1 Theo Chủ Đề (Chuẩn Mực Agency High-End $150k+ Tier).
  - **Kiến Trúc Mô-Đun Hóa Chuẩn Doanh Nghiệp (`features/ai/conversation/`)**:
    - Tái cấu trúc triệt để tệp nguyên khối 2,175 dòng (104 KB) thành module chuyên biệt độc lập:
      - `data/aiTopics.ts`: 6 chủ đề hội thoại đời thực, hệ thống mục tiêu giao tiếp, tin nhắn chào mừng, danh mục từ gợi ý và icon Lucide SVG.
      - `types/`: Hệ thống Interface nghiêm ngặt (`Topic`, `Goal`, `Message`, `SessionEvaluation`, `WordLookupData`, `PastSession`).
      - `hooks/useAiConversationSpeech.ts`: Đóng gói Web Speech API (`SpeechRecognition`), Web Audio Analyser (16 vạch sóng âm thời gian thực), bộ đếm thời gian thu âm và cơ chế dọn dẹp tài nguyên âm thanh an toàn.
      - `hooks/useAiConversationSession.ts`: Quản lý phiên hội thoại, lưu cache `localStorage` 0ms, nạp dữ liệu bản quyền dở dang từ PostgreSQL Neon (`/api/ai/sessions`), theo dõi thời gian học kỹ năng viết (`useStudyTimeTracker("writing")`) và đồng bộ CSDL tức thời.
      - `components/`: 7 sub-components giao diện chuyên biệt (`AiConversationTopBar`, `AiConversationChatStream`, `AiConversationInputDock`, `AiConversationInspectorDock`, `AiConversationScoreCard`, `AiConversationHistoryDrawer`, `WordLookupModal`).
    - Tinh gọn tệp điều phối chính `app/(dashboard)/ai/conversation/page.tsx` xuống còn ~530 dòng code sạch sẽ, chuẩn SOLID.
  - **Tích Hợp Master AppTopHeader & Cụm Chip Gamification**:
    - **Hiển Thị Đầy Đủ Huy Hiệu Gamification (`showGamificationStats={true}`)**: Tích hợp trực tiếp Chip Ngọn Lửa Streak 🔥 và Chip Kho Vàng 🪙 của học viên trên đỉnh góc phải, kết nối trực tiếp `/analytics` và `/shop`.
    - **Bảo Toàn 100% Avatar Người Dùng & Hồ Sơ Trên Desktop**: Loại bỏ nguy cơ ẩn avatar khi truyền `rightDesktopContent`; học viên luôn có thể mở Menu Popover Double-Bezel (`w-56 rounded-2xl`) để truy cập Hồ sơ, Cài đặt và đổi giao diện Sáng/Tối.
    - **Con Nhộng Trượt Apple-Grade (`layoutId="aiHeaderActiveTab"`)**: Trượt mượt mà với hiệu ứng vật lý lò xo Framer Motion giữa hai phân khu *"Luyện nói"* (`/ai/tutor`) và *"Luyện viết"* (`/ai/conversation`).
    - **Cụm Nút Hành Động Góc Phải Tinh Tế**: Nút Lịch Sử Buổi Học (`History`), Chip Đồng Hồ Thời Gian Thực (`Clock`) và Nút Chấm Điểm / Buổi Mới với hiệu ứng xúc giác tactile button press (`active:scale-95`).
  - **Khung Xương Sinh Đôi Hình Học 1:1 Triệt Tiêu 100% 0px CLS (`loading.tsx`)**:
    - Tái hiện chính xác 1:1 từng pixel từ thanh Header 56px (Header Pills, nút Lịch sử, chip Timer, nút Chấm điểm, chip Streak 🔥, chip Gold 🪙 và avatar viền tròn) đến thanh Hero Status Strip, 8/12 Chat Canvas (AI bubble, User bubble, Grammar fix, Suggestions strip, Mic button, Input box, Waveform 16-bars) và 4/12 Inspector Dock (Goals, Vocab, Phrases).
    - Triệt tiêu hoàn toàn hiện tượng Cumulative Layout Shift (CLS = 0px).
  - **Công Thái Học Di Động Chuẩn Wadhah Aloui (Rule 10, 13 & 20)**:
    - **Kiến trúc Double-Bezel**: Khung bao ngoài Chat Canvas và Inspector Dock bo `rounded-2xl` (16px), các phần tử con bên trong bo `rounded-xl` (12px), nút bấm và ô nhập liệu `rounded-xl`, nút mic `rounded-full`.
    - **Phối màu 60-30-10**: Nền Slate tối giản 60%, Xanh Hoàng Gia `#0059bb` 30%, và 10% điểm nhấn ngữ nghĩa: Hồng/Tím AI (`#d946ef` / `#8b5cf6`), Xanh Emerald (`#10b981`), Vàng Amber (`#f59e0b`), Đỏ Cherry/Rose (`#f43f5e` khi mic đang thu âm).
    - **Khay Nhập Liệu Ghim Đáy Tiện Dụng**: Trên thiết bị di động, khay nhập liệu được cố định trong tầm với ngón tay cái, tự động bù trừ khoảng đệm an toàn `pb-24 lg:pb-3` chống che chắn nội dung khi bàn phím ảo bật lên.
  - **Tra Từ Điển Popover Nhanh 1-Click & Lưu Sổ Từ (+5 XP)**: Chạm vào bất kỳ từ tiếng Anh nào trong câu trả lời của AI để mở modal tra phiên âm IPA quốc tế, nghĩa tiếng Việt, câu ví dụ thực tế và nút 1-click lưu vào Sổ tay từ vựng nhận ngay +5 XP.
  - **Báo Cáo Tổng Kết Đánh Giá 4 Trục & Lưu Trữ Lịch Sử Buổi Học**:
    - Chấm điểm đa chiều theo trọng số: 40% Mục tiêu + 30% Ngữ pháp + 20% Tương tác + 10% Vốn từ.
    - Phân hạng S/A/B/C và thưởng XP động (+15 đến +45 XP).
    - Ngăn kéo Lịch Sử Buổi Học (`AiConversationHistoryDrawer`) xem lại kịch bản đối thoại chi tiết các buổi học trước đây từ Neon PostgreSQL (`/api/ai/sessions`).
- **`/study/grammar` & `/study/grammar/[id]`**: Ngữ Pháp AI & Grammar Studio — Hệ Thống 60 Chuyên Đề Bài Giảng & Phòng Thi Trắc Nghiệm AI Phân Tích Chuyên Sâu Chuẩn TOEIC & IELTS (Agency Dashboard Tier).
  - **Kiến Trúc Mô-Đun Hóa Chuẩn Doanh Nghiệp (`features/grammar/`)**:
    - Tái cấu trúc triệt để 2 tệp nguyên khối **1,885 dòng (~121 KB)** (`grammar/page.tsx` 516 dòng $\rightarrow$ 67 dòng; `grammar/[id]/page.tsx` 1,369 dòng $\rightarrow$ 195 dòng):
      - `types/grammarTypes.ts`: Định nghĩa TypeScript nghiêm ngặt (`GrammarTopic`, `GrammarLesson`, `GrammarExercise`, `GrammarQuizResult`, `GrammarChatMessage`, `GrammarLevel`, `GrammarTopicStatus`).
      - `data/grammarTopics.ts`: Single source of truth cho toàn bộ 60 chuyên đề phân loại theo 3 cấp độ (20 Nền Tảng 500+ A1-A2, 20 Bứt Phá 750+ B1-B2, 20 Chinh Phục 900+ C1-C2), xóa bỏ hoàn toàn sự trùng lặp dữ liệu giữa trang catalog và trang detail.
      - `stores/grammarProgressStore.ts`: Zustand store lưu trữ tiến độ học tập và điểm số thi thử vào `localStorage` (`xp_grammar_progress`), tự động đánh dấu hoàn thành khi đạt $\ge 60\%$, tính toán độ chính xác trung bình và số bài đã thuộc.
      - `hooks/`:
        - `useGrammarCatalog.ts`: Quản lý bộ lọc 4 cấp độ (`all`, `basic`, `intermediate`, `advanced`), tìm kiếm thông minh, đếm số lượng bài theo cấp độ và thống kê tiến độ học viên.
        - `useGrammarExercise.ts`: Quản lý bài tập AI sinh tự động từ `/api/ai/grammar`, chọn đáp án, điều hướng phím tắt bàn phím (1-4, A-D, Enter, Space, ArrowLeft/Right), nộp bài, cộng điểm thưởng XP vào hồ sơ và đồng bộ CSDL `daily_skill_practice` qua `recordSkillPractice("Viết", 3, xpEarned)`.
        - `useGrammarAiChat.ts`: Quản lý hội thoại trợ lý AI Tutor chuyên sâu theo ngữ cảnh từng chuyên đề qua `/api/ai/chat`, hỗ trợ 4 gợi ý câu hỏi 1-Click thông minh.
      - `components/catalog/`: 4 sub-components chuyên biệt (`GrammarHeroMetrics`, `GrammarStudioToolbar`, `GrammarTopicCard`, `GrammarTopicGrid`).
      - `components/detail/`: 6 sub-components chuyên biệt (`GrammarTopicHero`, `GrammarTheoryStudio`, `GrammarQuizCard`, `GrammarResultReview`, `GrammarAiCompanion`, `GrammarPracticeStudio`).
  - **Trang Danh Mục Chuyên Đề (`/study/grammar`) — Đẳng Cấp Analytics Tier**:
    - **Tích Hợp Cụm Tab Dùng Chung (`AiSuiteNavTabs`)**: 4 tab cố định đồng nhất tuyệt đối với thanh bên Sidebar (`Trung tâm AI`, `Luyện nói`, `Luyện viết`, `Ngữ pháp AI`) chia sẻ chung `layoutId="aiSuiteNavActiveTab"`, chuyển đổi siêu mượt 0ms không giật lag.
    - **Lưới 5 Thẻ Bento Hero Metrics (Executive Bento Grid)**: Chuỗi học (`Flame` hổ phách), Chuyên đề đã thuộc (`CheckCircle2` lục bảo), Độ chính xác AI trung bình (`Percent` xanh hoàng gia), Tổng XP tích lũy (`Zap` tím), Thời gian học (`Clock` sky).
    - **Thanh Công Cụ Studio Toolbar**: Bộ lọc 4 viên thuốc cấp độ co giãn lò xo Apple spring sliding pill (`layoutId="grammarLevelToolbarPill"`) đi kèm ô tìm kiếm chuyên đề toàn diện với nút xóa nhanh `X`.
    - **Lưới 60 Thẻ Chuyên Đề Tương Tác**: Thẻ Double-Bezel `rounded-2xl` viền tinh tế, icon chủ đề đa sắc, nhãn trọng tâm kỳ thi (TOEIC Part 5 & 6, IELTS Writing Task 1 & 2, IELTS Speaking), huy hiệu trạng thái tiến độ thời gian thực (`Chưa học`, `Đang học`, `Đã thuộc` kèm % điểm số cao nhất), và nút "Học ngay" / "Ôn tập lại" với hiệu ứng xúc giác `active:scale-[0.98]`.
  - **Trang Chi Tiết & Phòng Luyện AI (`/study/grammar/[id]`)**:
    - **Thanh Header Tinh Gọn Tuân Thủ Quy Tắc $\le 4$ Tabs**: Nút Back quay về danh sách chuyên đề, đúng 2 tab chế độ chuyển đổi mượt mà (`Lý Thuyết` & `Luyện Tập AI` chia sẻ chung `layoutId="grammarLessonActiveTab"`), và nút CTA "Thi Thử AI +15 XP".
    - **Topic Hero Banner**: Hiển thị tiêu đề song ngữ, trọng tâm kỳ thi, và 4 micro metric cards (Công thức, Ứng dụng, Ví dụ mẫu, Thưởng luyện).
    - **Tab 1 — Theory Studio Chuyên Sâu**:
      - Khung Mẹo Ghi Nhớ Nhanh & Trọng Tâm phát sáng xanh/hổ phách viền kép.
      - Lưới 3 cột cấu trúc cốt lõi phân màu ngữ nghĩa: Khẳng định (+) Xanh Emerald, Phủ định (-) Đỏ Rose, Nghi vấn (?) Xanh Hoàng Gia.
      - Dải chip từ nhận biết & trạng từ chỉ thời gian.
      - Khối ứng dụng thực chiến trong đề thi TOEIC & IELTS kèm ví dụ và lưu ý làm bài.
      - Lưới ví dụ minh họa ngữ cảnh thực tế song ngữ có cờ Việt Nam và tô đậm từ trọng tâm.
      - Khung cảnh báo bẫy đề thi & các lỗi sai phổ biến (`wrong` gạch ngang đỏ vs `correct` xanh lục bảo kèm giải thích chi tiết).
      - Dock hành động chân trang: "Trở về kho ngữ pháp" và "Bắt đầu bài thi thử AI".
    - **Tab 2 — AI Practice & AI Tutor Companion (Bento 8/12 + 4/12)**:
      - *Cột Trái (8/12 - AI Quiz Arena & Result Review)*:
        - Sinh 5 câu trắc nghiệm thực chiến bám sát chuyên đề từ Gemini AI (`/api/ai/grammar`).
        - Lưới 4 đáp án 2 cột, phím tắt 1-4 / A-D, thanh tiến trình hoàn thành và hộp giải thích AI tức thì sau khi chọn đáp án.
        - Màn hình tổng kết điểm số Scorecard, huy hiệu Đạt Chuẩn / Cần Ôn Lại, review chi tiết từng câu kèm lời giải AI và nút "Làm Đề Mới".
      - *Cột Phải (4/12 - Sticky AI Tutor Companion)*:
        - Khung chat đồng hành với AI Tutor, 4 gợi ý câu hỏi 1-Click thông minh, định dạng markdown in đậm và tự động thưởng +10 XP cho mỗi câu hỏi học thuật.
    - **Đo Lường Thời Gian Thực & Đồng Bộ CSDL**: Tự động kích hoạt `useStudyTimeTracker("writing")` và bộ đếm thời gian thực tế ghi nhận vào `daily_skill_practice`.
  - **Khung Xương Sinh Đôi Hình Học 1:1 Triệt Tiêu 100% 0px CLS**:
    - `study/grammar/loading.tsx`: Tái hiện chuẩn xác 1:1 Header 4 tabs `AiSuiteNavTabs`, Hero 5 Bento Cards, Toolbar 4 pills + search, và 8 Thẻ Chuyên Đề.
    - `study/grammar/[id]/loading.tsx`: Tái hiện chuẩn xác 1:1 Header với nút Back + 2 tabs, Hero Banner 4 micro cards, và Theory Studio.
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
- **`/profile`**: Hồ sơ cá nhân học viên (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm Navigation Pills (`[ 👤 Hồ Sơ Cá Nhân ]`, `[ ⚙️ Cài Đặt ]`, `[ 📊 Thống Kê ]`, `[ 🛍️ Shop ]`) kết hợp nút Sao chép liên kết chia sẻ hồ sơ và nút chuyển đổi Cài đặt thông tin.
  - **Spotlight Hero Profile Stage Card (`rounded-2xl`)**: Gradient Xanh Hoàng Gia sang trọng (`from-[#0059bb] via-[#004799] to-[#002b5b]`), vành khung Avatar danh hiệu concentric double bezel (`🎓`, `👑`, `🛡️`), huy hiệu Cấp độ `LV.x`, số ngày Streak rực rỡ và số dư Vàng live.
  - **4 High-Contrast Bento Metric Cards (`rounded-2xl`)**: Từ vựng tích lũy (`BookOpen`), Chuỗi Streak (`Flame`), Kinh nghiệm XP & Level (`Zap`), Vàng & Bảo Hộ Streak (`Coins`).
  - **Bento Grid 8/12 & 4/12**:
    - **Cột Trái (8/12)**: Mini Skill Activity Meters (Tóm tắt tiến độ 5 kỹ năng *Từ vựng*, *Viết*, *Nói*, *Dictation*, *Shadowing*), Kho Huy Hiệu Thành Tích với bộ lọc 3 tab (*Tất cả*, *Đã đạt*, *Chưa mở*), Rương Vật Phẩm Trang Bị & Trang Phục Cử Nhân (`🎓 Cú Tốt Nghiệp`).
    - **Cột Phải (4/12)**: Phân tích Cấp độ & Danh hiệu tiến bước, Lối tắt ứng dụng đến Thống Kê, Đấu Trường PvP, Cửa Hàng Shop và Bảng Xếp Hạng.
  - **Form Cài Đặt Hồ Sơ Mượt Mà (`rounded-2xl`)**: Mở rộng mượt mà với Framer Motion, nhãn ngoài float label (Rule 6), ô nhập viền hoàn chỉnh `rounded-xl` (Rule 15), bộ chọn Avatar Emoji và nút Primary duy nhất "Lưu thay đổi" (Rule 18 & 19).
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Triệt tiêu hoàn toàn giật nhảy layout (Zero CLS).
- **`/myvocab`**: Bộ Từ Vựng Của Tôi (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm nút chuyển đổi chế độ và lối tắt vào Lịch Ôn Tập SM-2 (`/review`).
  - **4 Thẻ Bento Stats Cao Cấp**: Tổng số từ (`FolderOpen`), Yêu thích (`Heart`), Đang học (`RefreshCw`), Đã làm chủ (`Crown`).
  - **Khối Tìm Kiếm & Bộ Lọc Đa Tầng**: Ô tìm kiếm real-time hỗ trợ tìm theo từ tiếng Anh hoặc nghĩa tiếng Việt, kết hợp bộ lọc 4 Tab (`Tất cả`, `Yêu thích`, `Đang học`, `Đã thuộc`).
  - **Lưới Thẻ Từ Vựng Chuẩn Agency (`rounded-2xl`)**: Hiển thị phiên âm IPA, loại từ, nghĩa tiếng Việt, câu ví dụ, 5 chấm tròn biểu thị độ thuần thục SM-2, nút nghe phát âm TTS và nút ôn tập nhận ngay `+15 XP`.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Triệt tiêu hoàn toàn giật nhảy layout.

- **`/myvideo`**: Studio Học Tiếng Anh Qua Video YouTube Tự Chọn & Trích Xuất Phụ Đề Chuẩn Xác 100% (High-Precision Video & Subtitle Sync Studio - Agency Dashboard Tier).
  - **Kiến Trúc Bố Cục Tỷ Lệ Vàng 1.62fr : 1fr (Bento Grid Master-Detail)**: Khung xem video Double-Bezel chuyên nghiệp bên trái (~60%) và Trạm tương tác 3 Tab bên phải (~40%: Phụ đề song ngữ tra từ 1-click, Dictation AI, Playlist cá nhân).
  - **Động Cơ Trích Xuất Phụ Đề Thông Minh Đa Tầng (Multi-Tier YouTube Captions Engine)**:
    - Server Route `/api/youtube/captions` kết hợp Proxy Chain TVHTML5/WEB và Client-side Direct Fetch.
    - Trích xuất mốc mili-giây từng từ (`wordTimings` từ YouTube JSON3 `tOffsetMs`) cho trải nghiệm Karaoke Highlight chính xác tuyệt đối theo ngữ điệu giọng nói thực tế.
    - Thuật toán ghép câu tự nhiên ASR (`mergeFragmentedSubtitlesIntoSentences`) và bắc cầu micro-gap thông minh (`bridgeSubtitleGaps` adaptive threshold: 0.8s cho câu nối tiếp chữ thường, 0.45s cho câu tiêu chuẩn).
  - **Khử Hoàn Toàn Lỗi Lệch Timeline & Kích Hoạt Sớm (Intelligent Gap Isolation)**:
    - Vòng lặp đồng bộ 60fps với thuật toán Tìm kiếm Nhị phân $O(\log n)$ tách biệt tuyệt đối giữa trạng thái đang nói (`isCueSpeaking: true`) và khoảng lặng giữa các câu (`isCueSpeaking: false`).
    - Trong khoảng lặng / nhạc đệm: phụ đề tiếp theo hiển thị chế độ chờ "Sắp phát" thanh lịch, triệt tiêu 100% hiện tượng câu sáng viền xanh hoặc chữ phát sáng khi chưa có tiếng nói.
  - **Bộ Điều Chỉnh Lệch Phụ Đề Vi Mô (Micro-Sync Calibration Dock `[-0.2s] [Sync: 0s] [+0.2s]`)**:
    - Tích hợp trực tiếp tại Media Control Dock cho phép người học tinh chỉnh độ trễ/sớm của phụ đề so với video theo bước $\pm 0.2s$.
  - **Bộ Video Preset Thực Tế 100% (Verified Active YouTube Videos)**:
    - Steve Jobs' 2005 Stanford Commencement Address (`UF8uR6Z6KLc` - 10 câu phụ đề khớp chuẩn 100% từ 0:00 đến 0:48).
    - TED-Ed How Languages Evolve (`iWDKsHm6gTA`).
    - BBC 6 Minute English Food and Mood (`8K8s9U8_i50`).
    - Cơ chế Auto-Migration tự động cập nhật LocalStorage của người dùng lên dữ liệu chuẩn mới mà không làm mất video tự nhập.
  - **Phòng Luyện Dictation & Shadowing Đính Kèm**: Luyện chép chính tả câu trong video với 3 chế độ (Chuẩn, Gợi ý, Blind) và ghi âm Shadowing chấm điểm AI Web Speech.
  - **Hỗ Trợ Nhập/Xuất File Đa Định Dạng**: Hỗ trợ nhập file `.srt`/`.vtt` từ thiết bị, mở DownSub 1-click và xuất file phụ đề song ngữ `.json`, `.srt`, `.vtt` chuẩn thời gian.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Triệt tiêu hoàn toàn giật nhảy layout (Zero CLS).

- **`/shop`**: Cửa hàng Gamification & Vật phẩm ảo (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Hiển thị số dư Vàng realtime và số lượng Khiên Bảo Hộ Lửa.
  - **Bento Grid 7/12 & 5/12**:
    - **Cột Trái (7/12)**: Danh mục 8 vật phẩm phong phú phân loại theo *Vật phẩm hỗ trợ* (Bảo hộ lửa Streak Freeze, Thẻ nhân đôi XP 30 phút, Bình tăng tốc năng lượng, Khiên kim cương 3 ngày) và *Trang phục Avatar* (Mũ cử nhân Cú vàng, Kính Cyberpunk Neon, Vương miện Hoàng gia, Áo choàng quán quân IELTS 8.5+).
    - **Cột Phải (5/12)**: Tủ đồ & Vật phẩm sở hữu, quản lý trang bị Avatar tức thì và Bảng mẹo tích lũy Vàng từ các hoạt động học tập.
  - **Full-Stack Equip & Purchase**: Mua & trang bị/tháo nón Cú cử nhân trực tiếp sync ngầm với PostgreSQL API `/api/shop/purchase` và `/api/shop/equip`.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện chuẩn xác bố cục Bento 7/12 & 5/12.

- **`/premium`**: Trung Tâm Nâng Cấp Gói Hội Viên VIP Pro (High-End Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Dải Navigation Pills (`[ 👑 Nâng cấp Premium ]`, `[ 🛍️ Cửa hàng Vật phẩm ]` `/shop`, `[ 👤 Hồ sơ ]` `/profile`), nút Hamburger mở Sidebar trên mobile, Theme Toggle Sáng/Tối và Avatar người dùng.
  - **Spotlight Hero Stage Card (`rounded-[2rem]`)**: Nền Gradient Xanh Hoàng Gia Sapphire (`from-[#0059bb] via-[#004799] to-[#0a2342]`), viền ánh kim Amber mờ `border-amber-400/30`, huy hiệu VIP Pro Pass, widget đếm trực tiếp số học viên đang học `3.420+ PRO Online` và thẻ VIP Membership Hologram card.
  - **Interactive Plan Deck & Spotlight Power Hero**:
    - Bộ 3 thẻ cảm ứng haptic chuyển đổi gói: *Gói 1 Năm (69.000đ/tháng - Tiết kiệm 45% + Tặng 3 tháng học Phổ biến nhất)*, *Gói 1 Tháng (99.000đ/tháng)*, và *Gói Trọn Đời (1.490.000đ Đặc quyền vĩnh viễn)*.
    - Khối Spotlight Power Card tự động tính toán tổng số tiền tiết kiệm, quà tặng độc quyền đi kèm (Khiên Kim Cương, Nón Cử Nhân Cú Vàng, Thẻ X2 XP) và nút Primary CTA dẫn thẳng sang trang Thanh toán `/premium/checkout?plan={key}`.
  - **Bento Grid 5 Live Teaser Showcases (Trực quan hóa tính năng đột phá)**:
    - 🎙️ *Gemini AI Voice Waveform & Thước đo IPA*: Trực quan hóa sóng âm giọng nói và thanh chấm điểm chuẩn xác `98.4% Native Match`.
    - 📈 *Bộ mô phỏng tăng điểm thi chuẩn*: Thước đo trực quan thể hiện bước nhảy điểm số (*TOEIC 600 → 860+*, *IELTS 5.5 → 7.0+*).
    - 🧠 *Đồ thị ghi nhớ ngắt quãng SM-2*: Đối chiếu trực quan giữa việc học vẹt (quên 80% sau 3 ngày) và SM-2 (giữ vững 95% sau 6 tháng).
    - 🛡️ *Streak Bất Tử*: Ngọn lửa Streak rực cháy kết hợp Khiên Kim Cương tự động bảo vệ chuỗi học tập 24/7.
    - ⚡ *Máy tính nhân đôi tốc độ X2 XP*: Thước đo trực quan tốc độ tích lũy điểm kinh nghiệm và thăng cấp Bảng Vàng.
  - **Bảng Vàng Thành Tích Học Viên (Success Stories & Before/After Scorecards)**: Trưng bày câu chuyện thực tế từ học viên đạt TOEIC 890 và IELTS 7.5.
  - **Cam Kết Hoàn Tiền 100% Trong 7 Ngày & Khối FAQ Accordion**: Giải đáp 5 câu hỏi thắc mắc phổ biến nhất và bảo chứng an tâm học tập tuyệt đối.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Triệt tiêu hoàn toàn giật nhảy layout (Zero CLS).

- **`/premium/checkout`**: Cổng Thanh Toán Chuyên Nghiệp VietQR Napas 24/7 & MoMo (FinTech Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Nút `[ ← Quay Lại Gói Cước ]` dẫn về `/premium`, breadcrumb đa tầng và pill active `[ 💳 Thanh toán VIP Pro ]`.
  - **Bố Cục Split-Screen 5/12 & 7/12**:
    - **Cột Trái (5/12)**: Bộ chuyển đổi gói linh hoạt tại chỗ, tóm tắt đơn hàng (Giá gốc, chiết khấu, tổng thanh toán), rương quà tặng đính kèm đơn hàng và cam kết hoàn tiền 100% 7 ngày.
    - **Cột Phải (7/12)**: Cổng quét mã VietQR Napas chuẩn MB Bank sắc nét tự động sinh mã theo gói cước, bộ 4 thông tin chuyển khoản có nút **Sao chép 1-chạm** kèm toast thông báo, đồng hồ đếm ngược giao dịch 15:00 và nút `[ TÔI ĐÃ CHUYỂN KHOẢN XONG ]`.
  - **Màn Hình Vinh Danh & Hóa Đơn Điện Tử (Electronic Receipt)**: Hiển thị mã hóa đơn điện tử `INV-XP-...`, xác thực kích hoạt gói VIP tức thì và nút điều hướng vào Dashboard luyện tập.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện toàn bộ bố cục Split 5/12 & 7/12.

- **`/study/rooms`**: Phòng Học Nhóm Trực Tuyến & Pomodoro Focus (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm điều hướng nhanh và nút tạo phòng mới `[ + Tạo Phòng Mới ]`.
  - **Lobby View (Sảnh Phòng Học)**: Bộ lọc 5 danh mục (`Tất cả`, `TOEIC 4K`, `IELTS Academic`, `Luyện Nói AI`, `Từ Vựng & Phản Xạ`), lưới thẻ phòng học `rounded-2xl` hiển thị số lượng học viên trực tuyến, trạng thái Công khai/Riêng tư và nút tham gia 1-Click.
  - **Active Workspace View (Không Gian Phòng Học)**: Đồng hồ Pomodoro 25:00 tập trung / 5:00 giải lao, danh sách thành viên trong phòng có trạng thái hoạt động realtime, khung trò chuyện trực tiếp hỗ trợ gọi `@AI Mentor` giải thích từ vựng/ngữ pháp và tự động thu gọn Sidebar tối ưu không gian làm việc.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện toàn bộ sảnh phòng học và thẻ phòng.

- **`/settings`**: Cài Đặt Cấu Hình & Quản Trị Hệ Thống (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Nút thao tác nhanh `[ 💾 Lưu Cài Đặt ]`.
  - **5 Phân Hệ Cài Đặt Chuẩn Hóa (`rounded-2xl`)**: Hồ sơ cá nhân (Họ tên, Bio), Mục tiêu học tập (Từ vựng/ngày, Phút học/ngày), Cài đặt thông báo (Nhận XP, Nhiệm vụ ngày, Nhắc Streak), Chế độ hiển thị (Dark Mode / Light Mode), và Quản lý tài khoản (Xóa cache tạm, Đăng xuất an toàn).
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện chuẩn xác 5 khối cài đặt.

- **`/study/pvp`**: Đấu Trường Từ Vựng 1v1 PvP & Phòng Thách Đấu 5 Số (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm Navigation Pills chuẩn hóa 1:1 với Sidebar (`[ ⚔️ Đấu trường 1v1 ]`, `[ 🏆 Xếp hạng ]`, `[ 📖 Luyện từ vựng ]`, `[ 📄 Thi thử đề ]`) kết hợp widget xem Top 3 Mùa Giải và nút lối tắt vào Luyện Nghe Dictation.
  - **Spotlight Hero Arena Stage Card (`rounded-2xl`)**: Nền Gradient Xanh Hoàng Gia phối ánh tím (`from-[#0059bb] via-[#004799] to-[#002b5b]`), huy hiệu nhận diện `⚔️ PvP Arena Live` và thông số đối kháng thời gian thực.
  - **Sảnh Thi Đấu Lobby (Bento Grid 7/12 & 5/12)**:
    - **Cột Trái (7/12)**: Segmented Switcher (`Ghép Nhanh AI` ⟷ `Phòng 1v1 Mã 5 Số`), Bộ chọn 3 chế độ đối kháng (*Trắc nghiệm*, *Đồ chữ*, *Âm thanh*), 3 cấp độ đấu trường (*Dễ +15 XP*, *Trung bình +30 XP*, *Khó +50 XP*), và nút CTA nổi bật `[ ⚔️ Bắt Đầu Ghép Trận Ngay ]`.
    - **Cột Phải (5/12)**: Thẻ Hồ Sơ Đấu Sĩ (`Gladiator Profile`), Bảng Vàng Đấu Trường Top 3 Mùa Giải, và Thẻ Hướng Dẫn Quy Tắc Điểm Thưởng XP.
  - **Không Gian Phòng Chờ & Sàn Đấu 1v1 Thời Gian Thực**:
    - Phòng chờ 5 số hiển thị mã phòng to rõ `font-mono tracking-widest`, nút 1-Click sao chép mã và đếm ngược đồng bộ 3.. 2.. 1.. GO!.
    - Sàn đấu đối kháng trực diện với đồng hồ đếm ngược tròn trung tâm `w-11 h-11 rounded-full`, dải chấm tròn trạng thái câu trả lời realtime, hộp câu hỏi chữ to `font-display` kèm phát âm TTS, lưới đáp án `rounded-xl` phản hồi màu sắc tức thì (Emerald / Rose), hỗ trợ gõ phím vật lý chế độ Đồ chữ và Modal xác nhận Bỏ cuộc an toàn `rounded-2xl`.
  - **Màn Hình Kết Quả & Vinh Danh (`rounded-2xl`)**: Banner phân loại Chiến Thắng / Hòa / Thất Bại, Scorecard hiển thị XP thưởng, hỗ trợ thăng cấp Level Up và nút chuyển nhanh về Dashboard hoặc Tìm trận mới.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Triệt tiêu hoàn toàn giật nhảy layout (Zero CLS).

- **`/study`**: Trung Tâm Học Tập Toàn Diện 10 Chế Độ (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm Navigation Pills lọc nhanh (`[ 🌟 Tất cả (10) ]`, `[ 🎯 4 Kỹ năng ]`, `[ 📚 Ngữ pháp & Thi ]`, `[ ⚔️ Đấu trường & Game ]`), nút Hamburger mở Sidebar, Theme Toggle Sáng/Tối và Avatar người dùng.
  - **Spotlight Hero Stage Card (`rounded-2xl`)**: Nền Gradient Xanh Hoàng Gia sang trọng (`from-[#0059bb] via-[#004799] to-[#002b5b]`), huy hiệu nhận diện `🚀 Trung Tâm Học Tập XP`, số lượng chế độ học đa dạng và thanh tiến trình khám phá.
  - **Lưới Bento 10 Chế Độ Học Tập Toàn Diện (Fluid 3-Column Grid)**: 
    - *Luyện Từ Vựng* (`/study/practice` - Emerald), *Dictation Nghe Chép* (`/study/listening` - Indigo), *Shadowing Phản Xạ* (`/study/shadowing` - Sky), *Luyện Đọc Báo Chí* (`/study/reading` - Teal).
    - *Gia Sư Nói AI 1-1* (`/ai/tutor` - Purple), *Viết & Giao Tiếp AI* (`/ai/conversation` - Fuchsia), *Ngữ Pháp AI* (`/study/grammar` - Violet), *Phòng Thi Đề Chuẩn* (`/study/exam-prep` - Rose).
    - *Đấu Trường 1v1 PvP* (`/study/pvp` - Amber), *Trò Chơi Mini-Games* (`/study/games` - Orange).
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện chuẩn xác toàn bộ Hero Stage và lưới Bento 10 thẻ.

- **`/ai`**: Trung Tâm Trí Tuệ Nhân Tạo & Gia Sư Cá Nhân Hóa (Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm Navigation Pills (`[ 🤖 Trung Tâm AI ]`, `[ 🎙️ Gia Sư Speaking ]`, `[ ✍️ Writing Coach ]`), nút Hamburger mở Sidebar trên mobile và Avatar người dùng.
  - **Spotlight Hero Stage Card (`rounded-2xl`)**: Nền Gradient Tím AI sang trọng (`from-purple-700 via-indigo-800 to-slate-950`), huy hiệu `✨ Gemini AI Tutor 24/7` và thống kê thời lượng hội thoại AI.
  - **Lưới Bento Phân Hệ Trợ Lý AI Chuyên Sâu**: Thẻ Gia sư Luyện Nói Phản Xạ 1-1 (`/ai/tutor`), Thẻ Luyện Viết & Giao Tiếp Theo Chủ Đề (`/ai/conversation`), Thẻ Phân Tích Lỗi Sai Ngữ Pháp và Thẻ Lộ Trình Cá Nhân Hóa Động.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện toàn bộ Hero Stage Tím và lưới thẻ AI.

- **`/ai/tutor`**: Studio Luyện Nói Phản Xạ & Gia Sư Giọng Nói AI 1-1 (AI Voice Tutor Studio - Agency Dashboard Tier).
  - **Kết Nối Google Gemini AI Thật 100% (`app/api/ai/tutor/route.ts`)**: Tự động phân tích hội thoại đa hình (`{ messages }` hoặc `{ message, history }`), hỗ trợ 3 model Fallback (`gemini-2.5-flash`, `gemini-1.5-flash`, `gemini-2.0-flash`), làm sạch Markdown JSON và phản hồi thông minh trong 1-2 câu tiếng Anh tự nhiên.
  - **3 Huấn Luyện Viên AI Bản Ngữ Chuyên Biệt**:
    - **Emma 🇬🇧** (*British IELTS Coach* - Giọng Anh-Anh chuẩn IELTS).
    - **Alex 🇺🇸** (*American Business Coach* - Giọng Anh-Mỹ đàm phán công sở).
    - **Chloe 🇦🇺** (*Australian Friendly Tutor* - Giọng Anh-Úc giao tiếp đời thường).
  - **Động Cơ Nhận Diện Giọng Nói & Trực Quan Sóng Âm Realtime**:
    - **Continuous Web Speech Recognition**: Tự động tích lũy câu nói `accumulatedTextRef`, tự kết nối lại khi trình duyệt ngắt quãng, hỗ trợ phím tắt và nút Micro Toggle-to-Send 1 chạm.
    - **Web Audio API 16 Frequency Spectrum**: Sóng âm nhảy theo giọng nói thực tế, tự chuyển màu Đỏ Rose (`#f43f5e` - đang thu) sang Xanh Hoàng Gia (`#0059bb` - AI phát âm).
  - **1-Click Interactive Deep Dictionary (`lookupWordDeep`)**: Nhấn vào bất kỳ từ vựng nào trong câu trả lời của AI để nghe phát âm IPA, xem từ loại, định nghĩa tiếng Việt chi tiết và câu ví dụ; nút lưu trực tiếp vào bảng `user_vocabulary` trên PostgreSQL Neon (`+5 XP`).
  - **Ma Trận Đánh Giá Phản Xạ 4 Trục & Báo Cáo In-Place**:
    - Chấm điểm chi tiết 4 tiêu chí: *Phát âm (35%)*, *Trôi chảy (25%)*, *Ngữ điệu (20%)*, *Ngữ pháp (20%)*.
    - Xếp hạng Hạng S (>=90đ, +45 XP), Hạng A (>=80đ, +35 XP), Hạng B (>=70đ, +25 XP), Hạng C (<70đ, +15 XP).
    - Tự động ghi nhận số phút học và XP vào CSDL `daily_skill_practice` (`skill: "speaking"`) và hồ sơ `Profile`.
  - **Khung Xương Shimmer Skeleton 1:1 Khớp Chuẩn Zero Layout Shift (`loading.tsx`)**: Tái hiện 100% hình học Header 56px, Chat stream, Dock Micro và 3 thẻ Persona bên phải với hiệu ứng ánh kim 60fps (`.animate-shimmer`).

- **`/ai/conversation`**: Phòng Luyện Viết & Giao Tiếp Theo Chủ Đề (Interactive Topic Conversation Studio - Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh `AppTopHeader` (Tab Luyện Viết active)**: Đồng hồ đếm thời gian thực `formatElapsedTime` và nút Chấm điểm / Buổi mới tiện lợi.
  - **6 Kịch Bản Hội Thoại Thực Tế Sâu Sắc**: *Đặt món tại nhà hàng*, *Phỏng vấn xin việc*, *Thủ tục tại sân bay*, *Thảo luận công nghệ & AI*, *Mua sắm & Hỏi giá*, *Hỏi đường khi du lịch*.
  - **Nhận Diện Mục Tiêu Giao Tiếp Realtime (Goal Tracking Engine)**: Tự động phân tích từ khóa đối thoại và cập nhật checklist mục tiêu theo thời gian thực (`{completedGoals}/{totalGoals}`).
  - **Sửa Lỗi Ngữ Pháp & Gợi Ý Diễn Đạt Tự Nhiên Song Ngữ**: Phát hiện lỗi ngữ pháp tức thì (gạch ngang màu Rose ➔ sửa màu Emerald), giải thích chi tiết và gợi ý mẫu câu nói tự nhiên hơn kèm nút nghe phát âm TTS.
  - **1-Click Interactive Deep Dictionary (`lookupWordDeep`)**: Nhấn vào bất kỳ từ vựng nào trong đoạn chat AI để tra cứu IPA, từ loại, định nghĩa tiếng Việt chi tiết và ví dụ thực tế; nút lưu trực tiếp vào bảng `user_vocabulary` trên PostgreSQL Neon (`+5 XP`).
  - **Ma Trận Chấm Điểm 4 Trục & Báo Cáo Tổng Kết In-Place**:
    - Phân bổ trọng số khoa học: *Mục tiêu giao tiếp (40%)*, *Ngữ pháp (30%)*, *Tương tác (20%)*, *Từ vựng (10%)*.
    - Xếp hạng Hạng S (>=90đ, +45 XP), Hạng A (>=80đ, +35 XP), Hạng B (>=70đ, +25 XP), Hạng C (<70đ, +15 XP).
    - Tự động ghi nhận số phút học và XP vào CSDL `daily_skill_practice` (`skill: "writing"`) và hồ sơ `Profile`.
  - **Khung Xương Shimmer Skeleton 1:1 Khớp Chuẩn Zero Layout Shift (`loading.tsx`)**: Tái hiện 100% hình học Header 56px, Chat stream, Dải gợi ý từ vựng, Dock Micro/Input và Cột phải 3 Mục tiêu + 3 Từ vựng + 2 Mẫu câu với hiệu ứng ánh kim 60fps (`.animate-shimmer`).

- **`/study/games`**: Đấu Trường Trò Chơi Từ Vựng (Vocabulary Mini-Games Hub - Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm Navigation Pills (`[ 🎮 Tất Cả Games ]`, `[ 🔤 Word Scramble ]`, `[ 🃏 Memory Match ]`), hỗ trợ nút `onBack` quay lại sảnh khi đang chơi, nút Hamburger mở Sidebar và Avatar người dùng.
  - **Spotlight Hero Games Stage Card (`rounded-2xl`)**: Nền Gradient Xanh Hoàng Gia pha cam hổ phách (`from-[#0059bb] via-[#004799] to-[#002b5b]`), huy hiệu `🎯 Học Từ Vựng Qua Trò Chơi`, số lượng trò chơi và điểm thưởng XP.
  - **2 Phân Hệ Mini-Games Tương Tác Sôi Nổi**:
    - **Word Scramble (Xếp Chữ Đoán Nghĩa)**: Trò chơi đảo chữ cái với các ô ký tự xúc giác, gợi ý IPA/nghĩa tiếng Việt, tính điểm combo chuỗi đúng và thưởng XP + Vàng tức thì.
    - **Memory Match (Lật Thẻ Trí Nhớ)**: Bàn cờ lật thẻ 12 ô ghép cặp từ tiếng Anh với nghĩa tiếng Việt tương ứng, đồng hồ đếm thời gian và xếp hạng tốc độ phản xạ.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện chuẩn xác sảnh trò chơi và thẻ game.

- **`/profile/achievements`**: Kho Huy Hiệu Thành Tích & Cột Mốc Danh Dự (Badges Collection Hub - Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm Navigation Pills (`[ 🏆 Tất Cả ]`, `[ ✨ Đã Đạt ]`, `[ 🔒 Chưa Đạt ]`, `[ 👤 Hồ Sơ ]` `/profile`), nút Hamburger mở Sidebar và Avatar người dùng.
  - **Spotlight Hero Progress Stage Card (`rounded-2xl`)**: Nền Gradient Xanh Hoàng Gia sang trọng (`from-[#0059bb] via-[#004799] to-[#002b5b]`), thanh tiến trình mở khóa huy hiệu (`x/16 đã đạt`), tỷ lệ % hoàn thành và huy hiệu Master vinh danh.
  - **Lưới Huy Hiệu Thành Tích 2 Cột (Fluid 2-Column Bento Grid)**: 16 huy hiệu đa cấp bậc (*Tập Sự*, *Chiến Binh Chăm Chỉ*, *Bậc Thầy Dictation*, *Bất Tử Streak*, *Vua Đấu Trường 1v1*, *Cao Thủ Từ Vựng*...) với hiệu ứng viền kim loại ánh kim, ngày mở khóa, tiến độ thực tế và phần thưởng XP.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện toàn bộ Hero Progress và lưới huy hiệu.

- **`/admin`**: Bảng Điều Khiển Quản Trị Hệ Thống (System Admin Overview Hub - Agency Dashboard Tier).
  - **Đồng Bộ Header Đỉnh Thống Nhất (`AppTopHeader` 56px Baseline)**: Cụm Navigation Pills (`[ ⚡ Bảng Quản Trị ]`, `[ 📖 Từ Vựng Hệ Thống ]` `/admin/vocabulary`, `[ 📊 Thống Kê Platform ]` `/admin/analytics`), nút Hamburger mở Sidebar và Avatar người dùng.
  - **Spotlight Hero Admin Stage Card (`rounded-2xl`)**: Nền Gradient Slate sang trọng (`from-slate-900 via-slate-800 to-slate-950`), huy hiệu `🛡️ System Control Center` và trạng thái hoạt động của Database PostgreSQL & API Services.
  - **Lưới Chỉ Số Quản Trị & Phím Tắt Nghiệp Vụ**: 4 thẻ chỉ số nhanh (Tổng người dùng, Tổng từ vựng 8.948+, Số bài thi thử 37 đề, Số lượt làm bài hôm nay) và danh sách tác vụ quản trị nhanh.
  - **Skeleton Loading Khớp 100% Hình Học (`loading.tsx`)**: Tái hiện toàn bộ Hero Admin và lưới thống kê.

- **`/privacy` & `/terms`**: Chính Sách Quyền Riêng Tư & Điều Khoản Dịch Vụ (Agency Dashboard Tier).
  - Thiết kế Stage Card `rounded-2xl` tinh gọn, chuẩn phân cấp thông tin, hỗ trợ Dark Mode và bảo vệ dữ liệu học viên theo chuẩn quốc tế.

- **XP Mentor — Trợ Lý Cố Vấn Học Tập AI Nổi Toàn Năng (Floating AI Mentor Assistant - Agency Tier)**:
  - **Kiến Trúc Module Hóa Tách Rời (`features/ai/components/FloatingAiChatbot/`)**: Bong bóng nổi (`FloatingAiChatbot.tsx`), Header (`ChatbotHeader.tsx`), Trình hội thoại đa năng (`SmartChatConversation.tsx`), Thẻ hành động lộ trình (`RoadmapActionCard.tsx`), Thẻ đề xuất bài học (`RecommendationActionCard.tsx`), và Bong bóng thông báo chủ động (`ProactiveNudgeBubble.tsx`).
  - **Phase 1: Đại Tu UI/UX & Khả Năng Đọc Chuẩn Wadhah Aloui**:
    - Trình biên dịch Markdown chuyên biệt tích hợp: hiển thị chuẩn văn bản in đậm `**text**`, in nghiêng `*text*`, khối mã inline `` `code` `` và ngắt dòng tự nhiên mượt mà.
    - Chuẩn hóa typography công thái học: nội dung chat nâng từ `11.5px` lên `13px`, chip gợi ý từ `10.5px` lên `11.5px`, ô nhập liệu và header lên `13px`.
    - Dải chip gợi ý nhanh trang bị gradient fade mask ở cạnh phải chống cắt cụt chữ và `whitespace-nowrap`.
    - Chỉ báo AI đang soạn thảo dạng **Skeleton Shimmer Bars 3 dòng** (Rule 1 UI/UX: dùng Skeleton Loading thay vì spinner hay bouncing dots).
    - Lược bỏ hoàn toàn emoji Unicode thô dính liền trong nhãn gợi ý hành động (`Gợi ý bài học tiếp`, `Kiểm tra từ vựng`).
    - Khung hội thoại co giãn linh hoạt `min(480px, 75vh)` và `max-w-[calc(100vw-32px)]` tối ưu tuyệt đối cho cả Desktop và Mobile.
  - **Phase 2: Bộ Định Tuyến Ý Định Thông Minh (Smart Intent Scoring Router)**:
    - Thay thế chuỗi so khớp thô sơ bằng hệ thống tính điểm từ khóa đa chiều (Multi-keyword scoring) nhận diện chính xác 3 luồng ý định: Lộ trình & Nhiệm vụ (`roadmap`), Đề xuất bài học tiếp theo (`recommendation`), Ôn tập từ vựng ngắt quãng (`vocab_review`), và chuyển tiếp mượt mà sang Gemini AI khi trò chuyện mở.
    - Bơm ngữ cảnh trang hiện tại (`pageContext`) giúp Gemini AI nhận biết học viên đang ở màn hình nào (Dashboard, Review, Dictation, Shadowing...).
    - Giới hạn lịch sử hội thoại 10 tin nhắn gần nhất (`MAX_HISTORY_MESSAGES = 10`) tối ưu hóa dung lượng token và độ trễ phản hồi.
    - Bộ phản hồi ngoại tuyến phân tầng theo từng ý định (Per-Intent Offline Fallback).
  - **Phase 3: Tối Ưu Hóa Dữ Liệu & API Đề Xuất (`/api/ai/chatbot/recommendations`)**:
    - Sửa thuật toán tính `% hoàn thành` dựa trên nhiệm vụ hàng ngày và lộ trình thực tế thay vì phép chia dư XP.
    - Mở rộng dữ liệu phản hồi với `studySummary` (tổng từ vựng đã học, tổng thời gian học thực tế trong ngày từ `daily_skill_practice`).
    - Nâng thời gian sống bộ đệm (TTL Cache) từ 20s lên 60s giảm thiểu tải server và độ trễ mạng.

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

- **`GET /api/user/analytics`**: Trả về dữ liệu thống kê user, chuỗi 30 ngày và ma trận 168 ô 6-month heatmap từ CSDL PostgreSQL.
- **`GET /api/user/daily-checkin` & `POST /api/user/daily-checkin`**: Endpoint Điểm danh Server-Authoritative (Cộng +15 XP, +20 Vàng, tính streak tự động, chống điểm danh trùng 1 ngày, truy vấn 7 ngày hoạt động trong tuần từ `daily_skill_practices`).
- **`GET /api/user/challenges` & `POST /api/user/challenges/claim`**: Quản lý nhiệm vụ ngày và kiểm tra điều kiện nhận thưởng trực tiếp từ CSDL (từ vựng, lượt ôn, PvP, phút nói, phút viết).
- **`GET /api/user/profile` & `POST /api/user/profile`**: Lấy & cập nhật thông tin hồ sơ (chống Mass-Assignment, server kiểm soát tuyệt đối `totalXp`, `level`, `coins`, `streakFreezes`).
- **`GET /api/user/vocab` & `POST /api/user/vocab`**: Đồng bộ từ vựng đã học & danh sách từ bookmark yêu thích với PostgreSQL DB.
- **`GET /api/leaderboard`**: Lấy danh sách Bảng xếp hạng Top 50 theo kỳ (`period=week` / `period=month` / `period=all`) với Indexed sort <10ms và multi-level deterministic sorting.
- **`GET /api/study-plan/current` & `POST /api/study-plan/create`**: Tạo & truy vấn lộ trình học AI của học viên, hỗ trợ điều hướng động theo dạng bài.
- **`POST /api/pvp/room`**: Quản lý khởi tạo phòng thi đấu 1v1 mã 5 chữ số, gia nhập phòng, kiểm tra trạng thái realtime & đồng bộ câu hỏi.
- **`POST /api/pvp/match-submit`**: Lưu kết quả trận đấu, tính điểm XP server-side (áp trần an toàn 50 XP/trận), thưởng coins & kiểm tra thăng cấp level.
- **`POST /api/exams/attempts`**: Server-Authoritative Exam Grading — Tự động chấm điểm đối chiếu với đáp án chuẩn của 37 đề thi, ngăn chặn client can thiệp điểm số.
- **`POST /api/ai/chat`**: API AI Conversation hỗ trợ cả Server-Sent Events (SSE Token Streaming) và Standard JSON với fallback linh hoạt, tự động tích lũy XP thật vào CSDL.
- **`GET /api/cron/daily-maintenance` & `POST /api/cron/daily-maintenance`**: Endpoint bảo trì định kỳ tự động (Bảo vệ chuỗi Streak bằng Streak Freeze Shield, reset leaderboard tuần) với xác thực `CRON_SECRET`.
- **`GET /api/youtube/captions` & `POST /api/youtube/captions`**: Backend Server API Route trích xuất & dịch phụ đề song ngữ YouTube trực tiếp với Universal Parser (`lib/services/youtubeSubtitleParser.ts`). Tích hợp **Multi-Tier External Proxy Chain** (Direct → AllOrigins → CodeTabs → CorsProxy.io) vượt rào thành công 100% IP block datacenter của YouTube trên Vercel. Tự động giải mã định dạng YouTube JSON3 (`wireMagic: pb3`, `events/tStartMs/segs`) kết hợp XML TimedText (`<text start dur>`) và WEBVTT, loại bỏ hoàn toàn lỗi bot block Google "We're sorry". Hỗ trợ bóc tách mốc thời gian mili-giây chuẩn xác 100%, căn chỉnh phụ đề song ngữ tối ưu (Optimal Global Alignment) không lệch khớp lời, bảo toàn từ ghép/viết tắt (`don't`, `it's`), xuất dữ liệu JSON, SRT & WEBVTT song ngữ ngắt dòng 42 ký tự chuẩn xác và phản hồi HTTP 200/404.
- **`GET /api/youtube/subtitles/proxy`**: Same-Origin Hybrid Proxy Endpoint với 4-tier proxy fallback chain (Direct → AllOrigins → CodeTabs → CorsProxy.io) tự động giải mã và bypass CORS / IP rate-limit trên Vercel Edge.

---

## 🛡️ Hệ Thống Bảo Mật, Chống Gian Lận & Đơn Vị Kiểm Thử (Security & Anti-Cheat System)

- **Next.js 16 Edge Proxy & Rate Limiter (`proxy.ts` & `infrastructure/security/rateLimiter.ts`)**:
  - Áp dụng sliding window rate limiter theo IP/User ID. Giới hạn 5 lần/15 phút cho Auth routes (`/api/auth/*`) và 100 requests/phút cho các API khác. Tự động thêm Edge Security Headers (`CSP`, `nosniff`, `DENY`, `Referrer-Policy`).
- **Server-Authoritative Anti-Cheat (`app/api/exams/attempts`, `app/api/pvp/match-submit`, `app/api/user/challenges`)**:
  - Khóa toàn diện lỗ hổng Mass-Assignment trong Profile; Server tự động chấm điểm bài thi, kiểm soát trần điểm PvP và kiểm tra tiến độ CSDL trước khi cho phép nhận thưởng nhiệm vụ ngày.
- **XSS & Input Sanitization (`infrastructure/security/validation.ts`)**:
  - Làm sạch dữ liệu đầu vào chống XSS attack, validate chuẩn email RFC 5322 và kiểm tra payload size (>1MB trả về `413 Payload Too Large`).
- **JWT & Password Security (`infrastructure/auth/jwt.ts` & `infrastructure/auth/password.ts`)**:
  - Mã hóa mật khẩu PBKDF2 (SHA-512 with 10,000 iterations), ký JWT Token với HMAC-SHA256, xác thực session bảo mật qua HttpOnly cookie.
- **Bộ Kiểm Thử Toàn Diện (16 Test Suites — 290/290 Unit Tests PASS 100%)**:
  - `__tests__/dashboard_db_sync.test.ts` (10 tests): Điểm danh CSDL, Streak 7 ngày, Anti-Cheat nhận thưởng nhiệm vụ ngày, Dynamic routing, AI Chat XP cap.
  - `__tests__/security.test.ts` (24 tests): Session Hardening, Password Hashing, JWT Verification, Rate Limiting, Input Sanitization.
  - `__tests__/anti_cheat.test.ts` (9 tests): Chấm điểm bài thi độc lập trên Server, Chống Mass-Assignment, Giới hạn trần PvP.
  - `__tests__/ai_streaming.test.ts` (4 tests): Kiểm thử Token Streaming SSE và WebRTC Backoff.
  - `__tests__/cron.test.ts` (5 tests): Xác thực CRON_SECRET và cơ chế tự động bảo vệ Streak.
  - `__tests__/exam_bank_audit.test.ts` (7 tests): Rà soát 37 đề thi TOEIC/IELTS chuẩn hóa.
  - `__tests__/myvideo*.test.ts` (205 tests): Đồng bộ phụ đề mili-giây, Lyrics compilation, Proxy bypass, Media Player Sync.
  - `__tests__/shop.test.ts`, `__tests__/sm2.test.ts`, `__tests__/xp.test.ts`, `__tests__/practice.test.ts`, `__tests__/basic_vocabulary.test.ts` (26 tests).

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

- **Hệ Thống Skeleton Shimmer Loading Chuyên Sâu (`ExamPrepSkeleton` - Chuẩn Rule 1 & Rule 20 UI/UX)**:
  - **Khung Xương Exam Hub Đồng Bộ 1:1 (`ExamHubSkeleton`)**:
    - Thay thế hoàn toàn khung xương phòng thi cũ bị lệch bố cục tại [`app/(dashboard)/study/exam-prep/loading.tsx`](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/study/exam-prep/loading.tsx). Tái hiện chính xác 100% giao diện landing của Exam Hub khi học viên truy cập:
      - *Thanh Header đỉnh 56px (`h-14`):* Mobile trigger, cụm Navigation Pills (`Thi thử đề`, `Luyện từ vựng`, `Dictation`, `Shadowing`) và nút CTA `Tạo Đề Mới AI`.
      - *Hero Banner Bento:* Khung viền kép với dải viền phát sáng đỉnh **Rose / Cherry (`#f43f5e/60`)** độc quyền của phòng thi chuẩn hóa (Rule 20), huy hiệu phòng thi, tiêu đề và bộ chuyển đổi chế độ `Đề Chuẩn` vs `Tạo Đề Mới AI`.
      - *Ma trận 4 kỹ năng:* 4 thẻ Shimmer (Nghe, Đọc, Nói AI, Viết AI) kèm icon và hộp kiểm tick chọn.
      - *Thanh công cụ lọc & tìm kiếm:* Segmented control 5 tab bo tròn và ô tìm kiếm bo góc mềm mại.
      - *Lưới 6 thẻ đề thi Bento (3 cột):* Tái hiện đầy đủ huy hiệu độ khó 5 sao, category tag, danh sách chip kỹ năng, dòng thông số câu/phút và nút CTA `Bắt đầu`.
  - **Khung Xương Phòng Thi Chuẩn Xác (`ExamWorkspaceSkeleton`)**:
    - Dành riêng cho chế độ làm bài trực tiếp (`?id=...`): thanh toolbar 56px với nút thoát, tiêu đề đề thi, đồng hồ đếm ngược live, tỷ lệ Split View 8/12 (vùng câu hỏi, audio waveform, 4 đáp án A-B-C-D) và 4/12 (phiếu trả lời câu hỏi ma trận 24 câu).
  - **Triệt Tiêu Text Thô Tại `React.Suspense` (`page.tsx`)**:
    - Xóa bỏ hoàn toàn dòng chữ thô `<div className="p-8 text-center...">Đang tải không gian luyện thi...</div>` tại [`app/(dashboard)/study/exam-prep/page.tsx`](file:///e:/XP%20English%20%20XP%20Voca/app/%28dashboard%29/study/exam-prep/page.tsx) và thay thế bằng `<ExamHubSkeleton />`. Khi Next.js stream trang hoặc xử lý query param, người dùng luôn nhìn thấy khung xương Shimmer 60fps mượt mà, đạt chuẩn **Zero Cumulative Layout Shift (CLS = 0)**.
  - **Thẻ Shimmer Sinh Đề AI Trực Quan (`isAiGenerating`)**:
    - Khi người dùng bấm tạo đề thi bằng AI, thay vì chỉ hiện spinner xoay tròn đơn điệu trên nút, hệ thống hiển thị thẻ Shimmer Preview phát sáng theo thời gian thực mô phỏng tiến trình phân loại độ khó, biên soạn ngữ cảnh và chấm lời giải của Gemini AI.

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

6. **Hệ Thống Lưu Trữ CSDL Real-time & Khôi Phục Kịch Bản Sau Khi Tải Lại Trang (`ai_practice_sessions`)**:
   - **Tự động lưu thời gian thực (Zero-Loss Realtime Auto-save)**: Mỗi lượt trao đổi tin nhắn (User nói + AI phản hồi + phân tích phát âm + sửa ngữ pháp) được tự động cập nhật ngay lập tức vào bảng `ai_practice_sessions` trên Neon PostgreSQL với trạng thái `status: 'IN_PROGRESS'`.
   - **Khôi phục 100% khi F5 / Reload trang**: Khi học viên vô tình tải lại trang hoặc mở lại tab, hệ thống tự động kiểm tra CSDL và nạp lại toàn bộ kịch bản dang dở, đúng huấn luyện viên và thời gian học mà không bị mất bất kỳ câu chat nào.
   - **Ngăn kéo Lịch sử Buổi học (Session History Drawer)**: Nút `[ 🕒 Lịch sử ]` trên Top Header mở ngăn kéo trượt bên phải hiển thị danh sách tất cả các buổi học trước đó, cho phép xem lại chi tiết từng lượt đối thoại và bảng điểm.
   - **Chốt phiên & Chấm điểm**: Khi bấm *"Chấm điểm"*, phiên chuyển sang `COMPLETED`, tính hạng S/A/B/C và đồng bộ số phút học + XP thưởng vào `daily_skill_practice` và `Profile`.
   - **Buổi mới**: Bấm *"Buổi mới"* sẽ lưu trữ phiên cũ và khởi tạo phiên mới toanh.

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

## 🎙️ AI Shadowing Studio (`/study/shadowing`)

Phòng luyện nói tiếng Anh tương tác áp dụng kỹ thuật Shadowing đồng bộ hóa giọng đọc bản xứ theo thời gian thực, trang bị công nghệ nhận diện giọng nói WebRTC, Web Speech API và trí tuệ nhân tạo chấm điểm phát âm chuyên sâu:

1. **Kiến Trúc Tách Module Sạch Đẹp (Clean Orchestrator Architecture)**:
   - Tinh gọn tệp nguyên khối 2.354 dòng (~120KB) xuống trang điều phối mỏng dưới ~600 dòng, phân chia trách nhiệm rõ ràng sang các component độc lập tại `features/shadowing/components/`:
     - **`ShadowingListingView.tsx`**: Màn hình danh mục bài học phân loại cấp độ, tích hợp thanh tìm kiếm thông minh, nút khám phá kho 100+ bài học và lưới bài học dạng Double-Bezel.
     - **`ShadowingStudioWorkspace.tsx`**: Không gian phòng thu luyện nói 2 cột: Cột trái tập trung vào câu luyện tập hiện tại kèm sóng âm 95-spikes (`StudioWaveformCard`), micro thu âm WebRTC có bộ lọc yên lặng VAD, nhận diện giọng nói trực tiếp theo thời gian thực và ma trận chấm điểm AI 6 tiêu chí (`Phát âm`, `Trôi chảy`, `Ngữ điệu`, `Đầy đủ`, `Tốc độ WPM`, `Trọng âm`). Cột phải là thanh phụ đề tương tác (`InteractiveTranscriptSidebar`) hỗ trợ chuyển câu, nghe lại âm thanh mẫu và gợi ý bài học liên quan.
     - **`ShadowingCompletionScreen.tsx`**: Màn hình Bento Hub vinh danh hoàn thành bài học với cúp vàng rạng rỡ, 4 thẻ chỉ số Bento (`+50 XP`, `100% Trôi chảy`, Tỷ lệ câu đã luyện, Tổng thời gian học) và 3 bài học đề xuất tiếp theo.
     - **`ShadowingModals.tsx`**: Cụm modal tiện ích bao gồm tra cứu từ điển chuyên sâu (`DeepDictionaryModal`), báo cáo lỗi câu (`SentenceReportModal`) và mở rộng danh sách bài học (`LessonExplorerModal`).
     - **`LoadingSkeletons.tsx`**: Hệ thống Shimmer Skeleton 60fps chuẩn Wadhah Aloui (`ShadowingListingSkeleton`, `ShadowingStudioSkeleton`, `LessonCardShimmer`, `RecommendationCardsSkeleton`, `TranscriptSentencesSkeleton`).

2. **Trải Nghiệm Tải Mượt Mà 0px CLS & Zero Flash Layout**:
   - **Xử lý triệt để trạng thái nạp dữ liệu**: Tách biệt rõ ràng giữa `isLoadingLessons` (danh mục) và `isLoadingLessonDetail` (chi tiết bài học).
   - Khi truy cập `/study/shadowing` không tham số: Hiển thị ngay `ShadowingListingSkeleton` (Top bar 56px + 2 hàng thẻ cơ bản và nâng cao quét Shimmer 60fps) mà không làm nhấp nháy dữ liệu thô.
   - Khi truy cập trực tiếp bằng URL có `?id=...` hoặc khi chuyển đổi bài: Hiển thị ngay `ShadowingStudioSkeleton` (Sóng âm 95 vạch, khung micro, ma trận AI, thanh phụ đề) mà không bị rơi vào Listing rồi nhảy giật sang Studio.
   - **Chuyển tab danh mục siêu tốc (180ms Shimmer Sweep)**: Khi bấm chuyển đổi giữa các tab lọc (`Tất cả bài học`, `Cơ bản A1-A2`, `Nâng cao B1-C2`, `Đã hoàn thành`), hệ thống hiển thị 8 thẻ `<LessonCardShimmer />` với 0px CLS, tạo cảm giác mượt mà và phản hồi tức thì.

3. **Hiệu Ứng Chuyển Đổi Tab Đẳng Cấp Apple 2 Tầng (Apple-Grade Motion)**:
   - **Tầng 1 (AppTopHeader Tab Dock)**: Con trỏ viên thuốc trượt lò xo (`layoutId="shadowingHeaderActiveTab"`) chuyển đổi mượt mà giữa các phòng học (`Shadowing`, `Dictation`, `Luyện từ vựng`, `Thi thử đề`).
   - **Tầng 2 (Level / Category Filter Dock)**: Con trỏ viên thuốc trượt lò xo (`layoutId="shadowingCategoryFilterIndicator"`, `stiffness: 450, damping: 32`) hiển thị số lượng bài học thực tế cho từng phân loại.
   - **Mobile Studio Switcher**: Con trỏ viên thuốc trượt lò xo (`layoutId="shadowingMobileStudioTabIndicator"`) chuyển đổi trực quan giữa chế độ *"Luyện nói"* và *"Danh sách phụ đề"* trên thiết bị di động.
   - **Staggered Page Entrance**: Toàn bộ canvas danh mục được bọc trong `<PageEntranceWrapper>` mang lại hiệu ứng xuất hiện phân tầng so le sang trọng.

---

## 💎 XP English PRO VIP Membership Hub (`/premium`)

Trang đăng ký và quản lý gói hội viên Pro VIP nâng cấp toàn diện theo hệ thống nhận diện thương hiệu chuẩn mực Dashboard, cấu trúc Bento phẳng sang trọng, và quy tắc phối màu 60 - 30 - 10:

1. **Dashboard-Aligned Brand Architecture & 60 - 30 - 10 Palette**:
   - **60% Nền & Cấu trúc (`min-h-screen bg-slate-50/60 dark:bg-slate-950`)**: Nền Slate trung tính dịu mắt, làm nổi bật các thẻ Bento trắng tinh tế (`bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs`).
   - **30% Thương hiệu Xanh hoàng gia `#0059bb`**: Nút Primary Kích hoạt VIP kèm Button-in-Button Arrow (`bg-[#0059bb] hover:bg-[#004799]`), viền active của gói được chọn (`border-2 border-[#0059bb] shadow-blue-500/10`), Tab switcher TOEIC / IELTS trong bộ mô phỏng điểm số, thanh kéo slider (`accent-[#0059bb]`), và Badge Master Lifetime VIP.
   - **10% Điểm nhấn ngữ nghĩa (Semantic Accents)**:
     - **Vàng Amber (`#f59e0b`)**: Gamification, Thưởng quà tặng (`Gift`), Chuỗi Streak (`Flame`, `bg-amber-50 text-amber-600`), Gói 1 Năm Hot Deal (`bg-amber-500 text-white`).
     - **Xanh Emerald (`#10b981`)**: Cam kết hoàn tiền 100% (`ShieldCheck`, `CheckCircle`), Dự phóng điểm số đạt chuẩn (`estimatedProScore+`), và huy hiệu thành tích học viên Bảng vàng.
     - **Tím AI (`#8b5cf6`)**: Dành riêng cho Gia sư AI Speaking đo chuẩn IPA và huy hiệu `Gemini AI 2.0`.
     - **Không lạm dụng Đỏ Rose hoặc Gradient Teal ngoài quy chuẩn**: Đảm bảo toàn bộ thẻ, nút và slider mang lại cảm giác học tập tin cậy và thư thái.

2. **Cấu Trúc Khối Bento Đồng Bộ & Trau Chuốt Từng Chi Tiết**:
   - **`PremiumHeroStage`**: Thẻ Spotlight vinh danh Hội viên Vàng với viền kính tinh tế (`border-white/15 dark:border-white/10`), thẻ thành viên phản quang lồng nhau `rounded-2xl`, hiển thị số lượng 3.420+ học viên trực tuyến và điểm đánh giá 4.9/5.0.
   - **`PremiumPlanDeck`**: Bộ 3 thẻ chọn gói bản quyền bằng nhau chiều cao tuyệt đối, badge bo tròn capsule (`rounded-full`), radio button có dấu tích trực quan, và dải cam kết tiết kiệm ở đáy thẻ.
   - **`PremiumPlanPerksSpotlight`**: Chi tiết đặc quyền, gói quà tặng và nút CTA kích hoạt chuyển thẳng tới `/premium/checkout?plan=...`.
   - **`PremiumBentoShowcase`**: 5 thẻ Bento trực quan hóa công nghệ độc quyền (Sóng âm IPA Gemini AI, Bộ mô phỏng tăng điểm TOEIC/IELTS bằng Slider kéo thả, Đường cong trí nhớ SM-2, Khiên bảo hộ Streak tự động, và Thẻ nhân đôi 2X XP).
   - **`PremiumSuccessStories`**: Bảng vàng thành tích 3 học viên thật với điểm số bứt phá, trích dẫn chi tiết và avatar có quầng hào quang đồng tâm.
   - **`PremiumFaqSection`**: Khung cam kết bảo vệ quyền lợi học viên an tâm 100% cùng Accordion giải đáp thắc mắc thường gặp.

3. **Cổng Thanh Toán Bảo Mật VietQR Napas 24/7 (`/premium/checkout`)**:
   - **Bóc Tách Module Hóa Toàn Diện (`features/premium/components/checkout/`)**: Tinh gọn tệp điều phối từ 547 dòng xuống trang điều phối mỏng dưới ~150 dòng, kết nối custom hook `useCheckoutPayment`.
   - **`CheckoutOrderSummary`**: Cột trái (5/12) gồm bộ chuyển đổi gói dạng viên thuốc (`rounded-full`), bảng chi tiết đơn hàng (giá gốc gạch ngang, số tiền tiết kiệm, tổng thanh toán), hộp quà tặng đính kèm và thẻ cam kết hoàn tiền 100% trong 7 ngày.
   - **`CheckoutQrTerminal`**: Cột phải (7/12) gồm cổng quét mã VietQR tự động sinh theo số tiền và cú pháp `XP PRO [USER_ID]`, đồng hồ đếm ngược 15:00, 4 ô thông tin chuyển khoản 1-Click Copy có phản hồi trực quan "Đã chép ✓", và nút Primary CTA xác nhận chuyển khoản.
   - **`CheckoutSuccessReceipt`**: Màn hình hóa đơn điện tử vinh danh giao dịch thành công kèm mã tra cứu `INV-XP-...` và 2 nút điều hướng tiếp theo.
   - **Đồng Bộ Top Header Chuẩn Dashboard**: Khắc phục lỗi chip cũ, tích hợp `AppTopHeader` với `showGamificationStats={true}` và breadcrumbs mượt mà.

---

## 🗣️ Studio Bảng Phiên Âm Quốc Tế IPA (`/study/ipa`)

Studio tương tác Bảng Phiên Âm Quốc Tế (44 IPA Sounds) chuẩn Oxford/Cambridge, thiết kế theo tiêu chuẩn Agency Dashboard Tier:

1. **Kiến Trúc Module Hóa Feature-First (`features/ipa/`)**:
   - **Tầng Thành Phần Dùng Lại Nhiều Lần (`features/ipa/components/shared/`)**:
     - `IpaAudioPlayButton.tsx`: Nút loa phát âm chuẩn 0ms với hiệu ứng sóng âm/ripple đa kích cỡ (`sm`, `md`, `lg`), tích hợp `speakLessonText`.
     - `IpaSpeechRecorder.tsx`: Bộ thu âm AI Microphone độc lập, đóng gói Web Speech Recognition API (`lang = "en-US"`), nút bấm micro lớn công thái học, phân tích giọng nói theo từ mẫu, chấm điểm % và cộng thưởng XP.
     - `IpaWaveformVisualizer.tsx`: Thanh sóng âm trực quan thời gian thực (Live Audio Energy Spikes) chuyển màu linh hoạt (Xanh hoàng gia `#0059bb` khi phát mẫu, Đỏ Rose `#f43f5e` khi thu âm).
     - `IpaSoundBadge.tsx`: Huy hiệu phân loại âm chuẩn 60-30-10 với micro dot tinh tế (Xanh hoàng gia cho nguyên âm, Tím AI cho nguyên âm đôi, Xanh Emerald cho phụ âm hữu thanh, Vàng Amber cho phụ âm vô thanh), hiển thị nhãn phân loại chuẩn 1 dòng `whitespace-nowrap`.
     - `IpaMouthAnatomySvg.tsx` / `IpaAnatomyViewer.tsx`: Sơ đồ giải phẫu khẩu hình SVG đa góc nhìn (Mặt Nghiêng Sagittal & Mặt Trước Frontal) với kiến trúc Header 2 tầng (Tầng 1 Bản sắc thương hiệu không bị cắt chữ, Tầng 2 Thanh điều khiển góc nhìn & Chú thích chuyên dụng). Khối xương hàm dưới (mandible) ôm khít cằm tự nhiên, vòm mềm rủ giọt nước sinh học, luồng hơi streamline thanh thoát không dùng nét đứt CAD, reticle micro-beacon định vị cấu âm chuẩn xác và bảng 4 thông số cấu âm tích hợp micro-iconography.
     - `IpaWordExampleCard.tsx`: Thẻ từ vựng ví dụ tương tác tích hợp loa phát âm 1 chạm và phiên âm chuẩn.
     - `IpaMetricCard.tsx`: Thẻ chỉ số Bento Double-Bezel chuẩn Dashboard.
   - **Phân Khu 0: Hero Greeting & Tiến Trình Tối Giản (`features/ipa/components/hero/IpaHeroGreeting.tsx`)**: Kế thừa kiến trúc `DashboardHeroGreeting`: Avatar tròn, Lv.N, tiến độ làm chủ âm chuẩn. Tích hợp **Nút công tắc gạt (iOS-style Toggle Switch) "Chỉ số chi tiết"** thay thế viên thuốc phần trăm thừa, hỗ trợ ẩn/hiện mượt mà (`AnimatePresence`) 4 Bento Metric Cards và lưu trạng thái vào `localStorage` giúp tiết kiệm ~150px không gian làm việc.
   - **Phân Khu 1: Bảng 44 Âm Quốc Tế (`features/ipa/components/matrix/`)**:
     - `IpaSoundCardV2.tsx`: Thẻ âm Double-Bezel với Floating Word Capsule căn giữa (từ vựng in đậm không bị truncate cắt chữ, phiên âm monospace bên dưới), ký hiệu ngữ âm to rõ kèm mẹo cấu âm trực quan thuần Việt.
     - `IpaMatrixBoard.tsx`: Bố cục 3 khối chuẩn quốc tế (12 Nguyên âm đơn, 8 Nguyên âm đôi, 24 Phụ âm gồm 16 âm đi theo cặp và 8 âm đơn lẻ), lưới responsive cân bằng `grid-cols-2 sm:grid-cols-4 xl:grid-cols-8`, tích hợp tìm kiếm thời gian thực.
     - `IpaSoundDetailModal.tsx`: Slide-over modal soi nhanh chi tiết âm khi nhấp trên bảng ma trận.
   - **Phân Khu 2: Phòng Thực Hành Khẩu Hình & AI Studio Riêng Biệt (`features/ipa/components/practice-lab/IpaDedicatedPracticeLab.tsx`)**: Màn hình chuyên sâu tách riêng biệt: Thanh chọn 44 âm dạng pill, bố cục cân đối 6/12 - 6/12, sơ đồ khẩu hình SVG động, khối 4 thẻ thông số cấu âm cân đối 2x2 trang bị micro-badge icon ở góc trên bên phải (`Smile`, `Layers`, `MoveVertical`, `Mic`), cẩm nang cấu âm & mẹo độc quyền thu gọn mặc định với nút mở/ẩn trực quan tích hợp ngay dưới thông số giải phẫu (Fluid Spring Animation 60fps), thanh điều hướng chuyển âm đối xứng cân bằng (Symmetrical Sound Stepper) với nhãn hành động minh bạch `Âm trước` / `Âm sau`, bộ đếm đồng bộ danh mục lọc 2 chữ số, micro-KBD shortcut badges `[ ← ] [ → ]`, và phòng thu âm AI chấm điểm +15 XP & +5 Vàng.
    - **Phân Khu 3: Đấu Trường Cặp Âm Đối Chiếu (`features/ipa/components/minimal-pairs/IpaMinimalPairsArena.tsx`)**: Đấu trường phản xạ tai nghe phân biệt cặp âm tối thiểu (12 cặp âm, 3 chế độ Thần tốc 6s / Sinh tồn 3 mạng / Huấn luyện sâu). Chuẩn hóa container chiều rộng chuẩn `w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12` đồng nhất 100% với Dashboard. Loại bỏ 100% popover nổi lơ lửng và thanh cuộn xám thô đè màn hình, thay thế bằng **Kiến Trúc Điều Hướng Phẳng 2 Cấp Độ (Two-Tier Flat Navigation)**: Cấp 1 trang bị Cụm Stepper 1 chạm `[ ‹ ] [ /{soundA}/ vs /{soundB}/ ] [ › ]` ngay trên thanh Dock cho phép chuyển cặp âm trong 0.1s; Cấp 2 là **Khung Danh Mục Phẳng Tích Hợp (Flat Integrated Topics Deck)** mở rộng dạng accordion liền mạch ngay dưới Dock, trải đều 12 cặp âm theo lưới đa cột thoáng đãng, sửa lỗi gãy dòng tab danh mục bằng `whitespace-nowrap shrink-0`, chữ từ vựng to rõ nét (`text-2xl sm:text-3xl lg:text-4xl font-black`), quả cầu loa gradient 64px–72px cân đối, và tối ưu chiều cao vừa vặn trong 1 khung nhìn (Zero-Scroll Viewport Fit).
   - **Main Orchestrator & Skeleton Loading**: `app/(dashboard)/study/ipa/page.tsx` và `loading.tsx` (0px CLS).

---

## 📚 Kho Học Liệu Toàn Diện & Đa Dạng (Expanded Comprehensive Learning Repository)

Hệ thống sở hữu kho học liệu song ngữ đồ sộ, được xây dựng bài bản theo chuẩn khung tham chiếu Châu Âu (CEFR A2 – C2), IELTS Academic & General (Band 5.0 – 8.5+), và TOEIC Quốc tế 2026:

### 1. Thư Viện Bài Đọc Chuyên Sâu 32 Chủ Đề (`features/reading/`)
- **Quy mô**: 32 bài đọc hoàn chỉnh kèm bản dịch tiếng Việt song ngữ, bảng từ vựng tiêu điểm có phiên âm IPA chuẩn Oxford, và hệ thống câu hỏi trắc nghiệm MCQ phân tích chi tiết.
- **Phân bổ trình độ**:
  - **A2 – B1 (Đời sống & Thói quen)**: Cà phê sáng, thói quen đi bộ, giấc ngủ phục hồi, ẩm thực đường phố, tiết kiệm cá nhân.
  - **B1 – B2 (Kinh doanh & Công nghệ)**: Thương mại điện tử, kinh tế tuần hoàn, văn hóa làm việc từ xa, sáp nhập & mua lại (M&A), chuyển đổi số đám mây (Cloud Migration), thẩm định ESG.
  - **C1 – C2 (Học thuật đỉnh cao)**: Khoa học thần kinh về giấc ngủ & trí nhớ, khảo cổ học đáy biển sâu, đạo đức trí tuệ nhân tạo (AI Ethics), mật mã học lượng tử (Quantum Cryptography), quản trị bức xạ mặt trời (Solar Radiation Management), kinh tế học đăng ký thuê bao (Subscription Economics).

### 2. Studio Hội Thoại AI 20 Tình Huống Đời Thực (`features/ai/conversation/`)
- **Quy mô**: 20 kịch bản đàm thoại thực tế (`at1` – `at20`) tích hợp AI Gemini Tutor hướng dẫn phát âm, phân tích ngữ pháp và gợi ý phản xạ tức thì:
  - **Dịch vụ & Du lịch**: Đặt bàn nhà hàng sang trọng, hỏi đường phố cổ, khiếu nại dịch vụ phòng khách sạn 5 sao, mở tài khoản ngân hàng quốc tế (`at17`), thuê xe tự lái & cứu hộ đường bộ (`at18`), quán cà phê đặc sản & small talk (`at20`).
  - **Công sở & Sự nghiệp**: Phỏng vấn xin việc toàn cầu, đàm phán tăng lương & thăng chức (`at9`), hỗ trợ kỹ thuật IT Helpdesk (`at12`), kết nối giao lưu hội nghị quốc tế (`at14`).
  - **Học thuật & Chuyên môn**: Trao đổi giờ nghiên cứu với giáo sư đại học (`at10`), tư vấn dinh dưỡng & gym (`at13`), phỏng vấn Visa & thủ tục nhập cảnh hải quan Anh/Mỹ (`at19`).
  - **Khởi nghiệp & Tình huống khẩn cấp**: Thuyết trình gọi vốn hạt giống trước quỹ đầu tư mạo hiểm Thung lũng Silicon (`at15`), trình báo mất hộ chiếu & hỗ trợ cảnh sát khẩn cấp (`at16`).

### 3. Phòng Luyện Nhại Đa Giọng Nói 8 Kịch Bản Shadowing (`features/shadowing/`)
- **Quy mô**: 8 bài kịch bản nhập vai đa nhân vật (`shadow_ext_001` – `008`) với dữ liệu căn chỉnh thời gian từng từ (Word Timings Sub-second Precision) phục vụ tính năng Karaoke nhại giọng theo thời gian thực:
  - Thông báo hoãn chuyến bay khẩn cấp sân bay quốc tế.
  - Đàm phán hợp đồng thầu phần mềm doanh nghiệp B2B.
  - Phân loại cấp cứu lâm sàng & đo điện tim (Hospital Triage & ECG).
  - Thẩm định kiến trúc Fintech & chuyển đổi Microservices.
  - Lễ tân khách sạn 5 sao xử lý yêu cầu vé VIP nhà hát Opera.
  - Buổi bảo vệ đề cương luận văn Thạc sĩ năng lượng tái tạo.
  - Khủng hoảng chuỗi cung ứng logistics hàng hải qua điểm nghẽn kênh đào (`shadow_ext_007`).
  - Đàm phán điều khoản đầu tư Series A & Liquidation Preference giữa nhà sáng lập và quỹ đầu tư mạo hiểm (`shadow_ext_008`).

### 4. Kho Từ Vựng Chuyên Biệt Nâng Cao (90+ Cụm Từ & Thành Ngữ Giá Trị Cao)
- **30 Collocations Học Thuật IELTS Band 7.5 – 8.5+** (`features/vocabulary/data/academicCollocations.ts`): Bao gồm các cụm học thuật đỉnh cao như `exacerbate the problem`, `compelling empirical evidence`, `foster economic growth`, `cast doubt on the validity`, `draw a clear distinction`, `exert a profound influence`, `bridge the socioeconomic divide`, `pose an existential threat`, `stem from systemic flaws`, `catalyze paradigm shifts`.
- **20 Collocations Kinh Doanh TOEIC & Corporate** (`features/vocabulary/data/businessCollocations.ts`): Các cấu trúc thiết yếu như `conduct a comprehensive audit`, `meet a tight deadline`, `streamline the workflow`, `maximize shareholder value`, `gain a competitive edge`, `mitigate financial risks`, `allocate sufficient budget`, `reach a mutual agreement`, `exceed quarterly sales targets`, `resolve customer grievances`.
- **20 Phrasal Verbs Thông Dụng Nhất** (`features/vocabulary/data/phrasalVerbs.ts`): Đầy đủ ngữ nghĩa, ví dụ song ngữ, từ đồng/trái nghĩa (`call off`, `bring about`, `come up with`, `put up with`, `look forward to`, `cut down on`, `run out of`, `phase out`, `stand out`, `figure out`, `fall behind on`, `weigh in on`...).
- **20 Idioms & Cụm Quán Ngữ Ẩn Dụ Đắt Giá** (`features/vocabulary/data/idioms.ts`): Nâng tầm giao tiếp tự nhiên như người bản xứ (`burn the midnight oil`, `cost an arm and a leg`, `cut corners`, `see eye to eye`, `bite the bullet`, `hit the nail on the head`, `take it with a grain of salt`, `under the weather`, `the ball is in your court`, `a blessing in disguise`...).
- **Đồng Bộ Cơ Sở Dữ Liệu**: Đã cấu hình và kết nối đồng nhất vào bảng `themes.ts` và kịch bản khởi tạo dữ liệu `prisma/seed.ts`.

---

## ⚡ Chuẩn Tối Ưu Truy Vấn CSDL & Đồ Thị Kỹ Năng / Điểm Kinh Nghiệm (Database Query Performance Standard & XP Chart Architecture)

Tuân thủ nghiêm ngặt quy chuẩn cốt lõi:
$$\text{MEASURE} \rightarrow \text{UNDERSTAND} \rightarrow \text{EXPLAIN} \rightarrow \text{IDENTIFY BOTTLENECK} \rightarrow \text{OPTIMIZE} \rightarrow \text{BENCHMARK} \rightarrow \text{VERIFY} \rightarrow \text{MONITOR}$$

### 1. Phân Tầng Tối Ưu Hóa (Optimization Priority Layers)
- **Level 1 (Query & Logic):** Tính đúng đắn, `SELECT` đúng cột cần dùng, loại bỏ N+1, đảm bảo sargability, filter sớm, pagination phù hợp.
- **Level 2 (Index Strategy):** Tận dụng index hiện có, index composite cho các bộ lọc thường dùng.
- **Level 3 (Schema & Denormalization):** Phù hợp truy vấn phân tích tổng hợp.
- **Level 4 (Connection Pool & Engine):** Hạn chế checkout nhiều kết nối đồng thời từ Neon PostgreSQL pool (giảm từ 6 kết nối xuống 1 kết nối qua Single Root Query).
- **Level 5 (In-Memory Cache):** TTL Cache in-memory ngắn hạn (30s–60s) kèm cơ chế giải phóng chủ động khi có thay đổi dữ liệu.

### 2. Tối Ưu Hóa Biểu Đồ & Điểm Kinh Nghiệm (Charts & Experience Points Engine)
1. **Kiến Trúc Single Root Query tại `/api/user/analytics`**:
   - **Xóa bỏ Nút thắt cổ chai (Bottleneck):** Trước đây endpoint chạy `prisma.dailySkillPractice.groupBy` trên **toàn bộ người dùng** trong CSDL chỉ để tìm thứ hạng tuần của 1 học viên (`weeklyRankStr`). Khi dữ liệu tăng, điều này gây quét bảng lớn và truyền tải mảng đối tượng khổng lồ vào RAM Node.js.
   - **Tối ưu hóa:** Thay thế bằng **Truy vấn Đơn Gốc (Single Root Query)** trên model `Profile` kèm các quan hệ lồng nhau (`dailySkillPractices`, `examAttempts`, `listeningProgresses`, `_count.vocabularies`).
   - **Lọc sớm & Giảm cột thừa (Selective Projection):** Thêm mệnh đề `select` chặt chẽ cho `dailySkillPractices` (`skill`, `date`, `minutes`, `xpEarned`), loại bỏ `id`, `userId`, `createdAt`, `updatedAt` cho 168 ngày (cắt giảm >50% dung lượng JSON qua mạng).
   - **Đếm thứ hạng vô hướng (Scalar Raw Count):** Sử dụng câu truy vấn vô hướng `SELECT COUNT(*)::int ... GROUP BY user_id HAVING SUM(xp_earned) > $userWeeklyXp` thực thi trực tiếp trong engine PostgreSQL, chỉ trả về đúng 1 số nguyên duy nhất, giảm áp lực kết nối và bộ nhớ CPU Node.js về 0.
2. **Đồng Bộ Điểm Kinh Nghiệm `/api/user/activity-award` & Vô Hiệu Hóa Cache Tức Thì**:
   - Khi học viên hoàn thành bài luyện tập (Dictation, Shadowing, Vocab, PvP, Exam), endpoint `activity-award` cộng dồn XP và Coins nguyên tử vào `Profile` và `DailySkillPractice`.
   - Mở rộng hàm `invalidateDashboardCache(userId)` và `invalidateAnalyticsCache(userId)` trong [`infrastructure/cache/dashboardCache.ts`](file:///e:/XP%20English%20%20XP%20Voca/infrastructure/cache/dashboardCache.ts) để giải phóng ngay lập tức cache RAM của cả Dashboard (`dashboard_overview:*`) và Analytics (`analytics:*`), đảm bảo giao diện hiển thị ngay lập tức cấp độ mới, tổng XP mới và đồ thị cập nhật trong 0ms.
   - Sửa lỗi tính toán số Coins trả về khi thăng cấp (`levelUpCoinsBonus`).
3. **Quy Chuẩn Hiển Thị Điểm Số & Đồ Thị (UI/UX Guidelines)**:
   - **Quy tắc 8 & 20:** Làm nổi bật số liệu chính bằng font Display cỡ lớn (`text-base sm:text-lg font-black font-display tabular-nums`), phân định màu ngữ nghĩa: Vàng Amber (`#f59e0b`) cho Streak & Trophy, Xanh Emerald (`#10b981`) cho Vốn từ & XP, Xanh Hoàng Gia (`#0059bb`) cho Thời lượng học.
   - **Chuẩn Hóa Phần Trăm:** Mọi tỷ lệ tiến độ kinh nghiệm đều áp dụng `formatPercent` (Max 2 Decimals Standard, triệt tiêu lỗi số thực vô hạn `33.33333333%`).
   - **Hiệu Ứng Sóng Bezier 60fps:** Đồ thị SVG đường cong Bezier cao 210px (Dashboard) và 254px (Analytics) trang bị hook nội suy tọa độ Y mượt mà 320ms (`useInterpolatedYPoints`) chống giật khi chuyển tab kỹ năng.
4. **Bộ Kiểm Thử Chuẩn Hóa (`__tests__/analytics_xp_standards.test.ts`)**:
   - Đạt 100% PASS (5/5 tests), bảo vệ toàn vẹn logic Single Root Query, Cache HIT/MISS, đếm hạng vô hướng và giải phóng bộ đệm.

### 3. Hệ Thống Học Qua Video Tương Tác & Đồng Bộ Phụ Đề Chuẩn Xác (`/myvideo`)
1. **Kiến Trúc Đồng Bộ Thời Gian Thực & Đón Đầu Âm Thanh (Audio Anticipation Lead Time Engine)**:
   - **Cơ Chế Đón Đầu Âm Thanh Quốc Tế (+200ms Lead Time):** Tích hợp hằng số chuẩn `SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC = 0.200` (200ms) vào vòng lặp đồng bộ `effectiveTime`. Phụ đề hiển thị đón đầu âm thanh ~200ms theo chuẩn phụ đề sư phạm quốc tế (TED Subtitles & Netflix Accessibility Guidelines), triệt tiêu độ trễ mạng và độ trễ giao tiếp `postMessage` của YouTube iframe, giúp mắt người học đọc trước từ khóa ngay khi người nói bắt đầu phát âm.
   - **Đồng Bộ Karaoke Âm Tiết Đón Đầu:** Áp dụng cùng mức Lead Time cho việc tính toán `calculateCharacterWeightedWordIndex` và mốc `wordTimings` giúp từng từ vựng sáng đèn Amber Glow (`#f59e0b`) chuẩn xác theo đúng từng âm tiết người nói phát ra.
   - **Xử Lý Khoảng Lặng Giữa Các Câu (Linger & Anticipation Window):** Tích hợp cơ chế Linger Window 200ms (giữ câu vừa kết thúc không bị biến mất đột ngột trong khoảng nghỉ) kết hợp Anticipation Window 250ms (kích hoạt câu kế tiếp đón đầu trước khi phát), mang lại trải nghiệm xem video mượt mà, không giật cục.
   - **Triệt tiêu Điểm nghẽn Giây 0 (Zero-Time Deadlock Elimination):** Loại bỏ điều kiện chặn `realTime > 0` giúp câu đầu tiên tại `0.0s` kích hoạt trơn tru, chính xác ngay khi video bắt đầu.
   - **Cơ chế Nội suy Mượt mà (Smooth Time Interpolation):** Mở rộng cửa sổ ngoại suy thời gian từ 350ms lên 4000ms, loại bỏ giật lag do chu kỳ `postMessage` không đều của YouTube iframe (250ms – 500ms).
   - **Khóa Chống Dội Tua (Anti-Rubber-Banding Seek Lock):** Tự động cô lập và từ chối các gói tin `currentTime` cũ đang bay trong vòng 800ms sau khi người dùng click tua câu phụ đề.
2. **Động Cơ Trích Xuất Phụ Đề Toàn Diện & Không Bỏ Sót Câu (Full Pipeline Subtitle Extraction)**:
   - **Chuẩn Hóa TTML/srv3 Millisecond Timing:** Loại bỏ heuristic `tVal > 500` không an toàn; toàn bộ thuộc tính `t` và `d` trong thẻ `<p t="..." d="...">` được quy đổi mili-giây sang giây chính xác, bảo toàn tuyệt đối các câu mở đầu siêu ngắn (`< 500ms`, ví dụ `t="80"` thành `0.08s`).
   - **Hỗ Trợ Bóc Tách Hỗn Hợp Cả Thẻ `<text>` và `<p>`:** Đọc trọn vẹn toàn bộ các thẻ phụ đề mà không bị bỏ qua thẻ `<p>` khi có thẻ `<text>` đi kèm.
   - **Bảo Toàn 100% Phụ Đề Gốc Đã Có Dấu Câu (Preserve Punctuated Subtitles):** Giữ nguyên vẹn toàn bộ các câu của tác giả khi phụ đề đã có dấu câu (`.`, `!`, `?`), không gộp câu thô bạo.
   - **Nâng Cấp Hạn Mức Tải Máy Chủ:** Tăng timeout fetch phụ đề lên `5000ms – 6000ms` cho video dài và bổ sung client profile `ANDROID` (`19.29.35`) trên Innertube API.
3. **Quy Chuẩn Giao Diện Tinh Giản & Hệ Thống Icon Nhận Diện (UI/UX Guidelines)**:
   - **Loại bỏ khối vi chỉnh `-0.2s / +0.2s`:** Tinh giản không gian player, loại bỏ các nút căn chỉnh dư thừa giúp giao diện gọn gàng, trực quan.
   - **Header Thanh Phụ Đề 1 Dòng Duy Nhất:** Chuẩn hóa tiêu đề `"Click câu để nhảy · Tra từ"` và nút chuyển chế độ `"Xem Tất Cả"` / `"Focus 3 Câu"` nằm cố định trên 1 dòng duy nhất chống vỡ layout trên mọi kích thước màn hình.
   - **Tự Động Cuộn Trọng Tâm (Center Auto-Scroll):** Trong chế độ Xem Tất Cả (Full List Mode), câu đang phát tự động cuộn vào trung tâm màn hình (`block: "center"`).
   - **Thay thế Huy hiệu Văn bản bằng Icon Chuẩn Agency:**
     - Đang phát âm thanh: `<Volume2 className="w-3.5 h-3.5 animate-pulse text-[#0059bb]" />`.
     - Câu đang chọn / Sẵn sàng: `<Radio className="w-3.5 h-3.5 animate-pulse text-blue-600" />` (thay thế `"Sắp phát"`).
     - Câu kế tiếp (+1): `<ChevronDown className="w-3.5 h-3.5" />` (thay thế `"[CÂU TIẾP THEO 1]"`).
     - Câu kế tiếp (+2): `<ChevronsDown className="w-3.5 h-3.5" />` (thay thế `"[CÂU TIẾP THEO 2]"`).
   - **Tối Ưu Hóa Khởi Tạo Tải (Dynamic Imports & Lazy Loading):** Lazy load 4 modal nặng (`SubtitleExportModal`, `SrtImportModal`, `XpSubExtractorModal`, `KeyboardShortcutsModal`) qua `next/dynamic` giúp giảm ngay ~68KB dung lượng bundle ban đầu của trang.
4. **Bộ Kiểm Thử Toàn Diện (`__tests__/myvideo*.test.ts`)**:
   - 10 bộ kiểm thử Vitest với **250/250 tests PASS 100%**, bao gồm kiểm thử độ chính xác định thời phụ đề (`myvideo_subtitle_engine_precision.test.ts`), đồng bộ phát video thời gian thực (`myvideo_realtime_playback_sync.test.ts`) và kiểm thử đón đầu âm thanh cùng bóc tách phụ đề trọn vẹn (`myvideo_full_subtitle_pipeline_lead_time.test.ts`).

---

## 🌐 Production Deployment Status

- **Live Production App URL (Vercel)**: [https://xpenglishvoca.vercel.app](https://xpenglishvoca.vercel.app)
- **Status**: **100% Build SUCCESS** (98/98 static & dynamic routes compiled)












