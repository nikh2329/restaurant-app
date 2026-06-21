import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AdminStats from './AdminStats';
import ManageMenu from './ManageMenu';
import ManageOrders from './ManageOrders';
import ManageReservations from './ManageReservations';

const AdminDashboard = () => {
    const adminLinks = [
        { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
        { to: '/admin/menu', label: 'Manage Menu', icon: 'restaurant_menu' },
        { to: '/admin/orders', label: 'Orders', icon: 'receipt_long' },
        { to: '/admin/reservations', label: 'Reservations', icon: 'calendar_today' },
    ];

    return (
        <div className="min-h-screen px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto pb-24">
            {/* Header */}
            <div className="text-center mb-12 pt-8">
                <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">Administration</span>
                <h1 className="font-display text-display-lg-mobile text-on-surface mt-4">Command Center</h1>
            </div>

            {/* Nav */}
            <nav className="flex flex-wrap justify-center gap-4 mb-12">
                {adminLinks.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="glass-panel px-6 py-3 flex items-center gap-3 hover:border-primary/30 transition-all group"
                    >
                        <span className="material-symbols-outlined text-primary">{link.icon}</span>
                        <span className="font-label text-label-md uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                            {link.label}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Content */}
            <Routes>
                <Route index element={<AdminStats />} />
                <Route path="menu" element={<ManageMenu />} />
                <Route path="orders" element={<ManageOrders />} />
                <Route path="reservations" element={<ManageReservations />} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;