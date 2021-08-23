import React from 'react';
import Track from './Track';

class Playlist extends React.Component {

    titleInputRef = React.createRef();

    editTitle = (e, input) => {
        e.currentTarget.classList.add('editing');
        input.current.focus();
    }

    stopEditingTitle = e => {
        e.currentTarget.classList.remove('editing');
    }

    changeTitle = e => {
        const newTitle = e.currentTarget.value;
        this.props.updateTitle(newTitle);
    }

    render() {
        return (
            <div className="playlist">
                <div className="playlist-title" onClick={ e => this.editTitle(e, this.titleInputRef) } onBlur={ e => this.stopEditingTitle(e) }>
                    <h2 className="playlist-title-heading">
                        { this.props.title }
                        <sup>EDIT</sup>
                    </h2>
                    <input ref={ this.titleInputRef } className="playlist-title-input" type="text" defaultValue={ this.props.title } onBlur={ e => this.changeTitle(e) }/>
                </div>
                <div className="track-list">
                    {Object.keys(this.props.tracks).map( (key, index) => (
                        <Track key={this.props.tracks[key].id} index={index} details={this.props.tracks[key]} removeTrack={ this.props.removeTrack } reorderTracks={ this.props.reorderTracks }/>
                    ))}
                </div>
            </div>
        )
    }
}

export default Playlist;
