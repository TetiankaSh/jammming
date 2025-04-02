import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Tracklist from '../Tracklist/Tracklist';
import Spotify from '../Spotify/spotify';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    const [playlistName, setPlaylistName] = useState('My New Playlist');
    const [playlistTracks, setPlaylistTracks] = useState([
        { name: "Song 1", uri: "spotify:track:123" },
        { name: "Song 2", uri: "spotify:track:456" },
        { name: "Song 3", uri: "spotify:track:789" },
    ]);

    const savePlaylist = async () => {
        const trackUris = playlistTracks.map((track) => track.uri);
        await Spotify.savePlaylist(playlistName, trackUris);
        setPlaylistTracks([]);
    }

    const handleSelectTrack = (track) => {
        setSelectedTracks((prevSelected) => {
            const isSelected = prevSelected.some(t => t.id === track.id);

            if (isSelected) {
                return prevSelected.filter(t => t.id !== track.id);
            } else {
                return [...prevSelected, track];
            }
        });
    };


    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar />
            <div className={styles.Main}>
                <div className={styles.SearchResults}> 
                    <SearchResults tracks={searchResults} onSelectTrack={handleSelectTrack} selectedTracks={selectedTracks}/>
                </div>
                <div className={styles.Playlist}>
                    <Playlist selectedTracks={selectedTracks} onSave={savePlaylist}
                    playlistName={playlistName}
                    setPlaylistName={setPlaylistName}/>
                </div>
            </div>
        </div>
    );
};

export default App;
window.Spotify = Spotify;
