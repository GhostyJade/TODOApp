import React, { Component } from 'react';

import '../style/notecreator.css'


class NoteCreator extends Component {

    constructor(props) {
        super(props)
        this.state = { title: '', content: '' }
    }

    titleChanged(event) {
        this.setState({ title: event.target.value })
    }

    contentChanged(event) {
        this.setState({ content: event.target.value })
    }

    render() {
        if (this.props.visibility)
            return (
                <div className="Creator">
                    <div className="Creator-Container" >
                        <div className="Creator-Header" >
                            <p> New note </p>
                        </div>
                        <div className="Creator-Maker" >
                            <input type="text"
                                name="title"
                                id="title"
                                placeholder="Note title"
                                value={this.state.title}
                                onChange={this.titleChanged.bind(this)}
                            />
                            <textarea name="content"
                                id="content"
                                cols="60"
                                rows="10"
                                placeholder="Note content"
                                value={this.state.content}
                                onChange={this.contentChanged.bind(this)}>
                            </textarea>
                        </div>
                        <div className="Creator-Menubar">

                            <button className="btn-container btn-container-28 link-button"
                                onClick={
                                    () => {
                                        if ((this.state.title !== '' || this.state.title !== ' ') && (this.state.content !== '' || this.state.content !== ' ')) {
                                            this.props.save({ title: this.state.title, content: this.state.content, completed:false });
                                            this.setState({ title: "", content: "" })
                                        }
                                    }
                                }>
                                <div className="btn btn-22 btn-save">
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            );
        else
            return (< > </>)
    }
}

export default NoteCreator;