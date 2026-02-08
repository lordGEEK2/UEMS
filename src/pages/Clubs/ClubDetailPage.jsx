import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MessageCircle, Settings, UserPlus, Crown, Shield } from 'lucide-react';
import { clubs, clubCategories } from '../../data/clubs';

// Mock members
const mockMembers = [
    { id: 1, name: 'Rahul Sharma', role: 'President', year: '4th Year' },
    { id: 2, name: 'Priya Singh', role: 'Vice President', year: '4th Year' },
    { id: 3, name: 'Amit Kumar', role: 'Secretary', year: '3rd Year' },
    { id: 4, name: 'Sneha Patel', role: 'Treasurer', year: '3rd Year' },
    { id: 5, name: 'Vikram Joshi', role: 'Tech Lead', year: '3rd Year' },
    { id: 6, name: 'Ananya Gupta', role: 'Member', year: '2nd Year' },
    { id: 7, name: 'Rohan Verma', role: 'Member', year: '2nd Year' },
    { id: 8, name: 'Kavya Reddy', role: 'Member', year: '2nd Year' },
];

const tabs = ['Overview', 'Members', 'Events', 'Chat'];

export default function ClubDetailPage() {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('Overview');

    const club = clubs.find((c) => c.id === slug) || clubs[0];
    const category = clubCategories[club.category];

    const getRoleBadge = (role) => {
        if (role === 'President') return { icon: Crown, type: 'badge-warning' };
        if (role === 'Vice President' || role === 'Secretary' || role === 'Treasurer' || role === 'Tech Lead')
            return { icon: Shield, type: 'badge-primary' };
        return null;
    };

    return (
        <div className="section">
            <div className="container">
                {/* Back Link */}
                <Link
                    to="/clubs"
                    className="flex items-center gap-2 muted"
                    style={{ marginBottom: 'var(--space-6)', textDecoration: 'none' }}
                >
                    <ArrowLeft style={{ width: 16, height: 16 }} />
                    <span>Back to Clubs</span>
                </Link>

                {/* Club Header */}
                <div
                    className="card"
                    style={{
                        marginBottom: 'var(--space-8)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: 'var(--space-6)',
                    }}
                >
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 'var(--radius-xl)',
                            background: 'var(--bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32,
                        }}
                    >
                        {category?.icon || '🎯'}
                    </div>

                    <div style={{ flex: 1, minWidth: 200 }}>
                        <h1 className="h2">{club.name}</h1>
                        <p className="body" style={{ marginTop: 'var(--space-1)' }}>
                            Faculty Coordinator: <strong>{club.coordinator}</strong>
                        </p>
                        <span className="badge badge-primary" style={{ marginTop: 'var(--space-2)' }}>
                            {category?.name || 'Club'}
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <button className="btn btn-primary">
                            <UserPlus style={{ width: 16, height: 16 }} />
                            Join Club
                        </button>
                        <button className="btn btn-secondary">
                            <MessageCircle style={{ width: 16, height: 16 }} />
                            Chat
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div
                    style={{
                        display: 'flex',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-8)',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: 'var(--space-4)',
                    }}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'Overview' && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr',
                            gap: 'var(--space-8)',
                        }}
                    >
                        <div className="card">
                            <h2 className="h3" style={{ marginBottom: 'var(--space-4)' }}>
                                About
                            </h2>
                            <p className="body">
                                {club.name} is one of the most active student organizations at MITS Gwalior.
                                We are dedicated to fostering innovation, learning, and collaboration among students
                                interested in {category?.name?.toLowerCase() || 'various activities'}.
                            </p>
                            <p className="body" style={{ marginTop: 'var(--space-4)' }}>
                                Our club organizes regular workshops, competitions, and networking events to help
                                students develop their skills and connect with industry professionals.
                            </p>
                        </div>

                        <div className="card">
                            <h2 className="h3" style={{ marginBottom: 'var(--space-4)' }}>
                                Quick Stats
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                <div className="flex items-center gap-4">
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--primary-50)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Users style={{ width: 18, height: 18, color: 'var(--primary-600)' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600 }}>120+ Members</p>
                                        <p className="muted" style={{ fontSize: 13 }}>Active members</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--primary-50)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Calendar style={{ width: 18, height: 18, color: 'var(--primary-600)' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600 }}>15+ Events</p>
                                        <p className="muted" style={{ fontSize: 13 }}>This year</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Members' && (
                    <div>
                        {/* Core Team */}
                        <h2 className="h3" style={{ marginBottom: 'var(--space-6)' }}>Core Team</h2>
                        <div className="grid grid-4" style={{ marginBottom: 'var(--space-8)' }}>
                            {mockMembers.filter((m) => m.role !== 'Member').map((member) => {
                                const badge = getRoleBadge(member.role);
                                return (
                                    <div key={member.id} className="card text-center">
                                        <div
                                            className="avatar avatar-lg"
                                            style={{ margin: '0 auto var(--space-3)' }}
                                        >
                                            {member.name.split(' ').map((n) => n[0]).join('')}
                                        </div>
                                        <h4 className="h4">{member.name}</h4>
                                        <div className="flex items-center justify-center gap-2 mt-2">
                                            {badge && <badge.icon style={{ width: 12, height: 12, color: 'var(--primary-600)' }} />}
                                            <span className="muted" style={{ fontSize: 13 }}>{member.role}</span>
                                        </div>
                                        <p className="muted" style={{ fontSize: 12 }}>{member.year}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* All Members Table */}
                        <h2 className="h3" style={{ marginBottom: 'var(--space-6)' }}>All Members</h2>
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Member</th>
                                        <th>Role</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockMembers.map((member) => (
                                        <tr key={member.id}>
                                            <td>
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar avatar-sm">
                                                        {member.name.split(' ').map((n) => n[0]).join('')}
                                                    </div>
                                                    <span>{member.name}</span>
                                                </div>
                                            </td>
                                            <td>{member.role}</td>
                                            <td>{member.year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Events' && (
                    <div className="empty-state">
                        <Calendar className="empty-state-icon" />
                        <h3 className="empty-state-title">No upcoming events</h3>
                        <p className="empty-state-text">Check back later for new events from {club.name}</p>
                    </div>
                )}

                {activeTab === 'Chat' && (
                    <div className="empty-state">
                        <MessageCircle className="empty-state-icon" />
                        <h3 className="empty-state-title">Club Chat</h3>
                        <p className="empty-state-text">Join the club to access the chat feature</p>
                        <button className="btn btn-primary mt-6">
                            <UserPlus style={{ width: 16, height: 16 }} />
                            Join Club to Chat
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
