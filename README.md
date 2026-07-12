# 🚀 Hướng dẫn Lập Kế hoạch Dự án Phần mềm Toàn diện với AI

> **Prompt Framework 7 Bước** — Biến ý tưởng thành kế hoạch hành động chi tiết chỉ với một câu lệnh duy nhất.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![AI Compatible](https://img.shields.io/badge/AI-Compatible-brightgreen.svg)](#-cách-sử-dụng)
[![PRD → Ship](https://img.shields.io/badge/PRD_%E2%86%92_Ship-7_Steps-orange.svg)](#-7-bước-lập-kế-hoạch)

---

## 📖 Giới thiệu

Khi bắt đầu một dự án phần mềm, việc lập kế hoạch bài bản là yếu tố **quyết định thành bại**. Tài liệu này cung cấp một **Prompt Framework hoàn chỉnh** gồm 7 bước logic chặt chẽ, được thiết kế để bạn có thể sử dụng với bất kỳ AI nào (ChatGPT, Claude, Gemini,...) nhằm tạo ra bản kế hoạch dự án từ A đến Z.

### Tại sao cần Framework này?

| ❌ Không có kế hoạch | ✅ Có Framework 7 bước |
|---|---|
| Code trước, nghĩ sau → Refactor liên tục | Hiểu rõ vấn đề → Code đúng ngay lần đầu |
| Frontend và Backend làm lệch nhau | Luồng dữ liệu thống nhất, API đồng bộ |
| Không biết ưu tiên gì, feature creep | MVP rõ ràng, Roadmap có mốc nghiệm thu |
| Sản phẩm đúng kỹ thuật nhưng sai thị trường | PRD trả lời "Tại sao" trước "Làm thế nào" |

---

## 🗺️ Tổng quan Luồng 7 Bước

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ① PRD ──▶ ② Product Overview ──▶ ③ TRD ──▶ ④ App Flow               │
│                                                       │                 │
│                                                       ▼                 │
│                    ⑦ Execution Plan ◀── ⑥ Backend ◀── ⑤ UI/UX          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

> Mỗi bước là **đầu vào bắt buộc** cho bước kế tiếp. Không bỏ bước, không đảo thứ tự.

---

## 📌 Prompt chính (Copy & Paste vào AI)

Thay thế nội dung trong dấu `[...]` bằng thông tin thực tế của dự án, sau đó dán toàn bộ vào AI.

---

> **Vai trò của bạn:** Bạn là một Chuyên gia Quản lý Sản phẩm (Product Manager) kiêm Trưởng dự án kỹ thuật (Technical Lead) cấp cao.
>
> **Dự án cần lập kế hoạch:** `[Tên dự án — Ví dụ: Ứng dụng giao đồ ăn thông minh]`
>
> **Mô tả ngắn gọn:** `[Mô tả 1-2 câu — Ví dụ: Nền tảng kết nối người dùng với các nhà hàng đối tác, cho phép đặt món và theo dõi shipper theo thời gian thực]`
>
> ---
>
> **YÊU CẦU:** Hãy lập một kế hoạch dự án chi tiết, toàn diện, bắt buộc phải trải qua đúng **7 bước** dưới đây. Trong mỗi bước, bạn phải trình bày rõ **2 phần:**
>
> 1. **Nội dung cụ thể (Có gì):** Các đầu mục công việc, tài liệu, sơ đồ cần tạo ra.
> 2. **Lập luận (Tại sao):** Giải thích lý do thực hiện bước này, giá trị mang lại, và **mối liên kết logic** giữa bước hiện tại với bước trước đó.

---

## 📋 7 Bước Lập Kế hoạch

### Bước 1 · Tài liệu Yêu cầu Sản phẩm (PRD)

**Product Requirements Document**

#### 📄 Có gì

| Hạng mục | Mô tả |
|---|---|
| **Problem Statement** | Vấn đề cốt lõi cần giải quyết |
| **OKRs** | Mục tiêu kinh doanh và kết quả then chốt |
| **Personas** | Chân dung đối tượng người dùng mục tiêu |
| **Scope** | Phạm vi In-scope / Out-scope rõ ràng |
| **KPIs / Metrics** | Các chỉ số đo lường thành công |

#### 🧠 Tại sao

> PRD là **"hiến pháp"** của dự án.
>
> Phải trả lời được câu hỏi **"Tại sao làm dự án này?"** trước khi nghĩ đến **"Làm thế nào?"**. Bước này định hướng toàn bộ các quyết định sau, giúp tránh tình trạng xây dựng sản phẩm đúng kỹ thuật nhưng **sai thị trường**.

---

### Bước 2 · Tổng quan Sản phẩm (Product Overview)

**Tầm nhìn & Chiến lược**

#### 📄 Có gì

| Hạng mục | Mô tả |
|---|---|
| **Value Proposition** | Tuyên bố giá trị cốt lõi |
| **Competitive Positioning** | Sơ đồ vị trí cạnh tranh trên thị trường |
| **Epics** | Các tính năng chính cấp cao |
| **Roadmap** | Lộ trình phát triển sơ bộ theo giai đoạn |

#### 🧠 Tại sao

> Thu hẹp bối cảnh từ **"đám mây" xuống "đường chân trời"**.
>
> Dựa trên PRD *(Bước 1)*, ta tổng hợp thành một bức tranh tổng thể dễ hiểu cho mọi bên liên quan (Stakeholders) mà chưa cần đi sâu vào công nghệ. Nó giúp team Kỹ thuật và Kinh doanh **"chung một tiếng nói"** trước khi bắt tay vào thiết kế.

#### 🔗 Liên kết logic

```
Bước 1 (PRD: Tại sao?) ──▶ Bước 2 (Overview: Làm gì ở mức cao?)
```

---

### Bước 3 · Tài liệu Yêu cầu Kỹ thuật (TRD)

**Technical Requirements Document**

#### 📄 Có gì

| Hạng mục | Mô tả |
|---|---|
| **Tech Stack** | Lựa chọn Frontend, Backend, Database, Cloud |
| **API Overview** | Bảng mô tả API cấp cao (Endpoints thô) |
| **Performance SLA** | Giới hạn hiệu suất (Response time, Uptime) |
| **Security Standards** | Tiêu chuẩn xác thực, mã hóa, phân quyền |

#### 🧠 Tại sao

> TRD là **cầu nối chính thức** giữa "Ý tưởng kinh doanh" và "Mã nguồn".
>
> Dựa vào các Epics ở *Bước 2*, ta giải mã thành ngôn ngữ kỹ thuật. Làm bước này **trước** khi vẽ UI hay Backend chi tiết để đảm bảo nền tảng công nghệ đủ khỏe để chịu tải và bảo mật cho các tính năng đã đề ra.

#### 🔗 Liên kết logic

```
Bước 2 (Epics cấp cao) ──▶ Bước 3 (Giải mã thành ngôn ngữ kỹ thuật)
```

---

### Bước 4 · Luồng của App (App Flow)

**Logic xử lý & Chuyển trạng thái**

#### 📄 Có gì

| Hạng mục | Mô tả |
|---|---|
| **Data Flow Diagram** | Sơ đồ luồng dữ liệu giữa các thành phần |
| **State Machine** | Sơ đồ chuyển trạng thái màn hình |
| **Happy Path** | Các luồng chính khi mọi thứ hoạt động đúng |
| **Exception Path** | Luồng ngoại lệ: mất mạng, lỗi thanh toán, hết hàng |

#### 🧠 Tại sao

> Logic là **"bộ não"** của ứng dụng.
>
> Dù UI có đẹp hay Backend có mạnh, nếu luồng sai thì người dùng sẽ bị treo. Phải định nghĩa luồng **ngay sau TRD** và **trước UI/Backend chi tiết** để lập trình viên Frontend và Backend có một **"bản đồ chung"**, tránh việc Frontend gọi sai thứ tự API hoặc Backend trả sai trạng thái.

#### 🔗 Liên kết logic

```
Bước 3 (Nền tảng công nghệ) ──▶ Bước 4 (Luồng xử lý trên nền tảng đó)
```

---

### Bước 5 · Thiết kế UI/UX

**Giao diện & Trải nghiệm Người dùng**

#### 📄 Có gì

| Hạng mục | Mô tả |
|---|---|
| **Wireframe** | Bố cục thô, sắp xếp thông tin |
| **Mockup** | Thiết kế chi tiết: màu sắc, typography, hình ảnh |
| **Design System** | Component Library: nút, input, card, bảng |
| **Micro-interactions** | Tương tác vi mô: hover, transition, animation |

#### 🧠 Tại sao

> Đây là bước **"lột xác"** luồng cứng thành cảm xúc mềm mại.
>
> Phải bám sát luồng đã định ở *Bước 4* để đảm bảo mọi nút bấm đều dẫn đúng màn hình. Thiết kế ở bước này cho phép UX Writer và PO kiểm tra tính trực quan, đồng thời là **đầu vào** để Frontend bắt đầu code giao diện **song song** với Backend.

#### 🔗 Liên kết logic

```
Bước 4 (Luồng logic) ──▶ Bước 5 (Biến luồng thành màn hình cụ thể)
```

---

### Bước 6 · Cấu trúc Backend

**Kiến trúc Máy chủ & Dữ liệu**

#### 📄 Có gì

| Hạng mục | Mô tả |
|---|---|
| **ERD / Class Diagram** | Sơ đồ quan hệ thực thể, sơ đồ lớp |
| **Database Schema** | Cấu trúc bảng, kiểu dữ liệu, index |
| **API Specification** | Method, Path, Request Body, Response, Error Codes |
| **Architecture** | Microservice / Monolith / Serverless |
| **Business Logic** | Logic nghiệp vụ phía server |

#### 🧠 Tại sao

> Backend là **"xương sống"** cung cấp dữ liệu cho UI *(Bước 5)*.
>
> Sau khi đã có luồng *(Bước 4)* và công nghệ nền *(Bước 3)*, ta thiết kế chi tiết DB và API. Bước này được thực hiện **sau UI Flow** để biết chính xác cần trả về trường gì cho màn hình nào, nhưng vẫn **song hành** với Frontend (Backend cho API, Frontend lấy Mock data).

#### 🔗 Liên kết logic

```
Bước 5 (UI cần dữ liệu gì) ──▶ Bước 6 (Backend cung cấp dữ liệu đó)
```

---

### Bước 7 · Kế hoạch Thực hiện (Execution Plan)

**Sprint Plan & Quản lý Rủi ro**

#### 📄 Có gì

| Hạng mục | Mô tả |
|---|---|
| **T-shirt Sizing** | Phân tích khối lượng công việc (S / M / L / XL) |
| **Sprint Schedule** | Lịch trình chi tiết theo Sprint hoặc Tuần |
| **Team Assignment** | Phân công nhóm: FE, BE, QA, DevOps |
| **Milestones** | Các mốc nghiệm thu quan trọng |
| **Risk Mitigation** | Kế hoạch quản lý rủi ro |
| **Testing Strategy** | Unit Test, Integration Test, UAT |

#### 🧠 Tại sao

> **Không có kế hoạch thì mọi ý tưởng đều là mơ mộng.**
>
> Phải dựa vào tất cả tài liệu từ *Bước 1 → 6* để ước tính thời gian chính xác. Bước này đảm bảo thứ tự ưu tiên (MVP trước, nâng cấp sau), phân công đúng người đúng việc, và thiết lập vòng phản hồi (Retrospective) để điều chỉnh kịp thời.

#### 🔗 Liên kết logic

```
Bước 1–6 (Toàn bộ tài liệu) ──▶ Bước 7 (Biến tài liệu thành hành động)
```

---

## 🛠️ Cách sử dụng

### Bước 1: Chuẩn bị thông tin dự án

Thay thế hai trường sau trong Prompt:

```
[Tên dự án]      →  Ví dụ: "XP English — Nền tảng học tiếng Anh thông minh"
[Mô tả ngắn gọn] →  Ví dụ: "Ứng dụng web giúp người Việt Nam ôn luyện 
                      từ vựng, ngữ pháp và kỹ năng giao tiếp tiếng Anh 
                      thông qua AI, gamification và cộng đồng học tập."
```

### Bước 2: Dán vào AI

Hỗ trợ tốt nhất với:

| AI | Ghi chú |
|---|---|
| **ChatGPT** (GPT-4o trở lên) | Cho output dài, chi tiết |
| **Claude** (Opus / Sonnet) | Phân tích logic chặt chẽ, cấu trúc rõ ràng |
| **Gemini** (Pro / Ultra) | Tích hợp tốt với Google Workspace |

### Bước 3: Đào sâu từng bước

Nếu dự án lớn, hãy yêu cầu AI **đào sâu từng bước** riêng lẻ:

```
"Hãy đào sâu vào Bước 3 (TRD) với tech stack: Next.js, Supabase, Prisma, 
Clerk Auth. Liệt kê chi tiết từng API endpoint cần thiết."
```

```
"Hãy đào sâu vào Bước 6 (Backend) và tạo schema Prisma hoàn chỉnh 
cho module Quản lý Từ vựng và Hệ thống XP/Gamification."
```

---

## 📊 Ma trận liên kết giữa các bước

Bảng dưới đây cho thấy mỗi bước **phụ thuộc** vào bước nào và **cung cấp đầu vào** cho bước nào:

| Bước | Tên | Phụ thuộc vào | Cung cấp cho |
|:---:|---|---|---|
| **1** | PRD | — | 2, 7 |
| **2** | Product Overview | 1 | 3, 7 |
| **3** | TRD | 2 | 4, 6 |
| **4** | App Flow | 3 | 5, 6 |
| **5** | UI/UX Design | 4 | 6, 7 |
| **6** | Backend Architecture | 3, 4, 5 | 7 |
| **7** | Execution Plan | 1 → 6 | — |

---

## 💡 Mẹo nâng cao

### Với dự án nhỏ (1-2 người, < 1 tháng)

AI sẽ trả về bản tóm tắt gọn nhẹ. Bạn có thể gộp một số bước:
- Gộp Bước 1 + 2 → "PRD & Vision"
- Gộp Bước 3 + 4 → "Technical Spec & Flow"
- Giữ nguyên Bước 5, 6, 7

### Với dự án lớn (team 5+ người, > 3 tháng)

Hãy yêu cầu AI tạo **từng bước riêng biệt** trong các phiên hội thoại khác nhau, mỗi bước là một tài liệu hoàn chỉnh. Dùng output của bước trước làm context cho bước sau.

### Tùy biến theo ngành

Thêm ngữ cảnh ngành vào Prompt để AI hiểu sâu hơn:

```
"Dự án này thuộc lĩnh vực EdTech, đối tượng chính là học sinh cấp 3 
và sinh viên đại học tại Việt Nam. Cần tuân thủ quy định về bảo vệ 
dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP."
```

---

## 📁 Cấu trúc thư mục đề xuất cho tài liệu dự án

```
docs/
├── 01-prd/
│   ├── problem-statement.md
│   ├── personas.md
│   └── okrs-and-kpis.md
├── 02-product-overview/
│   ├── value-proposition.md
│   ├── competitive-analysis.md
│   └── roadmap.md
├── 03-trd/
│   ├── tech-stack.md
│   ├── api-overview.md
│   └── security-standards.md
├── 04-app-flow/
│   ├── data-flow-diagram.md
│   ├── state-machine.md
│   └── exception-handling.md
├── 05-ui-ux/
│   ├── wireframes/
│   ├── mockups/
│   └── design-system.md
├── 06-backend/
│   ├── erd.md
│   ├── database-schema.md
│   └── api-specification.md
└── 07-execution-plan/
    ├── sprint-plan.md
    ├── team-assignment.md
    └── risk-mitigation.md
```

---

## 🤝 Đóng góp

Nếu bạn có ý tưởng cải thiện Framework này, hãy tạo Pull Request hoặc Issue. Mọi đóng góp đều được chào đón!

---

## 📜 Giấy phép

Tài liệu này được phân phối theo giấy phép [MIT](LICENSE). Bạn có thể tự do sử dụng, chỉnh sửa và chia sẻ.

---

<div align="center">

**Được tạo với ❤️ bởi đội ngũ XP English**

*"Plan like a pro. Build like a team. Ship like a machine."*

</div>
