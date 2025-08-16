"use client";
import { usePathname, useParams, useRouter } from "next/navigation";
import Link from "next/link";

const locales = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇺🇸", label: "English" },
];

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const params = useParams();

  // On suppose que le premier segment du path est la locale
  const currentLocale = params?.locale || "fr";

  // Remplace la locale dans le pathname par la nouvelle
  function getPathForLocale(locale: string) {
    if (!pathname) return "/" + locale;
    const segments = pathname.split("/").filter(Boolean);
    if (locales.some((l) => l.code === segments[0])) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    return "/" + segments.join("/");
  }

  return (
    <div className="flex gap-2 items-center">
      {locales.map((loc) => (
        <Link
          key={loc.code}
          href={getPathForLocale(loc.code)}
          aria-label={loc.label}
          className={`text-2xl transition-opacity ${currentLocale === loc.code ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
          prefetch={false}
        >
          <span role="img" aria-label={loc.label}>
            {loc.flag}
          </span>
        </Link>
      ))}
    </div>
  );
}
