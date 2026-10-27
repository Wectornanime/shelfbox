import Miniature from "@/domain/entities/Miniature";

export default interface MiniatureRepository {
  create(miniature: Miniature): Promise<void>;
  findAll(): Promise<Miniature[]>;
  findById(id: string): Promise<Miniature | null>;
  update(miniature: Miniature): Promise<void>;
  delete(id: string): Promise<void>;

  findByCollectionId(collectionId: string): Promise<Miniature[]>;
}
