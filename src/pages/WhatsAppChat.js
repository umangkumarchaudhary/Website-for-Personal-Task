// src/WhatsAppChat.js
import React, { useState } from 'react';
import './WhatsAppChat.css'; // Import the CSS file

const WhatsAppChat = () => {
    const [numbers, setNumbers] = useState('');
    const [message, setMessage] = useState('Hello, I would like to know more about your services.');

    const handleChat = () => {
        const numberArray = numbers.split(',').map(num => num.trim()).filter(num => num);
        
        if (numberArray.length > 0) {
            numberArray.forEach(number => {
                const whatsappURL = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            });
        } else {
            alert('Please enter at least one valid phone number.');
        }
    };

    return (
        <div className="whatsapp-chat-container">
            <h2>Enter Phone Numbers:</h2>
            <textarea
                className="numbers-textarea"
                rows="4"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Enter phone numbers (with country code), separated by commas or new lines"
            />
            <h2>Preloaded Message:</h2>
            <textarea
                className="message-textarea"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <button className="send-button" onClick={handleChat}>
                Send Messages
            </button>
        </div>
    );
};

export default WhatsAppChat;
