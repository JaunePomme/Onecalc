"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  FaPiggyBank,
  FaChartLine,
  FaSolarPanel,
  FaMoneyBillWave,
  FaCalculator,
  FaBalanceScale,
  FaHeartbeat,
  FaRunning,
  FaFire,
  FaClock,
  FaCalendarAlt,
  FaWeight,
  FaUser,
  FaExchangeAlt,
  FaGlobe,
  FaRegCalendarPlus,
  FaRegCalendarCheck,
  FaRegClock,
  FaStopwatch,
  FaBirthdayCake,
  FaPercent,
  FaEuroSign,
  FaArrowUp,
  FaArrowDown,
  FaProjectDiagram,
  FaCoins,
  FaChartPie,
  FaChartBar,
  FaWater,
  FaGlassCheers,
  FaRuler,
  FaCubes,
  FaFlask,
  FaDivide,
  FaEquals,
  FaListOl,
  FaHome,
  FaDumbbell,
} from "react-icons/fa";

export default function SearchBar() {
  const t = useTranslations("SearchBar");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const params = useParams();
  const locale =
    typeof params.locale === "string"
      ? params.locale
      : Array.isArray(params.locale)
        ? params.locale[0]
        : "fr";

  const categories = [
    {
      key: "epargne-investissement",
      name: t("categories.epargneInvestissement"),
      icon: <FaPiggyBank className="inline mr-2" />,
      calculators: [
        {
          label: t("calculators.calculROI"),
          path: "/finance/roi",
          icon: (
            <FaChartLine
              size={32}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            />
          ),
          keywords: ["roi", "retour sur investissement"],
        },
        {
          label: t("calculators.interetsComposes"),
          path: "/finance/interets-composes",
          icon: <FaCalculator size={32} />,
          keywords: [
            "intérêts",
            "interets",
            "interet",
            "composés",
            "capitalisation",
            "compose",
            "composes",
          ],
        },
        {
          label: t("calculators.objectifEpargne"),
          path: "/finance/objectif-epargne",
          icon: <FaPiggyBank size={32} />,
          keywords: [
            "objectif",
            "epargne",
            "épargne",
            "cible",
            "plan",
            "épargner",
            "combien",
          ],
        },
        {
          label: t("calculators.impactInflation"),
          path: "/finance/impact-inflation",
          icon: <FaPercent size={32} />,
          keywords: [
            "inflation",
            "valeur",
            "argent",
            "futur",
            "pouvoir d'achat",
          ],
        },
        {
          label: t("calculators.dca"),
          path: "/finance/dca",
          icon: <FaCoins size={32} />,
          keywords: [
            "dca",
            "achat régulier",
            "investissement programmé",
            "moyenne d'achat",
          ],
        },
      ],
    },
    {
      key: "credits",
      name: t("categories.credits"),
      icon: <FaMoneyBillWave className="inline mr-2" />,
      calculators: [
        {
          label: t("calculators.calculMensualites"),
          path: "/finance/mensualite-pret",
          icon: <FaCalculator size={32} />,
          keywords: [
            "mensualité",
            "mensualite",
            "mensu",
            "crédit",
            "credit",
            "prêt",
            "pret",
          ],
        },
        {
          label: t("calculators.simulateurCreditConso"),
          path: "/finance/cout-total-credit",
          icon: <FaMoneyBillWave size={32} />,
          keywords: [
            "crédit",
            "conso",
            "coût",
            "cout",
            "credit",
            "consommation",
          ],
        },
        {
          label: t("calculators.simulateurCapaciteEmprunt"),
          path: "/finance/capacite-emprunt",
          icon: <FaBalanceScale size={32} />,
          keywords: [
            "emprunt",
            "capacité",
            "simulateur",
            "capacite",
            "prêt",
            "pret",
          ],
        },
        {
          label: t("calculators.calculTauxEndettement"),
          path: "/finance/taux-endettement",
          icon: <FaBalanceScale size={32} />,
          keywords: ["endettement", "taux", "dette", "charges", "revenus"],
        },
        {
          label: t("calculators.amortissementPret"),
          path: "/finance/amortissement-pret",
          icon: <FaProjectDiagram size={32} />,
          keywords: [
            "amortissement",
            "prêt",
            "pret",
            "tableau",
            "remboursement",
            "anticipé",
            "capital",
          ],
        },
        {
          label: t("calculators.convertisseurDevises"),
          path: "/finance/conversion-devises",
          icon: <FaExchangeAlt size={32} />,
          keywords: [
            "devises",
            "conversion",
            "change",
            "monnaie",
            "devise",
            "fx",
            "usd",
            "eur",
          ],
        },
        {
          label: t("calculators.tri"),
          path: "/finance/tri",
          icon: <FaChartLine size={32} />,
          keywords: [
            "tri",
            "irr",
            "taux de rendement interne",
            "rentabilité",
            "renta",
            "investissement",
          ],
        },
        {
          label: t("calculators.van"),
          path: "/finance/van",
          icon: <FaChartPie size={32} />,
          keywords: [
            "van",
            "npv",
            "valeur actuelle nette",
            "investissement",
            "rentabilité",
            "renta",
          ],
        },
        {
          label: t("calculators.payback"),
          path: "/finance/payback",
          icon: <FaChartBar size={32} />,
          keywords: [
            "payback",
            "retour",
            "amortissement",
            "délai",
            "investissement",
          ],
        },
        {
          label: t("calculators.rendementLocatif"),
          path: "/finance/rendement-locatif",
          icon: <FaHome size={32} />,
          keywords: [
            "rendement",
            "locatif",
            "cash on cash",
            "immobilier",
            "location",
          ],
        },
      ],
    },
    {
      key: "sante-sport",
      name: t("categories.santeSport"),
      icon: <FaHeartbeat className="inline mr-2" />,
      calculators: [
        {
          label: t("calculators.imc"),
          path: "/health/imc",
          icon: <FaWeight size={32} />,
          keywords: [
            "imc",
            "indice",
            "masse",
            "corporelle",
            "santé",
            "body mass index",
          ],
        },
        {
          label: t("calculators.besoinsCaloriques"),
          path: "/health/besoins-caloriques",
          icon: <FaFire size={32} />,
          keywords: [
            "calorie",
            "besoin",
            "tdee",
            "bmr",
            "dépense",
            "calorique",
            "métabolisme",
          ],
        },
        {
          label: t("calculators.caloriesBrulees"),
          path: "/health/calories-brulees",
          icon: <FaFire size={32} />,
          keywords: [
            "calories",
            "brûlées",
            "activité",
            "sport",
            "met",
            "dépense",
          ],
        },
        {
          label: t("calculators.fcCible"),
          path: "/health/fc-cible",
          icon: <FaHeartbeat size={32} />,
          keywords: [
            "fc",
            "fréquence",
            "cardiaque",
            "cardio",
            "karvonen",
            "zones",
          ],
        },
        {
          label: t("calculators.allureVitesseTemps"),
          path: "/health/allure-vitesse-temps",
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
        {
          label: t("calculators.whr"),
          path: "/health/whr",
          icon: <FaBalanceScale size={32} />,
          keywords: [
            "whr",
            "taille",
            "hanche",
            "ratio",
            "tour de taille",
            "santé",
          ],
        },
        {
          label: t("calculators.masseGrasse"),
          path: "/health/masse-grasse",
          icon: <FaBalanceScale size={32} />,
          keywords: [
            "masse grasse",
            "taux",
            "body fat",
            "us navy",
            "composition corporelle",
          ],
        },
        {
          label: t("calculators.macros"),
          path: "/health/macros",
          icon: <FaCalculator size={32} />,
          keywords: [
            "macronutriments",
            "protéines",
            "glucides",
            "lipides",
            "répartition",
            "macro",
          ],
        },
        {
          label: t("calculators.oneRM"),
          path: "/health/1rm",
          icon: <FaDumbbell size={32} />,
          keywords: ["1rm", "force", "max", "epley", "brzycki", "musculation"],
        },
        {
          label: t("calculators.vo2maxEstime"),
          path: "/health/vo2max-estime",
          icon: <FaRunning size={32} />,
          keywords: ["vo2max", "endurance", "course", "5km", "10km"],
        },
        {
          label: t("calculators.hydratation"),
          path: "/health/hydratation",
          icon: <FaWater size={32} />,
          keywords: ["hydratation", "eau", "besoin", "quotidien", "liquide"],
        },
        {
          label: t("calculators.alcoolemie"),
          path: "/health/alcoolemie",
          icon: <FaGlassCheers size={32} />,
          keywords: ["alcoolémie", "alcool", "taux", "sang", "boisson"],
        },
      ],
    },
    {
      key: "temps-date",
      name: t("categories.tempsDate"),
      icon: <FaClock className="inline mr-2" />,
      calculators: [
        {
          label: t("calculators.differenceFuseauxHoraires"),
          path: "/time/difference-fuseaux-horaires",
          icon: <FaGlobe size={32} />,
          keywords: [
            "fuseau",
            "horaire",
            "décalage",
            "timezone",
            "différence",
            "heure",
          ],
        },
        {
          label: t("calculators.convertisseurHeure"),
          path: "/time/convertisseur-heure",
          icon: <FaExchangeAlt size={32} />,
          keywords: [
            "convertisseur",
            "heure",
            "villes",
            "paris",
            "sydney",
            "fuseau",
          ],
        },
        {
          label: t("calculators.heureActuelle"),
          path: "/time/heure-actuelle",
          icon: <FaClock size={32} />,
          keywords: ["heure", "actuelle", "locale", "ville", "maintenant"],
        },
        {
          label: t("calculators.compteARebours"),
          path: "/time/compte-a-rebours",
          icon: <FaRegClock size={32} />,
          keywords: [
            "timer",
            "compte à rebours",
            "minuteur",
            "alarme",
            "décompte",
          ],
        },
        {
          label: t("calculators.joursEntreDeuxDates"),
          path: "/time/jours-entre-deux-dates",
          icon: <FaCalendarAlt size={32} />,
          keywords: ["jours", "dates", "différence", "calendrier", "écart"],
        },
        {
          label: t("calculators.ageExact"),
          path: "/time/age-exact",
          icon: <FaUser size={32} />,
          keywords: [
            "âge",
            "age",
            "date de naissance",
            "anniversaire",
            "calcul",
          ],
        },
        {
          label: t("calculators.numeroDeSemaine"),
          path: "/time/numero-de-semaine",
          icon: <FaCalendarAlt size={32} />,
          keywords: ["semaine", "numéro", "numero", "date", "calendar", "iso"],
        },
        {
          label: t("calculators.ajouterJours"),
          path: "/time/ajouter-jours",
          icon: <FaRegCalendarPlus size={32} />,
          keywords: [
            "ajouter",
            "jours",
            "soustraire",
            "date",
            "calcul",
            "délai",
            "delai",
          ],
        },
        {
          label: t("calculators.joursOuvresEntreDates"),
          path: "/time/jours-ouvres-entre-dates",
          icon: <FaRegCalendarCheck size={32} />,
          keywords: [
            "jours ouvrés",
            "ouvré",
            "business days",
            "travail",
            "date",
          ],
        },
        {
          label: t("calculators.anniversaireProchain"),
          path: "/time/anniversaire-prochain",
          icon: <FaBirthdayCake size={32} />,
          keywords: [
            "anniversaire",
            "prochain",
            "âge",
            "age",
            "date",
            "birthday",
          ],
        },
        {
          label: t("calculators.minuteur"),
          path: "/time/minuteur",
          icon: <FaRegClock size={32} />,
          keywords: ["minuteur", "timer", "décompte", "temps"],
        },
        {
          label: t("calculators.chronometre"),
          path: "/time/chronometre",
          icon: <FaStopwatch size={32} />,
          keywords: ["chronomètre", "chrono", "temps", "mesure", "stopwatch"],
        },
      ],
    },
    {
      key: "maths-outils",
      name: t("categories.mathsOutils"),
      icon: <FaCalculator className="inline mr-2" />,
      calculators: [
        {
          label: t("calculators.moyennes"),
          path: "/maths/moyennes",
          icon: <FaDivide size={32} />,
          keywords: [
            "moyenne",
            "pondérée",
            "pondere",
            "géométrique",
            "geometrique",
            "median",
            "écart-type",
            "statistique",
            "calcul",
          ],
        },
        {
          label: t("calculators.regleDeTrois"),
          path: "/maths/regle-de-trois",
          icon: <FaEquals size={32} />,
          keywords: [
            "règle de trois",
            "regle",
            "proportion",
            "proportions",
            "calcul",
            "direct",
            "inverse",
          ],
        },
      ],
    },
    {
      key: "convertisseurs",
      name: t("categories.convertisseurs"),
      icon: <FaExchangeAlt className="inline mr-2" />,
      calculators: [
        {
          label: t("calculators.convertisseurUnites"),
          path: "/convert/units",
          icon: <FaRuler size={32} />,
          keywords: [
            "convertisseur",
            "unités",
            "longueur",
            "masse",
            "volume",
            "temperature",
            "température",
            "conversion",
          ],
        },
        {
          label: t("calculators.volume"),
          path: "/convert/volume",
          icon: <FaCubes size={32} />,
          keywords: [
            "volume",
            "cylindre",
            "boîte",
            "pièce",
            "calcul",
            "litre",
            "mètre cube",
          ],
        },
      ],
    },
    {
      key: "sciences",
      name: t("categories.sciences"),
      icon: <FaFlask className="inline mr-2" />,
      calculators: [
        {
          label: t("calculators.masseMolaire"),
          path: "/science/masse-molaire",
          icon: <FaFlask size={32} />,
          keywords: [
            "masse molaire",
            "composé",
            "chimie",
            "mole",
            "calcul",
            "formule",
          ],
        },
        {
          label: t("calculators.dilution"),
          path: "/science/dilution",
          icon: <FaFlask size={32} />,
          keywords: [
            "dilution",
            "c1v1",
            "c2v2",
            "chimie",
            "concentration",
            "solution",
          ],
        },
      ],
    },
  ];

  // Filtrage dynamique
  const filteredCategories =
    query.length > 1
      ? categories
          .map((cat) => ({
            ...cat,
            calculators: cat.calculators.filter((calc) =>
              [calc.label, ...(calc.keywords || [])].some((word) =>
                word.toLowerCase().includes(query.toLowerCase()),
              ),
            ),
          }))
          .filter((cat) => cat.calculators.length > 0)
      : categories;

  function highlight(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
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
      ),
    );
  }

  const categoryStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 px-4">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full max-w-xl p-3 rounded border border-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow"
        />
      </div>
      <div className="flex flex-col gap-8">
        {filteredCategories.map((cat) => (
          <section key={cat.name} id={cat.key} className="scroll-mt-24">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              {cat.icon}
              {cat.name}
            </h2>
            <div className="flex flex-row flex-wrap gap-4 mb-2">
              {cat.calculators.map((calc) => (
                <button
                  key={calc.path}
                  onClick={() => router.push(`/${locale}${calc.path}`)}
                  className="flex flex-col items-center w-28 p-3 bg-gray-50 dark:bg-gray-800 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition cursor-pointer border border-transparent hover:border-blue-400"
                >
                  <div>{calc.icon}</div>
                  <span className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-gray-100 ">
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
          {t("noResults")}
          <br />
          {t("suggestFeature")}
        </div>
      )}
    </div>
  );
}
