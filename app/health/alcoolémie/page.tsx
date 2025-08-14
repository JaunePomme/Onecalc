"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Comment est estimée l’alcoolémie ?",
    answer:
      "Le calcul utilise la formule de Widmark, tenant compte du sexe, du poids, de la quantité d’alcool pur consommée et du temps écoulé.",
  },
  {
    question: "Quels facteurs influencent l’alcoolémie réelle ?",
    answer:
      "L’alcoolémie dépend aussi de l’alimentation, de la santé, du métabolisme, de la prise de médicaments, etc. Ce calcul reste une estimation.",
  },
  {
    question: "Ce simulateur garantit-il que je peux conduire ?",
    answer:
      "Non ! Ne prenez jamais le volant après avoir bu, même si le calcul indique un taux faible ou nul.",
  },
];

// 1 verre standard ≈ 10g d’alcool pur
function calcAlcoolemie({
  sexe,
  poids,
  verres,
  heures,
}: {
  sexe: string;
  poids: number;
  verres: number;
  heures: number;
}) {
  const coef = sexe === "femme" ? 0.6 : 0.7;
  const alcoolPur = verres * 10; // grammes
  let taux = alcoolPur / (poids * coef);
  // Elimination : 0,15 g/L par heure
  taux -= 0.15 * heures;
  return Math.max(0, taux);
}

export default function AlcoolemiePage() {
  const [sexe, setSexe] = useState("homme");
  const [poids, setPoids] = useState("");
  const [verres, setVerres] = useState("");
  const [heures, setHeures] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const p = parseFloat(poids.replace(",", "."));
    const v = parseFloat(verres.replace(",", "."));
    const h = parseFloat(heures.replace(",", ".")) || 0;
    if (isNaN(p) || p <= 0) {
      setResult(null);
      setError("Veuillez saisir un poids valide.");
      return;
    }
    if (isNaN(v) || v <= 0) {
      setResult(null);
      setError("Veuillez saisir un nombre de verres valide.");
      return;
    }
    if (h < 0) {
      setResult(null);
      setError("Veuillez saisir un nombre d’heures positif.");
      return;
    }
    const taux = calcAlcoolemie({ sexe, poids: p, verres: v, heures: h });
    setResult(taux);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Estimation de l’alcoolémie (g/L)
      </h1>
      <div className="mb-6 p-3 rounded bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-200 text-sm border border-red-300 dark:border-red-800">
        <strong>Disclaimer :</strong> 
        <span className="font-bold">Ce calcul est une estimation simplifiée. L’alcoolémie réelle dépend de nombreux facteurs individuels. Ne prenez jamais le volant après avoir bu, même si le résultat semble faible ou nul.</span>
      </div>
      <p className="mb-8">
        Calculez une estimation de votre taux d’alcool dans le sang après consommation de verres standards.
      </p>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Sexe :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={sexe}
            onChange={e => setSexe(e.target.value)}
          >
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
        </label>
        <label>
          Poids (kg) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={poids}
            onChange={e => setPoids(e.target.value)}
            required
          />
        </label>
        <label>
          Nombre de verres standards (1 verre ≈ 10g d’alcool pur) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={verres}
            onChange={e => setVerres(e.target.value)}
            required
          />
        </label>
        <label>
          Heures écoulées depuis la consommation :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={heures}
            onChange={e => setHeures(e.target.value)}
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
            <>
              <span className="text-lg font-bold">
                {result.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} g/L
              </span>
              <br />
              <span className="text-xs text-red-700 dark:text-red-300 font-bold">
                Ne prenez jamais le volant après avoir bu, même si ce taux semble faible.
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Estimation alcoolémie
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