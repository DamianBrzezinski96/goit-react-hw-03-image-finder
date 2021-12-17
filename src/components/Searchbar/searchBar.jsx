import React from "react";
import s from "./searchBar.module.css";

const SearchBar = ({ onSubmit, onSetKeyword, searchQuery }) => {
  return (
    <header className={s.Searchbar}>
      <form onSubmit={onSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>&#128073;</span>
        </button>

        <input
          name="searchQuery"
          onInput={onSetKeyword}
          value={searchQuery}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;