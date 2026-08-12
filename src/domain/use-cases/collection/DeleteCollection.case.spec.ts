import { DeleteCollectionCase } from "./";

import CollectionRepository from "@/domain/repositories/collection.repository";

describe("DeleteCollectionCase", () => {
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: DeleteCollectionCase;

  beforeEach(() => {
    collectionRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new DeleteCollectionCase(collectionRepository);
  });

  it("should reject when the id is missing", async () => {
    const sut = useCase.execute("");

    await expect(sut).rejects.toThrow("The collection id is required.");

    expect(collectionRepository.delete).not.toHaveBeenCalled();
  });

  it("should reject when the id contains only whitespace", async () => {
    const sut = useCase.execute(" ");

    await expect(sut).rejects.toThrow("The collection id is required.");

    expect(collectionRepository.delete).not.toHaveBeenCalled();
  });

  it("should reject when does not exist the id", async () => {
    collectionRepository.findById.mockResolvedValue(null);

    const sut = useCase.execute("invalid-id");

    await expect(sut).rejects.toThrow("Collection not found.");

    expect(collectionRepository.delete).not.toHaveBeenCalled();
  });

  it("should delete a collection", async () => {
    const collectionId = "valid-id";

    collectionRepository.findById.mockResolvedValue({
      id: collectionId,
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await useCase.execute(collectionId);

    expect(collectionRepository.delete).toHaveBeenCalledWith(collectionId);
  });
});
