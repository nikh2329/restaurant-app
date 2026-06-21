import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile text-center">
                <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-6">person</span>
                <h2 className="font-display text-headline-md mb-4">Sign In Required</h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-12">
                    Please sign in to access your profile and order history.
                </p>
                <Link
                    to="/login"
                    className="px-10 py-5 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto pb-24">
            {/* Header */}
            <div className="text-center mb-16 pt-8">
                <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">Your Account</span>
                <h1 className="font-display text-display-lg-mobile text-on-surface mt-4">Welcome Back</h1>
            </div>

            {/* Profile Card */}
            <div className="glass-panel p-8 md:p-12 mb-8">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container text-3xl">person</span>
                    </div>
                    <div>
                        <h2 className="font-headline text-headline-sm">{user.name}</h2>
                        <p className="font-body text-body-md text-on-surface-variant">{user.email}</p>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-label text-label-md text-on-surface-variant uppercase tracking-widest">Member Since</span>
                        <span className="font-body text-body-md text-on-surface">2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-label text-label-md text-on-surface-variant uppercase tracking-widest">Status</span>
                        <span className="font-label text-label-md text-primary uppercase tracking-widest">
                            {user.role === 'admin' ? 'Administrator' : 'Member'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="glass-panel p-8 md:p-12 mb-8">
                <h3 className="font-headline text-headline-sm mb-6">Quick Links</h3>
                <div className="space-y-4">
                    <Link
                        to="/reservations"
                        className="flex items-center justify-between py-4 border-b border-white/5 group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary">calendar_today</span>
                            <span className="font-body text-body-md group-hover:text-primary transition-colors">My Reservations</span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                    </Link>
                    <Link
                        to="/cart"
                        className="flex items-center justify-between py-4 border-b border-white/5 group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary">shopping_bag</span>
                            <span className="font-body text-body-md group-hover:text-primary transition-colors">Current Order</span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                    </Link>
                    <Link
                        to="/menu"
                        className="flex items-center justify-between py-4 group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary">restaurant_menu</span>
                            <span className="font-body text-body-md group-hover:text-primary transition-colors">Browse Menu</span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                    </Link>
                </div>
            </div>

            {/* Logout */}
            <button
                onClick={() => { logout(); navigate('/login'); }}
                className="w-full py-5 border border-outline-variant text-on-surface-variant font-label text-label-md uppercase tracking-widest hover:border-error hover:text-error active:scale-95 transition-all"
            >
                Sign Out
            </button>
        </div>
    );
};

export default Profile;