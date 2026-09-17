import { useState } from "react";

import { createMiniatureCase } from "@/app/composition/miniature";

export default function useMiniatures() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createMiniature(data: {
    collectionId: string;
    name: string;
    brand: string;
    scale: string;
  }) {
    try {
      setLoading(true);
      setError(null);

      return await createMiniatureCase.execute(data);
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
