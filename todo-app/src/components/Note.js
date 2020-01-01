import React, { Component } from 'react'

import '../style/note.css'

class Note extends Component {

    

    deleteNote() {
        this.props.delete(this.props.title)
    }

    checked(e) {
        this.props.onComplete(this.props, e.target.checked)
    }

    //TODO consider \n when saving a note
    //add trash can icon
    render() {
        return (
            <div className="note">
                <div className="note-header">
                    <input className="completed-box" type="checkbox" defaultChecked={this.props.completed} onChange={this.checked.bind(this)} />
                    <h3 className="note-title">{this.props.title}</h3>
                    <button className="btn-container-square btn-container-28 link-button" onClick={() => this.deleteNote()}>

                    </button>
                    <div className="delete">

                    </div>
                </div>
                <div className="note-content">
                    <p>{this.props.content}</p>
                </div>
            </div>
        );
    }
}

export default Note