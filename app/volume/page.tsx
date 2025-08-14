"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Quels volumes puis-je calculer ici ?",
    answer:
      "Vous pouvez calculer le volume d’un cylindre (ex : bouteille, tube), d’une boîte/parallélépipède (ex : carton, aquarium) ou d’une pièce (ex : chambre, salon).",
  },
  {
    question: "Quelles unités utiliser ?",
    answer:
      "Saisissez les dimensions en mètres pour obtenir le volume en mètres cubes (m³). Pour des litres, multipliez le résultat par 1000.",
  },
  {
    question: "À quoi servent ces calculs ?",
    answer:
      "Ils servent à estimer la capacité d’un contenant, le volume d’une pièce pour le chauffage/climatisation, etc.",
  },
];

function volumeCylindre(rayon: number, hauteur: number) {
  return Math.PI * rayon * rayon * hauteur;
}

function volumeBoite(longueur: number, largeur: number, hauteur: number) {
  return longueur * largeur * hauteur;
}

export default function VolumePage() {
  const [type, setType] = useState<"cylindre" | "boite">("cylindre");
  const [rayon, setRayon] = useState("");
  const [hauteur, setHauteur] = useState("");
  const [longueur, setLongueur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (type === "cylindre") {
      const r = parseFloat(rayon.replace(",", "."));
      const h = parseFloat(hauteur.replace(",", "."));
      if (isNaN(r) || r <= 0 || isNaN(h) || h <= 0) {
        setResult(null);
        setError("Veuillez saisir un rayon et une hauteur valides.");
        return;
      }
      setResult(volumeCylindre(r, h));
    } else {
      const l = parseFloat(longueur.replace(",", "."));
      const L = parseFloat(largeur.replace(",", "."));
      const h = parseFloat(hauteur.replace(",", "."));
      if (isNaN(l) || l <= 0 || isNaN(L) || L <= 0 || isNaN(h) || h <= 0) {
        setResult(null);
        setError("Veuillez saisir des dimensions valides.");
        return;
      }
      setResult(volumeBoite(l, L, h));
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Calculateur de volume (cylindre / boîte / pièce)
      </h1>
      <p className="mb-8">
        Calculez le volume d’un cylindre (ex : bouteille), d’une boîte ou d’une pièce (parallélépipède rectangle) en mètres cubes (m³).
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, à vérifier pour les usages professionnels.
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="cylindre"
              checked={type === "cylindre"}
              onChange={() => setType("cylindre")}
            />
            Cylindre
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="boite"
              checked={type === "boite"}
              onChange={() => setType("boite")}
            />
            Boîte / Pièce
          </label>
        </div>
        {type === "cylindre" ? (
          <>
            <label>
              Rayon (m) :
              <input
                type="number"
                min="0"
                step="any"
                className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
                value={rayon}
                onChange={e => setRayon(e.target.value)}
                required
              />
            </label>
            <label>
              Hauteur (m) :
              <input
                type="number"
                min="0"
                step="any"
                className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
                value={hauteur}
                onChange={e => setHauteur(e.target.value)}
                required
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Longueur (m) :
              <input
                type="number"
                min="0"
                step="any"
                className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
                value={longueur}
                onChange={e => setLongueur(e.target.value)}
                required
              />
            </label>
            <label>
              Largeur (m) :
              <input
                type="number"
                min="0"
                step="any"
                className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
                value={largeur}
                onChange={e => setLargeur(e.target.value)}
                required
              />
            </label>
            <label>
              Hauteur (m) :
              <input
                type="number"
                min="0"
                step="any"
                className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
                value={hauteur}
                onChange={e => setHauteur(e.target.value)}
                required
              />
            </label>
          </>
        )}
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
                {result.toLocaleString("fr-FR", { maximumFractionDigits: 4 })} m³
              </span>
              <br />
              <span className="text-xs text-gray-500">
                Soit {(result * 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} litres
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Calcul du volume
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