import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./ManageClasses.module.css";

const validateClass = (classData) => {
  const errors = {};
  if (!classData.name) errors.name = "Class name is required";
  if (!classData.description) errors.description = "Description is required";
  if (!classData.date) errors.date = "Date is required";
  if (!classData.time) errors.time = "Time is required";
  if (!classData.location) errors.location = "Location is required";
  if (!classData.instructor) errors.instructor = "Instructor is required";
  if (!classData.session_duration)
    errors.session_duration =
      "Session duration is required and must be a number";
  if (!classData.class_size)
    errors.class_size = "Valid class size is required and must be a number";

  return errors;
};

const ManageClasses = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [classes, setClasses] = useState([]);
  const [editClass, setEditClass] = useState(null);
  const [newClass, setNewClass] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    instructor: "",
    session_duration: "",
    class_size: "",
  });
  const [errors, setErrors] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const fetchClasses = async () => {
    try {
      const data = await usingFetch(
        "/api/classes",
        "GET",
        undefined,
        userCtx.accessToken
      );
      const filteredClasses = data.filter(
        (classItem) => classItem.fitness_studio_id === userCtx.fitness_studioId
      );
      setClasses(filteredClasses);
    } catch (error) {
      console.error("Error fetching classes:", error.message);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAddClass = async (e) => {
    e.preventDefault();
    const validationErrors = validateClass(newClass);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const newClassData = {
        ...newClass,
        fitness_studio_id: userCtx.fitness_studioId,
      };
      await usingFetch(
        "/api/classes",
        "PUT",
        newClassData,
        userCtx.accessToken
      );
      alert("Class added successfully!");
      fetchClasses();
      setNewClass({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        instructor: "",
        session_duration: "",
        class_size: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await usingFetch("/api/classes", "DELETE", { id }, userCtx.accessToken);
      setClasses(classes.filter((classItem) => classItem.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();
    const validationErrors = validateClass(editClass);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedClassData = {
        ...editClass,
        fitness_studio_id: userCtx.fitness_studioId,
      };
      const response = await usingFetch(
        "/api/classes",
        "PATCH",
        updatedClassData,
        userCtx.accessToken
      );
      console.log("Update response:", response);
      alert("Class updated successfully!");
      fetchClasses();
      setEditClass(null);
      setErrors({});
    } catch (error) {
      console.error("Error updating class:", error.message);
    }
  };

  const handleEditClassChange = (e) => {
    const { name, value } = e.target;
    setEditClass((prev) => ({ ...prev, [name]: value }));
  };

  const openEditForm = (classItem) => {
    setEditClass(classItem);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manage Your Classes</h2>
      <form onSubmit={handleAddClass}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            name="description"
            value={newClass.description}
            onChange={(e) =>
              setNewClass({ ...newClass, description: e.target.value })
            }
            className={styles.input}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            name="date"
            value={newClass.date}
            onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
            className={styles.input}
          />
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Time</label>
          <input
            type="time"
            name="time"
            value={newClass.time}
            onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
            className={styles.input}
          />
          {errors.time && <span className={styles.error}>{errors.time}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            value={newClass.location}
            onChange={(e) =>
              setNewClass({ ...newClass, location: e.target.value })
            }
            className={styles.input}
          />
          {errors.location && (
            <span className={styles.error}>{errors.location}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Instructor</label>
          <input
            type="text"
            name="instructor"
            value={newClass.instructor}
            onChange={(e) =>
              setNewClass({ ...newClass, instructor: e.target.value })
            }
            className={styles.input}
          />
          {errors.instructor && (
            <span className={styles.error}>{errors.instructor}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Session Duration (mins)</label>
          <input
            type="number"
            name="session_duration"
            value={newClass.session_duration}
            onChange={(e) =>
              setNewClass({ ...newClass, session_duration: e.target.value })
            }
            className={styles.input}
          />
          {errors.session_duration && (
            <span className={styles.error}>{errors.session_duration}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Class Size</label>
          <input
            type="number"
            name="class_size"
            value={newClass.class_size}
            onChange={(e) =>
              setNewClass({ ...newClass, class_size: e.target.value })
            }
            className={styles.input}
          />
          {errors.class_size && (
            <span className={styles.error}>{errors.class_size}</span>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Add Class
        </button>
      </form>
      <ul className={styles.list}>
        {classes.map((classItem) => (
          <li key={classItem.id} className={styles.listItem}>
            <div className={styles.itemTitle}>{classItem.name}</div>
            <div className={styles.itemDetails}>
              <div className={styles.row}>
                <div className={styles.colMd3}>Description:</div>
                <div>{classItem.description}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.colMd3}>Date:</div>
                <div>{formatDate(classItem.date)}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.colMd3}>Time:</div>
                <div>{classItem.time}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.colMd3}>Location:</div>
                <div>{classItem.location}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.colMd3}>Instructor:</div>
                <div>{classItem.instructor}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.colMd3}>Session Duration:</div>
                <div>{classItem.session_duration} mins </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colMd3}>Class Size:</div>
                <div>{classItem.class_size}</div>
              </div>
              <button
                onClick={() => openEditForm(classItem)}
                className={`${styles.button} ${styles.update}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClass(classItem.id)}
                className={`${styles.button} ${styles.cancel}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editClass && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Edit Class</h2>
            <form onSubmit={handleUpdateClass}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editClass.name}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <input
                  type="text"
                  name="description"
                  value={editClass.description}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.description && (
                  <span className={styles.error}>{errors.description}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={editClass.date}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.date && (
                  <span className={styles.error}>{errors.date}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Time</label>
                <input
                  type="time"
                  name="time"
                  value={editClass.time}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.time && (
                  <span className={styles.error}>{errors.time}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editClass.location}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.location && (
                  <span className={styles.error}>{errors.location}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Instructor</label>
                <input
                  type="text"
                  name="instructor"
                  value={editClass.instructor}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.instructor && (
                  <span className={styles.error}>{errors.instructor}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Session Duration</label>
                <input
                  type="number"
                  name="session_duration"
                  value={editClass.session_duration}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.session_duration && (
                  <span className={styles.error}>
                    {errors.session_duration}
                  </span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Class Size</label>
                <input
                  type="number"
                  name="class_size"
                  value={editClass.class_size}
                  onChange={handleEditClassChange}
                  className={styles.modalInput}
                />
                {errors.class_size && (
                  <span className={styles.error}>{errors.class_size}</span>
                )}
              </div>
              <div className={styles.modalButtonRow}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.update}`}
                >
                  Update
                </button>
                <button
                  onClick={() => setEditClass(null)}
                  className={`${styles.button} ${styles.cancel}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
