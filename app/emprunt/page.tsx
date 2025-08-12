"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu'est-ce que le montant empruntable ?",
    answer:
      "Le montant empruntable correspond à la somme maximale que vous pouvez emprunter auprès d'une banque en fonction de vos revenus, charges et capacité de remboursement.",
  },
  {
    question: "Quels critères influencent le montant empruntable ?",
    answer:
      "Les principaux critères sont vos revenus nets, vos charges mensuelles, votre taux d’endettement, la durée du prêt et le taux d’intérêt appliqué.",
  },
  {
    question: "Comment fonctionne un simulateur de montant empruntable ?",
    answer:
      "Le simulateur calcule votre capacité d’emprunt en estimant vos revenus, dépenses et en appliquant les règles bancaires pour déterminer le montant que vous pouvez rembourser.",
  },
  {
    question: "Pourquoi utiliser un simulateur de montant empruntable ?",
    answer:
      "Il permet d’estimer rapidement votre budget pour un projet immobilier ou autre, afin de mieux préparer votre dossier de prêt et éviter les refus.",
  },
  {
    question: "Le simulateur est-il fiable ?",
    answer:
      "Le simulateur donne une estimation indicative. Seule une étude complète par un établissement financier peut confirmer le montant réellement empruntable.",
  },
];

export default function Emprunt() {
  const [mensualite, setMensualite] = useState("");
  const [taux, setTaux] = useState("");
  const [duree, setDuree] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const m = parseFloat(mensualite.replace(",", "."));
    const tauxAnnuel = parseFloat(taux.replace(",", ".")) / 100;
    const annees = parseFloat(duree.replace(",", "."));
    const n = annees * 12;
    const tauxMensuel = tauxAnnuel / 12;
    if (!isNaN(m) && !isNaN(tauxMensuel) && !isNaN(n) && n > 0 && tauxMensuel > 0) {
      const montant = m * (1 - Math.pow(1 + tauxMensuel, -n)) / tauxMensuel;
      setResult(montant);
    } else if (!isNaN(m) && !isNaN(n) && n > 0 && tauxMensuel === 0) {
      setResult(m * n);
    } else {
      setResult(null);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">Simulateur de montant empruntable pour prêt immobilier</h1>
      <p className="mb-8">
        Calculez combien vous pouvez emprunter selon votre mensualité et taux d’intérêt.
      </p>

      <form onSubmit={handleCalc} className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow">
        <label className="hidden">
          Menu principal
          <input type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Mensualité (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={mensualite}
            onChange={e => setMensualite(e.target.value)}
            required
          />
        </label>
        <label>
          Taux d’intérêt annuel (%) :
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
          Durée du prêt (années) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={duree}
            onChange={e => setDuree(e.target.value)}
            required
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
          Montant empruntable :{" "}
          <span className="text-lg font-bold">
            {result !== null ? `${result.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €` : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Comment calculer le montant empruntable ?</h2>
        <p>
          Le calcul du montant empruntable est essentiel pour savoir combien vous pouvez emprunter en fonction de votre capacité de remboursement. Il vous permet de déterminer le capital que vous pouvez obtenir auprès d'une banque, en tenant compte de vos mensualités souhaitées, de la durée du prêt et du taux d’intérêt.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Comment est-ce calculé ?</h3>
        <p>
          Le montant empruntable est calculé à l’aide d’une formule mathématique qui dépend de trois éléments principaux :
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>La mensualité souhaitée (ou capacité de remboursement mensuelle)</li>
          <li>La durée du prêt (en nombre de mois)</li>
          <li>Le taux d’intérêt annuel (généralement exprimé en % fixe)</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Montant empruntable = Mensualité × [1 - (1 + Taux Mensuel)<sup>(-Nombre de mensualités)</sup>] / Taux Mensuel
        </div>
        <p>
          Le taux mensuel est obtenu en divisant le taux annuel par 12. Voici un exemple :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Mensualité souhaitée : 359,37 €<br />
          Taux annuel : 3 %<br />
          Durée : 5 ans (soit 60 mois)<br />
          <br />
          Taux mensuel = 3 / 100 / 12 = 0,0025<br />
          Montant empruntable = 359,37 × [1 - (1 + 0,0025)<sup>(-60)</sup>] / 0,0025 ≈ 20 000 €
        </div>
        <p>
          Dans cet exemple, avec une mensualité de 359,37 € pendant 5 ans, vous pouvez emprunter environ 20 000 €.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Comment le taux influence-t-il le montant empruntable ?</h3>
        <p>
          Plus le taux d’intérêt est élevé, plus le montant que vous pouvez emprunter sera faible pour une mensualité donnée. À l’inverse, un taux bas vous permet d’emprunter davantage sans augmenter vos mensualités.
        </p>
        <p>
          Voici une comparaison :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Mensualité : 359 € – Durée : 5 ans<br />
          <br />
          Taux de 2 % → Montant empruntable ≈ 20 500 €<br />
          Taux de 3 % → Montant empruntable ≈ 20 000 €<br />
          Taux de 4 % → Montant empruntable ≈ 19 450 €
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Applications pratiques du calcul du montant empruntable</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Crédit immobilier :</strong> Déterminer quel budget immobilier vous pouvez envisager en fonction de vos moyens.</li>
          <li><strong>Crédit auto :</strong> Savoir quel montant de prêt vous pouvez obtenir pour acheter un véhicule.</li>
          <li><strong>Planification financière :</strong> Ajuster vos projets selon votre capacité d’emprunt réelle.</li>
          <li><strong>Simulation comparative :</strong> Tester différents scénarios en faisant varier la mensualité, la durée ou le taux.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pourquoi utiliser ce calcul ?</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Maîtriser votre budget :</strong> Vous savez exactement combien vous pouvez emprunter sans mettre en péril votre équilibre financier.</li>
          <li><strong>Gagner du temps :</strong> Vous pouvez cibler les biens ou projets correspondant à votre capacité d’emprunt.</li>
          <li><strong>Mieux négocier :</strong> En connaissant vos limites et les paramètres du prêt, vous serez plus à l’aise lors de vos discussions avec votre conseiller bancaire.</li>
        </ul>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">FAQ - Questions fréquentes sur le simulateur de montant empruntable</h2>
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