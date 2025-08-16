"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function TauxEndettement() {
  const t = useTranslations("TauxEndettement");
  const [revenus, setRevenus] = useState("");
  const [chargesCredit, setChargesCredit] = useState("");
  const [autresCharges, setAutresCharges] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const r = parseFloat(revenus.replace(",", "."));
    const c = parseFloat(chargesCredit.replace(",", "."));
    const autres = parseFloat(autresCharges.replace(",", "."));
    if (!isNaN(r) && r > 0 && !isNaN(c) && !isNaN(autres)) {
      setResult(((c + autres) / r) * 100);
    } else {
      setResult(null);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
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
        <label className="hidden">
          Menu principal
          <input type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          {t("revenusLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={revenus}
            onChange={(e) => setRevenus(e.target.value)}
            required
            aria-label={t("revenusLabel")}
          />
        </label>
        <label>
          {t("chargesCreditLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={chargesCredit}
            onChange={(e) => setChargesCredit(e.target.value)}
            required
            aria-label={t("chargesCreditLabel")}
          />
        </label>
        <label>
          {t("autresChargesLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={autresCharges}
            onChange={(e) => setAutresCharges(e.target.value)}
            required
            aria-label={t("autresChargesLabel")}
          />
        </label>
        <div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          {t("indicative")}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          {t("calculate")}
        </button>
        <div className="mt-2">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {t("tauxLabel")}{" "}
          <span className="text-lg font-bold">
            {result !== null ? `${result.toFixed(2)} %` : "-- %"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("howTitle")}</h2>
        <p>{t("howDesc")}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("formulaTitle")}</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          {t("formula")}
        </div>
        <p>{t("exampleText")}</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          {t("exampleFormula")}
        </div>
        <p>{t("exampleResult")}</p>
      </section>

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
