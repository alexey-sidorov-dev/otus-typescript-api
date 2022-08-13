import { ITask } from "./task.interface";

export interface IStorage {
  createTask: <T extends ITask>(data: T) => boolean;
  readTask: (id: string | number) => ITask;
  updateTask: <T extends ITask>(task: T) => boolean;
  deleteTask: (id: string | number) => boolean;
  filterTasks: (criteria: Partial<ITask>) => ITask[];
}
