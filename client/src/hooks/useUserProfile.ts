import UserProfileAPI from '@api/UserProfile';
import { UserProfileI } from '@interfaces/UserProfile';
import { useState, useEffect } from 'react';

export default function useUserProfile(username: string) {
  const [profile, setProfile] = useState<UserProfileI>();

  useEffect(() => {
    async function getUser(username: string) {
      const response = await UserProfileAPI(username);

      setProfile(response.data);
    }
    getUser(username);
  }, []);

  return { profile };
}
