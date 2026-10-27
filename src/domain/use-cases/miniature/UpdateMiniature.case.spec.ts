import { UpdateMiniatureCase } from "./";

import MiniatureRepository from "@/domain/repositories/miniature.repository";
import CollectionRepository from "@/domain/repositories/collection.repository";
import Miniature from "@/domain/entities/Miniature";
import Collection from "@/domain/entities/Collection";

describe("UpdateMiniatureCase", () => {
  let miniatureRepository: jest.Mocked<MiniatureRepository>;
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: UpdateMiniatureCase;
  let validMiniature: Miniature;
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

    useCase = new UpdateMiniatureCase(
      miniatureRepository,
      collectionRepository,
    );

    validMiniature = {
      id: "miniature-1",
      collectionId: "collection-1",
      name: "Batmobile",
      brand: "Hot Wheels",
      scale: "1:64",
      favorite: false,
      images: [],
      quantity: 1,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    };

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

    await expect(sut).rejects.toThrow("The miniature id is required.");

    expect(miniatureRepository.findById).not.toHaveBeenCalled();
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the id contains only whitespace", async () => {
    const sut = useCase.execute({
      id: " ",
      data: {},
    });

    await expect(sut).rejects.toThrow("The miniature id is required.");

    expect(miniatureRepository.findById).not.toHaveBeenCalled();
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when does not exist the id", async () => {
    miniatureRepository.findById.mockResolvedValue(null);

    const sut = useCase.execute({
      id: "invalid-id",
      data: {},
    });

    await expect(sut).rejects.toThrow("Miniature not found.");

    expect(miniatureRepository.findById).toHaveBeenCalledWith("invalid-id");
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the scale is declared empty", async () => {
    miniatureRepository.findById.mockResolvedValue(validMiniature);

    const sut = useCase.execute({
      id: "valid-id",
      data: { scale: "" },
    });

    await expect(sut).rejects.toThrow("The miniature scale is required.");

    expect(miniatureRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the scale is declared with only whitespace", async () => {
    miniatureRepository.findById.mockResolvedValue(validMiniature);

    const sut = useCase.execute({
      id: "valid-id",
      data: { scale: " " },
    });

    await expect(sut).rejects.toThrow("The miniature scale is required.");

    expect(miniatureRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the scale is declared with an invalid value", async () => {
    miniatureRepository.findById.mockResolvedValue(validMiniature);

    const sut = useCase.execute({
      id: "valid-id",
      data: { scale: "invalid-value" },
    });

    await expect(sut).rejects.toThrow("The miniature scale is invalid.");

    expect(miniatureRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the collectionId is declared empty", async () => {
    miniatureRepository.findById.mockResolvedValue(validMiniature);

    const sut = useCase.execute({
      id: "valid-id",
      data: { collectionId: "" },
    });

    await expect(sut).rejects.toThrow(
      "The miniature collectionId is required.",
    );

    expect(miniatureRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the collectionId is declared with only whitespace", async () => {
    miniatureRepository.findById.mockResolvedValue(validMiniature);

    const sut = useCase.execute({
      id: "valid-id",
      data: { collectionId: " " },
    });

    await expect(sut).rejects.toThrow(
      "The miniature collectionId is required.",
    );

    expect(miniatureRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.findById).not.toHaveBeenCalled();
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should reject when the collectionId is declared with an invalid value", async () => {
    miniatureRepository.findById.mockResolvedValue(validMiniature);
    collectionRepository.findById.mockResolvedValue(null);

    const sut = useCase.execute({
      id: "valid-id",
      data: { collectionId: "invalid-value" },
    });

    await expect(sut).rejects.toThrow("Collection not found.");

    expect(miniatureRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.findById).toHaveBeenCalledWith("invalid-value");
    expect(miniatureRepository.update).not.toHaveBeenCalled();
  });

  it("should update a miniature without changing its data", async () => {
    miniatureRepository.findById.mockResolvedValue(validMiniature);

    const sut = await useCase.execute({
      id: "valid-id",
      data: {},
    });

    expect(sut).toEqual({
      ...validMiniature,
      updatedAt: expect.any(Date),
    });

    expect(miniatureRepository.update).toHaveBeenCalledWith(sut);
  });

  it("should update a miniature", async () => {
    const newData = {
      scale: "1/64",
      collectionId: "valid-value",
    };

    miniatureRepository.findById.mockResolvedValue(validMiniature);
    collectionRepository.findById.mockResolvedValue(validCollection);

    const sut = await useCase.execute({
      id: "valid-id",
      data: newData,
    });

    expect(sut).toEqual({ ...validMiniature, ...newData });

    expect(miniatureRepository.findById).toHaveBeenCalledWith("valid-id");
    expect(collectionRepository.findById).toHaveBeenCalledWith("valid-value");
    expect(miniatureRepository.update).toHaveBeenCalledWith(sut);
  });
});
