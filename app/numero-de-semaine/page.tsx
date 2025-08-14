"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Quelle norme pour le numéro de semaine ?",
    answer:
      "Le calcul suit la norme ISO 8601 : la semaine 1 est celle qui contient le premier jeudi de l’année.",
  },
  {
    question: "Les semaines commencent quel jour ?",
    answer:
      "Selon la norme ISO 8601, la semaine commence le lundi.",
  },
  {
    question: "Peut-on calculer pour n’importe quelle année ?",
    answer:
      "Oui, le calcul fonctionne pour toutes les années du calendrier grégorien.",
  },
];

function getWeekNumber(date: Date) {
  // Copie pour ne pas modifier l'objet d'origine
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Jour de la semaine (lundi=1, dimanche=7)
  const dayNum = d.getUTCDay() || 7;
  // Place le jour sur le jeudi de la même semaine
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  // 1er janvier de l'année
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Numéro de semaine
  const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNum;
}

export default function SemaineDate() {
  const [date, setDate] = useState("");
  const [week, setWeek] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setWeek(null);
      return;
    }
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      setWeek(null);
      return;
    }
    setWeek(getWeekNumber(d));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Trouver le numéro de semaine d’une date
      </h1>
      <p className="mb-8">
        Entrez une date pour obtenir son numéro de semaine selon la norme ISO 8601.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, attention aux différences de conventions selon les pays.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Date :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={date}
            onChange={e => setDate(e.target.value)}
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
          {week !== null ? (
            <>
              Semaine <span className="text-lg font-bold">{week}</span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Numéro de semaine
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