// src/TextInput.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const TextInput = () => {
    const [text, setText] = useState('');

    const handleDownload = () => {
        const doc = new jsPDF();
        const margin = 10; // Margin for the PDF
        const pageHeight = doc.internal.pageSize.height; // Height of the page
        const lineHeight = 10; // Line height
        const textLines = doc.splitTextToSize(text, doc.internal.pageSize.width - 2 * margin); // Split text into lines that fit in the PDF width
        let y = margin; // Start position for Y axis

        textLines.forEach((line) => {
            if (y + lineHeight > pageHeight - margin) { // If the current line exceeds the page height
                doc.addPage(); // Add a new page
                y = margin; // Reset Y position
            }
            doc.text(line, margin, y); // Add the line to the PDF
            y += lineHeight; // Move Y position down for the next line
        });

        doc.save('download.pdf'); // Save the PDF
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Write something:</h2>
            <textarea
                rows="10"
                cols="50"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
            <br />
            <button onClick={handleDownload} style={{ padding: '10px 15px' }}>Download as PDF</button>
        </div>
    );
};

export default TextInput;
