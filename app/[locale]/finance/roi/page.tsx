"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Roi() {
  const [invested, setInvested] = useState("");
  const [gains, setGains] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const t = useTranslations("ROI");

  // Reconstruire la FAQ à partir des clés plates (avec underscores)
  const faqData = Array.from({ length: 8 }).map((_, idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`),
  }));

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const investedNum = parseFloat(invested.replace(",", "."));
    const gainsNum = parseFloat(gains.replace(",", "."));
    if (!isNaN(investedNum) && investedNum !== 0 && !isNaN(gainsNum)) {
      setResult((gainsNum / investedNum) * 100);
    } else {
      setResult(null);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("invested", invested);
    url.searchParams.set("gains", gains);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const investedParam = urlParams.get("invested");
    const gainsParam = urlParams.get("gains");

    if (investedParam) setInvested(investedParam);
    if (gainsParam) setGains(gainsParam);

    if (investedParam && gainsParam) {
      const investedNum = parseFloat(investedParam.replace(",", "."));
      const gainsNum = parseFloat(gainsParam.replace(",", "."));
      if (!isNaN(investedNum) && investedNum !== 0 && !isNaN(gainsNum)) {
        setResult((gainsNum / investedNum) * 100);
      }
    }
  }, []);

  return (
    <main
      className="max-w-2xl mx-auto py-12 px-4 sm:px-8"
      role="main"
      aria-label={t("title") + " - " + t("intro")}
    >
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8" id="roi-intro">
        {t("intro")}
      </p>

      {/* Disclaimer placé juste après l'intro */}
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
        aria-labelledby="roi-form-title"
        aria-describedby="roi-intro roi-disclaimer"
        role="form"
        autoComplete="off"
      >
        <h2 id="roi-form-title" className="sr-only">
          {t("title")}
        </h2>
        <label htmlFor="invested-input" className="font-semibold">
          {t("investedLabel")}
        </label>
        <input
          id="invested-input"
          name="invested"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={invested}
          onChange={(e) => setInvested(e.target.value)}
          required
          aria-required="true"
          aria-label={t("investedLabel")}
        />
        <label htmlFor="gains-input" className="font-semibold">
          {t("gainsLabel")}
        </label>
        <input
          id="gains-input"
          name="gains"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={gains}
          onChange={(e) => setGains(e.target.value)}
          required
          aria-required="true"
          aria-label={t("gainsLabel")}
        />
        <div
          className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2"
          id="roi-indicative"
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
          {t("yieldLabel")}{" "}
          <span className="text-lg font-bold">
            {result !== null ? `${result.toFixed(2)} %` : "-- %"}
          </span>
        </div>
      </form>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleShare}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          // aria-label={t("share")}
        >
          🔗
        </button>
      </div>

      {showPopup && (
        <div
          className="fixed bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg"
          role="alert"
          aria-live="polite"
        >
          {t("linkCopied")}
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("howTitle")}</h2>
        <p>{t("howDesc")}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("howCalcTitle")}</h3>
        <p>{t("howCalcDesc")}</p>
        <ul className="list-disc ml-6 mb-2">
          <li>
            <strong>{t("grossYield")}</strong>: {t("grossYieldDesc")}
          </li>
          <li>
            <strong>{t("netYield")}</strong>: {t("netYieldDesc")}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="font-semibold mb-1">{t("grossYield")}</h4>
        <p>{t("grossFormula")}</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
          {t("grossFormula")}
        </div>
        <p className="mb-1">{t("grossExampleTitle")}</p>
        <ul className="list-disc ml-6 mb-2">
          {[0, 1].map((i) => (
            <li key={i}>{t(`grossExampleList_${i}`)}</li>
          ))}
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
          {t("grossExampleResult")}
        </div>
        <p>{t("grossExampleDesc")}</p>
      </section>

      <section className="mb-6">
        <h4 className="font-semibold mb-1">{t("netYield")}</h4>
        <p>{t("netFormula")}</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
          {t("netFormula")}
        </div>
        <p className="mb-1">{t("netExampleTitle")}</p>
        <ul className="list-disc ml-6 mb-2">
          {[0, 1, 2].map((i) => (
            <li key={i}>{t(`netExampleList_${i}`)}</li>
          ))}
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
          {t("netExampleResult")}
        </div>
        <p>{t("netExampleDesc")}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("whyTitle")}</h3>
        <p>{t("whyDesc")}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("practicalTitle")}</h3>
        <ul className="list-disc ml-6 mb-2">
          {[0, 1, 2].map((i) => (
            <li key={i}>{t(`practicalList_${i}`)}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("whyUseTitle")}</h3>
        <ul className="list-disc ml-6 mb-2">
          {[0, 1, 2].map((i) => (
            <li key={i}>{t(`whyUseList_${i}`)}</li>
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
          {faqData.map(
            (
              item: {
                question: string;
                answer: string;
              },
              idx: number,
            ) => (
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
            ),
          )}
        </div>
      </section>
    </main>
  );
}
