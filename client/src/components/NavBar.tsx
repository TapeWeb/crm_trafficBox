import { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/components/NavBar.module.scss";
import { Logo } from "./UI/Logo.tsx";
import { Button } from "./UI/Button.tsx";
import UserStore from "../stores/user.store.ts";
import TokenStore from "../stores/token.store.ts";
import {useNavigate} from "react-router-dom";

export const NavBar = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const user = await UserStore.getCurrentUser();
      if (!user) {
        navigate("/");
      }
    };
    checkToken().then();
  }, [navigate]);


  const adminRoles = ["Admin", "Developer"];

  const renderNavBar = () => {
    return (
      <Fragment>
        <section className={styles.navBarSection}>
          <Logo />
          {UserStore.loading ? (
            <p>Loading...</p>
          ) : TokenStore.token ? (
            <div className={styles.navigationVerifyBox}>
              <h1>Name: {UserStore.name}</h1>
              <Button content={"Profile"} link={"/profile"} />
              {adminRoles.includes(UserStore.role) && (
                <Button content={"Admin"} link={"/adminPanel"} />
              )}
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
  };

  return renderNavBar();
});
