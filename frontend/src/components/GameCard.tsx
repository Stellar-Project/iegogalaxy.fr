import { motion } from "framer-motion";
import { Download as DownloadIcon, HardDrive, Gamepad2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const trackDownload = (file: string) => {
  fetch("/api/analytics/track-download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file, userAgent: navigator.userAgent }),
  }).catch(() => {});
};

interface GameCardProps {
  title: string;
  logo: string;
  color: "supernova" | "bigbang" | "primary" | "accent";
  patchLink: string;
  patchSize: string;
  romLink: string;
  romSize: string;
  showPatch?: boolean;
  showRom?: boolean;
  delay?: number;
}

export function GameCard({
  title,
  logo,
  color,
  patchLink,
  patchSize,
  romLink,
  romSize,
  showPatch = true,
  showRom = false,
  delay = 0,
}: GameCardProps) {
  const isSupernova = color === "supernova" || color === "accent";

  const mainColorClass = isSupernova ? "text-supernova" : "text-bigbang";
  const btnColorClass = isSupernova
    ? "bg-supernova text-supernova-foreground hover:bg-supernova/90 shadow-[0_0_20px_var(--color-supernova)]"
    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_var(--color-primary)]";
  const glowColorClass = isSupernova ? "bg-supernova/15" : "bg-primary/15";
  const borderColorClass = isSupernova
    ? "hover:border-supernova/50"
    : "hover:border-primary/50";
  const iconColorClass = isSupernova ? "text-supernova" : "text-primary";
  const gradientColorClass = isSupernova ? "via-supernova/60" : "via-primary/60";
  const btnOutlineClass = isSupernova
    ? "border-supernova/30 hover:bg-supernova/10 text-foreground"
    : "border-primary/30 hover:bg-primary/10 text-foreground";

  const isExternalPatch = patchLink.startsWith("http");
  const isExternalRom = romLink.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, x: isSupernova ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card
        className={`h-full bg-card/70 border-border ${borderColorClass} backdrop-blur-md transition-all duration-300 group overflow-hidden relative shadow-xs flex flex-col`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent ${gradientColorClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        <CardHeader className="text-center pb-2">
          <CardTitle
            className={`text-2xl font-black tracking-tight ${mainColorClass} transition-colors`}
          >
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-between space-y-6 p-6 pt-2 flex-1">
          <div className="relative w-full flex justify-center py-4 my-auto">
            <div
              className={`absolute inset-0 ${glowColorClass} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />
            <img
              src={logo}
              alt={`${title} Logo`}
              className="h-44 sm:h-52 object-contain relative z-10 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full space-y-3 pt-2">
            {showPatch && patchLink && (
              <Button
                asChild
                className={`w-full ${btnColorClass} font-black h-11 text-base shadow-sm transition-all cursor-pointer`}
              >
                <a
                  href={patchLink}
                  target={isExternalPatch ? "_blank" : undefined}
                  rel={isExternalPatch ? "noopener noreferrer" : undefined}
                  download={!isExternalPatch}
                  onClick={() => trackDownload(patchLink)}
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Télécharger le Patch
                </a>
              </Button>
            )}

            {showRom && romLink && (
              <Button
                asChild
                variant="outline"
                className={`w-full ${btnOutlineClass} font-black h-10 border-border cursor-pointer`}
              >
                <a
                  href={romLink}
                  target={isExternalRom ? "_blank" : undefined}
                  rel={isExternalRom ? "noopener noreferrer" : undefined}
                  download={!isExternalRom}
                  onClick={() => trackDownload(romLink)}
                >
                  <Gamepad2 className="mr-2 h-4 w-4 text-muted-foreground" />
                  Télécharger la ROM
                </a>
              </Button>
            )}

            {showPatch && showRom && <Separator className="bg-border my-2" />}

            <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground uppercase tracking-wider font-mono font-black">
              {showPatch && patchSize && (
                <div className="flex items-center gap-1.5">
                  <HardDrive size={13} className={iconColorClass} />
                  <span>Patch : {patchSize}</span>
                </div>
              )}
              {showPatch && showRom && patchSize && romSize && (
                <div className="w-px bg-border h-3" />
              )}
              {showRom && romSize && (
                <div className="flex items-center gap-1.5">
                  <HardDrive size={13} className="text-muted-foreground" />
                  <span>ROM : {romSize}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}