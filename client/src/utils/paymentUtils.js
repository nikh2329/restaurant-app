export const formatCardNumber = (value) => {
    const val = value.replace(/\D/g, '');
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    return formatted.substring(0, 19);
};

export const formatExpiry = (value) => {
    const val = value.replace(/\D/g, '');
    if (val.length <= 2) {
        return val;
    }
    return `${val.substring(0, 2)}/${val.substring(2, 4)}`.substring(0, 5);
};

export const formatCvv = (value) => {
    const val = value.replace(/\D/g, '');
    return val.substring(0, 3);
};

export const generateMockId = (prefix = 'SWD-ORD') => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${result}`;
};

export const playSuccessChime = () => {
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
