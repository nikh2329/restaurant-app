import React, { useEffect } from 'react';

const Terms = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen pb-24 px-margin-mobile md:px-margin-desktop">
            {/* Header */}
            <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto pt-8 scroll-reveal">
                <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">House Rules</span>
                <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">Terms & Conditions</h1>
                <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto">
                    We seek to preserve a serene and immersive dining environment. Please review our guest guidelines below.
                </p>
            </div>

            {/* Terms List */}
            <div className="max-w-4xl mx-auto space-y-8 scroll-reveal">
                <div className="glass-panel p-8 md:p-10 space-y-4">
                    <h2 className="font-headline text-headline-sm text-primary uppercase tracking-wider">1. Reservations & Punctuality</h2>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                        To maintain the rhythm of our dining service, tables are held for a maximum of 15 minutes past the scheduled booking time. If you run late, please contact our host team directly.
                    </p>
                </div>

                <div className="glass-panel p-8 md:p-10 space-y-4">
                    <h2 className="font-headline text-headline-sm text-primary uppercase tracking-wider">2. Cancellations & Adjustments</h2>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                        We prepare our fresh spice marinades and doughs based on daily counts. We request any cancellations or changes to party sizes to be submitted at least 24 hours prior to your reservation.
                    </p>
                </div>

                <div className="glass-panel p-8 md:p-10 space-y-4">
                    <h2 className="font-headline text-headline-sm text-primary uppercase tracking-wider">3. Dress Code</h2>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                        Swadha observes a **smart elegant** dress code. We kindly ask our guests to avoid sportswear, activewear, beach clothing, and athletic footwear. Collared shirts or smart traditional Indian attire are highly recommended.
                    </p>
                </div>

                <div className="glass-panel p-8 md:p-10 space-y-4">
                    <h2 className="font-headline text-headline-sm text-primary uppercase tracking-wider">4. Private Dining & Large Groups</h2>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                        Reservations for parties larger than 6 guests must be coordinated via our Concierge desk. Special pre-fixed menus will apply to all private dining room bookings.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
