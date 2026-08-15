import { DexieCollectionRepository } from "./";

import { dexieDatabase } from "@/infrastructure/database";
import Collection from "@/domain/entities/Collection";

describe("DexieCollectionRepository", () => {
  let repository: DexieCollectionRepository;

  beforeEach(async () => {
    repository = new DexieCollectionRepository();

    await dexieDatabase.collections.clear();
  });

  it("should create a collection", async () => {
    const collection: Collection = {
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await repository.create(collection);

    const result = await dexieDatabase.collections.get(collection.id);

    expect(result).toEqual(collection);
  });

  it("should return all collections", async () => {
    const collections: Collection[] = [
      {
        id: "collection-1",
        name: "Hot Wheels",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "collection-2",
        name: "Maisto",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await dexieDatabase.collections.bulkAdd(collections);

    const result = await repository.findAll();

    expect(result).toEqual(collections);
  });

  it("should return a collection by id", async () => {
    const collection: Collection = {
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dexieDatabase.collections.add(collection);

    const result = await repository.findById("collection-1");

    expect(result).toEqual(collection);
  });

  it("should return null when collection is not found by id", async () => {
    const result = await repository.findById("non-existent-id");

    expect(result).toBeNull();
  });

  it("should update an existing collection", async () => {
    const collection: Collection = {
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dexieDatabase.collections.add(collection);

    const updatedCollection: Collection = {
      ...collection,
      name: "Matchbox",
      updatedAt: new Date(),
    };

    await repository.update(updatedCollection);

    const result = await dexieDatabase.collections.get("collection-1");

    expect(result).toEqual(updatedCollection);
  });

  it("should delete a collection by id", async () => {
    const collection: Collection = {
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dexieDatabase.collections.add(collection);

    await repository.delete("collection-1");

    const result = await dexieDatabase.collections.get("collection-1");

    expect(result).toBeUndefined();
  });
});
