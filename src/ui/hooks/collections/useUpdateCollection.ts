import { useCallback, useState } from "react";

import { updateCollectionCase } from "@/app/composition/collection";
import Collection from "@/domain/entities/Collection";
import { UpdateCollection } from "@/domain/models/collection.model";

export default function useUpdateCollection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateCollection = useCallback(
    async (data: UpdateCollection): Promise<Collection> => {
      try {
        setLoading(true);
        setError(null);

        const collection = await updateCollectionCase.execute(data);

        return collection;
      } catch (error) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Failed to update collection.");

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
    updateCollection,
  };
}
