import React from 'react';
import styles from '../App/App.module.css';

function Track({ track }) {
    return (
        <div className={styles.Track}>
            <p>{track.name} by {track.artist}</p>
            <button>Add to Playlist</button>
        </div>
    );
};

export default Track;