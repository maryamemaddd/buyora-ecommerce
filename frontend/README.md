# LUXE - Modern E-Commerce Frontend

This is a complete, production-ready frontend for a full-stack e-commerce application. Built with Vite, React (TypeScript), Tailwind CSS, and Context APIs. It is structured cleanly with modular services meant to connect seamlessly to existing backend APIs.

## Features Included

- **Public Views:** Home Dashboard (Hero, Categories, Trending products), Product Listing (Sorting & Search functionality), Product Detail views.
- **Authentication:** Sign In / Register functionalities mapping to backend with token handling.
- **Protected User Routes:** User profile, Shopping cart operations, Checkout logic with Address collection.
- **Payments:** Integrated with React Stripe.js for capturing secure payment intents, alongside a Cash-On-Delivery branching path.
- **Order Management:** View historical orders and order status.
- **Admin Dashboard Integration:** Protected Admin layout rendering total system states, allowing for full CRUD over products, and modifying the fulfillment status of orders.

## Technologies Used

- **React 19 + TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **Axios** (API Client with Interceptors)
- **React Router v7** (Navigation)
- **Stripe & React Stripe JS** (Secure Payment Integrations)
- **Lucide React** (Iconography)
- **React Hot Toast** (User notifications)

## Installation Guide

### Prerequisites
1. **Node.js** (v18+)
2. Working copy of the **E-commerce Node/Express backend** connected locally or deployed.

### Steps to Run locally

1. **Clone/Download this directory**
2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of this frontend folder (where `package.json` is located). Adjust it according to your backend settings and your Stripe keys.

   ```env
   # Ensure the base path exactly aligns with your backend router prefix
   VITE_API_URL=http://localhost:3000/api
   
   # For handling test payments on localhost via Stripe
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxx
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Folder Structure

- `/src/components`: UI primitives (`Button`, `Input`, `ProductCard`) and App Layout structures (`Navbar`, `ProtectedRoute`).
- `/src/context`: React context providing Global configuration states (`AuthContext`, `CartContext`).
- `/src/pages`: Distinct domain pages separated by functional layout components. Nested folder for `/admin`.
- `/src/services`: Reusable Axios API wrappers cleanly formatting requests bridging the API to the logic contexts without repeating URL paths.
- `/src/types`: Typescript Interfaces reflecting models expected identically to backend schema formats.

## Linking the Backend

**Important Auth details:**
When users log in, the backend token is saved securely in the localStorage of the browser. Using the robust Axios Interceptors feature inside `src/services/api.ts`, **all outgoing HTTP requests** automatically append the explicit header format:

```json
headers: {
  "token": "<JWT_TOKEN>"
}
```
This is fully aligned to bypassing the customary `Authorization: Bearer` requirement unless manually refactored. No modifications to your Node API validations rule structure are necessary!
