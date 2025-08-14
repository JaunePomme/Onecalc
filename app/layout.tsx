import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import ToggleThemeButton from "./components/ToggleThemeButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneCalc",
  description: "Tool for calculating anything, anywhere, anytime.",
};

const navLinks = [
  {
    href: "/#epargne-investissement",
    icon: "🐷",
    label: "Épargne & Investissement",
  },
  {
    href: "/#credits",
    icon: "💶",
    label: "Crédits",
  },
  {
    href: "/#sante-sport",
    icon: "❤️",
    label: "Santé & Sport",
  },
  {
    href: "/#temps-date",
    icon: "🕒",
    label: "Temps & Date",
  },
  {
    href: "/#maths-outils",
    icon: "🧮",
    label: "Maths & Outils",
  },
  {
    href: "/#convertisseurs",
    icon: "🔄",
    label: "Convertisseurs",
  },
  {
    href: "/#sciences",
    icon: "⚗️",
    label: "Sciences",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto flex items-center justify-between p-2 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="/"
              >
                <Image
                  src="/globe.svg"
                  alt="globe logo"
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%" }}
                />
                <span className="text-lg font-bold tracking-tight">OneCalc</span>
              </Link>
            </div>
            <nav className="flex flex-nowrap overflow-x-auto gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base whitespace-nowrap">
              {navLinks.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition text-gray-700 dark:text-gray-200 font-medium"
                  style={{ minWidth: 0 }}
                  prefetch={false}
                >
                  <span className="text-base sm:text-lg">{nav.icon}</span>
                  <span className="hidden xs:inline">{nav.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:px-8">
          {children}
        </main>

        <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-6 mt-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 flex-wrap items-center justify-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/rgpd"
            >
              RGPD →
            </Link>
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/politique"
            >
              Politique de confidentialité →
            </Link>
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/contact"
            >
              Contact →
            </Link>
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/mentions"
            >
              Mentions légales →
            </Link>
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/clause"
            >
              Clause de non-responsabilité →
            </Link>
            <div className="text-center sm:text-left w-full sm:w-auto mt-2 sm:mt-0">
              Contenu protégé par le droit d&apos;auteur – La reproduction est
              interdite sans notre autorisation.
              <br />© 2025 - OneCalc - Tous droits réservés
            </div>
          </div>
        </footer>
        <ToggleThemeButton />
      </body>
    </html>
  );
}
