"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que le 1RM ?",
    answer:
      "Le 1RM (One Rep Max) est la charge maximale que vous pouvez soulever une seule fois sur un exercice donné.",
  },
  {
    question: "Quelles formules sont utilisées ?",
    answer:
      "Les formules d’Epley et de Brzycki sont utilisées pour estimer le 1RM à partir d’une charge et d’un nombre de répétitions.",
  },
  {
    question: "Pour quelles plages de répétitions ces formules sont-elles valides ?",
    answer:
      "Ces formules sont fiables pour 1 à 10 répétitions. Au-delà, l’estimation devient moins précise.",
  },
];

function calcEpley(charge: number, reps: number) {
  return charge * (1 + reps / 30);
}

function calcBrzycki(charge: number, reps: number) {
  return charge * (36 / (37 - reps));
}

export default function OneRMPage() {
  const [charge, setCharge] = useState("");
  const [reps, setReps] = useState("");
  const [result, setResult] = useState<{ epley: number; brzycki: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const c = parseFloat(charge.replace(",", "."));
    const r = parseInt(reps, 10);
    if (isNaN(c) || c <= 0) {
      setResult(null);
      setError("Veuillez saisir une charge valide.");
      return;
    }
    if (isNaN(r) || r < 1 || r > 15) {
      setResult(null);
      setError("Veuillez saisir un nombre de répétitions entre 1 et 15.");
      return;
    }
    setResult({
      epley: calcEpley(c, r),
      brzycki: calcBrzycki(c, r),
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de 1RM (force maximale)
      </h1>
      <p className="mb-8">
        Estimez votre charge maximale sur une répétition (1RM) à partir d’une charge et d’un nombre de répétitions, selon les formules d’Epley et Brzycki.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un test réel supervisé.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Charge soulevée (kg) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={charge}
            onChange={e => setCharge(e.target.value)}
            required
          />
        </label>
        <label>
          Nombre de répétitions :
          <input
            type="number"
            min="1"
            max="15"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={reps}
            onChange={e => setReps(e.target.value)}
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
          ) : result ? (
            <>
              <span className="text-lg font-bold">
                1RM (Epley) : {result.epley.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} kg
              </span>
              <br />
              <span className="text-lg font-bold">
                1RM (Brzycki) : {result.brzycki.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} kg
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Calcul du 1RM
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
                <span className="ml-2">
                  {openFaq.includes(idx) ? "▲" : "▼"}
                </span>
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