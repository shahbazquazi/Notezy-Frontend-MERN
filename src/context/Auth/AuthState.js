import React,{useContext} from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Alert/AlertContext';
import SpinContext from '../Spin.js/SpinContext';



function AuthState(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const contextAlert = useContext(AlertContext);
    const {showAlert} = contextAlert;

    const contextSpin = useContext(SpinContext);
    const {spinOff} = contextSpin;
    
  
    //To login notezy app
    const getLogin = async (email, password)=>{
        //Api call
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const getLoginJson = await response.json();
        console.log(getLoginJson);
        //Save the token to the localstorage
        if(getLoginJson.success){
            localStorage.setItem("Token", getLoginJson.authToken);
            localStorage.setItem("Email", getLoginJson.email);
            navigate("/");
            spinOff();
            showAlert("success","Success: You have loggedin successfully ");

        }
        else{
            spinOff();
            showAlert("danger","Error: Invalid Credentials");
        }
    };

    //To Signup notezy app
    const getSignup = async (name, email, password)=>{
        //Api call
        const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const getSignupJson = await response.json();
        console.log(getSignupJson);
        if(getSignupJson.success){
            localStorage.setItem("Token", getSignupJson.authToken);
            navigate("/");
            spinOff();
            showAlert("success","Success: You have created a account successfully ");

        }
        else{
            spinOff();
            showAlert("danger","Error: User with this credentials is already exist");
        }
    };

    return (
       <AuthContext.Provider value={{getLogin,getSignup}}>
           {props.children}
       </AuthContext.Provider>
    )
}

export default AuthState
