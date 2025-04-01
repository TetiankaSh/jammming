import React from 'react';
import styles from '../App/App.module.css';

function Playlist() {
    const mockPlaylist = [
        { id: 1, name: "Track 1", artist: "Artist 1" },
        { id: 2, name: "Track 2", artist: "Artist 2" },
    ];

    return (
        <div className={styles.Playlist}>
            <h2>Your Playlist</h2>
            <ul>
                {mockPlaylist.map(track => (
                    <li key={track.id}>{track.name} by {track.artist}</li>
                ))}
            </ul>
            <button>Save to Spotify</button>
        </div>
    );
};

export default Playlist;