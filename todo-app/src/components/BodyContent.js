import React, { Component } from 'react';

import NoteVisualizer from './NoteVisualizer'
import NoteCreator from './NoteCreator'

import { Icon } from './Icons'

/**Some constants used from the database*/
const DB_NAME = "GhostyJade-TodoApp"
const DB_VERSION = 3
const DB_STORENAME = "notes"

class BodyContent extends Component {

    constructor(props) {
        super(props)
        this.state = { noteList: [], creatorVisibility: false, id: -1 }
        this.initDB()
    }

    updateExistingElement = (element, value) => { //change to the entire object
        var request = window.indexedDB.open(DB_NAME)
        request.onsuccess = (event) => {
            var objectStore = event.target.result.transaction([DB_STORENAME], "readwrite").objectStore(DB_STORENAME)
            var item = objectStore.get(element.title)
            item.onerror = (event) => {
                console.error(event)
            }
            item.onsuccess = (event) => {
                var data = event.target.result
                data.completed = value
                var requestUpdate = objectStore.put(data)
                requestUpdate.onsuccess = (event) => {
                    console.log("Successfully updated")
                }
                requestUpdate.onerror = (event) => console.error("Failed to update the entry: " + event.errorCode)
            }
        }
        request.onerror = (event) => {
            console.error(event)
        }
    }

    /**
     * Delete the specified note from the indexedDB using the specified note name
     */
    deleteNoteFromDatabase = (noteName) => {
        var db = window.indexedDB.open(DB_NAME)
        db.onsuccess = (event) => {
            var request = event.target.result.transaction([DB_STORENAME], "readwrite").objectStore(DB_STORENAME).delete(noteName)
            request.onsuccess = (event) => {
                this.setState({ noteList: this.state.noteList.filter(e => e.title !== noteName) })
            }
        }
        db.onerror = (event) => {
            console.error(event)
        }
    }

    /**
     * Called after this component is mounted. It's used to load notes into UI
     */
    componentDidMount() {
        this.getAllData().then(savedNotes => {
            setTimeout(() => {
                var lastId = -1
                savedNotes.forEach(e => { if (e.id > lastId) lastId = e.id })
                this.setState({ noteList: savedNotes, id: lastId + 1 })
            }, 150)
        })
    }

    /**
     * Save the specified note into indexedDB and add note into UI
     */
    saveNote = (todo) => {
        todo.id = this.state.id
        this.setState(oldState => ({
            noteList: [...oldState.noteList, { title: todo.title, content: todo.content, completed: todo.completed, id: todo.id }],
            id: this.state.id + 1
        }))
        var request = window.indexedDB.open(DB_NAME)
        request.onsuccess = (e) => {
            var transaction = e.target.result.transaction([DB_STORENAME], "readwrite")
            transaction.oncomplete = (e) => {
                console.log("Note saved successfully")
            }
            transaction.onerror = (e) => {
                console.error("Error on writing to database: " + e.target.errorCode)
            }
            var objectStore = transaction.objectStore(DB_STORENAME)
            var save = objectStore.add(todo)
            save.onsuccess = (e) => { }
            save.onerror = (e) => { console.error(e) }
        }
    }
    /**
     * show/hide note creator frame
     */
    changeCreatorVisibility() {
        this.setState({ creatorVisibility: !this.state.creatorVisibility });
    }

    render() {
        return (
            <main>
                <nav className="navbar">
                    <div className="navbar-end">
                        <button className="navbar-item button" onClick={this.changeCreatorVisibility.bind(this)}>
                            <Icon icon="ellipsis-v" />
                        </button>
                    </div>
                </nav>
                <NoteVisualizer notes={this.state.noteList} delete={this.deleteNoteFromDatabase.bind(this)} update={this.updateExistingElement.bind(this)} />
                <NoteCreator visibility={this.state.creatorVisibility} save={this.saveNote.bind(this)} />
            </main>
        );
    }

    /**
     * create the DB for this app if doesn't already exists
     */
    initDB = () => {
        if (!window.indexedDB) {
            console.log("Indexed DB not supported by this browser");
            return;
        }
        console.log("Opening DB")
        var request = window.indexedDB.open(DB_NAME, DB_VERSION)
        request.onerror = function (event) {
            console.error("Couldn't allocate IndexedDB instance")
        }
        request.onsuccess = (event) => {
            console.log("Successfully allocated IndexedDB instance")
        }
        request.onupgradeneeded = (event) => {
            var db = event.target.result
            var objectStore = db.createObjectStore(DB_STORENAME, { keyPath: "title" })
            objectStore.createIndex("title", "title", { unique: false })
            objectStore.createIndex("content", "content", { unique: false })
            objectStore.createIndex("completed", "completed", { unique: false })
            objectStore.createIndex("id", "id", { unique: false })
        }
    }

    /**
     * load notes from DB
     */
    getAllData = async () => {
        var notes = []
        var request = window.indexedDB.open(DB_NAME)
        request.onsuccess = (event) => {
            var objectStore = event.target.result.transaction(DB_STORENAME).objectStore(DB_STORENAME)
            objectStore.openCursor().onsuccess = (event) => {
                var cursor = event.target.result
                if (cursor) {
                    notes.push(cursor.value)
                    cursor.continue()
                } else {
                    console.log("Loaded all notes ")
                }
            }
        }
        return notes
    }
}

export default BodyContent;