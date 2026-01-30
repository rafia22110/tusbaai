"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { BookOpen, GraduationCap, MessageSquare, Archive } from "lucide-react";

export default function HomePage() {
  const parashot = useQuery(api.content.getParashotContent, { limit: 5 });
  const recentContent = useQuery(api.content.getPublishedContent, { limit: 3 });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" dir="rtl">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🕎 TUSBA AI
          </Link>
          <div className="flex gap-6">
            <Link href="/home" className="text-slate-300 hover:text-white transition">בית</Link>
            <Link href="/stories" className="text-slate-300 hover:text-white transition">סיפורים</Link>
            <Link href="/gallery" className="text-slate-300 hover:text-white transition">גלריה</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            🏠 Hub למידה
          </h1>
          <p className="text-xl text-slate-400">
            מרכז הלמידה המתקדם - תורה, חדשנות וקהילה
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* פרשת השבוע */}
          <div className="bg-slate-900/50 backdrop-blur border border-purple-500/20 p-6 rounded-xl hover:border-purple-500/40 transition">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold">📖 פרשת השבוע</h2>
            </div>
            <div className="space-y-3">
              {parashot ? (
                parashot.map((p) => (
                  <div key={p._id} className="border-r-4 border-purple-500 pr-3">
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <p className="text-sm text-slate-400">{p.metadata.category}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">טוען תוכן...</p>
              )}
            </div>
          </div>

          {/* מסלולי למידה */}
          <div className="bg-slate-900/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl hover:border-cyan-500/40 transition">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-bold">🎓 מסלולי למידה</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-cyan-500/10 p-3 rounded-lg">
                <h4 className="font-bold text-cyan-300">רמה 1 - יסודות</h4>
                <p className="text-sm text-slate-400">מבוא לתורה ולמקורות</p>
              </div>
              <div className="bg-cyan-500/10 p-3 rounded-lg">
                <h4 className="font-bold text-cyan-300">רמה 2 - מתקדמים</h4>
                <p className="text-sm text-slate-400">לימוד מעמיק ופרשנות</p>
              </div>
              <div className="bg-cyan-500/10 p-3 rounded-lg">
                <h4 className="font-bold text-cyan-300">רמה 3 - מומחים</h4>
                <p className="text-sm text-slate-400">מחקר ויצירה</p>
              </div>
            </div>
          </div>

          {/* צ'אט חברותא */}
          <div className="bg-slate-900/50 backdrop-blur border border-pink-500/20 p-6 rounded-xl hover:border-pink-500/40 transition">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-8 h-8 text-pink-400" />
              <h2 className="text-2xl font-bold">💬 חברותא AI</h2>
            </div>
            <p className="text-slate-300 mb-4">
              שיחה מונחית על התורה עם בינה מלאכותית מתקדמת
            </p>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition">
              התחל שיחה
            </button>
          </div>
        </div>

        {/* Recent Content */}
        <section className="bg-slate-900/30 backdrop-blur border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Archive className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold">📚 תוכן אחרון</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentContent ? (
              recentContent.map((item) => (
                <div key={item._id} className="bg-slate-800/50 p-4 rounded-lg hover:bg-slate-800 transition">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{item.body}</p>
                  <div className="mt-3 flex gap-2">
                    {item.metadata.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 col-span-3">טוען תוכן...</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
