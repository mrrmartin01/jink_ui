export type User = {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  bio: string;
  location: string;
  website: string;
  birthDate: string;
  posts: string[];
  pinnedPostId: string[];
  likes: string[];
  bookmarks?: string[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
};
