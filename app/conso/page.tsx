"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce qu’un crédit à la consommation ?",
    answer:
      "Un crédit à la consommation est un prêt accordé aux particuliers pour financer des achats comme une voiture, des travaux ou des biens de consommation courante. Il est distinct du crédit immobilier.",
  },
  {
    question: "Comment fonctionne un simulateur de crédit à la consommation ?",
    answer:
      "Un simulateur calcule vos mensualités en fonction du montant emprunté, du taux d’intérêt et de la durée du prêt. Il vous aide à estimer le coût total et à comparer différentes offres.",
  },
  {
    question: "Quels sont les types de crédits à la consommation ?",
    answer:
      "On distingue principalement le prêt personnel, le crédit affecté (auto, travaux) et le crédit renouvelable. Chacun répond à un besoin précis et a ses propres modalités de remboursement.",
  },
  {
    question:
      "Peut-on rembourser un crédit à la consommation par anticipation ?",
    answer:
      "Oui, vous pouvez rembourser tout ou partie de votre crédit avant la fin du contrat. Des frais de remboursement anticipé peuvent s’appliquer selon le montant restant dû et le type de prêt.",
  },
  {
    question: "Pourquoi utiliser un simulateur avant de souscrire ?",
    answer:
      "Simuler un crédit à la consommation permet de connaître à l’avance vos mensualités et d’éviter le surendettement. Vous pouvez ainsi choisir la durée et le montant qui correspondent à votre budget.",
  },
];

export default function Conso() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Formule de mensualité d'un crédit amortissable classique
  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const C = parseFloat(amount.replace(",", "."));
    const r = parseFloat(rate.replace(",", ".")) / 100 / 12;
    const n = parseFloat(duration.replace(",", "."));
    if (!isNaN(C) && !isNaN(r) && !isNaN(n) && n > 0) {
      const mensualite = r === 0 ? C / n : (C * r) / (1 - Math.pow(1 + r, -n));
      setResult(mensualite);
    } else {
      setResult(null);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculez gratuitement votre crédit à la consommation
      </h1>
      <p className="mb-8">
        Calculez votre mensualité de crédit en fonction du montant emprunté, de
        la durée et du taux d'intérêt.
      </p>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
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
            onChange={(e) => setAmount(e.target.value)}
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
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </label>
        <label>
          Durée du crédit (en mois) :
          <input
            type="number"
            min="1"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>
        <div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          ⚠️ Les résultats sont donnés à titre indicatif.{" "}
          <a href="#faq" className="underline">
            En savoir plus
          </a>
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
          Mensualité :{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.toLocaleString("fr-FR", {
                  maximumFractionDigits: 2,
                })} €`
              : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment calculer le coût d'un crédit à la consommation ?
        </h2>
        <p>
          Le calcul du coût d'un crédit à la consommation est essentiel pour
          évaluer l'impact financier de l'emprunt. Cela permet de savoir combien
          un emprunteur devra rembourser en plus du montant emprunté, en prenant
          en compte les intérêts et les frais associés.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Comment est-ce calculé ?</h3>
        <p>
          Le coût d'un crédit à la consommation dépend de plusieurs éléments,
          notamment le montant emprunté, la durée du crédit, le taux d'intérêt,
          ainsi que les frais supplémentaires.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="font-semibold mb-1">Montant total remboursé</h4>
        <p>
          Le montant total remboursé correspond au montant emprunté, augmenté
          des intérêts et des éventuels frais. La formule de base pour calculer
          le montant total remboursé est la suivante :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Montant total remboursé = Montant emprunté + (Montant emprunté × Taux
          d'intérêt × Durée du crédit)
        </div>
        <p className="mb-1">Exemple :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Montant emprunté : 10 000 €</li>
          <li>Taux d'intérêt : 5 % par an</li>
          <li>Durée du crédit : 5 ans</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Montant total remboursé = 10 000 + (10 000 × 0,05 × 5) = 12 500 €
        </div>
        <p>
          Dans cet exemple, le montant total remboursé sera de 12 500 €, ce qui
          signifie que l'emprunteur devra rembourser 2 500 € en intérêts sur
          cinq ans.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="font-semibold mb-1">Coût total du crédit</h4>
        <p>
          Le coût total du crédit inclut tous les frais, tels que les frais de
          dossier, les assurances, et autres coûts associés. La formule pour
          calculer le coût total du crédit est :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Coût total du crédit = Montant total remboursé + Frais supplémentaires
        </div>
        <p className="mb-1">Exemple :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Montant total remboursé : 12 500 €</li>
          <li>Frais supplémentaires (assurance, frais de dossier) : 500 €</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Coût total du crédit = 12 500 + 500 = 13 000 €
        </div>
        <p>
          Le coût total du crédit dans cet exemple sera de 13 000 €, ce qui
          inclut les intérêts et les frais supplémentaires.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Pourquoi calculer le coût d'un crédit à la consommation ?
        </h3>
        <p>
          Calculer le coût d'un crédit à la consommation permet à l'emprunteur
          de connaître exactement ce qu'il devra rembourser et d'évaluer si
          l'emprunt est en adéquation avec sa capacité de remboursement.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Applications pratiques du calcul du crédit à la consommation
        </h3>
        <ul className="list-disc ml-6 mb-2">
          <li>
            <strong>Crédit automobile :</strong> Calculer le coût d'un crédit
            pour acheter une voiture permet de déterminer le montant total à
            rembourser sur la durée du prêt.
          </li>
          <li>
            <strong>Crédit personnel :</strong> Calculer le coût d'un crédit
            personnel permet de savoir combien coûtera l'emprunt pour financer
            des projets personnels (voyage, rénovation, etc.).
          </li>
          <li>
            <strong>Crédit pour les études :</strong> Calculer le coût d'un
            crédit étudiant permet d'évaluer l'impact financier de l'emprunt
            pour financer les études supérieures.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Pourquoi utiliser ce calcul ?
        </h3>
        <ul className="list-disc ml-6 mb-2">
          <li>
            <strong>Évaluer le coût total :</strong> Le calcul permet de
            connaître le montant total à rembourser, y compris les intérêts et
            frais supplémentaires.
          </li>
          <li>
            <strong>Comparer des offres de crédit :</strong> En calculant le
            coût total des crédits proposés par différentes institutions,
            l'emprunteur peut choisir l'option la plus avantageuse.
          </li>
          <li>
            <strong>Gérer son budget :</strong> Calculer le coût d'un crédit
            permet à l'emprunteur de s'assurer qu'il peut rembourser l'emprunt
            sans mettre en péril ses finances personnelles.
          </li>
        </ul>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur le crédit à la consommation
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
