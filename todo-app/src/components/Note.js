import React, { Component } from 'react'
import { Icon } from './Icons'

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
                                <div className="btn btn-22 btn-delete">
                                </div>
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