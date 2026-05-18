import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello beautiful. Welcome to your safe space. How can I support your journey today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages([...messages, newUserMsg]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('heal') || lowerInput.includes('heartbreak')) {
      return "Healing takes time, but every step is a victory. I recommend exploring our 'Healing After Heartbreak' journal entries. Remember, your heart is resilient, and God is close to the brokenhearted.";
    } else if (lowerInput.includes('purpose') || lowerInput.includes('direction')) {
      return "Finding your path is a beautiful, unfolding journey. Give yourself grace. Have you tried our Daily Scripture Widget or read our latest piece on Feminine Growth?";
    } else {
      return "I hear you, and I honor what you're sharing. You are entirely loved and deeply valued. Let me suggest a few uplifting articles to help guide your thoughts today.";
    }
  };

  return (
    <>
      <div className="chatbot-trigger" onClick={toggleChat}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </div>

      <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
        <div className="chatbot-header">
          <h4>Grace - Your Digital Companion</h4>
          <X size={20} onClick={toggleChat} style={{ cursor: 'pointer' }} />
        </div>
        
        <div className="chatbot-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        
        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Share your thoughts..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit"><Send size={20} /></button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
