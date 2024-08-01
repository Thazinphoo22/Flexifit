import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./ManageClasses.module.css";

const OverLay = ({
  editClass,
  handleEditClassChange,
  handleUpdateClass,
  setEditClass,
}) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h5 className={styles.textCenter}>Edit Class</h5>
        <form onSubmit={handleUpdateClass}>
          <div className={styles.row}>
            <div className="col-md-3">Name</div>
            <input
              type="text"
              name="name"
              value={editClass.name}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Description</div>
            <input
              type="text"
              name="description"
              value={editClass.description}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Date</div>
            <input
              type="date"
              name="date"
              value={editClass.date}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Time</div>
            <input
              type="time"
              name="time"
              value={editClass.time}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Location</div>
            <input
              type="text"
              name="location"
              value={editClass.location}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Instructor</div>
            <input
              type="text"
              name="instructor"
              value={editClass.instructor}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Session Duration</div>
            <input
              type="text"
              name="session_duration"
              value={editClass.session_duration}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Class Size</div>
            <input
              type="text"
              name="class_size"
              value={editClass.class_size}
              onChange={handleEditClassChange}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonRow}>
            <button type="submit" className={styles.update}>
              Update Class
            </button>
            <button
              className={styles.cancel}
              onClick={() => setEditClass(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
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
      console.log("Fetched classes:", filteredClasses);
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
    try {
      const updatedClassData = {
        ...editClass,
        fitness_studio_id: userCtx.fitness_studioId,
      };
      await usingFetch(
        "/api/classes",
        "PATCH",
        { id: editClass.id, ...updatedClassData },
        userCtx.accessToken
      );
      alert("Class updated successfully!");
      fetchClasses();
      setEditClass(null);
    } catch (error) {
      console.error(error);
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
    <div>
      <h2>Manage Classes</h2>
      <form onSubmit={handleAddClass}>
        <label>
          Name:
          <input
            type="text"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newClass.description}
            onChange={(e) =>
              setNewClass({ ...newClass, description: e.target.value })
            }
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={newClass.date}
            onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            value={newClass.time}
            onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={newClass.location}
            onChange={(e) =>
              setNewClass({ ...newClass, location: e.target.value })
            }
          />
        </label>
        <label>
          Instructor:
          <input
            type="text"
            value={newClass.instructor}
            onChange={(e) =>
              setNewClass({ ...newClass, instructor: e.target.value })
            }
          />
        </label>
        <label>
          Session Duration:
          <input
            type="text"
            value={newClass.session_duration}
            onChange={(e) =>
              setNewClass({ ...newClass, session_duration: e.target.value })
            }
          />
        </label>
        <label>
          Class Size:
          <input
            type="text"
            value={newClass.class_size}
            onChange={(e) =>
              setNewClass({ ...newClass, class_size: e.target.value })
            }
          />
        </label>
        <button type="submit">Add Class</button>
      </form>

      <h3>Existing Classes</h3>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>
            <h4>{classItem.name}</h4>
            <p>Description: {classItem.description}</p>
            <p>Date: {classItem.date}</p>
            <p>Time: {classItem.time}</p>
            <p>Location: {classItem.location}</p>
            <p>Instructor: {classItem.instructor}</p>
            <p>Session Duration: {classItem.session_duration} mins </p>
            <p>Class Size: {classItem.class_size}</p>
            <button onClick={() => openEditForm(classItem)}>Edit</button>
            <button onClick={() => handleDeleteClass(classItem.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {editClass &&
        ReactDOM.createPortal(
          <OverLay
            editClass={editClass}
            handleEditClassChange={handleEditClassChange}
            handleUpdateClass={handleUpdateClass}
            setEditClass={setEditClass}
          />,
          document.querySelector("#modal-root")
        )}
    </div>
  );
};

export default ManageClasses;
