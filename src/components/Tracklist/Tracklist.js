import React from 'react';
import styles from '../App/App.module.css';
import Track from '../Track/Track';

function Tracklist({ tracks }) {
    return (
        <div className={styles.Tracklist}>
            {tracks.map(track => (
                <Track key={track.id} track={track} />
            ))}
        </div>
    );
};

export default Tracklist;