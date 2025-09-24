import {Fragment} from "react";
import styles from "../styles/components/AdvertiseBar.module.scss";

export const AdvertisementBar = () => {
  const renderAdvertise = () => {
    const data = () => (
      <Fragment>
        <section className={styles.AdvertiseBarStructure}>
          <h1>Advertisement table</h1>
        </section>
      </Fragment>
    );
    return data();
  }
  return renderAdvertise();
}