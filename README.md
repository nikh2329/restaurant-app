# 🍽️ Swadha Restaurant & Lounge

A premium full-stack restaurant web application built with the **MERN Stack** (MongoDB, Express.js, React, and Node.js). The project features a luxury black-and-gold design, online food ordering, table reservations, an admin dashboard, and a high-fidelity mock payment experience designed for portfolio demonstration.

## 🌐 Live Demo

**Frontend:** https://restaurant-app-three-omega.vercel.app/

---

## ✨ Features

### 🍴 Food Ordering
- Browse menu by category
- View detailed dish pages
- Add items to cart
- Dynamic order summary
- Multi-step checkout experience

### 🍽️ Table Reservations
- Select date, time, and party size
- Premium reservation wizard
- Interactive time slot selection
- Reservation confirmation flow

### 💳 Premium Mock Payment
- Shared payment system for **Reservations** and **Food Orders**
- Credit/Debit Card interface with animated preview
- UPI payment option
- Cash on Delivery (COD)
- Premium processing animation
- Confirmation sound and success screen
- Mock order/booking IDs
- **No real payment processing**

### 👤 User & Admin
- User authentication
- Profile management
- Admin dashboard
- Menu management
- Order management
- Reservation management

### 📱 Responsive UI
- Desktop, tablet, and mobile optimized
- Luxury black-and-gold theme
- Smooth animations and micro-interactions
- High-quality food imagery

---

## 🛠️ Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Deployment | GitHub, Vercel |
| Audio | Web Audio API |

---

## 📁 Project Structure

```text
restaurant-app/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/nikh2329/restaurant-app.git
cd restaurant-app
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 🏗️ Production Build

### Frontend

```bash
cd client
npm run build
```

### Backend

```bash
cd server
npm start
```

---

## 🔒 Payment Disclaimer

This project includes a **mock payment gateway** for demonstration purposes.

- ✅ Premium payment UI and animations
- ✅ Simulated processing and confirmation
- ✅ Mock Card, UPI, and COD support
- ❌ No real transactions
- ❌ No payment information is stored or transmitted

---

## 🚀 Future Improvements

- Stripe/Razorpay integration
- Email & SMS notifications
- Live order tracking
- Reservation analytics
- Loyalty rewards & coupons
- AI-powered recommendations





