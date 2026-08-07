import {
  CreateCollectionCase,
  DeleteCollectionCase,
  GetCollectionByIdCase,
  ListCollectionCase,
  UpdateCollectionCase,
} from "@/domain/use-cases/collection";
import { DexieCollectionRepository } from "@/infrastructure/repositories/dexie";

const repository = new DexieCollectionRepository();

export const createCollectionCase = new CreateCollectionCase(repository);

export const getCollectionByIdCase = new GetCollectionByIdCase(repository);

export const listCollectionCase = new ListCollectionCase(repository);

export const updateCollectionCase = new UpdateCollectionCase(repository);

export const deleteCollectionCase = new DeleteCollectionCase(repository);
