import { JsonDB } from "node-json-db";
import { IStorage } from "../interfaces/storage";
import { ITaskData, FilterCriteria } from "../interfaces/task";

export class JsonDatabase implements IStorage {
  readonly db: JsonDB;

  readonly dataPath: string;

  constructor(db: JsonDB, dataPath: string) {
    this.db = db;
    this.dataPath = dataPath;
  }

  async create(task: ITaskData) {
    return this.db.push(`${this.dataPath}[]`, task);
  }

  async read() {
    try {
      const data: ITaskData[] = await this.db.getData(this.dataPath);
      return data;
    } catch (e) {
      return [];
    }
  }

  async update(task: ITaskData) {
    const data = await this.read();
    for (let i = 0; i < data.length; i += 1) {
      if (task.id === data[i].id) {
        data[i] = task;
      }
    }

    return this.db.push(this.dataPath, data);
  }

  async delete(task: ITaskData) {
    const data = await this.read();

    for (let i = 0; i < data.length; i += 1) {
      if (task.id === data[i].id) {
        data.splice(i, 1);
      }
    }

    return this.db.push(this.dataPath, data);
  }

  async filter(filterCriteria: FilterCriteria) {
    const data = await this.read();
    const filterKey = filterCriteria.k;
    const filterValue = filterCriteria.v;

    if (filterKey === "description") {
      return data.filter((item) => item.description.includes(filterValue as string));
    }

    return data.filter((item) => item[filterKey] === filterValue);
  }
}
