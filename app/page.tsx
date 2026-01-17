"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          🚀 TUSBA AI
        </div>
        <div className="flex gap-6">
          <Link href="/auth" className="text-cyan-400 hover:text-cyan-300 transition">
            כניסה
          </Link>
          <Link href="/auth" className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold transition">
            התחלה חינם
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
            תורה פוגשת חדשנות
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          פלטפורמה דינמית המחברת חוכמת התורה עם הטכנולוגיה המתקדמת ביותר. למידה אינטליגנטית, 
          יצירה אוטונומית, וקהילה משפיעה.
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Link
            href="/auth"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition transform hover:scale-105"
          >
            ספר סיפור שלך <ArrowRight size={20} />
          </Link>
          <button className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition">
            למד עוד
          </button>
        </div>

        {/* Hero Image */}
        <div className="bg-gradient-to-b from-purple-500/20 to-cyan-500/20 rounded-2xl p-12 border border-purple-500/30 backdrop-blur">
          <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
            <div className="text-gray-500">🎨 Visual placeholder - תמונה יזכרת</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          שלוש כוחות עוצמה
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Chavruta AI",
              desc: "בן שיח AI שמבין תורה בעברית. שאל, חקור, תגלה."
            },
            {
              icon: Sparkles,
              title: "יצירה אוטונומית",
              desc: "מערכת מייצרת תוכן בקשר פרשה שבועית לחדשות עדכניות."
            },
            {
              icon: Users,
              title: "קהילה בקבוצות",
              desc: "500+ לומדים פעילים, דיונים חיים, שיתוף ידע."
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition"
              >
                <Icon className="text-cyan-400 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center border-t border-purple-500/20">
        <h2 className="text-3xl font-bold mb-8">מוכן לפתוח קהילה חדשה?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          לומדים מישראל וברחבי העולם כבר מתנסים בפלטפורמה. הצטרף אליהם ובנה עתיד של למידה מחודשת.
        </p>
        <Link
          href="/auth"
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-8 py-4 rounded-lg font-semibold text-lg inline-block transition transform hover:scale-105"
        >
          התחלה עכשיו - בחינם 🎁
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 TUSBA AI | תוכנית שדרוג אסטרטגית ובנייה ממשית</p>
        </div>
      </footer>
    </div>
  );
}
