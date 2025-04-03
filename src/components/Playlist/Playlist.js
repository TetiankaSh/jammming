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
            <div className={styles.toBeSavedPlaylist}>
                <input 
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = 'Enter your playlist name here...'}
                    placeholder="Enter your playlist name here..."
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
            </div>
            <div className={styles.savedPlaylist}>
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
        </div>
    );
};

export default Playlist;