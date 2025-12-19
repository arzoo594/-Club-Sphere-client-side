ClubSphere – Membership & Event Management Platform 
📌 ClubSphere

ClubSphere

🎯 Project Purpose

ClubSphere is a modern web application that helps users discover, join, and manage local clubs and events. It provides a smooth experience for members, club managers, and administrators through role-based dashboards, secure authentication, and online payments.

This repository contains the client-side (frontend) of the ClubSphere project, built with React and modern frontend technologies.

🌐 Live Website

🔗 Live URL: https://club-sphere-auth.web.app/



🚀 Key Features
🔓 Authentication & Authorization

Firebase Authentication (Email/Password + Google Login)

Role-based access control (Admin, Club Manager, Member)

JWT-based secure API access

Protected routes for dashboards

🏠 Public Features

Browse all approved clubs

View upcoming events

Club details & event details pages

Search clubs by name

Filter clubs by category

Sort clubs/events (Newest, Oldest, Fee-based, Date-based)

Responsive design for mobile, tablet, and desktop

Animated UI using Framer Motion

👤 Member Dashboard

View joined clubs and membership status

Register for club events (free or paid)

View registered events

Payment history

Upcoming events overview

🧑‍💼 Club Manager Dashboard

Create and manage clubs

Update club information

Set free or paid membership fees

Create, update, and delete events

View club members

View event registrations

Revenue overview for their clubs

🛠 Admin Dashboard

Platform overview with statistics

Manage all users and roles

Approve or reject clubs

View all clubs, events, memberships

View all payment records

Charts and analytics

💳 Payment Integration

Stripe payment integration (Test Mode)

Secure membership payments

Secure event registration payments

🧩 Technologies Used
Frontend

React

React Router DOM

Firebase Authentication

TanStack Query (React Query)

React Hook Form

Axios

Framer Motion

Stripe (Client SDK)

DaisyUI

Tailwind CSS

SweetAlert / React Hot Toast

📦 Important NPM Packages
react
react-router-dom
firebase
@tanstack/react-query
react-hook-form
axios
framer-motion
@stripe/react-stripe-js
@stripe/stripe-js
sweetalert2
react-hot-toast
tailwindcss
daisyui

🔐 Environment Variables

All sensitive keys are secured using environment variables.

Create a .env file in the root directory and add:

VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=your_backend_api_url


⚠️ Do not push .env file to GitHub

🧱 Project Structure (Client)
src/
│── assets/
│── components/
│── layouts/
│── pages/
│   ├── Home
│   ├── Clubs
│   ├── Events
│   ├── Login
│   ├── Register
│   ├── Dashboard
│       ├── Admin
│       ├── Manager
│       ├── Member
│── hooks/
│── routes/
│── services/
│── context/
│── main.jsx
│── App.jsx

🎨 UI & Design Highlights

Clean and recruiter-friendly UI

Consistent color theme across public site and dashboard

Equal-height cards and grid-based layouts

Smooth animations for better UX

Fully responsive on all devices

Proper spacing, alignment, and typography

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/your-username/clubsphere-client.git


Install dependencies

npm install


Run the project locally

npm run dev

📈 Commit History Requirement

✅ Minimum 20 meaningful commits on the client side

Descriptive commit messages followed

🔒 Security Notes

Firebase config secured with environment variables

JWT-based route protection

Firebase token verified on backend

Stripe keys never exposed

🧪 Testing Account (Provided in Main README)

Admin credentials and testing instructions are provided in the main submission README as required.

🏁 Final Notes

ClubSphere is designed as a full-featured MERN stack project that demonstrates:

Real-world authentication & authorization

Role-based dashboards

Secure payment integration

Scalable frontend architecture

Modern UI/UX best practices

✨ Thank you for reviewing ClubSphere!
If you like this project, feel free to ⭐ the repository.
