import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, Users, Calendar, Settings, MessageCircle,
    Mail, Phone, MapPin, ExternalLink, UserPlus, Crown, Shield
} from 'lucide-react';
import { clubs, clubCategories } from '../../data/clubs';

// Mock members data
const mockMembers = [
    { id: 1, name: 'Rahul Sharma', role: 'President', avatar: 'RS', year: '4th Year' },
    { id: 2, name: 'Priya Singh', role: 'Vice President', avatar: 'PS', year: '4th Year' },
    { id: 3, name: 'Amit Kumar', role: 'Secretary', avatar: 'AK', year: '3rd Year' },
    { id: 4, name: 'Sneha Patel', role: 'Treasurer', avatar: 'SP', year: '3rd Year' },
    { id: 5, name: 'Vikram Joshi', role: 'Tech Lead', avatar: 'VJ', year: '3rd Year' },
    { id: 6, name: 'Ananya Gupta', role: 'Member', avatar: 'AG', year: '2nd Year' },
    { id: 7, name: 'Rohan Verma', role: 'Member', avatar: 'RV', year: '2nd Year' },
    { id: 8, name: 'Kavya Reddy', role: 'Member', avatar: 'KR', year: '2nd Year' },
];

const tabs = ['Overview', 'Members', 'Events', 'Chat'];

export default function ClubDetailPage() {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('Overview');

    // Find club by slug/id
    const club = clubs.find(c => c.id === slug) || clubs[0];
    const category = clubCategories[club.category];

    const getRoleBadge = (role) => {
        if (role === 'President') return { icon: Crown, color: 'text-yellow-500 bg-yellow-500/10' };
        if (role === 'Vice President') return { icon: Shield, color: 'text-purple-500 bg-purple-500/10' };
        if (role === 'Secretary' || role === 'Treasurer' || role === 'Tech Lead')
            return { icon: Shield, color: 'text-blue-500 bg-blue-500/10' };
        return null;
    };

    return (
        <div className="section-spacing">
            <div className="container">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link to="/clubs" className="inline-flex items-center gap-2 text-secondary hover:text-indigo-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Clubs</span>
                    </Link>
                </motion.div>

                {/* Club Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Club Logo */}
                        <div
                            className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${category?.color || '#6366f1'}20, ${category?.color || '#6366f1'}40)` }}
                        >
                            {category?.icon || '🎯'}
                        </div>

                        {/* Club Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold font-display text-primary mb-2">
                                        {club.name}
                                    </h1>
                                    <p className="text-secondary mb-3">
                                        Faculty Coordinator: <span className="font-medium text-primary">{club.coordinator}</span>
                                    </p>
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            background: `${category?.color || '#6366f1'}15`,
                                            color: category?.color || '#6366f1'
                                        }}
                                    >
                                        {category?.icon} {category?.name || 'Club'}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <button className="btn btn-primary">
                                        <UserPlus className="w-4 h-4" />
                                        <span>Join Club</span>
                                    </button>
                                    <button className="btn btn-secondary">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-2 mb-8 overflow-x-auto pb-2"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                ${activeTab === tab
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-secondary text-secondary hover:bg-tertiary'}
              `}
                        >
                            {tab}
                        </button>
                    ))}
                </motion.div>

                {/* Tab Content */}
                {activeTab === 'Overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* About */}
                        <div className="lg:col-span-2 glass-card">
                            <h2 className="text-xl font-bold font-display text-primary mb-4">About</h2>
                            <p className="text-secondary leading-relaxed">
                                {club.name} is one of the most active student organizations at MITS Gwalior.
                                We are dedicated to fostering innovation, learning, and collaboration among students
                                interested in {category?.name?.toLowerCase() || 'various activities'}.
                            </p>
                            <p className="text-secondary leading-relaxed mt-4">
                                Our club organizes regular workshops, competitions, and networking events to help
                                students develop their skills and connect with industry professionals.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="glass-card">
                            <h2 className="text-xl font-bold font-display text-primary mb-4">Quick Stats</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-primary">120+ Members</p>
                                        <p className="text-xs text-secondary">Active members</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-primary">15+ Events</p>
                                        <p className="text-xs text-secondary">This year</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Members' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Core Team */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold font-display text-primary mb-6">Core Team</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {mockMembers.filter(m => m.role !== 'Member').map((member) => {
                                    const badge = getRoleBadge(member.role);
                                    return (
                                        <div key={member.id} className="glass-card text-center">
                                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">{member.avatar}</span>
                                            </div>
                                            <h3 className="font-semibold text-primary">{member.name}</h3>
                                            <div className="flex items-center justify-center gap-1 mt-1">
                                                {badge && <badge.icon className={`w-3 h-3 ${badge.color.split(' ')[0]}`} />}
                                                <span className="text-sm text-secondary">{member.role}</span>
                                            </div>
                                            <p className="text-xs text-tertiary mt-1">{member.year}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* All Members */}
                        <div>
                            <h2 className="text-xl font-bold font-display text-primary mb-6">All Members</h2>
                            <div className="glass-card">
                                <div className="divide-y divide-primary/10">
                                    {mockMembers.map((member) => (
                                        <div key={member.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                                <span className="text-white font-medium text-sm">{member.avatar}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-primary">{member.name}</p>
                                                <p className="text-xs text-secondary">{member.year}</p>
                                            </div>
                                            <span className="text-sm text-secondary">{member.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Events' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <Calendar className="w-16 h-16 mx-auto text-secondary mb-4" />
                        <h3 className="text-xl font-semibold text-primary mb-2">No upcoming events</h3>
                        <p className="text-secondary">Check back later for new events from {club.name}</p>
                    </motion.div>
                )}

                {activeTab === 'Chat' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <MessageCircle className="w-16 h-16 mx-auto text-secondary mb-4" />
                        <h3 className="text-xl font-semibold text-primary mb-2">Club Chat</h3>
                        <p className="text-secondary mb-6">Join the club to access the chat feature</p>
                        <button className="btn btn-primary">
                            <UserPlus className="w-4 h-4" />
                            <span>Join Club to Chat</span>
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
