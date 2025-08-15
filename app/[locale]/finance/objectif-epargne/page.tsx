
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function monthsBetween(date1: Date, date2: Date) {
  return (
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    (date2.getMonth() - date1.getMonth()) +
    (date2.getDate() >= date1.getDate() ? 0 : -1)
  );
}

function calculerEpargneMensuelle({
  objectif,
  capitalInitial,
  tauxAnnuel,
  nbMois,
}: {
  objectif: number;
  capitalInitial: number;
  tauxAnnuel: number;
  nbMois: number;
}) {
  if (nbMois <= 0) return null;
  const r = tauxAnnuel > 0 ? tauxAnnuel / 12 / 100 : 0;
  if (r === 0) {
    return (objectif - capitalInitial) / nbMois;
  }
  const num = objectif - capitalInitial * Math.pow(1 + r, nbMois);
  const denom = (Math.pow(1 + r, nbMois) - 1) / r;
  return num / denom;
}

export default function ObjectifEpargne() {
  const t = useTranslations("ObjectifEpargne");
  const [objectif, setObjectif] = useState("");
  const [capital, setCapital] = useState("");
  const [taux, setTaux] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [nbMois, setNbMois] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const obj = parseFloat(objectif.replace(",", "."));
    const cap = parseFloat(capital.replace(",", ".")) || 0;
    const tauxAnnuel = parseFloat(taux.replace(",", ".")) || 0;
    if (isNaN(obj) || obj <= 0) {
      setResult(null);
      setError(t("errorObjectif"));
      return;
    }
    if (date === "") {
      setResult(null);
      setError(t("errorDate"));
      return;
    }
    const now = new Date();
    const cible = new Date(date);
    const mois = monthsBetween(now, cible);
    setNbMois(mois);
    if (mois <= 0) {
      setResult(null);
      setError(t("errorFuture"));
      return;
    }
    const mensualite = calculerEpargneMensuelle({
      objectif: obj,
      capitalInitial: cap,
      tauxAnnuel,
      nbMois: mois,
    });
    if (mensualite === null || !isFinite(mensualite)) {
      setResult(null);
      setError(t("errorImpossible"));
      return;
    }
    setResult(mensualite);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqData = Array.from({ length: 3 }).map((_, idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`),
  }));

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8">{t("intro")}</p>
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>{t("disclaimer")}</strong>
      </div>
      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          {t("objectifLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={objectif}
            onChange={e => setObjectif(e.target.value)}
            required
            aria-label={t("objectifLabel")}
          />
        </label>
        <label>
          {t("capitalLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={capital}
            onChange={e => setCapital(e.target.value)}
            aria-label={t("capitalLabel")}
          />
        </label>
        <label>
          {t("tauxLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={taux}
            onChange={e => setTaux(e.target.value)}
            placeholder="0"
            aria-label={t("tauxLabel")}
          />
        </label>
        <label>
          {t("dateLabel")}
          <input
            type="date"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            aria-label={t("dateLabel")}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          {t("calculate")}
        </button>
        <div className="mt-2">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null && nbMois !== null ? (
            <>
              <span className="text-lg font-bold">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} € / {t("perMonth")}
              </span>
              <br />
              <span className="text-xs text-gray-500">
                {t("overMonths", { nbMois })}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">{t("faqTitle")}</h2>
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