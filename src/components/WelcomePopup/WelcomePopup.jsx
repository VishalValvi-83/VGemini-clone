import React, { useState, useEffect } from "react";
import './style.css'
import { toast, ToastContainer } from "react-toastify";
const WelcomeGreet = () => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    // const [warning, setWarning] = useState('')

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
        setUserIsLoggedIn(isLoggedIn);

        if (!isLoggedIn) {
            setShowPopup(true);
        }
    }, []);


    const handleSignIn = () => {
        if (!usernameInput) {
            // const worning = `please enter your name`;
            // setWarning(worning);
            setUserIsLoggedIn(false);

        }
        else {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("username", usernameInput);
            setUserIsLoggedIn(true);
            setShowPopup(false);
            toast.success('Sign in successful!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        setUsernameInput(localStorage.getItem("username"));
    };

    const handleContinueAsGuest = () => {
        setShowPopup(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("username");
        // window.location.reload();
        setUserIsLoggedIn(false);
    };

    return (
        <div className="app">
            {userIsLoggedIn ? (
                <div className="logged-in-nav">
                    <strong>Welcome back,{localStorage.getItem("username")}!</strong>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <p>Welcome to V's Gemini</p>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Welcome to Our App</h2>
                        <p>Sign in to access all features or continue as a guest.</p>
                        <form>
                            <div className="form-content">
                                <input
                                    type="text"
                                    id="username"
                                    className="username-input"
                                    value={usernameInput}
                                    required
                                    placeholder="Enter your name here"
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                />
                            </div>
                            {/* {warning} */}
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
            <ToastContainer/>
        </div>
    );
};

export default WelcomeGreet;