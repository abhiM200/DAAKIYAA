"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FireIcon, HashtagIcon, UserIcon } from "@heroicons/react/24/outline";

const exploreItems = [
  { id: 1, type: "reel", media: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80", likes: "45K" },
  { id: 2, type: "photo", media: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", likes: "12K" },
  { id: 3, type: "photo", media: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", likes: "89K" },
  { id: 4, type: "reel", media: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80", likes: "120K" },
  { id: 5, type: "photo", media: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", likes: "34K" },
  { id: 6, type: "photo", media: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80", likes: "67K" }
];

const trendingHashtags = ["#IndiaTech", "#NextJs15", "#StartupLife", "#DesignTrends2026", "#SuperApp"];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Search Header */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-6 h-6 text-neutral-400 absolute left-4 top-3.5" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users, #hashtags, or topics..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-md"
          />
        </div>

        {/* Trending Tags Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-orange-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-orange-400 shrink-0">
            <FireIcon className="w-4 h-4" /> Trending
          </div>
          {trendingHashtags.map((tag, idx) => (
            <button key={idx} className="bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full text-xs text-neutral-300 transition-colors shrink-0">
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {exploreItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 bg-neutral-900 ${
                index % 3 === 0 ? "col-span-2 row-span-2 h-72 md:h-96" : "h-36 md:h-48"
              }`}
            >
              <img src={item.media} alt="Explore" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-bold text-sm">
                ❤️ {item.likes}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
