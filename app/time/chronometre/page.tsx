"use client";
import { useState, useRef } from "react";

const faqData = [
	{
		question: "Peut-on mettre en pause le chronomètre ?",
		answer: "Oui, vous pouvez arrêter puis reprendre le chronomètre à tout moment.",
	},
	{
		question: "Le chronomètre continue-t-il si je change d’onglet ?",
		answer:
			"Oui, il continue tant que la page reste ouverte, mais la précision peut varier selon le navigateur.",
	},
	{
		question: "Peut-on copier le temps affiché ?",
		answer: "Oui, sélectionnez le temps affiché et copiez-le comme un texte classique.",
	},
];

function formatTime(sec: number) {
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	return [
		h.toString().padStart(2, "0"),
		m.toString().padStart(2, "0"),
		s.toString().padStart(2, "0"),
	].join(":");
}

export default function Chronometre() {
	const [running, setRunning] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const [openFaq, setOpenFaq] = useState<number[]>([]);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastStartRef = useRef<number | null>(null);

	// Démarrer ou reprendre
	const handleStart = () => {
		if (!running) {
			setRunning(true);
			lastStartRef.current = Date.now();
			intervalRef.current = setInterval(() => {
				setElapsed((prev) =>
					prev + Math.floor((Date.now() - (lastStartRef.current || Date.now())) / 1000)
				);
				lastStartRef.current = Date.now();
			}, 1000);
		}
	};

	// Pause
	const handleStop = () => {
		if (running) {
			setRunning(false);
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (lastStartRef.current) {
				setElapsed((prev) => prev + Math.floor((Date.now() - lastStartRef.current!) / 1000));
				lastStartRef.current = null;
			}
		}
	};

	// Reset
	const handleReset = () => {
		setRunning(false);
		setElapsed(0);
		if (intervalRef.current) clearInterval(intervalRef.current);
		lastStartRef.current = null;
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-md mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">Chronomètre simple</h1>
			<p className="mb-8">Démarrez, arrêtez et réinitialisez un chronomètre en ligne.</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Chronomètre simple, ne garantit pas une précision absolue.
			</div>

			<div className="flex flex-col items-center gap-4 mb-6">
				<div className="text-4xl font-mono select-all">{formatTime(elapsed)}</div>
				<div className="flex gap-4">
					<button
						onClick={handleStart}
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
						disabled={running}
					>
						Démarrer
					</button>
					<button
						onClick={handleStop}
						className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
						disabled={!running}
					>
						Arrêter
					</button>
					<button
						onClick={handleReset}
						className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
					>
						Réinitialiser
					</button>
				</div>
			</div>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Chronomètre en ligne
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