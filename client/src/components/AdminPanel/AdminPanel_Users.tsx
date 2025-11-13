import { observer } from "mobx-react-lite";
import styles from "../../styles/components/AdminPanel/AdminPanel_Users.module.scss";
import UserStore from "../../stores/user.store";
import {Fragment, useEffect} from "react";
import {Button} from "../UI/Button.tsx";
import Swal from "sweetalert2";
import NotifyStore from "../../stores/notify.store.ts";

export const AdminPanel_Users = observer(() => {

  useEffect(() => {
    UserStore.fetchUsers().then(async () => {
      await Swal.fire({
        icon: 'success',
        title: 'Users fetched successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }, []);

  return (

    <Fragment>
      <section className={styles.AdminPanel_UsersStructure}>
        <div className={styles.TablePanel_Users}>
          <h1>Users</h1>

          {UserStore.loading ? (
            <p>Loading users...</p>
          ) : UserStore.error ? (
            <p style={{ color: "red" }}>{UserStore.error}</p>
          ) : UserStore.users.length > 0 ? (
            <table className={styles.BoxTable}>
              <thead>
              <tr className={styles.InformationBoxTable}>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Role</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {UserStore.users.map((user: any) => (
                <tr key={user.id ?? user.email} className={styles.InformationUsersBoxTable}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Button
                      content="Delete"
                      onClick={() => NotifyStore.removeUserNotify(user)}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          ) : (
            <p>No users available.</p>
          )}
        </div>
      </section>
    </Fragment>
  );
});
