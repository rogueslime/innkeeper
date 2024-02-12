import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useAuth} from './context/AuthContext';

import InnView from './components/InnView';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Register from './components/Registration';
import Login from './components/Login';

import './components/style/App.css';
import logo from './images/Innkeeper-logo.png';

function App() {
    const { currentUser } = useAuth();

    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="header">
                    <div className ="header-text">
                        { currentUser ? (
                        <p>Hello, {currentUser.username}</p>
                        ) : (
                        <p><Link to="/login">Sign in.</Link></p>
                        )}
                    </div>
                    <div className ="header-logo">
                        <img src={logo} alt="Logo"/>
                    </div>
                </div>
                <div className="main-content">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/my-inn" element={<InnView />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
        )
}

export default App;