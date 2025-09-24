import { useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/pages/MyOffersPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import MyOffersStore from "../stores/myOffer.store.ts";
import TokenStore from "../stores/token.store.ts";
import Swal from "sweetalert2";
import UserStore from "../stores/user.store.ts";
import {toJS} from "mobx";

export const MyOffersPage = observer(() => {
  useEffect(() => {
    TokenStore.getToken().then(async () => {
      if (!TokenStore.token) {
        await Swal.fire({
          icon: 'error',
          title: 'You are not authorized!',
          showConfirmButton: false,
          timer: 1500
        });
        return await UserStore.logOut();
      }
      return MyOffersStore.fetchMyOffers(TokenStore.token).then(() => {
        console.log(toJS(MyOffersStore.offers));
      });
    });
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
            MyOffersStore.offers.map((offer, index) => (
              <div key={offer.id ?? index} className={styles.productBox}>
                <h1>Name: {offer.name}</h1>
                <p>Describe: {offer.description}</p>
                <p>Price: {offer.price}$</p>
                <p>Values: {offer.value}</p>
                <Button
                  content={"Delete"}
                  onClick={() => MyOffersStore.deleteOffer(offer.id)}
                />
              </div>
            ))
          )}
          <Button content={"Return"} link={"/"} />
        </div>
      </section>
    </Fragment>
  );
});
