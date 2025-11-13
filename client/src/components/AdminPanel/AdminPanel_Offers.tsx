import { useEffect, Fragment } from "react";
import {observer} from "mobx-react-lite";
import OfferStore from "../../stores/offer.store.ts";
import NotifyStore from "../../stores/notify.store.ts";
import styles from "../../styles/components/AdminPanel/AdminPanel_Offers.module.scss";
import {Button} from "../UI/Button.tsx";
import Swal from "sweetalert2";

export const AdminPanel_Offers = observer(() => {
  useEffect(() => {
    OfferStore.fetchOffers().then(async () => {
      if(OfferStore.offers.length > 0) {
        await Swal.fire({
          icon: 'success',
          title: 'Offers fetched successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }, []);

  return (
    <Fragment>
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
                  <tr key={`${offer.uid}-${offer.id}`} className={styles.InformationOffersBoxTable}>
                    <td>{offer.id}</td>
                    <td>{offer.uid}</td>
                    <td>{offer.name}</td>
                    <td>{offer.description}</td>
                    <td>{offer.price}</td>
                    <td>{offer.value}</td>
                    <td>
                      <Button
                        content={"Delete"}
                        onClick={() => NotifyStore.askRemoveOfferNotify(offer)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
            </table>
          ) : (
            <p style={{ color: "#333" }}>No offers available.</p>
          )}
        </div>
      </section>
    </Fragment>
  );
});
