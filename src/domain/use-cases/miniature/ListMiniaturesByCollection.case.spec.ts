import { ListMiniaturesByCollectionCase } from "./";

import MiniatureRepository from "@/domain/repositories/miniature.repository";
import CollectionRepository from "@/domain/repositories/collection.repository";
import Collection from "@/domain/entities/Collection";

describe("ListMiniaturesByCollectionCase", () => {
  let miniatureRepository: jest.Mocked<MiniatureRepository>;
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: ListMiniaturesByCollectionCase;
  let validCollection: Collection;

  beforeEach(() => {
    miniatureRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByCollectionId: jest.fn(),
    };

    collectionRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new ListMiniaturesByCollectionCase(
      miniatureRepository,
      collectionRepository,
    );

    validCollection = {
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it("should reject when the collectionId is missing", async () => {
    const sut = useCase.execute("");

    await expect(sut).rejects.toThrow(
      "The miniature collectionId is required.",
    );

    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.findByCollectionId).not.toHaveBeenCalled();
  });

  it("should reject when the collectionId is only whitespace", async () => {
    const sut = useCase.execute(" ");

    await expect(sut).rejects.toThrow(
      "The miniature collectionId is required.",
    );

    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.findByCollectionId).not.toHaveBeenCalled();
  });

  it("should reject when the collection does not exist", async () => {
    const collectionId = "invalid-value";

    collectionRepository.findById.mockResolvedValue(null);

    const sut = useCase.execute(collectionId);

    await expect(sut).rejects.toThrow("Collection not found.");

    expect(collectionRepository.findById).toHaveBeenCalledWith(collectionId);

    expect(miniatureRepository.findByCollectionId).not.toHaveBeenCalled();
  });

  it("should return an empty list when there are no miniatures", async () => {
    const collectionId = "collection-1";

    collectionRepository.findById.mockResolvedValue(validCollection);
    miniatureRepository.findByCollectionId.mockResolvedValue([]);

    const result = await useCase.execute(collectionId);

    expect(collectionRepository.findById).toHaveBeenCalledWith(collectionId);

    expect(miniatureRepository.findByCollectionId).toHaveBeenCalledWith(
      collectionId,
    );

    expect(result).toEqual([]);
  });

  it("should return the miniature list", async () => {
    const collectionId = "collection-1";

    const miniatures = [
      {
        id: "miniature-1",
        collectionId,
        name: "Batmobile",
        brand: "Hot Wheels" as const,
        scale: "1:64",
        favorite: false,
        images: [],
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "miniature-2",
        collectionId,
        name: "Porsche 911",
        brand: "Maisto" as const,
        scale: "1:18",
        favorite: true,
        images: [],
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    collectionRepository.findById.mockResolvedValue(validCollection);
    miniatureRepository.findByCollectionId.mockResolvedValue(miniatures);

    const result = await useCase.execute(collectionId);

    expect(collectionRepository.findById).toHaveBeenCalledWith(collectionId);

    expect(miniatureRepository.findByCollectionId).toHaveBeenCalledWith(
      collectionId,
    );

    expect(result).toEqual(miniatures);
  });
});
