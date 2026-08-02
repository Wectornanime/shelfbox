import Collection from "@/domain/entities/Collection";
import { CreateCollection } from "@/domain/models/collection.model";
import CollectionRepository from "@/domain/repositories/collection.repository";
import MiniatureRepository from "@/domain/repositories/miniature.repository";

export default class CreateCollectionCase {
  constructor(
    private readonly miniatureRepository: MiniatureRepository,
    private readonly repository: CollectionRepository,
  ) {}

  async execute(data: CreateCollection): Promise<Collection> {
    // validation
    if (!data.name.trim()) throw new Error("The collection name is required.");

    // create entity
    const collection: Collection = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // save
    await this.repository.create(collection);

    // return
    return collection;
  }
}
