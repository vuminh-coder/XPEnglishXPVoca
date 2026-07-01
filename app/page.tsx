"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  // If authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isLoaded && userId) {
      router.replace("/dashboard");
    }
  }, [isLoaded, userId, router]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main id="app-content" className="main-content no-sidebars">
      <div id="app-view-container">
        <div className="landing-page">
          {/* Landing Header */}
          <header className="landing-navbar" id="landing-nav">
            <div className="navbar-brand">
              <div className="navbar-logo">🦉</div>
              <span
                className="navbar-title"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #4ec5f1)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                XP English
              </span>
            </div>
            <div className="navbar-actions">
              {isLoaded && userId ? (
                <Link href="/dashboard" className="btn btn-primary btn-sm">
                  Vào Dashboard ➔
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn btn-secondary btn-sm">
                    Đăng nhập
                  </Link>
                  <Link href="/register" className="btn btn-primary btn-sm">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-bg-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <span>🔥</span> Nền tảng học từ vựng thế hệ mới
                </div>
                <h1 className="hero-title">
                  Đột phá từ vựng cùng{" "}
                  <span className="highlight">XP English</span>
                </h1>
                <p className="hero-description">
                  Học từ vựng thông minh qua phương pháp lặp lại ngắt quãng
                  (Spaced Repetition), thi đua bảng xếp hạng cộng đồng và rèn
                  luyện hội thoại trực tiếp với AI.
                </p>
                <div className="hero-cta">
                  {isLoaded && userId ? (
                    <Link href="/dashboard" className="btn btn-primary btn-lg">
                      Vào Dashboard Học Ngay ➔
                    </Link>
                  ) : (
                    <Link href="/login" className="btn btn-primary btn-lg">
                      Bắt đầu học miễn phí
                    </Link>
                  )}
                  <button
                    className="btn btn-secondary btn-lg cursor-pointer"
                    onClick={() => scrollToSection("features")}
                  >
                    Khám phá tính năng
                  </button>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat-item">
                    <div className="hero-stat-value">15k+</div>
                    <div className="hero-stat-label">Học viên tích cực</div>
                  </div>
                  <div className="hero-stat-item">
                    <div className="hero-stat-value">5.000+</div>
                    <div className="hero-stat-label">
                      Từ vựng chuẩn IELTS/TOEIC
                    </div>
                  </div>
                  <div className="hero-stat-item">
                    <div className="hero-stat-value">98%</div>
                    <div className="hero-stat-label">Tăng hiệu quả ghi nhớ</div>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-mockup">
                  <div className="hero-card-stack">
                    <div className="hero-vocab-card">
                      <div className="word">Wanderlust</div>
                      <div className="phonetic">/ˈwɒn.dɚ.lʌst/</div>
                      <div className="definition">
                        A strong desire to travel and explore the world
                      </div>
                      <div className="example">
                        &quot;She was filled with wanderlust after seeing photos
                        of Paris.&quot;
                      </div>
                    </div>
                  </div>
                  <div className="hero-floating-elements">
                    <div className="hero-float-badge">🚀 +15 XP</div>
                    <div className="hero-float-badge">🎯 Luyện nói cùng AI</div>
                    <div className="hero-float-badge">🔥 15 Ngày Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features-section">
            <div className="section-header">
              <div className="section-badge">🎯 Tính năng nổi bật</div>
              <h2 className="section-title">
                Tại sao chọn XP English / XP Voca?
              </h2>
              <p className="section-desc">
                Chúng tôi mang lại giải pháp toàn diện giúp việc tích lũy từ
                vựng trở nên hào hứng và hiệu quả hơn bao giờ hết.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3 className="feature-title">Học thông minh</h3>
                <p className="feature-desc">
                  Thuật toán lặp lại ngắt quãng (Spaced Repetition) tự động tính
                  toán thời gian vàng để gợi ý ôn tập, ghi nhớ lâu dài.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3 className="feature-title">Đồng đội chiến</h3>
                <p className="feature-desc">
                  Học tập không cô đơn! Tham gia các nhóm học tập, chia sẻ từ
                  vựng và cùng nhau leo hạng trên bảng xếp hạng vinh danh.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3 className="feature-title">Giao tiếp AI</h3>
                <p className="feature-desc">
                  Luyện phát âm và áp dụng từ vựng trực tiếp vào các cuộc hội
                  thoại mô phỏng thực tế với người bạn AI của riêng bạn.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="testimonials-section">
            <div className="section-header">
              <div className="section-badge">💬 Đánh giá</div>
              <h2 className="section-title">Cảm nhận học viên</h2>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  &quot;Nhờ phương pháp ôn tập của XP Voca, mình đã vượt qua kỳ
                  thi IELTS với điểm từ vựng tuyệt đối. Bảng xếp hạng tạo động
                  lực rất lớn.&quot;
                </p>
                <div className="testimonial-author">
                  <div className="avatar avatar-sm">👤</div>
                  <div>
                    <div className="testimonial-author-name">Hoàng Anh</div>
                    <div className="testimonial-author-role">
                      IELTS 7.5 Candidate
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  &quot;Giao diện tối giản, trực quan cực kỳ. Các bài trắc
                  nghiệm nhanh giúp mình học từ vựng công nghệ mới siêu
                  tốc!&quot;
                </p>
                <div className="testimonial-author">
                  <div className="avatar avatar-sm">👤</div>
                  <div>
                    <div className="testimonial-author-name">Minh Đức</div>
                    <div className="testimonial-author-role">
                      Software Developer
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  &quot;Robot AI rất thông minh, sửa lỗi ngữ pháp và phát âm của
                  tôi vô cùng chu đáo. Việc học thực sự rất vui vẻ!&quot;
                </p>
                <div className="testimonial-author">
                  <div className="avatar avatar-sm">👤</div>
                  <div>
                    <div className="testimonial-author-name">Minh Thư</div>
                    <div className="testimonial-author-role">
                      English Teacher
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="landing-footer">
            <div className="footer-content">
              <div>
                <div className="navbar-brand">
                  <div className="navbar-logo">🦉</div>
                  <span className="navbar-title">XP English</span>
                </div>
                <p className="footer-brand-desc">
                  Nền tảng học từ vựng tiếng Anh cộng đồng hàng đầu. Học kết hợp
                  giải trí, động lực vượt bậc.
                </p>
              </div>
              <div>
                <h4 className="footer-title">Khám phá</h4>
                <div className="footer-links">
                  <a href="#">Bộ từ vựng</a>
                  <a href="#">Trắc nghiệm</a>
                  <a href="#">Hội thoại AI</a>
                </div>
              </div>
              <div>
                <h4 className="footer-title">Cộng đồng</h4>
                <div className="footer-links">
                  <a href="#">Bảng xếp hạng</a>
                  <a href="#">Diễn đàn học tập</a>
                  <a href="#">Nhóm học tập</a>
                </div>
              </div>
              <div>
                <h4 className="footer-title">Liên hệ</h4>
                <div className="footer-links">
                  <a>support@xpenglish.com</a>
                  <a>Hà Nội, Việt Nam</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 XP English / XP Voca. All rights reserved.</span>
              <span>Thiết kế bởi Google DeepMind Agent</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
