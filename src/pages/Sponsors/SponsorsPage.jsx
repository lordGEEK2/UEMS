import { motion } from 'framer-motion';
import { Building2, ExternalLink, Mail, MapPin } from 'lucide-react';

const mockSponsors = [
    { id: 1, name: 'TechCorp India', tier: 'Platinum', logo: '🏢', website: 'https://techcorp.com' },
    { id: 2, name: 'InnovateTech', tier: 'Gold', logo: '💡', website: 'https://innovatetech.com' },
    { id: 3, name: 'CloudSystems', tier: 'Gold', logo: '☁️', website: 'https://cloudsystems.com' },
    { id: 4, name: 'DataDriven', tier: 'Silver', logo: '📊', website: 'https://datadriven.com' },
    { id: 5, name: 'CodeCraft', tier: 'Silver', logo: '💻', website: 'https://codecraft.com' },
    { id: 6, name: 'StartupHub', tier: 'Bronze', logo: '🚀', website: 'https://startuphub.com' },
];

const tierColors = {
    Platinum: 'from-slate-400 to-slate-600',
    Gold: 'from-yellow-400 to-amber-600',
    Silver: 'from-gray-300 to-gray-500',
    Bronze: 'from-orange-400 to-orange-700',
};

export default function SponsorsPage() {
    return (
        <div className="section-spacing">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center section-header"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
                        <Building2 className="w-4 h-4" />
                        <span>Our Partners</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                        <span className="text-primary">Our </span>
                        <span className="text-gradient">Sponsors</span>
                    </h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        We're grateful to our sponsors who support student activities and help make events possible.
                    </p>
                </motion.div>

                {/* Sponsors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockSponsors.map((sponsor, i) => (
                        <motion.a
                            key={sponsor.id}
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card group text-center hover:scale-[1.02] transition-transform"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-4xl">
                                {sponsor.logo}
                            </div>
                            <h3 className="text-xl font-bold font-display text-primary mb-2 group-hover:text-indigo-500 transition-colors">
                                {sponsor.name}
                            </h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${tierColors[sponsor.tier]}`}>
                                {sponsor.tier} Partner
                            </span>
                            <div className="flex items-center justify-center gap-1 mt-4 text-sm text-secondary group-hover:text-indigo-500">
                                <span>Visit Website</span>
                                <ExternalLink className="w-3 h-3" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Become a Sponsor CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="glass-card max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold font-display text-primary mb-4">
                            Become a Sponsor
                        </h2>
                        <p className="text-secondary mb-6">
                            Partner with us to reach 10,000+ students and support innovation at MITS Gwalior.
                        </p>
                        <button className="btn btn-primary">
                            <Mail className="w-4 h-4" />
                            <span>Contact Us</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
