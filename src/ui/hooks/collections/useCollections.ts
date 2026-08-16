import { useCallback, useEffect, useState } from "react";

import { listCollectionCase } from "@/app/composition/collection";
import Collection from "@/domain/entities/Collection";

export default function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCollections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await listCollectionCase.execute();

      setCollections(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("Failed to load collections."),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  return {
    collections,
    loading,
    error,
    reload: loadCollections,
  };
}
