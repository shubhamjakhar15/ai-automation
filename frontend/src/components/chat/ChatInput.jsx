import React, { useState } from "react";
import { Mic, Send, Square } from "lucide-react";

const ChatInput = ({ onSendMessage, disabled, loading }) => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSendMessage(text);
      setText("");
    }
  };

  const toggleListen = (e) => {
    e.preventDefault();
    if (disabled) return;

    if (listening) {
      // Browsers don't reliably let us stop SpeechRecognition cleanly midway without complex state.
      // Easiest is to just let it timeout or set a stop flag if we implemented one.
      return; 
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
      setText("");
    };

    recognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      setText(currentTranscript);
    };

    recognition.onend = () => {
      setListening(false);
      // Wait a tiny bit so state settles, then send if there is text.
      // But actually, we shouldn't auto-send if they are still editing! 
      // Let the user click send manually so they can review the text!
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      setListening(false);
    };

    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <textarea
          style={styles.input}
          placeholder={listening ? "Listening..." : "Message AskAI..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || listening}
          rows={1}
        />
        
        <div style={styles.actions}>
          <button
            type="button"
            onClick={toggleListen}
            disabled={disabled}
            style={{
              ...styles.iconBtn,
              color: listening ? '#ff4a4a' : '#a8b0c0',
              background: listening ? 'rgba(255, 74, 74, 0.1)' : 'transparent',
              animation: listening ? 'pulse 1.5s infinite' : 'none'
            }}
            title="Use microphone"
          >
            {listening ? <Square size={20} /> : <Mic size={20} />}
          </button>
          
          <button
            type="submit"
            disabled={!text.trim() || disabled}
            style={{
              ...styles.sendBtn,
              background: text.trim() && !disabled ? 'linear-gradient(135deg, #a657ff, #f044cf)' : 'rgba(255,255,255,0.1)',
              color: text.trim() && !disabled ? '#fff' : 'rgba(255,255,255,0.3)',
              cursor: text.trim() && !disabled ? 'pointer' : 'not-allowed'
            }}
            title="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 74, 74, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 6px rgba(255, 74, 74, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 74, 74, 0); }
        }
      `}</style>
    </form>
  );
};

const styles = {
  form: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '10px 20px',
    paddingBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    padding: '8px 12px 8px 20px',
    transition: 'border-color 0.3s',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '15px',
    lineHeight: '1.5',
    maxHeight: '150px',
    minHeight: '24px',
    resize: 'none',
    outline: 'none',
    padding: '10px 0',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '4px',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  sendBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    transition: 'all 0.3s',
  }
};

export default ChatInput;
