import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/main-layout/MainLayout';
import {
  CatalogPage,
  PartPage,
  CartPage,
  AboutPage,
  NotFoundPage,
} from './pages';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.CATALOG, element: <CatalogPage /> },
      { path: ROUTES.PART, element: <PartPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
]);
