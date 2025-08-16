import { Fragment, useEffect, useState } from "react";
import styles from "../styles/pages/OffersPage.module.scss";
import { Button } from "../components/UI/Button.tsx";

interface Offer {
  oID: number;
  oUID: number;
  oName: string;
  oDescribe: string;
  oPrice: number;
  oValues: number;
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
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        return;
      }
      const result = await res.json();
      setOffers(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <Fragment>
      <title>TrafficBox - Offers</title>
      <section className={styles.OffersStructure}>
        <div className={styles.offerBox}>
          {offers.length > 0 ? (
            offers.map((offer) => (
              <div key={offer.oID} className={styles.productBox}>
                <h1>Name: {offer.oName}</h1>
                <p>Describe: {offer.oDescribe}</p>
                <p>Price: {offer.oPrice}$</p>
                <p>Values: {offer.oValues}</p>
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
}
