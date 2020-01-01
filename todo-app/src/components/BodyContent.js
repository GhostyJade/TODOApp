import React, { Component } from 'react';

import '../style/bodycontent.css'
import '../style/icons.css'

import NoteVisualizer from './NoteVisualizer'
import NoteCreator from './NoteCreator'

import menu_icon from '../icons/icn-menu.svg'

const DB_NAME = "GhostyJade-TodoApp"
const DB_VERSION = 1
const DB_STORENAME = "notes"

class BodyContent extends Component {

    constructor(props) {
        super(props)
        this.state = { noteList: [], creatorVisibility: false }
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

    componentDidMount() {
        this.getAllData().then(savedNotes => {
            setTimeout(() => {
                this.setState({ noteList: savedNotes })
            }, 50)
        })
    }

    saveNote = (event) => {
        this.setState(oldState => ({
            noteList: [...oldState.noteList, { title: event.title, content: event.content, completed: event.completed }]
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
            var save = objectStore.add(event)
            save.onsuccess = (e) => { }
        }
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
                <NoteVisualizer notes={this.state.noteList} delete={this.deleteNoteFromDatabase.bind(this)} update={this.updateExistingElement.bind(this)} />
                <NoteCreator visibility={this.state.creatorVisibility} save={this.saveNote.bind(this)} />
            </main>
        );
    }

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
        }
    }

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