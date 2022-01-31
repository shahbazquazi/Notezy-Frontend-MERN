import React, { useContext, useState,useEffect } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import { Link } from 'react-router-dom';
import SpinContext from '../context/Spin.js/SpinContext';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("Token")){
           navigate("/");
        }
    }, [])
    const contextAuth = useContext(AuthContext);
    const { getLogin } = contextAuth;

    const contextSpin = useContext(SpinContext);
    const {spinOn} = contextSpin;

    const [credentials, setCredentials] = useState({ email: "", password: "" });


    const handleSubmit = (e) => {
        e.preventDefault();
        getLogin(credentials.email, credentials.password);
        spinOn();
        setCredentials({ email: "", password: "" });

    };
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="container text-center">
                <h2>Login to Notezy</h2>
            </div>
            <div className="container my-3">
                <form onSubmit={handleSubmit} style={{width:"50vw", margin:"auto"}}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-warning" >Log In</button>
                    <div className=" my-3">
                        If you are new please <Link to="/signup">Signup</Link> 
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
