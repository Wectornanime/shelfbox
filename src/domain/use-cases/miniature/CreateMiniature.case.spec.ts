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

  it("should reject a miniature without a name", async () => {
    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: "",
      brand: "Hot Wheels",
      scale: "1:64",
    });

    await expect(miniature).rejects.toThrow("The miniature name is required.");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature when the name is an empty string", async () => {
    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: " ",
      brand: "Hot Wheels",
      scale: "1:64",
    });

    await expect(miniature).rejects.toThrow("The miniature name is required.");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature without a brand", async () => {
    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: "Hot Wheels",
      brand: "",
      scale: "1:64",
    });

    await expect(miniature).rejects.toThrow("The miniature brand is required.");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature when the brand is an empty string", async () => {
    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: "Hot Wheels",
      brand: " ",
      scale: "1:64",
    });

    await expect(miniature).rejects.toThrow("The miniature brand is required.");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature without a scale", async () => {
    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: "Hot Wheels",
      brand: "Hot Wheels",
      scale: "",
    });

    await expect(miniature).rejects.toThrow("The miniature scale is required.");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature when the scale is an empty string", async () => {
    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: "Hot Wheels",
      brand: "Hot Wheels",
      scale: " ",
    });

    await expect(miniature).rejects.toThrow("The miniature scale is required.");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature when the scale is not valid", async () => {
    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: "Hot Wheels",
      brand: "Hot Wheels",
      scale: "00",
    });

    await expect(miniature).rejects.toThrow("The miniature scale is invalid.");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature without a collectionId", async () => {
    const miniature = useCase.execute({
      collectionId: "",
      name: "Hot Wheels",
      brand: "Hot Wheels",
      scale: "1/64",
    });

    await expect(miniature).rejects.toThrow(
      "The miniature collection is required.",
    );

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature when the collectionId is an empty string", async () => {
    const miniature = useCase.execute({
      collectionId: " ",
      name: "Hot Wheels",
      brand: "Hot Wheels",
      scale: "1/64",
    });

    await expect(miniature).rejects.toThrow(
      "The miniature collection is required.",
    );

    expect(miniatureRepository.create).not.toHaveBeenCalled();
  });

  it("should reject a miniature when the collection does not exist", async () => {
    collectionRepository.findById.mockResolvedValue(null);

    const miniature = useCase.execute({
      collectionId: "collection-1",
      name: "Batmobile",
      brand: "Hot Wheels",
      scale: "1:64",
    });

    await expect(miniature).rejects.toThrow("Collection not found.");

    expect(collectionRepository.findById).toHaveBeenCalledWith("collection-1");

    expect(miniatureRepository.create).not.toHaveBeenCalled();
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
