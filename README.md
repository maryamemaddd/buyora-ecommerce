# Buyora - Premium E-Commerce Platform ✨

![Buyora Banner](https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80)

## 🚀 Overview
**Buyora** is a fully functional, production-ready E-commerce application designed with an ultra-premium aesthetic. Built using the **MERN** stack (MongoDB, Express, React, Node.js), it features an immersive deep dark-mode UI with glassmorphism effects, a complete cart/checkout flow, and a sophisticated administrative dashboard.

## 🌟 Key Features
- **Modern Premium UI 🎨**: Advanced layout using Tailwind CSS, Framer Motion animations, and deep Glassmorphic aesthetics.
- **Full Featured Shop 🛒**: Extensive product catalog, category filtering, price range sorting, and regex-powered backend search parsing.
- **Authentication & Security 🔒**: JWT-based stateless authentication, React Router protected routes, bcrypt password hashing, and Joi payload validation.
- **Checkout & Payments 💳**: Robust cart management connected with Stripe API for secure transactional processing.
- **Admin Dashboard 📊**: Dedicated protected routes for managing product inventory and tracking live order statuses.
- **Responsive Layout 📱**: Meticulously scaled and responsive across all desktops, tablets, and mobile breakpoints.

## 🛠️ Technology Stack
### Frontend
* **React 18** (TypeScript) + Vite
* **Tailwind CSS** (Custom variants & theme tokens)
* **Framer Motion** & **Swiper JS** (Micro-animations & interactability)
* **React Router DOM v6** (Navigation)
* **Axios** (API Networking)

### Backend
* **Node.js** + **Express.js** (Server & Routing)
* **MongoDB** + **Mongoose** (Database Management)
* **Stripe SDK** (Payment Gateway Checkout)
* **JWT** & **bcryptjs** (Auth)

## 📁 Repository Structure
This is a comprehensive Monorepo encompassing both the client UI layer and the server logic.
```text
/
├── frontend/    # React/Vite Application 
└── e-c/         # Node.js API Backend
```

## ⚙️ Quick Start
To run this project locally, you will need Node.js and MongoDB installed on your machine.

### 1. Backend Setup
Navigate into the backend directory and install dependencies:
```bash
cd e-c
npm install
```
Configure your environment variables (`.env`) inside the `e-c/` folder:
```env
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
Open a new terminal node, navigate to the frontend directory:
```bash
cd frontend
npm install
```
Configure your environment variables (`.env`) inside the `frontend/` folder:
```env
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```
Start the Vite development build:
```bash
npm run dev
```

## 🌐 Live Preview
Checkout the live deployed version of the Frontend here:
👉 **[Buyora E-Commerce](http://premium-ecommerce.surge.sh)**

---
*Developed with meticulous attention to detail to deliver a hyper-premium digital storefront experience.*
