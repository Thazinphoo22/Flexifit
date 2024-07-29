import React, { useState, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContext from "./context/user";
import Login from "./components/Login";
import Registration from "./components/Registration";
import MemberDashboard from "./components/MemberDashboard";
import StudioDashboard from "./components/StudioDashboard";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [role, setRole] = useState("");
  const [loggedInUserRole, setLoggedInUserRole] = useState("");
  const [email, setEmail] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          loggedInUserRole,
          setLoggedInUserRole,
          email,
          setEmail,
        }}
      >
        {!accessToken && showLogin && (
          <Login setEmail={setEmail} setShowLogin={setShowLogin} />
        )}
        {!accessToken && !showLogin && (
          <Registration setShowLogin={setShowLogin} />
        )}
        {loggedInUserRole === "member" && accessToken && (
          <MemberDashboard email={email} />
        )}
        {loggedInUserRole === "fitness_studio" && accessToken && (
          <StudioDashboard email={email} />
        )}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
