import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import UUID from "pure-uuid";
import { STORAGES, ICalendar } from "../interfaces/calendar";
import { IStorage } from "../interfaces/storage";
import { FilterCriteria, ITaskData } from "../interfaces/task";
import { JsonDatabase } from "./jsondatabase";
import { LocalStorage } from "./localstorage";

export class Calendar implements ICalendar, IStorage {
  readonly type: STORAGES;

  private storage: IStorage;

  readonly dataIdentifier: string;

  constructor(type: STORAGES) {
    this.type = type;
    this.dataIdentifier = new UUID().make(4).toString();
    this.storage =
      type === STORAGES.JsonDatabase
        ? new JsonDatabase(
            new JsonDB(new Config("resources/calendar-db.json", true, false, "/")),
            `/${this.dataIdentifier}`
          )
        : new LocalStorage(this.dataIdentifier);
  }

  async create(task: ITaskData) {
    return this.storage.create(task);
  }

  async read() {
    return this.storage.read();
  }

  async update(task: ITaskData) {
    return this.storage.update(task);
  }

  async delete(task: ITaskData) {
    return this.storage.delete(task);
  }

  async filter(filterCriteria: FilterCriteria) {
    return this.storage.filter(filterCriteria);
  }

  async clear() {
    return this.storage.clear(this.dataIdentifier);
  }
}
