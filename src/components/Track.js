import React from 'react';

class Track extends React.Component {

    dragStartTrack = (e, index) => {
        e.dataTransfer.setData("text", index);
    }

    dragOverTrack = (e, index) => {
        e.preventDefault();
    }

    dropTrack = (e, targetIndex) => {
        const draggedIndex = e.dataTransfer.getData("text");
        this.props.reorderTracks(targetIndex, draggedIndex)
        e.dataTransfer.clearData();
    }

    render() {
        return (
            <div className="track" draggable="true" onDragStart={ e => this.dragStartTrack(e, this.props.index) } onDragOver={ e => this.dragOverTrack(e, this.props.index) } onDrop={ e => this.dropTrack(e, this.props.index) }>
                <h3>{this.props.details.name}</h3>
                <h4>{this.props.details.artist}</h4>
                <div className="remove-track" onClick={ () => this.props.removeTrack(this.props.index) }></div>
            </div>
        )
    }
}

export default Track;
