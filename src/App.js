import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InnView from './components/InnView';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import './components/style/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/my-inn" element={<InnView />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App;