import { makeAutoObservable } from "mobx";

class TokenStore {
  token = "";

  constructor() {
    makeAutoObservable(this);
  }

  getToken = async () => {
    const localToken = localStorage.getItem("token");
    this.token = localToken || "";
    return this.token;
  };

  removeToken = () => {
    this.token = "";
    localStorage.removeItem("token");
    return this.token;
  };

  getUserByToken = async () => {
    const token = await this.getToken();
    if (!token) return null;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/getCurrentUser?token=${encodeURIComponent(token)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) {
        this.removeToken();
        return null;
      }

      const data = await res.json();
      if (data.error) {
        this.removeToken();
        return null;
      }

      return data;
    } catch (err) {
      console.error("TokenStore error:", err);
      this.removeToken();
      return null;
    }
  };
}

export default new TokenStore();
