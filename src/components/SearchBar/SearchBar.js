import React, { useState } from 'react';
// import './SearchBar.module.css';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [placeholder, setPlaceholder] = useState('Search for a song!');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchCLick = () => {
        console.log(`Searching for ${searchTerm}`);
    };

    return (
        <div className="SearchBar">
            <input
                type="text"
                onFocus={() => setPlaceholder('')}
                onBlur={() => setPlaceholder('Search for a song!')}
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearchCLick}>Search</button>
        </div>
    );
};

export default SearchBar;