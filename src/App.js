// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TextInput from './pages/TextInput';
import WhatsAppChat from './pages/WhatsAppChat';
import ChartCreator from './pages/ChartCreator'; // Import the new ChartCreator component
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <h1>Text to PDF Converter</h1>
                <nav className="navbar">
                    <ul className="nav-list">
                        <li><Link to="/">Text to PDF</Link></li>
                        <li><Link to="/whatsapp">WhatsApp Chat</Link></li>
                        <li><Link to="/chart">Create Chart</Link></li> {/* New link for Chart Creator */}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<TextInput />} />
                    <Route path="/whatsapp" element={<WhatsAppChat />} />
                    <Route path="/chart" element={<ChartCreator />} /> {/* New route for Chart Creator */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
