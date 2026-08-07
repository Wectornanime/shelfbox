import Collection from "@/domain/entities/Collection";
import CollectionRepository from "@/domain/repositories/collection.repository";
import { dexieDatabase } from "@/infrastructure/database";

export default class DexieCollectionRepository implements CollectionRepository {
  async create(collection: Collection): Promise<void> {
    await dexieDatabase.collections.add(collection);
  }

  async findAll(): Promise<Collection[]> {
    return dexieDatabase.collections.toArray();
  }

  async findById(id: string): Promise<Collection | null> {
    const collection = await dexieDatabase.collections.get(id);

    return collection ?? null;
  }

  async update(collection: Collection): Promise<void> {
    await dexieDatabase.collections.put(collection);
  }

  async delete(id: string): Promise<void> {
    await dexieDatabase.collections.delete(id);
  }
}
