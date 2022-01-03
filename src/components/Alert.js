import React, {useContext} from 'react';
import AlertContext from '../context/Alert/AlertContext';

function Alert() {
   const context = useContext(AlertContext);
   const {alert} = context;

    return (  
        <div style={{height:"3vh"}}>
            {alert && <div className={`alert alert-${alert.type}`} role="alert">
               {alert.message}
            </div>}
        </div>
    )
}

export default Alert
