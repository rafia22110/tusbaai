"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Image as ImageIcon, ArrowLeft } from "lucide-react";

export default function GalleryPage() {
  const galleryItems = useQuery(api.content.getContentByCategory, { category: "gallery" });

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
            <Link href="/stories" className="text-slate-300 hover:text-white transition">סיפורים</Link>
            <Link href="/gallery" className="text-white font-semibold">גלריה</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🖼️ גלריה דיגיטלית
          </h1>
          <p className="text-xl text-slate-400">
            תמונות, אמנות וביטויים ויזואליים של עולם התורה
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems ? (
            galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <div key={item._id} className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 aspect-square">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800 group-hover:bg-slate-700 transition">
                    <ImageIcon className="w-12 h-12 text-slate-600" />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-300 line-clamp-1">{item.body}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-900/30 rounded-2xl border border-dashed border-slate-700">
                <ImageIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">עדיין אין פריטים בגלריה</p>
              </div>
            )
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500">טוען גלריה...</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
