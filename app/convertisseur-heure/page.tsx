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
    question: "Comment fonctionne la conversion ?",
    answer:
      "La conversion utilise la différence de fuseau horaire entre les deux villes. On convertit l'heure de la ville A en UTC, puis on applique l'offset de la ville B pour obtenir l'heure locale correspondante.",
  },
  {
    question: "Quel est l'impact de l'heure d'été ?",
    answer:
      "L'heure d'été peut modifier l'écart entre deux villes selon la période de l'année. Le calcul tient compte automatiquement des changements d'heure d'été/hiver selon les règles locales.",
  },
  {
    question: "C'est quoi UTC ?",
    answer:
      "UTC (Temps Universel Coordonné) est la référence mondiale pour le temps. Les fuseaux horaires sont définis par rapport à UTC (ex : UTC+2, UTC-5).",
  },
];

function getOffset(tz: string, date: Date) {
  try {
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

export default function ConvertisseurHeure() {
  const [cityA, setCityA] = useState("Paris");
  const [cityB, setCityB] = useState("New York");
  const [dateStr, setDateStr] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  });
  const [heureA, setHeureA] = useState("14:00");
  const [result, setResult] = useState<null | string>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const cityObjA = cities.find(c => c.name === cityA);
    const cityObjB = cities.find(c => c.name === cityB);
    if (!cityObjA || !cityObjB || !heureA) return setResult(null);

    // Compose date complète pour la conversion
    const [h, m] = heureA.split(":").map(Number);
    const date = new Date(dateStr);
    date.setHours(h, m, 0, 0);

    // Heure UTC = heure A - offset(A)
    const offsetA = getOffset(cityObjA.tz, date);
    const utcDate = new Date(date.getTime() - offsetA * 60 * 1000);

    // Heure B = UTC + offset(B)
    const offsetB = getOffset(cityObjB.tz, utcDate);
    const dateB = new Date(utcDate.getTime() + offsetB * 60 * 1000);

    // Format heure locale ville B
    const heureB = dateB.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: cityObjB.tz,
    });

    setResult(heureB);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Convertisseur d'heure entre deux villes
      </h1>
      <p className="mb-8">
        Entrez une heure dans une ville et obtenez l'heure correspondante dans une autre ville, en tenant compte des fuseaux horaires et de l'heure d'été.
      </p>

      {/* Disclaimer placé juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Basé sur données fuseaux ; exactitude dépend maj.
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
          Heure à convertir (HH:MM) :
          <input
            type="time"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={heureA}
            onChange={e => setHeureA(e.target.value)}
            required
          />
        </label>
        <label>
          Date (pour prise en compte heure d'été) :
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
            required
          />
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Convertir
        </button>
        <div className="mt-2">
          <span className="font-semibold">Résultat :</span>
          <br />
          {result !== null ? (
            <>
              Heure à {cityB} :{" "}
              <span className="text-lg font-bold">{result}</span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment fonctionne la conversion d'heure&nbsp;?
        </h2>
        <p>
          La conversion s'effectue en transformant l'heure saisie dans la ville A en heure UTC, puis en appliquant le décalage horaire de la ville B pour obtenir l'heure locale correspondante.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          Heure UTC A = Heure A - offset(A) <br />
          Heure B = Heure UTC A + offset(B)
        </div>
        <p>
          Exemple : 14:00 à Paris → New York (été) = 8:00
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur la conversion d'heure
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