import { Claims } from '@api/Auth';
import UserProfileAPI from '@api/UserProfile';
import { makeAutoObservable } from 'mobx';

export class MyProfileImpl {
  favorite_list: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getMyProfile(claims: Claims | null) {
    if (claims) {
      const res = await UserProfileAPI(claims.name);
      if (res.error) {
        return;
      }
      this.setFavoriteList(res.data.favorite_list);
    }
  }

  setFavoriteList(val: string[]) {
    this.favorite_list = val;
  }

  addFavoriteList(val: string) {
    this.favorite_list.push(val);
  }

  removeFavoriteList(val: string) {
    this.favorite_list = this.favorite_list.filter((item) => item !== val);
  }
}

export const MyProfileStore = new MyProfileImpl();
