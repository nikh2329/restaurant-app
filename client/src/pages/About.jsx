import React, { useEffect } from 'react';

const About = () => {
    // Scroll reveal observer
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
            <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto pt-8 scroll-reveal">
                <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">Our Story</span>
                <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">About Swadha</h1>
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                    Swadha represents the absolute harmony of flavors, blending the rich, robust heritage of North India with the delicate, coastal aromatics of the South.
                </p>
            </div>

            {/* Content Bento Grid */}
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
                {/* Large Featured Card */}
                <div className="md:col-span-8 glass-panel p-8 md:p-12 space-y-6 scroll-reveal">
                    <span className="material-symbols-outlined text-primary text-4xl">local_fire_department</span>
                    <h2 className="font-display text-headline-md text-on-surface">The Culinary Philosophy</h2>
                    <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                        In Sanskrit, **Swadha** denotes self-reliance, divine offerings, and the inherent power of nature. True to this name, our kitchen strips away unnecessary embellishments to honor the raw, soulful qualities of spices, grains, and flame.
                    </p>
                    <p className="font-body text-body-md text-on-surface-variant/80 leading-relaxed">
                        From the slow-cooked, butter-infused slow dals of the Punjab plains to the tangy tamarind and curry-leaf tempered seafood of Kerala's coastlines, our menus represent a balanced dialogue between India's most celebrated culinary traditions.
                    </p>
                </div>

                {/* Side Image Card */}
                <div className="md:col-span-4 h-96 md:h-auto relative overflow-hidden glass-panel scroll-reveal">
                    <div 
                        className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=2070&auto=format&fit=crop')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <span className="font-label text-label-sm text-primary uppercase tracking-wider">Tandoor Clay Ovens</span>
                        <h3 className="font-headline text-headline-sm text-white mt-1">Elemental Heat</h3>
                    </div>
                </div>

                {/* Three Equal Columns */}
                <div className="md:col-span-4 glass-panel p-8 space-y-4 scroll-reveal">
                    <span className="material-symbols-outlined text-primary text-3xl font-light">spa</span>
                    <h3 className="font-headline text-headline-sm text-on-surface">Pure Ingredients</h3>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                        We grind our signature spice blends in-house daily. From Kashmiri chilies to fresh Malabar peppercorns, every element is curated for depth and purity.
                    </p>
                </div>

                <div className="md:col-span-4 glass-panel p-8 space-y-4 scroll-reveal">
                    <span className="material-symbols-outlined text-primary text-3xl font-light">restaurant_menu</span>
                    <h3 className="font-headline text-headline-sm text-on-surface">Two Legacies, One Roof</h3>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                        Experience the perfect contrast: the velvety creaminess of slow-cooked gravies side-by-side with the crisp, light textures of stone-ground fermentations.
                    </p>
                </div>

                <div className="md:col-span-4 glass-panel p-8 space-y-4 scroll-reveal">
                    <span className="material-symbols-outlined text-primary text-3xl font-light">workspace_premium</span>
                    <h3 className="font-headline text-headline-sm text-on-surface">Quiet Luxury</h3>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                        Our dining space is designed to elevate your senses. Dimmed ambient lights, textured granite tables, and hand-molded brassware set the tone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
