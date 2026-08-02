import Miniature from "@/domain/entities/Miniature";
import CollectionRepository from "@/domain/repositories/collection.repository";
import MiniatureRepository from "@/domain/repositories/miniature.repository";

export default class ListMiniaturesByCollectionCase {
  constructor(
    private readonly miniatureRepository: MiniatureRepository,
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async execute(collectionId: string): Promise<Miniature[]> {
    if (!collectionId.trim()) {
      throw new Error("The miniature collectionId is required.");
    }

    const collection = await this.collectionRepository.findById(collectionId);

    if (!collection) throw new Error("Collection not found.");

    return this.miniatureRepository.findByCollectionId(collectionId);
  }
}
