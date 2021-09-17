import React from 'react';
import Playlist from './Playlist';
import AddTrackForm from './AddTrackForm';
import sampleTracks from '../sample-tracks';
import base from '../base';

class App extends React.Component {

    state = {
        title: this.props.match.params.playlistId,
        tracks: []
    };

    componentDidMount() {
        const { params } = this.props.match;
        this.ref = base.syncState(`${params.playlistId}/tracks`, {
            context: this,
            state: 'tracks',
            defaultValue: [],
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
                <h1>Playlist</h1>
                <Playlist title={ this.state.title } tracks={ this.state.tracks } editTitle={ this.editTitle } removeTrack={ this.removeTrack } updateTitle={ this.updateTitle } reorderTracks={ this.reorderTracks }/>
                <AddTrackForm addTrack={ this.addTrack } />
            </div>
        )
    }
}

export default App;
