"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateMolarMass(elements: { symbol: string; mass: number; count: number }[]) {
  return elements.reduce((total, el) => total + el.mass * el.count, 0);
}

export default function MasseMolairePage() {
  const t = useTranslations("MasseMolaire");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const elements = input.split(/[ ,;\n]+/).map((el) => {
        const [symbol, count] = el.split(/(?<=\D)(?=\d)/);
        const mass = getElementMass(symbol.trim()); // Assume a function to get atomic mass
        if (!mass || isNaN(Number(count))) {
          throw new Error(t("errorInvalid"));
        }
        return { symbol, mass, count: Number(count) || 1 };
      });
      setResult(calculateMolarMass(elements));
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
              {result.toLocaleString("fr-FR", { maximumFractionDigits: 4 })} g/mol
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}

function getElementMass(symbol: string): number | null {
  const periodicTable: Record<string, number> = {
    H: 1.008,
    He: 4.0026,
    Li: 6.94,
    Be: 9.0122,
    B: 10.81,
    C: 12.011,
    N: 14.007,
    O: 15.999,
    F: 18.998,
    Ne: 20.180,
    // Add more elements as needed
  };
  return periodicTable[symbol] || null;
}