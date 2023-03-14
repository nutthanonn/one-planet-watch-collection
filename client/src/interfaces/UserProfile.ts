export interface UserProfileI {
  username: string;
  email: string;
  avatar?: string;
  bio?:string
  background_profile?: string;
  follower: string[];
  following: string[];
  verified: boolean;
  membership: boolean;
  created_at: Date;
}
