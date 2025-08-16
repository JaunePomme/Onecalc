"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function TimerPage() {
  const t = useTranslations("Timer");
  const [time, setTime] = useState("");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingTime !== null && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, remainingTime]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const seconds = parseInt(time, 10);
    if (isNaN(seconds) || seconds <= 0) {
      setError(t("errorInvalid"));
      return;
    }
    setRemainingTime(seconds);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingTime(null);
    setTime("");
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8">{t("intro")}</p>
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>{t("disclaimer")}</strong>
      </div>
      <form
        onSubmit={handleStart}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          {t("timeLabel")}
          <input
            type="number"
            min="1"
            step="1"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={isRunning}
          >
            {t("start")}
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            onClick={handleReset}
          >
            {t("reset")}
          </button>
        </div>
        <div className="mt-2">
          <span className="font-semibold">{t("remainingTimeLabel")}</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : remainingTime !== null ? (
            <span className="text-lg font-bold">
              {t("timeRemaining", { seconds: remainingTime })}
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>
    </main>
  );
}
