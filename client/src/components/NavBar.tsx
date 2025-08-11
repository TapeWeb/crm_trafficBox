import { Fragment, useEffect, useState } from "react";
import styles from "../styles/components/NavBar.module.scss";
import { Logo } from "./UI/Logo.tsx";
import { Button } from "./UI/Button.tsx";

export function NavBar() {
  const [uToken, setUToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("uToken");
    if (token) setUToken(token);
  }, []);

  return (
    <Fragment>
      <section className={styles.navBarSection}>
        <Logo />
        {uToken ? (
          <div className={styles.authorizationBox}>
            <Button content={"Profile"} link={"/profile"} />
            <Button content={"Offers"} link={"/offers"} />
          </div>
        ) : (
          <div className={styles.navigationLinkBox}>
            <Button link={"/signIn"} content={"Sign In"} />
            <Button link={"/signUp"} content={"Sign Up"} />
          </div>
        )}
      </section>
    </Fragment>
  );
}
