import Miniature from "@/domain/entities/Miniature";
import Image from "@/domain/value-objects/Image";

export interface CreateMiniatureDto {
  collectionId: string;
  name: string;
  description?: string;
  brand: string;
  scale: string;
  images: Image[];
  quantity: number;
  favorite: boolean;
  acquiredAt?: Date;
}

export interface UpdateMiniatureDto {
  id: string;
  data: Partial<Omit<Miniature, "id" | "createdAt" | "updatedAt">>;
}
