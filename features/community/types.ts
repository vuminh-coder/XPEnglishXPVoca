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
