import { Fragment, useEffect } from "react";
import styles from "../styles/pages/ProfilePage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../stores/user.store";

export const ProfilePage = observer(() => {
  const navigate = useNavigate();

  const logOut = () => {
    UserStore.removeAllData();
    localStorage.removeItem("uToken");
    navigate("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("uToken");
    if (storedToken) {
      fetch("http://localhost:3000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: storedToken }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          UserStore.changeData("name", data.name);
          UserStore.changeData("surname", data.surname);
          UserStore.changeData("age", String(data.age));
          UserStore.changeData("email", data.email);
          UserStore.changeData("gender", data.gender);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          logOut();
        });
    }
  }, []);

  const token = localStorage.getItem("uToken");

  return (
    <Fragment>
      <title>TrafficBox - Profile</title>
      <section className={styles.myProfileStructure}>
        {token ? (
          <div className={styles.profileBox}>
            <h1>Welcome to your profile!</h1>
            <div className={styles.dataBox}>
              <h6>
                Your name: <p>{UserStore.name || ""} {UserStore.surname || ""}</p>
              </h6>
              <h6>
                Your email: <p>{UserStore.email || ""}</p>
              </h6>
              <h6>
                Your age: <p>{UserStore.age ? Number(UserStore.age) : ""}</p>
              </h6>
              <h6>
                Your gender: <p>{UserStore.gender || ""}</p>
              </h6>
            </div>
            <div className={styles.buttonsBox}>
              <Button content="Logout" onClick={logOut} />
              <Button content="Return" link="/" />
            </div>
            <Button content="Offers" link="/offers" />
            <Button content="Your offers" link="/myOffers" />
          </div>
        ) : (
          <h1>This page is unknown. Please authorize.</h1>
        )}
      </section>
    </Fragment>
  );
});
