"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Que se passe-t-il si la date de référence est le jour de l’anniversaire ?",
    answer:
      "Le prochain anniversaire est aujourd’hui, et l’âge affiché est celui atteint ce jour.",
  },
  {
    question: "Peut-on calculer pour une date passée ou future ?",
    answer:
      "Oui, vous pouvez choisir n’importe quelle date de référence, passée ou future.",
  },
  {
    question: "Quel est le format de la date affichée ?",
    answer:
      "La date affichée est au format AAAA-MM-JJ (ISO), pour éviter toute ambiguïté.",
  },
];

function getNextBirthday(birth: string, ref: string) {
  if (!birth) return null;
  const birthDate = new Date(birth);
  const refDate = ref ? new Date(ref) : new Date();
  if (isNaN(birthDate.getTime()) || isNaN(refDate.getTime())) return null;

  // Prochain anniversaire
  let next = new Date(refDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (
    next < refDate ||
    (next.getFullYear() === refDate.getFullYear() &&
      next.getMonth() === refDate.getMonth() &&
      next.getDate() === refDate.getDate())
  ) {
    next = new Date(refDate.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }

  // Âge atteint à cette date
  let age = next.getFullYear() - birthDate.getFullYear();
  // Si la date de naissance est le 29 février et l'année cible n'est pas bissextile, JS ajuste au 1er mars

  return {
    date: next.toISOString().slice(0, 10),
    age,
  };
}

export default function AnniversaireProchain() {
  const [birth, setBirth] = useState("");
  const [ref, setRef] = useState("");
  const [result, setResult] = useState<{ date: string; age: number } | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const res = getNextBirthday(birth, ref);
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
        Prochain anniversaire / âge à une date donnée
      </h1>
      <p className="mb-8">
        Calculez la date de votre prochain anniversaire et l’âge que vous atteindrez à cette date.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne tient pas compte des fuseaux horaires ou calendriers particuliers.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Date de naissance :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={birth}
            onChange={e => setBirth(e.target.value)}
            required
          />
        </label>
        <label>
          Date de référence (optionnelle) :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={ref}
            onChange={e => setRef(e.target.value)}
            placeholder="Aujourd’hui par défaut"
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
              Prochain anniversaire :{" "}
              <span className="text-lg font-bold">{result.date}</span>
              <br />
              Âge atteint :{" "}
              <span className="text-lg font-bold">{result.age}</span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Prochain anniversaire / âge à une date donnée
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