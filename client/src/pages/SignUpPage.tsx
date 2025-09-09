import { Fragment, type ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/SignUpPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import UserStore from "../stores/user.store";
import TokenStore from "../stores/token.store.ts";

export const SignUpPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (TokenStore.getToken()) {
      alert("You are already authorized");
      navigate("/");
    }
  }, []);

  const handleSignUp = async () => {
    const { name, surname, email, password, age, gender, role } = UserStore;

    if (!name || !surname || !email || !password || Number(age) < 16) {
      alert("Please fill in all fields correctly. Age must be at least 16.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password, age: Number(age), gender, role }),
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

  const handleChange = (field: keyof typeof UserStore) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = field === "age" ? Number(e.target.value) : e.target.value;
      UserStore.changeData(field, value);
    };

  return (
    <Fragment>
      <section className={styles.SignUpStructure}>
        <div className={styles.SignUpBox}>
          <h1>Sign Up</h1>
          <div className={styles.inputsBox}>
            <label>
              Your name
              <input type="text" value={UserStore.name} onChange={handleChange("name")} />
            </label>
            <label>
              Surname
              <input type="text" value={UserStore.surname} onChange={handleChange("surname")} />
            </label>
            <label>
              Age
              <input type="number" value={UserStore.age} onChange={handleChange("age")} />
            </label>
            <label>
              Password
              <input type="password" value={UserStore.password} onChange={handleChange("password")} />
            </label>
            <label>
              Email
              <input type="email" value={UserStore.email} onChange={handleChange("email")} />
            </label>
            <label>
              Your gender
              <select value={UserStore.gender} onChange={handleChange("gender")}>
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
