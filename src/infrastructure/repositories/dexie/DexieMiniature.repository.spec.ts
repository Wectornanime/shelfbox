import { DexieMiniatureRepository } from "./";

import { dexieDatabase } from "@/infrastructure/database";
import Miniature from "@/domain/entities/Miniature";

describe("DexieMiniatureRepository", () => {
  let repository: DexieMiniatureRepository;

  beforeEach(async () => {
    repository = new DexieMiniatureRepository();

    await dexieDatabase.miniatures.clear();
  });

  it("should create a miniature", async () => {
    const miniature: Miniature = {
      id: "miniature-1",
      collectionId: "collection-1",
      name: "Nissan Skyline GT-R",
      brand: "Hot Wheels",
      scale: "1:64",
      images: [],
      quantity: 1,
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await repository.create(miniature);

    const result = await dexieDatabase.miniatures.get(miniature.id);

    expect(result).toEqual(miniature);
  });

  it("should return all miniatures", async () => {
    const miniatures: Miniature[] = [
      {
        id: "miniature-1",
        collectionId: "collection-1",
        name: "Nissan Skyline GT-R",
        brand: "Hot Wheels",
        scale: "1:64",
        images: [],
        quantity: 1,
        favorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "miniature-2",
        collectionId: "collection-1",
        name: "Toyota Supra MK4",
        brand: "Matchbox",
        scale: "1:64",
        images: [],
        quantity: 1,
        favorite: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await dexieDatabase.miniatures.bulkAdd(miniatures);

    const result = await repository.findAll();

    expect(result).toEqual(miniatures);
  });

  it("should return a miniature by id", async () => {
    const miniature: Miniature = {
      id: "miniature-1",
      collectionId: "collection-1",
      name: "Nissan Skyline GT-R",
      brand: "Hot Wheels",
      scale: "1:64",
      images: [],
      quantity: 1,
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dexieDatabase.miniatures.add(miniature);

    const result = await repository.findById("miniature-1");

    expect(result).toEqual(miniature);
  });

  it("should return null when miniature is not found by id", async () => {
    const result = await repository.findById("non-existent-id");

    expect(result).toBeNull();
  });

  it("should update an existing miniature", async () => {
    const miniature: Miniature = {
      id: "miniature-1",
      collectionId: "collection-1",
      name: "Nissan Skyline GT-R",
      brand: "Hot Wheels",
      scale: "1:64",
      images: [],
      quantity: 1,
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dexieDatabase.miniatures.add(miniature);

    const updatedMiniature: Miniature = {
      ...miniature,
      name: "Nissan Skyline GT-R R34",
      favorite: true,
      updatedAt: new Date(),
    };

    await repository.update(updatedMiniature);

    const result = await dexieDatabase.miniatures.get("miniature-1");

    expect(result).toEqual(updatedMiniature);
  });

  it("should delete a miniature by id", async () => {
    const miniature: Miniature = {
      id: "miniature-1",
      collectionId: "collection-1",
      name: "Nissan Skyline GT-R",
      brand: "Hot Wheels",
      scale: "1:64",
      images: [],
      quantity: 1,
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dexieDatabase.miniatures.add(miniature);

    await repository.delete("miniature-1");

    const result = await dexieDatabase.miniatures.get("miniature-1");

    expect(result).toBeUndefined();
  });

  it("should return all miniatures by collection id", async () => {
    const miniatures: Miniature[] = [
      {
        id: "miniature-1",
        collectionId: "collection-1",
        name: "Nissan Skyline GT-R",
        brand: "Hot Wheels",
        scale: "1:64",
        images: [],
        quantity: 1,
        favorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "miniature-2",
        collectionId: "collection-1",
        name: "Toyota Supra MK4",
        brand: "Matchbox",
        scale: "1:64",
        images: [],
        quantity: 1,
        favorite: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "miniature-3",
        collectionId: "collection-2",
        name: "Porsche 911 GT3",
        brand: "Mini GT",
        scale: "1:64",
        images: [],
        quantity: 1,
        favorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await dexieDatabase.miniatures.bulkAdd(miniatures);

    const result = await repository.findByCollectionId("collection-1");

    expect(result).toEqual([miniatures[0], miniatures[1]]);
  });

  it("should return an empty array when no miniatures match collection id", async () => {
    const miniature: Miniature = {
      id: "miniature-1",
      collectionId: "collection-1",
      name: "Nissan Skyline GT-R",
      brand: "Hot Wheels",
      scale: "1:64",
      images: [],
      quantity: 1,
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dexieDatabase.miniatures.add(miniature);

    const result = await repository.findByCollectionId(
      "non-existent-collection",
    );

    expect(result).toEqual([]);
  });
});
