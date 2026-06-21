import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQty, cartTotal } = useContext(CartContext);
    const [instructions, setInstructions] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const serviceFee = cartTotal * 0.15;
    const vat = cartTotal * 0.08;
    const total = cartTotal + serviceFee + vat;

    const handleCheckout = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile text-center">
                <span className="material-symbols-outlined text-primary text-6xl mb-6">shopping_bag</span>
                <h2 className="font-display text-headline-md mb-4">Your Selection is Empty</h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-12 max-w-md">
                    Begin your culinary journey by exploring our carefully curated menu.
                </p>
                <Link
                    to="/menu"
                    className="px-10 py-5 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
                >
                    Explore Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto w-full pb-48">
                {/* Title */}
                <section className="pt-8 pb-6">
                    <h2 className="font-headline text-headline-md text-on-surface">Your Selection</h2>
                    <p className="font-label text-label-md text-on-surface-variant uppercase tracking-widest mt-1">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'}
                    </p>
                </section>

                {/* Cart Items */}
                <section className="space-y-4">
                    {cart.map((item, index) => (
                        <div
                            key={item._id}
                            className="flex gap-4 py-4 item-row"
                            style={{ animationDelay: `${index * 75}ms` }}
                        >
                            {/* Image */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Details */}
                            <div className="flex flex-col justify-between flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-headline text-headline-sm leading-tight">{item.name}</h3>
                                        <p className="font-label text-label-sm text-on-surface-variant mt-1">
                                            {item.description?.slice(0, 40) || 'Chef\'s special'}
                                        </p>
                                    </div>
                                    <p className="font-body text-body-md text-primary">₹{item.price}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-4 border border-white/10 rounded-full px-3 py-1">
                                        <button
                                            onClick={() => item.qty > 1 ? updateQty(item._id, item.qty - 1) : removeFromCart(item._id)}
                                            className="text-on-surface-variant hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">remove</span>
                                        </button>
                                        <span className="font-label text-label-md">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item._id, item.qty + 1)}
                                            className="text-on-surface-variant hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">add</span>
                                        </button>
                                    </div>
                                    {/* Delete */}
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-on-surface-variant hover:text-error transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Special Instructions */}
                <section className="mt-12">
                    <label className="font-label text-label-md text-on-surface-variant uppercase tracking-widest block mb-4">
                        Special Instructions
                    </label>
                    <div className="relative group">
                        <textarea
                            className="w-full bg-transparent border-b border-white/20 focus:border-primary focus:ring-0 text-body-md font-body placeholder-white/20 py-2 transition-colors resize-none focus:outline-none"
                            placeholder="Allergies, seating preferences, or notes for the chef..."
                            rows="3"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within:w-full transition-all duration-500" />
                    </div>
                </section>

                {/* Order Summary */}
                <section className="mt-12 space-y-3 pb-8">
                    <div className="flex justify-between items-center text-on-surface-variant">
                        <span className="font-label text-label-md uppercase tracking-widest">Subtotal</span>
                        <span className="font-body text-body-md">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                        <span className="font-label text-label-md uppercase tracking-widest">Service Fee (15%)</span>
                        <span className="font-body text-body-md">₹{serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                        <span className="font-label text-label-md uppercase tracking-widest">VAT</span>
                        <span className="font-body text-body-md">₹{vat.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-headline text-headline-sm">Total</span>
                        <span className="font-headline text-headline-sm text-primary">₹{total.toFixed(2)}</span>
                    </div>
                </section>
            </main>

            {/* Fixed Bottom CTA */}
            <footer className="fixed bottom-0 left-0 w-full bg-surface-container-low/95 backdrop-blur-2xl border-t border-white/5 px-margin-mobile pt-6 pb-10 z-50">
                <Link
                    to="/checkout"
                    className="w-full bg-primary-container text-on-primary-container font-label text-label-md py-5 flex items-center justify-between px-8 uppercase tracking-widest active:scale-[0.98] transition-transform duration-150"
                >
                    <span>Proceed to Checkout</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">₹{total.toFixed(2)}</span>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </div>
                </Link>
                <p className="text-center font-label text-label-sm text-on-surface-variant/40 mt-4 uppercase tracking-[0.2em]">
                    Secure Encryption & Premium Concierge Service
                </p>
            </footer>
        </div>
    );
};

export default Cart;