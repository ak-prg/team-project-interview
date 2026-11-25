import './SearchBar.css';

export function SearchBar() {
  return (
    <form
      className="search-bar"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="search-bar__input body-text"
        type="search"
        placeholder="Введите точный номер"
      />
      <button className="search-bar__button title-text" type="submit">
        поиск
      </button>
    </form>
  );
}
