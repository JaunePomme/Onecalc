"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Comment fonctionne le simulateur d’épargne ?",
    answer:
      "Le simulateur d’épargne calcule l’évolution de votre capital en fonction du montant initial, des versements réguliers, du taux d’intérêt et de la durée d’épargne.",
  },
  {
    question: "Quels paramètres puis-je modifier ?",
    answer:
      "Vous pouvez ajuster le montant de départ, le montant des versements mensuels ou annuels, le taux de rendement attendu et la durée pendant laquelle vous souhaitez épargner.",
  },
  {
    question: "Les résultats du simulateur sont-ils garantis ?",
    answer:
      "Non, les résultats sont des estimations basées sur les hypothèses que vous saisissez. Le rendement réel peut varier en fonction des conditions du marché et du type de placement choisi.",
  },
  {
    question: "Pourquoi utiliser un simulateur d’épargne ?",
    answer:
      "Un simulateur vous aide à visualiser l’impact des versements réguliers et des intérêts composés, pour mieux planifier et atteindre vos objectifs financiers.",
  },
];

export default function Epargne() {
  const [initial, setInitial] = useState("1000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [monthly, setMonthly] = useState("100");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const P = parseFloat(initial.replace(",", "."));
    const r = parseFloat(rate.replace(",", ".")) / 100;
    const n = parseFloat(years.replace(",", "."));
    const m = parseFloat(monthly.replace(",", "."));
    if (!isNaN(P) && !isNaN(r) && !isNaN(n) && !isNaN(m)) {
      // Formule intérêts composés avec versements mensuels
      const monthlyRate = r / 12;
      const periods = n * 12;
      const futureValue =
        P * Math.pow(1 + monthlyRate, periods) +
        m * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate);
      setResult(futureValue);
    } else {
      setResult(null);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Simulateur gratuit d’épargne pour atteindre vos objectifs
      </h1>
      <p className="mb-8">
        Calculez votre épargne future avec des versements mensuels et des
        intérêts composés.
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
          Montant initial (en euros) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
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
          Durée (en années) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            required
          />
        </label>
        <label>
          Versement mensuel (en euros) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
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
          Montant final :{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`
              : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Qu'est-ce que le simulateur d'épargne ?
        </h2>
        <p>
          Le simulateur d'épargne vous permet de calculer votre épargne future
          en tenant compte de vos versements mensuels et des intérêts composés.
          Il vous aide à estimer l'impact de vos économies régulières sur votre
          capital à long terme.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Comment fonctionne le simulateur d'épargne ?
        </h3>
        <p>
          Le simulateur utilise une formule d'intérêts composés pour calculer la
          croissance de votre épargne au fil du temps. Les versements mensuels
          sont ajoutés à votre capital chaque mois et génèrent des intérêts, qui
          eux-mêmes génèrent des intérêts. Le calcul se fait ainsi :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Montant final = Versement mensuel * [(1 + Taux d'intérêt / 12)
          <sup>(12 * Nombre d'années)</sup> - 1] / (Taux d'intérêt / 12)
        </div>
        <p className="mb-1">
          Exemple : Si vous versez 100 € chaque mois avec un taux d'intérêt
          annuel de 5 % pendant 10 ans, le calcul serait le suivant :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Montant final = 100 * [(1 + 0.05 / 12)<sup>(12 * 10)</sup> - 1] /
          (0.05 / 12)
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          À quoi sert le simulateur d'épargne ?
        </h3>
        <ul className="list-disc ml-6 mb-2">
          <li>
            <strong>Planification financière :</strong> Il vous aide à
            visualiser vos économies futures et à planifier votre avenir
            financier.
          </li>
          <li>
            <strong>Estimation des gains d'intérêts :</strong> Il permet
            d'illustrer l'effet des intérêts composés et de comprendre comment
            l'épargne peut croître au fil du temps.
          </li>
          <li>
            <strong>Aide à la prise de décision :</strong> Vous pouvez ajuster
            les paramètres (montant des versements, durée, taux d'intérêt) pour
            optimiser votre épargne selon vos objectifs.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Comment optimiser son épargne ?
        </h3>
        <ul className="list-disc ml-6 mb-2">
          <li>
            <strong>Augmenter les versements :</strong> Plus vous versez
            régulièrement, plus votre épargne croîtra rapidement grâce aux
            intérêts composés.
          </li>
          <li>
            <strong>Choisir un taux d'intérêt élevé :</strong> Un taux d'intérêt
            plus élevé accélérera la croissance de votre épargne.
          </li>
          <li>
            <strong>Commencer tôt :</strong> Plus tôt vous commencez à épargner,
            plus vous profiterez de l'effet des intérêts composés.
          </li>
          <li>
            <strong>Réévaluer régulièrement :</strong> Réajustez vos versements
            et vos objectifs en fonction de l'évolution de vos finances.
          </li>
        </ul>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur le simulateur d'épargne
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
