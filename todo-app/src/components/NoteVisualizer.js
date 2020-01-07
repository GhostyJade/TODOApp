import React, { Component } from 'react'

import Note from './Note'

class NoteVisualizer extends Component {

    /**
     * Render all notes mapping them into an object. the todo title is used as key. 
     * This must improved by using the todo id (since it's unique) instead title 
     */
    render() {
        const items = this.props.notes.map(e => {
            return <Note key={e.title} id={e.id} title={e.title} content={e.content} completed={e.completed} delete={(e) => this.props.delete(e)} onComplete={(title, value) => this.props.update(title, value)} />
        })
        return (
            <div className="container">
                <div className="columns is-multiline">
                    {items}
                </div>
            </div>
        )
    }
}

export default NoteVisualizer