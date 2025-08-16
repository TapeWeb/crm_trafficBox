import { type ChangeEvent, Fragment, useEffect, useState } from "react";
import styles from "../styles/pages/SignUpPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import { useNavigate } from "react-router-dom";

export function SignUpPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [uToken, setUToken] = useState("");
  const [selectedGender, setSelectedGender] = useState("Male");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("uToken");
    if (token) setUToken(token);
  }, []);


  const handleSignUp = async () => {
    if (!name || !surname || !email || !password || !age) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          age: Number(age),
          gender: selectedGender,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign up failed");

      localStorage.setItem("uToken", data.token);
      alert("Sign up successful!");
      navigate("/");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };


  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(event.target.value);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Surname
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
            <label>
              Age
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Your sex
              <select value={selectedGender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="DontTalkAboutGender">Don't talk about gender</option>
              </select>
            </label>
          </div>
          <Button content={"Sign Up"} onClick={handleSignUp} />
          <div className={styles.authorizationBox}>
            <h5>You have Account?</h5>
            <Button content={"Sign In"} link={"/signIn"} />
          </div>
          <Button content={"Return"} link={"/"}/>
        </div>
      </section>
    </Fragment>
  );
}
