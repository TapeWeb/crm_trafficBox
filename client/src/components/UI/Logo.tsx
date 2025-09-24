import {Fragment} from "react";
import styles from "../../styles/components/UI/Logo.module.scss"

export function Logo() {
  const renderLogo = () => {
      const data = () => {
        return (
        <Fragment>
          <div className={styles.logo}>
            <span className={styles.traffic}>Traffic</span><span className={styles.box}>Box</span>
          </div>
        </Fragment>
      );
    }
    return data();
  }

  return renderLogo();
}