import React from 'react';

class Track extends React.Component {
    render() {
        return (
            <div className="track">
                <h3>{this.props.details.name}</h3>
                <h4>{this.props.details.artist}</h4>
            </div>
        )
    }
}

export default Track;
