import Image from "@/domain/value-objects/image";

export default interface Miniature {
  id: string; // uuid
  collectionId: string;
  name: string;
  description?: string;
  brand: string;
  scale: string;
  images: Image[];
  quantity: number;
  favorite: boolean;
  acquiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
