"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateMacros(
  calories: number,
  ratio: { protein: number; carbs: number; fat: number },
) {
  const protein = (calories * ratio.protein) / 4;
  const carbs = (calories * ratio.carbs) / 4;
  const fat = (calories * ratio.fat) / 9;
  return { protein, carbs, fat };
}

export default function MacrosPage() {
  const t = useTranslations("Macros");
  const [calories, setCalories] = useState("");
  const [ratio, setRatio] = useState({ protein: 0.3, carbs: 0.4, fat: 0.3 });
  const [result, setResult] = useState<{
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const numCalories = parseFloat(calories.replace(",", "."));
      if (isNaN(numCalories) || numCalories <= 0) {
        throw new Error(t("errorInvalid"));
      }
      setResult(calculateMacros(numCalories, ratio));
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
          {t("caloriesLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
        </label>
        <div className="flex flex-col gap-2">
          <label>
            {t("proteinLabel")}
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={ratio.protein}
              onChange={(e) =>
                setRatio({ ...ratio, protein: parseFloat(e.target.value) })
              }
              required
            />
          </label>
          <label>
            {t("carbsLabel")}
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={ratio.carbs}
              onChange={(e) =>
                setRatio({ ...ratio, carbs: parseFloat(e.target.value) })
              }
              required
            />
          </label>
          <label>
            {t("fatLabel")}
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={ratio.fat}
              onChange={(e) =>
                setRatio({ ...ratio, fat: parseFloat(e.target.value) })
              }
              required
            />
          </label>
        </div>
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
            <div>
              <p>
                {t("proteinResult", {
                  value: result.protein.toLocaleString("fr-FR", {
                    maximumFractionDigits: 2,
                  }),
                })}
              </p>
              <p>
                {t("carbsResult", {
                  value: result.carbs.toLocaleString("fr-FR", {
                    maximumFractionDigits: 2,
                  }),
                })}
              </p>
              <p>
                {t("fatResult", {
                  value: result.fat.toLocaleString("fr-FR", {
                    maximumFractionDigits: 2,
                  }),
                })}
              </p>
            </div>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}
