import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("Email");
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img style={{ width: "40px", height: "40px", margin: "5px" }} src="/notezy-logo.png" alt="Notezy" />Notezy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: "10px" }}>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <span style={{ color: "white"}}>
                    {localStorage.getItem("Email")}
                    </span>
                {!localStorage.getItem("Token") ? <div className="d-flex mx-3">
                    <Link className="btn btn-warning mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-warning mx-2" to="/signup" role="button">Signup</Link>
                </div> : <Link className="btn btn-warning mx-4" to="/login" onClick={handleLogout} role="button">Logout</Link>}
            </nav>
        </>
    )
}

export default Navbar
