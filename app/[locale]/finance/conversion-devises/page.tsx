"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";


export default function ConversionDevises() {
  const t = useTranslations("ConversionDevises");
  const faqData = [0, 1, 2].map((idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`),
  }));

const devises = [
  { code: "EUR", label: "Euro" },
  { code: "USD", label: "Dollar US" },
  { code: "GBP", label: "Livre Sterling" },
  { code: "CHF", label: "Franc Suisse" },
  { code: "JPY", label: "Yen Japonais" },
  { code: "CAD", label: "Dollar Canadien" },
  { code: "AUD", label: "Dollar Australien" },
  { code: "CNY", label: "Yuan Chinois" },
];

async function fetchRate(from: string, to: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const data = await res.json();
    return data.rates?.[to] ?? null;
  } catch {
    return null;
  }
}


  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount.replace(",", "."));
    if (isNaN(amt) || amt <= 0) {
      setResult(null);
      setRate(null);
      return;
    }
    setLoading(true);
    const r = await fetchRate(from, to);
    setRate(r);
    setLoading(false);
    if (r !== null) {
      setResult((amt * r).toLocaleString("fr-FR", { maximumFractionDigits: 4 }));
    } else {
      setResult(null);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };


  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8" role="main" aria-label={t("title")}> 
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8">{t("intro")}</p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800" role="note" aria-live="polite">
        <strong>Disclaimer :</strong> {t("disclaimer")}
      </div>

      <form
        onSubmit={handleConvert}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
        aria-labelledby="conv-form-title"
        aria-describedby="conv-intro conv-disclaimer"
        role="form"
        autoComplete="off"
      >
        <h2 id="conv-form-title" className="sr-only">{t("title")}</h2>
        <label htmlFor="amount-input" className="font-semibold">
          {t("amountLabel")}
        </label>
        <input
          id="amount-input"
          name="amount"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          aria-required="true"
          aria-label={t("amountLabel")}
        />
        <div className="flex gap-2">
          <label htmlFor="from-select" className="flex-1 font-semibold">
            {t("fromLabel")}
            <select
              id="from-select"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={from}
              onChange={e => setFrom(e.target.value)}
              aria-label={t("fromLabel")}
            >
              {devises.map(dev => (
                <option key={dev.code} value={dev.code}>{dev.code} - {dev.label}</option>
              ))}
            </select>
          </label>
          <label htmlFor="to-select" className="flex-1 font-semibold">
            {t("toLabel")}
            <select
              id="to-select"
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={to}
              onChange={e => setTo(e.target.value)}
              aria-label={t("toLabel")}
            >
              {devises.map(dev => (
                <option key={dev.code} value={dev.code}>{dev.code} - {dev.label}</option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
          disabled={loading}
          aria-label={loading ? t("converting") : t("convert")}
        >
          {loading ? t("converting") : t("convert")}
        </button>
        <div className="mt-2">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {result !== null && rate !== null ? (
            <>
              <span className="text-lg font-bold">{result} {to}</span>
              <br />
              <span className="text-xs text-gray-500">
                1 {from} = {rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {to}
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