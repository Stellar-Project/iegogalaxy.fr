import { Link } from "react-router-dom";
import {
  Shield,
  Copyright,
  Server,
  AlertTriangle,
  FileText,
  Download,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useMeta } from "@/lib/useMeta";

export default function MentionsLegales() {
  useMeta({
    title: "Mentions Légales & Confidentialité",
    description:
      "Informations juridiques, politique de confidentialité, droits d'auteur et conditions d'utilisation du projet Stellar.",
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4 mb-10">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <Button
              variant="link"
              asChild
              className="text-muted-foreground hover:text-primary p-0 h-auto text-xs sm:text-sm cursor-pointer"
            >
              <Link to="/">Accueil</Link>
            </Button>
            <ChevronRight size={14} />
            <span className="text-primary font-black">Mentions Légales</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Mentions <span className="text-accent">Légales</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Droits d'auteur, propriété intellectuelle, hébergement et politique de protection des données.
          </p>
        </div>

        <Alert
          variant="destructive"
          className="bg-destructive/10 border-destructive/30 text-destructive shadow-xs"
        >
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <AlertTitle className="font-black text-base mb-2">
            Avertissement sur les Droits d'Auteur
          </AlertTitle>
          <AlertDescription className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            <p className="mb-2">
              Les fichiers mis à disposition sur ce site sont des modifications logicielles (patchs de traduction) conçus à des fins d'accessibilité linguistique pour les fans francophones.
            </p>
            <p>
              <strong className="text-foreground font-black">Politique de retrait (DMCA / Ayants droit) :</strong> Si vous êtes un représentant légal de <strong className="text-foreground font-black">Level-5 Inc.</strong> ou de <strong className="text-foreground font-black">Nintendo</strong> et demandez le retrait de certains fichiers, contactez-nous immédiatement via notre serveur Discord ou par email. Nous nous engageons à supprimer tout contenu sous 48 heures ouvrées sur simple demande.
            </p>
          </AlertDescription>
        </Alert>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-foreground text-lg sm:text-xl font-black">
              <Copyright className="text-primary h-5 w-5" /> Propriété Intellectuelle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground font-black">Inazuma Eleven GO Galaxy</strong> et l'ensemble de ses univers, personnages, musiques et visuels sont la propriété exclusive de <strong className="text-foreground font-black">Level-5 Inc.</strong>
            </p>
            <p>
              Le collectif <strong className="text-foreground font-black">Stellar Project</strong> est un groupe de fans bénévoles sans affiliation commerciale avec Level-5 ou Nintendo. Ce projet est à but <strong className="text-foreground font-black">strictement non lucratif</strong> et vise à valoriser un jeu jamais localisé officiellement en Europe.
            </p>
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-foreground text-xs leading-relaxed">
              Nous encourageons activement l'ensemble des joueurs à soutenir la saga Inazuma Eleven en acquérant les jeux originaux, mangas et produits dérivés officiels de Level-5.
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-foreground text-lg sm:text-xl font-black">
              <Download className="text-accent h-5 w-5" /> Utilisation des Fichiers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-foreground font-black">Interdiction totale de vente :</strong> Il est strictement interdit de commercialiser, louer ou monétiser les patchs créés par l'équipe. L'accès à ces fichiers est 100% gratuit.
              </li>
              <li>
                <strong className="text-foreground font-black">Absence de garantie :</strong> Les patchs sont fournis en l'état. L'équipe ne peut être tenue responsable des mauvaises manipulations ou altérations de données sur votre matériel.
              </li>
              <li>
                <strong className="text-foreground font-black">Usage privé & légal :</strong> L'application du patch nécessite la possession légale d'une copie originale du jeu japonais.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-foreground text-base sm:text-lg font-black">
                <Shield className="text-accent h-5 w-5" /> L'Équipe
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm space-y-2 text-muted-foreground">
              <p>
                <strong className="text-foreground font-black">Projet :</strong> Stellar Project
              </p>
              <p>
                <strong className="text-foreground font-black">Statut :</strong> Collectif communautaire bénévole
              </p>
              <p>
                <strong className="text-foreground font-black">Email de contact :</strong>{" "}
                <a
                  href="mailto:ieggsnbbfr@gmail.com"
                  className="text-primary hover:underline underline-offset-2 font-mono font-black"
                >
                  ieggsnbbfr@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-foreground text-base sm:text-lg font-black">
                <Server className="text-primary h-5 w-5" /> Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm space-y-2 text-muted-foreground">
              <p>Le site est hébergé par :</p>
              <p className="text-foreground font-black">OVH SAS</p>
              <p>2 rue Kellermann - 59100 Roubaix - France</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-foreground text-lg sm:text-xl font-black">
              <FileText className="text-primary h-5 w-5" /> Confidentialité & Données Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <p>
              Nous respectons scrupuleusement la vie privée de nos visiteurs. Voici comment sont gérées vos données :
            </p>

            <h4 className="font-black text-foreground text-sm mt-4">1. Cookies</h4>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong className="text-foreground font-black">Session administrateur :</strong> Un cookie technique (
                <code className="bg-secondary px-1.5 py-0.5 rounded text-primary text-xs font-mono font-black border border-border">
                  better-auth.session_token
                </code>
                ) est déposé uniquement lors de la connexion à l'espace d'administration.
              </li>
              <li>
                <strong className="text-foreground font-black">Aucun cookie publicitaire :</strong> Aucun traqueur tiers, régie de ciblage ou pixel publicitaire n'est actif sur le site.
              </li>
            </ul>

            <h4 className="font-black text-foreground text-sm mt-4">2. Mesure d'audience (Analytics)</h4>
            <p>
              Des statistiques de navigation agrégées et anonymes sont collectées pour mesurer l'intérêt des guides et des patchs :
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Page consultée (<code className="bg-secondary px-1 rounded text-xs font-mono border border-border">path</code>)</li>
              <li>Type d'appareil et navigateur (<code className="bg-secondary px-1 rounded text-xs font-mono border border-border">userAgent</code>)</li>
              <li>Origine de la visite (<code className="bg-secondary px-1 rounded text-xs font-mono border border-border">referrer</code>)</li>
              <li>Comptabilisation anonyme des téléchargements</li>
            </ul>
            <p className="text-xs text-muted-foreground/80 italic">
              Aucune adresse IP n'est stockée et aucune donnée nominative n'est conservée.
            </p>

            <h4 className="font-black text-foreground text-sm mt-4">3. Exercice de vos droits (RGPD)</h4>
            <p>
              Conformément à la réglementation européenne sur la protection des données (RGPD), vous bénéficiez d'un droit d'accès et de suppression. Vous pouvez adresser vos requêtes à :
            </p>
            <p>
              <a
                href="mailto:ieggsnbbfr@gmail.com?subject=RGPD%20-%20Demande%20de%20renseignement"
                className="text-primary hover:underline underline-offset-2 font-mono font-black"
              >
                ieggsnbbfr@gmail.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}