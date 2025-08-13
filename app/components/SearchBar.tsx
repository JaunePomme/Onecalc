"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const calculators = [
  {
    label: "Calcul ROI",
    keywords: ["roi", "retour sur investissement"],
    path: "/roi",
  },
  {
    label: "Simulateur d'épargne",
    keywords: ["epargne", "simulateur d'épargne"],
    path: "/epargne",
  },
  {
    label: "Simulateur de crédit consommation",
    keywords: ["conso", "crédit"],
    path: "/conso",
  },
  {
    label: "Calculateur de mensualités",
    keywords: ["mensu", "mensualite"],
    path: "/mensualite",
  },
  {
    label: "Simulateur de crédit conso ",
    keywords: ["cout", "credit"],
    path: "/credit",
  },
  {
    label: "Simulateur de capacité d'emprunt ",
    keywords: ["simulateur", "emprunt", "capacité"],
    path: "/emprunt",
  },
  {
    label: "Calculateur d'IMC ",
    keywords: ["santé", "imc"],
    path: "/imc",
  },
  {
    label: "Intérêts composés",
    keywords: ["intérêts", "interets", "composés", "capitalisation", "placement"],
    path: "/interets",
  },
  {
    label: "Calculateur de taux d'endettement",
    keywords: ["endettement", "taux d'endettement", "dette", "charges", "revenus"],
    path: "/endettement",
  },
  {
    label: "Compte à rebours",
    keywords: ["timer", "compte à rebours", "minuteur", "alarme"],
    path: "/compte-rebours",
  },
  {
    label: "Calculateur d'âge exact",
    keywords: ["âge", "age exact", "date de naissance", "anniversaire"],
    path: "/age-exact",
  },
  {
    label: "Allure, vitesse ou temps",
    keywords: ["allure", "vitesse", "temps", "running", "course", "pace", "km/h", "min/km"],
    path: "/allure-vitesse-temps",
  },
  {
    label: "Besoin calorique journalier",
    keywords: ["besoin calorique", "tdee", "bmr", "calories", "dépense énergétique"],
    path: "/besoin-calorique",
  },
  {
    label: "Calories brûlées par activité",
    keywords: ["calories brûlées", "activité", "sport", "met", "dépense"],
    path: "/calories-brulees",
  },
  {
    label: "Zones de fréquence cardiaque cible",
    keywords: ["fc cible", "fréquence cardiaque", "cardio", "zones cardio", "karvonen"],
    path: "/fc-cible",
  },
  {
    label: "Convertisseur d'heure entre villes",
    keywords: ["convertisseur heure", "fuseau horaire", "heure ville", "décalage horaire"],
    path: "/convertisseur-heure",
  },
  {
    label: "Heure locale actuelle",
    keywords: ["heure actuelle", "heure locale", "fuseau", "ville", "maintenant"],
    path: "/heure-actuelle",
  },
  {
    label: "Jours entre deux dates",
    keywords: ["jours", "dates", "différence", "calendrier", "nombre de jours"],
    path: "/jours-entre-deux-dates",
  },
  // ...ajoute ici les autres calculs avec leurs mots-clés et chemins
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof calculators>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = calculators.filter((calc) =>
        [calc.label, ...calc.keywords].some((word) =>
          word.toLowerCase().includes(value.toLowerCase()),
        ),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (calc: (typeof calculators)[0]) => {
    setQuery("");
    setResults([]);
    router.push(calc.path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Rechercher un calcul (ex: ROI, TVA, salaire...)"
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow"
        autoFocus
      />
      {query.length > 1 && results.length === 0 && (
        <div className="absolute z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-full mt-1 rounded shadow p-4 text-center text-gray-600 dark:text-gray-300">
          Aucun calcul trouvé.
          <br />
          Vérifiez l’orthographe ou{" "}
          <a href="/contact" className="underline">
            contactez-nous
          </a>{" "}
          pour suggérer une nouvelle fonctionnalité&nbsp;!
        </div>
      )}
      {results.length > 0 && (
        <ul className="absolute z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-full mt-1 rounded shadow">
          {results.map((calc) => (
            <li
              key={calc.path}
              className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleSelect(calc)}
            >
              {calc.label}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
