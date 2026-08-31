import { motion } from "framer-motion";
import {
  Shield,
  Copyright,
  Server,
  AlertTriangle,
  FileText,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background text-slate-300/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-white">Mentions Légales</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Informations juridiques, droits d'auteur et politique de contenu.
          </p>
        </div>

        <Alert
          variant="destructive"
          className="bg-red-900/20 border-red-900/50 text-red-200"
        >
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-bold text-lg mb-2">
            Avertissement sur les Droits d'Auteur
          </AlertTitle>
          <AlertDescription className="text-slate-200 leading-relaxed">
            <p className="mb-2">
              Les fichiers proposés sur ce site incluent des modifications
              logicielles (ROM patchée) à des fins de traduction et
              d'accessibilité linguistique.
              <br />
              <br />
              <strong>Politique de retrait :</strong> Si vous êtes un
              représentant légal de Level-5 ou Nintendo et souhaitez le retrait
              de ces fichiers, veuillez nous contacter via Discord ou par email.
              Nous nous engageons à retirer immédiatement tout contenu litigieux
              sur simple demande.
            </p>
          </AlertDescription>
        </Alert>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <Copyright className="text-blue-500" /> Propriété Intellectuelle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm md:text-base leading-relaxed text-white">
            <p>
              <strong>Inazuma Eleven GO Galaxy</strong> est une propriété
              intellectuelle exclusive de <strong>Level-5 Inc.</strong>
            </p>
            <p>
              Le projet <strong>Stellar Project</strong> est une initiative de
              fans ("Fan-Translation") à but{" "}
              <strong>strictement non lucratif</strong>. Ce projet vise
              uniquement à rendre le jeu accessible au public francophone, le
              titre n'ayant jamais été commercialisé en Europe.
            </p>
            <p className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-200 text-sm">
              Nous encourageons vivement tous les joueurs à soutenir la
              franchise Inazuma Eleven en achetant les produits officiels (jeux,
              animés, produits dérivés) disponibles dans leur région.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <Download className="text-yellow-400" /> Utilisation des Fichiers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm md:text-base leading-relaxed text-white">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Interdiction de vente :</strong> Il est strictement
                interdit de vendre, louer ou monétiser l'accès aux fichiers (ROM
                ou Patch) fournis par Stellar Project. Si vous avez payé pour
                ces fichiers, vous avez été escroqué.
              </li>
              <li>
                <strong>Absence de garantie :</strong> Les fichiers sont fournis
                "tels quels". L'équipe décline toute responsabilité concernant
                d'éventuels dysfonctionnements sur votre matériel (console ou
                émulateur).
              </li>
              <li>
                <strong>Usage privé :</strong> Ces fichiers sont destinés à un
                usage personnel, éducatif ou d'archivage.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-lg">
                <Shield className="text-purple-500" /> L'Équipe
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-white">
              <p>
                <strong className="text-white">Nom :</strong> Stellar Project
              </p>
              <p>
                <strong className="text-white">Nature :</strong> Collectif de
                bénévoles
              </p>
              <p>
                <strong className="text-white">Contact :</strong>{" "}
                <a href="mailto:ieggsnbbfr@gmail.com" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">ieggsnbbfr@gmail.com</a>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-lg">
                <Server className="text-green-500" /> Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-white">
              <p>Ce site est hébergé par :</p>
              <p className="text-white font-medium">OVH SAS</p>
              <p>2 rue Kellermann - 59100 Roubaix - France</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <FileText className="text-slate-400" /> Confidentialité & Données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm md:text-base leading-relaxed text-white">
            <p>Nous attachons une importance particulière à votre vie privée. Voici comment nous traitons vos données :</p>

            <h4 className="font-semibold text-white text-base mt-4">Cookies</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Session admin :</strong> un cookie (<code className="text-blue-300">better-auth.session_token</code>) est déposé uniquement si vous vous connectez à l'interface d'administration. Il expire à la fermeture du navigateur.</li>
              <li><strong>Aucun cookie publicitaire</strong> — nous n'utilisons aucun traqueur tiers, pixel ou régie publicitaire.</li>
            </ul>

            <h4 className="font-semibold text-white text-base mt-4">Analytics</h4>
            <p className="text-slate-300">Nous collectons des statistiques de navigation anonymes pour améliorer le site :</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Page visitée (<code className="text-blue-300">path</code>)</li>
              <li>Type de navigateur (<code className="text-blue-300">userAgent</code>)</li>
              <li>Site référent (<code className="text-blue-300">referrer</code>)</li>
              <li>Fichier téléchargé (uniquement pour les statistiques de téléchargement)</li>
            </ul>
            <p className="text-slate-400 text-sm">Aucune adresse IP, aucun identifiant personnel, aucune donnée nominative n'est collectée ou stockée.</p>

            <h4 className="font-semibold text-white text-base mt-4">Durée de conservation</h4>
            <p className="text-slate-300">Les données de navigation sont conservées jusqu'à réinitialisation manuelle via l'interface d'administration. Aucune expiration automatique n'est configurée.</p>

            <h4 className="font-semibold text-white text-base mt-4">Vos droits (RGPD)</h4>
            <p className="text-slate-300">Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ces droits, contactez-nous à :</p>
            <p className="text-sm">
              <a href="mailto:ieggsnbbfr@gmail.com?subject=RGPD%20-%20Demande%20de%20suppression" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">ieggsnbbfr@gmail.com</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}