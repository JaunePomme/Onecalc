"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Quelles moyennes puis-je calculer ici ?",
    answer:
      "Vous pouvez calculer la moyenne arithmétique simple, la moyenne pondérée, la moyenne géométrique, la médiane et l’écart-type d’une série de valeurs.",
  },
  {
    question: "Comment saisir les valeurs et les poids ?",
    answer:
      "Entrez les valeurs séparées par des virgules. Pour la moyenne pondérée, saisissez aussi les poids correspondants, séparés par des virgules.",
  },
  {
    question: "À quoi servent ces différents indicateurs ?",
    answer:
      "Ils permettent de résumer une série de données : la moyenne arithmétique donne la tendance centrale, la géométrique est utile pour des taux, la médiane pour la valeur centrale, l’écart-type pour la dispersion.",
  },
];

function mean(arr: number[]) {
  if (arr.length === 0) return null;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function weightedMean(arr: number[], weights: number[]) {
  if (arr.length === 0 || arr.length !== weights.length) return null;
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return null;
  return arr.reduce((sum, v, i) => sum + v * weights[i], 0) / totalWeight;
}

function geometricMean(arr: number[]) {
  if (arr.length === 0 || arr.some(v => v <= 0)) return null;
  return Math.pow(arr.reduce((a, b) => a * b, 1), 1 / arr.length);
}

function median(arr: number[]) {
  if (arr.length === 0) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function stddev(arr: number[]) {
  if (arr.length === 0) return null;
  const m = mean(arr)!;
  return Math.sqrt(arr.reduce((sum, v) => sum + (v - m) ** 2, 0) / arr.length);
}

export default function MoyennesPage() {
  const [valeurs, setValeurs] = useState("");
  const [poids, setPoids] = useState("");
  const [result, setResult] = useState<{
    mean: number | null;
    weighted: number | null;
    geometric: number | null;
    median: number | null;
    stddev: number | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const vals = valeurs
      .split(",")
      .map(s => parseFloat(s.replace(",", ".").trim()))
      .filter(v => !isNaN(v));
    if (vals.length === 0) {
      setResult(null);
      setError("Veuillez saisir au moins une valeur.");
      return;
    }
    let weights: number[] = [];
    if (poids.trim() !== "") {
      weights = poids
        .split(",")
        .map(s => parseFloat(s.replace(",", ".").trim()))
        .filter(v => !isNaN(v));
      if (weights.length !== vals.length) {
        setResult(null);
        setError("Le nombre de poids doit correspondre au nombre de valeurs.");
        return;
      }
    }
    setResult({
      mean: mean(vals),
      weighted: weights.length > 0 ? weightedMean(vals, weights) : null,
      geometric: geometricMean(vals),
      median: median(vals),
      stddev: stddev(vals),
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
        Moyennes et écart-type (simple)
      </h1>
      <p className="mb-8">
        Calculez la moyenne simple, pondérée, géométrique, la médiane et l’écart-type d’une série de valeurs numériques.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas une analyse statistique professionnelle.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Valeurs (séparées par des virgules) :
          <input
            type="text"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800 font-mono"
            value={valeurs}
            onChange={e => setValeurs(e.target.value)}
            placeholder="ex: 2, 4, 6, 8"
            required
          />
        </label>
        <label>
          Poids (pour moyenne pondérée, optionnel) :
          <input
            type="text"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800 font-mono"
            value={poids}
            onChange={e => setPoids(e.target.value)}
            placeholder="ex: 1, 2, 1, 1"
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
            <div className="space-y-1">
              <span>
                <strong>Moyenne simple :</strong>{" "}
                {result.mean !== null
                  ? result.mean.toLocaleString("fr-FR", { maximumFractionDigits: 4 })
                  : "--"}
              </span>
              <br />
              <span>
                <strong>Moyenne pondérée :</strong>{" "}
                {result.weighted !== null
                  ? result.weighted.toLocaleString("fr-FR", { maximumFractionDigits: 4 })
                  : "--"}
              </span>
              <br />
              <span>
                <strong>Moyenne géométrique :</strong>{" "}
                {result.geometric !== null
                  ? result.geometric.toLocaleString("fr-FR", { maximumFractionDigits: 4 })
                  : "--"}
              </span>
              <br />
              <span>
                <strong>Médiane :</strong>{" "}
                {result.median !== null
                  ? result.median.toLocaleString("fr-FR", { maximumFractionDigits: 4 })
                  : "--"}
              </span>
              <br />
              <span>
                <strong>Écart-type :</strong>{" "}
                {result.stddev !== null
                  ? result.stddev.toLocaleString("fr-FR", { maximumFractionDigits: 4 })
                  : "--"}
              </span>
            </div>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Moyennes et écart-type
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