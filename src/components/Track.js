import React from 'react';

class Track extends React.Component {

    dragStart = (e, index) => {
        e.dataTransfer.setData("text", index);
    }

    dragOver = (e, index) => {
        e.preventDefault();
    }

    dragEnter = e => {
        e.currentTarget.classList.add('highlighted');
    }

    dragLeave = e => {
        e.currentTarget.classList.remove('highlighted');
    }

    drop = (e, targetIndex) => {
        const draggedIndex = e.dataTransfer.getData("text");
        this.props.reorderTracks(targetIndex, draggedIndex)
        e.dataTransfer.clearData();
        e.currentTarget.classList.remove('highlighted');
    }

    render() {
        return (
            <div className="track" draggable="true" onDragStart={ e => this.dragStart(e, this.props.index) } onDragOver={ e => this.dragOver(e, this.props.index) } onDrop={ e => this.drop(e, this.props.index) }
                onDragEnter={ e => this.dragEnter(e) } onDragLeave={ e => this.dragLeave(e) }>
                <h3>{this.props.details.name}</h3>
                <h4>{this.props.details.artist}</h4>
                <div className="remove-track" onClick={ () => this.props.removeTrack(this.props.index) }></div>
            </div>
        )
    }
}

export default Track;
