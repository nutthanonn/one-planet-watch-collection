import { makeAutoObservable } from 'mobx';

export class AdminStoreImpl {
  reqest = 0;

  constructor() {
    makeAutoObservable(this);
  }
}

export const AdminStore = new AdminStoreImpl();
