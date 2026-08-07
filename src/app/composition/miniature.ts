import {
  CreateMiniatureCase,
  DeleteMiniatureCase,
  GetMiniatureByIdCase,
  ListMiniatureCase,
  ListMiniaturesByCollectionCase,
  UpdateMiniatureCase,
} from "@/domain/use-cases/miniature";
import {
  DexieCollectionRepository,
  DexieMiniatureRepository,
} from "@/infrastructure/repositories/dexie";

const miniatureRepository = new DexieMiniatureRepository();
const collectionRepository = new DexieCollectionRepository();

export const createCollectionCase = new CreateMiniatureCase(
  miniatureRepository,
  collectionRepository,
);

export const getMiniatureByIdCase = new GetMiniatureByIdCase(
  miniatureRepository,
);

export const listMiniatureCase = new ListMiniatureCase(miniatureRepository);

export const updateMiniatureCase = new UpdateMiniatureCase(
  miniatureRepository,
  collectionRepository,
);

export const deleteMiniatureCase = new DeleteMiniatureCase(miniatureRepository);

export const listMiniaturesByCollectionCase =
  new ListMiniaturesByCollectionCase(miniatureRepository, collectionRepository);
