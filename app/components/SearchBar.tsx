"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaPiggyBank, FaChartLine, FaSolarPanel, FaMoneyBillWave, FaCalculator, FaBalanceScale,
    FaHeartbeat, FaRunning, FaFire, FaClock, FaCalendarAlt, FaWeight, FaUser, FaExchangeAlt,
    FaGlobe, FaRegCalendarPlus, FaRegCalendarCheck, FaRegClock, FaStopwatch, FaBirthdayCake, FaPercent, FaEuroSign, FaArrowUp, FaArrowDown, FaProjectDiagram, FaCoins, FaChartPie, FaChartBar, FaWater, FaGlassCheers, FaRuler, FaCubes, FaFlask, FaDivide, FaEquals, FaListOl,
    FaHome,
    FaDumbbell
} from "react-icons/fa";

const categories = [
    {
        key: "epargne-investissement",
        name: "Épargne & Investissement",
        icon: <FaPiggyBank className="inline mr-2" />,
        calculators: [
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
            {
                label: "Objectif épargne",
                path: "/finance/objectif-epargne",
                icon: <FaPiggyBank size={32} />,
                keywords: ["objectif", "epargne", "épargne", "cible", "plan", "épargner", "combien"],
            },
            {
                label: "Impact de l’inflation",
                path: "/finance/impact-inflation",
                icon: <FaPercent size={32} />,
                keywords: ["inflation", "valeur", "argent", "futur", "pouvoir d'achat"],
            },
            {
                label: "DCA (achat périodique)",
                path: "/finance/dca",
                icon: <FaCoins size={32} />,
                keywords: ["dca", "achat régulier", "investissement programmé", "moyenne d'achat"],
            },
        ],
    },
    {
        key: "credits",
        name: "Crédits",
        icon: <FaMoneyBillWave className="inline mr-2" />,
        calculators: [
            {
                label: "Calculateur de mensualités",
                path: "/finance/mensualite-pret",
                icon: <FaCalculator size={32} />,
                keywords: ["mensualité", "mensualite", "mensu", "crédit", "credit", "prêt", "pret"],
            },
            {
                label: "Simulateur de crédit conso",
                path: "/finance/cout-total-credit",
                icon: <FaMoneyBillWave size={32} />,
                keywords: ["crédit", "conso", "coût", "cout", "credit", "consommation"],
            },
            {
                label: "Simulateur de capacité d'emprunt",
                path: "/finance/capacite-emprunt",
                icon: <FaBalanceScale size={32} />,
                keywords: ["emprunt", "capacité", "simulateur", "capacite", "prêt", "pret"],
            },
            {
                label: "Calculateur de taux d'endettement",
                path: "/finance/taux-endettement",
                icon: <FaBalanceScale size={32} />,
                keywords: ["endettement", "taux", "dette", "charges", "revenus"],
            },
            {
                label: "Amortissement de prêt",
                path: "/finance/amortissement-pret",
                icon: <FaProjectDiagram size={32} />,
                keywords: ["amortissement", "prêt", "pret", "tableau", "remboursement", "anticipé", "capital"],
            },
            {
                label: "Convertisseur de devises",
                path: "/finance/conversion-devises",
                icon: <FaExchangeAlt size={32} />,
                keywords: ["devises", "conversion", "change", "monnaie", "devise", "fx", "usd", "eur"],
            },
            {
                label: "TRI / IRR (simple)",
                path: "/finance/tri",
                icon: <FaChartLine size={32} />,
                keywords: ["tri", "irr", "taux de rendement interne", "rentabilité", "renta", "investissement"],
            },
            {
                label: "VAN / NPV (simple)",
                path: "/finance/van",
                icon: <FaChartPie size={32} />,
                keywords: ["van", "npv", "valeur actuelle nette", "investissement", "rentabilité", "renta"],
            },
            {
                label: "Payback period",
                path: "/finance/payback",
                icon: <FaChartBar size={32} />,
                keywords: ["payback", "retour", "amortissement", "délai", "investissement"],
            },
            {
                label: "Rendement locatif / cash-on-cash",
                path: "/finance/rendement-locatif",
                icon: <FaHome size={32} />,
                keywords: ["rendement", "locatif", "cash on cash", "immobilier", "location"],
            },
        ],
    },
    {
        key: "sante-sport",
        name: "Santé & Sport",
        icon: <FaHeartbeat className="inline mr-2" />,
        calculators: [
            {
                label: "Calculateur d'IMC",
                path: "/health/imc",
                icon: <FaWeight size={32} />,
                keywords: ["imc", "indice", "masse", "corporelle", "santé", "body mass index"],
            },
            {
                label: "Besoins caloriques (BMR/TDEE)",
                path: "/health/besoins-caloriques",
                icon: <FaFire size={32} />,
                keywords: ["calorie", "besoin", "tdee", "bmr", "dépense", "calorique", "métabolisme"],
            },
            {
                label: "Calories brûlées par activité",
                path: "/health/calories-brulees",
                icon: <FaFire size={32} />,
                keywords: ["calories", "brûlées", "activité", "sport", "met", "dépense"],
            },
            {
                label: "Fréquence cardiaque cible (zones)",
                path: "/health/fc-cible",
                icon: <FaHeartbeat size={32} />,
                keywords: ["fc", "fréquence", "cardiaque", "cardio", "karvonen", "zones"],
            },
            {
                label: "Allure / vitesse / temps (course)",
                path: "/health/allure-vitesse-temps",
                icon: <FaRunning size={32} />,
                keywords: ["allure", "vitesse", "temps", "running", "course", "pace", "km/h", "min/km"],
            },
            {
                label: "Ratio taille/hanche (WHR)",
                path: "/health/whr",
                icon: <FaBalanceScale size={32} />,
                keywords: ["whr", "taille", "hanche", "ratio", "tour de taille", "santé"],
            },
            {
                label: "Taux de masse grasse (US Navy)",
                path: "/health/masse-grasse",
                icon: <FaBalanceScale size={32} />,
                keywords: ["masse grasse", "taux", "body fat", "us navy", "composition corporelle"],
            },
            {
                label: "Calcul macronutriments",
                path: "/health/macros",
                icon: <FaCalculator size={32} />,
                keywords: ["macronutriments", "protéines", "glucides", "lipides", "répartition", "macro"],
            },
            {
                label: "1RM (force – Epley/Brzycki)",
                path: "/health/1rm",
                icon: <FaDumbbell size={32} />,
                keywords: ["1rm", "force", "max", "epley", "brzycki", "musculation"],
            },
            {
                label: "Estimation VO2max (5 km/10 km)",
                path: "/health/vo2max-estime",
                icon: <FaRunning size={32} />,
                keywords: ["vo2max", "endurance", "course", "5km", "10km", "cardio"],
            },
            {
                label: "Hydratation quotidienne estimée",
                path: "/health/hydratation",
                icon: <FaWater size={32} />,
                keywords: ["hydratation", "eau", "besoin", "quotidien", "liquide"],
            },
            {
                label: "Alcoolémie estimée",
                path: "/health/alcoolemie",
                icon: <FaGlassCheers size={32} />,
                keywords: ["alcoolémie", "alcool", "taux", "sang", "boisson"],
            },
        ],
    },
    {
        key: "temps-date",
        name: "Temps & Date",
        icon: <FaClock className="inline mr-2" />,
        calculators: [
            {
                label: "Différence de fuseaux horaires",
                path: "/time/difference-fuseaux-horaires",
                icon: <FaGlobe size={32} />,
                keywords: ["fuseau", "horaire", "décalage", "timezone", "différence", "heure"],
            },
            {
                label: "Convertisseur d’heure (villes)",
                path: "/time/convertisseur-heure",
                icon: <FaExchangeAlt size={32} />,
                keywords: ["convertisseur", "heure", "villes", "paris", "sydney", "fuseau"],
            },
            {
                label: "Heure actuelle par ville",
                path: "/time/heure-actuelle",
                icon: <FaClock size={32} />,
                keywords: ["heure", "actuelle", "locale", "ville", "maintenant"],
            },
            {
                label: "Compte à rebours",
                path: "/time/compte-a-rebours",
                icon: <FaRegClock size={32} />,
                keywords: ["timer", "compte à rebours", "minuteur", "alarme", "décompte"],
            },
            {
                label: "Jours entre deux dates",
                path: "/time/jours-entre-deux-dates",
                icon: <FaCalendarAlt size={32} />,
                keywords: ["jours", "dates", "différence", "calendrier", "écart"],
            },
            {
                label: "Âge exact (années/mois/jours)",
                path: "/time/age-exact",
                icon: <FaUser size={32} />,
                keywords: ["âge", "age", "date de naissance", "anniversaire", "calcul"],
            },
            {
                label: "Numéro de semaine d’une date",
                path: "/time/numero-de-semaine",
                icon: <FaCalendarAlt size={32} />,
                keywords: ["semaine", "numéro", "numero", "date", "calendar", "iso"],
            },
            {
                label: "Date +N jours (ajouter/soustraire)",
                path: "/time/ajouter-jours",
                icon: <FaRegCalendarPlus size={32} />,
                keywords: ["ajouter", "jours", "soustraire", "date", "calcul", "délai", "delai"],
            },
            {
                label: "Jours ouvrés entre deux dates",
                path: "/time/jours-ouvres-entre-dates",
                icon: <FaRegCalendarCheck size={32} />,
                keywords: ["jours ouvrés", "ouvré", "business days", "travail", "date"],
            },
            {
                label: "Prochain anniversaire / âge à une date",
                path: "/time/anniversaire-prochain",
                icon: <FaBirthdayCake size={32} />,
                keywords: ["anniversaire", "prochain", "âge","age", "date", "birthday"],
            },
            {
                label: "Minuteur",
                path: "/time/minuteur",
                icon: <FaRegClock size={32} />,
                keywords: ["minuteur", "timer", "décompte", "temps"],
            },
            {
                label: "Chronomètre",
                path: "/time/chronometre",
                icon: <FaStopwatch size={32} />,
                keywords: ["chronomètre", "chrono", "temps", "mesure", "stopwatch"],
            },
        ],
    },
    {
        key: "maths-outils",
        name: "Maths & Outils",
        icon: <FaCalculator className="inline mr-2" />,
        calculators: [
            {
                label: "Moyenne pondérée/géométrique/médiane/écart-type",
                path: "/maths/moyennes",
                icon: <FaDivide size={32} />,
                keywords: ["moyenne", "pondérée", "pondere", "géométrique", "geometrique", "median", "écart-type", "statistique", "calcul"],
            },
            {
                label: "Règle de trois / proportions",
                path: "/maths/regle-de-trois",
                icon: <FaEquals size={32} />,
                keywords: ["règle de trois", "regle", "proportion", "proportions", "calcul", "direct", "inverse"],
            },
        ],
    },
    {
        key: "convertisseurs",
        name: "Convertisseurs",
        icon: <FaExchangeAlt className="inline mr-2" />,
        calculators: [
            {
                label: "Convertisseur d’unités",
                path: "/convert/units",
                icon: <FaRuler size={32} />,
                keywords: ["convertisseur", "unités", "longueur", "masse", "volume", "temperature", "température", "conversion"],
            },
            {
                label: "Volume (cylindre/boîte/pièce)",
                path: "/convert/volume",
                icon: <FaCubes size={32} />,
                keywords: ["volume", "cylindre", "boîte", "pièce", "calcul", "litre", "mètre cube"],
            },
        ],
    },
    {
        key: "sciences",
        name: "Sciences",
        icon: <FaFlask className="inline mr-2" />,
        calculators: [
            {
                label: "Masse molaire (composé)",
                path: "/science/masse-molaire",
                icon: <FaFlask size={32} />,
                keywords: ["masse molaire", "composé", "chimie", "mole", "calcul", "formule"],
            },
            {
                label: "Dilution (C1V1=C2V2)",
                path: "/science/dilution",
                icon: <FaFlask size={32} />,
                keywords: ["dilution", "c1v1", "c2v2", "chimie", "concentration", "solution"],
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
                    <section
                        key={cat.name}
                        id={cat.key}
                        className="scroll-mt-24"
                    >
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
                    </section>
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
