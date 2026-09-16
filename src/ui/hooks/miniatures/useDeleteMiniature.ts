import { useCallback, useState } from "react";

import { deleteMiniatureCase } from "@/app/composition/miniature";

export default function useDeleteMiniature() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteMiniature = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await deleteMiniatureCase.execute(id);
    } catch (error) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Failed to delete miniature.");

      setError(normalizedError);

      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    deleteMiniature,
  };
}
