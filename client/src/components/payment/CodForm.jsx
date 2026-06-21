import React from 'react';

const CodForm = () => {
    return (
        <div 
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
            }}
        >
            <div 
                style={{
                    width: '100%',
                    maxWidth: '340px',
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #1b1a16 0%, #11100d 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    textAlign: 'center',
                }}
            >
                <div 
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span 
                        className="material-symbols-outlined text-[#d4af37]"
                        style={{ fontSize: '32px' }}
                    >
                        delivery_dining
                    </span>
                </div>
                
                <h4 
                    style={{ 
                        fontFamily: "'Playfair Display', serif", 
                        fontSize: '18px', 
                        color: '#f0ece2', 
                        margin: 0,
                        letterSpacing: '0.05em'
                    }}
                >
                    Cash on Delivery
                </h4>
                
                <p 
                    style={{ 
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: '13px', 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        margin: 0,
                        lineHeight: '1.5'
                    }}
                >
                    Pay when your order is delivered. Please ensure someone is available to receive the delivery and make the payment.
                </p>
                
                <div 
                    style={{ 
                        fontSize: '11px', 
                        textTransform: 'uppercase', 
                        color: '#d4af37', 
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                        paddingTop: '12px',
                        width: '100%',
                    }}
                >
                    Secure Delivery
                </div>
            </div>
        </div>
    );
};

export default CodForm;
