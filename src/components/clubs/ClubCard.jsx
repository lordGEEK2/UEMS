import { motion } from 'framer-motion';
import { Users, ArrowRight, ExternalLink } from 'lucide-react';
import { clubCategories } from '../../data/clubs';
import { cardHover } from '../../animations/variants';

export default function ClubCard({ club, index = 0 }) {
    const category = clubCategories[club.category.toUpperCase()] || clubCategories.TECH;

    return (
        <motion.a
            href={`/clubs/${club.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover="hover"
            whileTap="tap"
            variants={cardHover}
            className="club-card block group"
        >
            {/* Category Accent Bar */}
            <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: category.color }}
            />

            {/* Logo */}
            <div
                className="club-card__logo"
                style={{
                    background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)`,
                    color: category.color
                }}
            >
                <span className="text-2xl">{category.icon}</span>
            </div>

            {/* Club Name */}
            <h3 className="club-card__name group-hover:text-indigo-500 transition-colors">
                {club.name}
            </h3>

            {/* Coordinator */}
            <p className="club-card__coordinator line-clamp-2">
                <span className="text-xs uppercase tracking-wide text-tertiary">Faculty Coordinator</span>
                <br />
                {club.coordinator}
            </p>

            {/* Category Badge & Action */}
            <div className="flex items-center justify-between mt-4">
                <span
                    className="club-card__category-badge"
                    style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color
                    }}
                >
                    {category.icon} {category.name}
                </span>

                <ArrowRight
                    className="w-4 h-4 text-tertiary group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
                />
            </div>
        </motion.a>
    );
}

// Compact version for lists
export function ClubCardCompact({ club, index = 0 }) {
    const category = clubCategories[club.category.toUpperCase()] || clubCategories.TECH;

    return (
        <motion.a
            href={`/clubs/${club.slug}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-tertiary transition-colors group"
        >
            <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                    background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)`,
                }}
            >
                <span className="text-xl">{category.icon}</span>
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-primary truncate group-hover:text-indigo-500 transition-colors">
                    {club.name}
                </h4>
                <p className="text-sm text-secondary truncate">
                    {club.coordinator}
                </p>
            </div>

            <ExternalLink className="w-4 h-4 text-tertiary group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
        </motion.a>
    );
}

// Grid skeleton for loading state
export function ClubCardSkeleton() {
    return (
        <div className="club-card">
            <div className="skeleton skeleton-avatar mb-4" style={{ width: '64px', height: '64px', borderRadius: '16px' }} />
            <div className="skeleton skeleton-title mb-2" style={{ width: '80%' }} />
            <div className="skeleton skeleton-text mb-1" style={{ width: '40%' }} />
            <div className="skeleton skeleton-text mb-4" style={{ width: '100%' }} />
            <div className="flex items-center justify-between">
                <div className="skeleton" style={{ width: '80px', height: '24px', borderRadius: '9999px' }} />
                <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
            </div>
        </div>
    );
}
