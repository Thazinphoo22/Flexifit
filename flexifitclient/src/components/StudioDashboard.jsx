import React, { useContext } from "react";
import UserContext from "../context/user";

const StudioDashboard = (props) => {
  const userCtx = useContext(UserContext);
  const username = props.email.split("@")[0];

  return (
    <div>
      <nav>
        <h2>{username}'s Dashboard</h2>
        <ul>
          <li>Studio's Dashboard</li>
          <li>Available Classes</li>
          <li onClick={() => userCtx.handleLogout()}>Log Out</li>
        </ul>
      </nav>
    </div>
  );
};

export default StudioDashboard;
