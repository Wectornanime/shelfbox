import Collection from "@/domain/entities/Collection";
import { UpdateCollection } from "@/domain/models/collection.model";
import CollectionRepository from "@/domain/repositories/collection.repository";

export default class UpdateCollectionCase {
  constructor(private readonly repository: CollectionRepository) {}

  async execute({ id, data }: UpdateCollection): Promise<Collection> {
    // validation
    if (!id.trim()) throw new Error("The collection id is required.");

    const collection = await this.repository.findById(id.trim());

    if (!collection) throw new Error("Collection not found.");

    if (data.name !== undefined) {
      const name = data.name.trim();

      if (!name) {
        throw new Error("The collection name is required.");
      }
    }

    // create entity
    const updatedCollection: Collection = {
      ...collection,
      ...data,
      updatedAt: new Date(),
    };

    // save
    await this.repository.update(updatedCollection);

    // return
    return updatedCollection;
  }
}
