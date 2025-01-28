import React, { useState, useEffect } from "react";
import './style.css'
const WelcomeGreet = () => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");

    useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
        setUserIsLoggedIn(isLoggedIn);

        // Show the popup if the user is not logged in
        if (!isLoggedIn) {
            setShowPopup(true);
        }
    }, []);


    const handleSignIn = () => {
        // Simulate login
        if (!usernameInput) {
            alert("Please enter a username");
        }
        else {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("username", usernameInput);
            setUserIsLoggedIn(true);
            setShowPopup(false);
            window.location.reload();
        }
        // Store the username in local storage
        setUsernameInput(localStorage.getItem("username")); // Update the state with the username
    };

    const handleContinueAsGuest = () => {
        // Hide the popup without logging in
        setShowPopup(false);
    };

    const handleLogout = () => {
        // Simulate logout
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("username");
        window.location.reload();
        setUserIsLoggedIn(false);
        setShowPopup(true);
    };

    return (
        <div className="app">
            {userIsLoggedIn ? (
                <div className="logged-in-nav">
                    <h2>Welcome back,{localStorage.getItem("username")}!</h2>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <h1>Welcome to V's Gemini</h1>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Welcome to Our App</h2>
                        <p>Sign in to access all features or continue as a guest.</p>
                        <form>
                            Name:
                            <input
                                type="text"
                                id="username"
                                className="username-input"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                            />
                            <br />
                            <button onClick={handleSignIn} className="sign-in-button">
                                Sign In
                            </button>
                            <button onClick={handleContinueAsGuest} className="guest-button">
                                Continue as Guest
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WelcomeGreet;