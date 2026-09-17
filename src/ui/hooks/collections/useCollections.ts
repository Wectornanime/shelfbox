import { useCallback, useEffect, useState } from "react";

import {
  createCollectionCase,
  listCollectionCase,
} from "@/app/composition/collection";
import Collection from "@/domain/entities/Collection";
import { CreateCollection } from "@/domain/models/collection.model";

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

  const createCollection = useCallback(async (data: CreateCollection) => {
    try {
      setError(null);

      const collection = await createCollectionCase.execute(data);

      setCollections((current) => [...current, collection]);

      return collection;
    } catch (error) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Failed to create collection.");

      setError(normalizedError);

      throw normalizedError;
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
    createCollection,
  };
}
