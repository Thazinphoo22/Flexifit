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
    class_size INT,
    fitness_studio_id INTEGER REFERENCES fitness_studio(id) ON DELETE CASCADE
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
    member_id INTEGER REFERENCES member(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES class(id) ON DELETE CASCADE,
    book_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'Booked'
);
