import {makeAutoObservable, runInAction} from "mobx";

interface Offer {
  id: number;
  uid: number;
  name: string;
  describe?: string;
  price: number;
  values: number;
}

class OffersStore {
  offers: Offer[] = [];
  loading: boolean  = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchOffers = async () => {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const res = await fetch("http://localhost:3000/check-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
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
    } catch (err: any) {
      console.error("Error fetching offers:", err);
      runInAction(() => {
        this.error = err.message || "Error fetching offers";
        this.offers = [];
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export default new OffersStore();
