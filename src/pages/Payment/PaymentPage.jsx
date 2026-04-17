import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard, CheckCircle, XCircle, Clock, RefreshCw,
    Download, Filter, Search, Calendar, IndianRupee
} from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Demo payment data
const demoPayments = [
    {
        id: '1',
        type: 'event_registration',
        description: 'TechFest 2026 Registration',
        amount: 500,
        status: 'completed',
        createdAt: '2026-02-01T10:30:00Z',
        paidAt: '2026-02-01T10:32:00Z',
    },
    {
        id: '2',
        type: 'event_registration',
        description: 'Hackathon Entry Fee',
        amount: 200,
        status: 'completed',
        createdAt: '2026-01-25T14:00:00Z',
        paidAt: '2026-01-25T14:05:00Z',
    },
    {
        id: '3',
        type: 'membership',
        description: 'GDSC MITS Membership',
        amount: 100,
        status: 'pending',
        createdAt: '2026-02-08T09:00:00Z',
    },
];

const statusConfig = {
    completed: { icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-bg)', label: 'Completed' },
    pending: { icon: Clock, color: 'var(--warning)', bg: 'var(--warning-bg)', label: 'Pending' },
    failed: { icon: XCircle, color: 'var(--error)', bg: 'var(--error-bg)', label: 'Failed' },
    refunded: { icon: RefreshCw, color: 'var(--info)', bg: 'var(--info-bg)', label: 'Refunded' },
};

export default function PaymentPage() {
    const { token } = useAuthStore();
    const [payments, setPayments] = useState(demoPayments);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Calculate stats
    const stats = {
        total: payments.reduce((sum, p) => p.status === 'completed' ? sum + p.amount : sum, 0),
        completed: payments.filter(p => p.status === 'completed').length,
        pending: payments.filter(p => p.status === 'pending').length,
    };

    const filteredPayments = payments.filter(p => {
        if (filter !== 'all' && p.status !== filter) return false;
        if (searchQuery && !p.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="page-content">
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700 }}>
                        Payment History
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                        View and manage your payment transactions
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-6)'
                    }}
                >
                    <div className="card" style={{ padding: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 'var(--radius-md)',
                                background: 'var(--primary-50)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <IndianRupee size={24} style={{ color: 'var(--primary-600)' }} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Spent</p>
                                <p style={{ fontWeight: 700, fontSize: '1.5rem' }}>₹{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 'var(--radius-md)',
                                background: 'rgba(34, 197, 94, 0.1)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <CheckCircle size={24} style={{ color: 'var(--success)' }} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Completed</p>
                                <p style={{ fontWeight: 700, fontSize: '1.5rem' }}>{stats.completed}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 'var(--radius-md)',
                                background: 'rgba(245, 158, 11, 0.1)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Clock size={24} style={{ color: 'var(--warning)' }} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending</p>
                                <p style={{ fontWeight: 700, fontSize: '1.5rem' }}>{stats.pending}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-4)',
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                        <Search size={18} style={{
                            position: 'absolute', left: 12, top: '50%',
                            transform: 'translateY(-50%)', color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            placeholder="Search payments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            style={{ paddingLeft: 40 }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        {['all', 'completed', 'pending', 'failed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`btn ${filter === f ? 'btn-primary' : 'btn-outline'} btn-sm`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Payments List */}
                <motion.div
                    variants={itemVariants}
                    className="card"
                    style={{ overflow: 'hidden' }}
                >
                    {filteredPayments.length === 0 ? (
                        <div style={{
                            padding: 'var(--space-8)',
                            textAlign: 'center',
                            color: 'var(--text-secondary)'
                        }}>
                            <CreditCard size={48} style={{ opacity: 0.3, margin: '0 auto 16px' }} />
                            <p>No payments found</p>
                        </div>
                    ) : (
                        <div>
                            {filteredPayments.map((payment, index) => {
                                const config = statusConfig[payment.status];
                                const StatusIcon = config.icon;

                                return (
                                    <motion.div
                                        key={payment.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: 'var(--space-4)',
                                            borderBottom: index < filteredPayments.length - 1
                                                ? '1px solid var(--border)' : 'none',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                                                background: 'var(--bg-secondary)', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <CreditCard size={20} style={{ color: 'var(--primary-600)' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600 }}>{payment.description}</p>
                                                <p style={{
                                                    fontSize: '0.8125rem',
                                                    color: 'var(--text-secondary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-1)'
                                                }}>
                                                    <Calendar size={12} />
                                                    {formatDate(payment.createdAt)}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: 'var(--space-1)',
                                                padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                                background: config.bg, color: config.color,
                                                fontSize: '0.75rem', fontWeight: 600
                                            }}>
                                                <StatusIcon size={12} />
                                                {config.label}
                                            </span>

                                            <span style={{
                                                fontWeight: 700,
                                                fontSize: '1.125rem',
                                                minWidth: 80,
                                                textAlign: 'right'
                                            }}>
                                                ₹{payment.amount}
                                            </span>

                                            {payment.status === 'completed' && (
                                                <button
                                                    className="btn btn-ghost btn-icon-sm"
                                                    title="Download Receipt"
                                                >
                                                    <Download size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
