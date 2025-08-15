
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function MensualitePret() {
  const t = useTranslations("MensualitePret");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const capital = parseFloat(amount.replace(",", "."));
    const tauxAnnuel = parseFloat(rate.replace(",", ".")) / 100;
    const dureeAnnees = parseFloat(years.replace(",", "."));
    const n = dureeAnnees * 12;
    const tauxMensuel = tauxAnnuel / 12;
    if (!isNaN(capital) && !isNaN(tauxMensuel) && !isNaN(n) && n > 0) {
      const mensualite =
        tauxMensuel === 0
          ? capital / n
          : (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -n));
      setResult(mensualite * 12); // Coût annuel
    } else {
      setResult(null);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqData = Array.from({ length: 7 }).map((_, idx) => ({
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
          {t("amountLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            aria-label={t("amountLabel")}
          />
        </label>
        <label>
          {t("rateLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            aria-label={t("rateLabel")}
          />
        </label>
        <label>
          {t("yearsLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            required
            aria-label={t("yearsLabel")}
          />
        </label>
        <div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          {t("indicative")}
          <a href="#faq" className="underline">
            {t("learnMore")}
          </a>
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
          {t("coutAnnuelLabel")} {" "}
          <span className="text-lg font-bold">
            {result !== null
              ? `${result.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })} €`
              : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("howTitle")}</h2>
        <p>{t("howDesc")}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("howCalcTitle")}</h3>
        <p>{t("howCalcDesc")}</p>
        <ul className="list-disc ml-6 mb-2">
          <li>{t("howCalcList_0")}</li>
          <li>{t("howCalcList_1")}</li>
          <li>{t("howCalcList_2")}</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          {t("formula")}
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm whitespace-pre-line">
          {t("howCalcExample")}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("rateImpactTitle")}</h3>
        <p>{t("rateImpactDesc")}</p>
        <p>{t("rateImpactDesc2")}</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm whitespace-pre-line">
          {t("rateImpactExample")}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("practicalTitle")}</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>{t("practicalList_0")}</li>
          <li>{t("practicalList_1")}</li>
          <li>{t("practicalList_2")}</li>
          <li>{t("practicalList_3")}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("whyTitle")}</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>{t("whyList_0")}</li>
          <li>{t("whyList_1")}</li>
          <li>{t("whyList_2")}</li>
        </ul>
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
