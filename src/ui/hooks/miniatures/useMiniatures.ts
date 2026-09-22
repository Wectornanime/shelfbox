import { useState } from "react";

import { createMiniatureCase } from "@/app/composition/miniature";
import { imageService } from "@/app/composition/imageService";

export default function useMiniatures() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createMiniature(data: {
    collectionId: string;
    name: string;
    brand: string;
    scale: string;
    image?: File;
  }) {
    try {
      setLoading(true);
      setError(null);

      let image;

      if (data.image) {
        const path = await imageService.save(data.image);

        image = {
          id: crypto.randomUUID(),
          path,
        };
      }

      return await createMiniatureCase.execute({
        collectionId: data.collectionId,
        name: data.name,
        brand: data.brand,
        scale: data.scale,
        images: image ? [image] : [],
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create miniature.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    createMiniature,
    loading,
    error,
  };
}
