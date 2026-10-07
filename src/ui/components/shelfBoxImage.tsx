import { MouseEventHandler, useEffect, useState } from "react";
import { Card } from "@heroui/react";
import clsx from "clsx";

import Loading from "./loading";

import { imageService } from "@/app/composition/imageService";

interface ShelfBoxImageProps {
  path: string;
  alt?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function ShelfBoxImage({
  path,
  alt,
  className,
  onClick,
}: ShelfBoxImageProps) {
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
    <Card
      className={clsx(
        "relative overflow-hidden",
        className ?? "h-50 w-50 rounded-3xl",
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
    >
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
