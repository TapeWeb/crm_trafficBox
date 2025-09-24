import { Fragment } from "react";
import styles from "../styles/components/InfoBar.module.scss";
import { Button } from "./UI/Button.tsx";

export function InfoBar() {
  return (
    <Fragment>
      <section className={styles.infoBarSection}>
        <div className={styles.mainDevelopersBox}>
          <h1>
            Main Developer:{" "}
            <Button content="Tape" link="https://github.com/TapeWeb" isAnimated />
          </h1>
          <h1>
            Project Idea:{" "}
            <Button content="NS13" link="https://github.com/nness13" isAnimated />
          </h1>
        </div>
      </section>
    </Fragment>
  );
}
