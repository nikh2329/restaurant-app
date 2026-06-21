import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const scrollRevealRef = useRef([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data } = await axiosInstance.get('/menu?featured=true');
                if (Array.isArray(data) && data.length > 0) {
                    setFeatured(data.slice(0, 3));
                }
            } catch (err) {
                // falls back to static items below
            }
        };
        fetchFeatured();
    }, []);

    // Scroll reveal observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [featured]);

    // Fallback menu items if API returns empty
    const menuItems = featured.length > 0 ? featured.map(item => ({
        name: item.name,
        desc: item.description || 'Exquisite ingredients, masterfully prepared.',
        price: `₹${item.price}`,
        img: item.image,
        tag: 'Signature',
    })) : [
        {
            name: 'Butter Chicken',
            desc: 'Tandoor-grilled chicken tikka simmered in a velvety, rich tomato and cashew gravy finished with cream.',
            price: '₹149',
            img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
            tag: 'Signature',
        },
        {
            name: 'Masala Dosa',
            desc: 'Thin, crispy rice crepe stuffed with aromatic spiced potato mash, served with coconut chutney and sambar.',
            price: '₹99',
            img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop',
            tag: 'Signature',
        },
        {
            name: 'Gulab Jamun',
            desc: 'Golden milk-solid dumplings, deep-fried and soaked in warm cardamom and saffron sugar syrup.',
            price: '₹59',
            img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop',
            tag: 'Signature',
        },
    ];

    return (
        <div className="-mt-20">
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center animate-ken-burns"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMPR-tijgV4GOmFUIKMqUF50V9FzyTIyT4EtKAT9Le_DMFLMHb8AOPSMZWzjggy6VmZSX20fVJlvmPpPCIyaz_LrjXQrz_vkKGQwFHoKByclRqWdnaIvWgnWmqVMdga8P-M1z7ZYODB7ol1ZfFZAassoZ1g5IN6yjkDb4xPZ1gYwa9AN81pCwKWc5nvleua4fqVJ0MqiMCrlvgtEfUBMpN7K7VnmRa07U9R96-NgRU_5Wq9WEzAnjSaNDmw5lJBN04fHQkzhIZXrs')`
                        }}
                    />
                    <div className="absolute inset-0 hero-gradient" />
                </div>
                <div className="relative z-10 text-center px-margin-mobile max-w-4xl">
                    <h1 className="hero-entrance delay-1 font-display text-display-lg-mobile md:text-display-lg mb-4 tracking-tight text-on-background">
                        The Soul of Fine Dining
                    </h1>
                    <p className="hero-entrance delay-2 font-body text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
                        An immersive gastronomic journey through the essence of pure ingredients and elemental fire.
                    </p>
                    <div className="hero-entrance delay-3 flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            to="/reservations"
                            className="w-full md:w-auto px-10 py-5 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
                        >
                            Book a Table
                        </Link>
                        <Link
                            to="/menu"
                            className="w-full md:w-auto px-10 py-5 border border-primary text-primary font-label text-label-md uppercase tracking-widest hover:bg-primary/10 active:scale-95 transition-all"
                        >
                            View Menu
                        </Link>
                    </div>
                </div>
                {/* Scroll Hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-scroll-hint">
                    <span className="font-label text-label-sm uppercase tracking-[0.3em] rotate-90 mb-4">Scroll</span>
                    <div className="w-px h-12 bg-primary" />
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                    <div className="md:col-span-7 scroll-reveal">
                        <span className="font-label text-label-md text-primary uppercase tracking-[0.4em] mb-6 block">Our Heritage</span>
                        <h2 className="font-display text-display-lg-mobile md:text-headline-md mb-8">
                            A symphony of taste, texture, and tradition.
                        </h2>
                        <p className="font-body text-body-lg text-on-surface-variant max-w-xl mb-12">
                            At Swadha, we peel back the layers of complexity to reveal the pure heart of every ingredient. Our culinary philosophy celebrates the harvest, the sea, and the art of the fire.
                        </p>
                        <div className="relative h-96 w-full glass-panel overflow-hidden">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtwZDrLFxF3Kolu3XwwSBe8h9yHDesrMgNnnullvJ6BuX4W7kynDX9G0kHOS-1dv8edP5P_fohQq8ebsI0-KkX7wCK0zjQXN3gPOqa4YNiZP1rVdqTdQ36XbQyK77ZJyQHhefbApZ8AKPh3wvY6-SJEEYGzLZaGxQ2iPAmWLgp0slI6Hw2XUCG_LUIyiU6SNu9ZnZ0CDSto-kSLd11pXRdSaIB3oSX4YZ8yXq1aKJPGvktvn2ylqBIp-9VG9cGenbtgx5CzTgaIfg')`
                                }}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-5 flex flex-col gap-gutter mt-12 md:mt-32 scroll-reveal">
                        <div className="glass-panel p-10 flex-1">
                            <span className="material-symbols-outlined text-primary text-4xl mb-6 block">restaurant</span>
                            <h3 className="font-headline text-headline-sm mb-4">Curated Seasons</h3>
                            <p className="font-body text-body-md text-on-surface-variant">
                                Our menu evolves with the lunar cycles, ensuring every plate serves the pinnacle of seasonal perfection.
                            </p>
                        </div>
                        <div className="relative h-80 w-full overflow-hidden">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKRCTmGlWHn5mJ5h9D8FpkjNY0DvIMmTg5pxDt02SaYllXlVF_ot4RpiQiaOhEkmI94_ZpyRHP8YriHfIQxuwINilbdkwO2rSAwhc1VgBSRC5cmsuVtiWG8ffBk63xJEdo6o6pnQxUdq_ReMC9k7w017Cp6wzFU_XSkB206xVpwhah29XOD7PJSoKLyVSIS0W8EJHeKWXfWMfFyZc77MpVicQwjnXoga9gEfrpZbMJMG7F993jRQNuZMclQsLIIWEHezl3Zc9bXog')`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Signature Menu Preview */}
            <section className="bg-surface-container-low py-32">
                <div className="px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="font-display text-display-lg-mobile md:text-headline-md mb-4">The Winter Collection</h2>
                            <p className="font-body text-body-md text-on-surface-variant">A seven-course exploration of the senses.</p>
                        </div>
                        <Link
                            to="/menu"
                            className="font-label text-label-md text-primary uppercase tracking-widest border-b border-primary/30 pb-2 hover:border-primary transition-all"
                        >
                            Full Menu Explorer
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {menuItems.map((item, index) => (
                            <div key={index} className={`group cursor-pointer scroll-reveal ${index === 1 ? 'mt-0 md:mt-24' : ''}`}>
                                <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                        style={{ backgroundImage: `url('${item.img}')` }}
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 border border-white/20 text-[10px] text-white uppercase tracking-widest backdrop-blur-md">
                                            {item.tag}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-headline text-headline-sm group-hover:text-primary transition-colors">{item.name}</h4>
                                        <p className="font-label text-label-sm text-on-surface-variant mt-2">{item.desc}</p>
                                    </div>
                                    <span className="font-body text-body-md text-primary">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reservation CTA */}
            <section className="relative py-40 overflow-hidden">
                <div className="relative z-10 px-margin-mobile text-center max-w-3xl mx-auto scroll-reveal">
                    <h2 className="font-display text-display-lg-mobile md:text-display-lg mb-8 italic">
                        An evening of quiet luxury awaits.
                    </h2>
                    <p className="font-body text-body-lg text-on-surface-variant mb-12">
                        Tables are released 30 days in advance. We invite you to secure your passage into the essence of flavor.
                    </p>
                    <Link
                        to="/reservations"
                        className="inline-block px-16 py-6 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
                    >
                        Request a Reservation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;