import React from 'react';
import Playlist from './Playlist';
import AddTrackForm from './AddTrackForm';
import base from '../base';

class App extends React.Component {

    state = {
        title: '',
        tracks: [],
        spotifyData: {
            items: [],
            error: null
        }
    };

    componentDidMount() {
        const { params } = this.props.match;
        base.syncState(`${params.playlistId}/tracks`, {
            context: this,
            state: 'tracks',
            asArray: true,
            defaultValue: [],
        });
        base.syncState(`${params.playlistId}/title`, {
            context: this,
            state: 'title',
            defaultValue: this.props.match.params.playlistId,
        });
    }

    handleError = (error) => {
        const {spotifyData} = this.state;
        spotifyData.error = error;
        this.setState({
            spotifyData: spotifyData
        });
    }

    addItems = (items) => {
        const {spotifyData} = this.state;
        spotifyData.items = items;
        this.setState({
            spotifyData: spotifyData
        });
    }

    resetSpotifyData = () => {
        this.setState({
            spotifyData: {
                items: [],
                error: null
            }
        });
    }

    addTrack = track => {
        const tracks = [ ...this.state.tracks ];
        track.id = `track${Date.now()}`;
        tracks.push(track);
        this.setState({
            tracks: tracks
        });
    }

    removeTrack = key => {
        const tracks = [ ...this.state.tracks ];
        delete tracks[key];
        const filteredTracks = tracks.filter( el => {
            return el != null;
        });
        this.setState({
            tracks: filteredTracks
        });
    }

    updateTitle = newTitle => {
        this.setState({
            title: newTitle
        });
    }

    reorderTracks = (targetIndex, draggedIndex) => {
        const tracks = [ ...this.state.tracks ];
        const draggedIndexTrack = tracks[draggedIndex];
        delete tracks[draggedIndex];

        if (targetIndex > draggedIndex) {
            tracks.splice((targetIndex + 1), 0, draggedIndexTrack);
        } else {
            tracks.splice(targetIndex, 0, draggedIndexTrack);
        }

        const filteredTracks = tracks.filter( el => {
            return el != null;
        });
        this.setState({
            tracks: filteredTracks
        });
    }

    render() {
        return (
            <div className="new-react-project">
                <div className="container">
                    <h1>Playlist</h1>
                    <Playlist title={ this.state.title } tracks={ this.state.tracks } removeTrack={ this.removeTrack } updateTitle={ this.updateTitle } reorderTracks={ this.reorderTracks }/>
                    <AddTrackForm addTrack={ this.addTrack } data={this.state.spotifyData} handleError={ this.handleError } addItems={ this.addItems } resetSpotifyData={ this.resetSpotifyData }/>
                </div>
            </div>
        )
    }
}

export default App;
