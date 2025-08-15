import {Fragment, useEffect, useState} from "react";
import styles from "../styles/pages/MyOffersPage.module.scss"
import {Button} from "../components/UI/Button.tsx";


interface Offer {
  oID: number;
  oUID: number;
  oName: string;
  oDescribe: string;
  oPrice: number;
  oValues: string;
}


export function MyOffersPage() {
  const [Id, setId] = useState("");
  const [uToken, setUToken] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);


  const getData = async(token: string) => {
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
      console.log(result);

      setId(result.id);
    } catch (err) {
      console.error(err);
    }
  };

  const sendQuery = async () => {
    if (!Id) {
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/check-my-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Id }),
      });


      if (!res.ok) {
        const errorText = await res.text();
        alert(errorText);
        return;
      }

      const result = await res.json();
      setOffers(result.offers);
    } catch (err) {
      console.error(err);
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
    getData(token).catch(err => console.error("Error loading user:", err));
  }, []);

  useEffect(() => {
    if (Id) {
      sendQuery().catch(err => console.error("Error loading offers:", err));
    }
  }, [Id]);



  return (
    <Fragment>
      <title>TrafficBox - My Offers</title>
      <section className={styles.MyOffersStructure}>
        <div className={styles.MyOffersBox}>
          {offers.map((offer) => (
            <div key={offer.oID} className={styles.productBox}>
              <h1>Name: {offer.oName}</h1>
              <p>Describe: {offer.oDescribe}</p>
              <p>Price: {offer.oPrice}$</p>
              <p>Values: {offer.oValues}</p>
              <Button content={"Delete"} onClick={() => deleteOffer(offer.oID)}/>
            </div>
          ))}
          <Button content={"Return"} link={"/"}/>
        </div>
      </section>
    </Fragment>
  )
}