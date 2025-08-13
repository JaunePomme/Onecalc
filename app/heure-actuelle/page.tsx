"use client";
import { useState, useEffect } from "react";

// Liste simplifiée, à compléter selon besoin réel
const cities = [
	{ name: "Paris", tz: "Europe/Paris" },
	{ name: "Sydney", tz: "Australia/Sydney" },
	{ name: "New York", tz: "America/New_York" },
	{ name: "Tokyo", tz: "Asia/Tokyo" },
	{ name: "Londres", tz: "Europe/London" },
	{ name: "Los Angeles", tz: "America/Los_Angeles" },
	{ name: "Moscou", tz: "Europe/Moscow" },
	{ name: "Rio", tz: "America/Sao_Paulo" },
];

const faqData = [
	{
		question: "Quelle précision pour l'heure affichée ?",
		answer:
			"L'heure affichée est basée sur l'horloge de votre appareil et la base de données des fuseaux horaires. Elle peut différer de quelques secondes par rapport à l'heure officielle.",
	},
	{
		question: "Pourquoi un décalage est-il possible ?",
		answer:
			"Un léger décalage peut apparaître selon la synchronisation de votre appareil, la connexion internet ou les changements récents de fuseau horaire.",
	},
	{
		question: "C'est quoi UTC ?",
		answer:
			"UTC (Temps Universel Coordonné) est la référence mondiale pour le temps. Les fuseaux horaires sont définis par rapport à UTC (ex : UTC+2, UTC-5).",
	},
];

function getUtcOffset(tz: string, date: Date) {
	try {
		const dtf = new Intl.DateTimeFormat("en-US", {
			timeZone: tz,
			hour12: false,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		const parts = dtf.formatToParts(date);
		const y = Number(parts.find((p) => p.type === "year")?.value);
		const m = Number(parts.find((p) => p.type === "month")?.value) - 1;
		const d = Number(parts.find((p) => p.type === "day")?.value);
		const h = Number(parts.find((p) => p.type === "hour")?.value);
		const min = Number(parts.find((p) => p.type === "minute")?.value);
		const sec = Number(parts.find((p) => p.type === "second")?.value);
		const local = Date.UTC(y, m, d, h, min, sec);
		const utc = date.getTime();
		const offsetMin = (local - utc) / (60 * 1000);
		const sign = offsetMin >= 0 ? "+" : "-";
		const absMin = Math.abs(offsetMin);
		const hours = Math.floor(absMin / 60);
		const minutes = Math.floor(absMin % 60);
		return `UTC${sign}${hours}${minutes > 0 ? ":" + minutes.toString().padStart(2, "0") : ""
			}`;
	} catch {
		return "UTC";
	}
}

export default function HeureActuelle() {
	const [city, setCity] = useState("Paris");
	const [now, setNow] = useState(new Date());
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	// Rafraîchit l'heure toutes les secondes
	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const cityObj = cities.find((c) => c.name === city) || cities[0];
	const heureLocale = now.toLocaleTimeString("fr-FR", {
		timeZone: cityObj.tz,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	const dateLocale = now.toLocaleDateString("fr-FR", {
		timeZone: cityObj.tz,
		weekday: "long",
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
	const offset = getUtcOffset(cityObj.tz, now);

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Heure locale actuelle dans une ville
			</h1>
			<p className="mb-8">
				Sélectionnez une ville pour afficher l'heure locale, la date et le
				décalage UTC en temps réel.
			</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Basé sur heure système ; peut varier de
				quelques secondes.
			</div>

			<form className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow">
				<label>
					Ville :
					<select
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					>
						{cities.map((c) => (
							<option key={c.tz} value={c.name}>
								{c.name}
							</option>
						))}
					</select>
				</label>
			</form>

			<div className="mb-6 text-lg">
				<div>
					<span className="font-semibold">Heure locale :</span>{" "}
					<span className="font-mono text-xl">{heureLocale}</span>
				</div>
				<div>
					<span className="font-semibold">Date :</span>{" "}
					<span className="font-mono">{dateLocale}</span>
				</div>
				<div>
					<span className="font-semibold">Décalage UTC :</span>{" "}
					<span className="font-mono">{offset}</span>
				</div>
			</div>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur l'heure locale
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