import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }
        setIsSubmitting(true);
        // Simulate sending message
        setTimeout(() => {
            toast.success(`Thank you, ${name}. Our concierge will get back to you shortly.`);
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen pb-24 px-margin-mobile md:px-margin-desktop">
            {/* Header */}
            <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto pt-8 scroll-reveal">
                <span className="font-label text-label-md text-primary tracking-[0.2em] uppercase">Connect</span>
                <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">Contact Us</h1>
                <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto">
                    Whether booking an exclusive corporate event or inquiring about dietary details, we are at your service.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                {/* Contact details */}
                <div className="lg:col-span-5 space-y-8 scroll-reveal">
                    {/* Hour Card */}
                    <div className="glass-panel p-8 space-y-4">
                        <span className="material-symbols-outlined text-primary text-3xl font-light">schedule</span>
                        <h2 className="font-headline text-headline-sm text-on-surface">Operating Hours</h2>
                        <div className="space-y-2 font-body text-body-md text-on-surface-variant">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>Lunch Service</span>
                                <span className="text-primary font-label uppercase tracking-widest text-[12px]">12:00 PM — 3:00 PM</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span>Dinner Service</span>
                                <span className="text-primary font-label uppercase tracking-widest text-[12px]">6:00 PM — 11:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Address & Contact Info Card */}
                    <div className="glass-panel p-8 space-y-4">
                        <span className="material-symbols-outlined text-primary text-3xl font-light">location_on</span>
                        <h2 className="font-headline text-headline-sm text-on-surface">The Dining Room</h2>
                        <div className="space-y-4 font-body text-body-md text-on-surface-variant">
                            <p className="leading-relaxed">
                                Swadha Restaurant & Lounge<br />
                                Rajajinagara, Bangalore 560010
                            </p>
                            <div className="pt-2 space-y-2 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-2xl font-light">call</span>
                                    <span>+91 9380776659</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-2xl font-light">mail</span>
                                    <span>nikhilas894@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="lg:col-span-7 glass-panel p-8 md:p-12 scroll-reveal">
                    <h2 className="font-headline text-headline-sm text-on-surface mb-8">Send a Message</h2>
                    <form onSubmit={handleSendMessage} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Your Name *</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Jane Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Email Address *</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Subject</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors"
                                placeholder="Special Event, Catering, etc."
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-label text-label-md text-on-surface-variant uppercase tracking-wider">Message *</label>
                            <textarea
                                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body text-body-md text-on-surface focus:ring-0 focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="Describe your request..."
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-primary-container text-on-primary-container font-label text-label-md uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
