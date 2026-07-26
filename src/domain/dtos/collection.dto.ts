import Collection from "@/domain/entities/Collection";

export interface CreateCollectionDto {
  name: string;
  icon?: string;
  description?: string;
}

export interface UpdateCollectionDto {
  id: string;
  data: Partial<Omit<Collection, "id" | "createdAt" | "updatedAt">>;
}
