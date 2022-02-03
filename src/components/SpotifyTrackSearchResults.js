import React from 'react';

class SpotifyTrackSearchResults extends React.Component {

    render() {
        const { error, items } = this.props.data;
        if (error) {
            return (
                <code>{`Error: ${error.message}`}</code>
            );
        }
        else if (items.length) {
            return (
                <div className="search-results">
                    <ul>
                        { items.map( (key, index) => (
                            <li
                                key={ items[index].id }
                                id={ items[index].uri }
                                data-track={ items[index].name }
                                data-artist={ items[index].artists[0].name }
                                onClick={ this.props.selectTrackResult }>
                                <span aria-label="Musical track" role="img">🎵</span> {items[index].name} &nbsp;&nbsp;<span aria-label="Artist" role="img">👤</span> <strong>{items[index].artists[0].name}</strong>
                            </li>
                        )) }
                    </ul>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default SpotifyTrackSearchResults;
