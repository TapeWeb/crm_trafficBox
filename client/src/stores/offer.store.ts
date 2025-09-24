import { makeAutoObservable, runInAction } from "mobx";
import Swal from "sweetalert2";

interface Offer {
  id: number;
  uid: number;
  name: string;
  description?: string;
  price: number;
  value: number;
}

class OffersStore {
  offers: Offer[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  fetchOffers = async () => {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/getAllOffers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();

      runInAction(() => {
        this.offers = Array.isArray(result)
          ? result.map((offer: any) => ({
            id: offer.id,
            uid: offer.uid,
            name: offer.name,
            description: offer.description,
            price: offer.price,
            value: offer.value,
          }))
          : [];
      });
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Failed to load offers!",
        showConfirmButton: false,
        timer: 1500,
      });

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

  removeOffer = async (offer: Offer) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/deleteOffer/${offer.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ offerId: offer.uid }),
        }
      );

      if (!response.ok)
        return Swal.fire({
          icon: "error",
          title: "Failed to remove offer!",
          showConfirmButton: false,
          timer: 1500,
        });

      await Swal.fire({
        icon: "success",
        title: "Offer removed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      await this.fetchOffers();
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Failed to remove offer!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
}

export default new OffersStore();
