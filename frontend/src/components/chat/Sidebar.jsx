import React from 'react';
import { UserButton } from "@clerk/clerk-react";
import { Database, Trash2 } from "lucide-react";
import './Sidebar.css';

const Sidebar = ({ chats, currentChatId, onSelectChat, onNewChat, isOpen, toggleSidebar, user, onOpenAdmin, onDeleteChat }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={onNewChat}>
          <span>+</span> New Chat
        </button>
        <button className="close-sidebar-btn mobile-only" onClick={toggleSidebar}>×</button>
      </div>
      <div className="chat-list">
        {chats.map(chat => (
          <div 
            key={chat.chatId} 
            className={`chat-item ${currentChatId === chat.chatId ? 'active' : ''}`}
            onClick={() => onSelectChat(chat.chatId)}
          >
            <div className="chat-item-title">{chat.title}</div>
            <button 
              className="delete-chat-btn" 
              onClick={(e) => onDeleteChat(chat.chatId, e)}
              title="Delete chat"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {chats.length === 0 && <div className="no-chats">No previous chats</div>}
      </div>
      
      <div className="sidebar-footer">
        {user?.publicMetadata?.role === 'admin' && (
          <button 
            onClick={onOpenAdmin}
            className="sidebar-admin-btn"
          >
            <Database size={16} /> Admin Dashboard
          </button>
        )}
        <div className="sidebar-profile">
          <UserButton showName={true} appearance={{
            elements: { userButtonBox: { flexDirection: 'row-reverse' } }
          }} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
