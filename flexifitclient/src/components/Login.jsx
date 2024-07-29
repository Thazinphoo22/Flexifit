import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

const Login = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const { isError, error, data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await usingFetch("/auth/login", "POST", {
          role,
          email,
          password,
        });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
      userCtx.setLoggedInUserRole(decoded.role);
    }
  }, [data]);

  useEffect(() => {
    props.setEmail(email);
  }, [email]);

  const handleLogin = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <h1>FlexiFit</h1>
      <form onSubmit={handleLogin}>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Member</option>
            <option value="fitness_studio">Fitness Studio</option>
          </select>
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => props.setShowLogin(false)}>
        Not have an account yet? Register
      </button>
      {isError && <p>{error}</p>}
    </div>
  );
};

export default Login;
