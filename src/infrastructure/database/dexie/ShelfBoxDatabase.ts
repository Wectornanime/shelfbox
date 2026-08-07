import Dexie from "dexie";

import { DATABASE_NAME, DATABASE_SCHEMA, DATABASE_VERSION } from "./schema";

export default class ShelfBoxDatabase extends Dexie {
  constructor() {
    super(DATABASE_NAME);

    this.version(DATABASE_VERSION).stores(DATABASE_SCHEMA);
  }
}
