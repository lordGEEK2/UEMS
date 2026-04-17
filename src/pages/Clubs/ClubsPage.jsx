import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { clubCategories } from '../../data/clubs';
import { clubService } from '../../services/clubService';
import ClubCard, { ClubCardSkeleton } from '../../components/clubs/ClubCard';

const categories = [
    { id: 'all', name: 'All Clubs' },
    ...Object.values(clubCategories),
];

export default function ClubsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['clubs', activeCategory, searchQuery],
        queryFn: () => clubService.getAllClubs({
            category: activeCategory !== 'all' ? activeCategory : undefined,
            search: searchQuery
        }),
    });

    const clubsList = data?.clubs || [];

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
                    <h1 className="h1">Student Clubs</h1>
                    <p className="body-lg" style={{ marginTop: 'var(--space-2)', maxWidth: 560, color: 'var(--text-secondary)' }}>
                        Explore student-run clubs across technology, cultural, sports, and professional domains.
                    </p>
                </motion.div>

                {/* Search */}
                <motion.div
                    style={{ maxWidth: 480, marginBottom: 'var(--space-6)' }}
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
                            placeholder="Search clubs by name or coordinator..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            style={{ paddingLeft: 40 }}
                        />
                    </div>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    style={{
                        display: 'flex',
                        gap: 'var(--space-2)',
                        flexWrap: 'wrap',
                        marginBottom: 'var(--space-8)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((cat, index) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                        >
                            {cat.icon && <span style={{ marginRight: 4 }}>{cat.icon}</span>}
                            {cat.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <ClubCardSkeleton key={n} />
                        ))}
                    </div>
                )}
                
                {/* Error State */}
                {error && (
                    <div className="empty-state text-red-500">
                        Failed to load clubs. Please try again.
                    </div>
                )}

                {/* Clubs Grid */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {clubsList.map((club, index) => (
                            <ClubCard key={club._id} club={club} index={index} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && clubsList.length === 0 && (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">No clubs found</h3>
                        <p className="empty-state-text">Try adjusting your search or filter criteria</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
