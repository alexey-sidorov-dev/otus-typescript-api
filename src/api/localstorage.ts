import { IStorage } from "../interfaces/storage";
import { ITaskData, FilterCriteria } from "../interfaces/task";

export class LocalStorage implements IStorage {
  readonly dataPath: string;

  readonly localStorage = localStorage;

  constructor(dataPath: string) {
    this.dataPath = dataPath;
  }

  async create(task: ITaskData) {
    const data: ITaskData[] = await this.read();
    data.push(task);

    return localStorage.setItem(this.dataPath, JSON.stringify(data));
  }

  async read() {
    const data: string | null = localStorage.getItem(this.dataPath);
    if (data) {
      return JSON.parse(data);
    }

    return [];
  }

  async update(task: ITaskData) {
    const data: ITaskData[] = await this.read();

    for (let i = 0; i < data.length; i += 1) {
      if (task.id === data[i].id) {
        data[i] = task;
      }
    }

    return localStorage.setItem(this.dataPath, JSON.stringify(data));
  }

  async delete(item: ITaskData) {
    const data: ITaskData[] = await this.read();

    for (let i = 0; i < data.length; i += 1) {
      if (item.id === data[i].id) {
        data.splice(i, 1);
      }
    }

    return localStorage.setItem(this.dataPath, JSON.stringify(data));
  }

  async filter(filterCriteria: FilterCriteria) {
    const data: ITaskData[] = await this.read();
    const filterKey = filterCriteria.k;
    const filterValue = filterCriteria.v;

    if (filterKey === "description") {
      return data.filter((item) => item.description.includes(filterValue as string));
    }

    return data.filter((item) => item[filterKey] === filterValue);
  }
}
