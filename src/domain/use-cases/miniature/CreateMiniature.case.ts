import Miniature from "@/domain/entities/Miniature";
import { CreateMiniature } from "@/domain/models/miniature.model";
import CollectionRepository from "@/domain/repositories/collection.repository";
import MiniatureRepository from "@/domain/repositories/miniature.repository";

export default class CreateMiniatureCase {
  constructor(
    private readonly miniatureRepository: MiniatureRepository,
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async execute(data: CreateMiniature): Promise<Miniature> {
    // validation
    if (!data.name.trim()) throw new Error("The miniature name is required.");

    if (!data.brand.trim()) throw new Error("The miniature brand is required.");

    if (!data.scale.trim()) throw new Error("The miniature scale is required.");

    if (!/^\s*1[:/]\d+\s*$/.test(data.scale))
      throw new Error("The miniature scale is invalid.");

    if (!data.collectionId.trim())
      throw new Error("The miniature collection is required.");

    const collection = await this.collectionRepository.findById(
      data.collectionId,
    );

    if (!collection) throw new Error("Collection not found.");

    // create entity
    const miniature: Miniature = {
      id: crypto.randomUUID(),
      ...data,
      favorite: false,
      images: data.images ?? [],
      quantity: data.quantity ?? 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // save
    await this.miniatureRepository.create(miniature);

    // return
    return miniature;
  }
}
