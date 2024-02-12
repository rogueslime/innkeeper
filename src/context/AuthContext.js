import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Stores the Authorization Token in local storage.
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    // Stores the Current User in local storage.
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })

    // A method to update the current user's state if anything changes
    // ex: User creates a character; pass updated user state to this method
    const updateCurrentUser = (updatedUser) => {
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    // Logs a user in and issues their Auth Token and Current User object.
    const login = (token, user) => {
        localStorage.setItem('token',token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthToken(token);
        setCurrentUser(user);
    };

    // Logs out a user, removing their local storage tokens and user.
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthToken(null);
        setCurrentUser(null);
    }

    // Pass in AuthContext methods and objects to be able to use in the working tree
    return (
        <AuthContext.Provider value ={{ authToken, currentUser, login, logout, updateCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}