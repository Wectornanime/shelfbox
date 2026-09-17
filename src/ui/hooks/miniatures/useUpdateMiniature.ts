import { useCallback, useState } from "react";

import { updateMiniatureCase } from "@/app/composition/miniature";
import Miniature from "@/domain/entities/Miniature";
import { UpdateMiniature } from "@/domain/models/miniature.model";

export default function useUpdateMiniature() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateMiniature = useCallback(
    async (data: UpdateMiniature): Promise<Miniature> => {
      try {
        setLoading(true);
        setError(null);

        const miniature = await updateMiniatureCase.execute(data);

        return miniature;
      } catch (error) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Failed to update miniature.");

        setError(normalizedError);

        throw normalizedError;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    updateMiniature,
  };
}
