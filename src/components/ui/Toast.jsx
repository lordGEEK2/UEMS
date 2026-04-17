import { create } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

// Toast Store
export const useToastStore = create((set, get) => ({
    toasts: [],

    addToast: (toast) => {
        const id = Date.now() + Math.random();
        const newToast = {
            id,
            type: toast.type || 'info',
            title: toast.title,
            message: toast.message,
            duration: toast.duration || 4000,
        };
        set((state) => ({ toasts: [...state.toasts, newToast] }));

        // Auto-remove after duration
        if (newToast.duration > 0) {
            setTimeout(() => {
                get().removeToast(id);
            }, newToast.duration);
        }

        return id;
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },

    clearAll: () => set({ toasts: [] }),
}));

// Helper functions
export const toast = {
    success: (title, message) => useToastStore.getState().addToast({ type: 'success', title, message }),
    error: (title, message) => useToastStore.getState().addToast({ type: 'error', title, message }),
    warning: (title, message) => useToastStore.getState().addToast({ type: 'warning', title, message }),
    info: (title, message) => useToastStore.getState().addToast({ type: 'info', title, message }),
};

const toastIcons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

const toastStyles = {
    success: {
        bg: 'var(--success-50)',
        border: 'var(--success-200)',
        icon: 'var(--success-600)',
        text: 'var(--success-800)',
    },
    error: {
        bg: 'var(--error-50)',
        border: 'var(--error-200)',
        icon: 'var(--error-600)',
        text: 'var(--error-800)',
    },
    warning: {
        bg: 'var(--warning-50)',
        border: 'var(--warning-200)',
        icon: 'var(--warning-600)',
        text: 'var(--warning-800)',
    },
    info: {
        bg: 'var(--primary-50)',
        border: 'var(--primary-200)',
        icon: 'var(--primary-600)',
        text: 'var(--primary-800)',
    },
};

// Toast Component
function Toast({ toast }) {
    const { removeToast } = useToastStore();
    const Icon = toastIcons[toast.type];
    const styles = toastStyles[toast.type];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
                background: styles.bg,
                border: `1px solid ${styles.border}`,
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                minWidth: 320,
                maxWidth: 420,
            }}
        >
            <Icon size={20} style={{ color: styles.icon, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
                {toast.title && (
                    <p style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: styles.text,
                        marginBottom: toast.message ? 4 : 0
                    }}>
                        {toast.title}
                    </p>
                )}
                {toast.message && (
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {toast.message}
                    </p>
                )}
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeToast(toast.id)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                    color: 'var(--text-muted)',
                }}
            >
                <X size={16} />
            </motion.button>
        </motion.div>
    );
}

// Toast Container - Add this to App.jsx
export function ToastContainer() {
    const { toasts } = useToastStore();

    return (
        <div
            style={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
            }}
        >
            <AnimatePresence mode="popLayout">
                {toasts.map((t) => (
                    <Toast key={t.id} toast={t} />
                ))}
            </AnimatePresence>
        </div>
    );
}

export default ToastContainer;
