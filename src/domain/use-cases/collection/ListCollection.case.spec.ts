import { ListCollectionCase } from "./";

import CollectionRepository from "@/domain/repositories/collection.repository";

describe("ListCollectionCase", () => {
  let collectionRepository: jest.Mocked<CollectionRepository>;
  let useCase: ListCollectionCase;

  beforeEach(() => {
    collectionRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new ListCollectionCase(collectionRepository);
  });

  it("should return an empty list when there are no miniatures", async () => {
    collectionRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(collectionRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it("should return the collection list", async () => {
    const collections = [
      {
        id: "collection-1",
        name: "collection-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "collection-2",
        name: "collection-2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    collectionRepository.findAll.mockResolvedValue(collections);

    const result = await useCase.execute();

    expect(result).toEqual(collections);

    expect(collectionRepository.findAll).toHaveBeenCalled();
  });
});
