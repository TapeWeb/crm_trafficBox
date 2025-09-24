import { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/SignUpPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import UserStore, {type Gender} from "../stores/user.store";
import TokenStore from "../stores/token.store.ts";
import Swal from "sweetalert2";

export const SignUpPage = observer(() => {
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

  const renderSignUp = () => {
    const data = () => {
      return (
        <Fragment>
          <title>TrafficBox - Sign Up</title>
          <section className={styles.SignUpStructure}>
            <div className={styles.SignUpBox}>
              <h1>Sign Up</h1>
              <div className={styles.inputsBox}>
                <label>
                  Your name
                  <input type="text" value={UserStore.name} maxLength={64} onChange={(e) => UserStore.changeData("name", e.target.value)} />
                </label>
                <label>
                  Surname
                  <input type="text" value={UserStore.surname} maxLength={64} onChange={(e) => UserStore.changeData("surname", e.target.value)} />
                </label>
                <label>
                  Age
                  <input type="number" value={UserStore.age} maxLength={99} onChange={(e) =>  UserStore.changeData("age", Number(e.target.value))} />
                </label>
                <label>
                  Password
                  <input type="password" value={UserStore.password} maxLength={255} onChange={(e) => UserStore.changeData("password", e.target.value)} />
                </label>
                <label>
                  Email
                  <input type="email" value={UserStore.email} maxLength={255} onChange={(e) => UserStore.changeData("email", e.target.value)} />
                </label>
                <label>
                  Your gender
                  <select
                    value={UserStore.gender}
                    onChange={(e) => UserStore.changeData("gender", e.target.value as Gender)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="DontTalkAboutGender">Don't talk about gender</option>
                  </select>
                </label>
              </div>
              <div className={styles.containerButtonBox}>
                <Button content="Sign Up" onClick={() => {
                  UserStore.createAccount().then(() => {
                    navigate("/");
                  })
                }} />
                <Button content="Return" link="/" />
              </div>
              <div className={styles.authorizationBox}>
                <h4>You have an account?</h4>
                <Button content="Sign In" link="/signIn" />
              </div>
            </div>
          </section>
        </Fragment>
      )
    }
    return data();
  }

  return renderSignUp();
});
