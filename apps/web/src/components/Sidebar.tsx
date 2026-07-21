"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  VideoCameraIcon, 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  SparklesIcon, 
  UserCircleIcon,
  PlusCircleIcon,
  FireIcon
} from "@heroicons/react/24/outline";
import { 
  HomeIcon as HomeIconSolid, 
  MagnifyingGlassIcon as MagnifyingGlassSolid,
  VideoCameraIcon as VideoCameraSolid,
  ChatBubbleLeftRightIcon as ChatSolid,
  HeartIcon as HeartSolid,
  FireIcon as FireSolid
} from "@heroicons/react/24/solid";

export default function Sidebar() {
  const pathname = usePathname();

  // Hide sidebar on auth pages or story fullscreen mode if needed
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const navItems = [
    { name: "Home", href: "/feed", icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: "Explore", href: "/explore", icon: MagnifyingGlassIcon, activeIcon: MagnifyingGlassSolid },
    { name: "Reels", href: "/reels", icon: VideoCameraIcon, activeIcon: VideoCameraSolid },
    { name: "Messages", href: "/chat", icon: ChatBubbleLeftRightIcon, activeIcon: ChatSolid },
    { name: "Matches", href: "/matches", icon: FireIcon, activeIcon: FireSolid },
    { name: "Stories", href: "/stories", icon: SparklesIcon, activeIcon: SparklesIcon },
  ];

  return (
    <aside className="w-16 md:w-64 h-screen border-r border-white/10 p-3 md:p-6 flex flex-col justify-between fixed left-0 top-0 bg-black/80 backdrop-blur-xl z-50">
      <div className="space-y-8">
        {/* Brand Logo */}
        <Link href="/feed" className="block px-2">
          <h1 className="hidden md:block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 tracking-tighter">
            Daaakiya
          </h1>
          <span className="md:hidden text-2xl font-black text-purple-400">D</span>
        </Link>

        {/* Nav Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive ? item.activeIcon : item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all font-medium text-sm ${
                  isActive 
                    ? "bg-white/10 text-white font-bold" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-6 h-6 shrink-0" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile & Settings Footer */}
      <div className="border-t border-white/10 pt-4 space-y-2">
        <Link
          href="/login"
          className="flex items-center gap-4 px-3 py-3 rounded-xl text-neutral-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
        >
          <UserCircleIcon className="w-6 h-6 shrink-0" />
          <span className="hidden md:inline">Profile</span>
        </Link>
      </div>
    </aside>
  );
}
