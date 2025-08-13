"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Quelle unité pour l’allure ?",
		answer:
			"L’allure est généralement exprimée en minutes par kilomètre (min/km) ou minutes par mile (min/mile) selon la distance choisie.",
	},
	{
		question: "Peut-on convertir entre miles et kilomètres ?",
		answer:
			"Oui, il suffit de convertir la distance (1 mile = 1,609 km) avant de faire le calcul. Ce calculateur fonctionne en kilomètres.",
	},
	{
		question: "Le calcul prend-il en compte les pauses ?",
		answer:
			"Non, le calcul suppose un effort continu sans pause. Pour une estimation plus précise, tenez compte des arrêts éventuels.",
	},
];

function parseTimeToMinutes(str: string) {
	// str format: "hh:mm:ss" or "mm:ss" or "mm"
	const parts = str.split(":").map(Number).reverse();
	let min = 0;
	if (parts.length > 0) min += parts[0];
	if (parts.length > 1) min += parts[1] * 60;
	if (parts.length > 2) min += parts[2] * 3600;
	return min / 60;
}

function formatMinutesToTime(min: number) {
	const totalSec = Math.round(min * 60);
	const h = Math.floor(totalSec / 3600);
	const m = Math.floor((totalSec % 3600) / 60);
	const s = totalSec % 60;
	if (h > 0) {
		return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
	}
	return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AllureVitesseTemps() {
	const [distance, setDistance] = useState("");
	const [temps, setTemps] = useState("");
	const [allure, setAllure] = useState("");
	const [vitesse, setVitesse] = useState("");
	const [result, setResult] = useState<null | { vitesse?: number; allure?: number; temps?: string }>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		const d = parseFloat(distance.replace(",", "."));
		const t = temps ? parseTimeToMinutes(temps) : NaN;
		const a = allure ? parseTimeToMinutes(allure) : NaN;
		const v = vitesse ? parseFloat(vitesse.replace(",", ".")) : NaN;

		// Correction : il faut vérifier que l'utilisateur ne remplit qu'UN seul champ parmi temps, allure, vitesse
		const filled = [!!temps, !!allure, !!vitesse].filter(Boolean).length;

		if (!isNaN(d) && d > 0 && filled === 1) {
			if (!!temps && !allure && !vitesse && !isNaN(t) && t > 0) {
				// Distance + temps => vitesse + allure
				const vCalc = d / (t / 60); // km/h
				const al = t / d; // min/km
				setResult({ vitesse: vCalc, allure: al });
			} else if (!!allure && !temps && !vitesse && !isNaN(a) && a > 0) {
				// Distance + allure => temps + vitesse
				const tmin = d * a;
				const vCalc = 60 / a;
				setResult({ temps: formatMinutesToTime(tmin), vitesse: vCalc });
			} else if (!!vitesse && !temps && !allure && !isNaN(v) && v > 0) {
				// Distance + vitesse => temps + allure
				const tmin = (d / v) * 60;
				const al = 60 / v;
				setResult({ temps: formatMinutesToTime(tmin), allure: al });
			} else {
				setResult(null);
			}
		} else {
			setResult(null);
		}
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq(prev =>
			prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Calculateur allure, vitesse ou temps
			</h1>
			<p className="mb-8">
				Calculez votre allure, vitesse ou temps selon la distance et la donnée
				connue.
			</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Estimation ; intensité réelle varie.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					Distance (km) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={distance}
						onChange={e => setDistance(e.target.value)}
						required
					/>
				</label>
				<label>
					Temps (hh:mm:ss ou mm:ss) :
					<input
						type="text"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={temps}
						onChange={e => setTemps(e.target.value)}
						placeholder="ex : 0:50:00 ou 50:00"
					/>
				</label>
				<label>
					Allure (min/km, mm:ss) :
					<input
						type="text"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={allure}
						onChange={e => setAllure(e.target.value)}
						placeholder="ex : 5:00"
					/>
				</label>
				<label>
					Vitesse (km/h) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={vitesse}
						onChange={e => setVitesse(e.target.value)}
						placeholder="ex : 12"
					/>
				</label>
				<div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
					⚠️ Remplissez la distance et une seule autre donnée (temps, allure ou
					vitesse).
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
				>
					Calculer
				</button>
				<div className="mt-2">
					<span className="font-semibold">Résultat :</span>
					<br />
					{result ? (
						<>
							{result.vitesse !== undefined && (
								<>
									Vitesse :{" "}
									<span className="text-lg font-bold">
										{result.vitesse.toLocaleString("fr-FR", {
											maximumFractionDigits: 2,
										})}{" "}
										km/h
									</span>
									<br />
								</>
							)}
							{result.allure !== undefined && (
								<>
									Allure :{" "}
									<span className="text-lg font-bold">
										{formatMinutesToTime(result.allure)}
									</span>{" "}
									min/km
									<br />
								</>
							)}
							{result.temps !== undefined && (
								<>
									Temps :{" "}
									<span className="text-lg font-bold">
										{result.temps}
									</span>
									<br />
								</>
							)}
						</>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">
					Comment sont calculées allure, vitesse et temps&nbsp;?
				</h2>
				<p>
					Selon les données saisies, le calculateur déduit la valeur manquante :
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Vitesse = distance / temps (h)
					<br />
					Allure = temps (min) / distance
					<br />
					Temps = distance × allure (min/km)
				</div>
				<p>
					Exemple : 10 km en 50 min → vitesse 12 km/h ; allure 5:00 min/km
				</p>
			</section>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur allure, vitesse, temps
				</h2>
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