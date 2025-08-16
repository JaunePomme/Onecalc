"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateTimeZoneDifference(zone1: string, zone2: string) {
  const date = new Date();
  const offset1 =
    new Date(date.toLocaleString("en-US", { timeZone: zone1 })).getTime() -
    date.getTime();
  const offset2 =
    new Date(date.toLocaleString("en-US", { timeZone: zone2 })).getTime() -
    date.getTime();
  const difference = (offset2 - offset1) / (1000 * 60 * 60);
  return difference;
}

export default function TimeZoneDifferencePage() {
  const t = useTranslations("TimeZoneDifference");
  const [zone1, setZone1] = useState("");
  const [zone2, setZone2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!zone1 || !zone2) {
        throw new Error(t("errorInvalid"));
      }
      const difference = calculateTimeZoneDifference(zone1, zone2);
      setResult(difference);
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
        onSubmit={handleCalculate}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          {t("zone1Label")}
          <input
            type="text"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={zone1}
            onChange={(e) => setZone1(e.target.value)}
            required
          />
        </label>
        <label>
          {t("zone2Label")}
          <input
            type="text"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={zone2}
            onChange={(e) => setZone2(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
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
              {t("result", { difference: result.toFixed(2) })}
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}
