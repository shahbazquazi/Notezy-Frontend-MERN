import React,{useState} from 'react';
import AlertContext from './AlertContext';

function AlertState(props) {
    const [alert, setAlert] = useState(null);
    
    const showAlert = (type, message)=>{
        setAlert({
          message: message,
          type: type
        })
        setInterval(() => {
          setAlert(null);
        }, 3000);
     };

    return (
        <AlertContext.Provider value={{alert,showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
