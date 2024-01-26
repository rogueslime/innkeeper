import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InnView from './components/InnView';
import Sidebar from './components/Sidebar';
import './components/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/my-inn" element={<InnView />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App;