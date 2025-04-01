import React from 'react';
import './Track.module.css';

function Track({ track }) {
    return (
        <div className="Track">
            <p>{track.name} by {track.artist}</p>
            <button>Add to Playlist</button>
        </div>
    );
};

export default Track;