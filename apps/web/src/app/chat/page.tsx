"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PaperAirplaneIcon, FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";

const dummyMessages = [
  { id: 1, sender: "other", text: "Hey! How's the startup coming along?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Going great! Just finished building the real-time chat module using WebSockets. 🚀", time: "10:32 AM" },
  { id: 3, sender: "other", text: "That's awesome! Did you use Spring Boot for the backend?", time: "10:33 AM" },
  { id: 4, sender: "me", text: "Yeah, Spring Boot 3 + Redis Pub/Sub for scaling across multiple instances.", time: "10:35 AM" },
];

export default function Chat() {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col md:flex-row">
      {/* Sidebar - Chat List */}
      <div className="w-full md:w-80 border-r border-white/10 bg-neutral-950/50 flex flex-col h-screen overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white tracking-tight">Messages</h2>
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full mt-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {/* Active Chat Item */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 cursor-pointer transition-colors">
            <img src="https://i.pravatar.cc/150?u=a" alt="User" className="w-12 h-12 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-white font-semibold truncate">Aarohi Singh</h3>
                <span className="text-xs text-neutral-400">10:35 AM</span>
              </div>
              <p className="text-sm text-neutral-400 truncate">Yeah, Spring Boot 3 + Redis...</p>
            </div>
          </div>
          {/* Inactive Chat Items */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
              <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" className="w-12 h-12 rounded-full opacity-70" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-neutral-300 font-semibold truncate">User {i+1}</h3>
                  <span className="text-xs text-neutral-500">Yesterday</span>
                </div>
                <p className="text-sm text-neutral-500 truncate">Sounds like a plan!</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen bg-[#0a0a0a] relative">
        {/* Chat Header */}
        <div className="h-20 border-b border-white/10 flex items-center px-6 bg-white/5 backdrop-blur-md absolute top-0 w-full z-10">
          <div className="flex items-center gap-4">
            <img src="https://i.pravatar.cc/150?u=a" alt="Aarohi" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-white font-bold">Aarohi Singh</h2>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages Wrapper */}
        <div className="flex-1 overflow-y-auto p-6 pt-28 pb-24 space-y-6">
          {messages.map((msg) => {
            const isMe = msg.sender === "me";
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div className={`px-5 py-3 rounded-2xl max-w-[70%] ${
                  isMe 
                    ? "bg-gradient-to-tr from-purple-600 to-blue-500 text-white rounded-br-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
                    : "bg-white/10 text-neutral-100 rounded-bl-sm border border-white/5"
                }`}>
                  <p>{msg.text}</p>
                </div>
                <span className="text-xs text-neutral-500 mt-2 mx-1">{msg.time}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-full p-2 flex items-center gap-2 pr-4 shadow-2xl">
            <button className="p-2 text-neutral-400 hover:text-white transition-colors">
              <FaceSmileIcon className="w-6 h-6" />
            </button>
            <button className="p-2 text-neutral-400 hover:text-white transition-colors">
              <PhotoIcon className="w-6 h-6" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder-neutral-500"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white hover:bg-purple-400 transition-colors shadow-lg hover:shadow-purple-500/50"
            >
              <PaperAirplaneIcon className="w-5 h-5 -ml-1" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
