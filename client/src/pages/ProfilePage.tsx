import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Fragment, useEffect} from "react";
import TokenStore from "../stores/token.store.ts";
import Swal from "sweetalert2";
import UserStore from "../stores/user.store.ts";
import styles from "../styles/pages/ProfilePage.module.scss";
import {Button} from "../components/UI/Button.tsx";

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
      })
    });
  }, [navigate]);


  const handleLogout = async () => {
    await UserStore.logOut();
    navigate("/");
  };

  return (
    <Fragment>
      <title>TrafficBox - Profile</title>
      <section className={styles.myProfileStructure}>
        { UserStore.loading ? (
          <h1>Loading...</h1>
        ) : UserStore.error ? (
          <h1>{UserStore.error}</h1>
        ) : (
          <div className={styles.profileBox}>
            <h1>Welcome to your profile!</h1>
            <div className={styles.dataBox}>
              <h1>Your name: <p>{UserStore.name} {UserStore.surname}</p></h1>
              <h1>Your email: <p>{UserStore.email}</p></h1>
              <h1>Your age: <p>{UserStore.age}</p></h1>
              <h1>Your gender: <p>{UserStore.gender}</p></h1>
              <h1>Your role: <p>{UserStore.role}</p></h1>
              <h1>Your balance: <p>{UserStore.balance}</p></h1>
            </div>
            <div className={styles.buttonsBox}>
              <Button content="Logout" onClick={handleLogout} />
              <Button content="Return" link="/" />
              <Button content="Offers" link="/offers" />
              <Button content="Your offers" link="/myOffers" />
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
});
