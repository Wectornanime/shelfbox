import { UpdateCollectionCase } from "./";

import CollectionRepository from "@/domain/repositories/collection.repository";
import Collection from "@/domain/entities/Collection";

describe("UpdateCollectionCase", () => {
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: UpdateCollectionCase;
  let validCollection: Collection;

  beforeEach(() => {
    collectionRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new UpdateCollectionCase(collectionRepository);

    validCollection = {
      id: "collection-1",
      name: "Hot Wheels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it("should reject when id is missing", async () => {
    const sut = useCase.execute({
      id: "",
      data: {},
    });

    await expect(sut).rejects.toThrow("The collection id is required.");

    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the id contains only whitespace", async () => {
    const sut = useCase.execute({
      id: " ",
      data: {},
    });

    await expect(sut).rejects.toThrow("The collection id is required.");

    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when does not exist the id", async () => {
    collectionRepository.findById.mockResolvedValue(null);

    const sut = useCase.execute({
      id: "invalid-id",
      data: {},
    });

    await expect(sut).rejects.toThrow("Collection not found.");

    expect(collectionRepository.findById).toHaveBeenCalledWith("invalid-id");
    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the name is declared empty", async () => {
    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = useCase.execute({
      id: "valid-id",
      data: { name: "" },
    });

    await expect(sut).rejects.toThrow("The collection name is required.");

    expect(collectionRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the name is declared with only whitespace", async () => {
    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = useCase.execute({
      id: "valid-id",
      data: { name: " " },
    });

    await expect(sut).rejects.toThrow("The collection name is required.");

    expect(collectionRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the description is declared empty", async () => {
    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = useCase.execute({
      id: "valid-id",
      data: { description: "" },
    });

    await expect(sut).rejects.toThrow("The collection description is invalid.");

    expect(collectionRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the description contains only whitespace", async () => {
    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = useCase.execute({
      id: "valid-id",
      data: { description: " " },
    });

    await expect(sut).rejects.toThrow("The collection description is invalid.");

    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the icon is declared empty", async () => {
    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = useCase.execute({
      id: "valid-id",
      data: { icon: "" },
    });

    await expect(sut).rejects.toThrow("The collection icon is invalid.");

    expect(collectionRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the icon contains only whitespace", async () => {
    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = useCase.execute({
      id: "valid-id",
      data: { icon: " " },
    });

    await expect(sut).rejects.toThrow("The collection icon is invalid.");

    expect(collectionRepository.update).not.toHaveBeenCalled();
  });

  it("should update a collection", async () => {
    const newData = {
      name: "valid-name",
    };

    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = await useCase.execute({
      id: "valid-id",
      data: newData,
    });

    expect(sut).toEqual({
      ...validCollection,
      ...newData,
      updatedAt: expect.any(Date),
    });

    expect(collectionRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.update).toHaveBeenCalledWith(sut);
  });
});
