import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Reservations = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('19:30');
    const [guestCount, setGuestCount] = useState(2);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dietaryPrefs, setDietaryPrefs] = useState([]);
    const [notes, setNotes] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Mock Payment States
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingText, setProcessingText] = useState('Processing Reservation...');
    const [bookingId, setBookingId] = useState('');

    const timeSlots = ['18:00', '19:30', '21:00', '22:30'];
    const dietaryOptions = ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];

    // Formatters for payment details
    const handleCardNumberChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        setCardNumber(formatted.substring(0, 19));
    };

    const handleExpiryChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val.length <= 2) {
            setCardExpiry(val);
        } else {
            setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
        }
    };

    const handleCvvChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        setCardCvv(val.substring(0, 3));
    };

    const playSuccessChime = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const now = ctx.currentTime;

            // Harmonized E5 -> G#5 bell chime
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(659.25, now);
            gain1.gain.setValueAtTime(0, now);
            gain1.gain.linearRampToValueAtTime(0.2, now + 0.05);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
            osc1.connect(gain1);
            gain1.connect(ctx.destination);

            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(830.61, now + 0.1);
            gain2.gain.setValueAtTime(0, now + 0.1);
            gain2.gain.linearRampToValueAtTime(0.2, now + 0.15);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);

            osc1.start(now);
            osc1.stop(now + 0.8);
            osc2.start(now + 0.1);
            osc2.stop(now + 1.0);
        } catch (error) {
            console.error('Failed to play payment chime:', error);
        }
    };

    const goToStep = (step) => {
        if (step > currentStep) {
            if (currentStep === 1 && !selectedDate) {
                toast.error('Please select a date first');
                return;
            }
            if (currentStep === 3 && (!name.trim() || !phone.trim())) {
                toast.error('Please enter your name and phone number');
                return;
            }
        }
        setCurrentStep(step);
    };

    const toggleDietary = (option) => {
        setDietaryPrefs(prev =>
            prev.includes(option)
                ? prev.filter(p => p !== option)
                : [...prev, option]
        );
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === 'card') {
            if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
                toast.error('Please enter a valid 16-digit card number');
                return;
            }
            if (!cardName.trim()) {
                toast.error('Please enter the cardholder name');
                return;
            }
            if (!cardExpiry || cardExpiry.length < 5) {
                toast.error('Please enter a valid expiry date (MM/YY)');
                return;
            }
            if (!cardCvv || cardCvv.length < 3) {
                toast.error('Please enter a valid CVV');
                return;
            }
        } else {
            if (!upiId || !upiId.includes('@')) {
                toast.error('Please enter a valid UPI ID (e.g. name@upi)');
                return;
            }
        }

        setIsProcessing(true);
        setProcessingText('Processing Reservation...');

        setTimeout(() => {
            setProcessingText('Authorizing Hold Payment...');
        }, 1000);

        setTimeout(() => {
            setProcessingText('Securing Table...');
        }, 2000);

        setTimeout(() => {
            setIsProcessing(false);
            setBookingId('SWD-' + Math.random().toString(36).substring(2, 10).toUpperCase());
            setIsConfirmed(true);
            playSuccessChime();
        }, 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep < 5) {
            goToStep(currentStep + 1);
            return;
        }
        handlePaymentSubmit(e);
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-margin-mobile md:px-margin-desktop pb-24">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
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

                /* Circular Progress Ring */
                .progress-ring {
                    transform: rotate(-90deg);
                }
                .progress-ring__circle {
                    transition: stroke-dashoffset 0.35s;
                    transform-origin: 50% 50%;
                    stroke-dasharray: 251.2;
                    animation: progress-pulse 2s infinite ease-in-out;
                }
                @keyframes progress-pulse {
                    0% {
                        stroke-dashoffset: 251.2;
                    }
                    50% {
                        stroke-dashoffset: 50.2;
                    }
                    100% {
                        stroke-dashoffset: 251.2;
                    }
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
            <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto pt-8">
                <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">Private Bookings</span>
                <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">Secure Your Table</h1>
                <p className="font-body text-body-lg text-on-surface-variant">
                    Experience culinary artistry in our intimate dining room. Please complete the details below to begin your journey.
                </p>
            </div>

            {/* Reservation Widget */}
            <div className="w-full max-w-3xl glass-panel p-8 md:p-12 relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <div
                        className="h-full bg-primary transition-all duration-700 ease-in-out"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Step 1: Date & Time */}
                    <section className={`step-transition ${currentStep === 1 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline text-headline-sm text-on-surface">1. Date & Time</h2>
                            <span className="font-label text-label-sm text-on-surface-variant">01 / 05</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Select Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Available Slots</label>
                                <div 
                                    className="hide-scrollbar"
                                    style={{
                                        display: 'flex',
                                        gap: '16px',
                                        padding: '12px 4px',
                                        overflowX: 'auto',
                                        scrollSnapType: 'x mandatory',
                                        scrollBehavior: 'smooth',
                                        WebkitOverflowScrolling: 'touch',
                                    }}
                                >
                                    {timeSlots.map(time => {
                                        const isActive = selectedTime === time;
                                        return (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setSelectedTime(time)}
                                                style={{
                                                    flex: '0 0 auto',
                                                    scrollSnapAlign: 'center',
                                                    padding: '12px 28px',
                                                    borderRadius: '30px',
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '14px',
                                                    letterSpacing: '0.1em',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    border: isActive ? '1px solid #d4af37' : '1px solid rgba(255, 255, 255, 0.08)',
                                                    background: isActive ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                                                    color: isActive ? '#d4af37' : 'rgba(255, 255, 255, 0.5)',
                                                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                                                    boxShadow: isActive ? '0 0 20px rgba(212, 175, 55, 0.25)' : 'none',
                                                    opacity: isActive ? 1 : 0.6,
                                                    outline: 'none',
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.opacity = '0.9';
                                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.opacity = '0.6';
                                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                                    }
                                                }}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 flex justify-end">
                            <button
                                type="button"
                                onClick={() => goToStep(2)}
                                className="group flex items-center gap-2 font-label text-label-md text-primary uppercase tracking-widest hover:opacity-70 transition-opacity"
                            >
                                Next Step
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </section>

                    {/* Step 2: Guest Count */}
                    <section className={`step-transition ${currentStep === 2 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline text-headline-sm text-on-surface">2. Guest Count</h2>
                            <span className="font-label text-label-sm text-on-surface-variant">02 / 05</span>
                        </div>
                        <div className="flex flex-col items-center py-8">
                            <div className="flex items-center gap-12">
                                <button
                                    type="button"
                                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                    className="w-16 h-16 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:border-primary transition-all active:scale-90"
                                >
                                    <span className="material-symbols-outlined text-3xl">remove</span>
                                </button>
                                <div className="text-center">
                                    <span className="block font-display text-display-lg text-primary">
                                        {String(guestCount).padStart(2, '0')}
                                    </span>
                                    <span className="font-label text-label-md text-on-surface-variant uppercase">Guests</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                                    className="w-16 h-16 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:border-primary transition-all active:scale-90"
                                >
                                    <span className="material-symbols-outlined text-3xl">add</span>
                                </button>
                            </div>
                            <p className="mt-8 font-body text-body-md text-on-surface-variant text-center">
                                For parties larger than 6, please contact our concierge directly at nikhilas894@gmail.com
                            </p>
                        </div>
                        <div className="mt-12 flex justify-between">
                            <button
                                type="button"
                                onClick={() => goToStep(1)}
                                className="group flex items-center gap-2 font-label text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined">arrow_back</span> Previous
                            </button>
                            <button
                                type="button"
                                onClick={() => goToStep(3)}
                                className="group flex items-center gap-2 font-label text-label-md text-primary uppercase tracking-widest hover:opacity-70 transition-opacity"
                            >
                                Next Step <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </section>

                    {/* Step 3: Contact Details */}
                    <section className={`step-transition ${currentStep === 3 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline text-headline-sm text-on-surface">3. Contact Details</h2>
                            <span className="font-label text-label-sm text-on-surface-variant">03 / 05</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={currentStep === 3}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required={currentStep === 3}
                                />
                            </div>
                        </div>
                        <div className="mt-12 flex justify-between">
                            <button
                                type="button"
                                onClick={() => goToStep(2)}
                                className="group flex items-center gap-2 font-label text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined">arrow_back</span> Previous
                            </button>
                            <button
                                type="button"
                                onClick={() => goToStep(4)}
                                className="group flex items-center gap-2 font-label text-label-md text-primary uppercase tracking-widest hover:opacity-70 transition-opacity"
                            >
                                Next Step <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </section>

                    {/* Step 4: Special Requests */}
                    <section className={`step-transition ${currentStep === 4 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline text-headline-sm text-on-surface">4. Special Requests</h2>
                            <span className="font-label text-label-sm text-on-surface-variant">04 / 05</span>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Allergies or Dietary Restrictions</label>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {dietaryOptions.map(option => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => toggleDietary(option)}
                                            className={`px-4 py-1.5 rounded-full font-label text-label-sm transition-all active:scale-95 ${dietaryPrefs.includes(option)
                                                ? 'border border-primary text-primary bg-primary/10'
                                                : 'border border-outline-variant hover:border-primary'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Additional Notes</label>
                                <textarea
                                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors resize-none"
                                    placeholder="Is it a special occasion? Let us know."
                                    rows="3"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                            <button
                                type="button"
                                onClick={() => goToStep(3)}
                                className="group flex items-center gap-2 font-label text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined">arrow_back</span> Previous
                            </button>
                            <button
                                type="button"
                                onClick={() => goToStep(5)}
                                className="w-full md:w-auto px-12 py-5 bg-primary text-on-primary font-label text-label-md uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Proceed to Payment <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </section>

                    {/* Step 5: Secure Payment */}
                    <section className={`step-transition ${currentStep === 5 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline text-headline-sm text-on-surface">5. Secure Payment</h2>
                            <span className="font-label text-label-sm text-on-surface-variant">05 / 05</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column: Summary & Method Selector */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Summary Card */}
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
                                            <span>Guest Name</span>
                                            <span className="text-on-surface font-medium">{name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Date</span>
                                            <span className="text-on-surface font-medium">{selectedDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Time</span>
                                            <span className="text-on-surface font-medium">{selectedTime}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Guests</span>
                                            <span className="text-on-surface font-medium">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                                        </div>
                                        <div className="pt-3 border-t border-white/5 flex justify-between font-label uppercase tracking-wider text-[13px]">
                                            <span className="text-primary">Reservation Hold</span>
                                            <span className="text-primary font-bold">₹{guestCount * 500}</span>
                                        </div>
                                        <p className="text-[10px] text-center text-white/30 italic pt-1">
                                            * Fully refundable cover charge applied towards your dining bill.
                                        </p>
                                    </div>
                                </div>

                                {/* Tabs Selector */}
                                <div 
                                    className="flex p-1 rounded-full" 
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
                                            padding: '10px 0',
                                            fontSize: '11px',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            fontWeight: 600,
                                            border: 'none',
                                            borderRadius: '30px',
                                            cursor: 'pointer',
                                            background: paymentMethod === 'card' ? '#d4af37' : 'transparent',
                                            color: paymentMethod === 'card' ? '#0a0a0a' : 'rgba(255, 255, 255, 0.5)',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('upi')}
                                        style={{
                                            flex: 1,
                                            padding: '10px 0',
                                            fontSize: '11px',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            fontWeight: 600,
                                            border: 'none',
                                            borderRadius: '30px',
                                            cursor: 'pointer',
                                            background: paymentMethod === 'upi' ? '#d4af37' : 'transparent',
                                            color: paymentMethod === 'upi' ? '#0a0a0a' : 'rgba(255, 255, 255, 0.5)',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        UPI
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Forms & Previews */}
                            <div className="lg:col-span-7">
                                <div style={{ position: 'relative', minHeight: '340px' }}>
                                    {/* CARD FORM */}
                                    <div 
                                        style={{
                                            opacity: paymentMethod === 'card' ? 1 : 0,
                                            transform: paymentMethod === 'card' ? 'translateY(0)' : 'translateY(15px)',
                                            pointerEvents: paymentMethod === 'card' ? 'auto' : 'none',
                                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                            position: paymentMethod === 'card' ? 'static' : 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '24px',
                                        }}
                                    >
                                        {/* Card Interactive Preview */}
                                        <div 
                                            style={{ 
                                                perspective: '1000px', 
                                                width: '100%', 
                                                maxWidth: '340px', 
                                                margin: '0 auto 12px' 
                                            }}
                                        >
                                            <div 
                                                style={{
                                                    width: '100%',
                                                    height: '190px',
                                                    position: 'relative',
                                                    transformStyle: 'preserve-3d',
                                                    transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                    transform: isCardFlipped ? 'rotateY(180deg)' : 'none',
                                                }}
                                            >
                                                {/* Card Front */}
                                                <div 
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        backfaceVisibility: 'hidden',
                                                        background: 'linear-gradient(135deg, #1f1d18 0%, #11100d 100%)',
                                                        border: '1px solid rgba(212, 175, 55, 0.25)',
                                                        borderRadius: '16px',
                                                        padding: '24px',
                                                        color: '#f0ece2',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.05)',
                                                    }}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="material-symbols-outlined text-[#d4af37] text-3xl font-light">credit_card</span>
                                                        <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#d4af37', fontWeight: 600 }}>SWADHA</span>
                                                    </div>
                                                    <div style={{ fontSize: '18px', letterSpacing: '0.15em', fontFamily: 'monospace', margin: '14px 0 0' }}>
                                                        {cardNumber || '•••• •••• •••• ••••'}
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <div style={{ fontSize: '7px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Cardholder</div>
                                                            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
                                                                {cardName || 'YOUR NAME'}
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'right' }}>
                                                            <div style={{ fontSize: '7px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Expires</div>
                                                            <div style={{ fontSize: '11px', letterSpacing: '0.1em', fontWeight: 500 }}>
                                                                {cardExpiry || 'MM/YY'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Back */}
                                                <div 
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        backfaceVisibility: 'hidden',
                                                        transform: 'rotateY(180deg)',
                                                        background: 'linear-gradient(135deg, #11100d 0%, #1f1d18 100%)',
                                                        border: '1px solid rgba(212, 175, 55, 0.25)',
                                                        borderRadius: '16px',
                                                        color: '#f0ece2',
                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.05)',
                                                    }}
                                                >
                                                    <div style={{ background: '#000', height: '40px', marginTop: '20px', width: '100%' }} />
                                                    <div style={{ padding: '20px 24px 0' }}>
                                                        <div style={{ fontSize: '7px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textAlign: 'right' }}>CVV</div>
                                                        <div 
                                                            style={{ 
                                                                background: 'rgba(255,255,255,0.06)', 
                                                                padding: '6px 12px', 
                                                                borderRadius: '4px',
                                                                fontFamily: 'monospace',
                                                                fontSize: '14px',
                                                                letterSpacing: '0.1em',
                                                                textAlign: 'right',
                                                                color: '#d4af37',
                                                                fontWeight: 600,
                                                                border: '1px dashed rgba(212, 175, 55, 0.3)',
                                                            }}
                                                        >
                                                            {cardCvv || '•••'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Input Form */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Card Number */}
                                            <div className="space-y-1 relative font-body">
                                                <input
                                                    type="text"
                                                    value={cardNumber}
                                                    onChange={handleCardNumberChange}
                                                    required={paymentMethod === 'card' && currentStep === 5}
                                                    placeholder=" "
                                                    id="card_number_input"
                                                    className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                                />
                                                <label 
                                                    htmlFor="card_number_input"
                                                    className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                                >
                                                    Card Number
                                                </label>
                                            </div>

                                            {/* Cardholder Name */}
                                            <div className="space-y-1 relative font-body">
                                                <input
                                                    type="text"
                                                    value={cardName}
                                                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                                    required={paymentMethod === 'card' && currentStep === 5}
                                                    placeholder=" "
                                                    id="cardholder_name_input"
                                                    className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                                />
                                                <label 
                                                    htmlFor="cardholder_name_input"
                                                    className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                                >
                                                    Cardholder Name
                                                </label>
                                            </div>

                                            {/* Expiry Date */}
                                            <div className="space-y-1 relative font-body">
                                                <input
                                                    type="text"
                                                    value={cardExpiry}
                                                    onChange={handleExpiryChange}
                                                    required={paymentMethod === 'card' && currentStep === 5}
                                                    placeholder=" "
                                                    id="card_expiry_input"
                                                    className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                                />
                                                <label 
                                                    htmlFor="card_expiry_input"
                                                    className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                                >
                                                    Expiry Date (MM/YY)
                                                </label>
                                            </div>

                                            {/* CVV */}
                                            <div className="space-y-1 relative font-body">
                                                <input
                                                    type="password"
                                                    value={cardCvv}
                                                    onChange={handleCvvChange}
                                                    onFocus={() => setIsCardFlipped(true)}
                                                    onBlur={() => setIsCardFlipped(false)}
                                                    required={paymentMethod === 'card' && currentStep === 5}
                                                    placeholder=" "
                                                    id="card_cvv_input"
                                                    className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all"
                                                />
                                                <label 
                                                    htmlFor="card_cvv_input"
                                                    className="absolute left-0 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[0_0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                                                >
                                                    CVV
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* UPI FORM */}
                                    <div 
                                        style={{
                                            opacity: paymentMethod === 'upi' ? 1 : 0,
                                            transform: paymentMethod === 'upi' ? 'translateY(0)' : 'translateY(15px)',
                                            pointerEvents: paymentMethod === 'upi' ? 'auto' : 'none',
                                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                            position: paymentMethod === 'upi' ? 'static' : 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '24px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* QR Code Container */}
                                        <div 
                                            style={{
                                                padding: '16px',
                                                borderRadius: '16px',
                                                background: '#161512',
                                                border: '1px solid rgba(212, 175, 55, 0.15)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '12px',
                                                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {/* Custom Premium SVG QR Code */}
                                            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="100" height="100" rx="10" fill="#1b1a16"/>
                                                <rect x="8" y="8" width="24" height="24" rx="3" stroke="#d4af37" strokeWidth="2.5" fill="none"/>
                                                <rect x="14" y="14" width="12" height="12" rx="1.5" fill="#d4af37"/>
                                                <rect x="68" y="8" width="24" height="24" rx="3" stroke="#d4af37" strokeWidth="2.5" fill="none"/>
                                                <rect x="74" y="14" width="12" height="12" rx="1.5" fill="#d4af37"/>
                                                <rect x="8" y="68" width="24" height="24" rx="3" stroke="#d4af37" strokeWidth="2.5" fill="none"/>
                                                <rect x="14" y="74" width="12" height="12" rx="1.5" fill="#d4af37"/>
                                                <rect x="42" y="12" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="54" y="12" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="42" y="24" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="54" y="24" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="12" y="42" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="24" y="42" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="12" y="54" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="24" y="54" width="6" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="42" y="42" width="16" height="16" rx="2" fill="#d4af37" opacity="0.95"/>
                                                <rect x="68" y="42" width="10" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="82" y="42" width="6" height="10" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="42" y="68" width="6" height="10" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="54" y="68" width="10" height="6" rx="1" fill="#d4af37" opacity="0.8"/>
                                                <rect x="68" y="68" width="24" height="24" rx="3" fill="#d4af37" opacity="0.9"/>
                                                <rect x="74" y="74" width="12" height="12" rx="1.5" fill="#1b1a16"/>
                                            </svg>
                                            <span style={{ fontSize: '8px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                                                Scan to Pay with Any UPI App
                                            </span>
                                        </div>

                                        <div style={{ width: '100%', maxWidth: '340px' }} className="space-y-1 relative font-body">
                                            <input
                                                type="text"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value.toLowerCase())}
                                                required={paymentMethod === 'upi' && currentStep === 5}
                                                placeholder=" "
                                                id="upi_id_input"
                                                className="peer w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body text-body-lg text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-all text-center"
                                            />
                                            <label 
                                                htmlFor="upi_id_input"
                                                className="absolute left-1/2 -translate-x-1/2 top-4 font-label text-label-md text-on-surface-variant uppercase tracking-wider transition-all pointer-events-none origin-[center_center] peer-focus:-translate-y-6 peer-focus:-translate-x-1/2 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:-translate-x-1/2 peer-[:not(:placeholder-shown)]:scale-75"
                                            >
                                                UPI ID (e.g. name@upi)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 5 Navigation & Shimmer Submit */}
                                <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <button
                                        type="button"
                                        onClick={() => goToStep(4)}
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
                                        Complete Reservation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>

                {/* Success Overlay */}
                <div 
                    className={`absolute inset-0 bg-surface z-20 flex flex-col items-center justify-center p-8 md:p-12 text-center transition-opacity duration-700 ${isConfirmed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
                        Reservation Confirmed
                    </h3>
                    <p className="font-body text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
                        Your table has been successfully reserved. A confirmation email and SMS receipt have been sent to your contact details.
                    </p>

                    {/* Booking Details Card */}
                    <div 
                        className="w-full max-w-md p-6 rounded-xl mb-8 space-y-3 font-body text-body-md text-on-surface-variant"
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            textAlign: 'left',
                        }}
                    >
                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <span className="font-label text-label-sm uppercase tracking-wider text-primary">Booking ID</span>
                            <span className="font-mono text-white font-bold tracking-wider">{bookingId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Restaurant</span>
                            <span className="text-white font-medium">SWADHA</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Guest Name</span>
                            <span className="text-white font-medium">{name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date & Time</span>
                            <span className="text-white font-medium">{selectedDate} @ {selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Party Size</span>
                            <span className="text-white font-medium">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs justify-center items-center">
                        <button
                            type="button"
                            className="w-full py-4 border border-primary text-primary font-label text-label-md uppercase tracking-wider hover:bg-primary/10 active:scale-95 transition-all"
                            onClick={() => {
                                setIsConfirmed(false);
                                setCurrentStep(1);
                                setName('');
                                setPhone('');
                                setCardNumber('');
                                setCardName('');
                                setCardExpiry('');
                                setCardCvv('');
                                setUpiId('');
                            }}
                        >
                            Make Another
                        </button>
                        <a
                            href="/"
                            className="w-full py-4 bg-primary text-on-primary font-label text-label-md uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center"
                            style={{ textDecoration: 'none' }}
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>

            {/* Full-Screen Processing Overlay */}
            {isProcessing && (
                <div 
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(10, 10, 10, 0.95)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                        transition: 'opacity 0.5s ease',
                    }}
                >
                    <svg className="progress-ring" width="100" height="100">
                        <circle
                            className="progress-ring__circle"
                            stroke="#d4af37"
                            strokeWidth="3"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                    </svg>
                    <span 
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '18px',
                            letterSpacing: '0.1em',
                            color: '#fff',
                            animation: 'pulse 1.5s infinite ease-in-out',
                        }}
                    >
                        {processingText}
                    </span>
                    <style>{`
                        @keyframes pulse {
                            0%, 100% { opacity: 0.6; }
                            50% { opacity: 1; }
                        }
                    `}</style>
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
        </div>
    );
};

export default Reservations;