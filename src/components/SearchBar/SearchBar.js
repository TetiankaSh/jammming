import React, { useState } from 'react';
import './SearchBar.module.css';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

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
                placeholder="Search for a song!"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearchCLick}>Search</button>
        </div>
    );
};

export default SearchBar;