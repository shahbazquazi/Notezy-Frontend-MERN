import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import NoteContext from '../context/notes/NoteContext';
import SpinContext from '../context/Spin.js/SpinContext';

function Noteitem(props) {
    const contextNote = useContext(NoteContext);
    const {deleteNote} = contextNote;
    const contextSpin = useContext(SpinContext);
    const {spinOn} = contextSpin;
  
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card bg-warning text-black my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <span className='card-icon' onClick={()=>{deleteNote(note._id); spinOn(); }} >
                       <FontAwesomeIcon icon={faTrashAlt}/>
                       </span>
                       <span className='card-icon' onClick={()=>{updateNote(note)}}>
                       <FontAwesomeIcon icon={faEdit} />
                       </span>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
