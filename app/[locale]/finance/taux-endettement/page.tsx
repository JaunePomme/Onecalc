"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Bon taux d’endettement ?",
    answer:
      "Un bon taux d’endettement se situe généralement en dessous de 33 %. Ce seuil est souvent utilisé par les banques pour accorder un crédit, mais il peut varier selon votre situation et l’établissement prêteur.",
  },
  {
    question: "Quelles charges inclure ?",
    answer:
      "Il faut inclure toutes les charges récurrentes : mensualités de crédits (immobilier, auto, consommation), pensions alimentaires, loyers, et autres engagements financiers réguliers. Plus l’estimation est précise, plus le calcul sera fiable.",
  },
  {
    question: "Comment améliorer son taux d’endettement ?",
    answer:
      "Pour améliorer votre taux d’endettement, vous pouvez augmenter vos revenus, rembourser certains crédits, ou regrouper vos prêts pour réduire vos mensualités. Une gestion rigoureuse de vos finances aide aussi à optimiser ce taux.",
  },
];

export default function Endettement() {
  const [revenus, setRevenus] = useState("");
  const [chargesCredit, setChargesCredit] = useState("");
  const [autresCharges, setAutresCharges] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const r = parseFloat(revenus.replace(",", "."));
    const c = parseFloat(chargesCredit.replace(",", "."));
    const autres = parseFloat(autresCharges.replace(",", "."));
    if (!isNaN(r) && r > 0 && !isNaN(c) && !isNaN(autres)) {
      setResult(((c + autres) / r) * 100);
    } else {
      setResult(null);
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
        Calculez votre taux d’endettement simplement
      </h1>
      <p className="mb-8">
        Estimez votre taux d’endettement pour mieux préparer votre dossier de crédit ou suivre votre équilibre financier.
      </p>

      {/* Disclaimer placé juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Seuils indicatifs ; dépend des banques.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label className="hidden">
          Menu principal
          <input type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Revenus nets mensuels (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={revenus}
            onChange={(e) => setRevenus(e.target.value)}
            required
          />
        </label>
        <label>
          Charges crédit (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={chargesCredit}
            onChange={(e) => setChargesCredit(e.target.value)}
            required
          />
        </label>
        <label>
          Autres charges (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={autresCharges}
            onChange={(e) => setAutresCharges(e.target.value)}
            required
          />
        </label>
        <div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          ⚠️ Les résultats sont donnés à titre indicatif.
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
          Taux d’endettement :{" "}
          <span className="text-lg font-bold">
            {result !== null ? `${result.toFixed(2)} %` : "-- %"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment calculer le taux d’endettement&nbsp;?
        </h2>
        <p>
          Le taux d’endettement permet de mesurer la part de vos revenus consacrée au remboursement de vos crédits et autres charges fixes. Il est un indicateur clé pour les banques lors d’une demande de prêt.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Formule de calcul
        </h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Taux d’endettement = (Charges crédit + Autres charges) / Revenus nets mensuels × 100
        </div>
        <p>
          Exemple : Revenus = 3 000 €, Charges crédit = 700 €, Autres charges = 200 €
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Taux = (700 + 200) / 3 000 × 100 = 30 %
        </div>
        <p>
          Dans cet exemple, le taux d’endettement est de 30 %.
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur le taux d’endettement
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