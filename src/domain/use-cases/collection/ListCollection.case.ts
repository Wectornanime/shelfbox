import Collection from "@/domain/entities/Collection";
import CollectionRepository from "@/domain/repositories/collection.repository";

export default class ListCollectionCase {
  constructor(private readonly repository: CollectionRepository) {}

  async execute(): Promise<Collection[]> {
    return this.repository.findAll();
  }
}
