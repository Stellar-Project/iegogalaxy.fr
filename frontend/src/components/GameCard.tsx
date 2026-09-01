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
}: GameCardProps) {
  const isSupernova = color === "supernova" || color === "accent";

  const mainColorClass = isSupernova ? "text-supernova" : "text-bigbang";
  const btnColorClass = isSupernova
    ? "bg-supernova text-supernova-foreground hover:bg-supernova/90"
    : "bg-primary text-primary-foreground hover:bg-primary/90";
  const borderColorClass = isSupernova
    ? "hover:border-supernova/50"
    : "hover:border-primary/50";
  const iconColorClass = isSupernova ? "text-supernova" : "text-primary";
  const btnOutlineClass = isSupernova
    ? "border-supernova/30 hover:bg-supernova/10 text-foreground"
    : "border-primary/30 hover:bg-primary/10 text-foreground";

  const isExternalPatch = patchLink.startsWith("http");
  const isExternalRom = romLink.startsWith("http");

  return (
    <Card
      className={`h-full bg-card border-border ${borderColorClass} transition-colors duration-300 flex flex-col`}
    >
      <CardHeader className="text-center pb-2">
        <CardTitle
          className={`text-2xl font-black tracking-tight ${mainColorClass} transition-colors`}
        >
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-between space-y-6 p-6 pt-2 flex-1">
        <div className="relative w-full flex justify-center py-4 my-auto">
          <img
            src={logo}
            alt={`${title} Logo`}
            className="h-44 sm:h-52 object-contain drop-shadow-xl"
          />
        </div>

        <div className="w-full space-y-3 pt-2">
          {showPatch && patchLink && (
            <Button
              asChild
              className={`w-full ${btnColorClass} font-black h-11 text-base cursor-pointer`}
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
  );
}