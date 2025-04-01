import React from 'react';
import styles from '../App/App.module.css';
import Track from '../Track/Track';

function Tracklist({ tracks }) {
    return (
        <div className={styles.Tracklist}>
            {tracks.map(track => (
                <div key={track.id} className={styles.track}>
                    <p>{track.name} - {track.artist} ({track.album})</p>
                    <button onClick={() => onSelectTrack(track)}>Select</button>
                </div>
            ))}
        </div>
    );
};

export default Tracklist;