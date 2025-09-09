import { Fragment, useEffect } from "react";
import styles from "../styles/pages/ProfilePage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import UserStore from "../stores/user.store";

export const ProfilePage = observer(() => {
  const navigate = useNavigate();

  const logOut = () => {
    UserStore.removeAllData();
    localStorage.removeItem("uToken");
    navigate("/");
  };

  useEffect(() => {
    document.title = "TrafficBox - Profile";

    const fetchUser = async () => {
      const token = localStorage.getItem("uToken");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        runInAction(() => {
          UserStore.name = data.name;
          UserStore.surname = data.surname;
          UserStore.age = Number(data.age);
          UserStore.email = data.email;
          UserStore.gender = data.gender;
          UserStore.role = data.role; // ✅ теперь role есть
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        logOut();
      }
    };

    fetchUser();
  }, []);

  const token = localStorage.getItem("uToken");

  return (
    <Fragment>
      <section className={styles.myProfileStructure}>
        {token ? (
          <div className={styles.profileBox}>
            <h1>Welcome to your profile!</h1>
            <div className={styles.dataBox}>
              <h2>
                Your name: <p>{UserStore.name} {UserStore.surname}</p>
              </h2>
              <h2>
                Your email: <p>{UserStore.email}</p>
              </h2>
              <h2>
                Your age: <p>{UserStore.age}</p>
              </h2>
              <h2>
                Your gender: <p>{UserStore.gender}</p>
              </h2>
              <h2>
                Your role: <p>{UserStore.role}</p>
              </h2>
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
