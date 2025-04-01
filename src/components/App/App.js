import React, { useState } from 'react';
import './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Tracklist from '../Tracklist/Tracklist';

function App() {
    const [searchResults, setSearchResults] = useState([
        { id: 1, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
        { id: 2, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
        { id: 3, name: "Save Your Tears", artist: "The Weeknd", album: "After Hours" }
    ]);

    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar />
            <SearchResults />
            <Playlist />
            <Tracklist tracks={searchResults} />
        </div>
    );
};

export default App;
