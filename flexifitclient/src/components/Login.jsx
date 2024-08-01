import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import styles from "./Login.module.css";

const Login = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
      if (decoded.role === "member") {
        userCtx.setMemberId(decoded.id);
      } else if (decoded.role === "fitness_studio") {
        userCtx.setFitness_studioId(decoded.id);
      }
    }
  }, [data]);

  useEffect(() => {
    props.setEmail(email);
  }, [email]);

  const handleSubmit = () => {
    setErrors({
      email: "",
      password: "",
    });

    let isValid = true;
    let newErrors = {};

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
      refetch();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles["login-background"]}>
      <div className={styles["login-container"]}>
        <h1 className={styles.title}>FlexiFit</h1>
        {isError && <p className={styles.error}>{error}</p>}
        <div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Role:
              <select
                className={styles.select}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="member">Member</option>
                <option value="fitness_studio">Fitness Studio</option>
              </select>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email:
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Password:
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <button className={styles.button} onClick={handleSubmit}>
            Login
          </button>
        </div>
        <button
          className={styles.link}
          onClick={() => props.setShowLogin(false)}
        >
          Not have an account yet? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
