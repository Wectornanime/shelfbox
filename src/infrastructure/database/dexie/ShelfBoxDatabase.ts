import Dexie, { Table } from "dexie";

import { DATABASE_NAME, DATABASE_SCHEMA, DATABASE_VERSION } from "./schema";

import Collection from "@/domain/entities/Collection";
import Miniature from "@/domain/entities/Miniature";

export default class ShelfBoxDatabase extends Dexie {
  collections!: Table<Collection, string>;
  miniatures!: Table<Miniature, string>;

  constructor() {
    super(DATABASE_NAME);

    this.version(DATABASE_VERSION).stores(DATABASE_SCHEMA);
  }
}
