import {Fragment, useEffect, useState} from "react";
import styles from "../styles/pages/CreateOffer.module.scss"
import {Button} from "../components/UI/Button.tsx";
import {useNavigate} from "react-router-dom";



export function CreateOffer() {
  const [uToken, setUToken] = useState("");
  const [Id, setId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("uToken");
    if (!token) return;

    setUToken(token);
    getData(token)
      .then(() => console.log("Successfully created."))
      .catch(err => console.error("Error loading user:", err));
  }, []);


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
  }

  const sendQuery = async () => {
    if (!Id) {
      return;
    }
    if (!name || !description || !price || !value) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Id,
          name,
          description,
          price: Number(price),
          value: Number(value),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert(errorText);
        return;
      }

      const result = await res.json();
      alert(result.message || "Offer created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <title>TrafficBox - Create offer</title>
      <section className={styles.CreateOfferStructure}>
        <div className={styles.createOfferBox}>
          <div className={styles.inputsBox}>
            <label>
              <h3>Your product name:</h3>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              <h3>Description:</h3>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <label>
              <h3>Price:</h3>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </label>
            <label>
              <h3>Value:</h3>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)}/>
            </label>
          </div>
          <div className={styles.buttonsBox}>
            <Button content={"Create"} onClick={sendQuery}/>
          </div>
        </div>
      </section>
    </Fragment>
  )
}