// src/stores/myOffers.store.ts
import { makeAutoObservable, runInAction } from "mobx";

interface Offer {
  id: number;
  uid: number;
  name: string;
  describe?: string;
  price: number;
  values: number;
}

class MyOffersStore {
  offers: Offer[] = [];
  loading = false;
  uID: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUserData = async (token: string) => {
    this.loading = true;
    try {
      const res = await fetch("http://localhost:3000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uToken: token }),
      });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
      runInAction(() => {
        this.uID = result.uid;
      });
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  fetchMyOffers = async () => {
    if (this.uID === null) return;

    this.loading = true;
    try {
      const res = await fetch("http://localhost:3000/check-my-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: this.uID }),
      });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
      runInAction(() => {
        this.offers = Array.isArray(result)
          ? result.map((offer: any) => ({
            id: offer.oid,
            uid: offer.ouid,
            name: offer.oname,
            describe: offer.odescribe,
            price: offer.oprice,
            values: offer.ovalues,
          }))
          : [];
      });
    } catch (err) {
      console.error("Error fetching offers:", err);
      runInAction(() => (this.offers = []));
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  deleteOffer = async (offerId: number) => {
    try {
      const res = await fetch("http://localhost:3000/delete-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oid: offerId }),
      });

      if (!res.ok) throw new Error(await res.text());

      runInAction(() => {
        this.offers = this.offers.filter((offer) => offer.id !== offerId);
      });
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };
}

export default new MyOffersStore();
