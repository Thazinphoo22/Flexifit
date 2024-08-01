import React, { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./UpcomingClasses.module.css";

const UpcomingClasses = () => {
  const usingFetch = useFetch();
  const [classes, setClasses] = useState([]);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const userCtx = useContext(UserContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const fetchAllClasses = async () => {
    try {
      const data = await usingFetch(
        "/api/classes",
        "GET",
        undefined,
        userCtx.accessToken
      );
      setClasses(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to fetch classes.");
    }
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchClassesByLocation = async (location) => {
    try {
      const data = await usingFetch(
        "/api/classes/location",
        "POST",
        { location },
        userCtx.accessToken
      );
      setClasses(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to fetch classes by location.");
    }
  };

  const handleSearch = () => {
    if (location.trim() === "") {
      setError("Location cannot be empty.");
      return;
    }
    setError("");
    fetchClassesByLocation(location);
  };

  const handleBookClass = async (classId) => {
    const memberId = userCtx.memberId;
    if (!memberId) {
      console.error("Member ID is not available");
      setError("You must be logged in to book a class.");
      return;
    }
    try {
      await usingFetch(
        "/api/bookings",
        "PUT",
        { member_id: memberId, class_id: classId },
        userCtx.accessToken
      );
      alert("Class booked successfully!");
      fetchAllClasses();
    } catch (error) {
      console.error(error);
      setError("Failed to book class.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Upcoming Classes</h2>
      <div className={styles.searchContainer}>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div>
        <button className={styles.showAllButton} onClick={fetchAllClasses}>
          Show All
        </button>
      </div>
      {classes.length === 0 ? (
        <p className={styles.noClassesMessage}>No upcoming classes found.</p>
      ) : (
        <div className={styles.classList}>
          {classes.map((cls) => (
            <div key={cls.id} className={styles.classCard}>
              <h3>{cls.name}</h3>
              <p>Description: {cls.description}</p>
              <p>Date: {formatDate(cls.date)}</p>
              <p>Time: {cls.time}</p>
              <p>Location: {cls.location}</p>
              <p>Instructor: {cls.instructor}</p>
              <p>Duration: {cls.session_duration} mins</p>
              <p>Class Size: {cls.class_size}</p>
              <button
                className={styles.bookButton}
                onClick={() => handleBookClass(cls.id)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingClasses;
