import {Fragment} from "react";
import {Logo} from "../components/UI/Logo.tsx";
import styles from "../styles/pages/ErrorBoundary.module.scss";
import {Button} from "../components/UI/Button.tsx";

export function ErrorBoundary(){
  return (
    <Fragment>
      <title>TrafficBox - Error</title>
      <section className={styles.ErrorStructure}>
        <div className={styles.ErrorBox}>
          <Logo/>
          <p>This page has status: Unknown. You can return to main page.</p>
          <Button content={"Return"} link={"/"}/>
        </div>
      </section>
    </Fragment>
  )
}