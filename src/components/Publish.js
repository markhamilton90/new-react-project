import React from 'react';

class Publish extends React.Component {

    spotifyToken = 'BQBOZ40HMFm9b-mMhUiJ7x-d5EbmF3_WASQ5d4_9yFisWvqc9KZxm0obteyuLqiZRPbAwin_OkfU0U5kD2a5elCnHVRNMAz4w-g4k6MViRoNzodUd3fpfHpxg8GYaYqmc7iIh7-aobsS8YvpIX9DlGzc4Gdol_BULe9ABIvfTWGo7pG3Xk0';

    publishPlaylist = () => {
        const resource = `https://api.spotify.com/v1/users/orangepeeladdict/playlists`;
        const settings = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.spotifyToken}`
            },
            body: JSON.stringify({
                'name': this.props.title
            })
        }
        fetch(resource, settings)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.error) {
                // this.props.handleError(result.error);
            }
            else {
                // console.log(result.external_urls.spotify);
                this.publishTracks(result.id);
            }
        });
    }

    publishTracks = (playlistId) => {
        const {tracks} = this.props;
        const uriList = tracks.map(i => i.spotifyTrackId);
        const resource = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        console.log(resource);
        const settings = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.spotifyToken}`
            },
            body: JSON.stringify({
                'uris': uriList
            })
        }
        fetch(resource, settings)
        .then(response => response.json())
        .then(result => {
            // console.log(result);
            if (result.error) {
                // this.props.handleError(result.error);
            }
            else {
                // console.log(result);
            }
        });
    }

    render() {
        return (
            <button className="spotify-btn" onClick={ this.publishPlaylist }>Publish to Spotify!</button>
        )
    }
}

export default Publish;
