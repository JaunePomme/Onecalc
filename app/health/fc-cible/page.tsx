"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Pourquoi zones cardio ?",
    answer:
      "Les zones cardio permettent d'adapter l'intensité de l'entraînement à vos objectifs : endurance, perte de poids, amélioration de la performance ou récupération.",
  },
  {
    question: "Comment mesurer la fréquence cardiaque de repos ?",
    answer:
      "Prenez votre pouls au réveil, au calme, avant de vous lever. Comptez les battements sur 60 secondes ou 30 secondes (x2).",
  },
  {
    question: "Faut-il utiliser une montre cardio ?",
    answer:
      "Une montre cardio ou un capteur de fréquence cardiaque permet un suivi précis et en temps réel de votre effort, mais la prise manuelle reste possible.",
  },
];

function calcZones(age: number, fcRepos?: number) {
  const fcMax = 220 - age;
  const zones = [
    { label: "Zone 1 (50-60%)", min: 0.5, max: 0.6 },
    { label: "Zone 2 (60-70%)", min: 0.6, max: 0.7 },
    { label: "Zone 3 (70-80%)", min: 0.7, max: 0.8 },
    { label: "Zone 4 (80-90%)", min: 0.8, max: 0.9 },
    { label: "Zone 5 (90-100%)", min: 0.9, max: 1.0 },
  ];
  if (fcRepos && !isNaN(fcRepos)) {
    // Karvonen
    return zones.map(z => ({
      ...z,
      minBpm: Math.round((fcMax - fcRepos) * z.min + fcRepos),
      maxBpm: Math.round((fcMax - fcRepos) * z.max + fcRepos),
    }));
  } else {
    // Simple pourcentages de FC max
    return zones.map(z => ({
      ...z,
      minBpm: Math.round(fcMax * z.min),
      maxBpm: Math.round(fcMax * z.max),
    }));
  }
}

export default function FcCible() {
  const [age, setAge] = useState("");
  const [fcRepos, setFcRepos] = useState("");
  const [zones, setZones] = useState<null | ReturnType<typeof calcZones>>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age, 10);
    const fcr = fcRepos ? parseInt(fcRepos, 10) : undefined;
    if (!isNaN(a) && a > 0) {
      setZones(calcZones(a, fcr));
    } else {
      setZones(null);
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
        Calculateur de zones de fréquence cardiaque cible
      </h1>
      <p className="mb-8">
        Estimez vos zones cardio pour optimiser vos entraînements selon votre âge et, si possible, votre fréquence cardiaque de repos.
      </p>

      {/* Disclaimer placé juste après l'intro */}
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Estimation ; consulter un professionnel avant sport intense.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Âge (ans) :
          <input
            type="number"
            min="1"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          Fréquence cardiaque de repos (bpm, optionnel) :
          <input
            type="number"
            min="20"
            max="150"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={fcRepos}
            onChange={e => setFcRepos(e.target.value)}
            placeholder="ex : 60"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Calculer
        </button>
        <div className="mt-2">
          <span className="font-semibold">Zones cardio :</span>
          <br />
          {zones ? (
            <table className="mt-2 w-full text-sm border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Zone</th>
                  <th className="border px-2 py-1">BPM min</th>
                  <th className="border px-2 py-1">BPM max</th>
                </tr>
              </thead>
              <tbody>
                {zones.map(z => (
                  <tr key={z.label}>
                    <td className="border px-2 py-1">{z.label}</td>
                    <td className="border px-2 py-1">{z.minBpm}</td>
                    <td className="border px-2 py-1">{z.maxBpm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Comment sont calculées les zones cardio&nbsp;?
        </h2>
        <p>
          La fréquence cardiaque maximale (FC max) est estimée par la formule : <b>FC max = 220 - âge</b>.
          <br />
          Si vous indiquez votre fréquence cardiaque de repos, la formule de Karvonen affine le calcul des zones :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          FC cible = (FC max - FC repos) × % intensité + FC repos
        </div>
        <p>
          Exemple : 30 ans, repos 60 bpm → zone 70% ≈ 154 bpm
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Questions fréquentes sur les zones cardio
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