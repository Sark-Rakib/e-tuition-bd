E-Tuition BD
Project Name
E-Tuition BD
Purpose
E-Tuition BD is an online tuition marketplace platform designed specifically for students and tutors in Bangladesh. It allows students to browse approved tuition postings, search by subject, sort by various criteria (e.g., newest first, budget high to low), and find suitable tutors easily. Logged-in users can post new tuition requests, manage their dashboard, and view payment history. This is a full-stack MERN (MongoDB, Express, React, Node.js) application aimed at connecting students with qualified tutors efficiently.
Features

User authentication (Login / Registration)
View paginated list of approved tuitions
Search tuitions by subject and sort options (newest first, budget high-to-low, low-to-high)
Authenticated users can add new tuition postings
User dashboard and payment history tracking
Fully responsive design (mobile, tablet, and desktop friendly)
Data fetching and caching with Tanstack React Query
Secure API calls using custom Axios instance
Protected routes and role-based access

Live URL

Packages Used
Frontend (Client - React)

react
react-dom
react-router-dom
react-hook-form
@tanstack/react-query
axios
daisyui (or Tailwind CSS if used)
tailwindcss
Others: jwt-decode, sweetalert2, etc. (if used)

Backend (Server - Node.js/Express)

express
mongoose (or mongodb)
cors
dotenv
jsonwebtoken
bcryptjs (for password hashing)
Others: payment gateway integrations (e.g., Stripe) if implemented
