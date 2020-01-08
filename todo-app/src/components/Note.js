import React, { Component } from 'react'
import { Icon } from './Icons'
/**
 * This is the Todo/Note holder. It stores note properties (title and content) and render it
 */
class Note extends Component {

    /**
     * class constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props)
        this.state = { completed: this.props.completed }
    }

    /**
     * called when user click to the trash button. it delete the note from the DB and removes it from UI
     */
    deleteNote() {
        this.props.delete(this.props.title)
    }

    /**
     * called when user mark note as completed. it updates UI and stores completed value into DB 
     */
    checked(e) {
        this.setState({ completed: e.target.checked })
        this.props.onComplete(this.props, e.target.checked)
    }

    //TODO consider \n when saving a note
    render() {
        const completed = (this.state.completed ? "success" : "danger")
        return (
            <div className="column is-narrow">
                <div className="tile">
                    <div className="title is-5 is-vertical notification is-info">
                        <div className="tile">
                            <div className="field">
                                <input id={"complete-" + this.props.id} className={"is-checkradio is-block is-large is-" + completed} type="checkbox" defaultChecked={this.props.completed} onChange={this.checked.bind(this)} />
                                <label htmlFor={"complete-" + this.props.id} className="title">{this.props.title}</label>
                            </div>
                            <button className="button" onClick={() => this.deleteNote()}>
                                <Icon icon="trash" />
                            </button>
                        </div>
                        <div className="tile">
                            <p>{this.props.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Note