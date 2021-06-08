import React from 'react';
import Track from './Track';

class Playlist extends React.Component {
    render() {
        return (
            <div className="playlist">
                <h2>{ this.props.title }</h2>
                <div className="track-list">
                    {Object.keys(this.props.tracks).map(key => (
                        <Track key={key} details={this.props.tracks[key]} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Playlist;
