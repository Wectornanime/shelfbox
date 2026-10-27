import { useCallback, useState } from "react";

import { deleteCollectionCase } from "@/app/composition/collection";

export default function useDeleteCollection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteCollection = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await deleteCollectionCase.execute(id);
    } catch (error) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Failed to delete collection.");

      setError(normalizedError);

      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    deleteCollection,
  };
}
