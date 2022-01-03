import React from 'react';
import SpinContext from './SpinContext';

function SpinState(props) {
    const spinOn = ()=>{
        let classes = document.getElementsByClassName("spin");
        if (classes) {
            for (var x = 0; x < classes.length; x++) {
              classes[x].style.visibility = "visible";
            }
          }
        
    };
    const spinOff = ()=>{
        let classes = document.getElementsByClassName("spin");
        if (classes) {
            for (var x = 0; x < classes.length; x++) {
              classes[x].style.visibility = "hidden";
            }
          }
    };
    return (
        <SpinContext.Provider value={{spinOn,spinOff}}>
             {props.children}
        </SpinContext.Provider>
    )
}

export default SpinState
