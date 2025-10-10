import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Logo } from "../components/UI/Logo.tsx";
import styles from "../styles/pages/ErrorBoundary.module.scss";
import { Button } from "../components/UI/Button.tsx";

export const ErrorBoundary = () => {
  return (
    <Fragment>
      <Helmet>
        <title>TrafficBox – Oops! Something went wrong</title>
      </Helmet>

      <section className={styles.ErrorStructure}>
        <div className={styles.ErrorBox}>
          <Logo />
          <h1 className={styles.ErrorTitle}>🚧 Oops! Something went wrong.</h1>
          <p className={styles.ErrorMessage}>
            We couldn’t load this page. It might be broken or temporarily unavailable.
            <br />You can go back to the main page and try again later.
          </p>
          <Button content={"🔙 Return to Home"} link={"/"} />
        </div>
      </section>
    </Fragment>
  );
};
