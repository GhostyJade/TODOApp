import React, { Component } from 'react';

import { Icon } from './Icons';

/**
 * 
 */
class NoteCreator extends Component {

    /**
     * 
     */
    constructor(props) {
        super(props)
        this.state = { title: '', content: '' }
    }

    /**
     * 
     * @param {<input type="text">} event 
     */
    titleChanged(event) {
        this.setState({ title: event.target.value })
    }

    /**
     * 
     * @param {<textarea>} event 
     */
    contentChanged(event) {
        this.setState({ content: event.target.value })
    }

    /**
     * 
     */
    render() {
        if (this.props.visibility)
            return (
                <div className="columns is-centered" style={{ zIndex: 30 }}>
                    <div className="column is-half">
                        <div className="container">
                            <div className="card" >
                                <header className="card-header" >
                                    <p className="card-header-title is-centered">New note</p>
                                </header>
                                <div className="card-content" >
                                    <div className="columns">
                                        <div className="column">
                                            <div className="control">
                                                <input type="text"
                                                    className="input"
                                                    name="title"
                                                    id="title"
                                                    placeholder="Note title"
                                                    value={this.state.title}
                                                    onChange={this.titleChanged.bind(this)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <textarea name="content"
                                                className="textarea"
                                                id="content"
                                                cols="60"
                                                rows="10"
                                                placeholder="Note content"
                                                value={this.state.content}
                                                onChange={this.contentChanged.bind(this)}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <div className="card-footer-item">
                                        <div className="container">
                                            <div className="columns">
                                                <div className="column is-1 is-offset-11">

                                                    <button className="button is-dark"
                                                        onClick={
                                                            () => {
                                                                if ((this.state.title !== '' || this.state.title !== ' ') && (this.state.content !== '' || this.state.content !== ' ')) {
                                                                    this.props.save({ title: this.state.title, content: this.state.content, completed: false });
                                                                    this.setState({ title: "", content: "" })
                                                                }
                                                            }
                                                        }>
                                                        <Icon icon="save" color="white" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            );
        else
            return (< > </>)
    }
}

export default NoteCreator;