"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculatePace(distance: number, time: number) {
  return time / distance;
}

function calculateSpeed(distance: number, time: number) {
  return distance / (time / 60);
}

export default function AllureVitesseTempsPage() {
  const t = useTranslations("AllureVitesseTemps");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [pace, setPace] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const numDistance = parseFloat(distance.replace(",", "."));
      const numTime = parseFloat(time.replace(",", "."));
      if (
        isNaN(numDistance) ||
        isNaN(numTime) ||
        numDistance <= 0 ||
        numTime <= 0
      ) {
        throw new Error(t("errorInvalid"));
      }
      setPace(calculatePace(numDistance, numTime));
      setSpeed(calculateSpeed(numDistance, numTime));
    } catch (err) {
      setPace(null);
      setSpeed(null);
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
          {t("distanceLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </label>
        <label>
          {t("timeLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
          ) : pace !== null && speed !== null ? (
            <>
              <span className="text-lg font-bold">
                {t("paceResult", {
                  value: pace.toLocaleString("fr-FR", {
                    maximumFractionDigits: 2,
                  }),
                })}
              </span>
              <br />
              <span className="text-lg font-bold">
                {t("speedResult", {
                  value: speed.toLocaleString("fr-FR", {
                    maximumFractionDigits: 2,
                  }),
                })}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}
