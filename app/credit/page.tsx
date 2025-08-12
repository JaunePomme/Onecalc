"use client";
import { useState } from "react";

const faqData = [
  {
    question: "À quoi sert le simulateur de coût de crédit ?",
    answer:
      "Le simulateur de coût de crédit vous aide à estimer le coût total de votre emprunt, incluant les intérêts et l’assurance, afin de mieux anticiper le montant total à rembourser.",
  },
  {
    question: "Que dois-je renseigner pour faire une simulation ?",
    answer:
      "Indiquez le montant emprunté, le taux d’intérêt annuel, la durée du crédit en années et, si nécessaire, le taux de votre assurance emprunteur.",
  },
  {
    question: "Mes données sont-elles sauvegardées ?",
    answer:
      "Non, le simulateur ne conserve pas vos données. Aucune information personnelle n’est enregistrée. Pensez à noter vos résultats si vous souhaitez les garder.",
  },
  {
    question: "Comment lire les résultats du simulateur ?",
    answer:
      "Le simulateur affiche le coût total du crédit (intérêts + assurance) ainsi que le montant total à rembourser (capital emprunté + coût du crédit). Cela vous permet de comparer différentes options d’emprunt.",
  },
];

export default function CoutCredit() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [insurance, setInsurance] = useState("");
  const [cost, setCost] = useState<null | number>(null);
  const [total, setTotal] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const capital = parseFloat(amount.replace(",", "."));
    const tauxAnnuel = parseFloat(rate.replace(",", ".")) / 100;
    const duree = parseFloat(years.replace(",", "."));
    const tauxAssurance = parseFloat(insurance.replace(",", ".")) / 100 || 0;
    const n = duree * 12;
    const tauxMensuel = tauxAnnuel / 12;

    if (!isNaN(capital) && !isNaN(tauxMensuel) && !isNaN(n) && n > 0) {
      const mensualite =
        tauxMensuel === 0
          ? capital / n
          : (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -n));
      const totalMensualites = mensualite * n;
      const coutAssurance = capital * tauxAssurance * duree;
      const coutTotal = totalMensualites + coutAssurance - capital;
      const montantTotal = capital + coutTotal;
      setCost(coutTotal);
      setTotal(montantTotal);
    } else {
      setCost(null);
      setTotal(null);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">Calculez le coût total de votre crédit en quelques clics</h1>
      <p className="mb-8">
        Estimez le coût total de votre emprunt en quelques clics.
      </p>

      <form onSubmit={handleCalc} className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow">
        <label className="hidden">
          Menu principal
          <input type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Montant emprunté (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Taux d'intérêt annuel (%) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={rate}
            onChange={e => setRate(e.target.value)}
            required
          />
        </label>
        <label>
          Durée (années) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={years}
            onChange={e => setYears(e.target.value)}
            required
          />
        </label>
        <label>
          Assurance annuelle (%) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={insurance}
            onChange={e => setInsurance(e.target.value)}
            placeholder="0"
          />
        </label>
        <div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          ⚠️ Les résultats sont donnés à titre indicatif. <a href="#faq" className="underline">En savoir plus</a>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Calculer
        </button>
        <div className="mt-2">
          <span className="font-semibold">Résultat :</span><br />
          Coût total du crédit :{" "}
          <span className="text-lg font-bold">
            {cost !== null ? `${cost.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €` : "-- €"}
          </span>
        </div>
        <div className="mt-2">
          Montant total à rembourser (emprunt + intérêts + assurance) :{" "}
          <span className="text-lg font-bold">
            {total !== null ? `${total.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €` : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Qu'est-ce que le simulateur de coût du crédit ?</h2>
        <p>
          Le simulateur de coût du crédit vous permet d'estimer le coût total de votre emprunt en fonction du montant emprunté, du taux d'intérêt, de la durée de l'emprunt et de l'assurance. Il vous aide à mieux comprendre l'impact de votre crédit sur vos finances à long terme.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Comment fonctionne le simulateur de coût du crédit ?</h3>
        <p>
          Le simulateur utilise une formule simple pour estimer le coût total de votre crédit en fonction du montant emprunté, du taux d'intérêt, de la durée du crédit et de l'assurance. Le calcul se fait ainsi :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Coût total du crédit = (Montant emprunté * Taux d'intérêt annuel / 12) / (1 - (1 + Taux d'intérêt annuel / 12)^(-Durée * 12))<br />
          Coût total = Montant des mensualités * Nombre de mensualités
        </div>
        <p>
          Ensuite, le coût total de l'assurance est ajouté. Ce calcul est effectué comme suit :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Coût total de l'assurance = Montant emprunté * Taux d'assurance annuel * Durée du crédit
        </div>
        <p className="mb-1">Exemple :</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Coût des mensualités = (10 000 * 5% / 12) / (1 - (1 + 5% / 12)^(-10 * 12)) = 106,07 € (mensualité)<br />
          Coût total = 106,07 * 120 = 12 728,40 €<br />
          Coût de l'assurance = 10 000 * 0,5% * 10 = 500 €<br />
          Coût total à rembourser = 12 728,40 € + 500 € = 13 228,40 €
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">À quoi sert le simulateur de coût du crédit ?</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Estimation des dépenses de crédit :</strong> Il vous aide à estimer vos coûts de crédit annuels et à mieux planifier vos finances.</li>
          <li><strong>Visualisation de l'impact de votre crédit :</strong> Vous pouvez ajuster le montant emprunté, le taux d'intérêt ou la durée du crédit pour observer comment cela affecte vos paiements mensuels et le coût total.</li>
          <li><strong>Aide à la réduction des coûts :</strong> Ce simulateur vous permet de comparer différentes options de crédit et d'optimiser votre emprunt en fonction de votre budget.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Comment réduire le coût de votre crédit ?</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Réduire la durée du crédit :</strong> Plus la durée est courte, plus vous remboursez rapidement et moins vous payez d'intérêts.</li>
          <li><strong>Choisir un taux d'intérêt plus bas :</strong> Comparez les offres de différents prêteurs pour obtenir un taux d'intérêt plus avantageux.</li>
          <li><strong>Opter pour une assurance moins chère :</strong> Vérifiez si vous pouvez trouver une meilleure offre d'assurance emprunteur qui réduit le coût total.</li>
          <li><strong>Rembourser par anticipation :</strong> Si vous avez la possibilité, remboursez une partie de votre crédit plus tôt pour réduire le montant total des intérêts.</li>
        </ul>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">FAQ - Questions fréquentes sur le simulateur de coût de crédit</h2>
        <div className="flex flex-col gap-2">
          {faqData.map((item, idx) => (
            <div key={idx} className="border rounded bg-gray-50 dark:bg-gray-900">
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                {item.question}
                <span className="ml-2">{openFaq === idx ? "▲" : "▼"}</span>
              </button>
              {openFaq === idx && (
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