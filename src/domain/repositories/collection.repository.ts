import Collection from "@/domain/entities/Collection";
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from "@/domain/dtos/collection.dto";

export default interface CollectionRepository {
  create(collection: CreateCollectionDto): Promise<void>;
  findAll(): Promise<Collection[]>;
  findById(id: string): Promise<Collection | null>;
  update(miniature: UpdateCollectionDto): Promise<void>;
  delete(id: string): Promise<void>;
}
