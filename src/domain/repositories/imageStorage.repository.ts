export default interface ImageStorageRepository {
  save(file: Blob, path: string): Promise<void>;
  get(path: string): Promise<Blob | null>;
  delete(path: string): Promise<void>;
}
