import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/home">Home</Link>
            <Link to="/my-inn">My Inn</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Sidebar;