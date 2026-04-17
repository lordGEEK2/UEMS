import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Briefcase, ChevronRight, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { recruitmentService } from '../../services/recruitmentService';

const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1, duration: 0.4 }
    }),
    hover: {
        x: 8,
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
};

export default function RecruitmentsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['recruitments', searchQuery],
        queryFn: () => recruitmentService.getAllRecruitments({
            search: searchQuery || undefined,
            status: 'open'
        })
    });

    const filteredRecruitments = data?.data || [];

    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="h1">Recruitments</h1>
                    <p className="body-lg" style={{ marginTop: 'var(--space-2)', maxWidth: 560 }}>
                        Find open positions across clubs and showcase your skills
                    </p>
                </motion.div>

                {/* Search */}
                <motion.div
                    style={{ maxWidth: 480, marginBottom: 'var(--space-8)' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div style={{ position: 'relative' }}>
                        <Search
                            style={{
                                position: 'absolute',
                                left: 12,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 18,
                                height: 18,
                                color: 'var(--text-muted)',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search positions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            style={{ paddingLeft: 40 }}
                        />
                    </div>
                </motion.div>

                {/* Recruitments List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {filteredRecruitments.map((recruitment, index) => (
                        <motion.div
                            key={recruitment.id}
                            className="card"
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                        >
                            <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="h4">{recruitment.position}</h3>
                                        <span
                                            className={`badge ${recruitment.status === 'closing_soon' ? 'badge-warning' : 'badge-success'}`}
                                        >
                                            {recruitment.status === 'closing_soon' ? 'Closing Soon' : 'Open'}
                                        </span>
                                    </div>
                                    <p className="body-sm" style={{ marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                                        {recruitment.description}
                                    </p>
                                    <div className="flex gap-4" style={{ flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)' }}>
                                        <span className="flex items-center gap-1">
                                            <Briefcase style={{ width: 14, height: 14 }} />
                                            {recruitment.club}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar style={{ width: 14, height: 14 }} />
                                            Deadline: {new Date(recruitment.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users style={{ width: 14, height: 14 }} />
                                            {recruitment.positions} positions
                                        </span>
                                    </div>
                                </div>
                                <motion.button
                                    className="btn btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Apply Now
                                    <ChevronRight style={{ width: 16, height: 16 }} />
                                </motion.button>
                            </div>

                            {/* Skills */}
                            <div className="flex gap-2 mt-4" style={{ flexWrap: 'wrap' }}>
                                {recruitment.skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        className="badge"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {isLoading && (
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading recruitments...</div>
                )}
                
                {error && (
                    <div className="empty-state text-red-500">Failed to load recruitments.</div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredRecruitments.length === 0 && (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">No positions found</h3>
                        <p className="empty-state-text">Try adjusting your search criteria</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
