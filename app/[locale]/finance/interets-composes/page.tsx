"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Interets() {
  const t = useTranslations("InteretsComposes");
  const [capital, setCapital] = useState("");
  const [versement, setVersement] = useState("");
  const [taux, setTaux] = useState("");
  const [annees, setAnnees] = useState("");
  const [frequence, setFrequence] = useState("mensuelle");
  const [result, setResult] = useState<null | {
    fv: number;
    interets: number;
    totalVerse: number;
  }>(null);
  const faqData = Array.from({ length: 3 }).map((_, idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`),
  }));
  const [openFaq, setOpenFaq] = useState<boolean[]>(faqData.map(() => false));

  const freqOptions = [
    { label: t("freqMensuelle"), value: "mensuelle", m: 12 },
    { label: t("freqAnnuelle"), value: "annuelle", m: 1 },
  ];

  const handleToggleFaq = (idx: number) => {
    setOpenFaq((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const P0 = parseFloat(capital.replace(",", "."));
    const v = parseFloat(versement.replace(",", "."));
    const tNum = parseFloat(taux.replace(",", ".")) / 100;
    const nAn = parseFloat(annees.replace(",", "."));
    const freq =
      freqOptions.find((f) => f.value === frequence) || freqOptions[0];
    const m = freq.m;

    if (
      !isNaN(P0) &&
      !isNaN(v) &&
      !isNaN(tNum) &&
      !isNaN(nAn) &&
      m > 0 &&
      nAn > 0
    ) {
      const i = tNum / m;
      const n = m * nAn;
      const FV =
        P0 * Math.pow(1 + i, n) +
        (v > 0 && i > 0 ? v * ((Math.pow(1 + i, n) - 1) / i) : v * n);
      const totalVerse = P0 + v * n;
      const interets = FV - totalVerse;
      setResult({ fv: FV, interets, totalVerse });
    } else {
      setResult(null);
    }
  };

  return (
    <main
      className="max-w-2xl mx-auto py-12 px-4 sm:px-8"
      role="main"
      aria-label={t("title") + " - " + t("intro")}
    >
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8">{t("intro")}</p>

      <div
        className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800"
        role="note"
        aria-live="polite"
      >
        <strong>Disclaimer :</strong> {t("disclaimer")}
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
        aria-labelledby="interets-form-title"
        aria-describedby="interets-intro interets-disclaimer"
        role="form"
        autoComplete="off"
      >
        <h2 id="interets-form-title" className="sr-only">
          {t("title")}
        </h2>
        <label htmlFor="capital-input" className="font-semibold">
          {t("capitalLabel")}
        </label>
        <input
          id="capital-input"
          name="capital"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          required
          aria-required="true"
          aria-label={t("capitalLabel")}
        />
        <label htmlFor="versement-input" className="font-semibold">
          {t("versementLabel")}
        </label>
        <input
          id="versement-input"
          name="versement"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={versement}
          onChange={(e) => setVersement(e.target.value)}
          required
          aria-required="true"
          aria-label={t("versementLabel")}
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
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={taux}
          onChange={(e) => setTaux(e.target.value)}
          required
          aria-required="true"
          aria-label={t("tauxLabel")}
        />
        <label htmlFor="annees-input" className="font-semibold">
          {t("anneesLabel")}
        </label>
        <input
          id="annees-input"
          name="annees"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={annees}
          onChange={(e) => setAnnees(e.target.value)}
          required
          aria-required="true"
          aria-label={t("anneesLabel")}
        />
        <label htmlFor="frequence-input" className="font-semibold">
          {t("frequenceLabel")}
        </label>
        <select
          id="frequence-input"
          name="frequence"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={frequence}
          onChange={(e) => setFrequence(e.target.value)}
          aria-label={t("frequenceLabel")}
        >
          {freqOptions.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <div
          className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2"
          id="interets-indicative"
        >
          {t("indicative")}{" "}
          <a
            href="#faq"
            className="underline"
            aria-label={t("learnMore") + " FAQ"}
          >
            {t("learnMore")}
          </a>
        </div>
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
          {t("fvLabel")}{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.fv.toLocaleString(undefined, { maximumFractionDigits: 2 })} €`
              : "-- €"}
          </span>
          <br />
          {t("interetsLabel")}{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.interets.toLocaleString(undefined, { maximumFractionDigits: 2 })} €`
              : "-- €"}
          </span>
          <br />
          {t("totalVerseLabel")}{" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.totalVerse.toLocaleString(undefined, { maximumFractionDigits: 2 })} €`
              : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("howTitle")}</h2>
        <p>{t("howDesc")}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("formulaTitle")}</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm whitespace-pre-line">
          {t("formula")}
        </div>
        <p>
          <strong>{t("example")}</strong>
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("whyTitle")}</h3>
        <ul className="list-disc ml-6 mb-2">
          {[0, 1, 2].map((i) => (
            <li key={i}>{t(`whyList_${i}`)}</li>
          ))}
        </ul>
      </section>

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
                onClick={() => handleToggleFaq(idx)}
                aria-expanded={openFaq[idx]}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-question-${idx}`}
                aria-label={item.question}
              >
                {item.question}
                <span className="ml-2" aria-hidden="true">
                  {openFaq[idx] ? "▲" : "▼"}
                </span>
              </button>
              {openFaq[idx] && (
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
