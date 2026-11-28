import { SearchBar } from '../shared/search-bar/SearchBar';
import './Header.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { isSearchVisible, ROUTES } from '../../routes';
import { useBurgerMenu } from './useBurgerMenu';

export function Header() {
  const { isOpen, toggle, close } = useBurgerMenu();
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__top">
          <div className="header__logo-wrapper">
            <span className="header__logo">PARTS.BY</span>
            <div className="header__menu-wrapper">
              <Link className="header__menu-text" to={ROUTES.CART}>
                КОРЗИНА
              </Link>
              <span className="header__menu-text">ВОЙТИ</span>
            </div>
          </div>
          <button
            className={`header__burger${isOpen ? ' on' : ''}`}
            type="button"
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}
            aria-controls="main-nav"
            onClick={toggle}
          >
            <span className="header__burger-bar"></span>
            <span className="header__burger-bar"></span>
            <span className="header__burger-bar"></span>
          </button>
        </div>
        {isSearchVisible(pathname) && (
          <div className="header__search-bar">
            <SearchBar />
          </div>
        )}
        <div className={`header__nav${isOpen ? ' on' : ''}`}>
          <nav className="header__nav-links">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <NavLink to={ROUTES.HOME} onClick={close}>
                  ЗАПЧАСТИ
                </NavLink>
              </li>
              <li className="header__nav-item">ДОСТАВКА И ОПЛАТА</li>
              <li className="header__nav-item">
                <NavLink to={ROUTES.ABOUT} onClick={close}>
                  О НАС
                </NavLink>
              </li>
              <li className="header__nav-item">КОНТАКТЫ</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
