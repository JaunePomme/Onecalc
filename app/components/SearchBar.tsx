"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPiggyBank, FaChartLine, FaSolarPanel, FaMoneyBillWave, FaCalculator, FaBalanceScale, FaHeartbeat, FaRunning, FaFire, FaClock, FaCalendarAlt, FaWeight, FaUser, FaExchangeAlt } from "react-icons/fa";

const categories = [
    {
        name: "Épargne & Investissement",
        icon: <FaPiggyBank className="inline mr-2" />,
        calculators: [
            {
                label: "Simulateur d'épargne",
                path: "/finance/epargne",
                icon: <FaPiggyBank size={32} />,
                keywords: ["epargne", "épargne", "placement", "investissement"],
            },
            {
                label: "Calcul ROI",
                path: "/finance/roi",
                icon: <FaChartLine size={32} />,
                keywords: ["roi", "retour sur investissement"],
            },
            {
                label: "Intérêts composés",
                path: "/finance/interets-composes",
                icon: <FaCalculator size={32} />,
                keywords: ["intérêts", "interets", "interet", "composés", "capitalisation", "compose", "composes"],
            },
        ],
    },
    {
        name: "Crédits",
        icon: <FaMoneyBillWave className="inline mr-2" />,
        calculators: [
            {
                label: "Calculateur de mensualités",
                path: "/finance/mensualite-pret",
                icon: <FaCalculator size={32} />,
                keywords: ["mensualité", "mensualite", "mensu", "crédit", "credit"],
            },
            {
                label: "Simulateur de crédit conso",
                path: "/finance/cout-total-credit",
                icon: <FaMoneyBillWave size={32} />,
                keywords: ["crédit", "conso", "coût", "cout", "credit"],
            },
            {
                label: "Simulateur de capacité d'emprunt",
                path: "/finance/capacite-emprunt",
                icon: <FaBalanceScale size={32} />,
                keywords: ["emprunt", "capacité", "simulateur", "capacite"],
            },
            {
                label: "Calculateur de taux d'endettement",
                path: "/finance/taux-endettement",
                icon: <FaBalanceScale size={32} />,
                keywords: ["endettement", "taux", "dette", "charges", "revenus"],
            },
        ],
    },
    {
        name: "Santé & Sport",
        icon: <FaHeartbeat className="inline mr-2" />,
        calculators: [
            {
                label: "Calculateur d'IMC",
                path: "/imc",
                icon: <FaWeight size={32} />,
                keywords: ["imc", "indice", "masse", "corporelle", "santé"],
            },
            {
                label: "Calculateur d'âge exact",
                path: "/age-exact",
                icon: <FaUser size={32} />,
                keywords: ["âge", "age", "date de naissance", "anniversaire"],
            },
            {
                label: "Besoin calorique journalier",
                path: "/besoin-calorique",
                icon: <FaFire size={32} />,
                keywords: ["calorie", "besoin", "tdee", "bmr", "dépense"],
            },
            {
                label: "Calories brûlées par activité",
                path: "/calories-brulees",
                icon: <FaFire size={32} />,
                keywords: ["calories", "brûlées", "activité", "sport", "met"],
            },
            {
                label: "Zones de fréquence cardiaque cible",
                path: "/fc-cible",
                icon: <FaHeartbeat size={32} />,
                keywords: ["fc", "fréquence", "cardiaque", "cardio", "karvonen"],
            },
        ],
    },
    {
        name: "Temps & Date",
        icon: <FaClock className="inline mr-2" />,
        calculators: [
            {
                label: "Compte à rebours",
                path: "/compte-rebours",
                icon: <FaClock size={32} />,
                keywords: ["timer", "compte à rebours", "minuteur", "alarme"],
            },
            {
                label: "Convertisseur d'heure entre villes",
                path: "/convertisseur-heure",
                icon: <FaExchangeAlt size={32} />,
                keywords: ["convertisseur", "heure", "fuseau", "ville", "décalage"],
            },
            {
                label: "Heure locale actuelle",
                path: "/heure-actuelle",
                icon: <FaClock size={32} />,
                keywords: ["heure", "actuelle", "locale", "maintenant"],
            },
            {
                label: "Jours entre deux dates",
                path: "/jours-entre-deux-dates",
                icon: <FaCalendarAlt size={32} />,
                keywords: ["jours", "dates", "différence", "calendrier"],
            },
        ],
    },
    {
        name: "Sport & Performance",
        icon: <FaRunning className="inline mr-2" />,
        calculators: [
            {
                label: "Allure, vitesse ou temps",
                path: "/allure-vitesse-temps",
                icon: <FaRunning size={32} />,
                keywords: [
                    "allure",
                    "vitesse",
                    "temps",
                    "running",
                    "course",
                    "pace",
                    "km/h",
                    "min/km",
                ],
            },
        ],
    },
];

function highlight(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) && part.toLowerCase() === query.toLowerCase() ? (
            <span
                key={i}
                style={{
                    background: "#fff59d",
                    color: "#222",
                    borderRadius: "2px",
                    padding: "0 1px",
                }}
            >
                {part}
            </span>
        ) : (
            part
        )
    );
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    // Filtrage dynamique
    const filteredCategories =
        query.length > 1
            ? categories
                    .map((cat) => ({
                        ...cat,
                        calculators: cat.calculators.filter((calc) =>
                            [calc.label, ...(calc.keywords || [])]
                                .some((word) => word.toLowerCase().includes(query.toLowerCase()))
                        ),
                    }))
                    .filter((cat) => cat.calculators.length > 0)
            : categories;

    return (
        <div className="w-full max-w-4xl mx-auto pt-8 px-4">
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un calcul (ex: ROI, TVA, salaire...)"
                    className="w-full max-w-xl p-3 rounded border border-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow"
                />
            </div>
            <div className="flex flex-col gap-8">
                {filteredCategories.map((cat) => (
                    <div key={cat.name}>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            {cat.icon}
                            {cat.name}
                        </h2>
                        <div className="flex flex-row flex-wrap gap-4 mb-2">
                            {cat.calculators.map((calc) => (
                                <button
                                    key={calc.path}
                                    onClick={() => router.push(calc.path)}
                                    className="flex flex-col items-center w-28 p-3 bg-gray-50 dark:bg-gray-800 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition cursor-pointer border border-transparent hover:border-blue-400"
                                >
                                    <div>{calc.icon}</div>
                                    <span className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {highlight(calc.label, query)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {query.length > 1 && filteredCategories.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    Aucun calcul trouvé.
                    <br />
                    Vérifiez l’orthographe ou{" "}
                    <a href="/contact" className="underline">
                        contactez-nous
                    </a>{" "}
                    pour suggérer une nouvelle fonctionnalité&nbsp;!
                </div>
            )}
        </div>
    );
}
