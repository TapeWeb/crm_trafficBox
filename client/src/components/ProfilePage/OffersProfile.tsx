import {Fragment, useEffect} from "react";
import Swal from "sweetalert2";

import styles from "../../styles/components/ProfilePage/OffersProfile.module.scss";
import { Button } from "../UI/Button.tsx";

import TokenStore from "../../stores/token.store.ts";
import UserStore from "../../stores/user.store.ts";
import MyOffersStore from "../../stores/myOffer.store.ts";
import { observer } from "mobx-react-lite";

export const OffersProfile = observer(() => {
  useEffect(() => {
    (async () => {
      await TokenStore.getToken();

      if (!TokenStore.token) {
        await Swal.fire({
          icon: "error",
          title: "You are not authorized!",
          showConfirmButton: false,
          timer: 1500,
        });
        await UserStore.logOut();
        return;
      }

      try {
        await MyOffersStore.fetchMyOffers(TokenStore.token);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
        await Swal.fire({
          icon: "error",
          title: "Failed to load offers",
          text: (error as Error).message || "Something went wrong",
          showConfirmButton: true,
        });
      }
    })();
  }, []);

  const handleQuickBuy = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, buy it!",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "Your order has been placed!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Fragment>
      <section className={styles.OffersProfile}>
        <h1 className={styles.WelcomeOffers}>Welcome to your offers</h1>

        <div className={styles.OffersBox}>
          {MyOffersStore.error ? (
            <p className={styles.Error}>Error loading offers: {MyOffersStore.error}</p>
          ) : MyOffersStore.loading ? (
            <p>Loading offers...</p>
          ) : MyOffersStore.offers.length > 0 ? (
            MyOffersStore.offers.map((offer) => (
              <div key={offer.id} className={styles.ProductBox}>
                <h1>Name: {offer.name}</h1>
                <p>Description: {offer.description}</p>
                <p>Price: {offer.price}$</p>
                <p>Values: {offer.value}</p>

                <Button
                  content="💼 Quick buy"
                  variant="primary"
                  isAnimated={true}
                  size="small"
                  onClick={handleQuickBuy}
                />
              </div>
            ))
          ) : (
            <p>No offers available.</p>
          )}
        </div>

        <div className={styles.OthersButtonsBox}>
          <Button
            content="Create offer!"
            link="/createOffer"
            variant="primary"
            size="small"
            isAnimated={true}
          />
        </div>
      </section>
    </Fragment>
  );
});
