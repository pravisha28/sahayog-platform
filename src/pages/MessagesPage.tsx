import { useState } from 'react';
import { conversations as initialConversations } from '@/data/mockData';
import type { Conversation, Message } from '@/types';
import { ArrowLeft, Send, Image as ImageIcon, Shield, Star, Info } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function MessagesPage() {
  const { navigate } = useApp();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(initialConversations[0]?.id ?? null);
  const [input, setInput] = useState('');

  const active = conversations.find(c => c.id === activeId);

  const handleSend = () => {
    if (!input.trim() || !active) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      senderId: 'u1',
      text: input,
      timestamp: 'Just now',
    };
    setConversations(prev =>
      prev.map(c => c.id === active.id ? { ...c, messages: [...c.messages, newMsg] } : c)
    );
    setInput('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <button onClick={() => navigate('home')} className="btn-ghost mb-4 -ml-2">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-extrabold text-surface-800 mb-4">Messages</h1>

      <div className="card overflow-hidden flex h-[500px]">
        {/* Conversation list */}
        <div className={`w-full lg:w-72 border-r border-surface-200 overflow-y-auto ${activeId ? 'hidden lg:block' : ''}`}>
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={`w-full p-4 flex items-center gap-3 border-b border-surface-100 transition-colors text-left ${
                activeId === conv.id ? 'bg-primary-50' : 'hover:bg-surface-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {conv.participant.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-surface-800 text-sm truncate">{conv.participant.name}</p>
                <p className="text-xs text-surface-500 truncate">{conv.messages[conv.messages.length - 1]?.text}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        {active ? (
          <div className="flex-1 flex flex-col">
            {/* Task info header */}
            <div className="p-3 border-b border-surface-200 bg-surface-50">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-surface-400 shrink-0" />
                <p className="text-sm font-medium text-surface-700 truncate">{active.taskTitle}</p>
              </div>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {active.messages.map(msg => {
                const isMe = msg.senderId === 'u1';
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      isMe ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-surface-100 text-surface-700 rounded-bl-sm'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${isMe ? 'text-white/70' : 'text-surface-400'}`}>{msg.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-surface-200">
              <button className="p-2 text-surface-400 hover:text-surface-600">
                <ImageIcon className="w-5 h-5" />
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                placeholder="Type a message..."
                className="flex-1 text-sm px-3 py-2 rounded-lg bg-surface-100 border-0 outline-none focus:ring-2 focus:ring-primary-200"
              />
              <button onClick={handleSend} className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 active:scale-95 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-surface-400 text-sm">
            Select a conversation to start chatting
          </div>
        )}
      </div>

      {/* Trust & safety note */}
      <div className="mt-4 flex items-center gap-2 text-xs text-surface-400">
        <Shield className="w-4 h-4 text-primary-500" />
        Always exercise caution. Meet in public places. <Star className="w-3 h-3 text-accent-400" /> Check ratings before interacting.
      </div>
    </div>
  );
}
