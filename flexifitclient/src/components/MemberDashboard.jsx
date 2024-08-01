import React, { useState } from "react";
import UpcomingClasses from "./UpcomingClasses";
import BookingHistory from "./BookingHistory";
import styles from "./MemberDashboard.module.css";

const MemberDashboard = (props) => {
  const [view, setView] = useState("upcoming");
  const username = props.email.split("@")[0];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1>{username}'s Dashboard</h1>
        <div>
          <button onClick={() => setView("upcoming")}>Upcoming Classes</button>
          <button onClick={() => setView("history")}>Booking History</button>
          <button onClick={props.logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>
      <div className={styles.content}>
        {view === "upcoming" ? <UpcomingClasses /> : <BookingHistory />}
      </div>
    </div>
  );
};

export default MemberDashboard;
