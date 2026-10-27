import { useEffect, useState } from "react";

import { getMiniatureByIdCase } from "@/app/composition/miniature";
import Miniature from "@/domain/entities/Miniature";

export default function useMiniature(miniatureId: string | undefined) {
  const [miniature, setMiniature] = useState<Miniature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!miniatureId) {
        setError("Miniature id is required.");
        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await getMiniatureByIdCase.execute(miniatureId);

        if (!result) {
          setError("Miniature not found.");
          setMiniature(null);

          return;
        }

        setMiniature(result);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load miniature.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [miniatureId]);

  return {
    miniature,
    loading,
    error,
  };
}
