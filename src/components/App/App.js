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
    const [tracks, setTracks] = useState([]);

    const [playlistName, setPlaylistName] = useState('My New Playlist');
    const [playlistTracks, setPlaylistTracks] = useState([]);

    const savePlaylist = async () => {
        if (!selectedTracks.length) {
            console.error("❌ No tracks in the playlist to save!");
            return;
        }

        console.log("🚀 Saving playlist:", playlistName, selectedTracks);
        const trackUris = selectedTracks.map((track) => track.uri);

        try {
            await Spotify.savePlaylist(playlistName, trackUris);

            const newTracks = selectedTracks.filter(
                track => !playlistTracks.some(existingTrack => existingTrack.uri === track.uri)
            );
            setPlaylistTracks(prevTracks => {
                const updatedTracks = [...prevTracks, ...newTracks];
                return updatedTracks;
            });

            setSelectedTracks([]);
            alert("✅ Playlist saved successfully!");
        } catch (error) {
        console.error("❌ Error saving playlist:", error);
        }    
    };

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

    const handleSearch = async (query) => {
        const searchResults = await Spotify.searchTracks(query);
        setTracks(searchResults);
    };


    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar onSearch={handleSearch}/>
            <div className={styles.Main}>
                <div className={styles.SearchResults}> 
                    <SearchResults tracks={tracks} onSelectTrack={handleSelectTrack} selectedTracks={selectedTracks}/>
                </div>
                <div className={styles.Playlist}>
                    <Playlist selectedTracks={selectedTracks} playlistTracks={playlistTracks} onSave={savePlaylist}
                    playlistName={playlistName}
                    setPlaylistName={setPlaylistName}/>
                </div>
            </div>
        </div>
    );
};

export default App;
window.Spotify = Spotify;
