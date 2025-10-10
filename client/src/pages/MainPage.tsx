import { Fragment } from "react";
import { NavBar } from "../components/NavBar.tsx";
import styles from "../styles/pages/MainPage.module.scss";
import { InfoBar } from "../components/InfoBar.tsx";
import {Dashboard} from "../components/MainPage/Dashboard.tsx";
export const MainPage = () => {

  const renderMainPage = () => {
    return (
      <Fragment>
        <title>TrafficBox - Main Page</title>
        <section className={styles.MainStructure}>
          <NavBar />
          <main>
            <Dashboard />
          </main>
          <InfoBar />
        </section>
      </Fragment>
    );
  };

  return renderMainPage();
};
