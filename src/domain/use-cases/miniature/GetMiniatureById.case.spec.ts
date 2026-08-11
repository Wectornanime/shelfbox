import { GetMiniatureByIdCase } from ".";

import MiniatureRepository from "@/domain/repositories/miniature.repository";

describe("GetMiniatureByIdCase", () => {
  let miniatureRepository: jest.Mocked<MiniatureRepository>;
  let useCase: GetMiniatureByIdCase;

  beforeEach(() => {
    miniatureRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByCollectionId: jest.fn(),
    };

    useCase = new GetMiniatureByIdCase(miniatureRepository);
  });

  it("should reject when the id is missing", async () => {
    const sut = useCase.execute("");

    await expect(sut).rejects.toThrow("The miniature id is required.");

    expect(miniatureRepository.findById).not.toHaveBeenCalled();
  });

  it("should reject when the id contains only whitespace", async () => {
    const sut = useCase.execute(" ");

    await expect(sut).rejects.toThrow("The miniature id is required.");

    expect(miniatureRepository.findById).not.toHaveBeenCalled();
  });

  it("should return null when does not exist the id", async () => {
    const miniatureId = "invalid-id";

    miniatureRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(miniatureId);

    expect(miniatureRepository.findById).toHaveBeenCalledWith(miniatureId);
    expect(result).toBeNull();
  });

  it("should return the miniature", async () => {
    const miniatureId = "valid-id";

    const miniature = {
      id: miniatureId,
      collectionId: "collection-1",
      name: "Batmobile",
      brand: "Hot Wheels" as const,
      scale: "1:64",
      favorite: false,
      images: [],
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    miniatureRepository.findById.mockResolvedValue(miniature);

    const result = await useCase.execute(miniatureId);

    expect(miniatureRepository.findById).toHaveBeenCalledWith(miniatureId);
    expect(result).toEqual(miniature);
  });
});
