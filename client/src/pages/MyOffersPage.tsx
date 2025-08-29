// src/pages/MyOffersPage.tsx
import { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/pages/MyOffersPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import MyOffersStore from "../stores/myOffer.store.ts";

export const MyOffersPage = observer(() => {
  useEffect(() => {
    const token = localStorage.getItem("uToken");
    if (token) {
      MyOffersStore.fetchUserData(token).then(() => {
        MyOffersStore.fetchMyOffers();
      });
    }
  }, []);

  return (
    <Fragment>
      <title>TrafficBox - My Offers</title>
      <section className={styles.MyOffersStructure}>
        <div className={styles.MyOffersBox}>
          {MyOffersStore.loading ? (
            <h1>Loading...</h1>
          ) : MyOffersStore.offers.length === 0 ? (
            <h1>No offers found.</h1>
          ) : (
            MyOffersStore.offers.map((offer) => (
              <div key={offer.id} className={styles.productBox}>
                <h1>Name: {offer.name}</h1>
                <p>Describe: {offer.describe}</p>
                <p>Price: {offer.price}$</p>
                <p>Values: {offer.values}</p>
                <Button content={"Delete"} onClick={() => MyOffersStore.deleteOffer(offer.id)} />
              </div>
            ))
          )}
          <Button content={"Return"} link={"/"} />
        </div>
      </section>
    </Fragment>
  );
});
