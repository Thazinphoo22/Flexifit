// import React, { useContext } from "react";
// import UserContext from "../context/user";

// const StudioDashboard = () => {
//   const { logout, email } = useContext(UserContext);
//   const username = email.split("@")[0];

//   return (
//     <div>
//       <nav>
//         <h2>{username}'s Dashboard</h2>
//         <ul>
//           <li>Available Classes</li>
//           <button onClick={logout}>Logout</button>
//         </ul>
//       </nav>
//     </div>
//   );
// };

//export default StudioDashboard;

import React, { useState } from "react";
import ManageClasses from "./ManageClasses";

const StudioDashboard = (props) => {
  const [view, setView] = useState("manage");
  const username = props.email.split("@")[0];

  return (
    <div>
      <nav>
        <h1>{username}'s Dashboard</h1>
        <button onClick={() => setView("manage")}>Manage Classes</button>
        <button onClick={props.logout}>Logout</button>
      </nav>
      <div>{view === "manage" && <ManageClasses />}</div>
    </div>
  );
};

export default StudioDashboard;
