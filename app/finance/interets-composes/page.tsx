"use client";
import { useState } from "react";

const freqOptions = [
  { label: "Mensuelle", value: "mensuelle", m: 12 },
  { label: "Annuelle", value: "annuelle", m: 1 },
];

const faqData = [
  {
    question: "Quelle différence entre capitalisation mensuelle et annuelle ?",
    answer:
      "Avec une capitalisation mensuelle, les intérêts sont ajoutés au capital chaque mois, ce qui accélère la croissance grâce à l'effet boule de neige. En capitalisation annuelle, les intérêts ne sont ajoutés qu'une fois par an, donc la croissance est un peu plus lente à taux égal.",
  },
  {
    question: "Que se passe-t-il si j’arrête les versements en cours de route ?",
    answer:
      "Si vous arrêtez les versements périodiques, seul le capital déjà accumulé continuera à générer des intérêts composés. La valeur future sera donc inférieure à celle obtenue avec des versements réguliers jusqu'à la fin.",
  },
  {
    question: "Quelle différence entre intérêts composés et simples ?",
    answer:
      "Les intérêts simples ne s’appliquent qu’au capital de départ, alors que les intérêts composés s’appliquent au capital + intérêts déjà générés. Les intérêts composés font donc croître l’épargne beaucoup plus vite sur le long terme.",
  },
];

export default function Interets() {
  const [capital, setCapital] = useState("");
  const [versement, setVersement] = useState("");
  const [taux, setTaux] = useState("");
  const [annees, setAnnees] = useState("");
  const [frequence, setFrequence] = useState("mensuelle");
  const [result, setResult] = useState<null | {
    fv: number;
    interets: number;
    totalVerse: number;
  }>(null);
  // Remplace openFaq par un tableau de booléens
  const [openFaq, setOpenFaq] = useState<boolean[]>(faqData.map(() => false));

  const handleToggleFaq = (idx: number) => {
    setOpenFaq((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const P0 = parseFloat(capital.replace(",", "."));
    const v = parseFloat(versement.replace(",", "."));
    const t = parseFloat(taux.replace(",", ".")) / 100;
    const nAn = parseFloat(annees.replace(",", "."));
    const freq = freqOptions.find((f) => f.value === frequence) || freqOptions[0];
    const m = freq.m;

    if (
      !isNaN(P0) &&
      !isNaN(v) &&
      !isNaN(t) &&
      !isNaN(nAn) &&
      m > 0 &&
      nAn > 0
    ) {
      const i = t / m;
      const n = m * nAn;
      const FV =
        P0 * Math.pow(1 + i, n) +
        (v > 0 && i > 0
          ? v * ((Math.pow(1 + i, n) - 1) / i)
          : v * n);
      const totalVerse = P0 + v * n;
      const interets = FV - totalVerse;
      setResult({ fv: FV, interets, totalVerse });
    } else {
      setResult(null);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculez vos intérêts composés facilement
      </h1>
      <p className="mb-8">
        Simulez la croissance de votre épargne avec intérêts composés et versements réguliers.
      </p>

      {/* Disclaimer juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Ce calcul ne tient pas compte des impôts, frais ou prélèvements. Les performances passées ne garantissent pas les résultats futurs.
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
          Capital initial (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            required
          />
        </label>
        <label>
          Versement périodique (€) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={versement}
            onChange={(e) => setVersement(e.target.value)}
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
            onChange={(e) => setTaux(e.target.value)}
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
            value={annees}
            onChange={(e) => setAnnees(e.target.value)}
            required
          />
        </label>
        <label>
          Fréquence :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={frequence}
            onChange={(e) => setFrequence(e.target.value)}
          >
            {freqOptions.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
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
          <span className="font-semibold">Résultat :</span>
          <br />
          Valeur future :{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.fv.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`
              : "-- €"}
          </span>
          <br />
          Intérêts cumulés :{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.interets.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`
              : "-- €"}
          </span>
          <br />
          Total versé :{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.totalVerse.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`
              : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Comment sont calculés les intérêts composés&nbsp;?</h2>
        <p>
          Les intérêts composés permettent à votre épargne de croître plus vite, car les intérêts générés s’ajoutent au capital et produisent eux-mêmes des intérêts. Ce simulateur prend en compte un capital initial, des versements réguliers, un taux annuel, une durée et une fréquence de capitalisation.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Formule utilisée</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          FV = P₀ × (1 + i)<sup>n</sup> + versement × [(1 + i)<sup>n</sup> - 1] / i<br />
          i = taux annuel / fréquence<br />
          n = fréquence × années
        </div>
        <p>
          <strong>Exemple :</strong> 10 000 €, 200 €/mois, 10 ans, 6% annuel, capitalisation mensuelle →<br />
          FV ≈ 50 969,84 €
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pourquoi utiliser ce simulateur&nbsp;?</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Estimer la croissance de votre épargne :</strong> Visualisez l’impact des intérêts composés sur le long terme.</li>
          <li><strong>Comparer différents scénarios :</strong> Modifiez la fréquence, le taux ou les versements pour optimiser votre stratégie d’épargne.</li>
          <li><strong>Comprendre l’effet boule de neige :</strong> Plus la fréquence de capitalisation est élevée, plus la croissance est rapide.</li>
        </ul>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">FAQ - Questions fréquentes sur les intérêts composés</h2>
        <div className="flex flex-col gap-2">
          {faqData.map((item, idx) => (
            <div key={idx} className="border rounded bg-gray-50 dark:bg-gray-900">
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center"
                onClick={() => handleToggleFaq(idx)}
                aria-expanded={openFaq[idx]}
                aria-controls={`faq-panel-${idx}`}
              >
                {item.question}
                <span className="ml-2">{openFaq[idx] ? "▲" : "▼"}</span>
              </button>
              {openFaq[idx] && (
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