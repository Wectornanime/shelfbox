import DexieImageService from "@/domain/services/dexie/dexieImage.service";
import DexieImageStorageRepository from "@/infrastructure/repositories/dexie/DexieImageStorage.repository";

const imageStorageRepository = new DexieImageStorageRepository();

const imageService = new DexieImageService(imageStorageRepository);

export { imageService };
