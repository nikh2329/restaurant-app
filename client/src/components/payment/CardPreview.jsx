import React from 'react';

const CardPreview = ({ cardNumber, cardName, cardExpiry, cardCvv, isCardFlipped }) => {
    return (
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
                        <div className="text-left">
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
    );
};

export default CardPreview;
