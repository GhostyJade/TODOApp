import React, { Component } from 'react';

import { Icon } from './Icons';

/**
 *  This is the window that allow user to create Todo
 */
class NoteCreator extends Component {

    /**
     * class constructor
     * state:
     * - title: stores the note title
     * - content: stores the note content
     * - error_title and error_content: used to assign a custom style (bulma: is-danger) to the input field so user can see that the inserted value is not accepted 
     */
    constructor(props) {
        super(props)
        this.state = { title: '', content: '', error_title: '', error_content: '' }
    }

    /**
     * called when the user write into title field
     * 
     * @param {<input type="text">} event 
     */
    titleChanged(event) {
        this.setState({ title: event.target.value })
        if (event.target.value !== '')
            this.setState({ error_title: '' })
    }

    /**
     * called when the user write into content field
     * 
     * @param {<textarea>} event 
     */
    contentChanged(event) {
        this.setState({ content: event.target.value })
        if (event.target.value !== '')
            this.setState({ error_content: '' })
    }

    /**
     * if the visibility of this component is true, this window is shown, otherwise, it doesn't render anything
     */
    render() {
        if (this.props.visibility)
            return (
                <div className="columns is-centered">
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
                                                    className={"input " + this.state.error_title}
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
                                                className={"textarea " + this.state.error_content}
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
                                                <div className="column is-1 is-offset-10">

                                                    <button className="button is-dark"
                                                        onClick={
                                                            () => {
                                                                const title = this.state.title.trim()
                                                                const content = this.state.content.trim()
                                                                if ((title !== '') && (content !== '')) {
                                                                    this.props.save({ title: this.state.title, content: this.state.content, completed: false });
                                                                    this.setState({ title: "", content: "" })
                                                                } else {
                                                                    if (title === '') {
                                                                        this.setState({ error_title: 'is-danger' })
                                                                    }
                                                                    if (content === '') {
                                                                        this.setState({ error_content: 'is-danger' })
                                                                    }
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