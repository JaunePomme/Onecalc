"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Comment sont calculés les besoins en macronutriments ?",
    answer:
      "La répartition est basée sur l’apport calorique total et les pourcentages choisis pour protéines, glucides et lipides. Les grammes sont calculés selon : 1g prot = 4 kcal, 1g glucide = 4 kcal, 1g lipide = 9 kcal.",
  },
  {
    question: "Quels ratios utiliser ?",
    answer:
      "Les ratios classiques : protéines 10-35 %, lipides 20-35 %, glucides 45-65 %. À adapter selon vos objectifs (sèche, prise de masse, sport, etc.).",
  },
  {
    question: "Peut-on ajuster les pourcentages ?",
    answer:
      "Oui, vous pouvez personnaliser la répartition selon vos besoins ou recommandations.",
  },
];

function calcMacros({
  calories,
  protPct,
  glucPct,
  lipPct,
}: {
  calories: number;
  protPct: number;
  glucPct: number;
  lipPct: number;
}) {
  const protKcal = (calories * protPct) / 100;
  const glucKcal = (calories * glucPct) / 100;
  const lipKcal = (calories * lipPct) / 100;
  return {
    prot: protKcal / 4,
    gluc: glucKcal / 4,
    lip: lipKcal / 9,
  };
}

export default function MacrosPage() {
  const [calories, setCalories] = useState("");
  const [protPct, setProtPct] = useState("20");
  const [glucPct, setGlucPct] = useState("50");
  const [lipPct, setLipPct] = useState("30");
  const [result, setResult] = useState<{ prot: number; gluc: number; lip: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cal = parseFloat(calories.replace(",", "."));
    const p = parseFloat(protPct.replace(",", "."));
    const g = parseFloat(glucPct.replace(",", "."));
    const l = parseFloat(lipPct.replace(",", "."));
    if (isNaN(cal) || cal <= 0) {
      setResult(null);
      setError("Veuillez saisir un apport calorique valide.");
      return;
    }
    if (isNaN(p) || isNaN(g) || isNaN(l) || p < 0 || g < 0 || l < 0 || p + g + l !== 100) {
      setResult(null);
      setError("La somme des pourcentages doit faire 100 %.");
      return;
    }
    setResult(calcMacros({ calories: cal, protPct: p, glucPct: g, lipPct: l }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de macronutriments
      </h1>
      <p className="mb-8">
        Calculez la répartition optimale de vos protéines, glucides et lipides selon votre apport calorique et vos objectifs.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un avis diététique personnalisé.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Apport calorique total (kcal) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={calories}
            onChange={e => setCalories(e.target.value)}
            required
          />
        </label>
        <div className="flex gap-2">
          <label className="flex-1">
            Protéines (%)
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={protPct}
              onChange={e => setProtPct(e.target.value)}
              required
            />
          </label>
          <label className="flex-1">
            Glucides (%)
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={glucPct}
              onChange={e => setGlucPct(e.target.value)}
              required
            />
          </label>
          <label className="flex-1">
            Lipides (%)
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={lipPct}
              onChange={e => setLipPct(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          La somme des pourcentages doit faire 100 %.
        </div>
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
                Protéines : {result.prot.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} g
              </span>
              <br />
              <span className="text-lg font-bold">
                Glucides : {result.gluc.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} g
              </span>
              <br />
              <span className="text-lg font-bold">
                Lipides : {result.lip.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} g
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Calcul macronutriments
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