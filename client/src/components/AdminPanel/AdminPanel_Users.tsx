import { observer } from "mobx-react-lite";
import styles from "../../styles/components/AdminPanel/AdminPanel_Users.module.scss";
import UserStore from "../../stores/user.store";
import { useEffect } from "react";
import { toJS } from "mobx";
import {Button} from "../UI/Button.tsx";

export const AdminPanel_Users = observer(() => {
  useEffect(() => {
    UserStore.fetchUsers().then(() => {
      console.log("Users fetched successfully:", toJS(UserStore.users));
    });
  }, []);

  const removeUser = async (user: any) => {
    try {
      if (user.role === "Admin") {
        throw new Error("Cannot delete admin users");
      }

      const response = await fetch(`http://localhost:3000/remove-user/${user.uid}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove user");

      console.log("User removed successfully");
      await UserStore.fetchUsers();
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };



  return (
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
              <tr key={user.uid} className={styles.InformationUsersBoxTable}>
                <td>{user.uid}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td><Button content="Delete" onClick={() => removeUser(user)} /></td>
              </tr>
            ))}
            </tbody>
          </table>
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </section>
  );
});
