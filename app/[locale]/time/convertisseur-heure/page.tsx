"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function convertTime(hours: number, minutes: number) {
  const totalMinutes = hours * 60 + minutes;
  const totalSeconds = totalMinutes * 60;
  return { totalMinutes, totalSeconds };
}

export default function TimeConverterPage() {
  const t = useTranslations("TimeConverter");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [result, setResult] = useState<{
    totalMinutes: number;
    totalSeconds: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const numHours = parseInt(hours, 10);
      const numMinutes = parseInt(minutes, 10);
      if (
        isNaN(numHours) ||
        isNaN(numMinutes) ||
        numHours < 0 ||
        numMinutes < 0
      ) {
        throw new Error(t("errorInvalid"));
      }
      setResult(convertTime(numHours, numMinutes));
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
        onSubmit={handleConvert}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          {t("hoursLabel")}
          <input
            type="number"
            min="0"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </label>
        <label>
          {t("minutesLabel")}
          <input
            type="number"
            min="0"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {t("convert")}
        </button>
        <div className="mt-2">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null ? (
            <span className="text-lg font-bold">
              {t("result", {
                minutes: result.totalMinutes,
                seconds: result.totalSeconds,
              })}
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}
