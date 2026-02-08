import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Calendar, Users, Trophy, Sparkles,
    ChevronRight, Play
} from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../animations/variants';

// Animated typewriter phrases
const phrases = [
    'Discover Amazing Events',
    'Join 70+ Student Clubs',
    'Build Your Network',
    'Shape Your Future',
    'Explore Opportunities',
];

// Floating icons for background
const floatingIcons = [
    { icon: '💡', delay: 0 },
    { icon: '🚀', delay: 0.5 },
    { icon: '{  }', delay: 1 },
    { icon: '⚡', delay: 1.5 },
    { icon: '🎯', delay: 2 },
    { icon: '🔧', delay: 2.5 },
    { icon: '📱', delay: 3 },
    { icon: '🎨', delay: 3.5 },
    { icon: '🤖', delay: 4 },
    { icon: '⭐', delay: 4.5 },
];

// Stats data
const stats = [
    { value: '10,000+', label: 'Active Students', icon: Users },
    { value: '70+', label: 'Student Clubs', icon: Sparkles },
    { value: '500+', label: 'Events/Year', icon: Calendar },
    { value: '100+', label: 'Competitions', icon: Trophy },
];

export default function Hero() {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Typewriter effect
    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        let timeout;

        if (isPaused) {
            timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2000);
            return () => clearTimeout(timeout);
        }

        if (isDeleting) {
            if (displayText === '') {
                setIsDeleting(false);
                setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
            } else {
                timeout = setTimeout(() => {
                    setDisplayText((prev) => prev.slice(0, -1));
                }, 30);
            }
        } else {
            if (displayText === currentPhrase) {
                setIsPaused(true);
            } else {
                timeout = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, 80);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isPaused, currentPhraseIndex]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
            {/* Animated Mesh Gradient Background */}
            <div className="mesh-gradient-bg" />

            {/* Grid Pattern */}
            <div className="grid-pattern" />

            {/* Floating Icons */}
            <div className="floating-icons">
                {floatingIcons.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4,
                            delay: item.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="floating-icon text-4xl"
                        style={{
                            top: `${10 + Math.random() * 20}%`,
                            left: `${5 + (index * 9)}%`,
                        }}
                    >
                        {item.icon}
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="container relative z-10 py-20">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="max-w-5xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div variants={staggerItem} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-primary">MITS Gwalior • Session 2025-26</span>
                        </div>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        variants={staggerItem}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6"
                    >
                        <span className="text-primary">University Event</span>
                        <br />
                        <span className="text-gradient-google">Management System</span>
                    </motion.h1>

                    {/* Typewriter Text */}
                    <motion.div
                        variants={staggerItem}
                        className="h-12 sm:h-14 flex items-center justify-center mb-8"
                    >
                        <div className="typewriter-container">
                            <span className="typewriter-text text-xl sm:text-2xl md:text-3xl">
                                {displayText}
                            </span>
                            <span className="typewriter-cursor" />
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={staggerItem}
                        className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-10"
                    >
                        The centralized digital platform for discovering events, joining clubs,
                        applying for recruitments, and connecting with sponsors at MITS Gwalior.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={staggerItem}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <motion.a
                            href="/events"
                            className="btn btn-primary text-lg px-8 py-4 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Explore Events</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="/clubs"
                            className="btn btn-secondary text-lg px-8 py-4 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Play className="w-5 h-5" />
                            <span>Browse Clubs</span>
                        </motion.a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={staggerItem}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="glass-card text-center p-6 group cursor-default"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-3 text-indigo-500 group-hover:scale-110 transition-transform" />
                                <div className="text-2xl sm:text-3xl font-bold font-display text-gradient mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-secondary">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-secondary"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronRight className="w-5 h-5 rotate-90" />
                </motion.div>
            </motion.div>
        </section>
    );
}
