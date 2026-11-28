import type { SearchBarProps } from '../../../types/header.types';
import './SearchBar.css';

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <form
      className="search-bar"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(String(new FormData(e.currentTarget).get('query')));
      }}
    >
      <input
        className="search-bar__input body-text"
        type="search"
        placeholder="Введите точный номер"
        name="query"
        aria-label="Поиск по номеру запчасти"
      />
      <button className="search-bar__button title-text" type="submit">
        поиск
      </button>
    </form>
  );
}
