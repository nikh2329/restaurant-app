import React from 'react';

const UpiForm = ({ upiId, setUpiId, isRequired = false }) => {
    return (
        <div 
            style={{
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
                <span style={{ fontSize: '8px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif' }}>
                    Scan to Pay with Any UPI App
                </span>
            </div>

            <div style={{ width: '100%', maxWidth: '340px' }} className="space-y-1 relative font-body">
                <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value.toLowerCase())}
                    required={isRequired}
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
    );
};

export default UpiForm;
