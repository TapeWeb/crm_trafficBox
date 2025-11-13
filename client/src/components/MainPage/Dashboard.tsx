import styles from "../../styles/components/MainPage/Dashboard.module.scss";
import {Fragment, useEffect} from "react";
import {observer} from "mobx-react-lite";
import UserStore from "../../stores/user.store";
import Swal from "sweetalert2";

export const Dashboard = observer(() => {
  useEffect(() => {
    UserStore.fetchUsers().then();
  }, []);

  const conversionRate = (totalUsers: number, totalAdmins: number) => {
    if (totalUsers < totalAdmins) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Total users must be greater than total admins.',
        showConfirmButton: false,
        timer: 1500
      }).then();
      return null;
    }
    return ((totalAdmins / totalUsers) * 100).toFixed(2);
  };

  return (
    <Fragment>
      <section className={styles.DashboardStructure}>
        <h1>Dashboard</h1>
        <div className={styles.DashboardContent}>
          <div className={styles.TotalClients}>
            {UserStore.loading ? (
              <p>Loading...</p>
            ) : UserStore.users.length > 0 ? (
              <p>Total Clients: {UserStore.users.length}</p>
            ) : (
              <p>No users available.</p>
            )}
          </div>

          <div className={styles.TotalAdmins}>
            {UserStore.loading ? (
              <p>Loading...</p>
            ) : UserStore.users.length > 0 ? (
              <p>Total Admins: {UserStore.users.filter(user => user.role === "Admin" || user.role === "Developer").length}</p>
            ) : (
              <p>No admins available.</p>
            )}
          </div>

          <div className={styles.ConversionBox}>
            {UserStore.loading ? (
              <p>Loading...</p>
            ) : UserStore.users.length > 0 ? (
              <p>
                Admin Conversion Rate:
                {conversionRate(
                  UserStore.users.length,
                  UserStore.users.filter(user => user.role === "Admin" || user.role === "Developer").length
                )}%
              </p>
            ) : (
              <p>No users available.</p>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
});
