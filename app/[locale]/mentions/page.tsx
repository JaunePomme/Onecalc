export default function Mentions() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <ul className="list-none ml-0 mb-2">
          <li>
            <strong>Nom du site :</strong> Onecalc
          </li>
          <li>
            <strong>Propriétaire :</strong> Elite
          </li>
          <li>
            <strong>Adresse :</strong> 26 rue élite
          </li>
          <li>
            <strong>Email :</strong>{" "}
            <a href="mailto:lachancla@gmail.com" className="underline">
              lachancla@gmail.com
            </a>
          </li>
          <li>
            <strong>Directeur de publication :</strong> Issou Lachancla
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hébergement</h2>
        <ul className="list-none ml-0 mb-2">
          <li>
            <strong>Hébergeur :</strong> Vercel
          </li>
          <li>
            <strong>Siège social :</strong> 440 N Barranca Ave #4133, Covina, CA
            91723, États-Unis
          </li>
          <li>
            <strong>Site web :</strong>{" "}
            <a
              href="https://www.vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              www.vercel.com
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Collecte de données</h2>
        <p>Ce site collecte des données dans deux cas :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>
            Cookies : Via Google AdSense pour la publicité personnalisée
            conformément aux politiques de Google
          </li>
          <li>
            Formulaires : Lorsque vous remplissez volontairement le formulaire
            de contact (nom, email, message)
          </li>
        </ul>
        <p>
          Les données du formulaire sont conservées uniquement pour répondre à
          votre demande et ne sont pas utilisées à d&apos;autres fins.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p>Ce site utilise des cookies via Google AdSense pour :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Diffuser des publicités ciblées</li>
          <li>Mesurer l&apos;audience du site</li>
          <li>Optimiser le positionnement des annonces</li>
        </ul>
        <p>
          Vous pouvez désactiver les cookies via les paramètres de votre
          navigateur.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Droits RGPD</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données, vous
          disposez des droits suivants :
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Droit d&apos;accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l&apos;effacement</li>
          <li>Droit à la portabilité</li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter via le formulaire
          dédié.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Tous les éléments du site (textes, images, logo) sont la propriété
          exclusive de GERGAUD Louis sauf mention contraire.
        </p>
        <p>Toute reproduction sans autorisation est interdite.</p>
      </section>

      <div className="text-sm text-gray-500 mt-8">
        Dernière mise à jour : 12/08/2025
      </div>
    </main>
  );
}
