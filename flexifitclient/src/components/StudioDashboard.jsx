import React, { useState } from "react";
import ManageClasses from "./ManageClasses";
import styles from "./StudioDashboard.module.css";

const StudioDashboard = (props) => {
  const [view, setView] = useState("manage");
  const username = props.email.split("@")[0];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1>{username}'s Dashboard</h1>
        <div>
          <button onClick={() => setView("manage")}>Manage Classes</button>
          <button onClick={props.logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>
      <div className={styles.viewContainer}>
        {view === "manage" && <ManageClasses />}
      </div>
    </div>
  );
};

export default StudioDashboard;
