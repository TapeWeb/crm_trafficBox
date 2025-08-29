import { Fragment, type ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/SignUpPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import UserStore from "../stores/user.store";

export const SignUpPage = observer(() => {
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const name = UserStore.getData("name");
    const surname = UserStore.getData("surname");
    const email = UserStore.getData("email");
    const password = UserStore.getData("password");
    const age = Number(UserStore.getData("age"));
    const gender = UserStore.getData("gender");

    if (!name || !surname || !email || !password || age < 16) {
      alert("Please fill in all fields correctly. Age must be at least 16.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password, age, gender }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign up failed");

      localStorage.setItem("uToken", data.token);
      alert("Sign up successful!");
      UserStore.removeAllData();
      navigate("/");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleChangeGender = (event: ChangeEvent<HTMLSelectElement>) => {
    UserStore.changeData("gender", event.target.value);
  };

  return (
    <Fragment>
      <title>TrafficBox - Sign Up</title>
      <section className={styles.SignUpStructure}>
        <div className={styles.SignUpBox}>
          <h1>Sign Up</h1>
          <div className={styles.inputsBox}>
            <label>
              Your name
              <input
                type="text"
                value={UserStore.getData("name")}
                onChange={(e) => UserStore.changeData("name", e.target.value)}
              />
            </label>
            <label>
              Surname
              <input
                type="text"
                value={UserStore.getData("surname")}
                onChange={(e) => UserStore.changeData("surname", e.target.value)}
              />
            </label>
            <label>
              Age
              <input
                type="number"
                value={UserStore.getData("age")}
                onChange={(e) => UserStore.changeData("age", e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={UserStore.getData("password")}
                onChange={(e) => UserStore.changeData("password", e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={UserStore.getData("email")}
                onChange={(e) => UserStore.changeData("email", e.target.value)}
              />
            </label>
            <label>
              Your sex
              <select value={UserStore.getData("gender")} onChange={handleChangeGender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="DontTalkAboutGender">Don't talk about gender</option>
              </select>
            </label>
          </div>
          <Button content="Sign Up" onClick={handleSignUp} />
          <div className={styles.authorizationBox}>
            <h5>You have an account?</h5>
            <Button content="Sign In" link="/signIn" />
          </div>
          <Button content="Return" link="/" />
        </div>
      </section>
    </Fragment>
  );
});
