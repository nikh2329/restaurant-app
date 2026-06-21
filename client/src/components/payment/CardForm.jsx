import React from 'react';
import { formatCardNumber, formatExpiry, formatCvv } from '../../utils/paymentUtils';

const CardForm = ({ 
    cardNumber, 
    setCardNumber, 
    cardName, 
    setCardName, 
    cardExpiry, 
    setCardExpiry, 
    cardCvv, 
    setCardCvv, 
    setIsCardFlipped,
    isRequired = false
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {/* Card Number */}
            <div className="space-y-1 relative font-body">
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    required={isRequired}
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
                    required={isRequired}
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
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    required={isRequired}
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
                    onChange={(e) => setCardCvv(formatCvv(e.target.value))}
                    onFocus={() => setIsCardFlipped(true)}
                    onBlur={() => setIsCardFlipped(false)}
                    required={isRequired}
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
    );
};

export default CardForm;
