import React from 'react';
import SpotifyTrackSearchResults from './SpotifyTrackSearchResults';
import Publish from './Publish';

class AddTrackForm extends React.Component {

    state = {
        track: '',
        artist: '',
        selectedTrack: ''
    };

    nameRef = React.createRef();
    artistRef = React.createRef();

    spotifyToken = 'BQBOZ40HMFm9b-mMhUiJ7x-d5EbmF3_WASQ5d4_9yFisWvqc9KZxm0obteyuLqiZRPbAwin_OkfU0U5kD2a5elCnHVRNMAz4w-g4k6MViRoNzodUd3fpfHpxg8GYaYqmc7iIh7-aobsS8YvpIX9DlGzc4Gdol_BULe9ABIvfTWGo7pG3Xk0';

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clearFormState = e => {
        this.setState({
            track: '',
            artist: '',
            selectedTrack: ''
        });
    }

    selectTrackResult = e => {
        const spotifyTrackName = e.currentTarget.dataset.track;
        const spotifyArtist = e.currentTarget.dataset.artist;
        const spotifyTrackId = e.currentTarget.id;
        this.setState({
            track: spotifyTrackName,
            artist: spotifyArtist,
            selectedTrack: spotifyTrackId
        });
        this.props.resetSpotifyData();
    }

    createTrack = e => {
        e.preventDefault();
        const track = {
            name: this.nameRef.current.value,
            artist: this.artistRef.current.value ? this.artistRef.current.value : 'Unknown',
            spotifyTrackId: this.state.selectedTrack
        }
        this.props.addTrack(track);
        e.currentTarget.reset();
        this.clearFormState();
    }

    searchForTrack = (searchTerm, artist) => {
        if (searchTerm.length === 0 || !searchTerm.trim()) {
            return;
        }
        searchTerm = searchTerm.trim().split(' ').join('+');
        artist = artist.trim().split(' ').join('+');
        artist = !!artist ? `+artist:${artist}` : '';

        const resource = `https://api.spotify.com/v1/search?q=${searchTerm + artist}&type=track&limit=5`;
        const settings = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.spotifyToken}`
            }
        }
        fetch(resource, settings)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.error) {
                this.props.handleError(result.error);
            }
            else {
                const items = result.tracks.items;
                this.props.addItems(items);
            }
        });
    }

    render() {
        return (
            <form className="addTrackForm" onSubmit={ this.createTrack }>
                <input
                    ref={ this.nameRef }
                    name="track"
                    type="text"
                    placeholder="Track name..."
                    onKeyUp={ e => this.searchForTrack(this.nameRef.current.value, this.artistRef.current.value) }
                    onChange={ this.inputChange }
                    required
                    value={ this.state.track }
                    autoComplete="off" />
                <input
                    ref={ this.artistRef }
                    name="artist"
                    type="text"
                    placeholder="Artist name..."
                    onKeyUp={ e => this.searchForTrack(this.nameRef.current.value, this.artistRef.current.value) }
                    onChange={ this.inputChange }
                    value={ this.state.artist }
                    autoComplete="off" />
                <button type="submit">Add Track</button>
                <SpotifyTrackSearchResults data={ this.props.data } selectTrackResult={ this.selectTrackResult }/>
                <Publish title={ this.props.title } tracks={ this.props.tracks }/>
            </form>
        )
    }
}

export default AddTrackForm;
