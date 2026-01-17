"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useState } from "react";
import { Search, Tag, BookOpen, Clock } from "lucide-react";

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const stories = useQuery(api.content.getStoriesContent, { limit: 50 });
  const searchResults = useQuery(
    api.content.searchContent,
    searchTerm.length > 2 ? { searchTerm, language: "he" } : "skip"
  );

  const displayStories = searchTerm.length > 2 ? searchResults : stories;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" dir="rtl">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🕎 TUSBA AI
          </Link>
          <div className="flex gap-6">
            <Link href="/home" className="text-slate-300 hover:text-white transition">בית</Link>
            <Link href="/stories" className="text-white font-semibold">סיפורים</Link>
            <Link href="/gallery" className="text-slate-300 hover:text-white transition">גלריה</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            📚 סיפורים וגלריה
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            אוסף סיפורים, עובדות היסטוריות ועניינים מעולם היהדות
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="חפש סיפורים, עובדות ועוד..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-3 mb-12">
          <button className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full transition">
            📜 הכל
          </button>
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition">
            🏛️ היסטוריה
          </button>
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition">
            ✨ עובדות
          </button>
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition">
            💡 הידעת?
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStories ? (
            displayStories.map((story) => (
              <div
                key={story._id}
                className="group bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-xl hover:border-purple-500/40 hover:bg-slate-900 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition">
                  {story.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {story.body}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(story.createdAt).toLocaleDateString("he-IL")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{story.metadata.category}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {story.metadata.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-slate-500 text-lg">טוען סיפורים...</p>
            </div>
          )}
        </div>

        {/* No Results */}
        {displayStories && displayStories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">לא נמצאו תוצאות. נסה חיפוש אחר.</p>
          </div>
        )}
      </section>
    </main>
  );
}
