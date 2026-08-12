import DeleteMiniatureCase from "./DeleteMiniature.case";

import MiniatureRepository from "@/domain/repositories/miniature.repository";

describe("DeleteMiniatureCase", () => {
  let miniatureRepository: jest.Mocked<MiniatureRepository>;
  let useCase: DeleteMiniatureCase;

  beforeEach(() => {
    miniatureRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByCollectionId: jest.fn(),
    };

    useCase = new DeleteMiniatureCase(miniatureRepository);
  });

  it("should reject when the id is missing", async () => {
    const sut = useCase.execute("");

    await expect(sut).rejects.toThrow("The miniature id is required.");

    expect(miniatureRepository.delete).not.toHaveBeenCalled();
  });

  it("should reject when the id contains only whitespace", async () => {
    const sut = useCase.execute(" ");

    await expect(sut).rejects.toThrow("The miniature id is required.");

    expect(miniatureRepository.delete).not.toHaveBeenCalled();
  });

  it("should reject when does not exist the id", async () => {
    miniatureRepository.findById.mockResolvedValue(null);

    const sut = useCase.execute("invalid-id");

    await expect(sut).rejects.toThrow("Miniature not found.");

    expect(miniatureRepository.delete).not.toHaveBeenCalled();
  });

  it("should delete a miniature", async () => {
    const miniatureId = "valid-id";

    miniatureRepository.findById.mockResolvedValue({
      id: miniatureId,
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

    await useCase.execute(miniatureId);

    expect(miniatureRepository.delete).toHaveBeenCalledWith(miniatureId);
  });
});
