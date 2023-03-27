export interface Post {
  id: string;
  images: string[];
  description: string;
}
export interface UserProfileI {
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  background_profile?: string;
  follower: string[];
  following: string[];
  verified: boolean;
  membership: boolean;
  posts: Post[];
  created_at: Date;
}
