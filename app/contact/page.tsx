"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.honeypot) return; // bot detected

    try {
      const res = await fetch("https://formspree.io/f/xdoqzqzq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <main className="max-w-xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <p className="mb-8">
        Veuillez renseigner vos coordonnées ainsi que votre message. Nous nous ferons un plaisir de vous répondre dans les plus brefs délais.
      </p>
      {sent ? (
        <div className="p-4 bg-green-100 text-green-800 rounded mb-6">
          Merci, votre message a bien été envoyé !
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="hidden">
            Menu principal
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>
          <label>
            Nom :
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-900"
              autoComplete="name"
            />
          </label>
          <label>
            Email : <span className="text-red-500">*</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-900"
              required
              autoComplete="email"
            />
          </label>
          <label>
            Message : <span className="text-red-500">*</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-900"
              rows={5}
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
          {error && (
            <div className="text-red-600 mt-2">{error}</div>
          )}
        </form>
      )}
    </main>
  );
}