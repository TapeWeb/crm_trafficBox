import { makeAutoObservable, runInAction } from "mobx";

interface Offer {
  id: number;
  uid: number;
  name: string;
  description?: string;
  price: number;
  value: number;
}

class MyOffersStore {
  offers: Offer[] = [];
  loading = false;
  uID: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  fetchMyOffers = async (token?: string) => {
    this.setLoading(true);
    try {
      if (!this.uID) {
        if (!token) {
          console.error("No token provided, cannot fetch user.");
          return;
        }

        const resUser = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/getCurrentUser?token=${encodeURIComponent(token)}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (!resUser.ok) throw new Error(await resUser.text());

        const userData = await resUser.json();
        runInAction(() => {
          this.uID = userData.id;
        });
      }

      const resOffers = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/getMyOffers?id=${this.uID}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!resOffers.ok) throw new Error(await resOffers.text());

      const offers = await resOffers.json();
      runInAction(() => {
        this.offers = Array.isArray(offers)
          ? offers.map((offer: any) => ({
            id: offer.id,
            uid: offer.uid,
            name: offer.name,
            description: offer.description,
            price: offer.price,
            value: offer.value,
          }))
          : [];
      });
    } catch (err) {
      console.error("Error fetching offers:", err);
      runInAction(() => (this.offers = []));
    } finally {
      this.setLoading(false);
    }
  };


  deleteOffer = async (offerId: number) => {
    this.setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/deleteOffer?id=${offerId}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) console.error(await res.text());

      runInAction(() => {
        this.offers = this.offers.filter((offer) => offer.id !== offerId);
      });
    } catch (err) {
      console.error("Error deleting offer:", err);
    } finally {
      this.setLoading(false);
    }
  };
}

export default new MyOffersStore();
