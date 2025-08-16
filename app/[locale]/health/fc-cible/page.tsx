"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateTargetHeartRate(
  age: number,
  restingHR: number,
  intensity: number,
) {
  const maxHR = 220 - age;
  return restingHR + (maxHR - restingHR) * intensity;
}

export default function FcCiblePage() {
  const t = useTranslations("FcCible");
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [intensity, setIntensity] = useState("0.5");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const numAge = parseInt(age, 10);
      const numRestingHR = parseInt(restingHR, 10);
      const numIntensity = parseFloat(intensity);
      if (
        isNaN(numAge) ||
        isNaN(numRestingHR) ||
        isNaN(numIntensity) ||
        numAge <= 0 ||
        numRestingHR <= 0 ||
        numIntensity <= 0 ||
        numIntensity > 1
      ) {
        throw new Error(t("errorInvalid"));
      }
      setResult(calculateTargetHeartRate(numAge, numRestingHR, numIntensity));
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
          {t("ageLabel")}
          <input
            type="number"
            min="0"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          {t("restingHRLabel")}
          <input
            type="number"
            min="0"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={restingHR}
            onChange={(e) => setRestingHR(e.target.value)}
            required
          />
        </label>
        <label>
          {t("intensityLabel")}
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            required
          >
            <option value="0.5">{t("intensityLow")}</option>
            <option value="0.7">{t("intensityModerate")}</option>
            <option value="0.85">{t("intensityHigh")}</option>
          </select>
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
              {result.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} bpm
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}
