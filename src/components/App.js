import React from 'react';
import Playlist from './Playlist';
import AddTrackForm from './AddTrackForm';
import sampleTracks from '../sample-tracks';

class App extends React.Component {

    state = {
        tracks: sampleTracks
    };

    addTrack = track => {
        const tracks = { ...this.state.tracks };
        tracks[`track${Date.now()}`] = track;
        this.setState({
            tracks: tracks
        });

    }

    render() {
        return (
            <div className="new-react-project">
                <h1>Playlist</h1>
                <Playlist title="Mark's Playlist" tracks={this.state.tracks}/>
                <AddTrackForm addTrack={ this.addTrack } />
            </div>
        )
    }
}

export default App;
