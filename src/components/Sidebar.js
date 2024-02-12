import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function Sidebar() {
    const {currentUser, logout} = useAuth();
    
    return (
        <div className="sidebar">
            <Link to="/home">Home</Link>
            <Link to="/my-inn">My Inn</Link>
            <Link to="/register">Register</Link>
            { currentUser ? (
                <p onClick={logout}>Logout</p>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </div>
    )
}

export default Sidebar;