"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que le ratio taille/hanche (WHR) ?",
    answer:
      "Le WHR (Waist-to-Hip Ratio) est le rapport entre le tour de taille et le tour de hanches. Il permet d’évaluer la répartition des graisses corporelles.",
  },
  {
    question: "Comment mesurer correctement la taille et les hanches ?",
    answer:
      "Mesurez la taille au niveau le plus étroit (généralement juste au-dessus du nombril) et les hanches à l’endroit le plus large des fesses.",
  },
  {
    question: "Quels sont les seuils de risque ?",
    answer:
      "Un WHR supérieur à 0,90 chez l’homme ou 0,85 chez la femme indique un risque accru de maladies cardiovasculaires.",
  },
];

function interpretWHR(whr: number, sexe: string) {
  if (sexe === "femme") {
    if (whr <= 0.85) return "Risque faible";
    return "Risque accru";
  } else {
    if (whr <= 0.90) return "Risque faible";
    return "Risque accru";
  }
}

export default function WhrPage() {
  const [taille, setTaille] = useState("");
  const [hanche, setHanche] = useState("");
  const [sexe, setSexe] = useState("femme");
  const [result, setResult] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const t = parseFloat(taille.replace(",", "."));
    const h = parseFloat(hanche.replace(",", "."));
    if (isNaN(t) || t <= 0 || isNaN(h) || h <= 0) {
      setResult(null);
      setInterpretation(null);
      setError("Veuillez saisir des mesures valides.");
      return;
    }
    const whr = t / h;
    setResult(whr);
    setInterpretation(interpretWHR(whr, sexe));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de ratio taille/hanche (WHR)
      </h1>
      <p className="mb-8">
        Calculez votre ratio taille/hanche (WHR) pour évaluer la répartition de votre masse grasse et le risque cardiovasculaire associé.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un avis médical.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Tour de taille (cm) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={taille}
            onChange={e => setTaille(e.target.value)}
            required
          />
        </label>
        <label>
          Tour de hanches (cm) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={hanche}
            onChange={e => setHanche(e.target.value)}
            required
          />
        </label>
        <label>
          Sexe :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={sexe}
            onChange={e => setSexe(e.target.value)}
          >
            <option value="femme">Femme</option>
            <option value="homme">Homme</option>
          </select>
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
                {result.toLocaleString("fr-FR", { maximumFractionDigits: 3 })}
              </span>
              <br />
              <span className="text-md">
                {interpretation}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Ratio taille/hanche (WHR)
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