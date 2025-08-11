import {Fragment} from "react";
import {NavBar} from "../components/NavBar.tsx";
import styles from "../styles/pages/MainPage.module.scss"

export function MainPage() {
  return (
    <Fragment>
      <title>TrafficBox - Main Page</title>
      <section className={styles.MainStructure}>
        <NavBar />
        <main>
          <h1>This page is temporarily unavailable. Please try again later.</h1>
        </main>
      </section>
    </Fragment>
  )
}