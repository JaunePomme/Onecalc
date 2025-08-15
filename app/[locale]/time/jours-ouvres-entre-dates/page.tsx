"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce qu’un jour ouvré ?",
    answer:
      "Un jour ouvré correspond à un jour effectivement travaillé dans une entreprise, généralement du lundi au vendredi, hors week-ends et jours fériés.",
  },
  {
    question: "Les jours fériés sont-ils pris en compte ?",
    answer:
      "Ce calculateur ne prend pas en compte les jours fériés : seuls les week-ends sont exclus. Pour un calcul avec jours fériés, il faut une liste précise selon le pays.",
  },
  {
    question: "À quoi sert ce calculateur ?",
    answer:
      "Il permet d’estimer le nombre de jours ouvrés entre deux dates, utile pour la gestion de projets, les congés, ou la planification de tâches.",
  },
];

function countBusinessDays(start: Date, end: Date) {
  let count = 0;
  let current = new Date(start);
  current.setHours(0, 0, 0, 0);
  end = new Date(end);
  end.setHours(0, 0, 0, 0);
  if (current > end) return 0;
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++; // 0 = dimanche, 6 = samedi
    current.setDate(current.getDate() + 1);
  }
  return count;
}

export default function JoursOuvresEntreDates() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!date1 || !date2) {
      setResult(null);
      setError("Veuillez saisir deux dates.");
      return;
    }
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      setResult(null);
      setError("Dates invalides.");
      return;
    }
    setResult(countBusinessDays(d1 < d2 ? d1 : d2, d1 < d2 ? d2 : d1));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Jours ouvrés entre deux dates
      </h1>
      <p className="mb-8">
        Calculez le nombre de jours ouvrés (hors week-ends) entre deux dates.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Ce calcul n’exclut que les week-ends, pas les jours fériés.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Date de début :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={date1}
            onChange={e => setDate1(e.target.value)}
            required
          />
        </label>
        <label>
          Date de fin :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={date2}
            onChange={e => setDate2(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Calculer
        </button>
        <div className="mt-2">
          <span className="font-semibold">Résultat :</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null ? (
            <span className="text-lg font-bold">
              {result} jour{result > 1 ? "s" : ""} ouvré{result > 1 ? "s" : ""}
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Jours ouvrés entre deux dates
        </h2>
        <div className="flex flex-col gap-2">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="border rounded bg-gray-50 dark:bg-gray-900"
            >
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center"
                onClick={() => toggleFaq(idx)}
                aria-expanded={openFaq.includes(idx)}
                aria-controls={`faq-panel-${idx}`}
              >
                {item.question}
                <span className="ml-2">{openFaq.includes(idx) ? "▲" : "▼"}</span>
              </button>
              {openFaq.includes(idx) && (
                <div
                  id={`faq-panel-${idx}`}
                  className="px-4 pb-4 text-gray-700 dark:text-gray-200 animate-fade-in"
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}