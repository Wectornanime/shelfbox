import { Card, CardHeader, CardTitle } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { imageService } from "@/app/composition/imageService";

interface CollectionCardProps {
  id: string;
  icon?: string;
  title: string;
}

export default function CollectionCard({
  id,
  icon,
  title,
}: CollectionCardProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    async function loadImage() {
      if (!icon) {
        setImagePreview(null);

        return;
      }

      const url = await imageService.get(icon);

      if (url) {
        objectUrl = url;
        setImagePreview(url);
      }
    }

    loadImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  return (
    <Link to={`/collections/${id}`}>
      <Card className="flex w-24 gap-2 p-0 rounded-md">
        <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-24 rounded-md object-cover select-none"
          loading="lazy"
          src={imagePreview ?? "/no-image-found-360x250.png"}
        />
        <CardHeader className="px-2 pb-1">
          <CardTitle>{title}</CardTitle>
          {/* <CardDescription>148 members</CardDescription> */}
        </CardHeader>
      </Card>
    </Link>
  );
}
