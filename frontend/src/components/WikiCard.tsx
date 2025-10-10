import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface WikiCardProps {
  name: string;
  description: string;
  link: string;
  image?: string;
}

export function WikiCard({ name, description, link, image }: WikiCardProps) {
  return (
    <Card className="bg-black/20 border border-gray-800 shadow-md">
      <CardHeader>
        <CardTitle className="text-yellow-400 font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-200 flex flex-col items-start space-y-2">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-16 object-contain rounded"
          />
        )}
        <p>{description}</p>
        <Link
          to={link}
          className="text-yellow-400 hover:underline mt-2 inline-block"
        >
          En savoir plus
        </Link>
      </CardContent>
    </Card>
  );
}
