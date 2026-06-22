# ClickCraft - Full-Stack E-Commerce & Showcase Platform

A modern, responsive, and secure Full-Stack Web Application designed for managing e-commerce operations, creating dynamic product showcases, and processing secure transactions. Built entirely using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript and TailwindCSS according to Rapid Application Development (RAD) principles.

---

## 🌐 Deployed URLs

* **Live Frontend:** [Insert your Vercel URL here]
* **Live Backend API:** [Insert your Render/Railway URL here]

---

## 🚀 Key Features

* **Role-Based Authentication & Authorization:** Implemented robust route guards supporting separate, personalized experiences for `ADMIN`, `SELLER`, and `CUSTOMER` roles.
* **AI-Powered Descriptions:** Seamless integration with Google Gemini API to automatically generate catchy, professional marketing descriptions for products.
* **Secure Payment Gateway:** Robust checkout process integrated with Stripe API for safe and reliable credit/debit card transactions.
* **Global State Management:** Structured state tracking using Redux Toolkit for handling shopping cart items, total calculations, and authentication states across screens.
* **Advanced Order Management:** Comprehensive seller dashboard to monitor orders, view payment statuses, and dynamically update delivery tracking.
* **Responsive E-Commerce UI:** Sleek, modern interfaces utilizing custom layouts, interactive shopping carts, and adaptive navigation for seamless mobile and desktop experiences.

---

## 🛠️ Tech Stack & Tools

* **Frontend Framework:** React 18 (Vite)
* **Backend Framework:** Node.js with Express.js
* **Language:** TypeScript (Strictly typed interfaces across both frontend and backend)
* **Database:** MongoDB (Atlas) & Mongoose ODM
* **Styling & UI:** TailwindCSS (Fully responsive layout with theme accents)
* **State Management:** Redux Toolkit
* **HTTP Client:** Axios (Configured with custom request interceptors for bearer tokens)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs for password hashing
* **Third-Party APIs:** Stripe (Payments), @google/generative-ai (Gemini AI)

---

## 📂 Project Architecture (Monorepo Structure)

```text
clickcraft/
├── frontend/                  # React + Vite Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI elements (CheckoutForm, etc.)
│   │   ├── screens/           # Main application pages (CartScreen, OrderScreen, etc.)
│   │   ├── store/             # Redux store and slices (cartSlice, authSlice)
│   │   ├── App.tsx            # Main layout and React Router setup
│   │   └── main.tsx           # Application mount entrypoint
│   ├── .env.example           # Frontend environment variables template (VITE_ keys)
│   ├── tailwind.config.js     # Tailwind style layouts configurations
│   └── tsconfig.json          # TypeScript compile setup
│
├── backend/                   # Node.js + Express Backend
│   ├── src/
│   │   ├── config/            # Database connection setup (db.ts)
│   │   ├── controllers/       # Business logic (orderController, aiController, etc.)
│   │   ├── models/            # Mongoose schemas & TypeScript interfaces (Order.ts, etc.)
│   │   ├── routes/            # Express API routing definitions
│   │   └── server.ts          # Main Express server entrypoint
│   ├── .env.example           # Backend environment variables template (MONGO_URI, STRIPE, etc.)
│   └── tsconfig.json          # TypeScript compile setup
│
└── README.md                  # Project documentation
