import {Fragment} from "react";
import styles from "../../styles/components/UI/Logo.module.scss"

export function Logo() {
  const renderLogo = () => {
      const data = () => {
        return (
        <Fragment>
          <div className={styles.logo}>
            <span className={styles.traffic}>
              Fine
            </span>
            <span className={styles.box}>
              DB
            </span>
          </div>
        </Fragment>
      );
    }
    return data();
  }

  return renderLogo();
}