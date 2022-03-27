import React from 'react';
import SpotifyTrackSearchResults from './SpotifyTrackSearchResults';

class AddTrackForm extends React.Component {

    state = {
        track: '',
        artist: '',
        selectedTrack: ''
    };

    nameRef = React.createRef();
    artistRef = React.createRef();

    spotifyToken = 'BQC73_UaIr81IC14-0Rl0sWnACWqdX0IsH3OEYR5SqQ-Lm2Ska1ugYauxXi_R0ULA09ssizRMSCbhW2g4yvbYPk8J_Ay-abOPWeTpzjmX9GGM0rsPRMhdH612fMloy8CYRysX0yqiXizun5RvG0NMlv8ZI1ErGgVuSVZvbVHxIGIcCtL67M';

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
            </form>
        )
    }
}

export default AddTrackForm;
