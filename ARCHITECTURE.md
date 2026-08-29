# 🏛️ XP English XP Voca — Kiến Trúc Hệ Thống (Architecture Guide)

> **Kiến trúc**: Feature-Based Modular Architecture kết hợp Next.js 16 App Router  
> **Phiên bản**: 2.0.0 (Post-Refactoring)  
> **Nguyên tắc cốt lõi**: Single Responsibility • Feature Ownership • Clean Separation of Concerns • Zero Dead Code

---

## 1. Tổng Quan Cấu Trúc Thư Mục (Directory Layout)

```text
e:\XP English  XP Voca\
│
├── app/                              # Next.js App Router (Routing, Layouts, API Handlers)
│   ├── (auth)/                       # Auth route group (login, register, forgot-password)
│   ├── (dashboard)/                  # Dashboard & Learning routes (thin orchestrators)
│   │   ├── dashboard/                # Main mission control
│   │   ├── study/                    # Study hubs (listening, shadowing, exam-prep, games...)
│   │   ├── vocabulary/               # Word explorer & detail routes
│   │   ├── analytics/                # Deep metrics & leaderboard
│   │   ├── roadmap/                  # Goal-based study plan
│   │   ├── myvideo/                  # YouTube video dictation & learning
│   │   ├── myvocab/                  # Saved words repository
│   │   ├── review/                   # Spaced repetition SM-2 review
│   │   ├── community/                # Leaderboard & social hub
│   │   ├── profile/                  # User profile & achievements
│   │   ├── shop/                     # Gamified item shop & themes
│   │   └── settings/                 # App settings & preferences
│   ├── api/                          # Backend API route handlers
│   ├── globals.css                   # Core Design System tokens & global styles
│   ├── layout.tsx                    # Root HTML layout & font declarations
│   └── page.tsx                      # Landing page orchestrator
│
├── features/                         # 🌟 BUSINESS FUNCTIONALITY (Feature Ownership)
│   ├── listening/                    # Dictation & Listening Audio Studio
│   │   ├── components/               # StudioWaveformCard, InteractiveTranscriptSidebar, DictationWorkspace...
│   │   ├── data/                     # listeningMockData (100+ lessons with timestamps)
│   │   ├── services/                 # YouTube/SRT/LRC subtitle parsers & extractors
│   │   ├── utils/                    # extendedTranscriptEngine, listeningParser, lessonImageMapper...
│   │   └── index.ts                  # Public feature API barrel
│   ├── shadowing/                    # Shadowing & Speech Recording Studio
│   │   ├── components/               # Shadowing workspace skeletons & controls
│   │   ├── data/                     # extendedShadowingData
│   │   ├── services/                 # webSpeechTranscriber
│   │   └── index.ts
│   ├── vocabulary/                   # Core & Advanced Vocabulary Repositories
│   │   ├── components/               # Vocabulary cards & lists
│   │   ├── data/                     # basicVocabularies, advancedVocabularies, deepDictionary
│   │   └── index.ts
│   ├── exam-prep/                    # Standardized Exam Bank (TOEIC, IELTS)
│   │   ├── data/exam-papers/         # 37 standardized mock exam papers
│   │   ├── utils/                    # examScoringEngine, examGrader
│   │   └── index.ts
│   ├── grammar/                      # AI Grammar Hub & Interactive Exercises
│   │   ├── data/                     # grammarContent
│   │   └── index.ts
│   ├── reading/                      # Academic Reading & Speed Comprehension
│   │   ├── data/                     # readingMockData
│   │   └── index.ts
│   ├── study-rooms/                  # WebRTC Study Rooms & Voice Channels
│   │   ├── components/               # VoiceControlPanel
│   │   ├── hooks/                    # useVoiceChannel
│   │   ├── data/                     # roomQuizBank
│   │   └── index.ts
│   ├── gamification/                 # Quests, Streaks, Levels & Games
│   │   ├── components/               # SpeedMatchGame, AchievementCard, StreakCounter...
│   │   └── index.ts
│   ├── community/                    # Posts, Groups & Friends
│   │   └── components/               # PostCard, GroupCard, FriendList...
│   ├── ai-tutor/                     # 1-on-1 AI Tutor & Pronunciation Coach
│   │   └── components/               # ChatInterface, MessageBubble...
│   ├── video/                        # Video Learning Studio
│   └── pvp/                          # Realtime 1v1 PvP Arena
│
├── shared/                           # 🌐 TRULY SHARED CODE (Cross-Feature Reusables)
│   ├── components/
│   │   ├── ui/                       # Button, Badge, Card, DoubleBezelCard, Toast, TTSSettingsModal...
│   │   ├── layout/                   # Sidebar, Navbar, BottomNav, Footer, RightSidebar
│   │   ├── feedback/                 # UserAvatar, SkeletonLoaders, ErrorBoundary, PageEntranceAnimation...
│   │   └── providers/                # ClientClerkWrapper, Context Providers
│   ├── utils/                        # formatDate, formatName, calculateXP, xp, sm2, ttsEngine, cn...
│   ├── constants/                    # Level titles, XP thresholds, Mock themes
│   └── types/                        # User, Vocabulary, LearnedVocabulary, Achievement, API types
│
├── infrastructure/                   # 🔌 EXTERNAL SYSTEMS & HARDWARE INTEGRATION
│   ├── api/                          # API HTTP client & endpoints
│   ├── auth/                         # JWT signing/verification, password hashing, getCurrentUser
│   ├── database/                     # Prisma ORM client & Supabase storage client
│   ├── security/                     # Rate limiting & payload sanitization / validation
│   └── webrtc/                       # WebRTC mesh / peer connection manager
│
├── stores/                           # 🧠 GLOBAL STATE (Zustand Stores)
│   ├── userStore.ts                  # User profile, XP, streak, practice time
│   ├── authStore.ts                  # Authentication session state
│   ├── uiStore.ts                    # Sidebar collapse, drawer & modal state
│   ├── listeningStore.ts             # Audio player playback & current lesson
│   ├── vocabularyStore.ts            # Saved vocabularies & SM-2 review queue
│   ├── skillChartStore.ts            # 7-day per-skill analytics engine
│   ├── studyPlanStore.ts             # Roadmap & target exam study tasks
│   ├── notificationStore.ts          # Toast message queue
│   ├── notificationCenterStore.ts    # Bell notifications history
│   ├── dailyChallengeStore.ts        # Daily quests progress
│   └── videoStore.ts                 # YouTube video study sessions
│
├── prisma/                           # PostgreSQL Schema & Seed Data
│   ├── schema.prisma                 # Database schema
│   └── seed.ts                       # Seeding script
│
├── __tests__/                        # 🧪 UNIT TESTS (Vitest)
│   ├── basic_vocabulary.test.ts
│   ├── exam_bank_audit.test.ts
│   ├── myvideo*.test.ts
│   ├── practice.test.ts
│   ├── security.test.ts
│   ├── shop.test.ts
│   ├── sm2.test.ts
│   └── xp.test.ts
│
├── tests/                            # 🎭 E2E TESTS (Playwright)
│   └── voice-channel.spec.ts
│
├── proxy.ts                          # Next.js 16 Proxy / Request Interceptor
└── public/                           # Static assets (mascot, icons, badges)
```

---

## 2. Nguyên Tắc Dependency (Dependency Rule)

```
app (Routes / Pages)
   │
   ▼
features (Business Logic)
   │
   ▼
shared / stores / infrastructure
```

### Quy Tắc Cấm:
1. **Shared KHÔNG ĐƯỢC import từ Features**: Thư mục `shared/` là tầng nền tảng độc lập, không được phụ thuộc vào bất kỳ feature cụ thể nào.
2. **Infrastructure KHÔNG ĐƯỢC chứa UI**: Thư mục `infrastructure/` chỉ xử lý mạng, database, mật mã, WebRTC.
3. **Stores được truy cập xuyên suốt**: Các Zustand store được tổ chức tập trung tại `stores/` để tránh circular dependency khi nhiều feature cùng đọc/ghi trạng thái người dùng.

---

## 3. Hướng Dẫn Thêm Mới (Developer How-To)

### 3.1. Thêm một Feature Mới:
1. Tạo thư mục `features/<feature-name>/`.
2. Tạo các thư mục con tương ứng nếu cần: `components/`, `hooks/`, `services/`, `data/`, `utils/`.
3. Tạo file `features/<feature-name>/index.ts` để expose public API của feature.
4. Tạo route orchestrator mỏng tại `app/(dashboard)/<feature-name>/page.tsx`.

### 3.2. Thêm một Shared Component:
1. Xác định nhóm:
   - UI nguyên tử (Button, Input, Badge...) → `shared/components/ui/`
   - Bố cục khung app (Header, Navigation...) → `shared/components/layout/`
   - Phản hồi / Avatar / Skeleton → `shared/components/feedback/`
2. Export component trong file `index.ts` tương ứng.

### 3.3. Thêm một Database Query / API Client:
1. Client query → `infrastructure/api/client.ts`
2. Server database operation → `infrastructure/database/prisma.ts`
3. API route handler → `app/api/<endpoint>/route.ts`

---

## 4. Bảng Tra Cứu Import Đường Dẫn Chuẩn (Import Aliases)

| Loại Module | Đường Dẫn Import Chuẩn | Ví Dụ |
|:---|:---|:---|
| **Stores** | `@/stores/<storeName>` hoặc `@/stores` | `import { useUserStore } from "@/stores/userStore";` |
| **Shared UI** | `@/shared/components/ui` | `import { Button, Badge } from "@/shared/components/ui";` |
| **Shared Layout** | `@/shared/components/layout` | `import { Sidebar, Navbar } from "@/shared/components/layout";` |
| **Shared Feedback** | `@/shared/components/feedback` | `import { UserAvatar, SkeletonLoader } from "@/shared/components/feedback";` |
| **Shared Utils** | `@/shared/utils/<utilName>` | `import { formatDate } from "@/shared/utils/formatDate";` |
| **Shared Types** | `@/shared/types` | `import { User, Vocabulary } from "@/shared/types";` |
| **Shared Constants** | `@/shared/constants` | `import { LEVEL_TITLES } from "@/shared/constants";` |
| **Infrastructure DB** | `@/infrastructure/database/prisma` | `import { prisma } from "@/infrastructure/database/prisma";` |
| **Infrastructure Auth**| `@/infrastructure/auth/jwt` | `import { signAuthToken } from "@/infrastructure/auth/jwt";` |
| **Features** | `@/features/<featureName>` | `import { MOCK_LESSONS_DATA } from "@/features/listening";` |
