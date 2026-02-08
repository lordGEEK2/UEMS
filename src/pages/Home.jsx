import Hero from '../components/common/Hero';
import ClubsSection from '../components/clubs/ClubsSection';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, CreditCard, Award, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
    {
        icon: Calendar,
        title: 'Discover Events',
        description: 'Browse through 500+ events across tech, cultural, sports, and more categories.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Users,
        title: 'Join Clubs',
        description: 'Connect with 70+ student-run clubs and societies to find your community.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: CreditCard,
        title: 'Easy Payments',
        description: 'Secure online payments for event registrations with Razorpay integration.',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: Award,
        title: 'Get Certified',
        description: 'Download participation and winner certificates directly from your dashboard.',
        color: 'from-orange-500 to-amber-500',
    },
];

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Clubs Section - with proper spacing */}
            <section className="section-spacing">
                <ClubsSection limit={8} showViewAll={true} />
            </section>

            {/* Features Section */}
            <section className="section-spacing bg-secondary">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center section-header"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Platform Features</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6">
                            <span className="text-primary">Why Choose </span>
                            <span className="text-gradient">UEMS?</span>
                        </h2>
                        <p className="text-lg text-secondary max-w-2xl mx-auto">
                            Everything you need to discover, participate, and excel in university life.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card text-center group hover:scale-[1.02] transition-transform"
                            >
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5`}>
                                    <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                                        <feature.icon className="w-7 h-7 text-indigo-500" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold font-display text-primary mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-secondary leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section-spacing">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center section-header"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-6">
                            <Zap className="w-4 h-4" />
                            <span>Getting Started</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6">
                            <span className="text-primary">How It </span>
                            <span className="text-gradient">Works</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { step: '01', title: 'Create Account', desc: 'Sign up with your university email and complete your profile' },
                            { step: '02', title: 'Explore & Join', desc: 'Browse events, join clubs, and apply for recruitments' },
                            { step: '03', title: 'Participate', desc: 'Register for events, pay fees, and download certificates' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative text-center"
                            >
                                <div className="text-8xl font-bold font-display text-gradient opacity-20 mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold font-display text-primary mb-3 -mt-12">
                                    {item.title}
                                </h3>
                                <p className="text-secondary">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-spacing relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                <div className="container relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                            Join thousands of students already using UEMS to discover events,
                            join clubs, and build their university experience.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/register"
                                className="btn bg-white text-indigo-600 hover:bg-gray-100 shadow-xl text-lg px-8 py-4 group"
                            >
                                <span>Create Account</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/events"
                                className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20 text-lg px-8 py-4"
                            >
                                Browse Events
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
