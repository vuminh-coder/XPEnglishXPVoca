// ============================================================
// XP VOCA - Core Layout & Component Renderers
// Renders Navbar, Sidebar, Right Sidebar and custom notifications
// ============================================================

const Components = {
  // ---- TOP NAVBAR ----
  renderNavbar() {
    const header = document.getElementById('app-header');
    if (!header) return;

    const user = store.getCurrentUser();
    const notifs = store.getNotifications();
    const unreadCount = notifs.filter(n => !n.isRead).length;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    header.innerHTML = `
      <div class="top-navbar">
        <div class="navbar-brand" onclick="app.navigateTo('dashboard')">
          <div class="navbar-logo">🦉</div>
          <span class="navbar-title">XP English</span>
        </div>

        <button class="navbar-menu-toggle" onclick="Components.toggleLeftSidebar()">
          <span class="icon">☰</span>
        </button>

        <nav class="navbar-nav">
          <a class="nav-link" href="#dashboard" data-page="dashboard">Trang chủ</a>
          <a class="nav-link" href="#vocabulary" data-page="vocabulary">Khám phá bộ từ</a>
          <a class="nav-link" href="#myvocab" data-page="myvocab">Bộ từ của tôi</a>
          <a class="nav-link" href="#practice" data-page="practice">Luyện tập</a>
          <a class="nav-link" href="#community" data-page="community">Cộng đồng</a>
          <a class="nav-link" href="#review" data-page="review">Lịch ôn</a>
          <a class="nav-link" href="#aichat" data-page="aichat">Hội thoại AI</a>
        </nav>

        <div class="navbar-actions">
          <div class="theme-toggle" onclick="Components.toggleTheme()" title="Đổi giao diện">
            <span>${isDark ? '☀️' : '🌙'}</span>
          </div>

          <div class="dropdown navbar-notification">
            <button class="btn-icon btn-ghost relative" onclick="Components.toggleNotificationDropdown(event)">
              <span>🔔</span>
              ${unreadCount > 0 ? `<span class="notification-dot">${unreadCount}</span>` : ''}
            </button>
            <div id="notification-dropdown" class="dropdown-menu">
              <div class="p-3 font-bold text-sm border-bottom flex justify-between items-center">
                <span>Thông báo</span>
                <span class="text-xs text-primary-c cursor-pointer" onclick="Components.markNotificationsRead()">Đánh dấu đã đọc</span>
              </div>
              <div class="notification-list" style="max-height: 300px; overflow-y: auto;">
                ${notifs.length === 0 ? '<div class="p-4 text-center text-muted text-xs">Không có thông báo mới</div>' : ''}
                ${notifs.map(n => `
                  <div class="dropdown-item flex items-start gap-3 ${n.isRead ? '' : 'bg-tertiary'}" style="white-space: normal;">
                    <span class="text-xl">${n.icon}</span>
                    <div>
                      <div class="font-semibold text-xs">${n.title}</div>
                      <div class="text-xs text-muted" style="margin-top: 2px;">${n.body}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="dropdown">
            <div class="navbar-user" onclick="Components.toggleUserDropdown(event)">
              <div class="avatar avatar-sm">
                <span>${user ? user.avatarEmoji : '👤'}</span>
              </div>
              <div class="navbar-user-info hidden-mobile">
                <div class="navbar-user-name">${user ? user.fullName : 'Guest'}</div>
                <div class="navbar-user-level">Lvl ${user ? user.level : 1}</div>
              </div>
            </div>
            <div id="user-dropdown" class="dropdown-menu">
              <div class="dropdown-item" onclick="app.navigateTo('profile')">👤 Trang cá nhân</div>
              <div class="dropdown-item" onclick="app.navigateTo('admin')">⚙️ Quản trị</div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-item text-error" onclick="app.logout()">🚪 Đăng xuất</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Highlight active link
    const currentHash = window.location.hash.substring(1) || 'dashboard';
    const links = header.querySelectorAll('.navbar-nav .nav-link');
    links.forEach(link => {
      if (link.getAttribute('data-page') === currentHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // ---- LEFT SIDEBAR ----
  renderLeftSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    const user = store.getCurrentUser();
    if (!user) {
      sidebar.innerHTML = '';
      return;
    }

    sidebar.innerHTML = `
      <div class="left-sidebar">
        <div class="sidebar-profile">
          <div class="sidebar-profile-card" onclick="app.navigateTo('profile')">
            <div class="avatar avatar-md">
              <span>${user.avatarEmoji}</span>
            </div>
            <div class="sidebar-profile-info">
              <div class="sidebar-profile-name">${user.fullName}</div>
              <div class="sidebar-profile-email">${user.email}</div>
            </div>
          </div>
        </div>

        <div class="sidebar-nav">
          <div class="sidebar-section">
            <div class="sidebar-section-title">Học tập</div>
            <div class="sidebar-link active" data-page="dashboard" onclick="app.navigateTo('dashboard')">
              <span class="sidebar-link-icon">🏠</span>
              <span>Trang chủ</span>
            </div>
            <div class="sidebar-link" data-page="vocabulary" onclick="app.navigateTo('vocabulary')">
              <span class="sidebar-link-icon">📖</span>
              <span>Khám phá bộ từ</span>
            </div>
            <div class="sidebar-link" data-page="myvocab" onclick="app.navigateTo('myvocab')">
              <span class="sidebar-link-icon">🗂️</span>
              <span>Bộ từ của tôi</span>
            </div>
            <div class="sidebar-link" data-page="review" onclick="app.navigateTo('review')">
              <span class="sidebar-link-icon">📅</span>
              <span>Lịch ôn</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-section-title">Luyện tập</div>
            <div class="sidebar-link" data-page="practice" onclick="app.navigateTo('practice')">
              <span class="sidebar-link-icon">📝</span>
              <span>Luyện viết & Trắc nghiệm</span>
            </div>
            <div class="sidebar-link" data-page="aichat" onclick="app.navigateTo('aichat')">
              <span class="sidebar-link-icon">🤖</span>
              <span>Hội thoại AI</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-section-title">Cộng đồng</div>
            <div class="sidebar-link" data-page="community" onclick="app.navigateTo('community')">
              <span class="sidebar-link-icon">👥</span>
              <span>Cộng đồng</span>
            </div>
          </div>
        </div>

        <div class="sidebar-footer">
          <div class="sidebar-link" onclick="app.logout()">
            <span class="sidebar-link-icon">🚪</span>
            <span>Đăng xuất</span>
          </div>
        </div>
      </div>
      <div class="sidebar-overlay" onclick="Components.closeLeftSidebar()"></div>
    `;

    // Highlight active link
    const currentHash = window.location.hash.substring(1) || 'dashboard';
    const links = sidebar.querySelectorAll('.sidebar-link');
    links.forEach(link => {
      if (link.getAttribute('data-page') === currentHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // ---- RIGHT SIDEBAR ----
  renderRightSidebar() {
    const rightBar = document.getElementById('app-right-sidebar');
    if (!rightBar) return;

    const user = store.getCurrentUser();
    if (!user) {
      rightBar.innerHTML = '';
      rightBar.classList.add('hidden');
      return;
    }

    rightBar.classList.remove('hidden');

    const unlockedAch = store.getUnlockedAchievements();
    const unlockedIds = unlockedAch.map(a => a.achievementId);
    
    // Level progress calculations
    const currentLvlXp = MOCK_DATA.levelXp[user.level];
    const prevLvlXp = MOCK_DATA.levelXp[user.level - 1] || 0;
    const progressTotal = currentLvlXp - prevLvlXp;
    const progressCurrent = user.totalXp - prevLvlXp;
    const progressPercent = Math.min(100, Math.max(0, (progressCurrent / progressTotal) * 100));

    rightBar.innerHTML = `
      <div class="right-sidebar">
        <div class="right-sidebar-profile">
          <div class="right-sidebar-avatar">
            <span>${user.avatarEmoji}</span>
          </div>
          <h3 class="right-sidebar-name">${user.fullName}</h3>
          <div class="right-sidebar-level">Level <span>${user.level}</span> • ${user.title}</div>
          
          <div class="right-sidebar-xp">
            <div class="right-sidebar-xp-info">
              <span>Tiến trình đến cấp ${user.level + 1}</span>
              <span>${progressCurrent}/${progressTotal} XP</span>
            </div>
            <div class="progress">
              <div class="progress-bar" style="width: ${progressPercent}%"></div>
            </div>
          </div>

          <button class="btn btn-primary share-progress-btn btn-sm" onclick="Components.shareProgress()">
            <span>🔗</span> Chia sẻ tiến độ
          </button>
        </div>

        <div class="divider"></div>

        <div class="right-sidebar-achievements">
          <div class="flex justify-between items-center mb-4">
            <h4 class="font-bold">Huy hiệu đạt được</h4>
            <span class="text-xs text-primary-c cursor-pointer" onclick="app.navigateTo('profile')">Xem tất cả</span>
          </div>
          <div class="achievements-grid">
            ${MOCK_DATA.achievements.slice(0, 6).map(ach => {
              const isUnlocked = unlockedIds.includes(ach.id);
              return `
                <div class="achievement-item tooltip ${isUnlocked ? '' : 'locked'}" data-tooltip="${ach.name}: ${ach.description}">
                  <span class="achievement-icon">${ach.icon}</span>
                  <span class="achievement-label truncate w-full">${ach.name}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="divider"></div>

        <div class="right-sidebar-suggested mt-6">
          <h4 class="font-bold mb-4">Có thể bạn quen</h4>
          <div class="flex flex-col gap-3">
            ${MOCK_DATA.users.filter(u => u.id !== user.id && !store.getFriends().some(f => f.id === u.id)).slice(0, 3).map(u => `
              <div class="flex justify-between items-center p-2 bg-tertiary rounded-lg">
                <div class="flex items-center gap-2">
                  <div class="avatar avatar-xs">
                    <span>${u.avatarEmoji}</span>
                  </div>
                  <div>
                    <div class="text-xs font-bold">${u.username}</div>
                    <div class="text-xs text-muted">Lvl ${u.level}</div>
                  </div>
                </div>
                <button class="btn btn-primary btn-sm" style="padding: 2px 8px; font-size: 10px;" onclick="store.addFriend('${u.id}')">Kết bạn</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // ---- TOGGLE THEME ----
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('xp_voca_theme', newTheme);
    this.renderNavbar();
    this.showToast('Giao diện', `Đã chuyển sang chế độ ${newTheme === 'dark' ? 'tối' : 'sáng'}`);
  },

  // ---- SIDEBAR ACTIONS ----
  toggleLeftSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) {
      const leftSidebar = sidebar.querySelector('.left-sidebar');
      const overlay = sidebar.querySelector('.sidebar-overlay');
      leftSidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    }
  },

  closeLeftSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) {
      const leftSidebar = sidebar.querySelector('.left-sidebar');
      const overlay = sidebar.querySelector('.sidebar-overlay');
      leftSidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  },

  // ---- DROPDOWNS ----
  toggleNotificationDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('notification-dropdown');
    dropdown.classList.toggle('active');
    document.getElementById('user-dropdown').classList.remove('active');
  },

  toggleUserDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('active');
    document.getElementById('notification-dropdown').classList.remove('active');
  },

  closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(d => d.classList.remove('active'));
  },

  markNotificationsRead() {
    store.markAllNotificationsRead();
    this.renderNavbar();
    this.showToast('Thông báo', 'Đã đánh dấu tất cả là đã đọc.');
  },

  // ---- TOASTS ----
  showToast(title, message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = '🔔';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // ---- LEVEL UP & XP REWARDS ----
  showXpGained(amount) {
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.innerHTML = `
      <div class="xp-popup-content text-center">
        <div class="xp-popup-icon">⚡</div>
        <div class="xp-popup-value">+${amount} XP</div>
        <div class="xp-popup-label">Kinh nghiệm</div>
      </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
  },

  showLevelUp(level, title) {
    const overlay = document.createElement('div');
    overlay.className = 'level-up-overlay';
    overlay.innerHTML = `
      <div class="level-up-content text-center">
        <div class="level-up-icon">⭐</div>
        <h1 class="level-up-title">LEVEL UP!</h1>
        <div class="level-up-level">Bạn đạt cấp ${level}</div>
        <div class="text-muted mb-6">${title}</div>
        <button class="btn btn-primary" onclick="this.closest('.level-up-overlay').remove()">Tiếp tục cuộc chiến</button>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  showAchievementUnlocked(ach) {
    const overlay = document.createElement('div');
    overlay.className = 'level-up-overlay';
    overlay.innerHTML = `
      <div class="level-up-content text-center">
        <div class="level-up-icon" style="font-size: 5rem; animation: bounce 1s infinite;">${ach.icon}</div>
        <h1 class="level-up-title" style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">HUY HIỆU MỚI!</h1>
        <div class="level-up-level" style="font-size: 24px; font-weight: 800;">${ach.name}</div>
        <div class="text-sm text-muted mb-4" style="color: white !important;">${ach.description}</div>
        <div class="results-xp-earned mb-6" style="margin-top: 10px;">+${ach.xpBonus} XP</div>
        <br>
        <button class="btn btn-primary" onclick="this.closest('.level-up-overlay').remove()">Tuyệt vời!</button>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  shareProgress() {
    const user = store.getCurrentUser();
    if (!user) return;
    this.showToast('Chia sẻ', 'Đã sao chép liên kết chia sẻ tiến độ học tập!');
    navigator.clipboard.writeText(`Tôi đang học từ vựng tiếng Anh trên XP English! Cấp độ hiện tại: Level ${user.level} (${user.title}). Cùng tham gia với tôi nhé!`);
  }
};

// Global click handler to close dropdowns
document.addEventListener('click', () => {
  Components.closeAllDropdowns();
});

// Sync themes on page load
const savedTheme = localStorage.getItem('xp_voca_theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Event Listeners for Store events
window.addEventListener('store_user_update', () => {
  Components.renderNavbar();
  Components.renderLeftSidebar();
  Components.renderRightSidebar();
});
window.addEventListener('store_user_changed', () => {
  Components.renderNavbar();
  Components.renderLeftSidebar();
  Components.renderRightSidebar();
});
window.addEventListener('store_notifications_update', () => {
  Components.renderNavbar();
});
window.addEventListener('store_friends_update', () => {
  Components.renderRightSidebar();
});
window.addEventListener('achievement_unlocked', (e) => {
  Components.showAchievementUnlocked(e.detail);
});
