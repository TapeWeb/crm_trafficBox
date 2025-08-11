import {Fragment, useEffect, useState} from "react";
import styles from "../styles/pages/SignInPage.module.scss"
import {useNavigate} from "react-router-dom";
import {Button} from "../components/UI/Button.tsx";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [uToken, setUToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("uToken");
    if(token) setUToken(token);
  }, []);

  const sendQuery = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
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


  return (
    <Fragment>
      <title>TrafficBox - Sign In</title>
     <section className={styles.SignInStructure}>
       <div className={styles.SignInBox}>
         <h1>Sign In</h1>
         <div className={styles.inputsBox}>
           <label>
             Your email address:
             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
           </label>
           <label>
             Your password:
             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
           </label>
         </div>
         <Button content={"Sign In"} onClick={sendQuery}/>
         <div className={styles.registrationBox}>
           <h5>You dont have Account?</h5>
           <Button content={"Sign Up"} link={"/signUp"} />
         </div>
         <Button content={"Return"} link={"/"}/>
       </div>
     </section>
    </Fragment>
  )
}