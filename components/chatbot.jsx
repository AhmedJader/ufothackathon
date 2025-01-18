"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/cohere-chat', { message: input });
      const aiMessage = { role: 'ai', content: response.data.content };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', padding: '20px', height: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>Chat AI Tool</h1>
        <div style={{ backgroundColor: '#1e1e1e', padding: '10px', borderRadius: '5px', height: '70vh', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ margin: '10px 0' }}>
              <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: '10px', color: 'black' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #333' }}
          />
          <button onClick={handleSendMessage} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;