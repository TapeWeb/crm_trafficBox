import { makeAutoObservable, runInAction } from "mobx";

interface Offer {
  id: number;
  uid: number;
  name: string;
  description?: string;
  price: number;
  value: number;
}

interface UserData {
  id: number;
}

class MyOffersStore {
  offers: Offer[] = [];
  loading = false;
  error: string | null = null;
  uID: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  async fetchUserId(token: string): Promise<number> {
    const resUser = await fetch(
      `${import.meta.env.VITE_SERVER_API_URL}/getCurrentUser?token=${encodeURIComponent(token)}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!resUser.ok) {
      throw new Error(await resUser.text());
    }

    const userData: UserData = await resUser.json();
    runInAction(() => {
      this.uID = userData.id;
    });
    return userData.id;
  }

  async fetchMyOffers(token?: string): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      if (!this.uID) {
        if (!token) {
          throw new Error("No token provided, cannot fetch user.");
        }
        await this.fetchUserId(token);
      }

      const resOffers = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/getMyOffers?id=${this.uID}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!resOffers.ok) {
        throw new Error(await resOffers.text());
      }

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
      runInAction(() => {
        this.offers = [];
        this.setError(err instanceof Error ? err.message : "Unknown error");
      });
      console.error("Error fetching offers:", err);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteOffer(offerId: number): Promise<boolean> {
    this.setLoading(true);
    this.setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/deleteOffer/${offerId}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) {
        const errorText = await res.text();
        this.setError(errorText);
        console.error(errorText);
        return false;
      }

      runInAction(() => {
        this.offers = this.offers.filter((offer) => offer.id !== offerId);
      });

      return true;
    } catch (err) {
      this.setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error deleting offer:", err);
      return false;
    } finally {
      this.setLoading(false);
    }
  }
}

export default new MyOffersStore();
