"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateMean(numbers: number[]) {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

export default function MoyennesPage() {
  const t = useTranslations("Moyennes");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const numbers = input
        .split(/[ ,;\n]+/)
        .map((num) => parseFloat(num.trim()))
        .filter((num) => !isNaN(num));
      if (numbers.length === 0) {
        throw new Error(t("errorEmpty"));
      }
      setResult(calculateMean(numbers));
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
          {t("inputLabel")}
          <textarea
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
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
              {result.toLocaleString("fr-FR", { maximumFractionDigits: 4 })}
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}
