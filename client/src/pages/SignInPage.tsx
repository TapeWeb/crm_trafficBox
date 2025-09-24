import {Fragment, useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/SignInPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import UserStore from "../stores/user.store";
import TokenStore from "../stores/token.store.ts";
import Swal from "sweetalert2";

export const SignInPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await TokenStore.getUserByToken();
      if (user) {
        await Swal.fire({
          icon: "error",
          title: "You are already authorized!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    };
    checkAuth().then();
  }, [navigate]);

  return (
    <Fragment>
      <title>TrafficBox - Sign In</title>
      <section className={styles.SignInStructure}>
        <div className={styles.SignInBox}>
          <h1>Sign In</h1>
          <div className={styles.inputsBox}>
            <label>
              Email
              <input
                type="email"
                value={UserStore.email}
                onChange={(e) => UserStore.changeData("email", e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={UserStore.password}
                onChange={(e) => UserStore.changeData("password", e.target.value)}
              />
            </label>
          </div>
          <div className={styles.containerButtonBox}>
            <Button content="Sign In" onClick={() => UserStore.checkUser().then(
              () => TokenStore.getToken().then(
                () => navigate("/")
              )
            )} />
            <Button content="Return" link="/" />
          </div>
          <div className={styles.registrationBox}>
            <h4>You don't have an account?</h4>
            <Button content="Sign Up" link="/signUp" />
          </div>
        </div>
      </section>
    </Fragment>
  );
});
