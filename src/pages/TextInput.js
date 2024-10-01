// src/TextInput.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './TextInput.css'; // Import the CSS file

const TextInput = () => {
    const [text, setText] = useState('');

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.text(text, 10, 10);
        doc.save('download.pdf');
    };

    return (
        <div className="text-input-container">
            <h2>Write Something:</h2>
            <textarea
                className="text-area"
                rows="10"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
            />
            <br />
            <button className="download-button" onClick={handleDownload}>
                Download as PDF
            </button>
        </div>
    );
};

export default TextInput;
