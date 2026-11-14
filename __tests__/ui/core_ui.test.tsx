// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

const { mockPathname, mockSearchParams } = vi.hoisted(() => ({
  mockPathname: vi.fn(() => "/dashboard"),
  mockSearchParams: vi.fn(() => new URLSearchParams("")),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    prefetch,
    ...rest
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
    prefetch?: boolean;
    [key: string]: unknown;
  }) => {
    void prefetch;
    const resolved = typeof href === "string" ? href : href?.pathname || "/";
    return (
      <a href={resolved} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  },
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...rest
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
  useSearchParams: () => mockSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("framer-motion", () => {
  const MOTION_KEYS = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "whileTap",
    "whileHover",
    "layoutId",
    "layout",
    "variants",
    "viewport",
    "whileInView",
  ]);
  const stripMotionProps = (props: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(props).filter(([key]) => !MOTION_KEYS.has(key)));
  const motionCache = new Map<string, React.ComponentType<Record<string, unknown>>>();
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        if (!motionCache.has(tag)) {
          const MotionComp = React.forwardRef<
            HTMLElement,
            Record<string, unknown> & { children?: React.ReactNode }
          >(function MockMotionElement({ children, ...props }, ref) {
            return React.createElement(
              tag,
              { ...stripMotionProps(props), ref },
              children as React.ReactNode
            );
          });
          MotionComp.displayName = `MockMotion(${tag})`;
          motionCache.set(tag, MotionComp);
        }
        return motionCache.get(tag)!;
      },
    }
  );
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("@/shared/utils/prefetchEngine", () => ({
  prefetchRouteData: vi.fn(),
}));

import NotFoundPage from "@/app/not-found";
import { Button } from "@/shared/components/ui/Button";
import BottomNav from "@/shared/components/layout/BottomNav";
import Sidebar from "@/shared/components/layout/Sidebar";
import SettingsPage from "@/app/(dashboard)/settings/page";
import { useUserStore } from "@/stores/userStore";
import { useUiStore } from "@/stores/uiStore";

describe("Core UI Components & Navigation (DOM)", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    const storageMock: Storage = {
      get length() {
        return store.size;
      },
      clear: () => store.clear(),
      getItem: (key: string) => store.get(key) ?? null,
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      removeItem: (key: string) => {
        store.delete(key);
      },
      setItem: (key: string, value: string) => {
        store.set(key, String(value));
      },
    };
    Object.defineProperty(window, "localStorage", { writable: true, value: storageMock });
    Object.defineProperty(globalThis, "localStorage", { writable: true, value: storageMock });

    mockPathname.mockReturnValue("/dashboard");
    mockSearchParams.mockReturnValue(new URLSearchParams(""));
    document.documentElement.removeAttribute("data-theme");
    useUiStore.setState({
      theme: "light",
      sidebarOpen: false,
      sidebarCollapsed: false,
      hideBottomNav: false,
    });
    useUserStore.setState({
      user: {
        id: "user_ui_1",
        username: "learner01",
        email: "learner01@xpenglish.vn",
        fullName: "Nguyễn Minh Anh",
        role: "USER",
        xp: 120,
        level: 2,
        streak: 3,
        coins: 50,
        avatarEmoji: "🦊",
      } as never,
    });

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders branded NotFoundPage (404) with Royal Blue CTA linking to /dashboard", () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/Lỗi 404/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Không tìm thấy trang này/i })).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /Về Bảng Điều Khiển/i });
    expect(homeLink).toHaveAttribute("href", "/dashboard");
    expect(homeLink.className).toContain("bg-[#0059bb]");

    const dictationLink = screen.getByRole("link", { name: /Luyện Nghe Dictation/i });
    expect(dictationLink).toHaveAttribute("href", "/study/dictation");
  });

  it("Button uses rounded-xl, Royal Blue focus ring, disables during isLoading, and fires onClick when ready", () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Xác nhận</Button>);

    const btn = screen.getByRole("button", { name: /Xác nhận/i });
    expect(btn.className).toContain("rounded-xl");
    expect(btn.className).toContain("focus-visible:ring-[#0059bb]");
    expect(btn).not.toBeDisabled();

    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <Button isLoading onClick={onClick}>
        Đang xử lý
      </Button>
    );
    expect(screen.getByRole("button", { name: /Đang xử lý/i })).toBeDisabled();
  });

  it("BottomNav removes fake Cộng đồng badge and hides cleanly on studio lesson query routes", async () => {
    mockPathname.mockReturnValue("/dashboard");
    render(<BottomNav />);

    expect(screen.getByRole("navigation", { name: /Mobile navigation/i })).toBeInTheDocument();
    const communityLink = screen.getByRole("link", { name: "Cộng đồng" });
    expect(communityLink).toHaveAttribute("href", "/community");
    expect(communityLink.textContent).toBe("");

    cleanup();
    mockPathname.mockReturnValue("/study/dictation");
    mockSearchParams.mockReturnValue(new URLSearchParams("id=lesson-1"));
    render(<BottomNav />);

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: /Mobile navigation/i })).not.toBeInTheDocument();
    });
  });

  it("Sidebar shows 'Hội thoại AI' for /ai/conversation and strictly enforces RBAC for /admin while surfacing /onboarding", async () => {
    render(<Sidebar />);

    await waitFor(() => {
      expect(screen.getByText("Hội thoại AI")).toBeInTheDocument();
    });
    expect(screen.queryByText("Luyện viết")).not.toBeInTheDocument();

    const userCard = screen.getByRole("button", { name: /Nguyễn Minh Anh/i });
    fireEvent.click(userCard);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Kiểm tra trình độ/i })).toHaveAttribute(
        "href",
        "/onboarding"
      );
    });
    expect(screen.queryByRole("link", { name: /Quản trị Admin/i })).not.toBeInTheDocument();

    cleanup();
    useUserStore.setState({
      user: {
        id: "admin_ui_1",
        username: "admin01",
        email: "admin@xpenglish.vn",
        fullName: "Quản trị viên",
        role: "ADMIN",
        xp: 900,
        level: 5,
        streak: 10,
        coins: 500,
      } as never,
    });

    render(<Sidebar />);
    const adminCard = await screen.findByRole("button", { name: /Quản trị viên/i });
    fireEvent.click(adminCard);

    const adminLink = await screen.findByRole("link", { name: /Quản trị Admin/i });
    expect(adminLink).toHaveAttribute("href", "/admin");
    expect(screen.getByRole("link", { name: /Kiểm tra trình độ/i })).toHaveAttribute(
      "href",
      "/onboarding"
    );
  });

  it("SettingsPage toggles global dark theme in useUiStore and links back to /onboarding", async () => {
    render(<SettingsPage />);

    const onboardingLink = await screen.findByRole("link", {
      name: /Làm lại bài kiểm tra trình độ/i,
    });
    expect(onboardingLink).toHaveAttribute("href", "/onboarding");

    const toggleDarkBtn = screen.getByRole("button", { name: "Toggle Dark Mode" });
    fireEvent.click(toggleDarkBtn);

    expect(useUiStore.getState().theme).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
