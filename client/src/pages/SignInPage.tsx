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
    (async () => {
      const user = await TokenStore.getUserByToken();
      if (user) {
        Swal.fire({
          icon: "error",
          title: "You are already authorized!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/"));
      }
    })();
  }, [navigate]);

  return (
    <Fragment>
      <title>TrafficBox - Sign In</title>
      <section className={styles.SignInStructure}>
        <div className={styles.SignInBox}>
          <div className={styles.SignInBoxStructure}>
            <h1>Sign In Page</h1>
            <div className={styles.SignInMainPart}>
              <div className={styles.SignInInputPart}>
                <input type={"text"} placeholder={"Email"} value={UserStore.email} onChange={(e) => UserStore.changeData("email", e.target.value)}/>
                <input type={"text"} placeholder={"Password"} value={UserStore.password} onChange={(e) => UserStore.changeData("password", e.target.value)}/>
              </div>
              <div className={styles.SignInButtonsPart}>
                <Button
                  content={"Login"}
                  size={"small"}
                  onClick={async () => {
                    const success = await UserStore.checkUser();
                    if (success) {
                      await Swal.fire({
                        icon: "success",
                        title: "Welcome back!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate("/");
                    } else {
                      await Swal.fire({
                        icon: "error",
                        title: "Invalid email or password",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.SignInSidePart}>
            <Button content={"Sign Up"} link={"/signUp"} size={"small"} variant={"primary"}/>
          </div>
        </div>
      </section>
    </Fragment>
  );
});
