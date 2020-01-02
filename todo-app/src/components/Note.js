import React, { Component } from 'react'

class Note extends Component {

    constructor(props) {
        super(props)
        this.state = { completed: this.props.completed }
    }
    //(implementing colors to say completed or not): update required, missing notes priorities

    deleteNote() {
        this.props.delete(this.props.title)
    }

    checked(e) {
        this.setState({ completed: e.target.checked })
        this.props.onComplete(this.props, e.target.checked)
    }

    //TODO consider \n when saving a note
    render() {
        const completed = this.state.completed
        return (
            <div className="note">
                <div className="note-header">
                    <input className="completed-box" type="checkbox" defaultChecked={this.props.completed} onChange={this.checked.bind(this)} />
                    <h3 className={"note-title note-title-completed-" + completed}>{this.props.title}</h3>
                    <button className="btn-container-square btn-container-28 link-button" onClick={() => this.deleteNote()}>
                        <div className="btn btn-22 btn-delete">
                        </div>
                    </button>
                </div>
                <div className="note-content">
                    <p>{this.props.content}</p>
                </div>
            </div>
        );
    }
}

export default Note