import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: { duration: 0.15 }
    },
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnBackdrop = true,
    footer,
}) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const sizes = {
        sm: 400,
        md: 500,
        lg: 640,
        xl: 800,
        full: '90vw',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-backdrop"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={closeOnBackdrop ? onClose : undefined}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 'var(--space-6)',
                        zIndex: 1000,
                    }}
                >
                    <motion.div
                        className="modal-content"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--bg-primary)',
                            borderRadius: 'var(--radius-xl)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                            width: '100%',
                            maxWidth: sizes[size],
                            maxHeight: '85vh',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 'var(--space-5) var(--space-6)',
                                    borderBottom: '1px solid var(--border-light)',
                                }}
                            >
                                {title && (
                                    <h2 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                    }}>
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            border: 'none',
                                            borderRadius: 'var(--radius-md)',
                                            width: 32,
                                            height: 32,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: 'var(--text-secondary)',
                                        }}
                                    >
                                        <X size={18} />
                                    </motion.button>
                                )}
                            </div>
                        )}

                        {/* Body */}
                        <div
                            style={{
                                padding: 'var(--space-6)',
                                overflow: 'auto',
                                flex: 1,
                            }}
                        >
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div
                                style={{
                                    padding: 'var(--space-4) var(--space-6)',
                                    borderTop: '1px solid var(--border-light)',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 'var(--space-3)',
                                }}
                            >
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Confirm Modal Helper
export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger', // danger, warning, primary
}) {
    const confirmStyles = {
        danger: 'background: var(--error-600); color: white;',
        warning: 'background: var(--warning-600); color: white;',
        primary: 'background: var(--primary-600); color: white;',
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <motion.button
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                    >
                        {cancelText}
                    </motion.button>
                    <motion.button
                        className="btn"
                        style={{
                            background: variant === 'danger' ? 'var(--error-600)' :
                                variant === 'warning' ? 'var(--warning-600)' : 'var(--primary-600)',
                            color: 'white',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </motion.button>
                </>
            }
        >
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {message}
            </p>
        </Modal>
    );
}
