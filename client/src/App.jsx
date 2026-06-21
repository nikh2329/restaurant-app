import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import MenuDetails from './pages/MenuDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Reservations from './pages/Reservations';
import AdminDashboard from './pages/admin/AdminDashboard';
import About from './pages/About';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="min-h-screen flex flex-col bg-background text-on-background">
                        <Navbar />
                        <main className="flex-grow pt-20">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/menu/:id" element={<MenuDetails />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/reservations" element={<Reservations />} />
                                <Route path="/admin/*" element={<AdminDashboard />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/terms" element={<Terms />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: '#201f1f',
                                color: '#e5e2e1',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '14px',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#d4af37',
                                    secondary: '#554300',
                                },
                            },
                        }}
                    />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;