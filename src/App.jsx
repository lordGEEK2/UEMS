import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore, useAuthStore } from './hooks/useStore';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Home from './pages/Home';
import EventsPage from './pages/Events/EventsPage';
import EventDetailPage from './pages/Events/EventDetailPage';
import ClubsPage from './pages/Clubs/ClubsPage';
import ClubDetailPage from './pages/Clubs/ClubDetailPage';
import RecruitmentsPage from './pages/Recruitments/RecruitmentsPage';
import SponsorsPage from './pages/Sponsors/SponsorsPage';

// Auth Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

// Dashboard Pages
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import ClubAdminDashboard from './pages/Dashboard/ClubAdminDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

// Styles
import './styles/globals.css';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Dashboard Router based on role
function DashboardRouter() {
  const { role } = useAuthStore();

  switch (role) {
    case 'student':
      return <StudentDashboard />;
    case 'club_admin':
    case 'club_head':
    case 'club_member':
      return <ClubAdminDashboard />;
    case 'super_admin':
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
}

function App() {
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/:slug" element={<ClubDetailPage />} />
          <Route path="/recruitments" element={<RecruitmentsPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/dashboard/events" element={<DashboardRouter />} />
          <Route path="/dashboard/clubs" element={<DashboardRouter />} />
          <Route path="/dashboard/chat" element={<DashboardRouter />} />
          <Route path="/dashboard/settings" element={<DashboardRouter />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
