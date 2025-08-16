"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateBAC(
  weight: number,
  drinks: number,
  hours: number,
  gender: "male" | "female"
) {
  const alcoholDistributionRatio = gender === "male" ? 0.68 : 0.55;
  const gramsOfAlcohol = drinks * 14; // Approximation: 14g of alcohol per standard drink
  return gramsOfAlcohol / (weight * alcoholDistributionRatio) - 0.015 * hours;
}

export default function AlcoolemiePage() {
  const t = useTranslations("Alcoolemie");
  const [weight, setWeight] = useState("");
  const [drinks, setDrinks] = useState("");
  const [hours, setHours] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const numWeight = parseFloat(weight.replace(",", "."));
      const numDrinks = parseInt(drinks, 10);
      const numHours = parseFloat(hours.replace(",", "."));
      if (
        isNaN(numWeight) ||
        isNaN(numDrinks) ||
        isNaN(numHours) ||
        numWeight <= 0 ||
        numDrinks <= 0 ||
        numHours < 0
      ) {
        throw new Error(t("errorInvalid"));
      }
      const bac = calculateBAC(numWeight, numDrinks, numHours, gender);
      setResult(Math.max(0, bac)); // BAC cannot be negative
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
          {t("weightLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <label>
          {t("drinksLabel")}
          <input
            type="number"
            min="0"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={drinks}
            onChange={(e) => setDrinks(e.target.value)}
            required
          />
        </label>
        <label>
          {t("hoursLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            {t("male")}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            {t("female")}
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
            <span className="text-lg font-bold">
              {result.toLocaleString("fr-FR", { maximumFractionDigits: 3 })} %
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}