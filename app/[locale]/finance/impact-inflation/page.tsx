"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ImpactInflation() {
  const t = useTranslations("ImpactInflation");
  const [mode, setMode] = useState<"future" | "present">("future");
  const [valeur, setValeur] = useState("");
  const [inflation, setInflation] = useState("");
  const [annees, setAnnees] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  // FAQ dynamique comme sur la page ROI
  const faqData = Array.from({ length: 4 }).map((_, idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`)
  }));

  function calcFutureValue(valeur: number, inflation: number, annees: number) {
    return valeur * Math.pow(1 + inflation / 100, annees);
  }
  function calcPresentValue(valeur: number, inflation: number, annees: number) {
    return valeur / Math.pow(1 + inflation / 100, annees);
  }

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = parseFloat(valeur.replace(",", "."));
    const i = parseFloat(inflation.replace(",", "."));
    const a = parseFloat(annees.replace(",", "."));
    if (isNaN(v) || v <= 0) {
      setResult(null);
      setError(t("errorValeur"));
      return;
    }
    if (isNaN(i)) {
      setResult(null);
      setError(t("errorInflation"));
      return;
    }
    if (isNaN(a) || a <= 0) {
      setResult(null);
      setError(t("errorAnnees"));
      return;
    }
    if (mode === "future") {
      setResult(calcFutureValue(v, i, a));
    } else {
      setResult(calcPresentValue(v, i, a));
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8" role="main" aria-label={t("title") + ' - ' + t("intro")}> 
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8" id="impact-inflation-intro">{t("intro")}</p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800" role="note" aria-live="polite">
        <strong>Disclaimer :</strong> {t("disclaimer")}
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
        aria-labelledby="impact-inflation-form-title"
        aria-describedby="impact-inflation-intro impact-inflation-disclaimer"
        role="form"
        autoComplete="off"
      >
        <h2 id="impact-inflation-form-title" className="sr-only">{t("title")}</h2>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="future"
              checked={mode === "future"}
              onChange={() => setMode("future")}
            />
            {t("modeFuture")}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="present"
              checked={mode === "present"}
              onChange={() => setMode("present")}
            />
            {t("modePresent")}
          </label>
        </div>
        <label htmlFor="valeur-input" className="font-semibold">
          {mode === "future" ? t("valeurAujLabel") : t("valeurFuturLabel")}
        </label>
        <input
          id="valeur-input"
          name="valeur"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={valeur}
          onChange={e => setValeur(e.target.value)}
          required
          aria-required="true"
          aria-label={mode === "future" ? t("valeurAujLabel") : t("valeurFuturLabel")}
        />
        <label htmlFor="inflation-input" className="font-semibold">
          {t("inflationLabel")}
        </label>
        <input
          id="inflation-input"
          name="inflation"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={inflation}
          onChange={e => setInflation(e.target.value)}
          required
          aria-required="true"
          aria-label={t("inflationLabel")}
        />
        <label htmlFor="annees-input" className="font-semibold">
          {t("anneesLabel")}
        </label>
        <input
          id="annees-input"
          name="annees"
          type="number"
          min="1"
          step="1"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={annees}
          onChange={e => setAnnees(e.target.value)}
          required
          aria-required="true"
          aria-label={t("anneesLabel")}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
          aria-label={t("calculate")}
        >
          {t("calculate")}
        </button>
        <div className="mt-2" aria-live="polite" aria-atomic="true">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null ? (
            <>
              <span className="text-lg font-bold">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} €
              </span>
              <br />
              <span className="text-xs text-gray-500">
                {mode === "future"
                  ? t("resultFuture", { years: annees })
                  : t("resultPresent")}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq" aria-labelledby="faq-title" role="region">
        <h2 className="text-xl font-semibold mb-4" id="faq-title">{t("faqTitle")}</h2>
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
                <span className="ml-2" aria-hidden="true">{openFaq.includes(idx) ? "▲" : "▼"}</span>
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