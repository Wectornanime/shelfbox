import Miniature from "@/domain/entities/Miniature";
import {
  CreateMiniature,
  UpdateMiniature,
} from "@/domain/models/miniature.model";

export default interface MiniatureRepository {
  create(miniature: CreateMiniature): Promise<void>;
  findAll(): Promise<Miniature[]>;
  findById(id: string): Promise<Miniature | null>;
  update(miniature: UpdateMiniature): Promise<void>;
  delete(id: string): Promise<void>;

  findByCollectionId(collectionId: string): Promise<Miniature[]>;
}
