import Collection from "@/domain/entities/Collection";

export interface CreateCollection {
  name: string;
  icon?: string;
  description?: string;
}

export interface UpdateCollection {
  id: string;
  data: Partial<Omit<Collection, "id" | "createdAt" | "updatedAt">>;
}
