import Collection from "@/domain/entities/Collection";

export default interface CollectionRepository {
  create(collection: Collection): Promise<void>;
  findAll(): Promise<Collection[]>;
  findById(id: string): Promise<Collection | null>;
  update(collection: Collection): Promise<void>;
  delete(id: string): Promise<void>;
}
