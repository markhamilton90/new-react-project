import React from 'react';

class Publish extends React.Component {

    spotifyToken = 'BQARARP0olR4tUyybdZdNVzY9tbS0X_4xuTjmZFehv-lQtlyyG1q1D9MCieNBiILtDUGMDCSgcR5QcjmuABPjytJYxyfYkbvbwOoPMNVplDKi4S73neXROwIAiHGE-VnTmP1WSsOESmvSYjJGzn7Rbb481FhaNMV8Zc15dhFJO0tcOAZ-fE';

    updateTracks = () => {
        // delete tracks first
        const {published} = this.props;
        const resource = `https://api.spotify.com/v1/playlists/${published.id}/tracks`;
        const settings = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.spotifyToken}`
            },
            body: JSON.stringify({
                'uris': published.uriList
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
                this.publishTracks(published.id);
            }
        });
    }

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
                const url = result.external_urls.spotify;
                this.props.setPublishedState({
                    'url': url,
                    'id': result.id
                });
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
            console.log(result);
            if (result.error) {
                // this.props.handleError(result.error);
            }
            else {
                this.props.setPublishedState({
                    uriList: uriList
                });
            }
        });
    }

    render() {
        // only display if we have tracks to publish
        if (this.props.tracks.length || this.props.published) {
            return <button className="spotify-btn" onClick={ this.props.published ? this.updateTracks : this.publishPlaylist }>
                { this.props.published ? 'Update Playlist' : 'Publish to Spotify!' }
            </button>
        } else {
            return ''
        }
    }
}

export default Publish;
