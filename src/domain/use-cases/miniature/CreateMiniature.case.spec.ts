import CreateMiniatureCase from "./CreateMiniature.case";

import MiniatureRepository from "@/domain/repositories/miniature.repository";
import CollectionRepository from "@/domain/repositories/collection.repository";

describe("CreateMiniatureCase", () => {
  it("should create a miniature", async () => {
    const miniatureRepository: jest.Mocked<MiniatureRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByCollectionId: jest.fn(),
    };

    const collectionRepository: jest.Mocked<CollectionRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    collectionRepository.findById.mockResolvedValue({
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const useCase = new CreateMiniatureCase(
      miniatureRepository,
      collectionRepository,
    );

    const miniature = await useCase.execute({
      collectionId: "collection-1",
      name: "Batmobile",
      brand: "Hot Wheels",
      scale: "1:64",
    });

    expect(miniature).toEqual({
      id: expect.any(String),
      collectionId: "collection-1",
      name: "Batmobile",
      brand: "Hot Wheels",
      scale: "1:64",
      favorite: false,
      images: [],
      quantity: 1,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    expect(collectionRepository.findById).toHaveBeenCalledWith("collection-1");
    expect(miniatureRepository.create).toHaveBeenCalledWith(miniature);
  });
});
