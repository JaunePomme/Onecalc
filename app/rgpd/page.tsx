export default function RGPD() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Politique RGPD</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Engagement RGPD</h2>
        <p>
          Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD) et à protéger votre vie privée.
        </p>
        <p>
          Notre site a été conçu pour minimiser la collecte de données personnelles. Nous ne collectons aucune information personnelle hormis :
        </p>
        <ul className="list-disc ml-6">
          <li>Les données nécessaires au fonctionnement des publicités Google AdSense (si vous acceptez les cookies)</li>
          <li>Les informations que vous nous transmettez volontairement via le formulaire de contact</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Données collectées</h2>
        <p className="font-semibold">Données via AdSense :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Cookies publicitaires (uniquement si acceptés)</li>
          <li>Données de navigation anonymisées pour la publicité ciblée</li>
        </ul>
        <p className="font-semibold">Formulaire de contact :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Nom (facultatif)</li>
          <li>Adresse email (obligatoire pour vous répondre)</li>
          <li>Message</li>
        </ul>
        <p>
          Nous ne collectons pas : adresse IP, localisation précise, données de paiement, ou toute autre information sensible.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Finalité du traitement</h2>
        <ul className="list-disc ml-6">
          <li>Diffusion de publicités pertinentes (via AdSense, si accepté)</li>
          <li>Répondre à vos demandes de contact</li>
        </ul>
        <p>Aucun traitement supplémentaire n'est effectué sur ces données.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Base légale du traitement</h2>
        <ul className="list-disc ml-6">
          <li>Votre consentement pour les cookies publicitaires</li>
          <li>Notre intérêt légitime à répondre aux demandes via le formulaire de contact</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Durée de conservation</h2>
        <ul className="list-disc ml-6">
          <li>Données AdSense : Selon la politique de conservation de Google (gérée par vos paramètres de compte Google)</li>
          <li>Messages du formulaire : Conservés pendant 1 an maximum après le dernier contact, sauf demande de suppression anticipée</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Vos droits</h2>
        <p>
          Conformément au RGPD, vous pouvez :
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Accéder aux données que nous détenons</li>
          <li>Rectifier les informations inexactes</li>
          <li>Supprimer vos données personnelles</li>
          <li>Retirer votre consentement pour les cookies</li>
          <li>Vous opposer au traitement</li>
        </ul>
        <p>
          Pour exercer ces droits concernant le formulaire de contact : <span className="font-semibold">nous contacter</span>
        </p>
        <p>
          Pour les données publicitaires : paramètres de votre compte Google ou paramètres de votre navigateur
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Sous-traitants</h2>
        <ul className="list-disc ml-6">
          <li>Google AdSense pour la publicité</li>
          <li>Notre hébergeur web pour le stockage technique des messages</li>
        </ul>
        <p>
          Tous nos sous-traitants sont conformes au RGPD.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Sécurité</h2>
        <ul className="list-disc ml-6">
          <li>Protocole HTTPS pour toutes les transmissions grâce à notre hébergeur.</li>
          <li>Sécurité renforcée de notre hébergement</li>
          <li>Accès restreint aux messages du formulaire de contact</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Contact DPO</h2>
        <p>
          Pour toute question relative à la protection des données :
        </p>
        <ul className="list-disc ml-6">
          <li>Via notre formulaire de contact</li>
        </ul>
      </section>
    </main>
  );
}