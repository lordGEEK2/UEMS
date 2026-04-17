import { motion } from 'framer-motion';
import { Users, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { clubCategories } from '../../data/clubs';

// Enhanced card hover animation with smooth lift and glow
const clubCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
        y: -12,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(99, 102, 241, 0.2)',
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }
    },
    tap: { scale: 0.98 },
};

export default function ClubCard({ club, index = 0 }) {
    const category = clubCategories[club.category.toUpperCase()] || clubCategories.TECH;

    return (
        <motion.a
            href={`/clubs/${club.slug}`}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={clubCardVariants}
            transition={{ delay: index * 0.05 }}
            className="club-card block group"
            style={{
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Animated Background Gradient on Hover */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 0.08, scale: 1.5 }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle, ${category.color}, transparent)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Category Accent Bar */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: '100%',
                    background: category.color,
                    borderRadius: '16px 0 0 16px',
                    transformOrigin: 'top',
                }}
            />

            {/* Logo with Bounce Animation */}
            <motion.div
                className="club-card__logo"
                whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.4 }
                }}
                style={{
                    background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)`,
                    color: category.color,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <span className="text-2xl">{category.icon}</span>
            </motion.div>

            {/* Club Name */}
            <h3
                className="club-card__name group-hover:text-indigo-500 transition-colors"
                style={{ position: 'relative', zIndex: 1 }}
            >
                {club.name}
            </h3>

            {/* Coordinator */}
            <p className="club-card__coordinator line-clamp-2" style={{ position: 'relative', zIndex: 1 }}>
                <span className="text-xs uppercase tracking-wide text-tertiary">Faculty Coordinator</span>
                <br />
                {club.coordinator}
            </p>

            {/* Category Badge & Action */}
            <div
                className="flex items-center justify-between mt-4"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <span
                    className="club-card__category-badge"
                    style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color
                    }}
                >
                    {category.icon} {category.name}
                </span>

                <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    <ArrowRight
                        className="w-4 h-4 text-tertiary group-hover:text-indigo-500 transition-colors"
                    />
                </motion.div>
            </div>
        </motion.a>
    );
}

// Compact version for lists with slide animation
const compactCardVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    hover: {
        x: 8,
        backgroundColor: 'var(--bg-tertiary)',
        transition: { duration: 0.2, ease: 'easeOut' }
    },
};

export function ClubCardCompact({ club, index = 0 }) {
    const category = clubCategories[club.category.toUpperCase()] || clubCategories.TECH;

    return (
        <motion.a
            href={`/clubs/${club.slug}`}
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={compactCardVariants}
            transition={{ delay: index * 0.03 }}
            className="flex items-center gap-4 p-4 rounded-xl group"
            style={{ transition: 'background 0.2s' }}
        >
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                    background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)`,
                }}
            >
                <span className="text-xl">{category.icon}</span>
            </motion.div>

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-primary truncate group-hover:text-indigo-500 transition-colors">
                    {club.name}
                </h4>
                <p className="text-sm text-secondary truncate">
                    {club.coordinator}
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <ExternalLink className="w-4 h-4 text-indigo-500" />
            </motion.div>
        </motion.a>
    );
}

// Grid skeleton for loading state
export function ClubCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="club-card"
        >
            <div className="skeleton skeleton-avatar mb-4" style={{ width: '64px', height: '64px', borderRadius: '16px' }} />
            <div className="skeleton skeleton-title mb-2" style={{ width: '80%' }} />
            <div className="skeleton skeleton-text mb-1" style={{ width: '40%' }} />
            <div className="skeleton skeleton-text mb-4" style={{ width: '100%' }} />
            <div className="flex items-center justify-between">
                <div className="skeleton" style={{ width: '80px', height: '24px', borderRadius: '9999px' }} />
                <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
            </div>
        </motion.div>
    );
}
