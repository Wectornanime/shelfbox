import ImageStorageRepository from "@/domain/repositories/imageStorage.repository";
import { dexieDatabase } from "@/infrastructure/database";

export default class DexieImageStorageRepository
  implements ImageStorageRepository
{
  async save(file: Blob, path: string): Promise<void> {
    await dexieDatabase.images.put({
      path,
      blob: file,
    });
  }

  async get(path: string): Promise<Blob | null> {
    const image = await dexieDatabase.images.get(path);

    return image?.blob ?? null;
  }

  async delete(path: string): Promise<void> {
    await dexieDatabase.images.delete(path);
  }
}
