"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Comment est calculé le montant à épargner chaque mois ?",
    answer:
      "Le calcul prend en compte le capital de départ, l’objectif à atteindre, la durée (en mois) et le taux d’intérêt annuel (capitalisation mensuelle).",
  },
  {
    question: "Le taux d’intérêt est-il obligatoire ?",
    answer:
      "Non, si vous laissez le taux à 0, le calcul sera purement arithmétique (pas d’intérêts composés).",
  },
  {
    question: "Peut-on choisir une date future précise ?",
    answer:
      "Oui, la durée est automatiquement calculée entre aujourd’hui et la date cible choisie.",
  },
];

function monthsBetween(date1: Date, date2: Date) {
  return (
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    (date2.getMonth() - date1.getMonth()) +
    (date2.getDate() >= date1.getDate() ? 0 : -1)
  );
}

// Formule d'une suite géométrique pour épargne mensuelle avec intérêts composés
function calculerEpargneMensuelle({
  objectif,
  capitalInitial,
  tauxAnnuel,
  nbMois,
}: {
  objectif: number;
  capitalInitial: number;
  tauxAnnuel: number;
  nbMois: number;
}) {
  if (nbMois <= 0) return null;
  const r = tauxAnnuel > 0 ? tauxAnnuel / 12 / 100 : 0;
  if (r === 0) {
    // Pas d'intérêt
    return (objectif - capitalInitial) / nbMois;
  }
  // Avec intérêts composés
  const num = objectif - capitalInitial * Math.pow(1 + r, nbMois);
  const denom = (Math.pow(1 + r, nbMois) - 1) / r;
  return num / denom;
}

export default function ObjectifEpargne() {
  const [objectif, setObjectif] = useState("");
  const [capital, setCapital] = useState("");
  const [taux, setTaux] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [nbMois, setNbMois] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const obj = parseFloat(objectif.replace(",", "."));
    const cap = parseFloat(capital.replace(",", ".")) || 0;
    const tauxAnnuel = parseFloat(taux.replace(",", ".")) || 0;
    if (isNaN(obj) || obj <= 0) {
      setResult(null);
      setError("Veuillez saisir un objectif valide.");
      return;
    }
    if (date === "") {
      setResult(null);
      setError("Veuillez choisir une date cible.");
      return;
    }
    const now = new Date();
    const cible = new Date(date);
    const mois = monthsBetween(now, cible);
    setNbMois(mois);
    if (mois <= 0) {
      setResult(null);
      setError("La date cible doit être dans le futur.");
      return;
    }
    const mensualite = calculerEpargneMensuelle({
      objectif: obj,
      capitalInitial: cap,
      tauxAnnuel,
      nbMois: mois,
    });
    if (mensualite === null || !isFinite(mensualite)) {
      setResult(null);
      setError("Impossible de calculer avec ces paramètres.");
      return;
    }
    setResult(mensualite);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Objectif épargne : combien épargner par mois ?
      </h1>
      <p className="mb-8">
        Calculez le montant à épargner chaque mois pour atteindre votre objectif à une date donnée, avec ou sans intérêts.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un conseil financier.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Objectif à atteindre (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={objectif}
            onChange={e => setObjectif(e.target.value)}
            required
          />
        </label>
        <label>
          Capital de départ (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={capital}
            onChange={e => setCapital(e.target.value)}
          />
        </label>
        <label>
          Taux d’intérêt annuel (%) (optionnel) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={taux}
            onChange={e => setTaux(e.target.value)}
            placeholder="0"
          />
        </label>
        <label>
          Date cible :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={date}
            onChange={e => setDate(e.target.value)}
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
          ) : result !== null && nbMois !== null ? (
            <>
              <span className="text-lg font-bold">
                {result.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} € / mois
              </span>
              <br />
              <span className="text-xs text-gray-500">
                sur {nbMois} mois
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Objectif épargne
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