import React, { useContext } from "react";
import UserContext from "../context/user";

const MemberDashboard = ({ email }) => {
  const userCtx = useContext(UserContext);

  return (
    <div>
      <nav>
        <h2>{email}'s Dashboard</h2>
        <ul>
          <li>Member's Dashboard</li>
          <li>Upcoming Classes</li>
          <li>Booking History</li>
          <li onClick={() => userCtx.setAccessToken("")}>Log Out</li>
        </ul>
      </nav>
      {/* <UpcomingClasses />
      <BookingHistory /> */}
    </div>
  );
};

export default MemberDashboard;
