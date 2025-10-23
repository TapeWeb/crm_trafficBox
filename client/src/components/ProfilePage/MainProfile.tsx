import styles from "../../styles/components/ProfilePage/MainProfile.module.scss";
import UserStore from "../../stores/user.store.ts";
import {Button} from "../UI/Button.tsx";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Fragment} from "react";

export const MainProfile = observer(() => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await UserStore.logOut();
    navigate("/");
  };

  return (
    <Fragment>
      <section className={styles.ProfileBox}>
        <img
          className={styles.Avatar}
          src={
            UserStore.avatarUrl ||
            `https://ui-avatars.com/api/?name=${UserStore.name}+${UserStore.surname}&background=ff0000&color=333333&size=128`
          }
          alt="User avatar"
        />
        <h1 className={styles.WelcomeProfile}>Welcome to your profile!</h1>
        <ul className={styles.DataBox}>
          <li><strong>Your name:</strong> {UserStore.name} {UserStore.surname}</li>
          <li><strong>Your email:</strong> {UserStore.email}</li>
          <li><strong>Your age:</strong> {UserStore.age} years old</li>
          <li><strong>Your gender:</strong> {UserStore.gender}</li>
          <li><strong>Your role:</strong> {UserStore.role}</li>
          <li><strong>Your balance:</strong> {UserStore.balance} Axis Coins</li>
        </ul>
        <div className={styles.OthersButtonsBox}>
          <Button content="🚪 Logout" onClick={handleLogout} variant="primary" size="small" isAnimated />
          <Button content="🏠 Home" link="/" variant="primary" size="small" isAnimated />
          <Button content="💼 Offers" link="/offers" variant="primary" size="small" isAnimated />
        </div>
      </section>
    </Fragment>
  );
});
