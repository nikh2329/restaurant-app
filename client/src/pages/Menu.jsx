import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const fallbackMenuData = {
    Starters: [
        { _id: 'f1', name: 'Paneer Tikka', price: 149, image: '/images/starters/paneer_tikka.jpg' },
        { _id: 'f2', name: 'Chicken 65', price: 149, image: '/images/starters/chicken_65.jpg' },
        { _id: 'f3', name: 'Veg Manchurian Dry', price: 119, image: '/images/starters/veg_manchurian.jpg' },
        { _id: 'f4', name: 'Hara Bhara Kebab', price: 99, image: '/images/starters/hara_bhara_kebab.jpg' },
        { _id: 'f5', name: 'Crispy Corn', price: 99, image: '/images/starters/crispy_corn.jpg' },
        { _id: 'f6', name: 'Tandoori Chicken', price: 149, image: '/images/starters/tandoori_chicken.jpg' },
        { _id: 'f7', name: 'Gobi 65', price: 109, image: '/images/starters/gobi_65.jpg' },
    ],
    'Main Courses': [
        { _id: 'f8', name: 'Butter Chicken', price: 149, image: '/images/mains/butter_chicken.png' },
        { _id: 'f9', name: 'Paneer Butter Masala', price: 139, image: '/images/mains/paneer_butter_masala.png' },
        { _id: 'f10', name: 'Chicken Biryani', price: 149, image: '/images/mains/chicken_biryani.png' },
        { _id: 'f11', name: 'Veg Biryani', price: 129, image: '/images/mains/veg_biryani.png' },
        { _id: 'f12', name: 'Dal Makhani', price: 119, image: '/images/mains/dal_makhani.png' },
        { _id: 'f13', name: 'Kadai Paneer', price: 139, image: '/images/mains/kadai_paneer.png' },
        { _id: 'f14', name: 'Mutton Rogan Josh', price: 149, image: '/images/mains/mutton_rogan_josh.png' },
    ],
    Desserts: [
        { _id: 'f15', name: 'Gulab Jamun', price: 59, image: '/images/desserts/gulab_jamun.png' },
        { _id: 'f16', name: 'Rasmalai', price: 89, image: '/images/desserts/rasmalai.png' },
        { _id: 'f17', name: 'Gajar Ka Halwa', price: 99, image: '/images/desserts/gajar_ka_halwa.png' },
        { _id: 'f18', name: 'Kaju Katli', price: 149, image: '/images/desserts/kaju_katli.png' },
        { _id: 'f19', name: 'Kulfi', price: 79, image: '/images/desserts/kulfi.png' },
        { _id: 'f20', name: 'Jalebi with Rabri', price: 119, image: '/images/desserts/jalebi_with_rabri.png' },
        { _id: 'f21', name: 'Rasgulla', price: 69, image: '/images/desserts/rasgulla.png' },
    ],
    Beverages: [
        { _id: 'f22', name: 'Mango Lassi', price: 89, image: '/images/beverages/mango_lassi.png' },
        { _id: 'f23', name: 'Masala Chai', price: 50, image: '/images/beverages/masala_chai.png' },
        { _id: 'f24', name: 'South Indian Filter Coffee', price: 60, image: '/images/beverages/filter_coffee.png' },
        { _id: 'f25', name: 'Fresh Lime Soda', price: 69, image: '/images/beverages/fresh_lime_soda.png' },
        { _id: 'f26', name: 'Sweet Lassi', price: 79, image: '/images/beverages/sweet_lassi.png' },
        { _id: 'f27', name: 'Rose Milk', price: 69, image: '/images/beverages/rose_milk.png' },
        { _id: 'f28', name: 'Watermelon Juice', price: 79, image: '/images/beverages/watermelon_juice.png' },
    ],
    'South Indian Specials': [
        { _id: 'f29', name: 'Masala Dosa', price: 99, image: '/images/south_indian/masala_dosa.png' },
        { _id: 'f30', name: 'Idli with Sambar', price: 59, image: '/images/south_indian/idli_sambar.png' },
        { _id: 'f31', name: 'Medu Vada', price: 69, image: '/images/south_indian/medu_vada.png' },
        { _id: 'f32', name: 'Pesarattu', price: 109, image: '/images/south_indian/pesarattu.png' },
        { _id: 'f33', name: 'Appam with Vegetable Stew', price: 139, image: '/images/south_indian/appam_stew.png' },
        { _id: 'f34', name: 'Ven Pongal', price: 89, image: '/images/south_indian/ven_pongal.png' },
        { _id: 'f35', name: 'Uttapam', price: 99, image: '/images/south_indian/uttapam.png' },
    ],
    'North Indian Specials': [
        { _id: 'f36', name: 'Chole Bhature', price: 129, image: '/images/north_indian/chole_bhature.png' },
        { _id: 'f37', name: 'Rajma Chawal', price: 119, image: '/images/north_indian/rajma_chawal.png' },
        { _id: 'f38', name: 'Amritsari Kulcha', price: 139, image: '/images/north_indian/amritsari_kulcha.png' },
        { _id: 'f39', name: 'Palak Paneer', price: 139, image: '/images/north_indian/palak_paneer.png' },
        { _id: 'f40', name: 'Dal Tadka', price: 109, image: '/images/north_indian/dal_tadka.png' },
        { _id: 'f41', name: 'Malai Kofta', price: 149, image: '/images/north_indian/malai_kofta.png' },
        { _id: 'f42', name: 'Butter Naan', price: 50, image: '/images/north_indian/butter_naan.png' },
    ],
};

const sectionOrder = [
    'Starters',
    'Main Courses',
    'Desserts',
    'Beverages',
    'South Indian Specials',
    'North Indian Specials',
];

const Menu = () => {
    const navigate = useNavigate();
    const [allItems, setAllItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [displayItems, setDisplayItems] = useState([]);
    const [headerVisible, setHeaderVisible] = useState(true);
    const { addToCart, cart, cartTotal } = useContext(CartContext);
    const gridRef = useRef(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const [menuRes, catRes] = await Promise.all([
                    axiosInstance.get('/menu'),
                    axiosInstance.get('/categories'),
                ]);

                if (menuRes.data.length > 0 && catRes.data.length > 0) {
                    setAllItems(menuRes.data);
                    const catNames = catRes.data.map(c => c.name);
                    setCategories(catNames);
                    setActiveTab(catNames[0]);
                } else {
                    useFallbackData();
                }
            } catch (err) {
                console.error(err);
                useFallbackData();
            }
        };

        const useFallbackData = () => {
            const cats = sectionOrder;
            setCategories(cats);
            setActiveTab(cats[0]);
            const items = [];
            cats.forEach(cat => {
                (fallbackMenuData[cat] || []).forEach(item => {
                    items.push({ ...item, category: { name: cat } });
                });
            });
            setAllItems(items);
        };

        fetchMenu();
    }, []);

    useEffect(() => {
        if (activeTab && allItems.length > 0) {
            const filtered = allItems.filter(item => {
                const catName = item.category?.name || item.category;
                return catName === activeTab;
            });
            setDisplayItems(filtered);
        }
    }, [activeTab, allItems]);

    // Scroll reveal for cards
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('menu-card-visible');
                        }, index * 80);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
        );

        if (gridRef.current) {
            gridRef.current.querySelectorAll('.menu-card').forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, [displayItems]);

    const switchTab = (category) => {
        setHeaderVisible(false);
        setTimeout(() => {
            setActiveTab(category);
            setHeaderVisible(true);
        }, 300);
    };

    const handleAddToBag = (item, e) => {
        e.stopPropagation();
        addToCart(item);
        toast.success(`${item.name} added to bag`, {
            style: {
                background: '#141414',
                color: '#fff',
                border: '1px solid rgba(212, 175, 55, 0.2)',
            },
            iconTheme: {
                primary: '#d4af37',
                secondary: '#141414',
            },
        });
    };

    const handleOrderNow = (item, e) => {
        e.stopPropagation();
        addToCart(item);
        navigate('/cart');
    };

    return (
        <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
            {/* Elegant Category Tabs */}
            <section className="max-w-[1400px] mx-auto px-4 md:px-8 pt-10 pb-4">
                <nav className="flex justify-center gap-2 md:gap-4 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => switchTab(cat)}
                            style={{
                                padding: '10px 20px',
                                fontSize: '11px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                                border: activeTab === cat ? '1px solid rgba(212, 175, 55, 0.6)' : '1px solid rgba(255,255,255,0.08)',
                                background: activeTab === cat ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                                color: activeTab === cat ? '#d4af37' : 'rgba(255,255,255,0.45)',
                                borderRadius: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.4s ease',
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
            </section>

            {/* Section Title */}
            <section className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div
                    className={`text-center pt-8 pb-12 transition-all duration-500 ease-in-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', 'Georgia', serif",
                            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                            fontWeight: 300,
                            color: '#fff',
                            letterSpacing: '0.08em',
                            marginBottom: '0',
                        }}
                    >
                        {activeTab}
                    </h2>
                    <div
                        style={{
                            width: '60px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                            margin: '16px auto 0',
                        }}
                    />
                </div>

                {/* Premium Menu Grid */}
                <div
                    ref={gridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '28px',
                        paddingBottom: '120px',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}
                >
                    {displayItems.map((item) => (
                        <div
                            key={item._id}
                            className="menu-card"
                            style={{
                                opacity: 0,
                                transform: 'translateY(30px)',
                                transition: 'opacity 0.6s ease, transform 0.6s ease',
                            }}
                        >
                            <div
                                className="group"
                                style={{
                                    background: '#141414',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                                    border: '1px solid rgba(255,255,255,0.04)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.06)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Food Image */}
                                <div style={{ position: 'relative', paddingTop: '85%', overflow: 'hidden' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.7s ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';
                                        }}
                                    />
                                    {/* Subtle gradient at bottom of image */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '40%',
                                            background: 'linear-gradient(to top, rgba(20,20,20,0.95), transparent)',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                </div>

                                {/* Dish Name & Actions */}
                                <div
                                    style={{
                                        padding: '20px 20px 22px',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontFamily: "'Playfair Display', 'Georgia', serif",
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            color: '#f0ece2',
                                            letterSpacing: '0.03em',
                                            margin: 0,
                                            lineHeight: 1.4,
                                            minHeight: '44px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.name}
                                    </h3>

                                    {/* Action Buttons */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '10px',
                                            width: '100%',
                                        }}
                                    >
                                        <button
                                            onClick={(e) => handleAddToBag(item, e)}
                                            style={{
                                                flex: 1,
                                                padding: '10px 0',
                                                fontSize: '9px',
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                fontWeight: 600,
                                                background: 'transparent',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: 'rgba(255,255,255,0.8)',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                fontFamily: "'Inter', sans-serif",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)';
                                                e.currentTarget.style.color = '#fff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                                                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                                            }}
                                        >
                                            Add to Bag
                                        </button>
                                        <button
                                            onClick={(e) => handleOrderNow(item, e)}
                                            style={{
                                                flex: 1,
                                                padding: '10px 0',
                                                fontSize: '9px',
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                fontWeight: 600,
                                                background: '#d4af37',
                                                border: '1px solid #d4af37',
                                                color: '#0a0a0a',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                fontFamily: "'Inter', sans-serif",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#e5c158';
                                                e.currentTarget.style.borderColor = '#e5c158';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#d4af37';
                                                e.currentTarget.style.borderColor = '#d4af37';
                                            }}
                                        >
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Floating Order Bar */}
            <div
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 transform transition-transform duration-500 ease-in-out ${cart.length > 0 ? 'translate-y-0' : 'translate-y-24'}`}
            >
                <Link
                    to="/cart"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 28px',
                        background: 'rgba(20,20,20,0.92)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '60px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: '#d4af37',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#0a0a0a',
                                fontWeight: 700,
                                fontSize: '14px',
                            }}
                        >
                            {cart.length}
                        </div>
                        <span
                            style={{
                                fontSize: '11px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#d4af37',
                                fontWeight: 500,
                            }}
                        >
                            View Order
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#d4af37', fontWeight: 600, fontSize: '1.05rem' }}>
                            ₹{cartTotal.toFixed(0)}
                        </span>
                        <span className="material-symbols-outlined" style={{ color: '#d4af37', fontSize: '20px' }}>
                            arrow_forward
                        </span>
                    </div>
                </Link>
            </div>

            {/* CSS for card animations */}
            <style>{`
                .menu-card-visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                @media (max-width: 640px) {
                    .menu-card div[style*="gridTemplateColumns"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Menu;