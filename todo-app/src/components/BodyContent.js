import React, { Component } from 'react';

import '../style/bodycontent.css'
import '../style/icons.css'

import NoteVisualizer from './NoteVisualizer'
import NoteCreator from './NoteCreator'

import menu_icon from '../icons/icn-menu.svg'

class BodyContent extends Component {

    constructor(props) {
        super(props)
        this.state = { noteList: [], creatorVisibility: false }
    }

    saveNote = (event) => {
        this.setState(oldState => ({
            noteList: [...oldState.noteList, { title: event.title, content: event.content }]
        }))
    }

    changeCreatorVisibility() {
        this.setState({ creatorVisibility: !this.state.creatorVisibility });
    }

    render() {
        return (
            <main className="bodymain">
                <div className="Body-Bar">
                    <button className="btn-container btn-container-32 link-button" onClick={this.changeCreatorVisibility.bind(this)}>
                        <div className="btn btn-28 btn-menu" src={menu_icon} alt="menu" />
                    </button>
                </div>
                <NoteVisualizer notes={this.state.noteList} />
                <NoteCreator visibility={this.state.creatorVisibility} save={this.saveNote.bind(this)} />
            </main>
        );
    }
}

export default BodyContent;