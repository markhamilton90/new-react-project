import React from 'react';
import SpotifyTrackSearchResults from './SpotifyTrackSearchResults';

class AddTrackForm extends React.Component {

    state = {
        name: '',
        artist: '',
        selectedTrack: ''
    };

    nameRef = React.createRef();
    artistRef = React.createRef();
    hiddenRef = React.createRef();

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clearFormState = e => {
        this.setState({
            name: '',
            artist: '',
            selectedTrack: ''
        });
    }

    selectTrackResult = e => {
        const spotifyTrackName = e.currentTarget.dataset.track;
        const spotifyArtist = e.currentTarget.dataset.artist;
        const spotifyTrackId = e.currentTarget.id;
        this.setState({
            name: spotifyTrackName,
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

        const spotifyToken = 'BQBXW-pVnvsv21PBpeu8PAUyrAKkgS4oFa665bFMF_BTcorQOXjEKviXY-3KwHbvvFSkc7mJgFyrtgO4-my3Rz4gDK7Bp9r97Hqc4YIjahKLTcWdSpsWSzjaUroX7gBQnPcasDy6BJ6k8HKTsN4';
        const resource = `https://api.spotify.com/v1/search?q=${searchTerm + artist}&type=track&limit=5`;
        const settings = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        }
        fetch(resource, settings)
        .then(response => response.json())
        .then(result => {
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
                    name="name"
                    type="text"
                    placeholder="Track name..."
                    onKeyUp={ e => this.searchForTrack(this.nameRef.current.value, this.artistRef.current.value) }
                    onChange={ this.inputChange }
                    required
                    value={ this.state.name }
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
                <SpotifyTrackSearchResults data={this.props.data} selectTrackResult={ this.selectTrackResult }/>
            </form>
        )
    }
}

export default AddTrackForm;
