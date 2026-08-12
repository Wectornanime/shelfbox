import CreateCollectionCase from "./CreateCollection.case";

import CollectionRepository from "@/domain/repositories/collection.repository";

describe("CreateCollectionCase", () => {
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: CreateCollectionCase;

  beforeEach(() => {
    collectionRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new CreateCollectionCase(collectionRepository);
  });

  it("should reject a collection without a name", async () => {
    const sut = useCase.execute({
      name: "",
    });

    await expect(sut).rejects.toThrow("The collection name is required.");

    expect(collectionRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a collection when the name is an empty string", async () => {
    const sut = useCase.execute({
      name: " ",
    });

    await expect(sut).rejects.toThrow("The collection name is required.");

    expect(collectionRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a collection when the description is an empty string", async () => {
    const sut = useCase.execute({
      name: "Collection 1",
      description: "",
    });

    await expect(sut).rejects.toThrow("The collection description is invalid.");

    expect(collectionRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a collection when the description contains only whitespace", async () => {
    const sut = useCase.execute({
      name: "Collection 1",
      description: " ",
    });

    await expect(sut).rejects.toThrow("The collection description is invalid.");

    expect(collectionRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a collection when the icon is an empty string", async () => {
    const sut = useCase.execute({
      name: "Collection 1",
      icon: "",
    });

    await expect(sut).rejects.toThrow("The collection icon is invalid.");

    expect(collectionRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a collection when the icon contains only whitespace", async () => {
    const sut = useCase.execute({
      name: "Collection 1",
      icon: " ",
    });

    await expect(sut).rejects.toThrow("The collection icon is invalid.");

    expect(collectionRepository.create).not.toHaveBeenCalled();
  });

  it("should create a collection", async () => {
    const result = await useCase.execute({
      name: "Collection 1",
    });

    expect(result).toEqual({
      id: expect.any(String),
      name: "Collection 1",
      icon: undefined,
      description: undefined,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    expect(collectionRepository.create).toHaveBeenCalledWith(result);
  });
});
