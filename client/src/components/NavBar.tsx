import { Fragment, useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/components/NavBar.module.scss";
import { Logo } from "./UI/Logo.tsx";
import { Button } from "./UI/Button.tsx";
import UserStore from "../stores/user.store.ts";
import { useNavigate } from "react-router-dom";

export const NavBar = observer(() => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("uToken");

  const disconnectFromSession = useCallback(() => {
    UserStore.removeAllData();
    localStorage.removeItem("uToken");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();

        UserStore.changeData("name", data.name);
        UserStore.changeData("surname", data.surname);
        UserStore.changeData("age", String(data.age));
        UserStore.changeData("email", data.email);
        UserStore.changeData("gender", data.gender);
        UserStore.changeData("role", data.role)
      } catch (err) {
        console.error("Error fetching user:", err);
        disconnectFromSession();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, disconnectFromSession]);

  const adminRoles = ["Admin", "Developer"];

  return (
    <Fragment>
      <section className={styles.navBarSection}>
        <Logo />
        {loading ? (
          <p>Loading...</p>
        ) : token ? (
          <div className={styles.navigationVerifyBox}>
            <h1>Name: {UserStore.name}</h1>
            <Button content={"Profile"} link={"/profile"} />
            {adminRoles.includes(UserStore.role) ? (
              <Fragment>
                <Button content={"Admin"} link={"/adminPanel"} />
              </Fragment>
            ) : (<Fragment></Fragment>)}
          </div>
        ) : (
          <div className={styles.navigationLinkBox}>
            <Button content={"Sign In"} link={"/signIn"} />
            <Button content={"Sign Up"} link={"/signUp"} />
          </div>
        )}
      </section>
    </Fragment>
  );
});
