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
  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      name: "",
      contact: "",
      email: "",
      password: "",
    });

    let isValid = true;
    let newErrors = {};

    if (!name) {
      newErrors.name = "Name is required!";
      isValid = false;
    }

    if (!contact) {
      newErrors.contact = "Contact is required!";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required!";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Email must be a valid email!";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required!";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long!";
      isValid = false;
    }

    if (isValid) {
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
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.wrapper}>
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
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>
          <label className={styles.label}>
            Contact:
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={styles.input}
            />
            {errors.contact && (
              <span className={styles.error}>{errors.contact}</span>
            )}
          </label>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
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
    </div>
  );
};

export default Registration;
