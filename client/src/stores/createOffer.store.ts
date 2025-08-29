import { makeAutoObservable, runInAction } from "mobx";

class CreateOfferStore {
  uToken = "";
  uID: number | null = null;
  name = "";
  description = "";
  price = "";
  value = "";

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: keyof CreateOfferStore, value: any) {
    (this as any)[field] = value;
  }

  fetchUserData = async (token: string) => {
    try {
      const res = await fetch("http://localhost:3000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uToken: token }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      runInAction(() => {
        this.uID = result.uID;
        this.uToken = token;
      });
    } catch (err) {
      console.error("Error loading user:", err);
    }
  };

  createOffer = async () => {
    if (!this.uToken) {
      alert("User not authorized.");
      return;
    }
    if (!this.name || !this.description || !this.price || !this.value) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/create-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oName: this.name,
          oDescribe: this.description,
          oPrice: Number(this.price),
          oValues: Number(this.value),
          token: this.uToken,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      alert(data.message || "Offer created successfully!");
      runInAction(() => {
        this.name = "";
        this.description = "";
        this.price = "";
        this.value = "";
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export default new CreateOfferStore();
