import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const lastScrollRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                setHidden(false);
                return;
            }
            if (currentScroll > lastScrollRef.current && currentScroll > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScrollRef.current = currentScroll;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setIsOpen(false); }, [location]);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/reservations', label: 'Reservations' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
            >
                {/* Left: Menu Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200 md:hidden"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-[28px]">
                            {isOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                    {/* Desktop nav links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`font-label text-label-md uppercase tracking-widest transition-colors duration-300 ${location.pathname === link.to ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="font-label text-label-md uppercase tracking-widest text-primary">
                                Admin
                            </Link>
                        )}
                    </nav>
                </div>

                {/* Center: Brand */}
                <Link
                    to="/"
                    className="font-display text-display-lg-mobile md:text-headline-md tracking-widest text-primary uppercase absolute left-1/2 -translate-x-1/2"
                >
                    SWADHA
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/cart"
                        className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200 relative"
                    >
                        <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="text-primary hover:opacity-80 transition-opacity">
                                <span className="material-symbols-outlined text-[28px]">person</span>
                            </Link>
                            <button
                                onClick={() => { logout(); navigate('/login'); }}
                                className="text-on-surface-variant hover:text-error transition-colors"
                            >
                                <span className="material-symbols-outlined text-[24px]">logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden md:block px-6 py-2 border border-primary text-primary font-label text-label-md uppercase tracking-widest hover:bg-primary/10 active:scale-95 transition-all"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl pt-24 px-margin-mobile md:hidden">
                    <nav className="flex flex-col gap-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`font-display text-headline-md ${location.pathname === link.to ? 'text-primary' : 'text-on-surface hover:text-primary'} transition-colors`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="font-display text-headline-md text-primary">Admin</Link>
                        )}
                        <div className="border-t border-white/10 pt-8 mt-4">
                            {user ? (
                                <div className="flex flex-col gap-4">
                                    <Link to="/profile" className="font-label text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => { logout(); navigate('/login'); }}
                                        className="font-label text-label-md uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-block px-10 py-4 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-widest active:scale-95 transition-transform"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Navbar;