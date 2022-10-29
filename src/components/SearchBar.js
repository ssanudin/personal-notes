import React from "react";
import PropTypes from "prop-types";

import useBahasa from "../hooks/useBahasa";

const SearchBar = ({ search, keyword }) => {
  const { isBahasa } = useBahasa();

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={isBahasa(
          "Cari berdasarkan judul ...",
          "Search by title ..."
        )}
        onChange={(e) => {
          search(e.target.value);
        }}
        value={keyword}
      />
    </section>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};

export default SearchBar;
