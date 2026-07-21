"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, HeartIcon, PaperAirplaneIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const dummyStories = [
  {
    id: 1,
    user: "Arjun Mehta",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    media: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    caption: "Late night coding session at the hub! 🚀",
    time: "2h ago",
    isCloseFriends: false,
  },
  {
    id: 2,
    user: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=priya",
    media: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    caption: "Goa sunsets hit different ✨",
    time: "5h ago",
    isCloseFriends: true,
  },
  {
    id: 3,
    user: "Rohan Kapoor",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    media: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    caption: "Coffee + TypeScript = Perfection ☕",
    time: "8h ago",
    isCloseFriends: false,
  }
];

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentStory = dummyStories[currentIndex];

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < dummyStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-30 scale-110"
        style={{ backgroundImage: `url(${currentStory.media})` }}
      />

      <div className="relative w-full max-w-sm h-[750px] bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col justify-between z-10">
        {/* Story Progress Bar */}
        <div className="absolute top-4 left-4 right-4 z-30 flex gap-1.5">
          {dummyStories.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all ease-linear"
                style={{ 
                  width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%' 
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-8 left-4 right-4 z-30 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <img src={currentStory.avatar} alt={currentStory.user} className="w-10 h-10 rounded-full border-2 border-purple-500" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm">{currentStory.user}</h4>
                {currentStory.isCloseFriends && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                    Close Friends
                  </span>
                )}
              </div>
              <span className="text-neutral-400 text-xs">{currentStory.time}</span>
            </div>
          </div>
          <Link href="/feed" className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors">
            <XMarkIcon className="w-6 h-6 text-white" />
          </Link>
        </div>

        {/* Story Media Display */}
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentStory.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            src={currentStory.media}
            alt="Story"
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Navigation Touch Controls */}
        <div className="absolute inset-0 flex z-20">
          <div className="w-1/2 h-full" onClick={handlePrev} />
          <div className="w-1/2 h-full" onClick={handleNext} />
        </div>

        {/* Story Caption & Quick Actions */}
        <div className="absolute bottom-6 left-4 right-4 z-30 space-y-3">
          <p className="text-white text-sm bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
            {currentStory.caption}
          </p>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder={`Reply to ${currentStory.user}...`} 
              className="flex-1 bg-black/50 border border-white/20 rounded-full px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
            />
            <button className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white backdrop-blur-md">
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className="p-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
