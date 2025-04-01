import React from 'react';
import styles from '../App/App.module.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults() {
    const mockTracks = [
        { id: 1, name: 'Track 1', artist: 'Artist 1' },
        { id: 2, name: 'Track 2', artist: 'Artist 2' },
        { id: 3, name: 'Track 3', artist: 'Artist 3' },
    ];

    return (
        <div className={styles.SearchResults}>
            <h2>Search Results</h2>
            <Tracklist tracks={mockTracks} />
        </div>
    );
};

export default SearchResults; 