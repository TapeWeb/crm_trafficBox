import { makeAutoObservable } from "mobx";


class TokenStore {
  token = "";

  constructor() {
    makeAutoObservable(this);
  }

  getToken() {
    const storedToken = localStorage.getItem("uToken");
    if (storedToken) {
      this.token = storedToken;
      return storedToken;
    }
    return null;
  }
}

export default new TokenStore();
