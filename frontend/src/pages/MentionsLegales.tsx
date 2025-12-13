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
    <div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
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
            Informations juridiques et conditions d'utilisation du patch et des
            fichiers.
          </p>
        </div>

        {/* AVERTISSEMENT ROM */}
        <Alert
          variant="destructive"
          className="bg-red-900/20 border-red-900/50 text-red-200"
        >
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-bold text-lg mb-2">
            Avertissement Légal Important
          </AlertTitle>
          <AlertDescription className="text-slate-200 leading-relaxed">
            <p className="mb-2">
              En téléchargeant les fichiers proposés sur ce site, vous certifiez
              posséder l'original. L'équipe Stellar Project décline toute
              responsabilité en cas d'utilisation illégale de ces fichiers.
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
              <strong>Inazuma Eleven GO Galaxy</strong> est un jeu vidéo
              développé et édité par <strong>Level-5 Inc.</strong> et publié sur
              les consoles Nintendo.
            </p>
            <p>
              Le projet <strong>Galaxy FR (Stellar Project)</strong> est un
              projet de fan-traduction (ROM Hack) à but strictement{" "}
              <strong>non lucratif</strong>. Nous ne sommes en aucun cas
              affiliés, soutenus ou autorisés par Level-5, Nintendo ou leurs
              filiales.
            </p>
            <p>
              Tous les droits sur les personnages, les musiques, le scénario et
              le code source original appartiennent à leurs propriétaires
              respectifs. Ce patch est une modification tierce.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <Download className="text-yellow-400" /> Conditions d'Utilisation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm md:text-base leading-relaxed text-white">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Vous ne devez pas vendre, louer ou monétiser l'accès aux
                fichiers (patch ou ROM) fournis par Stellar Project.
              </li>
              <li>
                Le patch est fourni "tel quel". L'équipe Stellar Project ne peut
                être tenue responsable des éventuels dommages causés à votre
                console, vos fichiers de sauvegarde ou votre matériel
                informatique.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-lg">
                <Shield className="text-purple-500" /> Éditeur du Site
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-white">
              <p>
                <strong className="text-white">Nom :</strong> Stellar Project
              </p>
              <p>
                <strong className="text-white">Contact :</strong> Via notre
                serveur Discord
              </p>
              <p>
                <strong className="text-white">Statut :</strong> Association de
                fait (Bénévoles)
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
              <p className="text-white font-medium">OVH</p>{" "}
              <p>Europe (France - Gravelines)</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <FileText className="text-slate-400" /> Données Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm md:text-base leading-relaxed text-white">
            <p>
              Ce site ne collecte aucune donnée personnelle nominative et
              n'utilise pas de cookies publicitaires. Les seules données
              techniques collectées (logs de connexion) sont celles requises
              légalement par l'hébergeur pour des raisons de sécurité.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}