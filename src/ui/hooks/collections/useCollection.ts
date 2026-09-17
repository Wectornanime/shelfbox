import { useEffect, useState } from "react";

import { getCollectionByIdCase } from "@/app/composition/collection";
import Collection from "@/domain/entities/Collection";

export default function useCollection(collectionId: string | undefined) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!collectionId) {
        setError("Collection id is required.");
        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await getCollectionByIdCase.execute(collectionId);

        if (!result) {
          setError("Collection not found.");
          setCollection(null);

          return;
        }

        setCollection(result);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load collection.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [collectionId]);

  return {
    collection,
    loading,
    error,
  };
}
