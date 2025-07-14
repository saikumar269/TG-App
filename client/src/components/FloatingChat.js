import React, { useState } from 'react';
import './FloatingChat.css';
import ChatAssistant from './ChatAssistant';

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="chat-fab" onClick={() => setOpen(!open)}>
        💬
      </div>
      {open && (
        <div className="chat-popup">
          <ChatAssistant />
        </div>
      )}
    </>
  );
};

export default FloatingChat;
