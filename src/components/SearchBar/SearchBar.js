import React, { useState } from 'react';
// import './SearchBar.module.css';

function SearchBar( {onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [placeholder, setPlaceholder] = useState('Search for a song!');
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchCLick = () => {
        console.log(`Searching for ${searchTerm}`);
    };

    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onFocus={() => setPlaceholder('')}
                    onBlur={() => setPlaceholder('Search for a song!')}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit" onClick={handleSearchCLick}>Search</button>
            </form>
        </div>
    );
};

export default SearchBar;