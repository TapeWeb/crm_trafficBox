import { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/pages/OffersPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import OffersStore from "../stores/offer.store.ts";

export const OffersPage = observer(() => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await OffersStore.fetchOffers();
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchData();
  }, []);


  return (
    <Fragment>
      <title>TrafficBox - Offers</title>
      <section className={styles.OffersStructure}>
        <div className={styles.offerBox}>
          {OffersStore.loading ? (
            <p>Loading offers...</p>
          ) : OffersStore.offers.length > 0 ? (
            OffersStore.offers.map((offer) => (
              <div key={offer.id} className={styles.productBox}>
                <h1>Name: {offer.name}</h1>
                <p>Describe: {offer.describe}</p>
                <p>Price: {offer.price}$</p>
                <p>Values: {offer.values}</p>
                <Button
                  content={"Quick buy"}
                  onClick={() => alert("Buy is not available!")}
                />
              </div>
            ))
          ) : (
            <p>No offers available.</p>
          )}

          <div className={styles.buttonsBox}>
            <Button content={"Create offer!"} link={"/createOffer"} />
            <Button content={"Return"} link={"/"} />
          </div>
        </div>
      </section>
    </Fragment>
  );
});
