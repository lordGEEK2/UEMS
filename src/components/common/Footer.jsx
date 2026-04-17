import { Link } from 'react-router-dom';
import mitsLogo from '../../assets/mits-logo.png';

export default function Footer() {
    return (
        <footer className="footer-dark">
            <div className="container">
                {/* Main Footer Content */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                    {/* Brand */}
                    <div className="footer-brand">
                        <img
                            src={mitsLogo}
                            alt="MITS Gwalior"
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 8,
                                objectFit: 'contain',
                            }}
                        />
                        <div>
                            <div className="footer-title">University Event Management System</div>
                            <div className="footer-subtitle">MITS-DU, Gwalior</div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="footer-tagline hide-mobile">
                        The <span style={{ color: 'var(--primary-400)' }}>Official platform</span> of MITS-DU, Gwalior for<br />
                        Managing university events and club activities.
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} UEMS, MITS Gwalior</span>
                    <span style={{ color: 'var(--gray-600)' }}>|</span>
                    <span>Developed by <Link to="/developers">Tanishq MIshra</Link></span>
                </div>
            </div>
        </footer>
    );
}
