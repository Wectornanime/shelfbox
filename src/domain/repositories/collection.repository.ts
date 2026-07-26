import Collection from "@/domain/entities/Collection";
import {
  CreateCollection,
  UpdateCollection,
} from "@/domain/models/collection.model";

export default interface CollectionRepository {
  create(collection: CreateCollection): Promise<void>;
  findAll(): Promise<Collection[]>;
  findById(id: string): Promise<Collection | null>;
  update(collection: UpdateCollection): Promise<void>;
  delete(id: string): Promise<void>;
}
