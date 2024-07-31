import React, { useState, useContext } from "react";
import UserContext from "../context/user";
import UpcomingClasses from "./UpcomingClasses";
import BookingHistory from "./BookingHistory";

const MemberDashboard = (props) => {
  const [view, setView] = useState("upcoming");
  const username = props.email.split("@")[0];

  return (
    <div>
      <nav>
        <h1>{username}'s Dashboard</h1>
        <button onClick={() => setView("upcoming")}>Upcoming Classes</button>
        <button onClick={() => setView("history")}>Booking History</button>
        <button onClick={props.logout}>Logout</button>
      </nav>
      <div>
        {view === "upcoming" ? <UpcomingClasses /> : <BookingHistory />}
      </div>
    </div>
  );
};

export default MemberDashboard;
