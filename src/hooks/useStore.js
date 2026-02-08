import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme Store - Dark/Light mode management
export const useThemeStore = create(
    persist(
        (set, get) => ({
            theme: 'light',
            toggleTheme: () => {
                const newTheme = get().theme === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                set({ theme: newTheme });
            },
            setTheme: (theme) => {
                document.documentElement.setAttribute('data-theme', theme);
                set({ theme });
            },
            initTheme: () => {
                const theme = get().theme;
                document.documentElement.setAttribute('data-theme', theme);
            },
        }),
        {
            name: 'uems-theme',
        }
    )
);

// Auth Store - User authentication state
export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            token: null,
            role: null,

            login: (user, token) => set({
                user,
                token,
                isAuthenticated: true,
                role: user.role,
            }),

            logout: () => set({
                user: null,
                token: null,
                isAuthenticated: false,
                role: null,
            }),

            updateUser: (userData) => set((state) => ({
                user: { ...state.user, ...userData },
            })),
        }),
        {
            name: 'uems-auth',
        }
    )
);

// UI Store - Global UI state
export const useUIStore = create((set) => ({
    sidebarOpen: false,
    mobileMenuOpen: false,
    searchOpen: false,
    notifications: [],

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

    toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
    setSearchOpen: (open) => set({ searchOpen: open }),

    addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { id: Date.now(), ...notification }],
    })),

    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
    })),

    clearNotifications: () => set({ notifications: [] }),
}));

// Events Filter Store
export const useEventsFilterStore = create((set) => ({
    category: 'all',
    status: 'all',
    dateRange: null,
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc',

    setCategory: (category) => set({ category }),
    setStatus: (status) => set({ status }),
    setDateRange: (dateRange) => set({ dateRange }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (sortOrder) => set({ sortOrder }),

    resetFilters: () => set({
        category: 'all',
        status: 'all',
        dateRange: null,
        searchQuery: '',
        sortBy: 'date',
        sortOrder: 'desc',
    }),
}));

// Registration Store - Track event registrations
export const useRegistrationStore = create((set, get) => ({
    registrations: [],
    loading: false,

    addRegistration: (registration) => set((state) => ({
        registrations: [...state.registrations, registration],
    })),

    removeRegistration: (eventId) => set((state) => ({
        registrations: state.registrations.filter((r) => r.eventId !== eventId),
    })),

    isRegistered: (eventId) => get().registrations.some((r) => r.eventId === eventId),

    setLoading: (loading) => set({ loading }),
}));
