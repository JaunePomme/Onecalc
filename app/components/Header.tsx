"use client";
import Link from "next/link";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";
import { useParams } from "next/navigation";


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

export default function Header() {
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : Array.isArray(params.locale) ? params.locale[0] : "fr";

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-2 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href={`/${locale}`}
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
              href={`/${locale ? locale : ''}${nav.href}`.replace('//', '/')}
              className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition text-gray-700 dark:text-gray-200 font-medium"
              style={{ minWidth: 0 }}
              prefetch={false}
            >
              <span className="text-base sm:text-lg">{nav.icon}</span>
              <span className="hidden xs:inline">{nav.label}</span>
            </Link>
          ))}
        </nav>
        <div className="ml-4">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
