import React, { useState, useEffect } from 'react';
import styles from '../App/App.module.css';
import Tracklist from '../Tracklist/Tracklist';
import Track from '../Track/Track';

function SearchResults({ tracks, onSelectTrack, selectedTracks }) {
  /*  const [tracks, setTracks] = useState([]);

    useEffect(() => {
        setTimeout(() => {const fetchedTracks = [
                { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
                { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
                { id: 3, name: 'Track 3', artist: 'Artist 3', album: 'Album 3' },
        ];
        setTracks(fetchedTracks);
    }, 1000);
    }, []); */

    return (
        <div className={styles.SearchResults}>
            <h2>Search Results</h2>
            <Tracklist tracks={tracks} onSelectTrack={onSelectTrack} selectedTracks={selectedTracks}/>
        </div>
    );
};

export default SearchResults; 