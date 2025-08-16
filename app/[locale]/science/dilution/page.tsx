"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateDilution(c1: number, v1: number, c2: number) {
	return (c1 * v1) / c2;
}

export default function DilutionPage() {
	const t = useTranslations("Dilution");
	const [c1, setC1] = useState("");
	const [v1, setV1] = useState("");
	const [c2, setC2] = useState("");
	const [result, setResult] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const numC1 = parseFloat(c1.replace(",", "."));
			const numV1 = parseFloat(v1.replace(",", "."));
			const numC2 = parseFloat(c2.replace(",", "."));
			if (isNaN(numC1) || isNaN(numV1) || isNaN(numC2) || numC2 === 0) {
				throw new Error(t("errorInvalid"));
			}
			setResult(calculateDilution(numC1, numV1, numC2));
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : t("errorGeneric"));
		}
	};

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
					{t("c1Label")}
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={c1}
						onChange={(e) => setC1(e.target.value)}
						required
					/>
				</label>
				<label>
					{t("v1Label")}
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={v1}
						onChange={(e) => setV1(e.target.value)}
						required
					/>
				</label>
				<label>
					{t("c2Label")}
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={c2}
						onChange={(e) => setC2(e.target.value)}
						required
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
							{result.toLocaleString("fr-FR", { maximumFractionDigits: 4 })}
						</span>
					) : (
						"--"
					)}
				</div>
			</form>
		</main>
	);
}