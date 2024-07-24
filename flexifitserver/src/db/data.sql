CREATE TABLE fitness_studios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    contact VARCHAR(20),
    email VARCHAR(30) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description TEXT,
    date DATE,
    time TIME,
    location VARCHAR(100),
    instructor VARCHAR(20),
    session_duration INTEGER,
    class_size INT
);

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    contact VARCHAR(20),
    email VARCHAR(30) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
	member_id INT,
	class_id INT,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'Booked'
);

SELECT * from classes;
SELECT * from fitness_studios;
SELECT * from members;
SELECT * from bookings;

INSERT INTO fitness_studios (id, "name", contact, email, password_hash) VALUES
(103, 'fex', 90876043, 'fex@gmail.com','efiejfeiw');
INSERT INTO members(id, "name", contact, email, password_hash) VALUES
(23, 'Emily', 90542034, 'emily@gmail.com', 'wjijefioeo');
INSERT INTO classes (id, "name", description, date, time, location, instructor, session_duration, class_size) VALUES
(27,'class 1', 'crazy', '2024-01-01', '13:00:00', 'Aljunied','Joey', 20, 8);
INSERT INTO bookings(id, member_id, class_id, status ) VALUES 
(5, 23, 27,'booked');


SELECT 
  b.id, 
  m.name AS member_name, 
  c.name AS class_name, 
  c.date AS class_date, 
  c.time AS class_time, 
  c.location AS class_location,
  c.instructor AS class_instructor,
  c.session_duration AS class_session_duration,
  c.class_size AS class_class_size,
  b.status
FROM 
  bookings b
  INNER JOIN members m ON b.member_id = m.id
  INNER JOIN classes c ON b.class_id = c.id;
