import Collection from "@/domain/entities/Collection";
import CollectionRepository from "@/domain/repositories/collection.repository";

export default class GetCollectionByIdCase {
  constructor(private readonly repository: CollectionRepository) {}

  async execute(id: string): Promise<Collection | null> {
    if (!id.trim()) throw new Error("The collection id is required.");

    return this.repository.findById(id);
  }
}
