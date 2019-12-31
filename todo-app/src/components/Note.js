import React, { Component } from 'react'

import '../style/note.css'

class Note extends Component {

    //completed updating

    render() {
        return (
            <div className="note">
                <div className="note-header">
                    <h3 className="note-title">{this.props.title}</h3>
                </div>
                <div className="note-content">
                    <p>{this.props.content}</p>
                </div>
            </div>
        );
    }
}

export default Note