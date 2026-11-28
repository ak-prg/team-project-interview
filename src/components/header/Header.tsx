import { SearchBar } from '../shared/search-bar/SearchBar';
import './Header.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { isNavVisible, isSearchVisible, ROUTES } from '../../routes';
import { useBurgerMenu } from './useBurgerMenu';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { calculateTotalQuantity } from '../../features/cart/cart-utils';

export function Header() {
  const { isOpen, toggle, close, burgerRef, menuRef } = useBurgerMenu();
  const { pathname } = useLocation();
  const cartCount = useSelector((state: RootState) =>
    calculateTotalQuantity(state.cart.items)
  );

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__top">
          <div className="header__logo-wrapper">
            <Link className="header__logo" to={ROUTES.CATALOG}>
              PARTS.BY
            </Link>
            <div className="header__menu-wrapper">
              <Link
                className="header__menu-text"
                to={ROUTES.CART}
                aria-label={`Корзина, товаров: ${cartCount}`}
              >
                КОРЗИНА
                {cartCount > 0 && (
                  <span className="header__cart-count">{cartCount}</span>
                )}
              </Link>
              <span className="header__menu-text">ВОЙТИ</span>
            </div>
          </div>
          {isNavVisible(pathname) && (
            <button
              className={`header__burger${isOpen ? ' on' : ''}`}
              type="button"
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isOpen}
              aria-controls="main-nav"
              onClick={toggle}
              ref={burgerRef}
            >
              <span className="header__burger-bar"></span>
              <span className="header__burger-bar"></span>
              <span className="header__burger-bar"></span>
            </button>
          )}
        </div>
        {isSearchVisible(pathname) && (
          <div className="header__search-bar">
            <SearchBar onSearch={() => {}} />
          </div>
        )}
        {isNavVisible(pathname) && (
          <div className={`header__nav${isOpen ? ' on' : ''}`}>
            <nav className="header__nav-links" id="main-nav" ref={menuRef}>
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <NavLink to={ROUTES.CATALOG} onClick={close}>
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
        )}
      </div>
    </header>
  );
}
