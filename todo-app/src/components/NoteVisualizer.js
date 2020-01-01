import React, { Component } from 'react'

import Note from './Note'

class NoteVisualizer extends Component {

    render() {
        const items = this.props.notes.map(e => {
            return <Note key={e.title} title={e.title} content={e.content} completed={e.completed} delete={(e) => this.props.delete(e)} onComplete={(title, value) => this.props.update(title, value)} />
        })
        return (
            items
        )
    }
}

export default NoteVisualizer