import { ListMiniatureCase } from "./";

import MiniatureRepository from "@/domain/repositories/miniature.repository";

describe("ListMiniatureCase", () => {
  let miniatureRepository: jest.Mocked<MiniatureRepository>;
  let useCase: ListMiniatureCase;

  beforeEach(() => {
    miniatureRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByCollectionId: jest.fn(),
    };

    useCase = new ListMiniatureCase(miniatureRepository);
  });

  it("should return an empty list when there are no miniatures", async () => {
    miniatureRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(miniatureRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Array));
  });

  it("should return the miniature list", async () => {
    const miniatures = [
      {
        id: "miniature-1",
        collectionId: "collection-1",
        name: "Batmobile",
        brand: "Hot Wheels" as const,
        scale: "1:64",
        favorite: false,
        images: [],
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "miniature-2",
        collectionId: "collection-1",
        name: "Porsche 911",
        brand: "Maisto" as const,
        scale: "1:18",
        favorite: true,
        images: [],
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    miniatureRepository.findAll.mockResolvedValue(miniatures);

    const result = await useCase.execute();

    expect(result).toEqual(miniatures);

    expect(miniatureRepository.findAll).toHaveBeenCalled();
  });
});
