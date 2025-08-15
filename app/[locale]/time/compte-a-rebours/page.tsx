"use client";
import { useState, useRef, useEffect } from "react";

const faqData = [
	{
		question: "Peut-on mettre en pause le compte à rebours ?",
		answer:
			"Oui, vous pouvez mettre en pause et reprendre le compte à rebours à tout moment en utilisant les boutons prévus à cet effet.",
	},
	{
		question: "Peut-on utiliser le mode plein écran ?",
		answer:
			"Oui, la plupart des navigateurs permettent d'afficher la page en plein écran pour mieux visualiser le compte à rebours.",
	},
	{
		question: "La sonnerie est-elle changeable ?",
		answer:
			"Non, la sonnerie est fixe pour l’instant. Une personnalisation pourra être ajoutée dans une future version.",
	},
];

function parseDuration(str: string) {
	const [h = "0", m = "0", s = "0"] = str.split(":");
	return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

function formatTime(sec: number) {
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	return [h, m, s].map(n => n.toString().padStart(2, "0")).join(":");
}

export default function CompteRebours() {
	const [duration, setDuration] = useState("00:05:00");
	const [name, setName] = useState("");
	const [remaining, setRemaining] = useState(0);
	const [running, setRunning] = useState(false);
	const [finished, setFinished] = useState(false);
	const [openFaq, setOpenFaq] = useState<number[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const startTimer = () => {
		const total = parseDuration(duration);
		if (total > 0) {
			setRemaining(total);
			setRunning(true);
			setFinished(false);
			if (timerRef.current) clearInterval(timerRef.current);
			timerRef.current = setInterval(() => {
				setRemaining(prev => {
					if (prev <= 1) {
						clearInterval(timerRef.current!);
						setRunning(false);
						setFinished(true);
						audioRef.current?.play();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
	};

	const pauseTimer = () => {
		setRunning(false);
		if (timerRef.current) clearInterval(timerRef.current);
	};

	const resumeTimer = () => {
		if (remaining > 0 && !running) {
			setRunning(true);
			timerRef.current = setInterval(() => {
				setRemaining(prev => {
					if (prev <= 1) {
						clearInterval(timerRef.current!);
						setRunning(false);
						setFinished(true);
						audioRef.current?.play();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
	};

	const resetTimer = () => {
		if (timerRef.current) clearInterval(timerRef.current);
		setRemaining(0);
		setRunning(false);
		setFinished(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTimer();
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq(prev =>
			prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
		);
	};

	// Clean up on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, []);

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">Compte à rebours en ligne</h1>
			<p className="mb-8">
				Lancez un compte à rebours personnalisé avec alarme sonore à la fin.
			</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Ne pas utiliser pour tâches critiques.
			</div>

			<form
				onSubmit={handleSubmit}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					Durée (hh:mm:ss) :
					<input
						type="text"
						pattern="^\d{1,2}:\d{2}:\d{2}$"
						placeholder="00:05:00"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={duration}
						onChange={e => setDuration(e.target.value)}
						disabled={running}
						required
					/>
				</label>
				<label>
					Nom (optionnel) :
					<input
						type="text"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={name}
						onChange={e => setName(e.target.value)}
						disabled={running}
					/>
				</label>
				<div className="flex gap-2">
					<button
						type="submit"
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
						disabled={running}
					>
						Démarrer
					</button>
					<button
						type="button"
						className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
						onClick={pauseTimer}
						disabled={!running || finished}
					>
						Pause
					</button>
					<button
						type="button"
						className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
						onClick={resumeTimer}
						disabled={running || finished || remaining === 0}
					>
						Reprendre
					</button>
					<button
						type="button"
						className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
						onClick={resetTimer}
						disabled={remaining === 0 && !finished}
					>
						Réinitialiser
					</button>
				</div>
			</form>

			<div className="mb-6 text-center">
				<div className="text-4xl font-mono mb-2">
					{remaining > 0
						? formatTime(remaining)
						: finished
						? "00:00:00"
						: formatTime(parseDuration(duration))}
				</div>
				{name && (
					<div className="text-lg text-gray-700 dark:text-gray-200">
						{name}
					</div>
				)}
				{finished && (
					<div className="text-red-600 dark:text-red-400 font-bold mt-2">
						⏰ Temps écoulé !
					</div>
				)}
				<audio
					ref={audioRef}
					src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5c7.mp3"
					preload="auto"
				/>
			</div>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">
					Comment fonctionne le compte à rebours&nbsp;?
				</h2>
				<p>
					Le compte à rebours démarre à la durée choisie et décompte en temps
					réel jusqu'à zéro. Une sonnerie retentit à la fin pour vous avertir.
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Compte à rebours = durée choisie → 0 <br />
					Exemple : 00:05:00 → alarme à la fin
				</div>
			</section>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur le compte à rebours
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