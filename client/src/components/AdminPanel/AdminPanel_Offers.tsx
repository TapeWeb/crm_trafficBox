import styles from "../../styles/components/AdminPanel/AdminPanel_Offers.module.scss";
import OfferStore from "../../stores/offer.store.ts";
import {Button} from "../UI/Button.tsx";
import {useEffect} from "react";
import {toJS} from "mobx";

export const AdminPanel_Offers = () => {
  useEffect(() => {
    OfferStore.fetchOffers().then(() => {
      console.log("Offers fetched successfully:", toJS(OfferStore.offers));
    });
  }, []);

  const removeOffer = async (offer: any) => {
    try {
      const response = await fetch(`http://localhost:3000/delete-offer/${offer.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId: offer.uid }),
      });

      if(!response.ok) throw new Error("Failed to remove offer.");

      console.log("Offer removed successfully");
      await OfferStore.fetchOffers();
    } catch (error) {
      console.error("Error removing offer:", error);
    }
  }

  return (
    <section className={styles.AdminPanel_OffersStructure}>
      <div className={styles.TablePanel_Offers}>
        <h1>Offers</h1>

        {OfferStore.loading ? (
          <p>Loading offers...</p>
        ) : OfferStore.error ? (
          <p style={{ color: "red" }}>{OfferStore.error}</p>
        ) : OfferStore.offers.length > 0 ? (
          <table className={styles.BoxTable}>
            <thead>
            <tr className={styles.InformationBoxTable}>
              <th>ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Describe</th>
              <th>Price</th>
              <th>Values</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {OfferStore.offers.map((offer: any) => (
              <tr key={offer.id} className={styles.InformationOffersBoxTable}>
                <td>{offer.id}</td>
                <td>{offer.uid}</td>
                <td>{offer.name}</td>
                <td>{offer.describe}</td>
                <td>{offer.price}</td>
                <td>{offer.values}</td>
                <td><Button content={"Delete"} onClick={() => removeOffer(offer)}/></td>
              </tr>
            ))}
            </tbody>
          </table>
        ) : (
          <p>No offers available.</p>
        )}
      </div>
    </section>
  )
};