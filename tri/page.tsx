"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que le TRI (IRR) ?",
    answer:
      "Le Taux de Rendement Interne (TRI ou IRR en anglais) est le taux qui annule la valeur actuelle nette (VAN) d’une série de flux de trésorerie. Il permet d’évaluer la rentabilité d’un investissement.",
  },
  {
    question: "Comment saisir les flux ?",
    answer:
      "Indiquez le montant investi (négatif) puis les flux de retour (positifs ou négatifs) pour chaque période, séparés par des virgules. Exemple : -1000, 200, 300, 400, 500.",
  },
  {
    question: "Quelle convention de périodicité ?",
    answer:
      "Chaque flux correspond à une période (année, trimestre, mois…). Le TRI est calculé sur cette base.",
  },
];

function irr(cashflows: number[], guess = 0.1): number | null {
  // Newton-Raphson method
  let rate = guess;
  for (let iter = 0; iter < 1000; iter++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cashflows.length; t++) {
      npv += cashflows[t] / Math.pow(1 + rate, t);
      if (t > 0) {
        dnpv -= t * cashflows[t] / Math.pow(1 + rate, t + 1);
      }
    }
    if (Math.abs(npv) < 1e-7) return rate;
    if (dnpv === 0) return null;
    rate = rate - npv / dnpv;
    if (rate < -0.9999) return null;
  }
  return null;
}

export default function TriPage() {
  const [flux, setFlux] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parts = flux
      .split(",")
      .map((s) => parseFloat(s.replace(",", ".").trim()))
      .filter((v) => !isNaN(v));
    if (parts.length < 2) {
      setResult(null);
      setError("Veuillez saisir au moins deux flux (investissement et retours).");
      return;
    }
    const r = irr(parts);
    if (r === null || isNaN(r)) {
      setResult(null);
      setError("Impossible de calculer le TRI avec ces flux.");
    } else {
      setResult(r);
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
        Calculateur de TRI / IRR (simple)
      </h1>
      <p className="mb-8">
        Calculez le Taux de Rendement Interne (TRI/IRR) d’un investissement à partir de vos flux de trésorerie.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas une analyse financière professionnelle.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Flux de trésorerie (séparés par des virgules) :
          <input
            type="text"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800 font-mono"
            value={flux}
            onChange={e => setFlux(e.target.value)}
            placeholder="-1000, 200, 300, 400, 500"
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
                {(result * 100).toLocaleString("fr-FR", { maximumFractionDigits: 4 })} %
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Calcul du TRI / IRR
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