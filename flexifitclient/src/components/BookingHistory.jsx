import React, { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./BookingHistory.module.css";

const BookingHistory = () => {
  const usingFetch = useFetch();
  const [bookings, setBookings] = useState([]);
  const [errors, setErrors] = useState({});
  const userCtx = useContext(UserContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const fetchBookings = async () => {
    try {
      const data = await usingFetch(
        "/api/bookings",
        "GET",
        undefined,
        userCtx.accessToken
      );
      const filteredBookings = data.filter(
        (booking) => booking.member_id === userCtx.memberId
      );
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    setErrors({});

    if (!id) {
      setErrors({ delete: "Invalid booking ID" });
      return;
    }

    try {
      await usingFetch("/api/bookings", "DELETE", { id }, userCtx.accessToken);
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error) {
      setErrors({ delete: "Failed to delete booking" });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Booking History</h2>
      {errors.delete && <p className={styles.error}>{errors.delete}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Class</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Cancel Booking</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.class_name}</td>
                <td>{formatDate(booking.class_date)}</td>
                <td>{booking.class_time}</td>
                <td>{booking.class_location}</td>
                <td>{booking.class_instructor}</td>
                <td>{booking.class_session_duration} mins</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;
