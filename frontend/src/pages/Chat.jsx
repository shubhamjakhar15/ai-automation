import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";

import ChatInput from "../components/chat/ChatInput";
import ChatBox from "../components/chat/ChatBox";
import Sidebar from "../components/chat/Sidebar";
import KnowledgeUpload from "../components/admin/KnowledgeUpload";
import { cleanTextForSpeech, getBestVoice, splitIntoSentences } from "../utils/speechHelper";
import { Database, X } from "lucide-react";
import "./Chat.css";

export default function Chat() {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [currentlySpeakingIndex, setCurrentlySpeakingIndex] = useState(null);
  const isAdmin = user?.publicMetadata?.role === 'admin';

  // --------------------------------
  // FETCH CHATS
  // --------------------------------

  const fetchChats = useCallback(async () => {
    try {
      const token = await getToken();

      if (!token) return;

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.get(
        `${API_URL}/api/chat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setChats(response.data.chats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error.response?.data || error);
    }
  }, [getToken]);

  useEffect(() => {
    if (isSignedIn) {
      fetchChats();
    }
  }, [isSignedIn, fetchChats]);

  // --------------------------------
  // LOAD EXISTING CHAT
  // --------------------------------

  const loadChat = async (chatId) => {
    try {
      setLoading(true);

      const token = await getToken();

      if (!token) return;

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.get(
        `${API_URL}/api/chat/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessages(response.data.messages);
        setCurrentChatId(chatId);
        setIsSidebarOpen(false);

        setLimitReached(
          response.data.chat.messageCount >= 80
        );
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // START NEW CHAT
  // --------------------------------

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setLimitReached(false);
    setIsSidebarOpen(false);
  };

  // --------------------------------
  // DELETE CHAT
  // --------------------------------

  const handleDeleteClick = (chatId, e) => {
    e.stopPropagation();
    setChatToDelete(chatId);
  };

  const confirmDeleteChat = async () => {
    if (!chatToDelete) return;
    const chatId = chatToDelete;
    
    // Optimistic UI close
    setChatToDelete(null);

    try {
      const token = await getToken();
      if (!token) return;

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.delete(`${API_URL}/api/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        if (currentChatId === chatId) {
          startNewChat();
        }
        fetchChats();
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // Pre-load voices on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  // --------------------------------
  // TEXT TO SPEECH (NATURAL & FLUENT)
  // --------------------------------

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCurrentlySpeakingIndex(null);
  }, []);

  const speakResponse = useCallback((text, messageIndex = null) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Toggle off if clicking the already speaking message
    if (messageIndex !== null && currentlySpeakingIndex === messageIndex) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) return;

    const sentences = splitIntoSentences(cleanText);
    if (sentences.length === 0) return;

    const voice = getBestVoice();
    setCurrentlySpeakingIndex(messageIndex);

    let currentIndex = 0;

    const speakNext = () => {
      if (currentIndex >= sentences.length) {
        setCurrentlySpeakingIndex(null);
        return;
      }

      const sentence = sentences[currentIndex];
      currentIndex++;

      const utterance = new SpeechSynthesisUtterance(sentence);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || "en-IN";
      } else {
        utterance.lang = "en-IN";
      }

      // Natural conversational cadence and pitch
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => {
        speakNext();
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis error:", e);
        setCurrentlySpeakingIndex(null);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }, [currentlySpeakingIndex, stopSpeaking]);

  // --------------------------------
  // SEND MESSAGE
  // --------------------------------

  const sendMessage = async (text) => {
    if (!text.trim() || loading || limitReached) return;

    stopSpeaking();

    // Show user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);

    setLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not available");
      }

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${API_URL}/api/chat`,
        {
          message: text,
          chatId: currentChatId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if chat limit reached
      if (response.data.limitReached) {
        setLimitReached(true);
      }

      const reply =
        response.data.answer ||
        "I could not generate a response.";

      let aiMsgIndex = 0;

      // Add AI response
      setMessages((prev) => {
        aiMsgIndex = prev.length;
        return [
          ...prev,
          {
            sender: "ai",
            text: reply,
          },
        ];
      });

      // Speak AI response with natural voice
      speakResponse(reply, aiMsgIndex);

      // If this was a new chat, save generated chat ID
      if (!currentChatId) {
        setCurrentChatId(response.data.chatId);

        // Refresh sidebar
        fetchChats();
      }
    } catch (error) {
      console.error("Chat error:", error.response?.data || error);

      if (error.response?.data?.limitReached) {
        setLimitReached(true);
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Chat limit reached. Please start a new chat." },
        ]);
      } else {
        const serverMessage = error.response?.data?.error || error.response?.data?.message || "Sorry, I encountered an error connecting to the server.";
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: `🚨 Backend Error: ${serverMessage}` },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* ================================
          SIGNED OUT
      ================================= */}

      <SignedOut>
        <div className="signin-container">
          <SignIn />
        </div>
      </SignedOut>

      {/* ================================
          SIGNED IN
      ================================= */}

      <SignedIn>
        <div className="chat-layout" style={{ display: 'flex', width: '100%', height: '100dvh', position: 'relative', overflow: 'hidden' }}>
          
          <Sidebar
            chats={chats}
            currentChatId={currentChatId}
            onSelectChat={loadChat}
            onNewChat={startNewChat}
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            user={user}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
            onDeleteChat={handleDeleteClick}
          />

          <div className="chat-main-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100dvh', padding: 0 }}>
            {/* Background effects */}
            <div className="background-glow glow-one"></div>
            <div className="background-glow glow-two"></div>
            <div className="background-glow glow-three"></div>
            <div className="noise"></div>

            {/* Main container */}
            <main className="chat-app" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100dvh', padding: '20px', boxSizing: 'border-box' }}>

          {/* ================================
              HEADER
          ================================= */}

          <header className="topbar">

            <div className="brand">

              <div className="brand-orb">
                <div className="mini-spark">
                  ✦
                </div>
              </div>

              <div>
                <h2>Sunrise Public School</h2>
                <span>Front Desk Receptionist</span>
              </div>

            </div>

            <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              
              {/* Admin and Profile moved to Sidebar */}

              <button
                className="settings-btn mobile-only"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span>☰</span>
              </button>

            </div>

          </header>

          {/* ================================
              WELCOME SECTION
          ================================= */}

          {messages.length === 0 && (

            <section className="welcome-section">

              <div className="hero-orb-wrapper">

                <div className="orb-ring ring-one"></div>
                <div className="orb-ring ring-two"></div>
                <div className="orb-ring ring-three"></div>

                <div className="ai-orb">

                  <div className="orb-core">
                    <span>✦</span>
                    <span>✦</span>
                    <span>✧</span>
                  </div>

                </div>

                <div className="orb-shadow"></div>

              </div>

              <h1>
                Welcome to
                <br />
                <span>School Reception</span>
              </h1>

              <p className="subtitle">
                Hello! How can I assist you today?
                <br />
                Ask about school timings, admissions, fees, transport, or facilities.
              </p>

              {/* Quick actions */}

              <div className="quick-actions">

                <button
                  className="action-card"
                  onClick={() =>
                    sendMessage(
                      "What are the regular school and library timings?"
                    )
                  }
                >

                  <div className="action-icon purple">
                    ⏰
                  </div>

                  <div>
                    <strong>
                      School Timings
                    </strong>

                    <span>
                      Daily & Saturday hours
                    </span>
                  </div>

                </button>

                <button
                  className="action-card"
                  onClick={() =>
                    sendMessage(
                      "Tell me about admission requirements and annual fee structure."
                    )
                  }
                >

                  <div className="action-icon pink">
                    📋
                  </div>

                  <div>
                    <strong>
                      Admissions & Fees
                    </strong>

                    <span>
                      Classes 1 to 12 details
                    </span>
                  </div>

                </button>

                <button
                  className="action-card"
                  onClick={() =>
                    sendMessage(
                      "What sports, computer lab, and library facilities are available?"
                    )
                  }
                >

                  <div className="action-icon blue">
                    🏫
                  </div>

                  <div>
                    <strong>
                      School Facilities
                    </strong>

                    <span>
                      Sports, labs & library
                    </span>
                  </div>

                </button>

                <button
                  className="action-card"
                  onClick={() =>
                    sendMessage(
                      "How can parents contact the school office or principal?"
                    )
                  }
                >

                  <div className="action-icon violet">
                    📞
                  </div>

                  <div>
                    <strong>
                      Contact Office
                    </strong>

                    <span>
                      Hours & emergency phone
                    </span>
                  </div>

                </button>

              </div>

            </section>

          )}

          {/* ================================
              CHAT
          ================================= */}

          {messages.length > 0 && (
            <section className="conversation" style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', width: 'min(100%, 760px)', margin: '25px auto 10px' }}>
              <ChatBox
                messages={messages}
                loading={loading}
                onSpeakMessage={speakResponse}
                currentlySpeakingIndex={currentlySpeakingIndex}
              />
            </section>
          )}

          {/* ================================
              VOICE AREA
          ================================= */}

          <section className="input-section" style={{ width: '100%', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            {loading && (
              <div className="thinking" style={{ marginBottom: '10px' }}>
                <span></span><span></span><span></span>
                AI is thinking...
              </div>
            )}
            
            <div style={{ width: '100%' }}>
              <ChatInput 
                onSendMessage={sendMessage}
                disabled={loading || limitReached}
                loading={loading}
              />
            </div>
            
            {limitReached && (
              <p className="voice-hint" style={{ marginTop: '0', marginBottom: '10px', color: '#ff4a4a' }}>
                Chat limit reached. Start a new chat.
              </p>
            )}
          </section>

          {/* ================================
              FOOTER
          ================================= */}

          <footer className="footer">

            <span>
              Powered by RAG & Vector Memory
            </span>

            <div className="status">

              <span className="status-dot"></span>

              AI Online

            </div>

          </footer>

        </main>

        {isAdminModalOpen && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '20px'
          }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
              <button 
                onClick={() => setIsAdminModalOpen(false)}
                style={{
                  position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                  background: 'none', border: 'none', cursor: 'pointer', color: '#64748b'
                }}
              >
                <X size={24} />
              </button>
              <KnowledgeUpload />
            </div>
          </div>
        )}

        {chatToDelete && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '20px'
          }}>
            <div style={{
              background: '#1e1e2d',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '24px',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '18px' }}>Delete chat?</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 24px 0', fontSize: '14px', lineHeight: '1.5' }}>
                This will delete the chat from your history. This action cannot be undone.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  onClick={() => setChatToDelete(null)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteChat}
                  style={{
                    background: '#ef4444',
                    border: 'none',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

          </div>
        </div>
      </SignedIn>

    </div>
  );
}