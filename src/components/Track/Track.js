import React from 'react';
import styles from '../App/App.module.css';

function Track({ track, onSelectTrack }) {
    return (
        <div className={styles.Track}>
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
            <input
                type="checkbox"
                onChange={() => onSelectTrack(track)}
            />
        </div>
    );
};

export default Track;