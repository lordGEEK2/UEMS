import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight, Sparkles } from 'lucide-react';
import { clubs, clubCategories, getClubsByCategory } from '../../data/clubs';
import ClubCard, { ClubCardSkeleton } from './ClubCard';
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants';

const categoryTabs = [
    { id: 'all', name: 'All Clubs', count: clubs.length },
    ...Object.entries(clubCategories).map(([key, value]) => ({
        id: value.id,
        name: value.name,
        icon: value.icon,
        count: getClubsByCategory(value.id).length,
    })),
];

export default function ClubsSection({ limit = 8, showViewAll = true }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const filteredClubs = useMemo(() => {
        let result = clubs;

        if (activeCategory !== 'all') {
            result = result.filter(club => club.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                club =>
                    club.name.toLowerCase().includes(query) ||
                    club.coordinator.toLowerCase().includes(query)
            );
        }

        return limit ? result.slice(0, limit) : result;
    }, [activeCategory, searchQuery, limit]);

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

            <div className="container relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>70+ Active Clubs</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
                        <span className="text-primary">Student </span>
                        <span className="text-gradient">Clubs & Societies</span>
                    </h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Join any of our 70+ student-run clubs across technology, cultural,
                        sports, and professional domains at MITS Gwalior.
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search clubs by name or coordinator..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input pl-12 w-full"
                        />
                    </div>

                    {/* Filter Dropdown (Mobile) */}
                    <div className="md:hidden">
                        <select
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="input w-full"
                        >
                            {categoryTabs.map((tab) => (
                                <option key={tab.id} value={tab.id}>
                                    {tab.icon} {tab.name} ({tab.count})
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Category Tabs (Desktop) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="hidden md:flex flex-wrap gap-2 mb-8"
                >
                    {categoryTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveCategory(tab.id)}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeCategory === tab.id
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-secondary text-secondary hover:bg-tertiary'}
              `}
                        >
                            {tab.icon && <span className="mr-1">{tab.icon}</span>}
                            {tab.name}
                            <span className="ml-1.5 opacity-70">({tab.count})</span>
                        </button>
                    ))}
                </motion.div>

                {/* Clubs Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <ClubCardSkeleton key={`skeleton-${i}`} />
                            ))
                        ) : filteredClubs.length > 0 ? (
                            filteredClubs.map((club, index) => (
                                <ClubCard key={club.id} club={club} index={index} />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-12 text-center"
                            >
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-primary mb-2">No clubs found</h3>
                                <p className="text-secondary">
                                    Try adjusting your search or filter criteria
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* View All Button */}
                {showViewAll && filteredClubs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a
                            href="/clubs"
                            className="btn btn-secondary inline-flex items-center gap-2 group"
                        >
                            <span>View All {clubs.length} Clubs</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
