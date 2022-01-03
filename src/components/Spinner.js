import React from 'react';

function Spinner() {
    return (
            <div className='d-flex justify-content-center'>
                <div className="spinner-border text-warning spin" style={{width:"2rem",height:"2rem",margin:"0.5rem",visibility:"hidden"}} role="status" >
                    <span className="sr-only"></span>
                </div>
                <div className="spinner-grow text-warning spin" style={{width:"1em",height:"1rem",marginTop:"1rem",visibility:"hidden"}} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        
    )
}

export default Spinner
