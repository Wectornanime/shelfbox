export const DATABASE_NAME = "ShelfBox";

export const DATABASE_VERSION = 1;

export const DATABASE_SCHEMA = {
  collections: "id, name",

  miniatures: "id, collectionId, name, brand, favorite",
} as const;
