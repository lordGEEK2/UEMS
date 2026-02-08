import { Link } from 'react-router-dom';
import { Mail, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
    platform: [
        { name: 'Events', href: '/events' },
        { name: 'Clubs', href: '/clubs' },
        { name: 'Recruitments', href: '/recruitments' },
        { name: 'Sponsors', href: '/sponsors' },
    ],
    resources: [
        { name: 'Documentation', href: '#' },
        { name: 'API', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'Contact', href: '#' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
    ],
};

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 8,
                                    background: 'var(--primary-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>U</span>
                            </div>
                            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                                UEMS
                            </span>
                        </Link>
                        <p className="body-sm" style={{ maxWidth: 280, marginBottom: 'var(--space-4)' }}>
                            University Event Management System - The centralized digital platform for MITS Gwalior's
                            clubs, events, and opportunities.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <span className="muted flex items-center gap-2">
                                <MapPin style={{ width: 14, height: 14 }} />
                                MITS Gwalior, Madhya Pradesh, India
                            </span>
                            <span className="muted flex items-center gap-2">
                                <Mail style={{ width: 14, height: 14 }} />
                                uems@mitsgwalior.in
                            </span>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="footer-heading">Platform</h4>
                        {footerLinks.platform.map((link) => (
                            <Link key={link.name} to={link.href} className="footer-link">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="footer-heading">Resources</h4>
                        {footerLinks.resources.map((link) => (
                            <Link key={link.name} to={link.href} className="footer-link">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="footer-heading">Legal</h4>
                        {footerLinks.legal.map((link) => (
                            <Link key={link.name} to={link.href} className="footer-link">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    style={{
                        marginTop: 'var(--space-12)',
                        paddingTop: 'var(--space-6)',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 'var(--space-4)',
                    }}
                >
                    <span className="muted">
                        © {new Date().getFullYear()} UEMS MITS. All rights reserved.
                    </span>
                    <div className="flex items-center gap-4">
                        <a href="#" className="footer-link" style={{ padding: 0 }}>
                            <Github style={{ width: 18, height: 18 }} />
                        </a>
                        <a href="#" className="footer-link" style={{ padding: 0 }}>
                            <Twitter style={{ width: 18, height: 18 }} />
                        </a>
                        <a href="#" className="footer-link" style={{ padding: 0 }}>
                            <Linkedin style={{ width: 18, height: 18 }} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
