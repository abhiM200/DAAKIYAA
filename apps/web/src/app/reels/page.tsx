"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, MusicalNoteIcon, BookmarkIcon } from "@heroicons/react/24/solid";

const dummyReels = [
  {
    id: 1,
    author: "@aanya_dance",
    avatar: "https://i.pravatar.cc/150?u=aanya",
    video: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80", // High res preview
    caption: "Trending choreography! 🔥 What do you think?",
    audio: "Original Audio - aanya_dance",
    likes: "45.2K",
    comments: "1.2K"
  },
  {
    id: 2,
    author: "@tech_guru_in",
    avatar: "https://i.pravatar.cc/150?u=techguru",
    video: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    caption: "5 AI tools you must start using in 2026 🤖💡",
    audio: "Tech Beats Vol. 3",
    likes: "128.9K",
    comments: "3.4K"
  }
];

export default function Reels() {
  const [likedMap, setLikedMap] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (id: number) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="h-screen w-full bg-black flex justify-center items-center overflow-hidden">
      {/* Vertical Snap Scroll Container */}
      <div className="h-full w-full max-w-md overflow-y-scroll snap-y snap-mandatory scrollbar-none relative">
        {dummyReels.map((reel) => (
          <div key={reel.id} className="h-full w-full snap-start relative flex items-center justify-center bg-neutral-900 border-x border-white/10">
            {/* Reel Video / Image Background */}
            <img src={reel.video} alt="Reel" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

            {/* Side Action Buttons */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
              <button 
                onClick={() => toggleLike(reel.id)} 
                className="flex flex-col items-center gap-1 text-white group"
              >
                <div className={`p-3 rounded-full backdrop-blur-md transition-all ${likedMap[reel.id] ? 'bg-rose-500 text-white' : 'bg-black/40 group-hover:bg-black/60 text-white'}`}>
                  <HeartIcon className={`w-7 h-7 ${likedMap[reel.id] ? 'scale-110' : ''}`} />
                </div>
                <span className="text-xs font-bold">{reel.likes}</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-white group">
                <div className="p-3 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-colors">
                  <ChatBubbleLeftIcon className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold">{reel.comments}</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-white group">
                <div className="p-3 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-colors">
                  <ShareIcon className="w-7 h-7" />
                </div>
              </button>

              <button className="flex flex-col items-center gap-1 text-white group">
                <div className="p-3 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-colors">
                  <BookmarkIcon className="w-7 h-7" />
                </div>
              </button>
            </div>

            {/* Bottom Details Bar */}
            <div className="absolute bottom-6 left-4 right-16 z-20 text-white space-y-2">
              <div className="flex items-center gap-3">
                <img src={reel.avatar} alt="Author" className="w-10 h-10 rounded-full border-2 border-rose-500" />
                <span className="font-bold text-sm">{reel.author}</span>
                <button className="border border-white/40 px-3 py-1 rounded-full text-xs font-semibold hover:bg-white/20 transition-colors">
                  Follow
                </button>
              </div>

              <p className="text-sm text-neutral-200 line-clamp-2 leading-snug">{reel.caption}</p>

              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <MusicalNoteIcon className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="truncate">{reel.audio}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
