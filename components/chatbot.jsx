"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Hero = () => {
  // State to hold the chat messages
  const [messages, setMessages] = useState([]);
  
  // State to manage the current input from the user
  const [input, setInput] = useState('');

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/cohere-chat', { message: input });
      const aiMessage = { role: 'ai', content: response.data.content };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-white text-black shadow-lg rounded-lg w-80 h-96 flex flex-col"
    >
      {/* Header for the chat tool */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
        <h1 className="text-lg font-semibold">MyBank Support</h1>
      </div>

      {/* Container to display chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong className="block">
              {msg.role === 'user' ? 'You' : 'MyBank Support'}:
            </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      {/* Input and send button container */}
      <div className="flex items-center gap-2 border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Message..."
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Hero;
