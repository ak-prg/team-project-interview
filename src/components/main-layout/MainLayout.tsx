import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './MainLayout.css';

export const MainLayout = () => (
  <div className="layout">
    <Header />
    <main className="layout__content">
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);
