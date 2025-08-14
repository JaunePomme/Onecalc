"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que la masse molaire ?",
    answer:
      "La masse molaire est la masse d’une mole d’un composé chimique, exprimée en g/mol. Elle s’obtient en additionnant les masses molaires atomiques de chaque élément du composé.",
  },
  {
    question: "Comment saisir la formule chimique ?",
    answer:
      "Entrez la formule brute (ex : H2O, CO2, C6H12O6). Les majuscules/minuscules et les chiffres sont importants.",
  },
  {
    question: "Les ions ou parenthèses sont-ils gérés ?",
    answer:
      "Ce calculateur gère les formules simples et les parenthèses, mais pas les notations complexes (hydrates, ions polyatomiques, etc.).",
  },
];

// Tableau périodique simplifié (éléments courants)
const MASSES: Record<string, number> = {
  H: 1.008,
  He: 4.0026,
  Li: 6.94,
  Be: 9.0122,
  B: 10.81,
  C: 12.01,
  N: 14.01,
  O: 16.00,
  F: 18.998,
  Ne: 20.180,
  Na: 22.990,
  Mg: 24.305,
  Al: 26.982,
  Si: 28.085,
  P: 30.974,
  S: 32.06,
  Cl: 35.45,
  K: 39.098,
  Ca: 40.078,
  Fe: 55.845,
  Cu: 63.546,
  Zn: 65.38,
  Ag: 107.87,
  I: 126.90,
  Ba: 137.33,
  Au: 196.97,
  Hg: 200.59,
  Pb: 207.2,
  Br: 79.904,
  Mn: 54.938,
  Cr: 51.996,
  Co: 58.933,
  Ni: 58.693,
  Sn: 118.71,
  // ...ajoutez d'autres éléments si besoin
};

// Parseur très simple pour formules chimiques (gère parenthèses et chiffres)
function parseFormula(formula: string): Record<string, number> | null {
  try {
    let i = 0;
    function parse(): Record<string, number> {
      let counts: Record<string, number> = {};
      while (i < formula.length) {
        if (formula[i] === "(") {
          i++;
          const group = parse();
          let num = "";
          while (i < formula.length && /\d/.test(formula[i])) num += formula[i++];
          const mult = num ? parseInt(num, 10) : 1;
          for (const el in group) {
            counts[el] = (counts[el] || 0) + group[el] * mult;
          }
        } else if (formula[i] === ")") {
          i++;
          break;
        } else {
          // Parse element symbol
          let el = formula[i++];
          if (i < formula.length && /[a-z]/.test(formula[i])) {
            el += formula[i++];
          }
          // Parse number
          let num = "";
          while (i < formula.length && /\d/.test(formula[i])) num += formula[i++];
          const n = num ? parseInt(num, 10) : 1;
          counts[el] = (counts[el] || 0) + n;
        }
      }
      return counts;
    }
    return parse();
  } catch {
    return null;
  }
}

function calcMasseMolaire(formula: string): { masse: number; details: string } | null {
  const counts = parseFormula(formula);
  if (!counts) return null;
  let masse = 0;
  let details = "";
  for (const el in counts) {
    if (!MASSES[el]) return null;
    masse += MASSES[el] * counts[el];
    details += `${el} (${MASSES[el]}) × ${counts[el]} + `;
  }
  details = details.replace(/\s\+\s$/, "");
  return { masse, details };
}

export default function MasseMolairePage() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<{ masse: number; details: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formula.match(/^[A-Za-z0-9()]+$/)) {
      setResult(null);
      setError("Veuillez saisir une formule chimique valide (ex: H2O, C6H12O6).");
      return;
    }
    const res = calcMasseMolaire(formula);
    if (!res) {
      setResult(null);
      setError("Formule non reconnue ou élément absent du tableau.");
      return;
    }
    setResult(res);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de masse molaire (composé)
      </h1>
      <p className="mb-8">
        Calculez la masse molaire d’un composé chimique à partir de sa formule brute (ex : H2O, CO2, C6H12O6).
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, à vérifier pour les usages professionnels ou académiques.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Formule chimique :
          <input
            type="text"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800 font-mono"
            value={formula}
            onChange={e => setFormula(e.target.value)}
            placeholder="ex: H2O, C6H12O6, (NH4)2SO4"
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
          ) : result ? (
            <>
              <span className="text-lg font-bold">
                {result.masse.toLocaleString("fr-FR", { maximumFractionDigits: 4 })} g/mol
              </span>
              <br />
              <span className="text-xs text-gray-500">
                {result.details}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Masse molaire
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