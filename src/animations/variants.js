// Framer Motion Animation Variants
// Premium, smooth animations for UEMS

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

export const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

export const scaleInBounce = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.8 },
};

export const slideInFromBottom = {
    initial: { opacity: 0, y: 100 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
    exit: { opacity: 0, y: 100 },
};

export const slideInFromTop = {
    initial: { opacity: 0, y: -100 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
    exit: { opacity: 0, y: -100 },
};

// Staggered children animation
export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerFast = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
};

// Card hover animation
export const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
    },
    tap: { scale: 0.98 },
};

// Button hover animation
export const buttonHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 },
};

// Modal animation
export const modalOverlay = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const modalContent = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2 }
    },
};

// Sidebar animation
export const sidebarVariants = {
    open: {
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
        x: '-100%',
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
};

// Drawer animation
export const drawerVariants = {
    open: {
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
        y: '100%',
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
};

// Dropdown animation
export const dropdownVariants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: { duration: 0.15 }
    },
};

// Toast notification animation
export const toastVariants = {
    initial: { opacity: 0, x: 100, scale: 0.9 },
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: {
        opacity: 0,
        x: 100,
        transition: { duration: 0.2 }
    },
};

// Page transition
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 }
    },
};

// Typing animation for text
export const typingContainer = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.2,
        },
    },
};

export const typingCharacter = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.1 }
    },
};

// Shimmer effect for skeleton
export const shimmer = {
    initial: { x: '-100%' },
    animate: {
        x: '100%',
        transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
        },
    },
};

// Floating animation
export const float = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
        },
    },
};

// Pulse animation
export const pulse = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
        },
    },
};

// Glow animation
export const glow = {
    initial: { boxShadow: '0 0 20px rgba(99, 102, 241, 0)' },
    animate: {
        boxShadow: [
            '0 0 20px rgba(99, 102, 241, 0)',
            '0 0 40px rgba(99, 102, 241, 0.4)',
            '0 0 20px rgba(99, 102, 241, 0)',
        ],
        transition: {
            repeat: Infinity,
            duration: 3,
            ease: 'easeInOut',
        },
    },
};

// Export transition presets
export const transitions = {
    fast: { duration: 0.15, ease: 'easeOut' },
    base: { duration: 0.2, ease: 'easeOut' },
    slow: { duration: 0.3, ease: 'easeOut' },
    spring: { type: 'spring', stiffness: 300, damping: 25 },
    springBouncy: { type: 'spring', stiffness: 400, damping: 20 },
    springSmooth: { type: 'spring', stiffness: 200, damping: 30 },
};

export default {
    fadeIn,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    scaleInBounce,
    slideInFromBottom,
    slideInFromTop,
    staggerContainer,
    staggerContainerFast,
    staggerItem,
    cardHover,
    buttonHover,
    modalOverlay,
    modalContent,
    sidebarVariants,
    drawerVariants,
    dropdownVariants,
    toastVariants,
    pageTransition,
    typingContainer,
    typingCharacter,
    shimmer,
    float,
    pulse,
    glow,
    transitions,
};
