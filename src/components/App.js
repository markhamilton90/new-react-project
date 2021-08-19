import React from 'react';
import Playlist from './Playlist';
import AddTrackForm from './AddTrackForm';
import sampleTracks from '../sample-tracks';

class App extends React.Component {

    state = {
        title: "Mark's Playlist",
        tracks: sampleTracks
    };

    addTrack = track => {
        const tracks = { ...this.state.tracks };
        tracks[`track${Date.now()}`] = track;
        this.setState({
            tracks: tracks
        });
    }

    removeTrack = key => {
        const tracks = { ...this.state.tracks };
        delete tracks[key];
        this.setState({
            tracks: tracks
        });
    }

    updateTitle = newTitle => {
        this.setState({
            title: newTitle
        });
    }

    render() {
        return (
            <div className="new-react-project">
                <h1>Playlist</h1>
                <Playlist title={ this.state.title } tracks={ this.state.tracks } editTitle={ this.editTitle } removeTrack={ this.removeTrack } updateTitle={ this.updateTitle }/>
                <AddTrackForm addTrack={ this.addTrack } />
            </div>
        )
    }
}

export default App;
