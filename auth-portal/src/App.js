import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2';

function HomePage({ username, uid }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/auth/delete/${uid}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire(
            'Deleted!',
            data.message,
            'success'
          );
          navigate("/");
        } else {
          Swal.fire(
            'Error',
            data.message || 'Failed to delete account. Please try again.',
            'error'
          );
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          'Error',
          'An error occurred. Please try again later.',
          'error'
        );
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Home</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Username: {username}</p>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
        <button className="delete-account-button" onClick={handleDeleteAccount}>
          Delete <br></br> Account
        </button>
      </header>
    </div>
  );
}

export default function App() {
  const [type, setType] = useState("signIn");
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  const handleSignIn = (username, uid) => {
    setUsername(username);
    setUid(uid);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <h2>Sign in/up Form</h2>
            <div className={containerClass} id="container">
              <SignUpForm />
              <SignInForm onSignIn={handleSignIn} />
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal info
                    </p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button
                      className="ghost "
                      id="signUp"
                      onClick={() => handleOnClick("signUp")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                </div>
            </div>
          </div>
        } />
        <Route path="/home" element={username ? <HomePage username={username} uid={uid} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}