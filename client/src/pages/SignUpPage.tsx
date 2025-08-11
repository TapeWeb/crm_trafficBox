import {type ChangeEvent, Fragment, useEffect, useState} from "react";
import styles from "../styles/pages/SignUpPage.module.scss";
import { Button } from "../components/UI/Button.tsx";
import {useNavigate} from "react-router-dom";

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

  const sendQuery = async () => {
    if (!name || !surname || !age || !password || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, age: Number(age), password, selectedGender, email }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Server error: " + errorText);
        console.error("Server error:", errorText);
        return;
      }

      const result = await res.json();
      localStorage.setItem("uToken", result.token);
      console.log(uToken);
      navigate("/");
    } catch (error) {
      console.error("Error when trying to send query:", error);
      alert("Error when trying to send email");
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="dontTalkAboutGender">Don't talk about gender</option>
              </select>
            </label>
          </div>
          <Button content={"Sign Up"} onClick={sendQuery} />
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
