import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiet Community",
  description: "A minimal community space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.12),_transparent_55%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
