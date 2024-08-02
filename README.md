# FlexiFit
FlexiFit is a fitness class booking application built using the PERN stack (PostgreSQL, Express, React, Node.js). It provides a platform for fitness studios to manage their classes and for members to book classes.
For project planning and progress, visit our public board [here](https://trello.com/b/EW2R5gGr/project-4) .

# Features
* User Authentication: Sign-up, login, logout with password hashing.
* Role-based Access: Different functionalities for fitness studios and members.
* Class Management: Fitness studios can add, edit, and delete classes.
* Class Booking: Members can view and book classes.
* Member Dashboard: Members can search for classes and view their booked classes.
* Fitness Studio Dashboard: Fitness studios can manage their classes.
* Search Functionality: Search for classes by location.
* Responsive Design: Ensures usability across different devices.

Log in Page

<img width="1460" alt="Screenshot 2024-08-02 at 7 22 27 AM" src="https://github.com/user-attachments/assets/3d774be8-611e-4520-a1a3-39a3253f686c">


Sign Up Page
<img width="1454" alt="Screenshot 2024-08-02 at 7 22 41 AM" src="https://github.com/user-attachments/assets/af8ae07a-6f21-4c3c-92fd-288de409a9d5">



Member's DashBoard with upcoming classes and search functionality by location

<img width="1460" alt="Screenshot 2024-08-02 at 7 23 08 AM" src="https://github.com/user-attachments/assets/8e252e8d-c6f7-446d-b9dc-73cac4ec4953">


Member's Dashboard with Booking History

<img width="1437" alt="Screenshot 2024-08-02 at 7 23 24 AM" src="https://github.com/user-attachments/assets/b0262a83-c90f-49b4-ac50-6a9bb2bb6830">


Studio's Dashboard with Class Management
<img width="1466" alt="Screenshot 2024-08-02 at 7 55 27 AM" src="https://github.com/user-attachments/assets/96a464a4-42b3-42f2-87df-47dc171d3183">
<img width="1441" alt="Screenshot 2024-08-02 at 7 56 10 AM" src="https://github.com/user-attachments/assets/90f9d6ce-8222-4077-bc1e-0bb6aa3da388">


<img width="714" alt="Screenshot 2024-08-02 at 7 56 33 AM" src="https://github.com/user-attachments/assets/24783bcd-82d4-49a7-a4e3-72ccb1606b03">

# Technologies
* Frontend: React
* Backend: Node.js, Express
* Database: PostgreSQL
* Authentication: JSON Web Tokens (JWT)


# Next Steps
* Display the list of members who have booked a particular class.
* To notify members when a class becomes available or is fully booked.
* Implement payment processing for paid classes or membership fees.

***.env***

Backend

```
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

ACCESS_SECRET=
REFRESH_SECRET=
```

Frontend
```
VITE_SERVER=
```
