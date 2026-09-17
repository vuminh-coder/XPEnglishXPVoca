export type CommunityTab = "FEED" | "LEADERBOARD" | "FRIENDS" | "GROUPS";

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  avatarEmoji?: string;
  content: string;
  createdAt?: string;
  timeAgo?: string;
}

export interface Post {
  id: string;
  author: string;
  avatar?: string;
  authorAvatar?: string;
  avatarEmoji?: string;
  meta: string;
  content: string;
  vocabTags?: string[];
  likes: number;
  commentsCount: number;
  liked: boolean;
  comments: Comment[];
  createdAt?: string;
}

export interface LeaderboardUser {
  id: string | number;
  fullName: string;
  username?: string;
  avatar?: string;
  avatarUrl?: string;
  avatarEmoji?: string;
  xp: number;
  level?: number;
  streak?: number;
  rank?: number;
  isCurrentUser?: boolean;
}

export interface FriendUser {
  id: string;
  fullName: string;
  username?: string;
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  avatarEmoji?: string;
  level?: number;
  title?: string;
  xp?: number;
}

export interface FriendRequest {
  id: string;
  sender: {
    id: string;
    fullName: string;
    username?: string;
    avatar?: string;
    avatarUrl?: string;
    imageUrl?: string;
    avatarEmoji?: string;
  };
}

export interface FriendSuggestion {
  id: string;
  fullName: string;
  username?: string;
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  avatarEmoji?: string;
  level?: number;
  title?: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  tag?: string;
  joined?: boolean;
}
