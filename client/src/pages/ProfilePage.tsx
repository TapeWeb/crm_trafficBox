import { Fragment, useEffect, useState } from "react";
import styles from "../styles/pages/ProfilePage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const [uToken, setUToken] = useState("");
  const [uName, setUName] = useState("");
  const [uSurname, setUSurname] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uAge, setUAge] = useState("");
  const [uGender, setUGender] = useState("");

  const navigate = useNavigate();

  const fetchUserData = async (token: string) => {
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

      setUName(result.name);
      setUSurname(result.surname);
      setUEmail(result.email);
      setUAge(result.age ? String(result.age) : "");
      setUGender(result.gender);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const logOut = () => {
    localStorage.removeItem("uToken");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("uToken");
    if (token) {
      setUToken(token);
      fetchUserData(token);
    }
  }, []);

  return (
    <Fragment>
      <title>TrafficBox - Profile</title>
      <section className={styles.myProfileStructure}>
        {uToken ? (
          <div className={styles.profileBox}>
            <h1>Welcome to your profile!</h1>
            <div className={styles.dataBox}>
              <h6>
                Your name: <p>{uName} {uSurname}</p>
              </h6>
              <h6>
                Your email: <p>{uEmail}</p>
              </h6>
              <h6>
                Your age: <p>{uAge}</p>
              </h6>
              <h6>
                Your gender: <p>{uGender}</p>
              </h6>
            </div>
            <div className={styles.buttonsBox}>
              <Button content={"Logout"} onClick={logOut} />
              <Button content={"Return"} link={"/"} />
            </div>
            <Button content={"Offers"} link={"/offers"} />
            <Button content={"Your offers"} link={"/myOffers"} />
          </div>
        ) : (
          <h1>This page is unknown. Please authorize.</h1>
        )}
      </section>
    </Fragment>
  );
}
