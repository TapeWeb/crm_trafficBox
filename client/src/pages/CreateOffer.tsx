import { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/pages/CreateOffer.module.scss";
import { Button } from "../components/UI/Button.tsx";
import { useNavigate } from "react-router-dom";
import CreateOfferStore from "../stores/createOffer.store";
import TokenStore from "../stores/token.store.ts";
import Swal from "sweetalert2";

export const CreateOffer = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    TokenStore.getToken().then(async () => {
      if (!TokenStore.token) {
        await Swal.fire({
          icon: 'error',
          title: 'You are not authorized!',
          showConfirmButton: false,
          timer: 1500
        })
        return navigate("/");
      }

      return CreateOfferStore.fetchUserData(TokenStore.token).then();
    });
  }, []);

  return (
    <Fragment>
      <title>TrafficBox - Create offer</title>
      <section className={styles.CreateOfferStructure}>
        <div className={styles.createOfferBox}>
          <div className={styles.inputsBox}>
            <label>
              <h3>Your product name:</h3>
              <input
                type="text"
                value={CreateOfferStore.name}
                onChange={(e) => CreateOfferStore.setField("name", e.target.value)}
              />
            </label>
            <label>
              <h3>Description:</h3>
              <input
                type="text"
                value={CreateOfferStore.description}
                onChange={(e) => CreateOfferStore.setField("description", e.target.value)}
              />
            </label>
            <label>
              <h3>Price:</h3>
              <input
                type="number"
                value={CreateOfferStore.price}
                onChange={(e) => CreateOfferStore.setField("price", e.target.value)}
              />
            </label>
            <label>
              <h3>Value:</h3>
              <input
                type="number"
                value={CreateOfferStore.value}
                onChange={(e) => CreateOfferStore.setField("value", e.target.value)}
              />
            </label>
          </div>
          <div className={styles.buttonsBox}>
            <Button content={"Create"} onClick={() => CreateOfferStore.createOffer().then(() => navigate("/"))} />
          </div>
        </div>
      </section>
    </Fragment>
  )
});
