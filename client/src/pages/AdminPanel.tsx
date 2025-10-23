import { Fragment, useEffect } from "react";
import styles from "../styles/pages/AdminPanel.module.scss";
import { observer } from "mobx-react-lite";
import {Outlet} from "react-router-dom";
import UserStore from "../stores/user.store.ts";
import {Button} from "../components/UI/Button.tsx";
import {NavBar} from "../components/NavBar.tsx";
import TokenStore from "../stores/token.store.ts";


export const AdminPanel = observer(() => {

  useEffect(() => {
    UserStore.fetchUsers().then(() => {});
  }, []);

  return (
    <Fragment>
      <title>TrafficBox - Admin Panel</title>
      {TokenStore.token ? (
        <section className={styles.AdminPanelStructure}>
          <NavBar/>
          <main>
            <div className={styles.SideBar}>
              <div className={styles.ContentBar}>
                <h1>Admin Panel</h1>
                <Button content={"Users"} link={"users"}/>
                <Button content={"Offers"} link={"offers"}/>
              </div>
            </div>
            <Outlet/>
          </main>
        </section>
      ) : (
        <h1>This page is unknown. Please authorize.</h1>
      )}
    </Fragment>
  )
});