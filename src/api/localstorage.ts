import { IStorage } from "../interfaces/storage";
import { ITaskData, FilterCriteria } from "../interfaces/task";

export class LocalStorage implements IStorage {
  readonly dataIdentifier: string;

  readonly localStorage = localStorage;

  constructor(dataPath: string) {
    this.dataIdentifier = dataPath;
  }

  async create(task: ITaskData) {
    const data: ITaskData[] = await this.read();
    data.push(task);

    return localStorage.setItem(this.dataIdentifier, JSON.stringify(data));
  }

  async read() {
    const data = localStorage.getItem(this.dataIdentifier);

    return data ? JSON.parse(data) : [];
  }

  async update(task: ITaskData) {
    const data: ITaskData[] = await this.read();
    const newData = data.map((item) => (task.id === item.id ? task : item));

    return localStorage.setItem(this.dataIdentifier, JSON.stringify(newData));
  }

  async delete(item: ITaskData) {
    const data: ITaskData[] = await this.read();

    for (let i = 0; i < data.length; i += 1) {
      if (item.id === data[i].id) {
        data.splice(i, 1);
      }
    }

    return localStorage.setItem(this.dataIdentifier, JSON.stringify(data));
  }

  async clear(dataIdentifier: string) {
    return this.localStorage.removeItem(dataIdentifier);
  }

  async filter({ k, v }: FilterCriteria) {
    const data: ITaskData[] = await this.read();

    return k === "description"
      ? data.filter((item) => item.description.includes(v))
      : data.filter((item) => item[k] === v);
  }
}
