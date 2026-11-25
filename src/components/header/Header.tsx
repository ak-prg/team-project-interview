import { SearchBar } from '../shared/search-bar/SearchBar';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__top">
          <div className="header__logo-wrapper">
            <span className="header__logo">PARTS.BY</span>
            <div className="header__menu-wrapper">
              <span className="header__menu-text">КОРЗИНА</span>
              <span className="header__menu-text">ВОЙТИ</span>
            </div>
          </div>
          <button
            className="header__burger"
            type="button"
            aria-label="Открыть меню"
          >
            <span className="header__burger-bar"></span>
            <span className="header__burger-bar"></span>
            <span className="header__burger-bar"></span>
          </button>
        </div>
        <div className="header__search-bar">
          <SearchBar />
        </div>
        <div className="header__nav">
          <nav className="header__nav-links">
            <ul className="header__nav-list">
              <li className="header__nav-item">ЗАПЧАСТИ</li>
              <li className="header__nav-item">ДОСТАВКА И ОПЛАТА</li>
              <li className="header__nav-item">О НАС</li>
              <li className="header__nav-item">КОНТАКТЫ</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
