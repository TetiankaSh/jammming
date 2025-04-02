import React from 'react';
import styles from '../App/App.module.css';
import Track from '../Track/Track';

function Tracklist({ tracks, onSelectTrack, selectedTracks = []}) {
    return (
        <div className={styles.Tracklist}>
            {tracks.map(track => {
                const isSelected = selectedTracks.some(t => t.id === track.id);
                        
            return (
                <div key={track.id} className={styles.track}>
                    <p>{track.name} - {track.artist} ({track.album})</p>
                    <button onClick={() => onSelectTrack(track)}
                        className={isSelected ? styles.unselectButton : styles.button}
                    >
                        {isSelected ? "Unselect" : "Select"}
                    </button>
                </div>
            );
        })}
        </div>
    );
};

export default Tracklist;