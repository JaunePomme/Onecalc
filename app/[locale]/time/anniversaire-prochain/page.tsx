"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateNextBirthday(birthDate: string) {
  const now = new Date();
  const birth = new Date(birthDate);
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const diff = nextBirthday.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return { date: nextBirthday.toISOString().split("T")[0], days };
}

export default function NextBirthdayPage() {
  const t = useTranslations("NextBirthday");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{ date: string; days: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!birthDate) {
        throw new Error(t("errorInvalid"));
      }
      const calculated = calculateNextBirthday(birthDate);
      setResult(calculated);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : t("errorGeneric"));
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8">{t("intro")}</p>
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>{t("disclaimer")}</strong>
      </div>
      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          {t("birthDateLabel")}
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          {t("calculate")}
        </button>
        <div className="mt-2">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null ? (
            <span className="text-lg font-bold">
              {t("result", { date: result.date, days: result.days })}
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}