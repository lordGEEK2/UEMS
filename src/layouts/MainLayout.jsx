import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function MainLayout() {
    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="page-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
