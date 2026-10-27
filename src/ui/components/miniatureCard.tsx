import { Card, CardHeader, CardTitle } from "@heroui/react";
import { Link } from "react-router-dom";

import ImageViewModel from "@/domain/value-objects/ImageViewModel";

interface MiniatureCardProps {
  id: string;
  title: string;
  image: ImageViewModel;
}

export default function MiniatureCard({
  id,
  image,
  title,
}: MiniatureCardProps) {
  return (
    <Link to={`miniatures/${id}`}>
      <Card className="flex w-24 gap-2 p-0 rounded-md">
        <img
          alt={image?.alt ?? "Miniature preview"}
          className="pointer-events-none aspect-square w-24 rounded-md object-cover select-none"
          loading="lazy"
          src={image?.url ?? "/no-image-found-360x250.png"}
        />
        <CardHeader className="px-2 pb-1">
          <CardTitle>{title}</CardTitle>
          {/* <CardDescription>148 members</CardDescription> */}
        </CardHeader>
      </Card>
    </Link>
  );
}
