import { Fragment } from "react";
import { NavBar } from "../components/NavBar.tsx";
import styles from "../styles/pages/MainPage.module.scss";
import { InfoBar } from "../components/InfoBar.tsx";
import { AdvertisementBar } from "../components/AdvertisementBar.tsx";
import AdvertisementContent from "../data/advertisementContent.data.json";

export const MainPage = () => {

  const renderMainPage = () => {
    return (
      <Fragment>
        <title>TrafficBox - Main Page</title>
        <section className={styles.MainStructure}>
          <NavBar />
          <main>
            <AdvertisementBar />
            <div className={styles.adsContainer}>
              {AdvertisementContent.map((content: any, index: number) => (
                <div key={index} className={styles.containerConstruct}>
                  <h1>{content.content}</h1>
                </div>
              ))}
            </div>
          </main>
          <InfoBar />
        </section>
      </Fragment>
    );
  };

  return renderMainPage();
};
