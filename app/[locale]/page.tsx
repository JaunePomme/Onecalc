"use client";
import { useTranslations } from "next-intl";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-xl">
        <h1>{t("title")}</h1>
        <SearchBar />
      </main>
    </div>
  );
}
