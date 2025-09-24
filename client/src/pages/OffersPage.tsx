import { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/pages/OffersPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import OffersStore from "../stores/offer.store.ts";
import Swal from "sweetalert2";
import OfferStore from "../stores/offer.store.ts";

export const OffersPage = observer(() => {
  useEffect(() => {
    OfferStore.fetchOffers().then(async () => {
      if(OfferStore.offers.length > 0) {
        return await Swal.fire({
          icon: 'success',
          title: 'Offers fetched successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      return await Swal.fire({
        icon: 'error',
        title: 'Offers not fetched!',
        showConfirmButton: false,
      });
    });
  }, []);

  const renderOffers = () => {
    const data = () => {
      return (
        <Fragment>
          <title>TrafficBox - Offers</title>
          <section className={styles.OffersStructure}>
            <div className={styles.offerBox}>
              {OffersStore.loading ? (
                <p>Loading offers...</p>
              ) : OffersStore.offers.length > 0 ? (
                OffersStore.offers.map((offer, index) => (
                  <div key={offer.id ?? index} className={styles.productBox}>
                    <h1>Name: {offer.name}</h1>
                    <p>Describe: {offer.description}</p>
                    <p>Price: {offer.price}$</p>
                    <p>Values: {offer.value}</p>
                    <Button
                      content={"Quick buy"}
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, buy it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            return Swal.fire({
                              icon: "success",
                              title: "Your order has been placed!",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          }
                        })
                      }
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
      )
    }
    return data();
  }
  return renderOffers();
});
