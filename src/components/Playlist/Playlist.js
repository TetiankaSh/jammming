import React from 'react';
import styles from '../App/App.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist( {selectedTracks = [], onSave, playlistName = "", playlistTracks = [], setPlaylistName } ) {
    /* const mockPlaylist = [
        { id: 1, name: "Track 1", artist: "Artist 1" },
        { id: 2, name: "Track 2", artist: "Artist 2" },
    ]; */

    return (
        <div className={styles.Playlist}>
            <input 
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                
            />
            <ul>
                {selectedTracks.length > 0 ? (
                    selectedTracks.map(track => (
                        <li key={track.id}>{track.name} by {track.artist} ({track.album})</li>
                    ))
                ) : (
                    <p>No tracks selected yet.</p>
                )}
            </ul>
            {selectedTracks.length > 0 && (
                <button onClick={onSave}
                        
                >Save to Spotify</button>
            )}
            <h3>{playlistName}</h3>
            <ul>
                {playlistTracks.length > 0 ? (
                    playlistTracks.map((track, index) => (
                        <li key={index}>{track.name} by {track.artist} ({track.album})</li>
                    ))
                ) : (
                    <p>Your playlist is empty.</p>
                )}
            </ul>
        </div>
    );
};

export default Playlist;