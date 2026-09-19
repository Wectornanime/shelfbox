import { useEffect, useState } from "react";
import { Card } from "@heroui/react";

import Loading from "./loading";

import { imageService } from "@/app/composition/imageService";

interface ShelfBoxImageProps {
  alt?: string;
  path: string;
}

export default function ShelfBoxImage({ path, alt }: ShelfBoxImageProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let objectUrl: string | null = null;

    async function load() {
      const url = await imageService.get(path);

      if (url) {
        objectUrl = url;
        setUrl(url);
      }

      setIsLoading(false);
    }

    load();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [path]);

  return (
    <Card className="relative col-span-12 h-50 w-50 cursor-pointer overflow-hidden rounded-3xl lg:col-span-6">
      {isLoading ? (
        <Loading className="m-auto" size="xl" />
      ) : (
        <img
          alt={alt ?? "Preview da miniatura"}
          className="absolute inset-0 h-full w-full object-cover"
          src={url ?? "/no-image-found-360x250.png"}
        />
      )}
    </Card>
  );
}
