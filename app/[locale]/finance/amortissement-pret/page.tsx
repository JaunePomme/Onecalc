"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Comment est calculé le tableau d’amortissement ?",
    answer:
      "Le tableau d’amortissement est calculé selon la méthode classique : chaque échéance comprend une part d’intérêts et une part de capital, recalculées à chaque remboursement anticipé.",
  },
  {
    question: "Peut-on simuler plusieurs remboursements anticipés ?",
    answer:
      "Oui, vous pouvez ajouter plusieurs remboursements anticipés à différentes dates pour voir leur impact sur la durée et le coût total du prêt.",
  },
  {
    question: "Quel est l’impact d’un remboursement anticipé ?",
    answer:
      "Un remboursement anticipé réduit le capital restant dû : il peut raccourcir la durée du prêt ou diminuer la mensualité, selon l’option choisie.",
  },
];

function calculerAmortissement(
  montant: number,
  taux: number,
  duree: number,
  assurance: number,
  remboursements: { mois: number; montant: number }[]
) {
  const mensualiteHorsAss = montant * (taux / 12) / (1 - Math.pow(1 + taux / 12, -duree * 12));
  let capitalRestant = montant;
  let tableau: any[] = [];
  let totalInterets = 0;
  let totalAssurance = 0;
  let mois = 1;
  let remboursementsIndex = 0;

  while (capitalRestant > 0.01 && mois <= duree * 12 + 100) {
    // Remboursement anticipé ce mois-ci ?
    if (
      remboursementsIndex < remboursements.length &&
      remboursements[remboursementsIndex].mois === mois
    ) {
      capitalRestant -= remboursements[remboursementsIndex].montant;
      remboursementsIndex++;
      if (capitalRestant < 0) capitalRestant = 0;
    }

    const interet = capitalRestant * (taux / 12);
    let capital = mensualiteHorsAss - interet;
    if (capital > capitalRestant) capital = capitalRestant;
    capitalRestant -= capital;
    const ass = assurance;
    totalInterets += interet;
    totalAssurance += ass;

    tableau.push({
      mois,
      mensualite: mensualiteHorsAss + ass,
      interet,
      capital,
      assurance: ass,
      capitalRestant: Math.max(0, capitalRestant),
    });

    if (capitalRestant <= 0.01) break;
    mois++;
  }

  return {
    tableau,
    totalInterets,
    totalAssurance,
    dureeReelle: mois,
  };
}

export default function AmortissementPret() {
  const [montant, setMontant] = useState("");
  const [taux, setTaux] = useState("");
  const [duree, setDuree] = useState("");
  const [assurance, setAssurance] = useState("");
  const [remboursements, setRemboursements] = useState<{ mois: number; montant: number }[]>([]);
  const [moisRemb, setMoisRemb] = useState("");
  const [montantRemb, setMontantRemb] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleAddRemboursement = () => {
    const mois = parseInt(moisRemb, 10);
    const montant = parseFloat(montantRemb.replace(",", "."));
    if (!isNaN(mois) && mois > 0 && !isNaN(montant) && montant > 0) {
      setRemboursements([...remboursements, { mois, montant }].sort((a, b) => a.mois - b.mois));
      setMoisRemb("");
      setMontantRemb("");
    }
  };

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const m = parseFloat(montant.replace(",", "."));
    const t = parseFloat(taux.replace(",", ".")) / 100;
    const d = parseInt(duree, 10);
    const a = parseFloat(assurance.replace(",", ".")) || 0;
    if (isNaN(m) || isNaN(t) || isNaN(d) || m <= 0 || t < 0 || d <= 0) {
      setResult(null);
      return;
    }
    setResult(calculerAmortissement(m, t, d, a, remboursements));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Tableau d’amortissement et impact des remboursements anticipés
      </h1>
      <p className="mb-8">
        Simulez votre prêt, visualisez le tableau d’amortissement et l’impact de remboursements anticipés.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un conseil financier.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Montant du prêt (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={montant}
            onChange={e => setMontant(e.target.value)}
            required
          />
        </label>
        <label>
          Taux annuel (%) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={taux}
            onChange={e => setTaux(e.target.value)}
            required
          />
        </label>
        <label>
          Durée (années) :
          <input
            type="number"
            min="1"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={duree}
            onChange={e => setDuree(e.target.value)}
            required
          />
        </label>
        <label>
          Assurance mensuelle (€) (optionnel) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={assurance}
            onChange={e => setAssurance(e.target.value)}
          />
        </label>
        <div className="flex flex-col md:flex-row gap-2 items-end">
          <div className="flex-1">
            <label>
              Mois du remboursement anticipé :
              <input
                type="number"
                min="1"
                step="1"
                className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
                value={moisRemb}
                onChange={e => setMoisRemb(e.target.value)}
                placeholder="ex: 24"
              />
            </label>
          </div>
          <div className="flex-1">
            <label>
              Montant du remboursement anticipé (€) :
              <input
                type="number"
                min="0"
                step="any"
                className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
                value={montantRemb}
                onChange={e => setMontantRemb(e.target.value)}
                placeholder="ex: 5000"
              />
            </label>
          </div>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleAddRemboursement}
          >
            Ajouter remboursement anticipé
          </button>
        </div>
        {remboursements.length > 0 && (
          <div className="text-sm text-gray-700 dark:text-gray-200 mt-2">
            <strong>Remboursements anticipés :</strong>{" "}
            {remboursements.map((r, i) => (
              <span key={i} className="inline-block mr-2">
                Mois {r.mois} : {r.montant} €
              </span>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Calculer
        </button>
      </form>

      {result && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Résumé</h2>
          <div className="mb-2">
            <strong>Durée réelle :</strong> {result.dureeReelle} mois
          </div>
          <div className="mb-2">
            <strong>Total intérêts :</strong> {result.totalInterets.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €
          </div>
          <div className="mb-2">
            <strong>Total assurance :</strong> {result.totalAssurance.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-xs border">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-2 border">Mois</th>
                  <th className="p-2 border">Mensualité (€)</th>
                  <th className="p-2 border">Intérêts</th>
                  <th className="p-2 border">Capital remboursé</th>
                  <th className="p-2 border">Assurance</th>
                  <th className="p-2 border">Capital restant</th>
                </tr>
              </thead>
              <tbody>
                {result.tableau.map((row: any) => (
                  <tr key={row.mois} className={row.capitalRestant === 0 ? "bg-green-50 dark:bg-green-900" : ""}>
                    <td className="p-2 border">{row.mois}</td>
                    <td className="p-2 border">{row.mensualite.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border">{row.interet.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border">{row.capital.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border">{row.assurance.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border">{row.capitalRestant.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Amortissement et remboursements anticipés
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