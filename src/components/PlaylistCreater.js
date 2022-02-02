import React from 'react';
import spotify from '../spotify';

class PlaylistCreater extends React.Component {

    inputName = React.createRef();

    createPlaylist = e => {
        e.preventDefault();
        const playlistName = this.inputName.current.value;
        this.props.history.push(`/playlist/${playlistName}`);
    }

    render() {
        return (
            <div className="container">
                <h2>Create a Playlist</h2>
                <form onSubmit={this.createPlaylist} className="addPlaylistForm">
                    <input
                        ref={this.inputName}
                        required
                        type="text"
                        placeholder="Enter playlist name..."/>
                    <button type="submit">Create Playlist</button>
                </form>
            </div>
        );
    }
}

export default PlaylistCreater;
