"use client";
import { useState, useRef } from "react";

const faqData = [
	{
		question: "Peut-on mettre en pause le minuteur ?",
		answer: "Oui, vous pouvez arrêter puis reprendre le minuteur à tout moment.",
	},
	{
		question: "Le minuteur fonctionne-t-il si je change d’onglet ?",
		answer:
			"Oui, il continue tant que la page reste ouverte, mais la précision peut varier selon le navigateur.",
	},
	{
		question: "Peut-on recevoir une alerte à la fin ?",
		answer:
			"Un signal sonore retentit à la fin du compte à rebours si votre navigateur l’autorise.",
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

export default function Minuteur() {
	const [input, setInput] = useState("00:01:00");
	const [remaining, setRemaining] = useState(60);
	const [running, setRunning] = useState(false);
	const [finished, setFinished] = useState(false);
	const [openFaq, setOpenFaq] = useState<number[]>([]);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Convertit hh:mm:ss ou mm:ss ou ss en secondes
	function parseInput(str: string) {
		const parts = str.split(":").map(Number).reverse();
		let sec = 0;
		if (parts.length > 0) sec += parts[0];
		if (parts.length > 1) sec += parts[1] * 60;
		if (parts.length > 2) sec += parts[2] * 3600;
		return sec;
	}

	// Démarrer
	const handleStart = () => {
		const total = parseInput(input);
		if (isNaN(total) || total <= 0) return;
		setRemaining(total);
		setRunning(true);
		setFinished(false);
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(intervalRef.current!);
					setRunning(false);
					setFinished(true);
					// Signal sonore
					if (typeof window !== "undefined") {
						try {
							const ctx =
								new (window.AudioContext ||
									(window as any).webkitAudioContext)();
							const o = ctx.createOscillator();
							o.type = "sine";
							o.frequency.value = 880;
							o.connect(ctx.destination);
							o.start();
							o.stop(ctx.currentTime + 0.3);
						} catch {}
					}
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	// Pause
	const handleStop = () => {
		setRunning(false);
		if (intervalRef.current) clearInterval(intervalRef.current);
	};

	// Reset
	const handleReset = () => {
		setRunning(false);
		setFinished(false);
		if (intervalRef.current) clearInterval(intervalRef.current);
		const total = parseInput(input);
		setRemaining(total);
	};

	// Saisie modifiée
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
		setFinished(false);
		setRunning(false);
		if (intervalRef.current) clearInterval(intervalRef.current);
		setRemaining(parseInput(e.target.value));
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-md mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">Minuteur en ligne</h1>
			<p className="mb-8">
				Définissez un compte à rebours et recevez une alerte à la fin.
			</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Minuteur simple, la précision dépend de
				votre navigateur.
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleStart();
				}}
				className="flex flex-col items-center gap-4 mb-6"
			>
				<label className="w-full max-w-xs">
					Durée (hh:mm:ss ou mm:ss) :
					<input
						type="text"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800 text-center font-mono text-lg"
						value={input}
						onChange={handleInputChange}
						disabled={running}
						pattern="^(\d{1,2}:)?\d{1,2}:\d{2}$"
						title="Format attendu : hh:mm:ss ou mm:ss"
					/>
				</label>
				<div className="text-4xl font-mono select-all">
					{formatTime(remaining)}
				</div>
				<div className="flex gap-4">
					<button
						type="submit"
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
						disabled={running || remaining <= 0}
					>
						Démarrer
					</button>
					<button
						type="button"
						onClick={handleStop}
						className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
						disabled={!running}
					>
						Pause
					</button>
					<button
						type="button"
						onClick={handleReset}
						className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
					>
						Réinitialiser
					</button>
				</div>
				{finished && (
					<div className="mt-2 text-green-700 dark:text-green-300 font-semibold">
						Temps écoulé !
					</div>
				)}
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">FAQ - Minuteur en ligne</h2>
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