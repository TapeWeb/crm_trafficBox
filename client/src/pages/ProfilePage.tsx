import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Fragment, useEffect} from "react";
import TokenStore from "../stores/token.store.ts";
import Swal from "sweetalert2";
import UserStore from "../stores/user.store.ts";
import styles from "../styles/pages/ProfilePage.module.scss";
import {MainProfile} from "../components/ProfilePage/MainProfile.tsx";
import {OffersProfile} from "../components/ProfilePage/OffersProfile.tsx";

export const ProfilePage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await TokenStore.getToken();
      if (!TokenStore.token) {
        await Swal.fire({
          icon: 'error',
          title: 'You are not authorized!',
          showConfirmButton: false,
          timer: 1500
        });
        await UserStore.logOut();
        return navigate("/");
      }
      await UserStore.getCurrentUser();
    };
    init().then(async () => {
      return await Swal.fire({
        icon: 'success',
        title: 'You are authorized!',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }, [navigate]);

  return (
    <Fragment>
      <title>TrafficBox - Profile</title>
      <section className={styles.ProfileStructure}>
        { UserStore.loading ? (
          <h1>Loading...</h1>
        ) : UserStore.error ? (
          <h1>{UserStore.error}</h1>
        ) : (
          <div className={styles.ContentBox}>
            <MainProfile/>
            <OffersProfile/>
          </div>
        )}
      </section>
    </Fragment>
  );
});
