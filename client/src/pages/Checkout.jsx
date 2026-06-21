import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import { playSuccessChime, generateMockId } from '../utils/paymentUtils';
import CardPreview from '../components/payment/CardPreview';
import CardForm from '../components/payment/CardForm';
import UpiForm from '../components/payment/UpiForm';
import CodForm from '../components/payment/CodForm';
import ProcessingOverlay from '../components/payment/ProcessingOverlay';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Flow Steps: 1 = Delivery Details, 2 = Order Summary, 3 = Payment, 4 = Success Confirmation
    const [currentStep, setCurrentStep] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Delivery details states
    const [fullName, setFullName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [instructions, setInstructions] = useState('');

    // Payment states
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'cod'
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [upiId, setUpiId] = useState('');

    // Processing states
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingText, setProcessingText] = useState('Confirming Your Order...');
    const [orderId, setOrderId] = useState('');

    // Calculation breakdown
    const serviceFee = cartTotal * 0.15;
    const vat = cartTotal * 0.08;
    const deliveryFee = cartTotal > 0 ? 50 : 0;
    const grandTotal = cartTotal + serviceFee + vat + deliveryFee;

    // Handle form transitions
    const handleNextStep = (e) => {
        e.preventDefault();
        if (currentStep === 1) {
            if (!fullName.trim()) return toast.error('Please enter your full name');
            if (!phone.trim() || phone.length < 10) return toast.error('Please enter a valid phone number');
            if (!email.trim() || !email.includes('@')) return toast.error('Please enter a valid email address');
            if (!address.trim()) return toast.error('Please enter your delivery address');
            if (!city.trim()) return toast.error('Please enter your city');
            if (!pincode.trim() || pincode.length < 6) return toast.error('Please enter a valid 6-digit pincode');
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle Mock Order Placement
    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        // Extra Validation for Payment Step
        if (paymentMethod === 'card') {
            if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
                return toast.error('Please enter a valid 16-digit card number');
            }
            if (!cardName.trim()) {
                return toast.error('Please enter the cardholder name');
            }
            if (!cardExpiry || cardExpiry.length < 5) {
                return toast.error('Please enter a valid expiry date (MM/YY)');
            }
            if (!cardCvv || cardCvv.length < 3) {
                return toast.error('Please enter a valid CVV');
            }
        } else if (paymentMethod === 'upi') {
            if (!upiId || !upiId.includes('@')) {
                return toast.error('Please enter a valid UPI ID (e.g. name@upi)');
            }
        }

        setIsProcessing(true);
        setProcessingText('Confirming Your Order...');

        setTimeout(() => {
            setProcessingText(paymentMethod === 'cod' ? 'Preparing Delivery Manifest...' : 'Authorizing Hold Payment...');
        }, 1000);

        setTimeout(() => {
            setProcessingText('Securing Fresh Culinary Preparation...');
        }, 2000);

        setTimeout(async () => {
            const finalOrderId = generateMockId('SWD-ORD');
            setOrderId(finalOrderId);

            try {
                // Post order request to server, keep original functionality intact
                await axiosInstance.post('/orders', {
                    items: cart.map(item => ({
                        menuItem: item._id,
                        quantity: item.qty,
                        price: item.price,
                    })),
                    totalPrice: grandTotal,
                });
            } catch (err) {
                console.warn('Axios order logging warning (fallback to mock success):', err);
            }

            clearCart();
            setIsProcessing(false);
            setIsConfirmed(true);
            playSuccessChime();
            toast.success('Order placed successfully!');
        }, 3000);
    };

    // Empty Cart Check
    if (cart.length === 0 && !isConfirmed) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile text-center">
                <span className="material-symbols-outlined text-primary text-6xl mb-6">shopping_bag</span>
                <h2 className="font-display text-headline-md mb-4">Nothing to Checkout</h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-12">
                    Add items from our menu to begin.
                </p>
                <Link
                    to="/menu"
                    className="px-10 py-5 border border-primary text-primary font-label text-label-md uppercase tracking-widest hover:bg-primary/10 active:scale-95 transition-all"
                >
                    Explore Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-margin-mobile md:px-margin-desktop pb-24 relative">
            <style>{`
                /* Shimmer button animation */
                .shimmer-btn::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -60%;
                    width: 30%;
                    height: 200%;
                    background: linear-gradient(
                        to right,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.3) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    transform: rotate(25deg);
                    transition: none;
                }
                .shimmer-btn:hover::after {
                    left: 120%;
                    transition: all 0.75s ease-in-out;
                }
                .shimmer-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4) !important;
                }
                .shimmer-btn:active {
                    transform: translateY(0);
                }

                /* Animated Checkmark Draw-in */
                .checkmark-circle {
                    stroke-dasharray: 166;
                    stroke-dashoffset: 166;
                    stroke-width: 2;
                    stroke-miterlimit: 10;
                    stroke: #d4af37;
                    fill: none;
                    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                }
                .checkmark-check {
                    transform-origin: 50% 50%;
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
                }
                @keyframes stroke {
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
                
                /* Success expanding gold ring */
                .success-ring {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border: 2px solid #d4af37;
                    border-radius: 50%;
                    animation: ring-expand 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
                    opacity: 0;
                }
                @keyframes ring-expand {
                    0% {
                        transform: scale(0.6);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1.6);
                        opacity: 0;
                    }
                }

                /* Sparkle particles */
                .sparkle {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: #d4af37;
                    border-radius: 50%;
                    opacity: 0;
                }
                .sparkle-1 { animation: float-sparkle-1 1s ease-out 0.5s forwards; }
                .sparkle-2 { animation: float-sparkle-2 1s ease-out 0.5s forwards; }
                .sparkle-3 { animation: float-sparkle-3 1s ease-out 0.5s forwards; }
                .sparkle-4 { animation: float-sparkle-4 1s ease-out 0.5s forwards; }
                
                @keyframes float-sparkle-1 {
                    0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
                    100% { transform: translate(-30px, -30px) scale(1.2); opacity: 0; }
                }
                @keyframes float-sparkle-2 {
                    0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
                    100% { transform: translate(30px, -30px) scale(1.2); opacity: 0; }
                }
                @keyframes float-sparkle-3 {
                    0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
                    100% { transform: translate(-30px, 30px) scale(1.2); opacity: 0; }
                }
                @keyframes float-sparkle-4 {
                    0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
                    100% { transform: translate(30px, 30px) scale(1.2); opacity: 0; }
                }
            `}</style>

            {/* Header */}
            {!isConfirmed && (
                <div className="text-center mb-12 space-y-3 max-w-2xl mx-auto pt-8">
                    <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">Premium Delivery</span>
                    <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">Checkout Flow</h1>
                    <p className="font-body text-body-lg text-on-surface-variant">
                        Indulge in gourmet dining delivered right to your sanctuary.
                    </p>
                </div>
            )}

            {/* Checkout Widget */}
            {!isConfirmed && (
                <div className="w-full max-w-3xl glass-panel p-8 md:p-12 relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                        <div
                            className="h-full bg-primary transition-all duration-700 ease-in-out"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>

                    <form onSubmit={currentStep === 3 ? handlePlaceOrder : handleNextStep} className="space-y-8">
                        {/* Step 1: Delivery Details */}
                        {currentStep === 1 && (
                            <section className="step-transition opacity-100 block">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="font-headline text-headline-sm text-on-surface">1. Delivery Details</h2>
                                    <span className="font-label text-label-sm text-on-surface-variant">01 / 03</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                    {/* Full Name */}
                                    <div className="space-y-1 relative font-body">
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            placeholder=" "
                                            id="checkout_fullname"
                                            className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                        />
                                        <label 
                                            htmlFor="checkout_fullname"
                                            className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                        >
                                            Full Name
                                        </label>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-1 relative font-body">
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                                            required
                                            placeholder=" "
                                            id="checkout_phone"
                                            className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                        />
                                        <label 
                                            htmlFor="checkout_phone"
                                            className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                        >
                                            Phone Number
                                        </label>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1 relative font-body md:col-span-2">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder=" "
                                            id="checkout_email"
                                            className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                        />
                                        <label 
                                            htmlFor="checkout_email"
                                            className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                        >
                                            Email Address
                                        </label>
                                    </div>

                                    {/* Delivery Address */}
                                    <div className="space-y-1 relative font-body md:col-span-2">
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                            placeholder=" "
                                            id="checkout_address"
                                            className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                        />
                                        <label 
                                            htmlFor="checkout_address"
                                            className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                        >
                                            Street Address
                                        </label>
                                    </div>

                                    {/* City */}
                                    <div className="space-y-1 relative font-body">
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                            placeholder=" "
                                            id="checkout_city"
                                            className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                        />
                                        <label 
                                            htmlFor="checkout_city"
                                            className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                        >
                                            City
                                        </label>
                                    </div>

                                    {/* Pincode */}
                                    <div className="space-y-1 relative font-body">
                                        <input
                                            type="text"
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                                            required
                                            placeholder=" "
                                            id="checkout_pincode"
                                            className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                        />
                                        <label 
                                            htmlFor="checkout_pincode"
                                            className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                        >
                                            Pincode
                                        </label>
                                    </div>

                                    {/* Special Instructions */}
                                    <div className="space-y-1 relative font-body md:col-span-2">
                                        <textarea
                                            value={instructions}
                                            onChange={(e) => setInstructions(e.target.value)}
                                            placeholder=" "
                                            rows="2"
                                            id="checkout_instructions"
                                            className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all resize-none"
                                        />
                                        <label 
                                            htmlFor="checkout_instructions"
                                            className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                        >
                                            Delivery Notes / Chef Instructions
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-end">
                                    <button
                                        type="submit"
                                        className="group flex items-center gap-2 font-label text-label-md text-primary uppercase tracking-widest hover:opacity-70 transition-opacity"
                                    >
                                        Next Step
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Step 2: Order Summary */}
                        {currentStep === 2 && (
                            <section className="step-transition opacity-100 block">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="font-headline text-headline-sm text-on-surface">2. Order Summary</h2>
                                    <span className="font-label text-label-sm text-on-surface-variant">02 / 03</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                    {/* Delivery summary card */}
                                    <div 
                                        className="p-6 rounded-2xl space-y-4"
                                        style={{ 
                                            background: 'rgba(255, 255, 255, 0.02)', 
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                        }}
                                    >
                                        <h3 className="font-headline text-primary text-headline-sm pb-2 border-b border-white/5">Destination</h3>
                                        <div className="space-y-3 font-body text-body-md text-on-surface-variant">
                                            <div>
                                                <div className="text-[10px] text-white/40 uppercase tracking-widest">Recipient</div>
                                                <div className="text-white font-medium">{fullName}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-white/40 uppercase tracking-widest">Phone</div>
                                                <div className="text-white font-medium">{phone}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-white/40 uppercase tracking-widest">Address</div>
                                                <div className="text-white font-medium">{address}, {city} - {pincode}</div>
                                            </div>
                                            {instructions && (
                                                <div>
                                                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Notes</div>
                                                    <div className="text-white font-medium italic">"{instructions}"</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cost Summary Card */}
                                    <div 
                                        className="p-6 rounded-2xl space-y-4"
                                        style={{ 
                                            background: 'rgba(255, 255, 255, 0.02)', 
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                        }}
                                    >
                                        <h3 className="font-headline text-primary text-headline-sm pb-2 border-b border-white/5">Breakdown</h3>
                                        <div className="max-h-36 overflow-y-auto space-y-2 pr-2">
                                            {cart.map(item => (
                                                <div key={item._id} className="flex justify-between text-body-md text-on-surface-variant">
                                                    <span>{item.name} <span className="text-[11px] opacity-60">x{item.qty}</span></span>
                                                    <span className="text-white">₹{(item.price * item.qty).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2 pt-2 border-t border-white/5 text-body-md text-on-surface-variant">
                                            <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <span>₹{cartTotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Delivery Fee</span>
                                                <span>₹{deliveryFee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Service Fee (15%)</span>
                                                <span>₹{serviceFee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>VAT (8%)</span>
                                                <span>₹{vat.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between pt-3 border-t border-white/10 font-label uppercase text-[14px] text-primary font-bold">
                                                <span>Grand Total</span>
                                                <span>₹{grandTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="group flex items-center gap-2 font-label text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span> Previous
                                    </button>
                                    <button
                                        type="submit"
                                        className="group flex items-center gap-2 font-label text-label-md text-primary uppercase tracking-widest hover:opacity-70 transition-opacity"
                                    >
                                        Proceed to Payment
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Step 3: Payment */}
                        {currentStep === 3 && (
                            <section className="step-transition opacity-100 block">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="font-headline text-headline-sm text-on-surface">3. Secure Payment</h2>
                                    <span className="font-label text-label-sm text-on-surface-variant">03 / 03</span>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                                    {/* Left side cost overview */}
                                    <div className="lg:col-span-5 space-y-6">
                                        <div 
                                            className="p-6 rounded-2xl" 
                                            style={{ 
                                                background: 'rgba(255, 255, 255, 0.02)', 
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                            }}
                                        >
                                            <h4 className="font-display text-primary text-headline-sm mb-4">SWADHA</h4>
                                            <div className="space-y-3 font-body text-body-md text-on-surface-variant">
                                                <div className="flex justify-between">
                                                    <span>Delivery To</span>
                                                    <span className="text-on-surface font-medium truncate max-w-[130px]">{fullName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Est. Time</span>
                                                    <span className="text-on-surface font-medium">30–45 mins</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Total Items</span>
                                                    <span className="text-on-surface font-medium">
                                                        {cart.reduce((sum, item) => sum + item.qty, 0)} items
                                                    </span>
                                                </div>
                                                <div className="pt-3 border-t border-white/5 flex justify-between font-label uppercase tracking-wider text-[13px]">
                                                    <span className="text-primary">Order Total</span>
                                                    <span className="text-primary font-bold">₹{grandTotal.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Animated Payment Tabs Selector */}
                                        <div 
                                            className="flex p-1 rounded-full relative" 
                                            style={{ 
                                                background: 'rgba(255, 255, 255, 0.03)', 
                                                border: '1px solid rgba(255, 255, 255, 0.05)' 
                                            }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('card')}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 0',
                                                    fontSize: '10px',
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 600,
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    cursor: 'pointer',
                                                    background: paymentMethod === 'card' ? '#d4af37' : 'transparent',
                                                    color: paymentMethod === 'card' ? '#0a0a0a' : 'rgba(255, 255, 255, 0.5)',
                                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                }}
                                            >
                                                Card
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('upi')}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 0',
                                                    fontSize: '10px',
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 600,
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    cursor: 'pointer',
                                                    background: paymentMethod === 'upi' ? '#d4af37' : 'transparent',
                                                    color: paymentMethod === 'upi' ? '#0a0a0a' : 'rgba(255, 255, 255, 0.5)',
                                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                }}
                                            >
                                                UPI
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('cod')}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 0',
                                                    fontSize: '10px',
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 600,
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    cursor: 'pointer',
                                                    background: paymentMethod === 'cod' ? '#d4af37' : 'transparent',
                                                    color: paymentMethod === 'cod' ? '#0a0a0a' : 'rgba(255, 255, 255, 0.5)',
                                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                }}
                                            >
                                                COD
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right side form elements */}
                                    <div className="lg:col-span-7">
                                        <div style={{ position: 'relative', minHeight: '340px' }} className="w-full">
                                            {/* Card Payment Form */}
                                            {paymentMethod === 'card' && (
                                                <div 
                                                    style={{
                                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '24px',
                                                    }}
                                                >
                                                    <CardPreview
                                                        cardNumber={cardNumber}
                                                        cardName={cardName}
                                                        cardExpiry={cardExpiry}
                                                        cardCvv={cardCvv}
                                                        isCardFlipped={isCardFlipped}
                                                    />
                                                    <CardForm
                                                        cardNumber={cardNumber}
                                                        setCardNumber={setCardNumber}
                                                        cardName={cardName}
                                                        setCardName={setCardName}
                                                        cardExpiry={cardExpiry}
                                                        setCardExpiry={setCardExpiry}
                                                        cardCvv={cardCvv}
                                                        setCardCvv={setCardCvv}
                                                        setIsCardFlipped={setIsCardFlipped}
                                                        isRequired={paymentMethod === 'card'}
                                                    />
                                                </div>
                                            )}

                                            {/* UPI Payment Form */}
                                            {paymentMethod === 'upi' && (
                                                <div
                                                    style={{
                                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    }}
                                                >
                                                    <UpiForm
                                                        upiId={upiId}
                                                        setUpiId={setUpiId}
                                                        isRequired={paymentMethod === 'upi'}
                                                    />
                                                </div>
                                            )}

                                            {/* COD Payment Form */}
                                            {paymentMethod === 'cod' && (
                                                <div
                                                    style={{
                                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    }}
                                                >
                                                    <CodForm />
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
                                            <button
                                                type="button"
                                                onClick={handlePrevStep}
                                                className="group flex items-center gap-2 font-label text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined">arrow_back</span> Previous
                                            </button>
                                            
                                            <button
                                                type="submit"
                                                className="shimmer-btn relative overflow-hidden w-full sm:w-auto px-12 py-5 bg-primary text-on-primary font-label text-label-md uppercase tracking-[0.2em] transition-all duration-300"
                                                style={{
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)',
                                                }}
                                            >
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </form>
                </div>
            )}

            {/* Step 5: Success Experience Screen */}
            {isConfirmed && (
                <div 
                    className="w-full max-w-2xl glass-panel p-8 md:p-12 text-center relative overflow-hidden"
                    style={{ background: '#0a0a0a' }}
                >
                    {/* Animated Checkmark and Particles */}
                    <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="success-ring" />
                        <div className="sparkle sparkle-1" />
                        <div className="sparkle sparkle-2" />
                        <div className="sparkle sparkle-3" />
                        <div className="sparkle sparkle-4" />
                        <svg width="80" height="80" viewBox="0 0 52 52">
                            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>

                    <h3 
                        className="font-display text-on-surface mb-2"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                            fontWeight: 300,
                            letterSpacing: '0.05em',
                            color: '#fff',
                        }}
                    >
                        Order Successfully Placed
                    </h3>
                    <p className="font-body text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
                        Thank you for choosing Swadha Restaurant & Lounge. Your culinary experience is being prepared with the utmost care.
                    </p>

                    {/* Order Details Receipt Card */}
                    <div 
                        className="w-full p-6 rounded-xl mb-8 space-y-3 font-body text-body-md text-on-surface-variant"
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            textAlign: 'left',
                        }}
                    >
                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <span className="font-label text-label-sm uppercase tracking-wider text-primary">Order ID</span>
                            <span className="font-mono text-white font-bold tracking-wider">{orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Customer Name</span>
                            <span className="text-white font-medium">{fullName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Address</span>
                            <span className="text-white font-medium truncate max-w-[200px]" title={`${address}, ${city}`}>
                                {address}, {city}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Payment Method</span>
                            <span className="text-white font-medium uppercase">{paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Est. Delivery Time</span>
                            <span className="text-[#d4af37] font-semibold">30–45 Minutes</span>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Delivering Items</span>
                            <div className="space-y-1 font-mono text-[13px] text-white">
                                {cart.map(item => (
                                    <div key={item._id} className="flex justify-between">
                                        <span>• {item.name} x{item.qty}</span>
                                        <span>₹{(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5 flex justify-between font-label uppercase tracking-wider text-[13px] text-primary font-bold">
                            <span>Total Amount</span>
                            <span>₹{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                        <button
                            type="button"
                            className="w-full sm:w-auto px-8 py-4 border border-primary text-primary font-label text-label-md uppercase tracking-wider hover:bg-primary/10 active:scale-95 transition-all"
                            onClick={() => {
                                toast.success('Tracking order. Estimated delivery time: 35 minutes.');
                            }}
                        >
                            Track Order (Mock)
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-label text-label-md uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all text-center"
                            onClick={() => {
                                setIsConfirmed(false);
                                setCurrentStep(1);
                                setAddress('');
                                setCity('');
                                setPincode('');
                                setInstructions('');
                                setCardNumber('');
                                setCardName('');
                                setCardExpiry('');
                                setCardCvv('');
                                setUpiId('');
                                navigate('/menu');
                            }}
                        >
                            Continue Shopping
                        </button>
                        <a
                            href="/"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent text-on-surface-variant font-label text-label-md uppercase tracking-wider hover:text-white transition-all text-center flex items-center justify-center"
                            style={{ textDecoration: 'none' }}
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            )}

            {/* Ambient Side Decorations (Desktop) */}
            <div className="fixed left-0 top-1/2 -translate-y-1/2 h-[530px] w-64 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
                <img
                    className="object-cover h-full w-full opacity-40 grayscale"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVF3WhcaH-qBlky7J8i15Xce-80ZPBFVkBQc02BV_qaIju6Jg0t_O36joRwyH9V3W1InlDdyHK-cOeGkN8rz_QvqPukGRGSYp8Joe2MBJFSfKcfjJFM1OPcXPorAlvh5K6rxScirayKvHiT5NqCAwMfStwooQhvCkyTWkkoBTPNyrVo0PpPDUbv-sqtv_mXRPz3r31CKOmZQnCHB6weHeoQ3_SBUuwl7sycVMM95jUtE6UaIOiSgSBE1siCEqbn0bUPRSRebUZy84"
                    alt=""
                />
            </div>
            <div className="fixed right-0 top-1/2 -translate-y-1/2 h-[530px] w-64 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
                <img
                    className="object-cover h-full w-full opacity-40 grayscale"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSkzvPhPcksJDv0fkS2a-Dqo0qO1rabxbjH98qvkh7Gr85vK3xBvv_o6Y-pMrs3ChfPwiqX5Ya366Rd98T0bROEGJrn2_PTrg2G6ue02HtA8oEjRkhmdUA6RZq__HtmWc6fZnSgrpiJICZhPjorDcESYGZu9dXFKrioPBVlB1nUrnjzHoif0QeOW4az1tghA_bIt_TLgLgbDdOYFhS3U9GqGbIc0-sVNLfUzFaTASy9jpenDL69M-jqu6nm2idz_R519XUqZTNxgY"
                    alt=""
                />
            </div>

            {/* Full-Screen Processing Overlay */}
            <ProcessingOverlay isProcessing={isProcessing} processingText={processingText} />
        </div>
    );
};

export default Checkout;