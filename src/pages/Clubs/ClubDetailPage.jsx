import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MessageCircle, UserPlus, Crown, Shield } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { clubCategories } from '../../data/clubs';
import { clubService } from '../../services/clubService';
import { useAuthStore } from '../../hooks/useStore';
import { toast } from 'react-toastify';

const tabs = ['Overview', 'Members', 'Events', 'Chat'];

export default function ClubDetailPage() {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('Overview');
    const { isAuthenticated } = useAuthStore();

    const { data, isLoading, error } = useQuery({
        queryKey: ['club', slug],
        queryFn: () => clubService.getClubBySlug(slug),
    });

    const joinMutation = useMutation({
        mutationFn: () => clubService.joinClub(slug, 'I would like to join this club.'),
        onSuccess: () => toast.success('Join request sent!'),
        onError: (err) => toast.error(err.response?.data?.message || 'Failed to join club.')
    });

    if (isLoading) {
        return (
            <div className="section">
                <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
                    <div className="avatar avatar-lg" style={{ animation: 'pulse 1.5s infinite', background: '#ccc' }}></div>
                </div>
            </div>
        );
    }

    if (error || !data?.success) {
        return (
            <div className="section">
                <div className="container">
                    <div className="empty-state">
                        <h3>Club not found</h3>
                        <Link to="/clubs" className="btn btn-primary mt-4">Browse Clubs</Link>
                    </div>
                </div>
            </div>
        );
    }

    const club = data.club;
    const category = clubCategories[club.category] || { name: 'Club', icon: '✨' };
    const members = data.members || [];
    const events = data.events || [];

    const getRoleBadge = (role) => {
        if (role === 'head') return { icon: Crown, type: 'badge-warning' };
        if (role === 'admin') return { icon: Shield, type: 'badge-primary' };
        return null; // For 'member'
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
                        {category?.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 200 }}>
                        <h1 className="h2">{club.name}</h1>
                        <p className="body" style={{ marginTop: 'var(--space-1)' }}>
                            Faculty Coordinator: <strong>{club.coordinator || 'TBA'}</strong>
                        </p>
                        <span className="badge badge-primary" style={{ marginTop: 'var(--space-2)' }}>
                            {category?.name}
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                if (!isAuthenticated) {
                                    toast.info("Please login to join the club");
                                    return;
                                }
                                joinMutation.mutate();
                            }}
                            disabled={joinMutation.isPending}
                        >
                            <UserPlus style={{ width: 16, height: 16 }} />
                            {joinMutation.isPending ? 'Requesting...' : 'Join Club'}
                        </button>
                        <Link to="/dashboard/chat" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                            <MessageCircle style={{ width: 16, height: 16 }} />
                            Chat
                        </Link>
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
                            <p className="body whitespace-pre-line">
                                {club.fullDescription || club.description}
                            </p>
                            
                            {club.activities?.length > 0 && (
                                <>
                                    <h3 className="h4 mt-6 mb-2">Key Activities</h3>
                                    <ul className="list-disc pl-5">
                                        {club.activities.map((act, i) => (
                                            <li key={i} className="mb-1">{act}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
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
                                        <p style={{ fontWeight: 600 }}>{club.memberCount || members.length} Members</p>
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
                                        <p style={{ fontWeight: 600 }}>{events.length} Events</p>
                                        <p className="muted" style={{ fontSize: 13 }}>Hosted here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Members' && (
                    <div>
                        {members.length === 0 ? (
                            <div className="empty-state">
                                <Users className="empty-state-icon" />
                                <h3 className="empty-state-title">No members yet</h3>
                                <p className="empty-state-text">Be the first to join this club!</p>
                            </div>
                        ) : (
                            <>
                                {/* Core Team */}
                                <h2 className="h3" style={{ marginBottom: 'var(--space-6)' }}>Core Team</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
                                    {members.filter((m) => m.role !== 'member').map((member) => {
                                        const badge = getRoleBadge(member.role);
                                        return (
                                            <div key={member.user._id} className="card text-center">
                                                <div
                                                    className="avatar avatar-lg"
                                                    style={{ margin: '0 auto var(--space-3)' }}
                                                >
                                                    {member.user.name[0]}
                                                </div>
                                                <h4 className="h4 line-clamp-1">{member.user.name}</h4>
                                                <div className="flex items-center justify-center gap-2 mt-2">
                                                    {badge && <badge.icon style={{ width: 12, height: 12, color: 'var(--primary-600)' }} />}
                                                    <span className="muted capitalize" style={{ fontSize: 13 }}>{member.title || member.role}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* All Members Table */}
                                <h2 className="h3" style={{ marginBottom: 'var(--space-6)' }}>All Members</h2>
                                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="text-left bg-gray-50 border-b">
                                                <th className="p-4 rounded-tl-xl text-gray-500 font-medium text-sm">Member</th>
                                                <th className="p-4 text-gray-500 font-medium text-sm">Role</th>
                                                <th className="p-4 rounded-tr-xl text-gray-500 font-medium text-sm">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map((member) => (
                                                <tr key={member.user._id} className="border-b last:border-0">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="avatar avatar-sm">
                                                                {member.user.name[0]}
                                                            </div>
                                                            <span className="font-medium text-gray-800">{member.user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 capitalize text-gray-600">{member.title || member.role}</td>
                                                    <td className="p-4 text-gray-500">{new Date(member.joinedAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
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
                        
                        {members.some(m => m.user._id === useAuthStore.getState().user?.id) ? (
                            <>
                                <p className="empty-state-text">You are a member of this club!</p>
                                <Link to="/dashboard/chat" className="btn btn-primary mt-6 text-decoration-none">
                                    Open Group Chat
                                </Link>
                            </>
                        ) : club.pendingRequests?.some(r => r.user === useAuthStore.getState().user?.id) ? (
                            <>
                                <p className="empty-state-text">Your request to join is pending approval by an admin.</p>
                                <button className="btn btn-secondary mt-6" disabled>
                                    Request Pending
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="empty-state-text">Join the club to participate in the group chat.</p>
                                <button 
                                    className="btn btn-primary mt-6"
                                    onClick={() => {
                                        if (!isAuthenticated) {
                                            toast.info("Please login to join the club");
                                        } else {
                                            joinMutation.mutate();
                                        }
                                    }}
                                    disabled={joinMutation.isPending}
                                >
                                    <UserPlus style={{ width: 16, height: 16 }} />
                                    Join Club to Chat
                                </button>
                            </>
                        )}
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
