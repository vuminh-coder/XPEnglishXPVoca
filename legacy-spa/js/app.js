// ============================================================
// XP VOCA - Core Application Orchestrator
// Handles routing, main layouts, navigation show/hide, and initialization
// ============================================================

class App {
  constructor() {
    this.container = null;
    this.currentRoute = 'landing';
  }

  init() {
    this.container = document.getElementById('app-view-container');
    
    // Hash router listener
    window.addEventListener('hashchange', () => this.handleRouting());
    
    // Initial routing
    this.handleRouting();

    // Init theme
    const savedTheme = localStorage.getItem('xp_voca_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  handleRouting() {
    const hash = window.location.hash.substring(1) || 'landing';
    this.currentRoute = hash;

    // Check auth permission
    const user = store.getCurrentUser();
    const publicPages = ['landing', 'auth'];

    if (!user && !publicPages.includes(hash)) {
      window.location.hash = '#landing';
      return;
    }

    if (user && hash === 'auth') {
      window.location.hash = '#dashboard';
      return;
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render corresponding page view
    this.renderView();
  }

  renderView() {
    if (!this.container) return;

    // Hide dropdowns on page switch
    Components.closeAllDropdowns();

    // Map route strings to Pages module functions
    switch (this.currentRoute) {
      case 'landing':
        Pages.renderLanding(this.container);
        break;
      case 'auth':
        Pages.renderAuth(this.container);
        break;
      case 'dashboard':
        Pages.renderDashboard(this.container);
        break;
      case 'vocabulary':
        Pages.renderVocabulary(this.container);
        break;
      case 'myvocab':
        Pages.renderMyVocab(this.container);
        break;
      case 'practice':
        Pages.renderPractice(this.container);
        break;
      case 'community':
        Pages.renderCommunity(this.container);
        break;
      case 'review':
        Pages.renderReview(this.container);
        break;
      case 'aichat':
        Pages.renderAiChat(this.container);
        break;
      case 'profile':
        Pages.renderProfile(this.container);
        break;
      case 'admin':
        Pages.renderAdmin(this.container);
        break;
      default:
        // 404 fallback
        window.location.hash = '#landing';
        break;
    }
  }

  navigateTo(pageHash) {
    window.location.hash = `#${pageHash}`;
  }

  logout() {
    localStorage.removeItem('xp_voca_current_user_id');
    Components.showToast('Tài khoản', 'Đăng xuất thành công.');
    this.navigateTo('landing');
  }

  showNavigation() {
    document.body.classList.remove('no-navigation');
    
    const header = document.getElementById('app-header');
    const sidebar = document.getElementById('app-sidebar');
    const rightBar = document.getElementById('app-right-sidebar');

    if (header) {
      header.classList.remove('hidden');
      Components.renderNavbar();
    }
    if (sidebar) {
      sidebar.classList.remove('hidden');
      Components.renderLeftSidebar();
    }
    if (rightBar) {
      rightBar.classList.remove('hidden');
      Components.renderRightSidebar();
    }
  }

  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Global App Orchestrator instantiation
const app = new App();
window.app = app;

// Start app once document is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
