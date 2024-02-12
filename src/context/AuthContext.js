import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })

    const updateCurrentUser = (updatedUser) => {
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    const login = (token, user) => {
        localStorage.setItem('token',token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthToken(token);
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthToken(null);
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider value ={{ authToken, currentUser, login, logout, updateCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}