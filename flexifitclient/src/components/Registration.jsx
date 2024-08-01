import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import styles from "./Registration.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign up here!</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Contact:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.select}
          >
            <option value="member">Member</option>
            <option value="fitness_studio">Fitness Studio</option>
          </select>
        </label>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
      <button
        onClick={() => props.setShowLogin(true)}
        className={`${styles.button} ${styles.backToLoginButton}`}
      >
        Go back to Log In
      </button>
    </div>
  );
};

export default Registration;
