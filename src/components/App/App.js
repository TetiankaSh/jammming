import React, { useState } from 'react';
import styles from './App.module.css';
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
    const [selectedTracks, setSelectedTracks] = useState([]);

    const handleSelectTrack = (track) => {
        setSelectedTracks(prevTracks => {
            if(prevTracks.some(t => t.id === track.id)) {
                return prevTracks.filter(t => t.id !== track.id);
            } else {
                return [...prevTracks, track];
            }
        })
    };

    const handleSaveToSpotify = () => {
        console.log('Saving selected tracks to Spotify: ', selectedTracks);

    };


    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar />
            <SearchResults />
            <div className={styles.Main}>
                <div className={styles.leftSide}> 
                    <Tracklist tracks={searchResults} onSelectTrack={handleSelectTrack}/>
                </div>
                <div className={styles.Playlist}>
                    <Playlist selectedTracks={selectedTracks} onSave={handleSaveToSpotify}/>
                </div>
            </div>
        </div>
    );
};

export default App;
