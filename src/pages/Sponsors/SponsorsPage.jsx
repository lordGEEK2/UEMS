import { Link } from 'react-router-dom';
import { Building2, ExternalLink, Sparkles } from 'lucide-react';

const sponsors = [
    {
        id: 1,
        name: 'Google',
        tier: 'Platinum',
        logo: 'G',
        description: 'Supporting technology education and innovation.',
        website: 'https://google.com',
    },
    {
        id: 2,
        name: 'Microsoft',
        tier: 'Platinum',
        logo: 'M',
        description: 'Empowering students with cloud and AI technologies.',
        website: 'https://microsoft.com',
    },
    {
        id: 3,
        name: 'Amazon Web Services',
        tier: 'Gold',
        logo: 'A',
        description: 'Cloud computing resources for student projects.',
        website: 'https://aws.amazon.com',
    },
    {
        id: 4,
        name: 'GitHub',
        tier: 'Gold',
        logo: 'GH',
        description: 'Collaboration tools for student developers.',
        website: 'https://github.com',
    },
    {
        id: 5,
        name: 'JetBrains',
        tier: 'Silver',
        logo: 'JB',
        description: 'Professional development tools for students.',
        website: 'https://jetbrains.com',
    },
    {
        id: 6,
        name: 'DigitalOcean',
        tier: 'Silver',
        logo: 'DO',
        description: 'Cloud infrastructure for student projects.',
        website: 'https://digitalocean.com',
    },
];

const tierStyles = {
    Platinum: { bg: 'linear-gradient(135deg, #e5e4e2, #afafaf)', color: '#3d3d3d' },
    Gold: { bg: 'linear-gradient(135deg, #ffd700, #ffb700)', color: '#5c4600' },
    Silver: { bg: 'linear-gradient(135deg, #c0c0c0, #a0a0a0)', color: '#404040' },
};

export default function SponsorsPage() {
    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <div className="section-header text-center">
                    <span className="badge badge-primary" style={{ marginBottom: 'var(--space-4)' }}>
                        <Sparkles style={{ width: 14, height: 14, marginRight: 6 }} />
                        Our Partners
                    </span>
                    <h1 className="h1">Sponsors & Partners</h1>
                    <p className="body-lg" style={{ marginTop: 'var(--space-2)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
                        Organizations that support MITS student activities and events
                    </p>
                </div>

                {/* Sponsors Grid */}
                <div className="grid grid-3">
                    {sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="card">
                            <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-4)' }}>
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--bg-tertiary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {sponsor.logo}
                                </div>
                                <div>
                                    <h3 className="h4">{sponsor.name}</h3>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            padding: '2px 8px',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: 11,
                                            fontWeight: 600,
                                            background: tierStyles[sponsor.tier].bg,
                                            color: tierStyles[sponsor.tier].color,
                                        }}
                                    >
                                        {sponsor.tier}
                                    </span>
                                </div>
                            </div>
                            <p className="body-sm" style={{ marginBottom: 'var(--space-4)' }}>
                                {sponsor.description}
                            </p>
                            <a
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost btn-sm"
                                style={{ marginLeft: '-8px' }}
                            >
                                <ExternalLink style={{ width: 14, height: 14 }} />
                                Visit Website
                            </a>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div
                    className="card text-center"
                    style={{
                        marginTop: 'var(--space-16)',
                        background: 'var(--primary-50)',
                        borderColor: 'var(--primary-100)',
                    }}
                >
                    <Building2
                        style={{
                            width: 48,
                            height: 48,
                            margin: '0 auto var(--space-4)',
                            color: 'var(--primary-600)',
                        }}
                    />
                    <h2 className="h2" style={{ marginBottom: 'var(--space-2)' }}>
                        Become a Sponsor
                    </h2>
                    <p className="body" style={{ maxWidth: 480, margin: '0 auto var(--space-6)' }}>
                        Partner with MITS to support student innovation and gain visibility among 10,000+ students.
                    </p>
                    <a
                        href="mailto:sponsors@mitsgwalior.in"
                        className="btn btn-primary btn-lg"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    );
}
