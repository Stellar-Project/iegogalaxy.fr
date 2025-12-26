import { motion } from "framer-motion";
import {
  Download as DownloadIcon,
  HardDrive /* Gamepad2 */,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface GameCardProps {
  title: string;
  logo: string;
  color: "yellow" | "blue";
  patchLink: string;
  patchSize: string;
  // romLink: string;
  // romSize: string;
  delay?: number;
}

export function GameCard({
  title,
  logo,
  color,
  patchLink,
  patchSize,
  // romLink,
  // romSize,
  delay = 0,
}: GameCardProps) {
  const isYellow = color === "yellow";
  const mainColorClass = isYellow ? "text-yellow-400" : "text-blue-400";
  const btnColorClass = isYellow
    ? "bg-yellow-500 hover:bg-yellow-400 hover:shadow-yellow-500/20"
    : "bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/20";
  const glowColorClass = isYellow ? "bg-yellow-500/5" : "bg-blue-500/5";
  const borderColorClass = isYellow
    ? "hover:border-yellow-500/30"
    : "hover:border-blue-500/30";
  const iconColorClass = isYellow ? "text-yellow-500" : "text-blue-500";
  const gradientColorClass = isYellow ? "via-yellow-500/50" : "via-blue-500/50";
  const shadowColorClass = isYellow
    ? "group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]"
    : "group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]";

  return (
    <motion.div
      initial={{ opacity: 0, x: isYellow ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      <Card
        className={`h-full bg-slate-900/50 backdrop-blur-sm border-white/5 ${borderColorClass} transition-all duration-300 group overflow-hidden relative`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent ${gradientColorClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
        />

        <CardHeader className="text-center pb-2">
          <CardTitle
            className={`text-2xl font-bold ${mainColorClass} ${shadowColorClass} transition-all`}
          >
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-between space-y-8 p-6 pt-4 h-full">
          <div className="relative w-full flex justify-center py-4">
            <div
              className={`absolute inset-0 ${glowColorClass} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <img
              src={logo}
              alt={`${title} Logo`}
              className="h-48 md:h-56 object-contain relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full space-y-3">
            <Button
              asChild
              className={`w-full ${btnColorClass} text-white font-bold h-12 text-lg shadow-lg transition-all`}
            >
              <a href={patchLink} download>
                <DownloadIcon className="mr-2 h-5 w-5" />
                Télécharger Patch
              </a>
            </Button>

            {/* <Button
              asChild
              variant="secondary"
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold h-10 border border-white/10"
            >
              <a href={romLink} download>
                <Gamepad2 className="mr-2 h-4 w-4" />
                Télécharger ROM
              </a>
            </Button> */}

            <Separator className="bg-white/10 my-2" />

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 uppercase tracking-wider font-medium">
              <div className="flex items-center gap-1.5">
                <HardDrive size={12} className={iconColorClass} />
                Patch : {patchSize}
              </div>
              <div className="w-px bg-slate-700 h-3" />
              {/* <div className="flex items-center gap-1.5">
                <HardDrive size={12} className="text-slate-400" />
                ROM : {romSize}
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}