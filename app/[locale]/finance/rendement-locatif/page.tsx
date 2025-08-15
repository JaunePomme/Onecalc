"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function calcRendement({
  loyerAnnuel,
  prixAchat,
  fraisAnnexes,
  chargesAnnuelles,
  apport,
}: {
  loyerAnnuel: number;
  prixAchat: number;
  fraisAnnexes: number;
  chargesAnnuelles: number;
  apport: number;
}) {
  const coutTotal = prixAchat + fraisAnnexes;
  const rendementBrut = (loyerAnnuel / coutTotal) * 100;
  const rendementNet = ((loyerAnnuel - chargesAnnuelles) / coutTotal) * 100;
  const cashOnCash =
    apport > 0 ? ((loyerAnnuel - chargesAnnuelles) / apport) * 100 : null;
  return { rendementBrut, rendementNet, cashOnCash };
}

export default function RendementLocatif() {
  const t = useTranslations("RendementLocatif");
  const [loyer, setLoyer] = useState("");
  const [prix, setPrix] = useState("");
  const [frais, setFrais] = useState("");
  const [charges, setCharges] = useState("");
  const [apport, setApport] = useState("");
  const [result, setResult] = useState<{
    rendementBrut: number;
    rendementNet: number;
    cashOnCash: number | null;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseFloat(loyer.replace(",", ".")) * 12;
    const p = parseFloat(prix.replace(",", "."));
    const f = parseFloat(frais.replace(",", ".")) || 0;
    const c = parseFloat(charges.replace(",", ".")) || 0;
    const a = parseFloat(apport.replace(",", ".")) || 0;
    if (isNaN(l) || isNaN(p) || l <= 0 || p <= 0) {
      setResult(null);
      return;
    }
    setResult(calcRendement({ loyerAnnuel: l, prixAchat: p, fraisAnnexes: f, chargesAnnuelles: c, apport: a }));
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
        <label className="hidden">
          Menu principal
          <input type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          {t("loyerLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={loyer}
            onChange={e => setLoyer(e.target.value)}
            required
            aria-label={t("loyerLabel")}
          />
        </label>
        <label>
          {t("prixLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={prix}
            onChange={e => setPrix(e.target.value)}
            required
            aria-label={t("prixLabel")}
          />
        </label>
        <label>
          {t("fraisLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={frais}
            onChange={e => setFrais(e.target.value)}
            aria-label={t("fraisLabel")}
          />
        </label>
        <label>
          {t("chargesLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={charges}
            onChange={e => setCharges(e.target.value)}
            aria-label={t("chargesLabel")}
          />
        </label>
        <label>
          {t("apportLabel")}
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={apport}
            onChange={e => setApport(e.target.value)}
            aria-label={t("apportLabel")}
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
          {result ? (
            <>
              <span className="text-lg font-bold">
                {t("brutLabel")} {result.rendementBrut.toLocaleString(undefined, { maximumFractionDigits: 2 })} %
              </span>
              <br />
              <span className="text-lg font-bold">
                {t("netLabel")} {result.rendementNet.toLocaleString(undefined, { maximumFractionDigits: 2 })} %
              </span>
              <br />
              <span className="text-lg font-bold">
                {t("cocLabel")} {result.cashOnCash !== null ? result.cashOnCash.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " %" : "--"}
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