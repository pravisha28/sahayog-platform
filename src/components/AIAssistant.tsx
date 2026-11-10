import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { generateAIResponse } from '@/utils/ai';
import { resources, helpRequests, civicIssues } from '@/data/mockData';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'Hi! I\'m Ask Sahayog, your community assistant. I can help you find resources, volunteer opportunities, or report issues. How can I help you today?' },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const suggestions = [
    'Find volunteer opportunities near me',
    'How can I report a pothole?',
    'Find a blood donation center',
    'Educational resources nearby',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const response = generateAIResponse(text, {
      resources: resources.map(r => ({ name: r.name, category: r.category, distance: r.distance, address: r.address })),
      requests: helpRequests.filter(r => r.status === 'Posted').map(r => ({ title: r.title, distance: r.distance, category: r.category })),
      issues: civicIssues.map(i => ({ title: i.title, distance: i.distance, status: i.status })),
    });

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 500);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-3 rounded-full shadow-lg shadow-primary-200 hover:shadow-xl hover:scale-105 transition-all animate-pulse-soft"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-sm hidden sm:block">Ask Sahayog</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-surface-200 animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <Bot className="w-5 h-5" />
              <div>
                <p className="font-bold text-sm">Ask Sahayog</p>
                <p className="text-[10px] text-white/80">AI Community Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-sm'
                      : 'bg-surface-100 text-surface-700 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-surface-200">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(input); }}
              placeholder="Ask anything..."
              className="flex-1 text-sm px-3 py-2 rounded-lg bg-surface-100 border-0 outline-none focus:ring-2 focus:ring-primary-200"
            />
            <button
              onClick={() => handleSend(input)}
              className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
