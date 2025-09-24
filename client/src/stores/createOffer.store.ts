import {makeAutoObservable, runInAction} from "mobx";
import Swal from "sweetalert2";
import TokenStore from "./token.store.ts";

class CreateOfferStore {
  token = "";
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
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/getCurrentUser?token=${encodeURIComponent(token)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) return console.error(await res.text());
      const result = await res.json();
      runInAction(() => {
        this.uID = result.uID;
        this.token = token;
      });
    } catch (err) {
      console.error("Error loading user:", err);
    }
  };

  createOffer = async () => {
    const localToken = this.fetchUserData(TokenStore.token);
    if (!localToken) {
      return await Swal.fire({
        icon: 'error',
        title: 'Please log in to create an offer!',
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (!this.name || !this.description || !this.price || !this.value) {
      await Swal.fire({
        icon: 'error',
        title: 'Please fill in all fields!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/createOffer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          price: Number(this.price),
          value: Number(this.value),
          token: this.token,
        }),
      });
      if (!res.ok) return console.error(await res.text());
      const data = await res.json();
      await Swal.fire({
        icon: 'success',
        title: 'Offer created successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      runInAction(() => {
        this.name = "";
        this.description = "";
        this.price = "";
        this.value = "";
      });

      return data;
    } catch (err) {
      console.error(err);
    }
  };
}

export default new CreateOfferStore();
