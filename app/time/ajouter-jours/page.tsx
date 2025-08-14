"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Peut-on soustraire des jours ?",
		answer:
			"Oui, il suffit d’entrer un nombre négatif pour soustraire des jours à la date de départ.",
	},
	{
		question: "Les week-ends et jours fériés sont-ils pris en compte ?",
		answer:
			"Non, le calcul est purement calendaire et ne tient pas compte des week-ends ou jours fériés.",
	},
	{
		question: "Quel est le format de la date de résultat ?",
		answer:
			"La date affichée est au format AAAA-MM-JJ (ISO), pour éviter toute ambiguïté.",
	},
];

function addDays(dateStr: string, n: number) {
	const d = new Date(dateStr);
	if (isNaN(d.getTime())) return null;
	d.setDate(d.getDate() + n);
	// Format ISO (AAAA-MM-JJ)
	return d.toISOString().slice(0, 10);
}

export default function AjouterJours() {
	const [date, setDate] = useState("");
	const [nbJours, setNbJours] = useState("");
	const [result, setResult] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		const n = parseInt(nbJours, 10);
		if (!date || isNaN(n)) {
			setResult(null);
			return;
		}
		const res = addDays(date, n);
		setResult(res);
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Ajouter ou soustraire des jours à une date
			</h1>
			<p className="mb-8">
				Calculez la date obtenue en ajoutant ou retirant un nombre de jours à une
				date de départ.
			</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Résultat indicatif, ne tient pas compte des
				jours fériés ou calendriers spécifiques.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					Date de départ :
					<input
						type="date"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</label>
				<label>
					Nombre de jours (peut être négatif) :
					<input
						type="number"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={nbJours}
						onChange={(e) => setNbJours(e.target.value)}
						required
					/>
				</label>
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
				>
					Calculer
				</button>
				<div className="mt-2">
					<span className="font-semibold">Résultat :</span>
					<br />
					{result !== null ? (
						<>
							<span className="text-lg font-bold">{result}</span>
						</>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Ajouter ou soustraire des jours
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