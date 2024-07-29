import React, { useContext } from "react";
import UserContext from "../context/user";

const StudioDashboard = ({ email }) => {
  const userCtx = useContext(UserContext);

  return (
    <div>
      <nav>
        <h2>{email}'s Dashboard</h2>
        <ul>
          <li>Studio's Dashboard</li>
          <li>Available Classes</li>
          <li onClick={() => userCtx.setAccessToken("")}>Log Out</li>
        </ul>
      </nav>
      <AvailableClasses />
    </div>
  );
};

export default StudioDashboard;
