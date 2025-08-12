export default function Politique() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Collecte des données</h2>
        <p>
          Notre site est conçu pour respecter votre vie privée. Nous ne collectons aucune donnée personnelle, sauf dans les cas suivants :
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Via Google AdSense pour la diffusion de publicités (cookies)</li>
          <li>Lorsque vous utilisez volontairement notre formulaire de contact</li>
        </ul>
        <p>
          Nous ne collectons pas d'informations personnelles telles que nom, adresse, email (sauf via le formulaire de contact), numéro de téléphone, etc., en dehors de ces deux cas spécifiques.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Utilisation des données</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>Diffuser des publicités via Google AdSense (uniquement pour les visiteurs ayant accepté les cookies)</li>
          <li>Vous répondre si vous nous contactez via le formulaire de contact</li>
        </ul>
        <p>
          Nous n'utilisons pas vos données pour personnaliser votre expérience utilisateur ou à d'autres fins non mentionnées ici.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Publicité et cookies</h2>
        <p>
          Nous utilisons Google AdSense pour diffuser des publicités. Google peut utiliser des cookies ou des identifiants publicitaires pour :
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Personnaliser les annonces en fonction de vos centres d'intérêt</li>
          <li>Mesurer l'efficacité des publicités</li>
        </ul>
        <p>
          Ces cookies sont uniquement placés si vous acceptez les cookies publicitaires. Vous pouvez les désactiver à tout moment dans les paramètres de votre navigateur.
        </p>
        <p>
          En dehors d'AdSense, notre site n'utilise aucun cookie de suivi ou analytique.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Partage des données</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>Google (pour les services publicitaires via AdSense, si vous avez accepté les cookies)</li>
        </ul>
        <p>
          Les informations envoyées via le formulaire de contact sont utilisées uniquement pour vous répondre et ne sont partagées avec aucun tiers.
        </p>
        <p>
          Nous ne vendons ni ne louons aucune donnée personnelle.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Vos droits</h2>
        <p>
          Conformément au RGPD, vous avez le droit de :
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Accéder à vos données personnelles</li>
          <li>Demander la rectification ou la suppression de vos données</li>
          <li>Vous opposer au traitement de vos données</li>
        </ul>
        <p>
          Pour exercer ces droits sur les données du formulaire de contact, veuillez nous contacter via ce même formulaire.
        </p>
        <p>
          Pour les données publicitaires, vous devez vous référer aux paramètres de votre compte Google ou aux paramètres de votre navigateur.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Protection des données</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger les données que vous pourriez nous transmettre via le formulaire de contact.
        </p>
        <p>
          Notre site ne stocke aucune base de données utilisateur et ne requiert aucune création de compte.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Modifications de cette politique</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique de confidentialité. Les changements seront publiés sur cette page avec la date de mise à jour.
        </p>
      </section>
    </main>
  );
}