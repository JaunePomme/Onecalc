import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-6 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 flex-wrap items-center justify-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-wrap items-center justify-center w-full">
          <Link
            className="hover:underline hover:underline-offset-4"
            href="/rgpd"
          >
            RGPD →
          </Link>
          <Link
            className="hover:underline hover:underline-offset-4"
            href="/politique"
          >
            Politique de confidentialité →
          </Link>
          <Link
            className="hover:underline hover:underline-offset-4"
            href="/contact"
          >
            Contact →
          </Link>
          <Link
            className="hover:underline hover:underline-offset-4"
            href="/mentions"
          >
            Mentions légales →
          </Link>
          <Link
            className="hover:underline hover:underline-offset-4"
            href="/clause"
          >
            Clause de non-responsabilité →
          </Link>
          <div className="text-center sm:text-left w-full sm:w-auto mt-2 sm:mt-0">
            Contenu protégé par le droit d&apos;auteur – La reproduction est
            interdite sans notre autorisation.
            <br />© 2025 - OneCalc - Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  );
}
