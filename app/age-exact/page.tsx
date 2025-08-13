"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Prend-on en compte les années bissextiles ?",
    answer:
      "Oui, le calcul tient compte des années bissextiles grâce à l'utilisation du calendrier grégorien natif de JavaScript.",
  },
  {
    question: "Peut-on calculer l'âge à une date passée ?",
    answer:
      "Oui, vous pouvez choisir une date de référence passée ou future pour obtenir l'âge exact à cette date.",
  },
  {
    question: "Quel est le format d'affichage ?",
    answer:
      "L'âge est affiché en années, mois et jours pour plus de précision (ex : 25 ans, 6 mois, 11 jours).",
  },
];

function calcAge(birth: Date, ref: Date) {
  let years = ref.getFullYear() - birth.getFullYear();
  let months = ref.getMonth() - birth.getMonth();
  let days = ref.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    // Prend le nombre de jours du mois précédent
    const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeExact() {
  const [birth, setBirth] = useState("");
  const [refDate, setRefDate] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  });
  const [result, setResult] = useState<null | { years: number; months: number; days: number }>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birth) return setResult(null);
    const birthDate = new Date(birth);
    const ref = refDate ? new Date(refDate) : new Date();
    if (birthDate > ref) return setResult(null);
    setResult(calcAge(birthDate, ref));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur d'âge exact (années, mois, jours)
      </h1>
      <p className="mb-8">
        Calculez votre âge exact en années, mois et jours à partir de votre date de naissance et d'une date de référence (optionnelle).
      </p>

      {/* Disclaimer placé juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Estimation basée sur calendrier grégorien.
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
            value={refDate}
            onChange={e => setRefDate(e.target.value)}
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
          {result !== null ? (
            <>
              {result.years} an{result.years > 1 ? "s" : ""},{" "}
              {result.months} mois, {result.days} jour{result.days > 1 ? "s" : ""}
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment est calculé l'âge exact&nbsp;?
        </h2>
        <p>
          L'âge exact est calculé en soustrayant la date de naissance de la date de référence, en tenant compte des années, mois et jours. Le calcul prend en compte les années bissextiles et la longueur variable des mois.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Différence = années, mois, jours entre les deux dates
        </div>
        <p>
          Exemple : 01/02/2000 → 12/08/2025 = 25 ans, 6 mois, 11 jours
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur le calcul d'âge exact
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
                <span className="ml-2">{openFaq.includes(idx) ? "▲" : "▼"}</span>
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