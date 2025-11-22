import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles, Bot, Cpu, Terminal } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";

export const DesignChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'System initialized. I am Ishteaque\'s AI Digital Twin. How can I assist you with our architectural & AI solutions?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', isThinking: true }]);

    try {
      const stream = await sendMessageToGemini(userMsg.text);
      let fullText = '';
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
           fullText += c.text;
           setMessages(prev => 
             prev.map(msg => 
               msg.id === modelMsgId 
                 ? { ...msg, text: fullText, isThinking: false } 
                 : msg
             )
           );
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId 
          ? { ...msg, text: "Connection interrupted. Please attempt reconnection later.", isThinking: false } 
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[60] p-4 transition-all duration-300 backdrop-blur-md border flex items-center justify-center shadow-2xl ${
          isOpen 
            ? 'bg-neutral-950 text-white border-neutral-800 rotate-90 active:scale-90' 
            : 'bg-white/10 dark:bg-neutral-900/80 text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-700 hover:scale-105 active:scale-90'
        }`}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={20} /> : <Terminal size={20} />}
      </button>

      <div
        className={`fixed bottom-24 right-4 md:right-8 z-[50] w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col transition-all duration-500 transform origin-bottom-right overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-white dark:bg-neutral-950 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900">
          <div>
            <h3 className="font-mono text-xs font-bold tracking-wider text-neutral-900 dark:text-white flex items-center gap-2 uppercase">
              <span className="w-2 h-2 bg-green-500 animate-pulse"/>
              Ishteaque.AI // System Online
            </h3>
          </div>
          <Cpu size={16} className="text-neutral-400"/>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 border ${
                  msg.role === 'user'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent'
                    : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800'
                }`}
              >
                {msg.text}
                {msg.isThinking && (
                   <span className="inline-flex gap-1 ml-2">
                     <span className="w-1 h-1 bg-current animate-bounce" style={{animationDelay: '0ms'}}/>
                     <span className="w-1 h-1 bg-current animate-bounce" style={{animationDelay: '150ms'}}/>
                     <span className="w-1 h-1 bg-current animate-bounce" style={{animationDelay: '300ms'}}/>
                   </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-neutral-400 dark:text-neutral-600 font-mono text-lg">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter command..."
              className="w-full bg-transparent border-none px-4 pl-8 py-3 text-sm focus:outline-none text-neutral-900 dark:text-white font-mono placeholder-neutral-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 active:scale-90 disabled:opacity-30 transition-all duration-200"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};