import React, { useState, useContext } from "react";
import useFetch from "../hooks/useFetch";

const Registration = (props) => {
  const usingFetch = useFetch();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await usingFetch("/auth/register", "PUT", {
        name,
        contact,
        email,
        password,
        role,
      });
      props.setShowLogin(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Sign up here!</h1>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
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
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Member</option>
            <option value="fitness_studio">Fitness Studio</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => props.setShowLogin(true)}>
        Go back to Log In
      </button>
    </div>
  );
};

export default Registration;
