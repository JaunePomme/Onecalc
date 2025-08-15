"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function paybackPeriod(flux: number[]): number | null {
	let cumul = 0;
	for (let i = 0; i < flux.length; i++) {
		cumul += flux[i];
		if (cumul >= 0) {
			const prevCumul = cumul - flux[i];
			if (flux[i] === 0) return i;
			const fraction = (0 - prevCumul) / flux[i];
			return i === 0 ? 0 : i - 1 + fraction;
		}
	}
	return null;
}

export default function PaybackPage() {
	const t = useTranslations("Payback");
	const [flux, setFlux] = useState("");
	const [result, setResult] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const flows = flux
			.split(",")
			.map((s) => parseFloat(s.replace(",", ".").trim()))
			.filter((v) => !isNaN(v));
		if (flows.length < 2) {
			setResult(null);
			setError(t("errorInput"));
			return;
		}
		const r = paybackPeriod(flows);
		if (r === null || isNaN(r)) {
			setResult(null);
			setError(t("errorNever"));
		} else {
			setResult(r);
		}
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
					{t("fluxLabel")}
					<input
						type="text"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800 font-mono"
						value={flux}
						onChange={(e) => setFlux(e.target.value)}
						placeholder="-1000, 200, 300, 400, 500"
						required
						aria-label={t("fluxLabel")}
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
					) : result !== null ? (
						<span className="text-lg font-bold">
							{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {t("periods")}
						</span>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">{t("faqTitle")}</h2>
				<div className="flex flex-col gap-2">
					{faqData.map((item, idx) => (
						<div key={idx} className="border rounded bg-gray-50 dark:bg-gray-900">
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