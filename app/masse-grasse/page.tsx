"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que la méthode US Navy ?",
    answer:
      "La méthode US Navy estime le taux de masse grasse à partir de mesures corporelles simples (tour de taille, cou, hanches pour les femmes, taille, sexe, âge).",
  },
  {
    question: "Les résultats sont-ils fiables ?",
    answer:
      "C’est une estimation : la méthode US Navy est pratique mais moins précise qu’une mesure par impédancemètre ou DEXA.",
  },
  {
    question: "Comment prendre les mesures ?",
    answer:
      "Mesurez la taille au niveau du nombril, le cou juste sous la pomme d’Adam, et les hanches à l’endroit le plus large (pour les femmes).",
  },
];

function calcMasseGrasse({
  sexe,
  taille,
  cou,
  tailleTour,
  hanches,
  age,
}: {
  sexe: string;
  taille: number;
  cou: number;
  tailleTour: number;
  hanches?: number;
  age?: number;
}) {
  // Formules US Navy
  if (sexe === "homme") {
    // %MG = 495 / (1.0324 - 0.19077*log10(tailleTour-cou) + 0.15456*log10(taille)) - 450
    return (
      495 /
        (1.0324 -
          0.19077 * Math.log10(tailleTour - cou) +
          0.15456 * Math.log10(taille)) -
      450
    );
  } else {
    // %MG = 495 / (1.29579 - 0.35004*log10(tailleTour+hanche-cou) + 0.22100*log10(taille)) - 450
    if (!hanches) return null;
    return (
      495 /
        (1.29579 -
          0.35004 * Math.log10(tailleTour + hanches - cou) +
          0.221 * Math.log10(taille)) -
      450
    );
  }
}

export default function MasseGrassePage() {
  const [sexe, setSexe] = useState("homme");
  const [taille, setTaille] = useState("");
  const [cou, setCou] = useState("");
  const [tailleTour, setTailleTour] = useState("");
  const [hanches, setHanches] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const t = parseFloat(taille.replace(",", "."));
    const c = parseFloat(cou.replace(",", "."));
    const tt = parseFloat(tailleTour.replace(",", "."));
    const h = hanches ? parseFloat(hanches.replace(",", ".")) : undefined;
    if (
      isNaN(t) ||
      t <= 0 ||
      isNaN(c) ||
      c <= 0 ||
      isNaN(tt) ||
      tt <= 0 ||
      (sexe === "femme" && (h === undefined || isNaN(h) || h <= 0))
    ) {
      setResult(null);
      setError("Veuillez saisir des mesures valides.");
      return;
    }
    const mg = calcMasseGrasse({
      sexe,
      taille: t,
      cou: c,
      tailleTour: tt,
      hanches: h,
      age: age ? parseInt(age, 10) : undefined,
    });
    if (mg === null || isNaN(mg)) {
      setResult(null);
      setError("Impossible de calculer avec ces valeurs.");
      return;
    }
    setResult(mg);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de taux de masse grasse (méthode US Navy)
      </h1>
      <p className="mb-8">
        Estimez votre taux de masse grasse à partir de mesures simples selon la méthode US Navy.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un avis médical.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Sexe :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={sexe}
            onChange={e => setSexe(e.target.value)}
          >
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
        </label>
        <label>
          Taille (cm) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={taille}
            onChange={e => setTaille(e.target.value)}
            required
          />
        </label>
        <label>
          Tour de cou (cm) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={cou}
            onChange={e => setCou(e.target.value)}
            required
          />
        </label>
        <label>
          Tour de taille (au nombril, cm) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={tailleTour}
            onChange={e => setTailleTour(e.target.value)}
            required
          />
        </label>
        {sexe === "femme" && (
          <label>
            Tour de hanches (cm) :
            <input
              type="number"
              min="0"
              step="any"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={hanches}
              onChange={e => setHanches(e.target.value)}
              required={sexe === "femme"}
            />
          </label>
        )}
        <label>
          Âge (optionnel) :
          <input
            type="number"
            min="0"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={age}
            onChange={e => setAge(e.target.value)}
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
                {result.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} %
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Taux de masse grasse (US Navy)
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