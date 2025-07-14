import React, { useState } from 'react';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I can help summarize or answer questions about your document." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Push user message
    const newMessages = [...messages, { sender: "user", text: input }];

    // Push mocked AI reply
    newMessages.push({
      sender: "ai",
      text: "This is a sample AI-generated response to your question: " + input
    });

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>AI Chat Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask a question about the document..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatAssistant;
