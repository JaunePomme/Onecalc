export const dynamicParams = true;
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ToggleThemeButton from "../components/ToggleThemeButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextIntlClientProvider } from "next-intl";
import Head from "next/head";

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

async function loadMessages(locale: string) {
  try {
    return {
      messages: (await import(`../../messages/${locale}.json`)).default,
      usedLocale: locale,
    };
  } catch {
    const shortLocale = locale.split("-")[0];
    try {
      return {
        messages: (await import(`../../messages/${shortLocale}.json`)).default,
        usedLocale: shortLocale,
      };
    } catch {
      notFound();
    }
  }
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  const { locale } = await params; // ✅ attendre params avant d'accéder à params.locale

  // Import bidon pour satisfaire Next.js avant d'accéder à params.locale
  await import("../../messages/fr.json");

  const { messages, usedLocale } = await loadMessages(locale);

  return (
    <html lang={usedLocale} data-scroll-behavior="smooth">
      <Head>
        <link rel="alternate" href="/en" hrefLang="en" />
        <link rel="alternate" href="/fr" hrefLang="fr" />
        <link rel="alternate" href="/" hrefLang="x-default" />
      </Head>
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
