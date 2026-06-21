import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axiosInstance.post('/users/register', { name, email, password });
            login(data);
            toast.success('Welcome to Swadha');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">Join Us</span>
                    <h1 className="font-display text-display-lg-mobile text-on-surface mt-4">Create Account</h1>
                    <p className="font-body text-body-md text-on-surface-variant mt-4">
                        Begin your exclusive culinary journey.
                    </p>
                </div>

                {/* Form */}
                <div className="glass-panel p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : 'Create Account'}
                        </button>
                    </form>
                </div>

                {/* Login Link */}
                <div className="text-center mt-8">
                    <p className="font-body text-body-md text-on-surface-variant">
                        Already a member?{' '}
                        <Link to="/login" className="text-primary hover:opacity-80 transition-opacity font-label uppercase tracking-wider text-label-sm border-b border-primary/30 pb-0.5">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;