import React from 'react';
import { Tile } from '@carbon/react';
import { User, Bot } from '@carbon/icons-react';
import '@/styles/chat-message.scss';

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
    <div className={`chat-message chat-message--${type}`}>
      <div className={`chat-message__avatar chat-message__avatar--${type}`}>
        {type === 'customer' ? <User size={20} /> : <Bot size={20} />}
      </div>
      <Tile className="chat-message__content">
        <div className="chat-message__header">
          <span className="chat-message__sender">
            {sender}
          </span>
          {time && <span className="chat-message__time">{time}</span>}
        </div>
        <div className="chat-message__body">{children}</div>
      </Tile>
    </div>
  );
};

export default ChatMessage;

// Made with Bob