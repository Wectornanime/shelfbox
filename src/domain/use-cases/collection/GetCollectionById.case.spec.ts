import { GetCollectionByIdCase } from ".";

import CollectionRepository from "@/domain/repositories/collection.repository";

describe("GetCollectionByIdCase", () => {
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: GetCollectionByIdCase;

  beforeEach(() => {
    collectionRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new GetCollectionByIdCase(collectionRepository);
  });

  it("should reject when the id is missing", async () => {
    const sut = useCase.execute("");

    await expect(sut).rejects.toThrow("The collection id is required.");

    expect(collectionRepository.findById).not.toHaveBeenCalled();
  });

  it("should reject when the id contains only whitespace", async () => {
    const sut = useCase.execute(" ");

    await expect(sut).rejects.toThrow("The collection id is required.");

    expect(collectionRepository.findById).not.toHaveBeenCalled();
  });

  it("should return null when does not exist the id", async () => {
    const collectionId = "invalid-id";

    collectionRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(collectionId);

    expect(collectionRepository.findById).toHaveBeenCalledWith(collectionId);
    expect(result).toBeNull();
  });

  it("should return the collection", async () => {
    const collectionId = "valid-id";

    const collection = {
      id: collectionId,
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    collectionRepository.findById.mockResolvedValue(collection);

    const result = await useCase.execute(collectionId);

    expect(collectionRepository.findById).toHaveBeenCalledWith(collectionId);
    expect(result).toEqual(collection);
  });
});
