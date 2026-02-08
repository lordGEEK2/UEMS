import { motion } from 'framer-motion';
import {
    Github, Twitter, Instagram, Linkedin, Mail,
    MapPin, Phone, ExternalLink, Heart
} from 'lucide-react';

const footerLinks = {
    platform: [
        { name: 'Events', href: '/events' },
        { name: 'Clubs', href: '/clubs' },
        { name: 'Recruitments', href: '/recruitments' },
        { name: 'Sponsors', href: '/sponsors' },
    ],
    resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API', href: '/api' },
        { name: 'Help Center', href: '/help' },
        { name: 'Contact', href: '/contact' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ],
};

const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-primary/10">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />

            <div className="container relative py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <a href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg font-display">U</span>
                            </div>
                            <div>
                                <span className="text-2xl font-bold font-display text-gradient">UEMS</span>
                            </div>
                        </a>

                        <p className="text-secondary mb-6 max-w-sm">
                            University Event Management System - The centralized digital platform
                            for MITS Gwalior's clubs, events, and opportunities.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-secondary">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-indigo-500" />
                                <span>MITS Gwalior, Madhya Pradesh, India</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-indigo-500" />
                                <a href="mailto:uems@mitsgwalior.in" className="hover:text-indigo-500 transition-colors">
                                    uems@mitsgwalior.in
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-indigo-500" />
                                <span>+91 751 2409999</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-secondary hover:bg-indigo-500 hover:text-white transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                            Platform
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-secondary hover:text-indigo-500 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-secondary hover:text-indigo-500 transition-colors inline-flex items-center gap-1"
                                    >
                                        {link.name}
                                        {link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-secondary hover:text-indigo-500 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-secondary text-sm text-center sm:text-left">
                        © {currentYear} UEMS - MITS Gwalior. All rights reserved.
                    </p>
                    <p className="text-secondary text-sm flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by MITS Students
                    </p>
                </div>
            </div>
        </footer>
    );
}
