"use client";
import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent inline-block">
            🕎 TUSBA AI
          </Link>
          <p className="text-slate-400 mt-2">התחבר כדי להתחיל ללמוד</p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-2 font-semibold transition ${isLogin ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              כניסה
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-2 font-semibold transition ${!isLogin ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              הרשמה
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">שם מלא</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:border-cyan-500 focus:outline-none transition"
                    placeholder="ישראל ישראלי"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">אימייל</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:border-cyan-500 focus:outline-none transition text-left"
                  placeholder="name@example.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">סיסמה</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:border-cyan-500 focus:outline-none transition text-left"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition transform hover:scale-[1.02]">
              {isLogin ? "התחבר" : "צור חשבון"} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Shield className="w-4 h-4" />
            <span>מאובטח ע"י TUSBA Auth</span>
          </div>
        </div>

        <Link href="/" className="block text-center mt-8 text-slate-500 hover:text-slate-300 transition">
          ← חזרה לדף הבית
        </Link>
      </div>
    </main>
  );
}
