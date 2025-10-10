import { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../styles/pages/SignUpPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import UserStore, { type Gender } from "../stores/user.store";
import TokenStore from "../stores/token.store.ts";

export const SignUpPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
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
    })();
  }, [navigate]);

  return (
    <Fragment>
      <title>TrafficBox - Sign Up</title>
      <section className={styles.SignUpStructure}>
        <div className={styles.SignUpBox}>
          <div className={styles.SignUpBoxStructure}>
            <div className={styles.SignUpSidePart}>
              <Button
                content={"Sign In"}
                link={"/signIn"}
                size={"small"}
                variant={"primary"}
              />
            </div>

            <div className={styles.SignUpMainPart}>
              <h1>Sign Up Page</h1>

              <div className={styles.SignUpInputPart}>
                <input
                  type={"text"}
                  placeholder={"Name"}
                  value={UserStore.name}
                  onChange={(e) => UserStore.changeData("name", e.target.value)}
                />
                <input
                  type={"text"}
                  placeholder={"Surname"}
                  value={UserStore.surname}
                  onChange={(e) =>
                    UserStore.changeData("surname", e.target.value)
                  }
                />

                <input
                  type={"text"}
                  placeholder={"Email"}
                  value={UserStore.email}
                  onChange={(e) => UserStore.changeData("email", e.target.value)}
                />

                <input
                  type={"password"}
                  placeholder={"Password"}
                  value={UserStore.password}
                  onChange={(e) =>
                    UserStore.changeData("password", e.target.value)
                  }
                />

                <input
                  type={"number"}
                  placeholder={"Age"}
                  value={UserStore.age}
                  onChange={(e) => UserStore.changeData("age", Number(e.target.value))}
                />



                <select
                  value={UserStore.gender}
                  onChange={(e) =>
                    UserStore.changeData("gender", e.target.value as Gender)
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className={styles.SignUpButtonsPart}>
                <Button
                  content={"Create Account"}
                  size={"small"}
                  onClick={async () => {
                    try {
                      await UserStore.createAccount();
                      await Swal.fire({
                        icon: "success",
                        title: "Account created!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate("/signIn");
                    } catch {
                      await Swal.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: "Try again later.",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
});
