"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface AmortissementRow {
  mois: number;
  mensualite: number;
  interet: number;
  capital: number;
  assurance: number;
  capitalRestant: number;
}

interface AmortissementResult {
  tableau: AmortissementRow[];
  totalInterets: number;
  totalAssurance: number;
  dureeReelle: number;
}

function calculerAmortissement(
  montant: number,
  taux: number,
  duree: number,
  assurance: number,
  remboursements: { mois: number; montant: number }[],
) {
  const mensualiteHorsAss =
    (montant * (taux / 12)) / (1 - Math.pow(1 + taux / 12, -duree * 12));
  let capitalRestant = montant;
  const tableau: AmortissementRow[] = [];
  let totalInterets = 0;
  let totalAssurance = 0;
  let mois = 1;
  let remboursementsIndex = 0;

  while (capitalRestant > 0.01 && mois <= duree * 12 + 100) {
    // Remboursement anticipé ce mois-ci ?
    if (
      remboursementsIndex < remboursements.length &&
      remboursements[remboursementsIndex].mois === mois
    ) {
      capitalRestant -= remboursements[remboursementsIndex].montant;
      remboursementsIndex++;
      if (capitalRestant < 0) capitalRestant = 0;
    }

    const interet = capitalRestant * (taux / 12);
    let capital = mensualiteHorsAss - interet;
    if (capital > capitalRestant) capital = capitalRestant;
    capitalRestant -= capital;
    const ass = assurance;
    totalInterets += interet;
    totalAssurance += ass;

    tableau.push({
      mois,
      mensualite: mensualiteHorsAss + ass,
      interet,
      capital,
      assurance: ass,
      capitalRestant: Math.max(0, capitalRestant),
    });

    if (capitalRestant <= 0.01) break;
    mois++;
  }

  return {
    tableau,
    totalInterets,
    totalAssurance,
    dureeReelle: mois,
  };
}

export default function AmortissementPret() {
  const t = useTranslations("Amortissement");
  const faqData = [0, 1, 2].map((idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`),
  }));

  const [montant, setMontant] = useState("");
  const [taux, setTaux] = useState("");
  const [duree, setDuree] = useState("");
  const [assurance, setAssurance] = useState("");
  const [remboursements, setRemboursements] = useState<
    { mois: number; montant: number }[]
  >([]);
  const [moisRemb, setMoisRemb] = useState("");
  const [montantRemb, setMontantRemb] = useState("");
  const [result, setResult] = useState<AmortissementResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleAddRemboursement = () => {
    const mois = parseInt(moisRemb, 10);
    const montant = parseFloat(montantRemb.replace(",", "."));
    if (!isNaN(mois) && mois > 0 && !isNaN(montant) && montant > 0) {
      setRemboursements(
        [...remboursements, { mois, montant }].sort((a, b) => a.mois - b.mois),
      );
      setMoisRemb("");
      setMontantRemb("");
    }
  };

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const m = parseFloat(montant.replace(",", "."));
    const tauxNum = parseFloat(taux.replace(",", ".")) / 100;
    const d = parseInt(duree, 10);
    const a = parseFloat(assurance.replace(",", ".")) || 0;
    if (
      isNaN(m) ||
      isNaN(tauxNum) ||
      isNaN(d) ||
      m <= 0 ||
      tauxNum < 0 ||
      d <= 0
    ) {
      setResult(null);
      return;
    }
    setResult(calculerAmortissement(m, tauxNum, d, a, remboursements));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <main
      className="max-w-3xl mx-auto py-12 px-4 sm:px-8"
      role="main"
      aria-label={t("title")}
    >
      <h1 className="text-3xl font-bold mb-4" id="amort-title">
        {t("title")}
      </h1>
      <p className="mb-8" id="amort-intro">
        {t("intro")}
      </p>

      <div
        className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800"
        role="note"
        aria-live="polite"
        id="amort-disclaimer"
      >
        <strong>Disclaimer :</strong> {t("disclaimer")}
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
        aria-labelledby="amort-form-title"
        aria-describedby="amort-intro amort-disclaimer"
        role="form"
        autoComplete="off"
      >
        <h2 id="amort-form-title" className="sr-only">
          {t("title")}
        </h2>
        <label htmlFor="montant-input" className="font-semibold">
          {t("montantLabel")}
        </label>
        <input
          id="montant-input"
          name="montant"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
          aria-required="true"
          aria-label={t("montantLabel")}
        />
        <label htmlFor="taux-input" className="font-semibold">
          {t("tauxLabel")}
        </label>
        <input
          id="taux-input"
          name="taux"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={taux}
          onChange={(e) => setTaux(e.target.value)}
          required
          aria-required="true"
          aria-label={t("tauxLabel")}
        />
        <label htmlFor="duree-input" className="font-semibold">
          {t("dureeLabel")}
        </label>
        <input
          id="duree-input"
          name="duree"
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
          required
          aria-required="true"
          aria-label={t("dureeLabel")}
        />
        <label htmlFor="assurance-input" className="font-semibold">
          {t("assuranceLabel")}
        </label>
        <input
          id="assurance-input"
          name="assurance"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={assurance}
          onChange={(e) => setAssurance(e.target.value)}
          aria-label={t("assuranceLabel")}
        />
        <div className="flex flex-col md:flex-row gap-2 items-end">
          <div className="flex-1">
            <label htmlFor="mois-remb-input" className="font-semibold">
              {t("moisRembLabel")}
            </label>
            <input
              id="mois-remb-input"
              name="mois-remb"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={moisRemb}
              onChange={(e) => setMoisRemb(e.target.value)}
              placeholder="ex: 24"
              aria-label={t("moisRembLabel")}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="montant-remb-input" className="font-semibold">
              {t("montantRembLabel")}
            </label>
            <input
              id="montant-remb-input"
              name="montant-remb"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={montantRemb}
              onChange={(e) => setMontantRemb(e.target.value)}
              placeholder="ex: 5000"
              aria-label={t("montantRembLabel")}
            />
          </div>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleAddRemboursement}
            aria-label={t("ajouterRemb")}
          >
            {t("ajouterRemb")}
          </button>
        </div>
        {remboursements.length > 0 && (
          <div
            className="text-sm text-gray-700 dark:text-gray-200 mt-2"
            id="amort-remb-list"
          >
            <strong>{t("remboursements")}</strong>{" "}
            {remboursements.map((r, i) => (
              <span key={i} className="inline-block mr-2">
                {t("mois")} {r.mois} : {r.montant} €
              </span>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
          aria-label={t("calculer")}
        >
          {t("calculer")}
        </button>
      </form>

      {result && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">{t("resume")}</h2>
          <div className="mb-2">
            <strong>{t("dureeReelle")}</strong> {result.dureeReelle} {t("mois")}
          </div>
          <div className="mb-2">
            <strong>{t("totalInterets")}</strong>{" "}
            {result.totalInterets.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            €
          </div>
          <div className="mb-2">
            <strong>{t("totalAssurance")}</strong>{" "}
            {result.totalAssurance.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            €
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-xs border">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-2 border">{t("mois")}</th>
                  <th className="p-2 border">{t("mensualite")}</th>
                  <th className="p-2 border">{t("interets")}</th>
                  <th className="p-2 border">{t("capitalRemb")}</th>
                  <th className="p-2 border">{t("assurance")}</th>
                  <th className="p-2 border">{t("capitalRestant")}</th>
                </tr>
              </thead>
              <tbody>
                {result.tableau.map((row: AmortissementRow) => (
                  <tr
                    key={row.mois}
                    className={
                      row.capitalRestant === 0
                        ? "bg-green-50 dark:bg-green-900"
                        : ""
                    }
                  >
                    <td className="p-2 border">{row.mois}</td>
                    <td className="p-2 border">
                      {row.mensualite.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-2 border">
                      {row.interet.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-2 border">
                      {row.capital.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-2 border">
                      {row.assurance.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-2 border">
                      {row.capitalRestant.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <section
        className="mb-6"
        id="faq"
        aria-labelledby="faq-title"
        role="region"
      >
        <h2 className="text-xl font-semibold mb-4" id="faq-title">
          {t("faqTitle")}
        </h2>
        <div className="flex flex-col gap-2">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="border rounded bg-gray-50 dark:bg-gray-900"
              role="group"
              aria-labelledby={`faq-question-${idx}`}
            >
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center"
                onClick={() => toggleFaq(idx)}
                aria-expanded={openFaq.includes(idx)}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-question-${idx}`}
                aria-label={item.question}
              >
                {item.question}
                <span className="ml-2" aria-hidden="true">
                  {openFaq.includes(idx) ? "▲" : "▼"}
                </span>
              </button>
              {openFaq.includes(idx) && (
                <div
                  id={`faq-panel-${idx}`}
                  className="px-4 pb-4 text-gray-700 dark:text-gray-200 animate-fade-in"
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  tabIndex={0}
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
