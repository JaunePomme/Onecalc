"use client";
import { useState } from "react";

const activities = [
  { label: "Course à pied (8 km/h)", met: 8.3 },
  { label: "Marche (5 km/h)", met: 3.5 },
  { label: "Vélo (modéré)", met: 6.8 },
  { label: "Natation (modérée)", met: 6 },
  { label: "Yoga", met: 2.5 },
  { label: "Musculation", met: 5 },
  { label: "Danse", met: 5.5 },
  { label: "Tennis", met: 7.3 },
  { label: "Football", met: 7 },
  { label: "Aviron", met: 7 },
];

const faqData = [
  {
    question: "Qu'est-ce que MET ?",
    answer:
      "Le MET (Metabolic Equivalent of Task) est une unité qui mesure l'intensité d'une activité physique par rapport au repos. 1 MET correspond à la dépense énergétique au repos.",
  },
  {
    question: "Quelles activités sont listées ?",
    answer:
      "Les activités proposées couvrent les sports et exercices les plus courants. Chaque activité a un coefficient MET moyen, mais il existe de nombreuses autres activités possibles.",
  },
  {
    question: "Ce calcul est-il fiable pour tout le monde ?",
    answer:
      "Le résultat est une estimation : la dépense réelle varie selon l’intensité, la morphologie, l’âge et d’autres facteurs individuels.",
  },
];

export default function CaloriesBrulees() {
  const [activity, setActivity] = useState(activities[0].met.toString());
  const [poids, setPoids] = useState("");
  const [duree, setDuree] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const met = parseFloat(activity);
    const p = parseFloat(poids.replace(",", "."));
    const d = parseFloat(duree.replace(",", "."));
    if (!isNaN(met) && !isNaN(p) && !isNaN(d) && p > 0 && d > 0) {
      const calories = met * p * (d / 60);
      setResult(calories);
    } else {
      setResult(null);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de calories brûlées par activité
      </h1>
      <p className="mb-8">
        Estimez le nombre de calories dépensées selon votre activité, votre poids et la durée de l'effort.
      </p>

      {/* Disclaimer placé juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Estimation ; varie selon intensité réelle.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Activité :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={activity}
            onChange={e => setActivity(e.target.value)}
          >
            {activities.map((a, idx) => (
              <option key={a.label} value={a.met}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Poids (kg) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={poids}
            onChange={e => setPoids(e.target.value)}
            required
          />
        </label>
        <label>
          Durée (minutes) :
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
              {result.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} kcal
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment est calculée la dépense calorique&nbsp;?
        </h2>
        <p>
          La dépense calorique est estimée à partir du MET de l'activité, de votre poids et de la durée de l'effort.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Calories = MET × poids (kg) × durée (heures)
        </div>
        <p>
          Exemple : Course 8 km/h, 70 kg, 30 min → ≈ 290 kcal
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur les calories brûlées
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