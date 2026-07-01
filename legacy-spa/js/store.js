// ============================================================
// XP VOCA - State Management and Storage
// Handles localStorage persistence and game mechanics (XP, level)
// ============================================================

class AppStore {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    // If not exists, write defaults to localStorage
    if (!localStorage.getItem('xp_voca_initialized')) {
      localStorage.setItem('xp_voca_initialized', 'true');
      localStorage.setItem('xp_voca_users', JSON.stringify(MOCK_DATA.users));
      localStorage.setItem('xp_voca_vocab', JSON.stringify(MOCK_DATA.vocabularies));
      localStorage.setItem('xp_voca_posts', JSON.stringify(MOCK_DATA.posts));
      localStorage.setItem('xp_voca_groups', JSON.stringify(MOCK_DATA.studyGroups));
      localStorage.setItem('xp_voca_notifications', JSON.stringify(MOCK_DATA.notifications));
      
      // Current user is "u1" (Aministrator) by default
      localStorage.setItem('xp_voca_current_user_id', 'u1');

      // Learned vocabularies: array of { userId, vocabId, proficiency, lastPracticed, nextReview, isFavorite, history: [] }
      const initialLearned = [
        { userId: 'u1', vocabId: 'v1', proficiency: 5, lastPracticed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), nextReview: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), isFavorite: true },
        { userId: 'u1', vocabId: 'v2', proficiency: 4, lastPracticed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), nextReview: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), isFavorite: false },
        { userId: 'u1', vocabId: 'v3', proficiency: 3, lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), nextReview: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), isFavorite: false },
        { userId: 'u1', vocabId: 'v7', proficiency: 1, lastPracticed: new Date().toISOString(), nextReview: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), isFavorite: true },
        { userId: 'u1', vocabId: 'v8', proficiency: 2, lastPracticed: new Date().toISOString(), nextReview: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), isFavorite: false },
      ];
      localStorage.setItem('xp_voca_learned', JSON.stringify(initialLearned));

      // User unlocked achievements: array of { userId, achievementId, unlockedAt }
      const initialUnlockedAchievements = [
        { userId: 'u1', achievementId: 'a1', unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
        { userId: 'u1', achievementId: 'a2', unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { userId: 'u1', achievementId: 'a3', unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      ];
      localStorage.setItem('xp_voca_unlocked_achievements', JSON.stringify(initialUnlockedAchievements));

      // Friends of current user u1: Array of user IDs
      const initialFriends = ['u2', 'u3', 'u4', 'u6'];
      localStorage.setItem('xp_voca_friends_u1', JSON.stringify(initialFriends));
    }
  }

  // ---- USER METHODS ----
  getUsers() {
    return JSON.parse(localStorage.getItem('xp_voca_users'));
  }

  getCurrentUser() {
    const currentUserId = localStorage.getItem('xp_voca_current_user_id');
    if (!currentUserId) return null;
    const users = this.getUsers();
    return users.find(u => u.id === currentUserId) || null;
  }

  saveCurrentUser(user) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('xp_voca_users', JSON.stringify(users));
      // Dispatch storage event to update UI
      window.dispatchEvent(new Event('store_user_update'));
    }
  }

  setCurrentUser(userId) {
    localStorage.setItem('xp_voca_current_user_id', userId);
    window.dispatchEvent(new Event('store_user_changed'));
  }

  // ---- VOCABULARY METHODS ----
  getVocabularies() {
    return JSON.parse(localStorage.getItem('xp_voca_vocab'));
  }

  getLearnedVocabs() {
    return JSON.parse(localStorage.getItem('xp_voca_learned')) || [];
  }

  getLearnedByCurrentUser() {
    const user = this.getCurrentUser();
    if (!user) return [];
    const learned = this.getLearnedVocabs();
    return learned.filter(l => l.userId === user.id);
  }

  getWordLearningState(vocabId) {
    const user = this.getCurrentUser();
    if (!user) return null;
    const learned = this.getLearnedVocabs();
    return learned.find(l => l.userId === user.id && l.vocabId === vocabId) || null;
  }

  practiceWord(vocabId, isCorrect) {
    const user = this.getCurrentUser();
    if (!user) return { xpEarned: 0, levelUp: false };

    const learned = this.getLearnedVocabs();
    let wordState = learned.find(l => l.userId === user.id && l.vocabId === vocabId);
    let xpEarned = isCorrect ? 15 : 5;
    
    if (!wordState) {
      wordState = {
        userId: user.id,
        vocabId,
        proficiency: isCorrect ? 1 : 0,
        lastPracticed: new Date().toISOString(),
        nextReview: this.calculateNextReview(isCorrect ? 1 : 0),
        isFavorite: false
      };
      learned.push(wordState);
    } else {
      const oldProf = wordState.proficiency;
      let newProf = isCorrect ? oldProf + 1 : Math.max(0, oldProf - 1);
      if (newProf > 5) newProf = 5;
      
      wordState.proficiency = newProf;
      wordState.lastPracticed = new Date().toISOString();
      wordState.nextReview = this.calculateNextReview(newProf);
    }

    localStorage.setItem('xp_voca_learned', JSON.stringify(learned));

    // Award XP
    const result = this.awardXp(xpEarned);
    
    // Check if new word learning unlocks "Bước đầu" (a1) or "Bách từ" (a4)
    this.checkLearningAchievements();

    return {
      xpEarned,
      levelUp: result.levelUp,
      newLevel: user.level,
      newState: wordState
    };
  }

  calculateNextReview(proficiency) {
    const days = [1, 2, 4, 7, 14, 30]; // Spaced repetition intervals
    const intervalDays = days[Math.min(proficiency, days.length - 1)];
    const date = new Date();
    date.setDate(date.getDate() + intervalDays);
    return date.toISOString();
  }

  toggleFavorite(vocabId) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    const learned = this.getLearnedVocabs();
    let wordState = learned.find(l => l.userId === user.id && l.vocabId === vocabId);
    
    if (!wordState) {
      wordState = {
        userId: user.id,
        vocabId,
        proficiency: 0,
        lastPracticed: null,
        nextReview: null,
        isFavorite: true
      };
      learned.push(wordState);
    } else {
      wordState.isFavorite = !wordState.isFavorite;
    }
    
    localStorage.setItem('xp_voca_learned', JSON.stringify(learned));
    return wordState.isFavorite;
  }

  // ---- XP & LEVEL GAME MECHANICS ----
  awardXp(amount) {
    const user = this.getCurrentUser();
    if (!user) return { levelUp: false };

    user.totalXp += amount;
    let levelUp = false;

    // Check level ups
    while (user.level < MOCK_DATA.levelXp.length - 1 && user.totalXp >= MOCK_DATA.levelXp[user.level]) {
      user.level++;
      levelUp = true;
    }

    user.title = MOCK_DATA.levelTitles[user.level] || 'Novice';
    this.saveCurrentUser(user);

    if (levelUp) {
      this.addNotification({
        type: 'level',
        title: 'Level Up! 🎉',
        body: `Chúc mừng bạn đã thăng cấp lên Level ${user.level} - ${user.title}!`,
        icon: '⭐'
      });
    }

    return { levelUp };
  }

  // ---- NOTIFICATION METHODS ----
  getNotifications() {
    return JSON.parse(localStorage.getItem('xp_voca_notifications')) || [];
  }

  addNotification(notif) {
    const notifications = this.getNotifications();
    const newNotif = {
      id: 'n_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      isRead: false,
      createdAt: new Date().toISOString(),
      ...notif
    };
    notifications.unshift(newNotif);
    localStorage.setItem('xp_voca_notifications', JSON.stringify(notifications));
    window.dispatchEvent(new Event('store_notifications_update'));
    return newNotif;
  }

  markAllNotificationsRead() {
    const notifications = this.getNotifications();
    notifications.forEach(n => n.isRead = true);
    localStorage.setItem('xp_voca_notifications', JSON.stringify(notifications));
    window.dispatchEvent(new Event('store_notifications_update'));
  }

  // ---- COMMUNITY METHODS ----
  getPosts() {
    return JSON.parse(localStorage.getItem('xp_voca_posts')) || [];
  }

  createPost(content, vocabIds = []) {
    const user = this.getCurrentUser();
    if (!user) return null;

    const posts = this.getPosts();
    const newPost = {
      id: 'p_' + Date.now(),
      userId: user.id,
      content,
      vocabIds,
      postType: 'user_post',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      viewsCount: 1,
      createdAt: new Date().toISOString(),
      comments: [],
      likedBy: [] // Track users who liked
    };
    posts.unshift(newPost);
    localStorage.setItem('xp_voca_posts', JSON.stringify(posts));
    
    // Award social XP
    this.awardXp(20);
    return newPost;
  }

  likePost(postId) {
    const user = this.getCurrentUser();
    if (!user) return false;

    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return false;

    if (!post.likedBy) post.likedBy = [];

    const likedIndex = post.likedBy.indexOf(user.id);
    let isLiked = false;
    if (likedIndex === -1) {
      post.likedBy.push(user.id);
      post.likesCount++;
      isLiked = true;
      // Notify post author if not current user
      if (post.userId !== user.id) {
        this.addNotification({
          type: 'social',
          title: `${user.username} đã thích bài viết của bạn`,
          body: `"${post.content.substring(0, 30)}..."`,
          icon: '❤️'
        });
      }
    } else {
      post.likedBy.splice(likedIndex, 1);
      post.likesCount--;
      isLiked = false;
    }

    localStorage.setItem('xp_voca_posts', JSON.stringify(posts));
    return isLiked;
  }

  commentOnPost(postId, commentText) {
    const user = this.getCurrentUser();
    if (!user) return null;

    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    const newComment = {
      id: 'c_' + Date.now(),
      userId: user.id,
      content: commentText,
      likesCount: 0,
      createdAt: new Date().toISOString()
    };

    post.comments.push(newComment);
    post.commentsCount++;
    localStorage.setItem('xp_voca_posts', JSON.stringify(posts));

    // Notify post author if not current user
    if (post.userId !== user.id) {
      this.addNotification({
        type: 'social',
        title: `${user.username} đã bình luận bài viết của bạn`,
        body: `"${commentText.substring(0, 30)}..."`,
        icon: '💬'
      });
    }

    return newComment;
  }

  // ---- GROUP METHODS ----
  getGroups() {
    return JSON.parse(localStorage.getItem('xp_voca_groups')) || [];
  }

  joinGroup(groupId) {
    const user = this.getCurrentUser();
    if (!user) return false;

    const groups = this.getGroups();
    const group = groups.find(g => g.id === groupId);
    if (!group) return false;

    if (!group.members) group.members = [];
    if (group.members.includes(user.id)) return false;

    group.members.push(user.id);
    group.memberCount = group.members.length;
    localStorage.setItem('xp_voca_groups', JSON.stringify(groups));
    return true;
  }

  // ---- FRIENDS METHODS ----
  getFriends() {
    const user = this.getCurrentUser();
    if (!user) return [];
    
    // We store u1's friends locally. For other users we fetch from mock data users list.
    if (user.id === 'u1') {
      const friendIds = JSON.parse(localStorage.getItem('xp_voca_friends_u1')) || [];
      const users = this.getUsers();
      return users.filter(u => friendIds.includes(u.id));
    } else {
      // Mock other users' friends randomly
      const users = this.getUsers();
      return users.filter(u => u.id !== user.id).slice(0, 3);
    }
  }

  removeFriend(friendId) {
    const user = this.getCurrentUser();
    if (user.id !== 'u1') return false; // Simple logic only for u1 demo

    const friendIds = JSON.parse(localStorage.getItem('xp_voca_friends_u1')) || [];
    const index = friendIds.indexOf(friendId);
    if (index !== -1) {
      friendIds.splice(index, 1);
      localStorage.setItem('xp_voca_friends_u1', JSON.stringify(friendIds));
      window.dispatchEvent(new Event('store_friends_update'));
      return true;
    }
    return false;
  }

  addFriend(friendId) {
    const user = this.getCurrentUser();
    if (user.id !== 'u1') return false;

    const friendIds = JSON.parse(localStorage.getItem('xp_voca_friends_u1')) || [];
    if (!friendIds.includes(friendId)) {
      friendIds.push(friendId);
      localStorage.setItem('xp_voca_friends_u1', JSON.stringify(friendIds));
      window.dispatchEvent(new Event('store_friends_update'));
      
      const friend = this.getUsers().find(u => u.id === friendId);
      this.addNotification({
        type: 'friend',
        title: `Bạn đã kết bạn với ${friend ? friend.username : 'Người dùng'}`,
        body: 'Hãy cùng thi đua học tập nào!',
        icon: '🤝'
      });
      return true;
    }
    return false;
  }

  // ---- ACHIEVEMENTS PROGRESS & UNLOCK ----
  getUnlockedAchievements() {
    const user = this.getCurrentUser();
    if (!user) return [];
    const unlocked = JSON.parse(localStorage.getItem('xp_voca_unlocked_achievements')) || [];
    return unlocked.filter(a => a.userId === user.id);
  }

  unlockAchievement(achievementId) {
    const user = this.getCurrentUser();
    if (!user) return false;

    const unlocked = JSON.parse(localStorage.getItem('xp_voca_unlocked_achievements')) || [];
    const exists = unlocked.some(a => a.userId === user.id && a.achievementId === achievementId);
    if (exists) return false;

    unlocked.push({
      userId: user.id,
      achievementId,
      unlockedAt: new Date().toISOString()
    });
    localStorage.setItem('xp_voca_unlocked_achievements', JSON.stringify(unlocked));

    const ach = MOCK_DATA.achievements.find(a => a.id === achievementId);
    const xpBonus = ach ? ach.xpBonus : 50;
    this.awardXp(xpBonus);

    this.addNotification({
      type: 'achievement',
      title: 'Huy hiệu mới! 🏆',
      body: `Bạn đã mở khóa "${ach ? ach.name : 'Thành tựu'}"! +${xpBonus} XP`,
      icon: ach ? ach.icon : '🏆'
    });

    // Fire custom event for popup
    const event = new CustomEvent('achievement_unlocked', { detail: ach });
    window.dispatchEvent(event);

    return true;
  }

  checkLearningAchievements() {
    const learned = this.getLearnedByCurrentUser();
    const count = learned.filter(l => l.proficiency > 0).length;
    
    if (count >= 10) {
      this.unlockAchievement('a1'); // First Steps
    }
    if (count >= 100) {
      this.unlockAchievement('a4'); // Century
    }

    // Check mastery (proficiency = 5)
    const masteredCount = learned.filter(l => l.proficiency === 5).length;
    if (masteredCount >= 20) {
      this.unlockAchievement('a7'); // Super Memory
    }
  }

  checkStreakAchievements() {
    const user = this.getCurrentUser();
    if (!user) return;

    if (user.currentStreak >= 5) {
      this.unlockAchievement('a2');
    }
    if (user.currentStreak >= 7) {
      this.unlockAchievement('a3');
    }
    if (user.currentStreak >= 30) {
      this.unlockAchievement('a10');
    }
  }
}

// Instantiate global store
const store = new AppStore();
window.store = store;
