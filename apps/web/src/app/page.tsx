"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background gradients for Glassmorphism effect */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center space-y-8"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Daaakiya
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl font-light">
          The ultimate India-first Super App. Connect, discover, and build your digital life on one seamless platform.
        </p>

        {/* Glassmorphism Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl max-w-md w-full"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Get Started</h2>
            <button className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
              Continue with Google
            </button>
            <button className="w-full py-4 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
              Sign Up with Email
            </button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
