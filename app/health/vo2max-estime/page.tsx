"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que la VO2max ?",
    answer:
      "La VO2max est la consommation maximale d’oxygène lors d’un effort intense. Elle reflète la capacité aérobie et l’endurance d’un individu.",
  },
  {
    question: "Comment est-elle estimée ici ?",
    answer:
      "L’estimation se base sur votre temps sur 5 km ou 10 km, selon des formules issues de la littérature sportive (ex : Daniels & Gilbert, 1979).",
  },
  {
    question: "Ce résultat est-il fiable ?",
    answer:
      "C’est une estimation indicative : la VO2max réelle nécessite un test en laboratoire.",
  },
];

// Formule de Daniels & Gilbert (1979) adaptée pour 5 km et 10 km
function estimateVO2max(distance: number, timeMinutes: number) {
  // distance en mètres, temps en minutes
  const vitesse = distance / (timeMinutes * 60); // m/s
  // VO2max ≈ (vitesse m/s × 3.5) + 3.5
  // Mais Daniels propose : VO2max = (0.182 * vitesse + 0.9) * vitesse + 3.5
  // Pour une estimation simple :
  return (0.182 * vitesse + 0.9) * vitesse + 3.5;
}

export default function Vo2maxEstimPage() {
  const [distance, setDistance] = useState("5000");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const dist = parseInt(distance, 10);
    const min = parseInt(minutes, 10);
    const sec = parseInt(seconds, 10);
    if (![5000, 10000].includes(dist)) {
      setResult(null);
      setError("Veuillez choisir 5 km ou 10 km.");
      return;
    }
    if (isNaN(min) || min < 0 || isNaN(sec) || sec < 0 || sec >= 60) {
      setResult(null);
      setError("Veuillez saisir un temps valide.");
      return;
    }
    const totalMin = min + sec / 60;
    if (totalMin <= 0) {
      setResult(null);
      setError("Le temps doit être supérieur à zéro.");
      return;
    }
    setResult(estimateVO2max(dist, totalMin));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Estimation VO2max à partir d’un temps sur 5 km / 10 km
      </h1>
      <p className="mb-8">
        Estimez votre VO2max à partir de votre temps sur 5 km ou 10 km (méthode indicative, non médicale).
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Estimation indicative, ne remplace pas un test en laboratoire.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Distance :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            required
          >
            <option value="5000">5 km</option>
            <option value="10000">10 km</option>
          </select>
        </label>
        <div className="flex gap-2">
          <label className="flex-1">
            Minutes :
            <input
              type="number"
              min="0"
              step="1"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              required
            />
          </label>
          <label className="flex-1">
            Secondes :
            <input
              type="number"
              min="0"
              max="59"
              step="1"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Estimer
        </button>
        <div className="mt-2">
          <span className="font-semibold">Résultat :</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null ? (
            <>
              <span className="text-lg font-bold">
                {result.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} ml/kg/min
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Estimation VO2max
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