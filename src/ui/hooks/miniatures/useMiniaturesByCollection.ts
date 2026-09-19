import { useCallback, useEffect, useState } from "react";

import { listMiniaturesByCollectionCase } from "@/app/composition/miniature";
import { imageService } from "@/app/composition/imageService";
import Miniature from "@/domain/entities/Miniature";
import ImageViewModel from "@/domain/value-objects/ImageViewModel";

interface MiniatureViewModel extends Omit<Miniature, "images"> {
  images: ImageViewModel[];
}

export default function useMiniaturesByCollection(
  collectionId: string | undefined,
) {
  const [miniatures, setMiniatures] = useState<MiniatureViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMiniatures = useCallback(async () => {
    if (!collectionId) {
      setMiniatures([]);
      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await listMiniaturesByCollectionCase.execute(collectionId);

      const miniaturesWithUrls = await Promise.all(
        result.map(async (miniature) => ({
          ...miniature,
          images: await Promise.all(
            miniature.images.map(async (image) => ({
              ...image,
              url: await imageService.get(image.path),
            })),
          ),
        })),
      );

      setMiniatures(miniaturesWithUrls);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load miniatures.",
      );
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    loadMiniatures();
  }, [loadMiniatures]);

  return {
    miniatures,
    loading,
    error,
    reload: loadMiniatures,
  };
}
