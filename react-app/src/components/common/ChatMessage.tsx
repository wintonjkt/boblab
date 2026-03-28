import React from 'react';

interface ChatMessageProps {
  type: 'customer' | 'seller';
  sender: string;
  time?: string;
  children: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  sender,
  time,
  children,
}) => {
  return (
    <div className={`chat-message ${type}`}>
      <div className={`message-avatar ${type}-avatar`}>
        {type === 'customer' ? 'C' : 'B'}
      </div>
      <div className="message-content">
        <div className="message-header">
          <span className={`message-${type === 'customer' ? 'sender' : 'seller'}`}>
            {sender}
          </span>
          {time && <span className="message-time">{time}</span>}
        </div>
        <div className="message-body">{children}</div>
      </div>
    </div>
  );
};

export default ChatMessage;

// Made with Bob