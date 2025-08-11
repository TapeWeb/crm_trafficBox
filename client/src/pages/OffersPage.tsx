import { Fragment, useEffect, useState } from "react";
import styles from "../styles/pages/OffersPage.module.scss";
import {Button} from "../components/UI/Button.tsx";

interface Offer {
  oID: number;
  oUID: number;
  oName: string;
  oDescribe: string;
  oPrice: number;
  oValues: string;
}

export function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    sendQuery();
  }, []);

  const sendQuery = async () => {
    try {
      const res = await fetch("http://localhost:3000/check-offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return;
      }

      const result = await res.json();
      setOffers(result.offers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <title>TrafficBox - Offers</title>
      <section className={styles.OffersStructure}>
        <div className={styles.offerBox}>
          {offers.map((offer) => (
            <div key={offer.oID} className={styles.productBox}>
              <h1>Name: {offer.oName}</h1>
              <p>Describe: {offer.oDescribe}</p>
              <p>Price: {offer.oPrice}$</p>
              <p>Values: {offer.oValues}</p>
              <Button content={"Quick buy"} onClick={() => {
                alert("Buy is not available!");
              }}/>
            </div>
          ))}
          <div className={styles.buttonsBox}>
            <Button content={"Create offer!"} link={"/createOffer"}/>
            <Button content={"Return"} link={"/"}/>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
