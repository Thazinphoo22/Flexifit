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

  const fetchClassesByLocation = async () => {
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

  useEffect(() => {
    fetchAllClasses();
  }, [usingFetch]);

  const handleSearch = () => {
    fetchClassesByLocation();
  };

  const handleBookClass = async (classId) => {
    try {
      await usingFetch(
        "/api/bookings",
        "PUT",
        { class_id: classId },
        undefined,
        userCtx.accessToken
      );
      alert("Class booked successfully!");
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
              <p>
                {cls.date} at {cls.time}
              </p>
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
