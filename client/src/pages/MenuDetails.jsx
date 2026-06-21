import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { CartContext } from '../context/CartContext';

const MenuDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data } = await axiosInstance.get(`/menu/${id}`);
                setItem(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="font-label text-label-md text-on-surface-variant uppercase tracking-widest">Loading</span>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile text-center">
                <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-6">restaurant</span>
                <h2 className="font-display text-headline-md mb-4">Dish Not Found</h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-12">
                    This creation may have been removed from our seasonal collection.
                </p>
                <Link
                    to="/menu"
                    className="px-10 py-5 border border-primary text-primary font-label text-label-md uppercase tracking-widest hover:bg-primary/10 active:scale-95 transition-all"
                >
                    Back to Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-32">
            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <Link
                    to="/menu"
                    className="absolute top-24 left-margin-mobile md:left-margin-desktop flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-label-md uppercase tracking-widest"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Menu
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop -mt-32 relative z-10">
                <div className="glass-panel p-8 md:p-12">
                    {/* Category Label */}
                    {item.category && (
                        <span className="font-label text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">
                            {item.category.name || item.category}
                        </span>
                    )}

                    {/* Title & Price */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h1 className="font-display text-display-lg-mobile md:text-headline-md">{item.name}</h1>
                        <span className="font-display text-headline-md text-primary">₹{item.price}</span>
                    </div>

                    {/* Description */}
                    <p className="font-body text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                        {item.description || 'A masterful creation by our executive chef, showcasing the finest seasonal ingredients with innovative technique and artistic presentation.'}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-10">
                            {item.tags.map(tag => (
                                <span key={tag} className="px-4 py-1.5 border border-outline-variant rounded-full font-label text-label-sm uppercase tracking-wider text-on-surface-variant">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Rating */}
                    {item.rating && (
                        <div className="flex items-center gap-3 mb-10">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`material-symbols-outlined text-[20px] ${i < Math.round(item.rating) ? 'text-primary' : 'text-outline-variant'}`}
                                        style={{ fontVariationSettings: i < Math.round(item.rating) ? "'FILL' 1" : "'FILL' 0" }}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                            <span className="font-label text-label-md text-on-surface-variant">{item.rating}</span>
                        </div>
                    )}

                    {/* CTA */}
                    <button
                        onClick={() => addToCart(item)}
                        className="w-full py-5 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all"
                    >
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;