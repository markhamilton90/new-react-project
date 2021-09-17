import React from 'react';

class PlaylistCreater extends React.Component {

    inputName = React.createRef();

    createPlaylist = e => {
        e.preventDefault();
        const playlistName = this.inputName.current.value;
        this.props.history.push(`/playlist/${playlistName}`);
    }

    render() {
        return (
            <form onSubmit={this.createPlaylist}>
                <h2>Create a Playlist</h2>
                <input
                    ref={this.inputName}
                    required
                    type="text"
                    placeholder="Enter playlist name..."/>
                <button type="submit">Create Playlist</button>
            </form>
        );
    }
}

export default PlaylistCreater;
