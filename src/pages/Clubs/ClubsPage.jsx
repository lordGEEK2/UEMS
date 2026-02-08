import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Users, Sparkles } from 'lucide-react';
import { clubs, clubCategories, getClubsByCategory } from '../../data/clubs';
import ClubCard from '../../components/clubs/ClubCard';
import { staggerContainer } from '../../animations/variants';

const categoryTabs = [
    { id: 'all', name: 'All Clubs', count: clubs.length },
    ...Object.entries(clubCategories).map(([key, value]) => ({
        id: value.id,
        name: value.name,
        icon: value.icon,
        count: getClubsByCategory(value.id).length,
    })),
];

export default function ClubsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

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

        return result;
    }, [activeCategory, searchQuery]);

    return (
        <div className="section-spacing">
            <div className="container">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center section-header"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>70+ Active Clubs</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                        <span className="text-primary">Student </span>
                        <span className="text-gradient">Clubs & Societies</span>
                    </h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Explore all 70+ student-run clubs across technology, cultural,
                        sports, and professional domains at MITS Gwalior.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-xl mx-auto mb-10"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search clubs by name or coordinator..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input pl-12 w-full"
                        />
                    </div>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categoryTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveCategory(tab.id)}
                            className={`
                px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${activeCategory === tab.id
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-secondary text-secondary hover:bg-tertiary'}
              `}
                        >
                            {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
                            {tab.name}
                            <span className="ml-1.5 opacity-70">({tab.count})</span>
                        </button>
                    ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    {[
                        { label: 'Total Clubs', value: '70+', icon: Users },
                        { label: 'Tech Clubs', value: getClubsByCategory('technology').length },
                        { label: 'Cultural Clubs', value: getClubsByCategory('cultural').length },
                        { label: 'Professional Bodies', value: getClubsByCategory('professional').length },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card text-center py-4">
                            <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                            <p className="text-sm text-secondary">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Clubs Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredClubs.map((club, index) => (
                        <Link key={club.id} to={`/clubs/${club.id}`}>
                            <ClubCard club={club} index={index} />
                        </Link>
                    ))}
                </motion.div>

                {filteredClubs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-primary mb-2">No clubs found</h3>
                        <p className="text-secondary">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}
