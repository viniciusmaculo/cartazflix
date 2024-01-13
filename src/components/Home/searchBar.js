import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='wrapper-searchBar'>
      <input
        type="text"
        placeholder="Pesquisar filmes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className='searchBar'
      />
      <button onClick={handleSearch} className='searchBar-button'>Pesquisar</button>
    </div>
  );
};

export default SearchBar;
