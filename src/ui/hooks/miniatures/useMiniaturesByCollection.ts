import { useCallback, useEffect, useState } from "react";

import { listMiniaturesByCollectionCase } from "@/app/composition/miniature";
import Miniature from "@/domain/entities/Miniature";

export default function useMiniaturesByCollection(
  collectionId: string | undefined,
) {
  const [miniatures, setMiniatures] = useState<Miniature[]>([]);
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

      setMiniatures(result);
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
