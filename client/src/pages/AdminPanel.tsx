import { Fragment, useEffect } from "react";
import styles from "../styles/pages/AdminPanel.module.scss";
import { observer } from "mobx-react-lite";
import {Outlet, useNavigate} from "react-router-dom";
import UserStore from "../stores/user.store.ts";
import {Button} from "../components/UI/Button.tsx";
import {NavBar} from "../components/NavBar.tsx";


export const AdminPanel = observer(() => {
  const navigate = useNavigate();

  const logOut = () => {
    UserStore.removeAllData();
    localStorage.removeItem("uToken");
    navigate("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("uToken");
    if (storedToken) {
      fetch("http://localhost:3000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: storedToken }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          UserStore.changeData("name", data.name);
          UserStore.changeData("surname", data.surname);
          UserStore.changeData("age", Number(data.age));
          UserStore.changeData("email", data.email);
          UserStore.changeData("gender", data.gender);
          UserStore.changeData("role", data.role);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          logOut();
        });
    }
  }, []);

  const receivedToken = localStorage.getItem("uToken");

  return (
    <Fragment>
      <title>TrafficBox - Admin Panel</title>
      {receivedToken ? (
        <section className={styles.AdminPanelStructure}>
          <NavBar/>
          <main>
            <div className={styles.SideBar}>
              <div className={styles.ContentBar}>
                <h1>Admin Panel</h1>
                <Button content={"Users"} link={"adminPanel_Users"}/>
                <Button content={"Offers"} link={"adminPanel_Offers"}/>
                </div>
            </div>
            <Outlet/>
          </main>
        </section>
      ) : (
        <h1>This page is unknown. Please authorize.</h1>
      )}
    </Fragment>
  );
});