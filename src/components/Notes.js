import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
import SpinContext from '../context/Spin.js/SpinContext';

function Notes() {
    const navigate = useNavigate();
    const contextNote = useContext(NoteContext);
    const { notes, getNote, editNote } = contextNote;
    const contextSpin = useContext(SpinContext);
    const {spinOn} = contextSpin;

    useEffect(() => {
        if(localStorage.getItem("Token")){
            getNote();
            spinOn();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag});
    };

    const handleClickUpdate = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        spinOn();
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    };
    return (
        <>
            <div className='container text-center mb-4'><h2>Welcome to Notezy - It is secure and easy to use </h2></div>
            <Addnote/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle"  value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description
                                    </label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag
                                    </label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}  />
                                </div>
                                </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5 } type="button" className="btn btn-primary"  onClick={handleClickUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row my-4">
                    <h3 style={{marginTop:"1rem"}}>Your notes</h3>
                    <div className="container text-primary">
                    {notes.length===0 && `Create your first note to display here`}
                    </div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
