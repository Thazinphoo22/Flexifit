import React, { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const UpcomingClasses = () => {
  const usingFetch = useFetch();
  const [classes, setClasses] = useState([]);
  const [location, setLocation] = useState("");
  const userCtx = useContext(UserContext);

  const fetchAllClasses = async () => {
    try {
      const data = await usingFetch(
        "/api/classes",
        "GET",
        undefined,
        userCtx.accessToken
      );
      setClasses(data);
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (location.trim() !== "") {
      fetchClassesByLocation(location);
    }
  };

  const handleBookClass = async (classId) => {
    const memberId = userCtx.memberId;
    if (!memberId) {
      console.error("Member ID is not available");
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
    }
  };

  return (
    <div>
      <h2>Upcoming Classes</h2>
      <div>
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
      <div>
        <button onClick={fetchAllClasses}>Show All</button>
      </div>

      {classes.length === 0 ? (
        <p>No upcoming classes found.</p>
      ) : (
        <div>
          {classes.map((cls) => (
            <div key={cls.id}>
              <h3>{cls.name}</h3>
              <p>Description: {cls.description}</p>
              <p>Date: {cls.date}</p>
              <p>Time: {cls.time}</p>
              <p>Location: {cls.location}</p>
              <p>Instructor: {cls.instructor}</p>
              <p>Duration: {cls.session_duration}</p>
              <p>Class Size: {cls.class_size}</p>
              <button onClick={() => handleBookClass(cls.id)}>Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingClasses;
