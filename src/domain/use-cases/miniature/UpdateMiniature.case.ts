import Miniature from "@/domain/entities/Miniature";
import { UpdateMiniature } from "@/domain/models/miniature.model";
import CollectionRepository from "@/domain/repositories/collection.repository";
import MiniatureRepository from "@/domain/repositories/miniature.repository";

export default class UpdateMiniatureCase {
  constructor(
    private readonly miniatureRepository: MiniatureRepository,
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async execute({ id, data }: UpdateMiniature): Promise<Miniature> {
    // validation
    if (!id.trim()) throw new Error("The miniature id is required.");

    const miniature = await this.miniatureRepository.findById(id.trim());

    if (!miniature) throw new Error("Miniature not found.");

    if (data.scale !== undefined) {
      if (!data.scale.trim()) {
        throw new Error("The miniature scale is required.");
      }

      if (!/^\s*1[:/]\d+\s*$/.test(data.scale)) {
        throw new Error("The miniature scale is invalid.");
      }
    }

    if (data.collectionId !== undefined) {
      if (!data.collectionId.trim()) {
        throw new Error("The miniature collectionId is required.");
      }

      const collection = await this.collectionRepository.findById(
        data.collectionId,
      );

      if (!collection) throw new Error("Collection not found.");
    }

    // create entity
    const updatedMiniature: Miniature = {
      ...miniature,
      ...data,
      updatedAt: new Date(),
    };

    // save
    await this.miniatureRepository.update(updatedMiniature);

    // return
    return updatedMiniature;
  }
}
