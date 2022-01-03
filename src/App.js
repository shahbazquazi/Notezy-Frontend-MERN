import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AuthState from "./context/Auth/AuthState";
import AlertState from "./context/Alert/AlertState";
import Alert from "./components/Alert";
import SpinState from "./context/Spin.js/SpinState";
import Spinner from "./components/Spinner";


function App() {
  
  
  return (
    <div>
      <Router>
      <SpinState>
      <AlertState>
      <NoteState>
      <AuthState>
      
        <Navbar/>
        <Alert/>
        <Spinner/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
    
      </AuthState>
      </NoteState>
      </AlertState>
      </SpinState>
      </Router>
    </div>
  );
}

export default App;
