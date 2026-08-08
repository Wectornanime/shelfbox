import CreateMiniatureCase from "./CreateMiniature.case";

import MiniatureRepository from "@/domain/repositories/miniature.repository";
import CollectionRepository from "@/domain/repositories/collection.repository";

describe("CreateMiniatureCase", () => {
  let miniatureRepository: jest.Mocked<MiniatureRepository>;
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: CreateMiniatureCase;

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

    useCase = new CreateMiniatureCase(
      miniatureRepository,
      collectionRepository,
    );
  });

  it("should create a miniature", async () => {
    collectionRepository.findById.mockResolvedValue({
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
