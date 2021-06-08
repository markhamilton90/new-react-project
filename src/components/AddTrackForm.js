import React from 'react';

class AddTrackForm extends React.Component {

    nameRef = React.createRef();
    artistRef = React.createRef();

    createTrack = (e) => {
        e.preventDefault();
        const track = {
            name: this.nameRef.current.value,
            artist: this.artistRef.current.value ? this.artistRef.current.value : 'Unknown'
        }
        this.props.addTrack(track);
        e.currentTarget.reset();
    }

    render() {
        return (
            <form className="addTrackForm" onSubmit={ this.createTrack }>
                <input ref={ this.nameRef } name="name" type="text" placeholder="Track name..." required />
                <input ref={ this.artistRef } name="artist" type="text" placeholder="Artist name..." />
                <button type="submit">Add Track</button>
            </form>
        )
    }
}

export default AddTrackForm;
