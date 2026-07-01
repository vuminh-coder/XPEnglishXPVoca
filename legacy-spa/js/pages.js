// ============================================================
// XP VOCA - Pages Module
// Defines rendering functions for all main views:
// Landing, Auth, Dashboard, Vocab, MyVocab, Practice, Community, Review, AI, Profile, Admin
// ============================================================

const Pages = {
  // ==========================================================
  // 1. LANDING PAGE
  // ==========================================================
  renderLanding(container) {
    document.body.classList.add('no-navigation');
    const header = document.getElementById('app-header');
    const sidebar = document.getElementById('app-sidebar');
    const rightBar = document.getElementById('app-right-sidebar');
    if (header) header.classList.add('hidden');
    if (sidebar) sidebar.classList.add('hidden');
    if (rightBar) rightBar.classList.add('hidden');
    
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content no-sidebars';

    container.innerHTML = `
      <div class="landing-page">
        <!-- Landing Header -->
        <header class="landing-navbar" id="landing-nav">
          <div class="navbar-brand">
            <div class="navbar-logo">🦉</div>
            <span class="navbar-title" style="background: linear-gradient(135deg, #ffffff, #4ec5f1); -webkit-background-clip: text; background-clip: text;">XP English</span>
          </div>
          <div class="navbar-actions">
            <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('auth')">Đăng nhập</button>
            <button class="btn btn-primary btn-sm" onclick="app.navigateTo('auth')">Đăng ký</button>
          </div>
        </header>

        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-bg-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
          </div>
          <div class="hero-content">
            <div class="hero-text">
              <div class="hero-badge">
                <span>🔥</span> Nền tảng học từ vựng thế hệ mới
              </div>
              <h1 class="hero-title">Đột phá từ vựng cùng <span class="highlight">XP English</span></h1>
              <p class="hero-description">
                Học từ vựng thông minh qua phương pháp lặp lại ngắt quãng (Spaced Repetition), thi đua bảng xếp hạng cộng đồng và rèn luyện hội thoại trực tiếp với AI.
              </p>
              <div class="hero-cta">
                <button class="btn btn-primary btn-lg" onclick="app.navigateTo('auth')">Bắt đầu học miễn phí</button>
                <button class="btn btn-secondary btn-lg" onclick="app.scrollToSection('features')">Khám phá tính năng</button>
              </div>
              <div class="hero-stats">
                <div class="hero-stat-item">
                  <div class="hero-stat-value">15k+</div>
                  <div class="hero-stat-label">Học viên tích cực</div>
                </div>
                <div class="hero-stat-item">
                  <div class="hero-stat-value">5.000+</div>
                  <div class="hero-stat-label">Từ vựng chuẩn IELTS/TOEIC</div>
                </div>
                <div class="hero-stat-item">
                  <div class="hero-stat-value">98%</div>
                  <div class="hero-stat-label">Tăng hiệu quả ghi nhớ</div>
                </div>
              </div>
            </div>
            
            <div class="hero-visual">
              <div class="hero-mockup">
                <div class="hero-card-stack">
                  <div class="hero-vocab-card">
                    <div class="word">Wanderlust</div>
                    <div class="phonetic">/ˈwɒn.dɚ.lʌst/</div>
                    <div class="definition">A strong desire to travel and explore the world</div>
                    <div class="example">"She was filled with wanderlust after seeing photos of Paris."</div>
                  </div>
                </div>
                <div class="hero-floating-elements">
                  <div class="hero-float-badge">🚀 +15 XP</div>
                  <div class="hero-float-badge">🎯 Luyện nói cùng AI</div>
                  <div class="hero-float-badge">🔥 15 Ngày Streak</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="features-section">
          <div class="section-header">
            <div class="section-badge">🎯 Tính năng nổi bật</div>
            <h2 class="section-title">Tại sao chọn XP English / XP Voca?</h2>
            <p class="section-desc">Chúng tôi mang lại giải pháp toàn diện giúp việc tích lũy từ vựng trở nên hào hứng và hiệu quả hơn bao giờ hết.</p>
          </div>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🧠</div>
              <h3 class="feature-title">Học thông minh</h3>
              <p class="feature-desc">Thuật toán lặp lại ngắt quãng (Spaced Repetition) tự động tính toán thời gian vàng để gợi ý ôn tập, ghi nhớ lâu dài.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">👥</div>
              <h3 class="feature-title">Đồng đội chiến</h3>
              <p class="feature-desc">Học tập không cô đơn! Tham gia các nhóm học tập, chia sẻ từ vựng và cùng nhau leo hạng trên bảng xếp hạng vinh danh.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🤖</div>
              <h3 class="feature-title">Giao tiếp AI</h3>
              <p class="feature-desc">Luyện phát âm và áp dụng từ vựng trực tiếp vào các cuộc hội thoại mô phỏng thực tế với người bạn AI của riêng bạn.</p>
            </div>
          </div>
        </section>

        <!-- Testimonials -->
        <section class="testimonials-section">
          <div class="section-header">
            <div class="section-badge">💬 Đánh giá</div>
            <h2 class="section-title">Cảm nhận học viên</h2>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p class="testimonial-text">"Nhờ phương pháp ôn tập của XP Voca, mình đã vượt qua kỳ thi IELTS với điểm từ vựng tuyệt đối. Bảng xếp hạng tạo động lực rất lớn."</p>
              <div class="testimonial-author">
                <div class="avatar avatar-sm">👤</div>
                <div>
                  <div class="testimonial-author-name">Hoàng Anh</div>
                  <div class="testimonial-author-role">IELTS 7.5 Candidate</div>
                </div>
              </div>
            </div>
            <div class="testimonial-card">
              <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p class="testimonial-text">"Giao diện tối giản, trực quan cực kỳ. Các bài trắc nghiệm nhanh giúp mình học từ vựng công nghệ mới siêu tốc!"</p>
              <div class="testimonial-author">
                <div class="avatar avatar-sm">👤</div>
                <div>
                  <div class="testimonial-author-name">Minh Đức</div>
                  <div class="testimonial-author-role">Software Developer</div>
                </div>
              </div>
            </div>
            <div class="testimonial-card">
              <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p class="testimonial-text">"Robot AI rất thông minh, sửa lỗi ngữ pháp và phát âm của tôi vô cùng chu đáo. Việc học thực sự rất vui vẻ!"</p>
              <div class="testimonial-author">
                <div class="avatar avatar-sm">👤</div>
                <div>
                  <div class="testimonial-author-name">Minh Thư</div>
                  <div class="testimonial-author-role">English Teacher</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="landing-footer">
          <div class="footer-content">
            <div>
              <div class="navbar-brand">
                <div class="navbar-logo">🦉</div>
                <span class="navbar-title">XP English</span>
              </div>
              <p class="footer-brand-desc">Nền tảng học từ vựng tiếng Anh cộng đồng hàng đầu. Học kết hợp giải trí, động lực vượt bậc.</p>
            </div>
            <div>
              <h4 class="footer-title">Khám phá</h4>
              <div class="footer-links">
                <a href="#vocabulary">Bộ từ vựng</a>
                <a href="#practice">Trắc nghiệm</a>
                <a href="#aichat">Hội thoại AI</a>
              </div>
            </div>
            <div>
              <h4 class="footer-title">Cộng đồng</h4>
              <div class="footer-links">
                <a href="#community">Bảng xếp hạng</a>
                <a href="#community">Diễn đàn học tập</a>
                <a href="#community">Nhóm học tập</a>
              </div>
            </div>
            <div>
              <h4 class="footer-title">Liên hệ</h4>
              <div class="footer-links">
                <a>support@xpenglish.com</a>
                <a>Hà Nội, Việt Nam</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 XP English / XP Voca. All rights reserved.</span>
            <span>Thiết kế bởi Google DeepMind Agent</span>
          </div>
        </footer>
      </div>
    `;

    // Listen to scroll to add background to landing navbar
    window.onscroll = () => {
      const nav = document.getElementById('landing-nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    };
  },

  // ==========================================================
  // 2. AUTHENTICATION PAGE
  // ==========================================================
  renderAuth(container) {
    document.body.classList.add('no-navigation');
    const header = document.getElementById('app-header');
    const sidebar = document.getElementById('app-sidebar');
    const rightBar = document.getElementById('app-right-sidebar');
    if (header) header.classList.add('hidden');
    if (sidebar) sidebar.classList.add('hidden');
    if (rightBar) rightBar.classList.add('hidden');
    
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content no-sidebars';

    container.innerHTML = `
      <div class="auth-page">
        <div class="auth-visual">
          <div class="auth-visual-content">
            <div class="auth-visual-icon">🦉</div>
            <h2>Chào mừng đến với XP English</h2>
            <p>Khám phá thế giới từ vựng đầy sắc màu, nâng cao điểm số và giao tiếp trôi chảy tự tin.</p>
          </div>
        </div>
        
        <div class="auth-form-section">
          <div class="auth-form-container">
            <div class="auth-form-header">
              <h1 class="auth-form-title">Đăng nhập</h1>
              <p class="auth-form-subtitle">Học tập và thăng tiến cùng cộng đồng</p>
            </div>
            
            <form class="auth-form" onsubmit="Pages.handleAuthSubmit(event)">
              <div class="input-group">
                <label for="auth-email">Email</label>
                <input class="input-field" type="email" id="auth-email" value="vuanhtuanfc@gmail.com" required placeholder="nhap@email.com">
              </div>
              <div class="input-group">
                <label for="auth-password">Mật khẩu</label>
                <input class="input-field" type="password" id="auth-password" value="12345678" required placeholder="Mật khẩu của bạn">
              </div>
              
              <button class="btn btn-primary w-full btn-lg" type="submit">Đăng nhập</button>
            </form>

            <div class="auth-demo-btn">
              <button class="btn btn-secondary w-full" onclick="Pages.handleDemoLogin()">🔍 Trải nghiệm nhanh (Tài khoản demo)</button>
            </div>

            <div class="auth-divider mt-6 mb-6">hoặc đăng nhập với</div>

            <div class="social-login">
              <button class="social-login-btn">
                <span>Google</span>
              </button>
              <button class="social-login-btn">
                <span>Facebook</span>
              </button>
            </div>

            <div class="auth-form-footer">
              Bạn chưa có tài khoản? <a href="javascript:void(0)" onclick="Components.showToast('Thông báo', 'Hệ thống đăng ký đang bảo trì. Vui lòng sử dụng tài khoản demo để trải nghiệm!')">Đăng ký ngay</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  handleAuthSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('auth-email').value;
    const users = store.getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
      store.setCurrentUser(user.id);
      Components.showToast('Thành công', `Chào mừng ${user.fullName} quay trở lại!`);
      app.navigateTo('dashboard');
    } else {
      Components.showToast('Lỗi đăng nhập', 'Tài khoản không tồn tại. Vui lòng sử dụng tài khoản Demo!', 'error');
    }
  },

  handleDemoLogin() {
    store.setCurrentUser('u1'); // Aministrator
    Components.showToast('Đăng nhập thành công', 'Chào mừng Admin Vũ Văn Minh!');
    app.navigateTo('dashboard');
  },

  // ==========================================================
  // 3. DASHBOARD PAGE
  // ==========================================================
  renderDashboard(container) {
    const user = store.getCurrentUser();
    if (!user) {
      app.navigateTo('auth');
      return;
    }

    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content';

    const learned = store.getLearnedByCurrentUser();
    const totalWords = store.getVocabularies().length;
    const progressPercent = Math.round((learned.length / totalWords) * 100);

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Trang chủ học tập</h1>
        <p class="page-subtitle">Nơi theo dõi tiến độ, hoàn thành thử thách hàng ngày và cải thiện kỹ năng tiếng Anh.</p>
      </div>

      <div class="dashboard-welcome animate-scale-in">
        <div class="welcome-text">
          <h2>Chào mừng quay lại, ${user.fullName}! 👋</h2>
          <p>Hôm nay là một ngày tuyệt vời để tích lũy thêm từ vựng mới.</p>
        </div>
        <div class="welcome-streak tooltip" data-tooltip="Giữ thói quen học tập hàng ngày để tích lũy streak!">
          <span class="streak-fire">🔥</span>
          <div>
            <div class="streak-count">${user.currentStreak} Ngày</div>
            <div class="streak-label">Streak hiện tại</div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid animate-fade-in-up stagger-1">
        <div class="stat-card">
          <div class="stat-icon blue">📘</div>
          <div class="stat-value">${learned.length}/${totalWords}</div>
          <div class="stat-label">Từ đã học</div>
          <div class="progress progress-sm mt-4">
            <div class="progress-bar animate-pulse" style="width: ${progressPercent}%"></div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">⚡</div>
          <div class="stat-value">${user.totalXp}</div>
          <div class="stat-label">Tổng kinh nghiệm (XP)</div>
          <div class="stat-change positive">Lvl ${user.level}</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">🕒</div>
          <div class="stat-value">${user.minutesStudied}m</div>
          <div class="stat-label">Thời gian đã học</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">🏆</div>
          <div class="stat-value">${store.getUnlockedAchievements().length}</div>
          <div class="stat-label">Huy hiệu đạt được</div>
        </div>
      </div>

      <div class="grid grid-2 gap-6 animate-fade-in-up stagger-2">
        <!-- Daily Goals -->
        <div class="daily-goals-section">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Thử thách hôm nay</h3>
              <span class="badge badge-primary">Hàng ngày</span>
            </div>
            
            <div class="daily-goals-list">
              ${MOCK_DATA.dailyChallenges.map(dc => {
                let progress = 0;
                let isCompleted = false;
                
                if (dc.type === 'learn') {
                  progress = learned.filter(l => {
                    const parsedDate = new Date(l.lastPracticed);
                    return parsedDate.toDateString() === new Date().toDateString();
                  }).length;
                } else if (dc.type === 'quiz') {
                  progress = 2; // Simulated quiz completions
                } else if (dc.type === 'review') {
                  progress = 12; // Simulated review progress
                } else if (dc.type === 'social') {
                  progress = 1;
                }
                
                isCompleted = progress >= dc.requiredCount;
                const pPercent = Math.min(100, Math.round((progress / dc.requiredCount) * 100));

                return `
                  <div class="daily-goal-item">
                    <span class="text-2xl">${dc.icon}</span>
                    <div class="daily-goal-info">
                      <div class="daily-goal-name">${dc.title}</div>
                      <div class="progress progress-sm mb-2">
                        <div class="progress-bar ${isCompleted ? 'progress-success' : ''}" style="width: ${pPercent}%"></div>
                      </div>
                      <div class="daily-goal-progress-text">${progress}/${dc.requiredCount} hoàn thành (+${dc.xpReward} XP)</div>
                    </div>
                    <div class="daily-goal-check ${isCompleted ? 'completed' : 'pending'}">
                      <span>${isCompleted ? '✓' : '⚡'}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div>
          <h3 class="font-bold mb-4">Lối tắt học tập</h3>
          <div class="quick-actions">
            <div class="quick-action-card" onclick="app.navigateTo('practice')">
              <div class="quick-action-icon" style="background: rgba(78, 197, 241, 0.1); color: var(--primary-500)">✍️</div>
              <div>
                <h4 class="quick-action-title">Luyện tập từ vựng</h4>
                <p class="quick-action-desc">Flashcard, trắc nghiệm và điền từ nhanh chóng.</p>
              </div>
            </div>
            <div class="quick-action-card" onclick="app.navigateTo('aichat')">
              <div class="quick-action-icon" style="background: rgba(76, 175, 80, 0.1); color: var(--success-500)">🤖</div>
              <div>
                <h4 class="quick-action-title">Giao tiếp AI</h4>
                <p class="quick-action-desc">Luyện nói tiếng Anh trực tiếp qua hội thoại.</p>
              </div>
            </div>
            <div class="quick-action-card" onclick="app.navigateTo('vocabulary')">
              <div class="quick-action-icon" style="background: rgba(255, 152, 0, 0.1); color: var(--secondary-500)">🌍</div>
              <div>
                <h4 class="quick-action-title">Khám phá từ mới</h4>
                <p class="quick-action-desc">Xem toàn bộ 12 chủ đề từ vựng đa dạng.</p>
              </div>
            </div>
            <div class="quick-action-card" onclick="app.navigateTo('community')">
              <div class="quick-action-icon" style="background: rgba(156, 39, 176, 0.1); color: #9c27b0">👥</div>
              <div>
                <h4 class="quick-action-title">Cộng đồng</h4>
                <p class="quick-action-desc">Thi đua bảng xếp hạng và trò chuyện học thuật.</p>
              </div>
            </div>
          </div>

          <!-- Quick statistics tip -->
          <div class="card card-gradient mt-4">
            <div class="flex items-center gap-3">
              <span class="text-3xl">💡</span>
              <div>
                <h4 class="font-bold">Mẹo học từ vựng hiệu quả</h4>
                <p class="text-sm text-muted mt-1">Ôn tập từ vựng lại sau 24h và 3 ngày giúp tăng 80% khả năng ghi nhớ dài hạn.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================================
  // 4. VOCABULARY EXPLORER
  // ==========================================================
  renderVocabulary(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content';

    const themes = MOCK_DATA.themes;
    
    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Khám phá bộ từ vựng</h1>
        <p class="page-subtitle">Chọn một chủ đề bất kỳ để bắt đầu hành trình chinh phục từ vựng mới.</p>
      </div>

      <!-- Search bar -->
      <div class="vocab-search-bar animate-scale-in">
        <div class="input-with-icon">
          <span class="input-icon">🔍</span>
          <input type="text" class="input-field" id="vocab-search-input" placeholder="Tìm kiếm từ vựng hoặc chủ đề..." oninput="Pages.handleVocabSearch()">
        </div>
      </div>

      <!-- Themes Grid -->
      <div class="themes-grid animate-fade-in-up" id="themes-grid-container">
        ${themes.map(t => {
          const learnedInTheme = store.getLearnedByCurrentUser().filter(l => {
            const vocab = store.getVocabularies().find(v => v.id === l.vocabId);
            return vocab && vocab.themeId === t.id;
          }).length;
          const percentage = Math.round((learnedInTheme / t.totalVocabs) * 100) || 0;

          return `
            <div class="theme-card animate-scale-in" onclick="Pages.showThemeVocabs('${t.id}')">
              <div class="theme-icon">${t.icon}</div>
              <h3 class="theme-name">${t.name}</h3>
              <p class="theme-count">${t.nameEn} • ${t.totalVocabs} từ</p>
              <div class="theme-difficulty">
                ${Array(5).fill(0).map((_, i) => `
                  <div class="dot ${i < t.difficulty ? 'active' : ''}"></div>
                `).join('')}
              </div>
              <div class="theme-progress">
                <div class="flex justify-between text-xs text-muted mb-1">
                  <span>Hoàn thành</span>
                  <span>${percentage}%</span>
                </div>
                <div class="progress progress-sm">
                  <div class="progress-bar" style="width: ${percentage}%"></div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Hidden Section for Word Lists -->
      <div id="theme-words-section" class="hidden animate-fade-in-up">
        <div class="flex items-center gap-4 mb-6">
          <button class="btn btn-secondary btn-icon btn-sm" onclick="Pages.backToThemes()">
            <span>←</span>
          </button>
          <div>
            <h2 id="theme-detail-title" class="font-bold">Tên chủ đề</h2>
            <p id="theme-detail-desc" class="text-sm text-muted">Mô tả chi tiết bộ từ vựng</p>
          </div>
        </div>
        
        <div class="vocab-list" id="theme-words-container"></div>
      </div>
    `;
  },

  handleVocabSearch() {
    const query = document.getElementById('vocab-search-input').value.toLowerCase();
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach((card, index) => {
      const theme = MOCK_DATA.themes[index];
      const match = theme.name.toLowerCase().includes(query) || theme.nameEn.toLowerCase().includes(query);
      if (match) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  },

  showThemeVocabs(themeId) {
    const theme = MOCK_DATA.themes.find(t => t.id === themeId);
    if (!theme) return;

    document.getElementById('themes-grid-container').style.display = 'none';
    const wordsSection = document.getElementById('theme-words-section');
    wordsSection.classList.remove('hidden');

    document.getElementById('theme-detail-title').innerText = theme.name;
    document.getElementById('theme-detail-desc').innerText = `${theme.nameEn} • Cấp độ khó: ${theme.difficulty}/5`;

    const vocabs = store.getVocabularies().filter(v => v.themeId === themeId);
    const container = document.getElementById('theme-words-container');

    if (vocabs.length === 0) {
      container.innerHTML = `<div class="empty-state w-full">Chưa có từ vựng trong chủ đề này.</div>`;
      return;
    }

    container.innerHTML = vocabs.map(v => {
      const state = store.getWordLearningState(v.id);
      const isFav = state ? state.isFavorite : false;
      const prof = state ? state.proficiency : 0;

      return `
        <div class="vocab-card animate-scale-in">
          <div class="vocab-card-header">
            <div>
              <span class="vocab-word">${v.word}</span>
              <span class="vocab-pos">${v.pos}</span>
              <div class="vocab-phonetic">${v.phonetic}</div>
            </div>
            <button class="btn-icon btn-ghost btn-sm" onclick="Pages.toggleFavorite(event, '${v.id}', this)" title="Yêu thích">
              <span class="fav-icon">${isFav ? '❤️' : '🤍'}</span>
            </button>
          </div>
          <div class="vocab-definition-vn">${v.definitionVn}</div>
          <div class="vocab-definition text-xs text-muted">${v.definition}</div>
          <div class="vocab-example">
            ${v.examples[0] || ''}
          </div>
          <div class="vocab-card-footer">
            <div class="vocab-proficiency">
              ${Array(5).fill(0).map((_, i) => `
                <div class="level-dot ${i < prof ? 'filled' : ''}"></div>
              `).join('')}
            </div>
            <div class="vocab-actions">
              <button class="btn btn-secondary btn-sm" onclick="Pages.pronounceWord('${v.word}')">🔊 Nghe</button>
              <button class="btn btn-primary btn-sm" onclick="Pages.quickPracticeWord('${v.id}')">⚡ Luyện</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  backToThemes() {
    document.getElementById('themes-grid-container').style.display = 'grid';
    document.getElementById('theme-words-section').classList.add('hidden');
  },

  toggleFavorite(event, vocabId, btnElement) {
    event.stopPropagation();
    const isFav = store.toggleFavorite(vocabId);
    const icon = btnElement.querySelector('.fav-icon');
    icon.innerText = isFav ? '❤️' : '🤍';
    Components.showToast('Yêu thích', isFav ? 'Đã thêm từ vào danh mục yêu thích' : 'Đã bỏ từ khỏi danh mục yêu thích');
  },

  pronounceWord(word) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      Components.showToast('Lỗi phát âm', 'Trình duyệt của bạn không hỗ trợ tính năng này', 'error');
    }
  },

  quickPracticeWord(vocabId) {
    // Navigate to practice page directly with pre-selected word
    localStorage.setItem('xp_voca_practice_word_id', vocabId);
    app.navigateTo('practice');
  },

  // ==========================================================
  // 5. MY VOCABULARY
  // ==========================================================
  renderMyVocab(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content';

    const learned = store.getLearnedByCurrentUser();
    const vocabularies = store.getVocabularies();

    const favoriteWords = learned.filter(l => l.isFavorite);
    const masteredWords = learned.filter(l => l.proficiency === 5);
    const learningWords = learned.filter(l => l.proficiency > 0 && l.proficiency < 5);

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Bộ từ vựng của tôi</h1>
        <p class="page-subtitle">Theo dõi các từ vựng bạn đã lưu, đã học và làm chủ.</p>
      </div>

      <div class="my-vocab-stats animate-scale-in">
        <div class="stat-card" onclick="Pages.filterMyVocabs('all')">
          <div class="stat-icon blue">🗂️</div>
          <div class="stat-value">${learned.length}</div>
          <div class="stat-label">Tổng số từ đã học</div>
        </div>
        <div class="stat-card" onclick="Pages.filterMyVocabs('favorite')">
          <div class="stat-icon green">❤️</div>
          <div class="stat-value">${favoriteWords.length}</div>
          <div class="stat-label">Từ yêu thích</div>
        </div>
        <div class="stat-card" onclick="Pages.filterMyVocabs('learning')">
          <div class="stat-icon orange">🔄</div>
          <div class="stat-value">${learningWords.length}</div>
          <div class="stat-label">Đang học tập</div>
        </div>
        <div class="stat-card" onclick="Pages.filterMyVocabs('mastered')">
          <div class="stat-icon purple">👑</div>
          <div class="stat-value">${masteredWords.length}</div>
          <div class="stat-label">Đã làm chủ (Max lvl)</div>
        </div>
      </div>

      <div class="my-vocab-filters mb-4">
        <button class="tag active" id="filter-tag-all" onclick="Pages.filterMyVocabs('all')">Tất cả (${learned.length})</button>
        <button class="tag" id="filter-tag-favorite" onclick="Pages.filterMyVocabs('favorite')">Yêu thích (${favoriteWords.length})</button>
        <button class="tag" id="filter-tag-learning" onclick="Pages.filterMyVocabs('learning')">Đang học (${learningWords.length})</button>
        <button class="tag" id="filter-tag-mastered" onclick="Pages.filterMyVocabs('mastered')">Đã làm chủ (${masteredWords.length})</button>
      </div>

      <div class="vocab-list animate-fade-in-up" id="my-vocab-list-container">
        <!-- Rendered list of words -->
      </div>
    `;

    // Default list all
    this.filterMyVocabs('all');
  },

  filterMyVocabs(filterType) {
    // Handle tags active class
    const tags = document.querySelectorAll('.my-vocab-filters .tag');
    tags.forEach(t => t.classList.remove('active'));
    const activeTag = document.getElementById(`filter-tag-${filterType}`);
    if (activeTag) activeTag.classList.add('active');

    const learned = store.getLearnedByCurrentUser();
    const vocabularies = store.getVocabularies();
    
    let filteredList = [];
    if (filterType === 'all') filteredList = learned;
    else if (filterType === 'favorite') filteredList = learned.filter(l => l.isFavorite);
    else if (filterType === 'learning') filteredList = learned.filter(l => l.proficiency > 0 && l.proficiency < 5);
    else if (filterType === 'mastered') filteredList = learned.filter(l => l.proficiency === 5);

    const container = document.getElementById('my-vocab-list-container');
    if (!container) return;

    if (filteredList.length === 0) {
      container.innerHTML = `
        <div class="empty-state w-full">
          <span class="empty-state-icon">📭</span>
          <div class="empty-state-title">Chưa có từ vựng nào!</div>
          <div class="empty-state-desc">Hãy chuyển sang tab "Khám phá bộ từ" để bắt đầu tích lũy từ vựng ngay nào.</div>
          <button class="btn btn-primary" onclick="app.navigateTo('vocabulary')">Khám phá ngay</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredList.map(item => {
      const v = vocabularies.find(vocab => vocab.id === item.vocabId);
      if (!v) return '';

      return `
        <div class="vocab-card animate-scale-in">
          <div class="vocab-card-header">
            <div>
              <span class="vocab-word">${v.word}</span>
              <span class="vocab-pos">${v.pos}</span>
              <div class="vocab-phonetic">${v.phonetic}</div>
            </div>
            <button class="btn-icon btn-ghost btn-sm" onclick="Pages.toggleFavorite(event, '${v.id}', this)" title="Yêu thích">
              <span class="fav-icon">${item.isFavorite ? '❤️' : '🤍'}</span>
            </button>
          </div>
          <div class="vocab-definition-vn">${v.definitionVn}</div>
          <div class="vocab-definition text-xs text-muted">${v.definition}</div>
          <div class="vocab-example">${v.examples[0]}</div>
          <div class="vocab-card-footer">
            <div class="vocab-proficiency">
              ${Array(5).fill(0).map((_, i) => `
                <div class="level-dot ${i < item.proficiency ? 'filled' : ''}"></div>
              `).join('')}
            </div>
            <button class="btn btn-primary btn-sm" onclick="Pages.quickPracticeWord('${v.id}')">⚡ Ôn tập</button>
          </div>
        </div>
      `;
    }).join('');
  },

  // ==========================================================
  // 6. PRACTICE MODES
  // ==========================================================
  renderPractice(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content';

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Học tập và Rèn luyện</h1>
        <p class="page-subtitle">Phương pháp rèn luyện trí nhớ qua trắc nghiệm và luyện viết thực tế.</p>
      </div>

      <div class="practice-mode-selector animate-scale-in">
        <div class="practice-mode-card active" id="pm-card-quiz" onclick="Pages.selectPracticeMode('quiz')">
          <div class="practice-mode-icon">🧠</div>
          <div class="practice-mode-name">Trắc nghiệm</div>
          <p class="practice-mode-desc">Chọn nghĩa đúng của từ vựng.</p>
        </div>
        <div class="practice-mode-card" id="pm-card-flashcard" onclick="Pages.selectPracticeMode('flashcard')">
          <div class="practice-mode-icon">🗂️</div>
          <div class="practice-mode-name">Thẻ học (Flashcard)</div>
          <p class="practice-mode-desc">Phương pháp ghi nhớ nhanh hai mặt.</p>
        </div>
        <div class="practice-mode-card" id="pm-card-writing" onclick="Pages.selectPracticeMode('writing')">
          <div class="practice-mode-icon">✍️</div>
          <div class="practice-mode-name">Luyện viết</div>
          <p class="practice-mode-desc">Ghi nhớ chính xác cách viết từ.</p>
        </div>
        <div class="practice-mode-card" id="pm-card-speaking" onclick="Pages.selectPracticeMode('speaking')">
          <div class="practice-mode-icon">🎙️</div>
          <div class="practice-mode-name">Luyện phát âm</div>
          <p class="practice-mode-desc">Sử dụng micro để kiểm tra phát âm.</p>
        </div>
      </div>

      <div id="practice-arena" class="animate-fade-in-up">
        <!-- Interactive Arena renders here -->
      </div>
    `;

    // Check if there is a preselected quick practice word
    const preselectedWordId = localStorage.getItem('xp_voca_practice_word_id');
    if (preselectedWordId) {
      localStorage.removeItem('xp_voca_practice_word_id');
      this.startTargetedPractice(preselectedWordId);
    } else {
      this.selectPracticeMode('quiz');
    }
  },

  selectPracticeMode(mode) {
    const cards = document.querySelectorAll('.practice-mode-card');
    cards.forEach(c => c.classList.remove('active'));
    
    const activeCard = document.getElementById(`pm-card-${mode}`);
    if (activeCard) activeCard.classList.add('active');

    const arena = document.getElementById('practice-arena');
    if (!arena) return;

    // Get 5 random words for practice session
    const words = this.getRandomWords(5);
    if (words.length === 0) {
      arena.innerHTML = `<div class="empty-state">Chưa có từ vựng nào để luyện tập. Hãy khám phá bộ từ vựng trước!</div>`;
      return;
    }

    if (mode === 'quiz') this.startQuiz(arena, words);
    else if (mode === 'flashcard') this.startFlashcard(arena, words);
    else if (mode === 'writing') this.startWriting(arena, words);
    else if (mode === 'speaking') this.startSpeaking(arena, words);
  },

  getRandomWords(limit) {
    const all = store.getVocabularies();
    const shuffled = [...all].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(limit, all.length));
  },

  startTargetedPractice(vocabId) {
    const arena = document.getElementById('practice-arena');
    const word = store.getVocabularies().find(v => v.id === vocabId);
    if (!word || !arena) return;

    this.startQuiz(arena, [word]);
  },

  // ---- PRACTICE ARENAS ----

  // 1. QUIZ ARENA
  startQuiz(arena, words) {
    let currentIndex = 0;
    let score = 0;
    let xpEarned = 0;

    const renderQuestion = () => {
      const currentWord = words[currentIndex];
      
      // Get 3 decoy meanings
      const allVocabs = store.getVocabularies();
      const decoys = allVocabs.filter(v => v.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const options = [currentWord, ...decoys].sort(() => 0.5 - Math.random());

      arena.innerHTML = `
        <div class="quiz-container card">
          <div class="quiz-progress">
            <div class="quiz-progress-info">
              <span>Đang trả lời câu ${currentIndex + 1}/${words.length}</span>
              <span>Điểm số: ${score}</span>
            </div>
            <div class="progress">
              <div class="progress-bar" style="width: ${((currentIndex) / words.length) * 100}%"></div>
            </div>
          </div>

          <div class="quiz-question">
            <h2 class="quiz-question-text">${currentWord.word}</h2>
            <div class="quiz-question-hint">Phiên âm: ${currentWord.phonetic} (${currentWord.pos})</div>
          </div>

          <div class="quiz-options">
            ${options.map(opt => `
              <button class="quiz-option" onclick="Pages.handleQuizAnswer(this, '${opt.id}', '${currentWord.id}')">
                ${opt.definitionVn}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    };

    window.Pages.handleQuizAnswer = (btn, selectedId, correctId) => {
      const options = document.querySelectorAll('.quiz-option');
      options.forEach(opt => opt.classList.add('disabled'));

      const isCorrect = selectedId === correctId;
      if (isCorrect) {
        btn.classList.add('correct');
        score++;
        const res = store.practiceWord(correctId, true);
        xpEarned += res.xpEarned;
        Components.showXpGained(res.xpEarned);
      } else {
        btn.classList.add('wrong');
        const res = store.practiceWord(correctId, false);
        xpEarned += res.xpEarned;
        
        // Highlight correct option
        options.forEach(opt => {
          if (opt.innerText.trim() === store.getVocabularies().find(v => v.id === correctId).definitionVn) {
            opt.classList.add('correct');
          }
        });
      }

      setTimeout(() => {
        currentIndex++;
        if (currentIndex < words.length) {
          renderQuestion();
        } else {
          this.renderPracticeResults(arena, score, words.length, xpEarned);
        }
      }, 1500);
    };

    renderQuestion();
  },

  // 2. FLASHCARD ARENA
  startFlashcard(arena, words) {
    let currentIndex = 0;

    const renderCard = () => {
      const word = words[currentIndex];
      arena.innerHTML = `
        <div class="flashcard-container">
          <div class="flashcard" id="active-flashcard" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-front">
              <div class="badge badge-primary mb-4">${word.pos}</div>
              <h2 class="flashcard-word">${word.word}</h2>
              <div class="flashcard-phonetic">${word.phonetic}</div>
              <p class="flashcard-hint text-xs">Bấm để lật thẻ xem nghĩa</p>
            </div>
            <div class="flashcard-back">
              <div class="flashcard-answer mb-4">${word.definitionVn}</div>
              <div class="flashcard-definition">${word.definition}</div>
              <p class="text-xs text-muted mt-6"><i>Ví dụ: ${word.examples[0]}</i></p>
            </div>
          </div>

          <div class="flashcard-nav">
            <button class="btn btn-secondary" onclick="Pages.handleFlashcardResult('${word.id}', false)">Đã quên ❌</button>
            <span class="flashcard-counter">${currentIndex + 1} / ${words.length}</span>
            <button class="btn btn-success" onclick="Pages.handleFlashcardResult('${word.id}', true)">Đã thuộc ✅</button>
          </div>
        </div>
      `;
    };

    window.Pages.handleFlashcardResult = (vocabId, isCorrect) => {
      const res = store.practiceWord(vocabId, isCorrect);
      Components.showXpGained(res.xpEarned);

      currentIndex++;
      if (currentIndex < words.length) {
        renderCard();
      } else {
        arena.innerHTML = `
          <div class="practice-results card text-center">
            <div class="results-icon">🎉</div>
            <h2 class="results-title">Hoàn thành thẻ học!</h2>
            <p class="results-subtitle">Thẻ học giúp kích thích trí nhớ tuyệt vời.</p>
            <button class="btn btn-primary" onclick="Pages.selectPracticeMode('flashcard')">Luyện tập lại</button>
          </div>
        `;
      }
    };

    renderCard();
  },

  // 3. WRITING ARENA
  startWriting(arena, words) {
    let currentIndex = 0;
    let score = 0;
    let xpEarned = 0;

    const renderQuestion = () => {
      const currentWord = words[currentIndex];

      arena.innerHTML = `
        <div class="writing-container card">
          <div class="quiz-progress">
            <div class="quiz-progress-info">
              <span>Đang trả lời câu ${currentIndex + 1}/${words.length}</span>
              <span>Điểm số: ${score}</span>
            </div>
            <div class="progress">
              <div class="progress-bar" style="width: ${((currentIndex) / words.length) * 100}%"></div>
            </div>
          </div>

          <div class="writing-prompt">
            <div class="writing-word">Hãy dịch từ sau sang tiếng Anh:</div>
            <h2 class="writing-definition">${currentWord.definitionVn}</h2>
            <p class="text-xs text-muted mt-2">Gợi ý phiên âm: ${currentWord.phonetic} (${currentWord.pos})</p>
          </div>

          <div class="writing-input-container">
            <input type="text" class="input-field writing-input" id="writing-answer-input" placeholder="Gõ từ tại đây..." autocomplete="off">
            <div id="writing-feedback-div" class="writing-feedback hidden"></div>
          </div>

          <div class="flex justify-between">
            <button class="btn btn-secondary" onclick="Pages.pronounceWord('${currentWord.word}')">🔊 Phát âm gợi ý</button>
            <button class="btn btn-primary" id="writing-submit-btn" onclick="Pages.submitWritingAnswer('${currentWord.id}', '${currentWord.word}')">Kiểm tra kết quả</button>
          </div>
        </div>
      `;

      // Enter key handler
      const input = document.getElementById('writing-answer-input');
      input.focus();
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          document.getElementById('writing-submit-btn').click();
        }
      });
    };

    window.Pages.submitWritingAnswer = (correctId, correctWord) => {
      const input = document.getElementById('writing-answer-input');
      const submitBtn = document.getElementById('writing-submit-btn');
      const answer = input.value.trim().toLowerCase();
      const correctAnswer = correctWord.toLowerCase();
      
      const feedback = document.getElementById('writing-feedback-div');
      feedback.classList.remove('hidden');

      const isCorrect = answer === correctAnswer;
      if (isCorrect) {
        feedback.innerText = `Chính xác! Đáp án là ${correctWord}.`;
        feedback.className = 'writing-feedback correct';
        score++;
        const res = store.practiceWord(correctId, true);
        xpEarned += res.xpEarned;
        Components.showXpGained(res.xpEarned);
      } else {
        feedback.innerText = `Chưa đúng! Đáp án đúng là: ${correctWord}. Bạn đã viết: ${input.value}`;
        feedback.className = 'writing-feedback wrong';
        const res = store.practiceWord(correctId, false);
        xpEarned += res.xpEarned;
      }

      input.disabled = true;
      submitBtn.disabled = true;

      setTimeout(() => {
        currentIndex++;
        if (currentIndex < words.length) {
          renderQuestion();
        } else {
          this.renderPracticeResults(arena, score, words.length, xpEarned);
        }
      }, 2500);
    };

    renderQuestion();
  },

  // 4. SPEAKING ARENA
  startSpeaking(arena, words) {
    let currentIndex = 0;

    const renderQuestion = () => {
      const currentWord = words[currentIndex];
      arena.innerHTML = `
        <div class="writing-container card text-center">
          <h3 class="mb-4">Luyện phát âm chuẩn Mỹ</h3>
          <div class="quiz-question">
            <h1 class="vocab-word" style="font-size: 3rem;">${currentWord.word}</h1>
            <p class="text-sm text-muted">${currentWord.phonetic} (${currentWord.pos})</p>
            <p class="text-xs mt-2">${currentWord.definitionVn}</p>
          </div>

          <div class="flex justify-center gap-4 mb-6">
            <button class="btn btn-secondary" onclick="Pages.pronounceWord('${currentWord.word}')">🔊 Phát âm mẫu</button>
            <button class="btn btn-primary" id="speaking-mic-btn" onclick="Pages.startSpeechRecognition('${currentWord.word}')">🎙️ Nhấn và Nói</button>
          </div>

          <div id="speaking-feedback" class="text-sm font-semibold text-muted"></div>
        </div>
      `;
    };

    window.Pages.startSpeechRecognition = (wordToMatch) => {
      const micBtn = document.getElementById('speaking-mic-btn');
      const feedback = document.getElementById('speaking-feedback');
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        Components.showToast('Không hỗ trợ', 'Trình duyệt không hỗ trợ Nhận diện giọng nói.', 'warning');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      
      feedback.innerText = "🎙️ Đang nghe...";
      micBtn.disabled = true;

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const target = wordToMatch.toLowerCase();
        
        if (spokenText === target) {
          feedback.innerHTML = `<span class="text-success">Chính xác! Bạn nói: "${event.results[0][0].transcript}"</span>`;
          const res = store.practiceWord(words[currentIndex].id, true);
          Components.showXpGained(res.xpEarned);
        } else {
          feedback.innerHTML = `<span class="text-error">Chưa chuẩn lắm! Bạn nói: "${event.results[0][0].transcript}" (Cần nói: ${wordToMatch})</span>`;
          store.practiceWord(words[currentIndex].id, false);
        }

        setTimeout(() => {
          micBtn.disabled = false;
          currentIndex++;
          if (currentIndex < words.length) {
            renderQuestion();
          } else {
            arena.innerHTML = `
              <div class="practice-results card text-center">
                <div class="results-icon">🏆</div>
                <h2 class="results-title">Hoàn thành buổi phát âm!</h2>
                <p class="results-subtitle">Thực hành giao tiếp thường xuyên giúp giọng của bạn chuẩn hơn mỗi ngày.</p>
                <button class="btn btn-primary" onclick="Pages.selectPracticeMode('speaking')">Luyện tập lại</button>
              </div>
            `;
          }
        }, 3000);
      };

      recognition.onerror = () => {
        feedback.innerText = "❌ Lỗi kết nối micro hoặc không nghe thấy giọng nói.";
        micBtn.disabled = false;
      };

      recognition.start();
    };

    renderQuestion();
  },

  renderPracticeResults(arena, score, total, xp) {
    arena.innerHTML = `
      <div class="practice-results card animate-scale-in">
        <div class="results-icon">🏆</div>
        <h2 class="results-title">Buổi luyện tập kết thúc!</h2>
        <p class="results-subtitle">Bạn đã trả lời đúng ${score}/${total} câu hỏi.</p>
        
        <div class="results-xp-earned">
          <span>⚡</span> +${xp} XP
        </div>

        <div class="results-stats">
          <div class="results-stat">
            <div class="results-stat-value">${Math.round((score / total) * 100)}%</div>
            <div class="results-stat-label">Chính xác</div>
          </div>
          <div class="results-stat">
            <div class="results-stat-value">${score * 15}</div>
            <div class="results-stat-label">Điểm số</div>
          </div>
          <div class="results-stat">
            <div class="results-stat-value">+${xp}</div>
            <div class="results-stat-label">XP Tích lũy</div>
          </div>
        </div>

        <div class="results-actions">
          <button class="btn btn-secondary" onclick="app.navigateTo('dashboard')">Về trang chủ</button>
          <button class="btn btn-primary" onclick="Pages.selectPracticeMode('quiz')">Tiếp tục rèn luyện</button>
        </div>
      </div>
    `;
  },

  // ==========================================================
  // 7. COMMUNITY
  // ==========================================================
  renderCommunity(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content';

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Cộng đồng học tập</h1>
        <p class="page-subtitle">Nơi giao lưu, trao đổi kinh nghiệm và đua top thăng hạng.</p>
      </div>

      <div class="tabs animate-scale-in">
        <div class="tab active" id="tab-btn-feed" onclick="Pages.switchCommunityTab('feed')">Bảng tin</div>
        <div class="tab" id="tab-btn-leaderboard" onclick="Pages.switchCommunityTab('leaderboard')">Bảng xếp hạng</div>
        <div class="tab" id="tab-btn-friends" onclick="Pages.switchCommunityTab('friends')">Bạn bè</div>
        <div class="tab" id="tab-btn-groups" onclick="Pages.switchCommunityTab('groups')">Nhóm học tập</div>
      </div>

      <div id="community-content-area" class="animate-fade-in-up">
        <!-- Tab Content -->
      </div>
    `;

    this.switchCommunityTab('feed');
  },

  switchCommunityTab(tabName) {
    const tabs = document.querySelectorAll('.tabs .tab');
    tabs.forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-btn-${tabName}`).classList.add('active');

    const contentArea = document.getElementById('community-content-area');
    if (!contentArea) return;

    if (tabName === 'feed') this.renderCommunityFeed(contentArea);
    else if (tabName === 'leaderboard') this.renderCommunityLeaderboard(contentArea);
    else if (tabName === 'friends') this.renderCommunityFriends(contentArea);
    else if (tabName === 'groups') this.renderCommunityGroups(contentArea);
  },

  // ---- COMMUNITY TABS ----

  // 1. FEED RENDER
  renderCommunityFeed(container) {
    const posts = store.getPosts();
    const users = store.getUsers();
    const currentUser = store.getCurrentUser();

    container.innerHTML = `
      <!-- Create Post -->
      <div class="create-post">
        <div class="create-post-input">
          <div class="avatar avatar-sm">
            <span>${currentUser.avatarEmoji}</span>
          </div>
          <textarea class="create-post-textarea" id="community-post-input" placeholder="Bạn muốn chia sẻ mẹo học tập hay từ vựng mới nào hôm nay?"></textarea>
        </div>
        <div class="create-post-actions">
          <button class="btn btn-primary" onclick="Pages.submitNewPost()">Chia sẻ</button>
        </div>
      </div>

      <!-- Feed List -->
      <div class="posts-list">
        ${posts.map(p => {
          const author = users.find(u => u.id === p.userId) || { username: 'Unknown', avatarEmoji: '👤', title: 'Beginner' };
          const formattedDate = new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date(p.createdAt).toLocaleDateString();
          const isLiked = p.likedBy && p.likedBy.includes(currentUser.id);

          return `
            <div class="post-card">
              <div class="post-header">
                <div class="avatar avatar-sm">
                  <span>${author.avatarEmoji}</span>
                </div>
                <div class="post-user-info">
                  <div class="post-user-name">${author.fullName} (@${author.username})</div>
                  <div class="post-user-meta">${formattedDate} • ${author.title}</div>
                </div>
              </div>
              <div class="post-content">
                ${p.content.replace(/\n/g, '<br>')}
              </div>
              
              ${p.vocabIds && p.vocabIds.length > 0 ? `
                <div class="post-vocab-tags">
                  ${p.vocabIds.map(vid => {
                    const vocab = store.getVocabularies().find(v => v.id === vid);
                    return vocab ? `<span class="badge badge-primary">${vocab.word}: ${vocab.definitionVn}</span>` : '';
                  }).join('')}
                </div>
              ` : ''}

              <div class="post-stats">
                <span>❤️ ${p.likesCount} lượt thích</span>
                <span>💬 ${p.commentsCount} bình luận</span>
              </div>

              <div class="post-actions">
                <button class="post-action-btn ${isLiked ? 'liked' : ''}" onclick="Pages.likeFeedPost('${p.id}')">
                  <span>❤️</span> ${isLiked ? 'Đã thích' : 'Thích'}
                </button>
                <button class="post-action-btn" onclick="Pages.toggleCommentArea('${p.id}')">
                  <span>💬</span> Bình luận
                </button>
              </div>

              <!-- Comments Section (Collapsed by default) -->
              <div id="comment-area-${p.id}" class="hidden mt-4 pt-4 border-top">
                <div class="flex gap-2 mb-3">
                  <input type="text" class="input-field" id="comment-input-${p.id}" placeholder="Viết bình luận..." style="font-size: 12px; padding: 6px 12px;">
                  <button class="btn btn-primary btn-sm" onclick="Pages.submitComment('${p.id}')">Gửi</button>
                </div>
                <div class="flex flex-col gap-2">
                  ${p.comments.map(c => {
                    const cAuthor = users.find(u => u.id === c.userId) || { username: 'User', avatarEmoji: '👤' };
                    return `
                      <div class="flex gap-2 bg-tertiary p-2 rounded-lg">
                        <div class="avatar avatar-xs">
                          <span>${cAuthor.avatarEmoji}</span>
                        </div>
                        <div>
                          <div class="text-xs font-bold">${cAuthor.fullName}</div>
                          <div class="text-xs text-secondary mt-1">${c.content}</div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  submitNewPost() {
    const text = document.getElementById('community-post-input').value.trim();
    if (!text) {
      Components.showToast('Báo lỗi', 'Nội dung bài viết không được trống!', 'error');
      return;
    }
    
    store.createPost(text);
    Components.showToast('Thành công', 'Bài viết đã được chia sẻ lên bảng tin! +20 XP');
    this.renderCommunityFeed(document.getElementById('community-content-area'));
  },

  likeFeedPost(postId) {
    store.likePost(postId);
    this.renderCommunityFeed(document.getElementById('community-content-area'));
  },

  toggleCommentArea(postId) {
    const area = document.getElementById(`comment-area-${postId}`);
    area.classList.toggle('hidden');
  },

  submitComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    store.commentOnPost(postId, text);
    input.value = '';
    this.renderCommunityFeed(document.getElementById('community-content-area'));
  },

  // 2. LEADERBOARD RENDER
  renderCommunityLeaderboard(container) {
    const users = [...store.getUsers()].sort((a, b) => b.totalXp - a.totalXp);
    const currentUser = store.getCurrentUser();

    container.innerHTML = `
      <div class="leaderboard-list">
        <div class="p-4 bg-primary text-white text-center font-bold" style="background: var(--gradient-primary)">
          🏆 Bảng vinh danh chiến binh tiếng Anh
        </div>
        ${users.map((u, i) => `
          <div class="leaderboard-item ${u.id === currentUser.id ? 'current-user' : ''}">
            <div class="leaderboard-rank top-${i + 1}">${i + 1}</div>
            <div class="avatar avatar-sm">
              <span>${u.avatarEmoji}</span>
            </div>
            <div class="leaderboard-user-info">
              <div class="leaderboard-user-name">${u.fullName} (@${u.username})</div>
              <div class="leaderboard-user-level">Cấp độ ${u.level} • ${u.title}</div>
            </div>
            <div class="leaderboard-xp">${u.totalXp} XP</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 3. FRIENDS RENDER
  renderCommunityFriends(container) {
    const friends = store.getFriends();

    container.innerHTML = `
      <div class="card mb-4">
        <h3 class="font-bold mb-2">Tìm bạn bè</h3>
        <div class="flex gap-2">
          <input type="text" class="input-field" id="friends-find-input" placeholder="Nhập tên người dùng...">
          <button class="btn btn-primary" onclick="Pages.findAndAddFriend()">Kết bạn</button>
        </div>
      </div>

      <h3 class="font-bold mb-3">Danh sách bạn bè (${friends.length})</h3>
      <div class="friends-list">
        ${friends.length === 0 ? '<div class="empty-state">Bạn chưa kết bạn với ai. Hãy tìm kiếm bạn bè ngay!</div>' : ''}
        ${friends.map(f => `
          <div class="friend-card animate-scale-in">
            <div class="avatar avatar-md">
              <span>${f.avatarEmoji}</span>
            </div>
            <div class="friend-info">
              <div class="friend-name">${f.fullName}</div>
              <div class="friend-meta">Lvl ${f.level} • ${f.totalXp} XP</div>
            </div>
            <div class="friend-actions">
              <button class="btn btn-ghost btn-sm" onclick="Components.showToast('Tin nhắn', 'Tính năng chat riêng tư đang được phát triển!')">💬 Trò chuyện</button>
              <button class="btn btn-secondary btn-sm" onclick="Pages.removeFriend('${f.id}')">Hủy kết bạn</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  findAndAddFriend() {
    const input = document.getElementById('friends-find-input');
    const name = input.value.trim().toLowerCase();
    if (!name) return;

    const matchedUser = store.getUsers().find(u => u.username.toLowerCase() === name);
    if (!matchedUser) {
      Components.showToast('Không tìm thấy', 'Không tìm thấy người dùng này!', 'error');
      return;
    }

    if (matchedUser.id === store.getCurrentUser().id) {
      Components.showToast('Lỗi', 'Bạn không thể kết bạn với chính mình!', 'warning');
      return;
    }

    const added = store.addFriend(matchedUser.id);
    if (added) {
      Components.showToast('Kết bạn', `Đã kết bạn với ${matchedUser.fullName}`);
      input.value = '';
      this.renderCommunityFriends(document.getElementById('community-content-area'));
    } else {
      Components.showToast('Báo lỗi', 'Hai người đã là bạn bè rồi.', 'warning');
    }
  },

  removeFriend(friendId) {
    store.removeFriend(friendId);
    Components.showToast('Thông báo', 'Đã hủy kết bạn thành công.');
    this.renderCommunityFriends(document.getElementById('community-content-area'));
  },

  // 4. STUDY GROUPS RENDER
  renderCommunityGroups(container) {
    const groups = store.getGroups();

    container.innerHTML = `
      <div class="card mb-6">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-bold">Nhóm học tập cộng đồng</h3>
            <p class="text-xs text-muted">Tham gia nhóm để giao lưu từ vựng cùng sở thích học thuật.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Components.showToast('Tính năng', 'Khởi tạo nhóm mới yêu cầu cấp độ 15!')">Tạo nhóm</button>
        </div>
      </div>

      <div class="grid grid-2 gap-4">
        ${groups.map(g => `
          <div class="card theme-card flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="text-3xl">${g.avatarEmoji}</span>
                <div>
                  <h3 class="font-bold text-sm">${g.name}</h3>
                  <span class="badge badge-neutral text-xs">${MOCK_DATA.themes.find(t => t.id === g.themeId).name}</span>
                </div>
              </div>
              <p class="text-xs text-secondary mb-4">${g.description}</p>
            </div>
            
            <div class="flex justify-between items-center pt-2 border-top">
              <span class="text-xs text-muted">👥 ${g.memberCount}/${g.maxMembers} thành viên</span>
              <button class="btn btn-primary btn-sm" onclick="Pages.joinStudyGroup('${g.id}', this)">Tham gia</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  joinStudyGroup(groupId, btn) {
    const joined = store.joinGroup(groupId);
    if (joined) {
      Components.showToast('Thành công', 'Chào mừng bạn đến với nhóm học tập!');
      btn.innerText = 'Đang tham gia';
      btn.disabled = true;
      btn.className = 'btn btn-secondary btn-sm';
      this.renderCommunityGroups(document.getElementById('community-content-area'));
    } else {
      Components.showToast('Báo lỗi', 'Bạn đã ở trong nhóm này rồi.', 'warning');
    }
  },

  // ==========================================================
  // 8. REVIEW SCHEDULE
  // ==========================================================
  renderReview(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content';

    const learned = store.getLearnedByCurrentUser();
    const toReview = learned.filter(l => new Date(l.nextReview) <= new Date());

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Lịch ôn tập định kỳ</h1>
        <p class="page-subtitle">Thuật toán lặp lại ngắt quãng gợi ý số lượng từ cần ôn tập hợp lý mỗi ngày.</p>
      </div>

      <div class="review-calendar card animate-scale-in">
        <div class="calendar-header">
          <h3 class="font-bold">Tháng 6, 2026</h3>
          <span class="badge badge-success">Phương pháp Spaced Repetition</span>
        </div>

        <div class="calendar-grid">
          <div class="calendar-day-header">T2</div>
          <div class="calendar-day-header">T3</div>
          <div class="calendar-day-header">T4</div>
          <div class="calendar-day-header">T5</div>
          <div class="calendar-day-header">T6</div>
          <div class="calendar-day-header">T7</div>
          <div class="calendar-day-header">CN</div>

          <!-- Calendar simulation -->
          ${Array(27).fill(0).map((_, i) => `<div class="calendar-day other-month">${i + 4}</div>`).join('')}
          <div class="calendar-day today has-review">28</div>
          <div class="calendar-day">29</div>
          <div class="calendar-day">30</div>
        </div>
      </div>

      <div class="card animate-fade-in-up">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold">Từ vựng cần ôn tập hôm nay (${toReview.length})</h3>
          ${toReview.length > 0 ? `<button class="btn btn-primary" onclick="app.navigateTo('practice')">Bắt đầu ôn tập ngay</button>` : ''}
        </div>

        ${toReview.length === 0 ? `
          <div class="empty-state">
            <span class="empty-state-icon">🎉</span>
            <div class="empty-state-title">Tuyệt vời! Không còn từ nào đến hạn ôn tập</div>
            <p class="empty-state-desc">Bạn đã hoàn thành xuất sắc các lịch trình ôn tập. Hãy học thêm từ vựng mới!</p>
            <button class="btn btn-primary" onclick="app.navigateTo('vocabulary')">Học từ mới</button>
          </div>
        ` : `
          <div class="vocab-list">
            ${toReview.map(item => {
              const v = store.getVocabularies().find(vocab => vocab.id === item.vocabId);
              if (!v) return '';
              return `
                <div class="vocab-card" style="padding: 12px 16px;">
                  <div class="flex justify-between items-center">
                    <div>
                      <span class="font-bold" style="color: var(--primary-600);">${v.word}</span>
                      <span class="vocab-pos">${v.pos}</span>
                    </div>
                    <span class="text-xs text-warning">Đã đến hạn ôn</span>
                  </div>
                  <div class="text-xs text-secondary mt-2">${v.definitionVn}</div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  },

  // ==========================================================
  // 9. AI CONVERSATIONAL PRACTICE
  // ==========================================================
  renderAiChat(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content no-right-sidebar';

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Hội thoại thông minh cùng AI</h1>
        <p class="page-subtitle">Nhập nội dung hội thoại bằng tiếng Anh để cùng AI luyện giao tiếp tự nhiên.</p>
      </div>

      <div class="grid grid-3 gap-6">
        <!-- Topics Selection -->
        <div class="card flex flex-col gap-3">
          <h3 class="font-bold mb-2">Chủ đề hội thoại gợi ý</h3>
          <div class="ai-topic-cards">
            ${MOCK_DATA.aiTopics.map(t => `
              <div class="ai-topic-card" onclick="Pages.startAiTopicConversation('${t.id}')">
                <div class="ai-topic-icon">${t.icon}</div>
                <div class="ai-topic-name">${t.name}</div>
                <div class="ai-topic-desc">${t.level}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Chat Arena -->
        <div class="ai-chat-container card col-span-2" style="grid-column: span 2;">
          <div class="ai-chat-header">
            <div class="ai-chat-avatar">🤖</div>
            <div>
              <div class="ai-chat-name">XP AI Assistant</div>
              <div class="ai-chat-status">🟢 Đang hoạt động</div>
            </div>
          </div>

          <div class="ai-chat-messages" id="ai-messages-container">
            <div class="chat-message ai">
              <div class="chat-bubble">
                Hi! 👋 I'm your AI speaking companion. Please select a topic on the left to start practicing, or write anything you want!
              </div>
            </div>
          </div>

          <div class="ai-chat-input-area">
            <input type="text" class="input-field" id="ai-chat-user-input" placeholder="Gõ câu trả lời của bạn bằng tiếng Anh..." onkeypress="Pages.handleAiInputKeyPress(event)">
            <button class="btn btn-primary" onclick="Pages.sendUserMessageToAi()">Gửi đi</button>
          </div>
        </div>
      </div>
    `;
  },

  startAiTopicConversation(topicId) {
    const topic = MOCK_DATA.aiTopics.find(t => t.id === topicId);
    if (!topic) return;

    const chatContainer = document.getElementById('ai-messages-container');
    if (!chatContainer) return;

    chatContainer.innerHTML = `
      <div class="chat-message ai">
        <div class="chat-bubble">
          Let's practice the topic: <b>"${topic.nameEn}"</b>. I will start: "Hello, ready to talk about this topic?"
        </div>
      </div>
    `;
    
    // Simulate AI greeting for topic
    let greeting = "";
    if (topicId === 'at1') greeting = MOCK_DATA.aiResponses.orderingFood[0];
    else if (topicId === 'at2') greeting = MOCK_DATA.aiResponses.jobInterview[0];
    else greeting = `Welcome! Let's talk about ${topic.nameEn}. What are your thoughts on this?`;

    setTimeout(() => {
      chatContainer.innerHTML += `
        <div class="chat-message ai">
          <div class="chat-bubble">${greeting}</div>
        </div>
      `;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
  },

  handleAiInputKeyPress(event) {
    if (event.key === 'Enter') {
      this.sendUserMessageToAi();
    }
  },

  sendUserMessageToAi() {
    const input = document.getElementById('ai-chat-user-input');
    const text = input.value.trim();
    if (!text) return;

    const chatContainer = document.getElementById('ai-messages-container');
    if (!chatContainer) return;

    // Append user message
    chatContainer.innerHTML += `
      <div class="chat-message user">
        <div class="chat-bubble">${text}</div>
      </div>
    `;
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Simulate AI typing and responding
    setTimeout(() => {
      chatContainer.innerHTML += `
        <div class="chat-message ai">
          <div class="chat-bubble">💬 ... Đang suy nghĩ</div>
        </div>
      `;
      chatContainer.scrollTop = chatContainer.scrollHeight;

      setTimeout(() => {
        // Remove typing indicator
        const messages = chatContainer.querySelectorAll('.chat-message.ai');
        messages[messages.length - 1].remove();

        const replies = [
          "That's very interesting! Can you elaborate more on that?",
          "Your English is great! I understood completely. Let's keep going.",
          "Great job! Here is a tip: you could also say 'I would prefer...' to sound more natural.",
          "I agree with you. Tell me more about your experience with this.",
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        chatContainer.innerHTML += `
          <div class="chat-message ai">
            <div class="chat-bubble">${randomReply}</div>
          </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Award practice XP
        store.awardXp(10);
        Components.showXpGained(10);
      }, 1500);
    }, 500);
  },

  // ==========================================================
  // 10. USER PROFILE
  // ==========================================================
  renderProfile(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content';

    const user = store.getCurrentUser();
    const unlockedAch = store.getUnlockedAchievements();
    const unlockedIds = unlockedAch.map(a => a.achievementId);

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">Trang cá nhân</h1>
        <p class="page-subtitle">Xem thông tin chi tiết, huy hiệu và tùy chỉnh cài đặt tài khoản của bạn.</p>
      </div>

      <div class="profile-header animate-scale-in">
        <div class="profile-avatar">${user.avatarEmoji}</div>
        <div class="profile-info">
          <h2 class="profile-name">${user.fullName}</h2>
          <div class="profile-username">@${user.username} • Cấp độ ${user.level} (${user.title})</div>
          <p class="profile-bio">${user.bio || 'Chưa thiết lập tiểu sử.'}</p>
          <div class="profile-stats-row">
            <div class="profile-stat-item">
              <div class="profile-stat-val">${user.wordsLearned}</div>
              <div class="profile-stat-lbl">Từ đã học</div>
            </div>
            <div class="profile-stat-item">
              <div class="profile-stat-val">${user.currentStreak} 🔥</div>
              <div class="profile-stat-lbl">Streak</div>
            </div>
            <div class="profile-stat-item">
              <div class="profile-stat-val">${user.totalXp}</div>
              <div class="profile-stat-lbl">Kinh nghiệm</div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="font-bold mb-4">Kho huy hiệu tích lũy (${unlockedAch.length}/${MOCK_DATA.achievements.length})</h3>
      <div class="achievements-full-grid animate-fade-in-up">
        ${MOCK_DATA.achievements.map(ach => {
          const isUnlocked = unlockedIds.includes(ach.id);
          return `
            <div class="achievement-full-card ${isUnlocked ? '' : 'locked'}">
              <div class="achievement-full-icon">${ach.icon}</div>
              <div class="achievement-full-name">${ach.name}</div>
              <div class="achievement-full-desc">${ach.description}</div>
              <span class="badge ${isUnlocked ? 'badge-success' : 'badge-neutral'} mt-2">
                ${isUnlocked ? 'Đã đạt được' : `Khóa (+${ach.xpBonus} XP)`}
              </span>
            </div>
          `;
        }).join('')}
      </div>

      <div class="card mt-6">
        <h3 class="font-bold mb-4">Cài đặt tài khoản</h3>
        <div class="grid grid-2 gap-4">
          <div class="input-group">
            <label>Họ và tên</label>
            <input type="text" class="input-field" id="profile-edit-fullname" value="${user.fullName}">
          </div>
          <div class="input-group">
            <label>Tiểu sử (Bio)</label>
            <input type="text" class="input-field" id="profile-edit-bio" value="${user.bio}">
          </div>
        </div>
        <button class="btn btn-primary mt-4" onclick="Pages.saveProfileSettings()">Lưu cài đặt</button>
      </div>
    `;
  },

  saveProfileSettings() {
    const user = store.getCurrentUser();
    user.fullName = document.getElementById('profile-edit-fullname').value;
    user.bio = document.getElementById('profile-edit-bio').value;
    
    store.saveCurrentUser(user);
    Components.showToast('Thành công', 'Cài đặt tài khoản đã được lưu!');
  },

  // ==========================================================
  // 11. ADMIN VIEW
  // ==========================================================
  renderAdmin(container) {
    app.showNavigation();
    const contentArea = document.getElementById('app-content');
    contentArea.className = 'main-content no-right-sidebar';

    const vocabs = store.getVocabularies();

    container.innerHTML = `
      <div class="page-header animate-fade-in-down">
        <h1 class="page-title">⚙️ Quản trị hệ thống từ vựng</h1>
        <p class="page-subtitle">Nhập liệu và thêm từ vựng mới vào bộ từ điển XP Voca.</p>
      </div>

      <div class="grid grid-3 gap-6 animate-fade-in-up">
        <!-- Add Word Form -->
        <div class="card">
          <h3 class="font-bold mb-4">Thêm từ vựng mới</h3>
          <form class="auth-form" onsubmit="Pages.handleAdminAddWord(event)">
            <div class="input-group">
              <label>Từ tiếng Anh</label>
              <input type="text" class="input-field" id="admin-word" required placeholder="Ví dụ: Synergy">
            </div>
            <div class="input-group">
              <label>Phát âm</label>
              <input type="text" class="input-field" id="admin-phonetic" required placeholder="Ví dụ: /ˈsɪn.ə.dʒi/">
            </div>
            <div class="input-group">
              <label>Từ loại</label>
              <select class="input-field" id="admin-pos">
                <option value="noun">Danh từ (Noun)</option>
                <option value="verb">Động từ (Verb)</option>
                <option value="adjective">Tính từ (Adjective)</option>
                <option value="adverb">Trạng từ (Adverb)</option>
              </select>
            </div>
            <div class="input-group">
              <label>Nghĩa tiếng Việt</label>
              <input type="text" class="input-field" id="admin-def-vn" required placeholder="Ví dụ: Sự hiệp lực">
            </div>
            <div class="input-group">
              <label>Định nghĩa tiếng Anh</label>
              <textarea class="input-field" id="admin-def-en" required placeholder="Synergy describes the combined power..."></textarea>
            </div>
            <div class="input-group">
              <label>Ví dụ minh họa</label>
              <input type="text" class="input-field" id="admin-example" required placeholder="The synergy between the two companies created great results.">
            </div>
            <div class="input-group">
              <label>Chủ đề (Theme)</label>
              <select class="input-field" id="admin-theme">
                ${MOCK_DATA.themes.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
            </div>

            <button class="btn btn-primary w-full" type="submit">Thêm từ vựng</button>
          </form>
        </div>

        <!-- Words List Table -->
        <div class="col-span-2 admin-table" style="grid-column: span 2;">
          <div class="p-4 font-bold border-bottom">Danh sách từ vựng hiện tại (${vocabs.length})</div>
          <div style="max-height: 500px; overflow-y: auto;">
            <table>
              <thead>
                <tr>
                  <th>Từ</th>
                  <th>Phiên âm</th>
                  <th>Từ loại</th>
                  <th>Nghĩa tiếng Việt</th>
                  <th>Chủ đề</th>
                </tr>
              </thead>
              <tbody>
                ${vocabs.map(v => `
                  <tr>
                    <td><b>${v.word}</b></td>
                    <td>${v.phonetic}</td>
                    <td><span class="badge badge-primary">${v.pos}</span></td>
                    <td>${v.definitionVn}</td>
                    <td>${MOCK_DATA.themes.find(t => t.id === v.themeId).name}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  handleAdminAddWord(event) {
    event.preventDefault();
    const word = document.getElementById('admin-word').value.trim();
    const phonetic = document.getElementById('admin-phonetic').value.trim();
    const pos = document.getElementById('admin-pos').value;
    const defVn = document.getElementById('admin-def-vn').value.trim();
    const defEn = document.getElementById('admin-def-en').value.trim();
    const example = document.getElementById('admin-example').value.trim();
    const themeId = document.getElementById('admin-theme').value;

    const vocabs = store.getVocabularies();
    
    // Check duplication
    if (vocabs.some(v => v.word.toLowerCase() === word.toLowerCase())) {
      Components.showToast('Lỗi', 'Từ vựng này đã tồn tại trong hệ thống!', 'error');
      return;
    }

    const newVocab = {
      id: 'v_' + Date.now(),
      word,
      phonetic,
      definition: defEn,
      definitionVn: defVn,
      pos,
      difficulty: 3,
      frequency: 5,
      themeId,
      examples: [example],
      synonyms: [],
      antonyms: []
    };

    vocabs.push(newVocab);
    localStorage.setItem('xp_voca_vocab', JSON.stringify(vocabs));
    
    Components.showToast('Thành công', `Đã thêm từ "${word}" vào cơ sở dữ liệu!`);
    
    // Clear inputs
    document.getElementById('admin-word').value = '';
    document.getElementById('admin-phonetic').value = '';
    document.getElementById('admin-def-vn').value = '';
    document.getElementById('admin-def-en').value = '';
    document.getElementById('admin-example').value = '';

    // Re-render
    this.renderAdmin(document.getElementById('app-view-container'));
  }
};
