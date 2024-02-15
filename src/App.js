import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useAuth} from './context/AuthContext';

import InnView from './components/InnView';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Register from './components/Registration';
import Login from './components/Login';
import MyProfile from './components/MyProfile';

import './components/style/App.css';
import logo from './images/Innkeeper-logo.png';

function App() {
    const { currentUser, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Router>
            <div className="app-container">
                {/*Pass isSidebarOpen to Sidebar to determine if it should be open*/}
                <Sidebar isOpen={isSidebarOpen} />
                
                {/*Header*/}
                <div className="header">
                    <div className ="header-button">
                        {/*Sidebar button to pull in/out of drawer*/}
                        <button onClick={() => setIsSidebarOpen(isSidebarOpen => !isSidebarOpen)}>
                            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                        </button>
                    </div>
                    <div className ="header-text">
                        { currentUser ? (
                        <>
                        <p>Hello, {currentUser.username}.</p>
                        <Link onClick = {logout} class='header-sign' to="/">Sign Out.</Link>
                        </>
                        ) : (
                        <Link class='header-sign' to="/login">Sign In</Link>
                        )}
                    </div>
                    <div className ="header-logo">
                        <img src={logo} alt="Logo"/>
                    </div>
                </div>

                
                {/*Main content*/}
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/public-inn" element={<InnView />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                    </Routes>
                </div>
            </div>
        </Router>
        )
}

export default App;