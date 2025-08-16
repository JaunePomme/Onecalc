"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export default function StopwatchPage() {
	const t = useTranslations("Stopwatch");
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startStopwatch = () => {
		if (!isRunning) {
			setIsRunning(true);
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		}
	};

	const stopStopwatch = () => {
		if (isRunning) {
			setIsRunning(false);
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}
	};

	const resetStopwatch = () => {
		stopStopwatch();
		setTime(0);
	};

	const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
			<p className="mb-8">{t("intro")}</p>
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>{t("disclaimer")}</strong>
			</div>
			<div className="mb-6 flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow">
				<div className="text-4xl font-mono">{formatTime(time)}</div>
				<div className="flex gap-4">
					<button
						onClick={startStopwatch}
						className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
						disabled={isRunning}
					>
						{t("start")}
					</button>
					<button
						onClick={stopStopwatch}
						className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
						disabled={!isRunning}
					>
						{t("stop")}
					</button>
					<button
						onClick={resetStopwatch}
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
					>
						{t("reset")}
					</button>
				</div>
			</div>
		</main>
	);
}