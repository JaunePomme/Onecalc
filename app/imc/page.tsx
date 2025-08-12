"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Qu’est-ce que l’IMC ?",
    answer:
      "L’IMC, ou Indice de Masse Corporelle, est un indicateur qui permet d’évaluer la corpulence d’une personne en fonction de son poids et de sa taille.",
  },
  {
    question: "Comment se calcule l’IMC ?",
    answer:
      "L’IMC se calcule en divisant le poids (en kilogrammes) par la taille au carré (en mètres). Par exemple, IMC = poids (kg) ÷ taille² (m²).",
  },
  {
    question: "À quoi sert le calculateur d’IMC ?",
    answer:
      "Le calculateur d’IMC permet de savoir si votre poids est considéré comme insuffisant, normal, en surpoids ou obèse selon les normes de l’OMS.",
  },
  {
    question: "L’IMC est-il suffisant pour évaluer ma santé ?",
    answer:
      "L’IMC est un indicateur utile mais imparfait : il ne prend pas en compte la masse musculaire, la répartition des graisses ni d’autres facteurs comme l’âge ou le sexe.",
  },
  {
    question: "Quand faut-il recalculer son IMC ?",
    answer:
      "Il est conseillé de recalculer votre IMC régulièrement, surtout en cas de variation de poids significative ou lors d’un suivi médical ou nutritionnel.",
  },
];

function getImcCategory(imc: number) {
  if (imc < 18.5) return "Insuffisance pondérale";
  if (imc < 25) return "Poids normal";
  if (imc < 30) return "Surpoids";
  if (imc < 35) return "Obésité légère";
  if (imc < 40) return "Obésité modérée";
  return "Obésité massive";
}

export default function Imc() {
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [imc, setImc] = useState<null | number>(null);
  const [categorie, setCategorie] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(poids.replace(",", "."));
    const t = parseFloat(taille.replace(",", ".")) / 100;
    if (!isNaN(p) && !isNaN(t) && t > 0) {
      const val = p / (t * t);
      setImc(val);
      setCategorie(getImcCategory(val));
    } else {
      setImc(null);
      setCategorie(null);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">Calculez votre IMC rapidement en ligne</h1>
      <p className="mb-8">
        Calculez votre IMC et découvrez votre catégorie.
      </p>

      <form onSubmit={handleCalc} className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow">
        <label className="hidden">
          Menu principal
          <input type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Poids (en kg) :
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
          Taille (en cm) :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={taille}
            onChange={e => setTaille(e.target.value)}
            required
          />
        </label>
        <div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          ⚠️ Les résultats sont donnés à titre indicatif. <a href="#faq" className="underline">En savoir plus</a>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Calculer
        </button>
        <div className="mt-2">
          <span className="font-semibold">Résultat :</span><br />
          IMC :{" "}
          <span className="text-lg font-bold">
            {imc !== null ? imc.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) : "--"}
          </span>
          , Catégorie :{" "}
          <span className="text-lg font-bold">
            {categorie ?? "--"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Qu'est-ce que l'IMC ?</h2>
        <p>
          L'Indice de Masse Corporelle (IMC) est un indicateur utilisé pour évaluer la corpulence d’une personne en fonction de son poids et de sa taille. Il permet de catégoriser les individus selon leur risque d’être affectés par des maladies liées au surpoids ou à l’insuffisance pondérale. C'est un outil simple et largement utilisé dans les domaines médicaux et de la santé publique.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Comment est-il calculé ?</h3>
        <p>
          Le calcul de l'IMC repose sur la relation suivante entre le poids et la taille :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          IMC = poids (kg) / (taille (m) × taille (m))
        </div>
        <p>
          Par exemple, si une personne pèse 70 kg et mesure 1,75 m, l'IMC se calcule ainsi :
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          IMC = 70 / (1.75 × 1.75) ≈ 22.86
        </div>
        <p>
          Dans cet exemple, l'IMC est de 22.86, ce qui indique que cette personne a un poids dans la catégorie normale.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Interprétation de l'IMC</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Moins de 18,5 :</strong> Insuffisance pondérale - Cela signifie que la personne est trop maigre par rapport à sa taille, ce qui peut entraîner des risques pour la santé comme un affaiblissement du système immunitaire.</li>
          <li><strong>18,5 à 24,9 :</strong> Poids normal - Cela correspond à un poids équilibré par rapport à la taille, considéré comme optimal pour la santé.</li>
          <li><strong>25 à 29,9 :</strong> Surpoids - Le surpoids est une zone où le risque de développer des maladies liées au métabolisme (diabète, hypertension, maladies cardiovasculaires) commence à augmenter.</li>
          <li><strong>30 à 34,9 :</strong> Obésité légère - L’obésité légère comporte un risque accru de complications de santé telles que des troubles cardiaques et respiratoires.</li>
          <li><strong>35 à 39,9 :</strong> Obésité modérée - Un risque de développer des pathologies graves augmente encore davantage avec cette catégorie.</li>
          <li><strong>40 et plus :</strong> Obésité massive - L’obésité massive présente un risque majeur de maladies graves, notamment des maladies cardiovasculaires, des diabètes de type 2, et des cancers.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pourquoi utiliser ce calculateur ?</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Évaluation rapide de la corpulence :</strong> L'IMC permet d'avoir une idée rapide de la corpulence d'une personne sans avoir besoin d'examens médicaux compliqués.</li>
          <li><strong>Suivi de l’évolution pondérale :</strong> Il est utile pour surveiller les changements dans le poids au fil du temps, en particulier lorsqu'un objectif de santé est visé, comme perdre du poids ou maintenir un poids stable.</li>
          <li><strong>Prévention des risques :</strong> Un IMC élevé ou faible peut être un indicateur de risques pour la santé, permettant de prendre des mesures préventives en consultant un professionnel de santé.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Limites de l'IMC</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><strong>Ne prend pas en compte la composition corporelle :</strong> L'IMC ne distingue pas entre la masse graisseuse et la masse musculaire. Ainsi, une personne très musclée peut avoir un IMC élevé sans être en surpoids.</li>
          <li><strong>Ne tient pas compte de l’âge et du sexe :</strong> Les besoins corporels et la répartition de la graisse varient en fonction de l'âge et du sexe, ce qui n’est pas pris en compte dans l'IMC.</li>
          <li><strong>Peut être trompeur dans certains cas :</strong> Par exemple, une personne âgée ayant perdu de la masse musculaire pourrait être classée dans une catégorie "poids normal" alors qu’elle souffre en réalité d’une insuffisance musculaire.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Quand consulter un professionnel ?</h3>
        <p>
          Si vous obtenez un IMC qui vous place dans les catégories "surpoids", "obésité" ou "insuffisance pondérale", il est conseillé de consulter un médecin ou un nutritionniste. Un professionnel pourra évaluer votre état de santé de manière plus précise et vous guider vers les meilleures pratiques alimentaires et d'exercice.
        </p>
      </section>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">FAQ - Questions fréquentes sur le calcul de l’IMC</h2>
        <div className="flex flex-col gap-2">
          {faqData.map((item, idx) => (
            <div key={idx} className="border rounded bg-gray-50 dark:bg-gray-900">
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                {item.question}
                <span className="ml-2">{openFaq === idx ? "▲" : "▼"}</span>
              </button>
              {openFaq === idx && (
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
