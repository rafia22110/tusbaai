import type { Metadata } from "next";
import { ConvexProvider, ConvexReactClient } from "@convex-dev/react";
import "./globals.css";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const metadata: Metadata = {
  title: "TUSBA AI - Torah + Innovation",
  description: "Dynamic platform connecting Torah wisdom with modern innovation",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://tusbaai.com")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-slate-900 text-white font-sans">
        <ConvexProvider client={convex}>
          {children}
        </ConvexProvider>
      </body>
    </html>
  );
}
