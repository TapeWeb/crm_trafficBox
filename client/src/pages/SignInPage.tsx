import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/SignInPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import UserStore from "../stores/user.store";

export const SignInPage = observer(() => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { email, password } = UserStore;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign in failed");

      localStorage.setItem("uToken", data.token);
      UserStore.removeAllData();
      navigate("/");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleChange = (field: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      UserStore.changeData(field, e.target.value);
    };

  return (
    <Fragment>
      <section className={styles.SignInStructure}>
        <div className={styles.SignInBox}>
          <h1>Sign In</h1>
          <div className={styles.inputsBox}>
            <label>
              Email
              <input type="email" value={UserStore.email} onChange={handleChange("email")} />
            </label>
            <label>
              Password
              <input type="password" value={UserStore.password} onChange={handleChange("password")} />
            </label>
          </div>
          <Button content="Sign In" onClick={handleSignIn} />
          <div className={styles.registrationBox}>
            <h5>You don't have an account?</h5>
            <Button content="Sign Up" link="/signUp" />
          </div>
          <Button content="Return" link="/" />
        </div>
      </section>
    </Fragment>
  );
});
