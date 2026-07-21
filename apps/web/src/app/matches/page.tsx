"use client";

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { XMarkIcon, HeartIcon } from "@heroicons/react/24/solid";
import { api } from "@/lib/api";

export default function Matches() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Rotate based on drag x
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get("/matches/discover");
        setProfiles(res.data.content || []);
      } catch (error) {
        console.error("Failed to fetch matches", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    } else {
      controls.start({ x: 0, rotate: 0 });
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    // In a real app, you would send a POST request to /api/matches/swipe here
    controls.start({ x: direction === "right" ? 500 : -500, opacity: 0 }).then(() => {
      setProfiles((prev) => prev.slice(1));
      x.set(0);
      controls.set({ x: 0, opacity: 1, rotate: 0 });
    });
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-10 text-center z-20">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
          Discover
        </h1>
        <p className="text-neutral-400 mt-2">Find your perfect match</p>
      </div>

      <div className="relative w-full max-w-sm h-[600px] flex items-center justify-center mt-10">
        {loading ? (
          <div className="text-neutral-400">Loading matches...</div>
        ) : profiles.length === 0 ? (
          <div className="text-neutral-400 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-neutral-700 flex items-center justify-center animate-pulse mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <p>No more profiles nearby.</p>
          </div>
        ) : (
          profiles.map((profile, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={profile.id}
                className="absolute w-full h-full rounded-[2.5rem] bg-neutral-900 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10"
                style={{
                  zIndex: profiles.length - index,
                  x: isTop ? x : 0,
                  rotate: isTop ? rotate : 0,
                  opacity: isTop ? opacity : 1,
                  scale: isTop ? 1 : 0.95 - index * 0.05,
                  top: isTop ? 0 : index * 20,
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                animate={controls}
              >
                <img
                  src={`https://i.pravatar.cc/600?u=${profile.userId}`}
                  alt="Profile"
                  className="w-full h-3/4 object-cover pointer-events-none"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-8 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                    User {profile.userId?.substring(0, 5)}, {profile.age}
                  </h2>
                  <p className="text-rose-400 font-medium text-sm mt-1 mb-3">📍 Looking for {profile.lookingFor}</p>
                  <p className="text-neutral-300 text-sm line-clamp-2">{profile.datingBio}</p>
                </div>

                {/* LIKE/NOPE Overlays based on drag */}
                {isTop && (
                  <>
                    <motion.div
                      className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-1 z-50 pointer-events-none"
                      style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
                    >
                      <span className="text-green-500 font-bold text-4xl uppercase tracking-widest">Like</span>
                    </motion.div>
                    <motion.div
                      className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-1 z-50 pointer-events-none"
                      style={{ opacity: useTransform(x, [0, -100], [0, 1]) }}
                    >
                      <span className="text-red-500 font-bold text-4xl uppercase tracking-widest">Nope</span>
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-6 mt-12 z-20">
        <button 
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500 hover:bg-neutral-800 transition-colors shadow-lg hover:scale-110 active:scale-95 transition-transform"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>
        <button 
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-green-500 hover:bg-neutral-800 transition-colors shadow-lg hover:scale-110 active:scale-95 transition-transform"
        >
          <HeartIcon className="w-8 h-8" />
        </button>
      </div>
    </main>
  );
}
