"use client";
import { useState } from "react";

// Liste simplifiée, à compléter selon besoin réel
const cities = [
  { name: "Paris", tz: "Europe/Paris" },
  { name: "Sydney", tz: "Australia/Sydney" },
  { name: "New York", tz: "America/New_York" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Londres", tz: "Europe/London" },
  { name: "Los Angeles", tz: "America/Los_Angeles" },
  { name: "Moscou", tz: "Europe/Moscow" },
  { name: "Rio", tz: "America/Sao_Paulo" },
];

const faqData = [
  {
    question: "Pourquoi l'écart change selon la saison ?",
    answer:
      "L'écart entre deux villes peut varier à cause du passage à l'heure d'été ou d'hiver, qui n'a pas lieu aux mêmes dates selon les pays. Certaines régions ne changent jamais d'heure.",
  },
  {
    question: "C'est quoi UTC ?",
    answer:
      "UTC (Temps Universel Coordonné) est la référence mondiale pour le temps. Les fuseaux horaires sont définis par rapport à UTC (ex : UTC+2, UTC-5).",
  },
  {
    question: "Qu'est-ce que l'heure d'été ?",
    answer:
      "L'heure d'été est une avancée d'une heure de l'heure légale pour profiter de plus de lumière le soir. Elle est appliquée dans certains pays, généralement du printemps à l'automne.",
  },
];

function getOffset(tz: string, date: Date) {
  try {
    // Intl.DateTimeFormat().resolvedOptions().timeZone n'est pas utilisable pour offset, donc :
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const parts = dtf.formatToParts(date);
    // On récupère l'heure locale dans la timezone
    const y = Number(parts.find(p => p.type === "year")?.value);
    const m = Number(parts.find(p => p.type === "month")?.value) - 1;
    const d = Number(parts.find(p => p.type === "day")?.value);
    const h = Number(parts.find(p => p.type === "hour")?.value);
    const min = Number(parts.find(p => p.type === "minute")?.value);
    const sec = Number(parts.find(p => p.type === "second")?.value);
    const local = Date.UTC(y, m, d, h, min, sec);
    const utc = date.getTime();
    return (local - utc) / (60 * 1000); // minutes d'écart avec UTC
  } catch {
    return 0;
  }
}

export default function FuseauHoraire() {
  const [cityA, setCityA] = useState("Paris");
  const [cityB, setCityB] = useState("Sydney");
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState<null | {
    diff: number;
    localA: string;
    localB: string;
  }>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const cityObjA = cities.find(c => c.name === cityA);
    const cityObjB = cities.find(c => c.name === cityB);
    if (!cityObjA || !cityObjB) return setResult(null);

    const date = dateStr ? new Date(dateStr) : new Date();
    // On force l'heure à 12:00 si seule la date est donnée
    if (dateStr && dateStr.length === 10) date.setHours(12, 0, 0, 0);

    const offsetA = getOffset(cityObjA.tz, date);
    const offsetB = getOffset(cityObjB.tz, date);
    const diff = offsetB - offsetA;

    // Heure locale formatée
    const localA = date.toLocaleString("fr-FR", { timeZone: cityObjA.tz, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short", year: "numeric" });
    const localB = date.toLocaleString("fr-FR", { timeZone: cityObjB.tz, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short", year: "numeric" });

    setResult({
      diff,
      localA,
      localB,
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Comparez les fuseaux horaires de deux villes
      </h1>
      <p className="mb-8">
        Calculez l'écart horaire entre deux villes et affichez l'heure locale dans chacune d'elles à une date donnée.
      </p>

      {/* Disclaimer placé juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Basé sur données officielles ; peut changer.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Ville A :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={cityA}
            onChange={e => setCityA(e.target.value)}
          >
            {cities.map(c => (
              <option key={c.tz} value={c.name}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          Ville B :
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={cityB}
            onChange={e => setCityB(e.target.value)}
          >
            {cities.map(c => (
              <option key={c.tz} value={c.name}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          Date/heure (optionnel) :
          <input
            type="datetime-local"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
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
              Écart horaire :{" "}
              <span className="text-lg font-bold">
                {result.diff > 0
                  ? `+${(result.diff / 60).toFixed(1)} h`
                  : `${(result.diff / 60).toFixed(1)} h`}
              </span>
              <br />
              Heure locale à {cityA} :{" "}
              <span className="font-mono">{result.localA}</span>
              <br />
              Heure locale à {cityB} :{" "}
              <span className="font-mono">{result.localB}</span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment est calculé l'écart horaire&nbsp;?
        </h2>
        <p>
          L'écart horaire est déterminé à partir de la différence d'offset entre les deux villes, selon la base de données des fuseaux horaires (tz database). Il tient compte des changements d'heure d'été/hiver et des règles locales.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Différence = offset(B) - offset(A)
        </div>
        <p>
          Exemple : Paris vs Sydney le 15 août → +8h ; le 15 janvier → +10h
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur les fuseaux horaires
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