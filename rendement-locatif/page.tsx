"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que le rendement locatif ?",
    answer:
      "Le rendement locatif mesure la rentabilité brute ou nette d’un investissement immobilier, en rapportant les loyers perçus au prix d’achat et aux frais.",
  },
  {
    question: "Comment calculer le cash-on-cash ?",
    answer:
      "Le cash-on-cash compare le cash réellement investi (apport, frais, etc.) au cash généré chaque année (revenu net avant impôt).",
  },
  {
    question: "Quels frais prendre en compte ?",
    answer:
      "Pour un calcul précis, incluez tous les frais : notaire, agence, travaux, charges, taxe foncière, assurance, etc.",
  },
];

function calcRendement({
  loyerAnnuel,
  prixAchat,
  fraisAnnexes,
  chargesAnnuelles,
  apport,
}: {
  loyerAnnuel: number;
  prixAchat: number;
  fraisAnnexes: number;
  chargesAnnuelles: number;
  apport: number;
}) {
  const coutTotal = prixAchat + fraisAnnexes;
  const rendementBrut = (loyerAnnuel / coutTotal) * 100;
  const rendementNet = ((loyerAnnuel - chargesAnnuelles) / coutTotal) * 100;
  const cashOnCash =
    apport > 0 ? ((loyerAnnuel - chargesAnnuelles) / apport) * 100 : null;
  return { rendementBrut, rendementNet, cashOnCash };
}

export default function RendementLocatif() {
  const [loyer, setLoyer] = useState("");
  const [prix, setPrix] = useState("");
  const [frais, setFrais] = useState("");
  const [charges, setCharges] = useState("");
  const [apport, setApport] = useState("");
  const [result, setResult] = useState<{
    rendementBrut: number;
    rendementNet: number;
    cashOnCash: number | null;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseFloat(loyer.replace(",", ".")) * 12;
    const p = parseFloat(prix.replace(",", "."));
    const f = parseFloat(frais.replace(",", ".")) || 0;
    const c = parseFloat(charges.replace(",", ".")) || 0;
    const a = parseFloat(apport.replace(",", ".")) || 0;
    if (isNaN(l) || isNaN(p) || l <= 0 || p <= 0) {
      setResult(null);
      return;
    }
    setResult(calcRendement({ loyerAnnuel: l, prixAchat: p, fraisAnnexes: f, chargesAnnuelles: c, apport: a }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de rendement locatif / cash-on-cash
      </h1>
      <p className="mb-8">
        Estimez la rentabilité de votre investissement immobilier, brut, net et cash-on-cash.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas une analyse professionnelle.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Loyer mensuel (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={loyer}
            onChange={e => setLoyer(e.target.value)}
            required
          />
        </label>
        <label>
          Prix d’achat (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={prix}
            onChange={e => setPrix(e.target.value)}
            required
          />
        </label>
        <label>
          Frais annexes (€) (notaire, agence, travaux…) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={frais}
            onChange={e => setFrais(e.target.value)}
          />
        </label>
        <label>
          Charges annuelles (€) (taxe foncière, assurance, etc.) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={charges}
            onChange={e => setCharges(e.target.value)}
          />
        </label>
        <label>
          Apport personnel (€) (pour cash-on-cash, optionnel) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={apport}
            onChange={e => setApport(e.target.value)}
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
          {result ? (
            <>
              <span className="text-lg font-bold">
                Rendement brut : {result.rendementBrut.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} %
              </span>
              <br />
              <span className="text-lg font-bold">
                Rendement net : {result.rendementNet.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} %
              </span>
              <br />
              <span className="text-lg font-bold">
                Cash-on-cash : {result.cashOnCash !== null ? result.cashOnCash.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " %" : "--"}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Rendement locatif / cash-on-cash
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