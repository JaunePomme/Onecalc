"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Inclut-on les jours entiers ?",
    answer:
      "Oui, la différence est calculée en jours entiers entre les deux dates, sans tenir compte de l'heure.",
  },
  {
    question: "Compte-t-on les deux dates ?",
    answer:
      "Non, le calcul donne le nombre de jours complets entre les deux dates, sans inclure la date de fin. Pour inclure les deux, ajoutez 1 au résultat.",
  },
  {
    question: "Peut-on calculer les jours ouvrés ?",
    answer:
      "Ce calculateur donne le nombre total de jours calendaires. Les jours ouvrés (hors week-ends et jours fériés) nécessitent un calcul spécifique.",
  },
];

export default function JoursEntreDeuxDates() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState<null | { days: number; weeks: number; rest: number }>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date1 || !date2) return setResult(null);
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    // On ignore l'heure pour ne compter que les jours
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const rest = days % 7;
    setResult({ days, weeks, rest });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Nombre de jours entre deux dates
      </h1>
      <p className="mb-8">
        Calculez le nombre de jours et de semaines entre deux dates du calendrier grégorien.
      </p>

      {/* Disclaimer placé juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Basé sur calendrier grégorien.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Date 1 :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={date1}
            onChange={e => setDate1(e.target.value)}
            required
          />
        </label>
        <label>
          Date 2 :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={date2}
            onChange={e => setDate2(e.target.value)}
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
          {result !== null ? (
            <>
              {result.days} jour{result.days > 1 ? "s" : ""}
              <br />
              {result.weeks > 0 && (
                <>
                  {result.weeks} semaine{result.weeks > 1 ? "s" : ""}
                  {result.rest > 0 && ` et ${result.rest} jour${result.rest > 1 ? "s" : ""}`}
                </>
              )}
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment est calculée la différence entre deux dates&nbsp;?
        </h2>
        <p>
          La différence correspond au nombre de jours entiers entre les deux dates, sans tenir compte de l'heure. Le calcul utilise le calendrier grégorien.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Différence = |Date2 - Date1| en jours
        </div>
        <p>
          Exemple : du 01/01/2024 au 15/01/2024 = 14 jours
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur le calcul de jours
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