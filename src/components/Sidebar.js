import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function Sidebar({isOpen}) {
    const {currentUser} = useAuth();
    
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="content">
                <Link className='toplink' to="/">Home</Link>
                <Link to="/public-inn">Public Inn</Link>
                {currentUser ? (<></>) : ( <Link to="/register">Register</Link> )}
                {currentUser ? (<Link to="/my-profile">My Profile</Link>) : (<></>)}
            </div>
        </div>
    )
}

export default Sidebar;