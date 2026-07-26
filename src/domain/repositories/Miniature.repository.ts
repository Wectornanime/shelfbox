import Miniature from "@/domain/entities/Miniature";
import {
  CreateMiniatureDto,
  UpdateMiniatureDto,
} from "@/domain/dtos/miniature.dto";

export default interface MiniatureRepository {
  create(miniature: CreateMiniatureDto): Promise<void>;
  findAll(): Promise<Miniature[]>;
  findById(id: string): Promise<Miniature | null>;
  update(miniature: UpdateMiniatureDto): Promise<void>;
  delete(id: string): Promise<void>;

  findByCollectionId(collectionId: string): Promise<Miniature[]>;
}
