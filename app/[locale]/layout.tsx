export const dynamicParams = true;
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import ToggleThemeButton from "../components/ToggleThemeButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextIntlClientProvider } from "next-intl";

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
    href: "/finance/roi",
    label: "ROI",
    icon: "💹",
  },
  {
    href: "/finance/dca",
    label: "DCA",
    icon: "📈",
  },
  {
    href: "/finance/interets-composes",
    label: "Intérêts composés",
    icon: "🧮",
  },
  {
    href: "/finance/amortissement-pret",
    label: "Amortissement prêt",
    icon: "🏦",
  },
  {
    href: "/convert/units",
    label: "Unités",
    icon: "🔄",
  },
  {
    href: "/convert/volume",
    label: "Volume",
    icon: "🧪",
  },
  {
    href: "/health/imc",
    label: "IMC",
    icon: "⚖️",
  },
];

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  const { locale } = await params; // ✅ attendre params avant d'utiliser locale

  // Import bidon pour satisfaire Next.js avant d'accéder à params.locale
  await import("../../messages/fr.json");

  let messages;
  let usedLocale = locale;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    const shortLocale = locale.split("-")[0];
    try {
      messages = (await import(`../../messages/${shortLocale}.json`)).default;
      usedLocale = shortLocale;
    } catch {
      notFound();
      return null;
    }
  }

  if (!messages) {
    return (
      <html lang={usedLocale}>
        <body>
          <div style={{ color: "red", padding: 32 }}>
            Erreur : messages de traduction introuvables pour la locale « 
            {usedLocale} ».
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang={usedLocale} data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider locale={usedLocale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:px-8">
              {children}
            </main>

            <Footer />
            <ToggleThemeButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
// ...
