import NoteContext from "./NoteContext";
import { useState, useContext } from "react";
import AlertContext from "../Alert/AlertContext";
import SpinContext from "../Spin.js/SpinContext";

const NoteState = (props) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const noteInitial = [];
    const [notes, setNotes] = useState(noteInitial);
    
    const contextAlert = useContext(AlertContext);
    const {showAlert} = contextAlert;

    const contextSpin = useContext(SpinContext);
    const {spinOff} = contextSpin;
    
    //Get a note 
        const getNote = async () => {
            // api call
            const response = await fetch(`${BASE_URL}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': localStorage.getItem("Token")
                },
            });
            const getJson = await response.json();
            setNotes(getJson);
            if(getJson){
                spinOff();
            }
        };
   

    //Add a note 
    const addNote = async (title, description, tag) => {
        // api call
        const response = await fetch(`${BASE_URL}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': localStorage.getItem('Token')

            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        if(note._id){
            showAlert("success","Note added successfully")
        }
        if(note){
            spinOff();
        }
    };

    //Edit a note 
    const editNote = async (id, title, description, tag) => {
        //Api call
        const response = await fetch(`${BASE_URL}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': localStorage.getItem('Token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const editJson = await response.json();
        console.log(editJson);
        if(editJson._id){
            showAlert("success","Updated successfully");
        }
        if(editJson){
            spinOff();
        }
        //Logic for edit a note in client-side
        for (const note of notes) {
            if (note._id === id) {
                note.title = title;
                note.description = description;
                note.tag = tag;
            };
        };
        //for a deep copy (alternative use lodash librabry to clone)
        const editedNote = JSON.parse(JSON.stringify(notes))
        setNotes(editedNote);
    };

    //Delete a note
    const deleteNote = async (id) => {
        //Api call to delete
        const response = await fetch(`${BASE_URL}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': localStorage.getItem('Token')
            },
        });
        const deleteJson = await response.json();
        console.log(deleteJson);
        if(deleteJson.success){
            showAlert("success","Deleted successfully");
        }
        if(deleteJson){
            spinOff();
        }
        //Logic for delete a note in client-side
        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;