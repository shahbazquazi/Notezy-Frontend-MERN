import React, {useContext, useState} from 'react';
import AuthContext from '../context/Auth/AuthContext';
import SpinContext from '../context/Spin.js/SpinContext';

function Signup() {
    const contextAuth = useContext(AuthContext);
    const {getSignup} = contextAuth;

    const contextSpin = useContext(SpinContext);
    const {spinOn} = contextSpin;

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});

    const handleSubmit = (e)=>{
         e.preventDefault();
         if(credentials.cpassword!==credentials.password){
             alert("Password is not matched");
         }
         else{
             getSignup(credentials.name, credentials.email, credentials.password);
             spinOn();
         }
    };
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <>
        <div className="container text-center"> 
                <h2>Sign up to Notezy</h2>
            </div>
        <div className="container my-4">
            <form onSubmit={handleSubmit} style={{width:"50vw", margin:"auto"}}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} min={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} min={5} required/>
                </div>
                
                <button type="submit" className="btn btn-warning mb-3">Sign up</button>
            </form>
        </div>
        </>
    )
}

export default Signup
