import React from 'react';
import Track from './Track';

class Playlist extends React.Component {

    changeTitle = e => {
        const newTitle = e.currentTarget.value;
        this.props.updateTitle(newTitle);
    }

    render() {
        return (
            <div className="playlist">
                <input className="playlist-title" type="text" defaultValue={ this.props.title } onBlur={ e => this.changeTitle(e) }/>
                <div className="tracklist">
                    {Object.keys(this.props.tracks).map( (key, index) => (
                        <Track key={this.props.tracks[key].id} index={index} details={this.props.tracks[key]} removeTrack={ this.props.removeTrack } reorderTracks={ this.props.reorderTracks }/>
                    ))}
                </div>
            </div>
        )
    }
}

export default Playlist;
