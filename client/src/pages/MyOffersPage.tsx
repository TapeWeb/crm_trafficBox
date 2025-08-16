import { Fragment, useEffect, useState } from "react";
import styles from "../styles/pages/MyOffersPage.module.scss";
import { Button } from "../components/UI/Button.tsx";

interface Offer {
  oID: number;
  oUID: number;
  oName: string;
  oDescribe: string;
  oPrice: number;
  oValues: number;
}

export function MyOffersPage() {
  const [uToken, setUToken] = useState<string | null>(null);
  const [uID, setUID] = useState<number | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  const getUserData = async (token: string) => {
    try {
      const res = await fetch("http://localhost:3000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uToken: token }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert(errorText);
        return;
      }

      const result = await res.json();
      console.log("Fetched user data:", result);
      setUID(result.uID);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchMyOffers = async (userId: number) => {
    try {
      const res = await fetch("http://localhost:3000/check-my-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert(errorText);
        return;
      }

      const result = await res.json();
      setOffers(Array.isArray(result) ? result : []);
      console.log("Fetched offers:", result);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  const deleteOffer = async (offerId: number) => {
    try {
      const res = await fetch("http://localhost:3000/delete-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oID: offerId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert(errorText);
        return;
      }

      setOffers((prev) => prev.filter((offer) => offer.oID !== offerId));
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("uToken");
    if (!token) return;

    setUToken(token);
    getUserData(token).catch(console.error);
  }, []);

  useEffect(() => {
    if (uID !== null) {
      fetchMyOffers(uID).catch(console.error);
    }
  }, [uID]);

  return (
    <Fragment>
      <title>TrafficBox - My Offers</title>
      <section className={styles.MyOffersStructure}>
        <div className={styles.MyOffersBox}>
          {offers.length === 0 ? (
            <h1>No offers found.</h1>
          ) : (
            offers.map((offer) => (
              <div key={offer.oID} className={styles.productBox}>
                <h1>Name: {offer.oName}</h1>
                <p>Describe: {offer.oDescribe}</p>
                <p>Price: {offer.oPrice}$</p>
                <p>Values: {offer.oValues}</p>
                <Button content={"Delete"} onClick={() => deleteOffer(offer.oID)} />
              </div>
            ))
          )}
          <Button content={"Return"} link={"/"} />
        </div>
      </section>
    </Fragment>
  );
}
