"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  PaperAirplaneIcon, 
  BookmarkIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { api } from "@/lib/api";
import Link from "next/link";

const dummyStories = [
  { id: 1, name: "Your story", avatar: "https://i.pravatar.cc/150?u=me", isUser: true },
  { id: 2, name: "arjun_m", avatar: "https://i.pravatar.cc/150?u=arjun" },
  { id: 3, name: "priya_s", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: 4, name: "rohan_k", avatar: "https://i.pravatar.cc/150?u=rohan" },
  { id: 5, name: "sneha_p", avatar: "https://i.pravatar.cc/150?u=sneha" },
  { id: 6, name: "vikram_t", avatar: "https://i.pravatar.cc/150?u=vikram" }
];

const suggestedUsers = [
  { name: "aanya_dance", desc: "Suggested for you", avatar: "https://i.pravatar.cc/150?u=aanya" },
  { name: "tech_guru_in", desc: "Followed by arjun_m", avatar: "https://i.pravatar.cc/150?u=techguru" },
  { name: "kabir_codes", desc: "New to Daaakiya", avatar: "https://i.pravatar.cc/150?u=kabir" }
];

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  const fetchFeed = async () => {
    try {
      const res = await api.get("/content/posts/feed");
      setPosts(res.data.content || []); 
    } catch (error) {
      console.error("Failed to fetch feed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handlePost = async () => {
    if (!newPostContent.trim()) return;
    try {
      const res = await api.post("/content/posts", { textContent: newPostContent });
      if (res.data) {
        setPosts((prev) => [res.data, ...prev]);
      }
      setNewPostContent("");
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:py-8 md:px-12 flex justify-center">
      <div className="w-full max-w-5xl flex gap-12">
        {/* Main Feed Column */}
        <div className="flex-1 max-w-xl space-y-6">
          {/* Instagram Story Tray */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-4 flex gap-4 overflow-x-auto scrollbar-none backdrop-blur-md">
            {dummyStories.map((story) => (
              <Link key={story.id} href="/stories" className="flex flex-col items-center gap-1.5 shrink-0 group">
                <div className={`p-0.5 rounded-full ${story.isUser ? 'bg-neutral-700' : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'}`}>
                  <div className="p-0.5 bg-black rounded-full">
                    <img src={story.avatar} alt={story.name} className="w-14 h-14 rounded-full group-hover:scale-105 transition-transform" />
                  </div>
                </div>
                <span className="text-xs text-neutral-300 truncate w-16 text-center">{story.name}</span>
              </Link>
            ))}
          </div>

          {/* Post Creation Box */}
          <div className="bg-neutral-900/60 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex gap-4">
            <img src="https://i.pravatar.cc/150?u=me" alt="You" className="w-10 h-10 rounded-full border border-purple-500 shrink-0" />
            <div className="flex-1">
              <textarea 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 resize-none text-white text-sm placeholder-neutral-500 focus:outline-none"
                placeholder="What's on your mind?"
                rows={2}
              />
              <div className="flex justify-between items-center border-t border-white/10 pt-2.5 mt-1">
                <div className="flex gap-2 text-purple-400 text-xs font-semibold">
                  <button className="hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">📷 Photo</button>
                  <button className="hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">🎥 Reel</button>
                </div>
                <button 
                  onClick={handlePost}
                  className="bg-purple-600 hover:bg-purple-500 px-5 py-1.5 rounded-full font-bold text-xs transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Instagram Post Feed List */}
          {loading ? (
            <div className="text-center text-neutral-500 py-12">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-neutral-500 py-12">No posts yet. Be the first to share something!</div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="bg-neutral-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                {/* Post Header */}
                <div className="flex items-center justify-between p-3.5 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?u=${post.authorId}`} alt="Author" className="w-9 h-9 rounded-full border border-rose-500/50" />
                    <div>
                      <h4 className="font-bold text-sm text-white hover:underline cursor-pointer">
                        user_{post.authorId?.substring(0, 6)}
                      </h4>
                      <span className="text-[11px] text-neutral-500">Original Post</span>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-white">
                    <EllipsisHorizontalIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Body */}
                <div className="p-4 bg-neutral-950/50 min-h-[120px] flex items-center">
                  <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap font-normal">
                    {post.textContent}
                  </p>
                </div>

                {/* Post Actions Bar */}
                <div className="p-3.5 space-y-2.5">
                  <div className="flex justify-between items-center text-neutral-300">
                    <div className="flex gap-4 items-center">
                      <button onClick={() => toggleLike(post.id)} className="hover:opacity-75 transition-opacity">
                        {likedPosts[post.id] ? (
                          <HeartSolid className="w-6 h-6 text-rose-500 scale-110 transition-transform" />
                        ) : (
                          <HeartIcon className="w-6 h-6" />
                        )}
                      </button>
                      <button className="hover:opacity-75 transition-opacity">
                        <ChatBubbleLeftIcon className="w-6 h-6" />
                      </button>
                      <button className="hover:opacity-75 transition-opacity">
                        <PaperAirplaneIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <button className="hover:opacity-75 transition-opacity">
                      <BookmarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Likes Counter */}
                  <p className="text-xs font-bold text-white">
                    {likedPosts[post.id] ? '1,241 likes' : '1,240 likes'}
                  </p>

                  {/* Comment Input */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                    <input 
                      type="text" 
                      placeholder="Add a comment..." 
                      className="bg-transparent border-none focus:outline-none w-full text-white placeholder-neutral-500"
                    />
                    <button className="text-purple-400 font-bold hover:text-purple-300">Post</button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Right Sidebar (Desktop Instagram Layout) */}
        <aside className="hidden lg:block w-80 space-y-6 shrink-0">
          {/* User Profile Banner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?u=me" alt="You" className="w-12 h-12 rounded-full border-2 border-purple-500" />
              <div>
                <h4 className="font-bold text-sm text-white">you_developer</h4>
                <span className="text-xs text-neutral-400">Software Engineer</span>
              </div>
            </div>
            <Link href="/login" className="text-purple-400 text-xs font-bold hover:underline">
              Switch
            </Link>
          </div>

          {/* Suggestions Header */}
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-neutral-400">Suggested for you</span>
            <button className="text-white hover:text-neutral-300">See All</button>
          </div>

          {/* Suggestions List */}
          <div className="space-y-3">
            {suggestedUsers.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
                  <div>
                    <h5 className="font-bold text-xs text-white hover:underline cursor-pointer">{user.name}</h5>
                    <span className="text-[11px] text-neutral-500">{user.desc}</span>
                  </div>
                </div>
                <button className="text-purple-400 text-xs font-bold hover:text-white transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>

          {/* Footer Copyright */}
          <div className="text-[11px] text-neutral-500 space-y-2 border-t border-white/10 pt-4">
            <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations</p>
            <p>© 2026 DAAAKIYA FROM INDIA</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
