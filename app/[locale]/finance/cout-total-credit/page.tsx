"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";


export default function CoutCredit() {
	const t = useTranslations("CoutCredit");
	const faqData = [0,1,2,3,4,5,6].map(idx => ({
		question: t(`faq_${idx}_question`),
		answer: t(`faq_${idx}_answer`)
	}));


	const [amount, setAmount] = useState("");
	const [rate, setRate] = useState("");
	const [years, setYears] = useState("");
	const [insurance, setInsurance] = useState("");
	const [cost, setCost] = useState<null | number>(null);
	const [total, setTotal] = useState<null | number>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		const capital = parseFloat(amount.replace(",", "."));
		const tauxAnnuel = parseFloat(rate.replace(",", ".")) / 100;
		const duree = parseFloat(years.replace(",", "."));
		const tauxAssurance = parseFloat(insurance.replace(",", ".")) / 100 || 0;
		const n = duree * 12;
		const tauxMensuel = tauxAnnuel / 12;

		if (!isNaN(capital) && !isNaN(tauxMensuel) && !isNaN(n) && n > 0) {
			const mensualite =
				tauxMensuel === 0
					? capital / n
					: (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -n));
			const totalMensualites = mensualite * n;
			const coutAssurance = capital * tauxAssurance * duree;
			const coutTotal = totalMensualites + coutAssurance - capital;
			const montantTotal = capital + coutTotal;
			setCost(coutTotal);
			setTotal(montantTotal);
		} else {
			setCost(null);
			setTotal(null);
		}
	};

		return (
			<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8" role="main" aria-label={t("title")}> 
				<h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
				<p className="mb-8">{t("intro")}</p>

				<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800" role="note" aria-live="polite">
					<strong>Disclaimer :</strong> {t("disclaimer")}
				</div>

				<form
					onSubmit={handleCalc}
					className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
					aria-labelledby="cout-form-title"
					aria-describedby="cout-intro cout-disclaimer"
					role="form"
					autoComplete="off"
				>
					<h2 id="cout-form-title" className="sr-only">{t("title")}</h2>
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
					<label htmlFor="rate-input" className="font-semibold">
						{t("rateLabel")}
					</label>
					<input
						id="rate-input"
						name="rate"
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={rate}
						onChange={e => setRate(e.target.value)}
						required
						aria-required="true"
						aria-label={t("rateLabel")}
					/>
					<label htmlFor="years-input" className="font-semibold">
						{t("yearsLabel")}
					</label>
					<input
						id="years-input"
						name="years"
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={years}
						onChange={e => setYears(e.target.value)}
						required
						aria-required="true"
						aria-label={t("yearsLabel")}
					/>
					<label htmlFor="insurance-input" className="font-semibold">
						{t("insuranceLabel")}
					</label>
					<input
						id="insurance-input"
						name="insurance"
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={insurance}
						onChange={e => setInsurance(e.target.value)}
						placeholder="0"
						aria-label={t("insuranceLabel")}
					/>
					<div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
						⚠️ {t("indicative")}
						<a href="#faq" className="underline">{t("learnMore")}</a>
					</div>
					<button
						type="submit"
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
						aria-label={t("calculate")}
					>
						{t("calculate")}
					</button>
					<div className="mt-2">
						<span className="font-semibold">{t("resultLabel")}</span>
						<br />
						{t("costLabel")} 
						<span className="text-lg font-bold">
							{cost !== null
								? `${cost.toLocaleString(undefined, { maximumFractionDigits: 2 })} €`
								: "-- €"}
						</span>
					</div>
					<div className="mt-2">
						{t("totalLabel")} 
						<span className="text-lg font-bold">
							{total !== null
								? `${total.toLocaleString(undefined, { maximumFractionDigits: 2 })} €`
								: "-- €"}
						</span>
					</div>
				</form>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2">{t("whatTitle")}</h2>
						<p>{t("whatDesc")}</p>
					</section>

					<section className="mb-6">
						<h3 className="text-lg font-semibold mb-2">{t("howTitle")}</h3>
						<p>{t("howDesc")}</p>
						<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">{t("formula1")}<br />{t("formula2")}</div>
						<p>{t("insuranceDesc")}</p>
						<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">{t("insuranceFormula")}</div>
						<p className="mb-1">{t("exampleTitle")}</p>
						<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">{t("example1")}<br />{t("example2")}<br />{t("example3")}<br />{t("example4")}</div>
					</section>

					<section className="mb-6">
						<h3 className="text-lg font-semibold mb-2">{t("whyTitle")}</h3>
						<ul className="list-disc ml-6 mb-2">
							<li><strong>{t("whyList_0_title")}</strong> {t("whyList_0_desc")}</li>
							<li><strong>{t("whyList_1_title")}</strong> {t("whyList_1_desc")}</li>
							<li><strong>{t("whyList_2_title")}</strong> {t("whyList_2_desc")}</li>
						</ul>
					</section>

					<section className="mb-6">
						<h3 className="text-lg font-semibold mb-2">{t("reduceTitle")}</h3>
						<ul className="list-disc ml-6 mb-2">
							<li><strong>{t("reduceList_0_title")}</strong> {t("reduceList_0_desc")}</li>
							<li><strong>{t("reduceList_1_title")}</strong> {t("reduceList_1_desc")}</li>
							<li><strong>{t("reduceList_2_title")}</strong> {t("reduceList_2_desc")}</li>
							<li><strong>{t("reduceList_3_title")}</strong> {t("reduceList_3_desc")}</li>
						</ul>
					</section>

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
										onClick={() => setOpenFaq((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx])}
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
