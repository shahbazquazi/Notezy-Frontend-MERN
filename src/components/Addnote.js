import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import SpinContext from '../context/Spin.js/SpinContext';


function Addnote() {
    const contextNote = useContext(NoteContext);
    const {addNote} = contextNote;
    const contextSpin = useContext(SpinContext);
    const {spinOn} = contextSpin;
    
    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleClickAdd = (e)=>{
        e.preventDefault();
       addNote(note.title, note.description, note.tag);
       spinOn();
       setNote({title: "", description: "", tag: ""});
    };

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    };
    return (
        <>
            <div className="container my-3"> 
                <h3>Add a note</h3>
            </div>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description
                        </label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag
                        </label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                   
                    <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-warning" onClick={handleClickAdd}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default Addnote
