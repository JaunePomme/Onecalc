"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Comment est calculée la valeur future ou passée ?",
    answer:
      "La valeur future est calculée en appliquant le taux d’inflation composé sur la période choisie. La formule utilisée est : valeur future = valeur actuelle × (1 + inflation) ^ nombre d’années.",
  },
  {
    question: "Le taux d’inflation doit-il être annuel ?",
    answer:
      "Oui, le taux d’inflation est exprimé en pourcentage annuel moyen.",
  },
  {
    question: "Peut-on calculer la valeur passée à partir d’une valeur future ?",
    answer:
      "Oui, il suffit d’indiquer une valeur future et de calculer la valeur équivalente aujourd’hui en utilisant la même formule inversée.",
  },
];

function calcFutureValue({
  valeur,
  inflation,
  annees,
}: {
  valeur: number;
  inflation: number;
  annees: number;
}) {
  return valeur * Math.pow(1 + inflation / 100, annees);
}

function calcPresentValue({
  valeur,
  inflation,
  annees,
}: {
  valeur: number;
  inflation: number;
  annees: number;
}) {
  return valeur / Math.pow(1 + inflation / 100, annees);
}

export default function ImpactInflation() {
  const [mode, setMode] = useState<"future" | "present">("future");
  const [valeur, setValeur] = useState("");
  const [inflation, setInflation] = useState("");
  const [annees, setAnnees] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = parseFloat(valeur.replace(",", "."));
    const i = parseFloat(inflation.replace(",", "."));
    const a = parseFloat(annees.replace(",", "."));
    if (isNaN(v) || v <= 0) {
      setResult(null);
      setError("Veuillez saisir une valeur valide.");
      return;
    }
    if (isNaN(i)) {
      setResult(null);
      setError("Veuillez saisir un taux d’inflation valide.");
      return;
    }
    if (isNaN(a) || a <= 0) {
      setResult(null);
      setError("Veuillez saisir un nombre d’années valide.");
      return;
    }
    if (mode === "future") {
      setResult(calcFutureValue({ valeur: v, inflation: i, annees: a }));
    } else {
      setResult(calcPresentValue({ valeur: v, inflation: i, annees: a }));
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Impact de l’inflation : valeur d’aujourd’hui vs futur
      </h1>
      <p className="mb-8">
        Calculez la valeur future ou passée d’une somme en tenant compte de l’inflation annuelle moyenne.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas une analyse financière professionnelle.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="future"
              checked={mode === "future"}
              onChange={() => setMode("future")}
            />
            Calculer la valeur future
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="present"
              checked={mode === "present"}
              onChange={() => setMode("present")}
            />
            Calculer la valeur actuelle
          </label>
        </div>
        <label>
          {mode === "future"
            ? "Valeur aujourd’hui (€) :"
            : "Valeur future (€) :"}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={valeur}
            onChange={e => setValeur(e.target.value)}
            required
          />
        </label>
        <label>
          Taux d’inflation annuel moyen (%) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={inflation}
            onChange={e => setInflation(e.target.value)}
            required
          />
        </label>
        <label>
          Nombre d’années :
          <input
            type="number"
            min="1"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={annees}
            onChange={e => setAnnees(e.target.value)}
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
                {result.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €
              </span>
              <br />
              <span className="text-xs text-gray-500">
                {mode === "future"
                  ? "Valeur équivalente dans " + annees + " an(s)"
                  : "Valeur équivalente aujourd’hui"}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Impact de l’inflation
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