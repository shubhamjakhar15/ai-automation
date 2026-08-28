import React, { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const ChatBox = ({ messages, loading, onSpeakMessage, currentlySpeakingIndex }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [messages, loading]);

  return (
    <div className="messages">
      {messages.map((message, index) => {
        const isSpeaking = currentlySpeakingIndex === index;

        return (
          <div
            key={index}
            className={`message-row ${message.sender}`}
          >
            {message.sender === "ai" && (
              <div className="message-avatar">
                ✦
              </div>
            )}

            <div className="message-content">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span className="message-label">
                  {message.sender === "user" ? "You" : "AskAI"}
                </span>

                {message.sender === "ai" && onSpeakMessage && (
                  <button
                    onClick={() => onSpeakMessage(message.text, index)}
                    title={isSpeaking ? "Stop voice" : "Read aloud"}
                    style={{
                      background: isSpeaking ? 'rgba(166, 87, 255, 0.2)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: isSpeaking ? '#c084fc' : 'rgba(255, 255, 255, 0.4)',
                      borderRadius: '6px',
                      padding: '4px 6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX size={14} />
                        <span className="audio-wave">
                          <span></span><span></span><span></span>
                        </span>
                      </>
                    ) : (
                      <Volume2 size={14} />
                    )}
                  </button>
                )}
              </div>

              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="message-row ai">
          <div className="message-avatar">
            ✦
          </div>

          <div className="message-content">
            <span className="message-label">
              AskAI
            </span>

            <div className="message-bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div ref={chatEndRef}></div>

      <style>{`
        .audio-wave {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          height: 12px;
        }
        .audio-wave span {
          width: 2px;
          height: 100%;
          background: #c084fc;
          border-radius: 2px;
          animation: wave 1s ease-in-out infinite alternate;
        }
        .audio-wave span:nth-child(1) { animation-delay: 0.1s; height: 60%; }
        .audio-wave span:nth-child(2) { animation-delay: 0.3s; height: 100%; }
        .audio-wave span:nth-child(3) { animation-delay: 0.2s; height: 40%; }

        @keyframes wave {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ChatBox;