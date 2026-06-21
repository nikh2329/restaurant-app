import React from 'react';

const ProcessingOverlay = ({ isProcessing, processingText = 'Processing...' }) => {
    if (!isProcessing) return null;

    return (
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
            <svg 
                className="progress-ring" 
                width="100" 
                height="100"
                style={{ transform: 'rotate(-90deg)' }}
            >
                <circle
                    className="progress-ring__circle"
                    stroke="#d4af37"
                    strokeWidth="3"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                        transformOrigin: '50% 50%',
                        strokeDasharray: '251.2',
                        animation: 'progress-pulse 2s infinite ease-in-out',
                    }}
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
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ProcessingOverlay;
