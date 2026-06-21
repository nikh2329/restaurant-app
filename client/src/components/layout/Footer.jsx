import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-surface-container-lowest border-t border-white/5 py-12 px-margin-mobile md:px-margin-desktop flex flex-col items-center space-y-8 w-full text-center">
            <Link to="/" className="font-display text-display-lg-mobile md:text-headline-md text-primary tracking-widest uppercase">
                SWADHA
            </Link>
            <nav className="flex flex-wrap justify-center gap-8 md:gap-16">
                <Link
                    to="/about"
                    className="font-label text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors active:translate-y-px duration-150"
                >
                    About
                </Link>
                <Link
                    to="/terms"
                    className="font-label text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors active:translate-y-px duration-150"
                >
                    Terms & Conditions
                </Link>
                <Link
                    to="/contact"
                    className="font-label text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors active:translate-y-px duration-150"
                >
                    Contact
                </Link>
            </nav>
            <div className="pt-8 border-t border-white/5 w-full max-w-4xl opacity-40">
                <p className="font-label text-label-sm uppercase tracking-widest">
                    © {new Date().getFullYear()} SWADHA CULINARY GROUP
                </p>
            </div>
        </footer>
    );
};

export default Footer;