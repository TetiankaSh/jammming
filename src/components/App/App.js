import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Tracklist from '../Tracklist/Tracklist';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    const handleSelectTrack = (track) => {
        setSelectedTracks((prevSelected) => {
            if (prevSelected.includes(track)) {
                return prevSelected.filter(t => t.id !== track.id);
            } else {
                return [...prevSelected, track];
            }
        });
    };

    const handleSaveToSpotify = () => {
        console.log('Saving selected tracks to Spotify: ', selectedTracks);

    };


    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar />
            <div className={styles.Main}>
                <div className={styles.SearchResults}> 
                    <SearchResults onSelectTrack={handleSelectTrack}/>
                </div>
                <div className={styles.Playlist}>
                    <Playlist selectedTracks={selectedTracks} onSave={handleSaveToSpotify}/>
                </div>
            </div>
        </div>
    );
};

export default App;
