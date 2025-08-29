import { makeAutoObservable } from "mobx";

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
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchOffers = async () => {
    this.loading = true;
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
    } catch (err) {
      console.error(err);
      this.offers = [];
    } finally {
      this.loading = false;
    }
  };
}

export default new OffersStore();
