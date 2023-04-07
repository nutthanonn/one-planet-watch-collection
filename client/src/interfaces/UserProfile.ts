export interface Post {
  id: string;
  images: string[];
  description: string;
  created_at?: string;
}

export interface UserProfileI {
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  background_profile?: string;
  follower: string[];
  following: string[];
  favorite_list: string[];
  verified: boolean;
  membership: boolean;
  posts: Post[];
  created_at: Date;
}
