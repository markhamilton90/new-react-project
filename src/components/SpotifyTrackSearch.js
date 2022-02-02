import React from 'react';
import SpotifyTrackSearchResults from './SpotifyTrackSearchResults';

class SpotifyTrackSearch extends React.Component {

    searchTerm = React.createRef();

    searchForTrack = (searchTerm, artist) => {

        if (searchTerm.length === 0 || !searchTerm.trim()) {
            return;
        }

        const spotifyToken = 'BQCGUprfz8yqQRQ1-ZDSRkb9xs16n4A2Grg77QLoyJCdWxr7_Jz4tMGHImUMpQ1STgACYAEk_Sv7yUDDx9AfgRjXlJH2jBAIs8oMHrcZV6xm6R1V5ySaGJnCYOIVNW_BH_04nPY8oMDnaLxaKdE';

        const resource = `https://api.spotify.com/v1/search?q=${searchTerm}+artist:${artist}&type=track&limit=5`;
        const settings = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
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
            <div className="spotifySearch">
                <input
                    ref={this.searchTerm}
                    type="text"
                    placeholder="Search track"
                    onKeyUp={ e => this.searchForTrack(this.searchTerm.current.value, 'Paramore') }
                />
                <SpotifyTrackSearchResults data={this.props.data}/>
            </div>
        );
    }
}

export default SpotifyTrackSearch;
