import ImageStorageRepository from "@/domain/repositories/imageStorage.repository";

export default class DexieImageService {
  constructor(
    private readonly imageStorageRepository: ImageStorageRepository,
  ) {}

  async save(file: Blob): Promise<string> {
    const id = crypto.randomUUID();

    const extension = file.type.split("/")[1] || "bin";
    const path = `images/${id}.${extension}`;

    await this.imageStorageRepository.save(file, path);

    return path;
  }

  async get(path: string): Promise<string | null> {
    const blob = await this.imageStorageRepository.get(path);

    if (!blob) {
      return null;
    }

    return URL.createObjectURL(blob);
  }

  async delete(path: string): Promise<void> {
    await this.imageStorageRepository.delete(path);
  }
}
