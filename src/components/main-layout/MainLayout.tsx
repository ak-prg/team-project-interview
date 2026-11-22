import { Outlet } from 'react-router-dom';
import Header from '../../features/core/Header';
import Footer from '../../features/core/Footer';

export const MainLayout = () => (
  <div className="layout">
    <Header />
    <main className="layout__content">
      <Outlet />
    </main>
    <Footer />
  </div>
);
