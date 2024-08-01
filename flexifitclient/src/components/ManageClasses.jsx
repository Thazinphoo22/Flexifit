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
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h5 className={styles.modalTitle}>Edit Class</h5>
        <form onSubmit={handleUpdateClass}>
          <div className={styles.row}>
            <div className="col-md-3">Name</div>
            <input
              type="text"
              name="name"
              value={editClass.name}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Description</div>
            <input
              type="text"
              name="description"
              value={editClass.description}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Date</div>
            <input
              type="date"
              name="date"
              value={editClass.date}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Time</div>
            <input
              type="time"
              name="time"
              value={editClass.time}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Location</div>
            <input
              type="text"
              name="location"
              value={editClass.location}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Instructor</div>
            <input
              type="text"
              name="instructor"
              value={editClass.instructor}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Session Duration</div>
            <input
              type="text"
              name="session_duration"
              value={editClass.session_duration}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.row}>
            <div className="col-md-3">Class Size</div>
            <input
              type="text"
              name="class_size"
              value={editClass.class_size}
              onChange={handleEditClassChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalButtonRow}>
            <button type="submit" className={styles.update}>
              Update Class
            </button>
            <button
              type="button"
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
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Session Duration</label>
          <input
            type="text"
            name="session_duration"
            value={newClass.session_duration}
            onChange={(e) =>
              setNewClass({ ...newClass, session_duration: e.target.value })
            }
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Class Size</label>
          <input
            type="text"
            name="class_size"
            value={newClass.class_size}
            onChange={(e) =>
              setNewClass({ ...newClass, class_size: e.target.value })
            }
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Class
        </button>
      </form>

      <ul className={styles.list}>
        {classes.map((classItem) => (
          <li key={classItem.id} className={styles.listItem}>
            <h3 className={styles.itemTitle}>{classItem.name}</h3>
            <div className={styles.itemDetails}>
              <div className={styles.row}>
                <div className="col-md-3">Description</div>
                <div>{classItem.description}</div>
              </div>
              <div className={styles.row}>
                <div className="col-md-3">Date</div>
                <div>{formatDate(classItem.date)}</div>
              </div>
              <div className={styles.row}>
                <div className="col-md-3">Time</div>
                <div>{classItem.time}</div>
              </div>
              <div className={styles.row}>
                <div className="col-md-3">Location</div>
                <div>{classItem.location}</div>
              </div>
              <div className={styles.row}>
                <div className="col-md-3">Instructor</div>
                <div>{classItem.instructor}</div>
              </div>
              <div className={styles.row}>
                <div className="col-md-3">Session Duration</div>
                <div>{classItem.session_duration}</div>
              </div>
              <div className={styles.row}>
                <div className="col-md-3">Class Size</div>
                <div>{classItem.class_size}</div>
              </div>
              <button
                className={`${styles.button} ${styles.update}`}
                onClick={() => openEditForm(classItem)}
              >
                Edit
              </button>
              <button
                className={`${styles.button} ${styles.cancel}`}
                onClick={() => handleDeleteClass(classItem.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editClass && (
        <OverLay
          editClass={editClass}
          handleEditClassChange={handleEditClassChange}
          handleUpdateClass={handleUpdateClass}
          setEditClass={setEditClass}
        />
      )}
    </div>
  );
};

export default ManageClasses;
