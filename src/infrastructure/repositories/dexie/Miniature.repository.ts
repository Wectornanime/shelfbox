import Miniature from "@/domain/entities/Miniature";
import MiniatureRepository from "@/domain/repositories/Miniature.repository";
import { dexieDatabase } from "@/infrastructure/database";

export default class DexieMiniatureRepository implements MiniatureRepository {
  async create(miniature: Miniature): Promise<void> {
    await dexieDatabase.miniatures.add(miniature);
  }

  async findAll(): Promise<Miniature[]> {
    return dexieDatabase.miniatures.toArray();
  }

  async findById(id: string): Promise<Miniature | null> {
    const miniature = await dexieDatabase.miniatures.get(id);

    return miniature ?? null;
  }

  async update(miniature: Miniature): Promise<void> {
    await dexieDatabase.miniatures.put(miniature);
  }

  async delete(id: string): Promise<void> {
    await dexieDatabase.miniatures.delete(id);
  }

  async findByCollectionId(collectionId: string): Promise<Miniature[]> {
    return dexieDatabase.miniatures
      .where("collectionId")
      .equals(collectionId)
      .toArray();
  }
}
