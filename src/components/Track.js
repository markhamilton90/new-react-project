import React from 'react';

class Track extends React.Component {
    render() {
        return (
            <div className="track">
                <h3>{this.props.details.name}</h3>
                <h4>{this.props.details.artist}</h4>
                <div className="remove-track" onClick={ () => this.props.removeTrack(this.props.index) }></div>
            </div>
        )
    }
}

export default Track;
