"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Roi() {
	const [invested, setInvested] = useState("");
	const [gains, setGains] = useState("");
	const [result, setResult] = useState<null | number>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);


	const t = useTranslations("ROI");

	// Reconstruire la FAQ à partir des clés plates (avec underscores)
	const faqData = Array.from({ length: 8 }).map((_, idx) => ({
		question: t(`faq_${idx}_question`),
		answer: t(`faq_${idx}_answer`)
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
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
			<p className="mb-8">{t("intro")}</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> {t("disclaimer")}
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
					{t("investedLabel")}
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={invested}
						onChange={(e) => setInvested(e.target.value)}
						required
					/>
				</label>
				<label>
					{t("gainsLabel")}
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={gains}
						onChange={(e) => setGains(e.target.value)}
						required
					/>
				</label>
				<div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
					{t("indicative")} {" "}
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
					{t("yieldLabel")} {" "}
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

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">{t("faqTitle")}</h2>
				<div className="flex flex-col gap-2">
					{faqData.map((item: any, idx: number) => (
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
