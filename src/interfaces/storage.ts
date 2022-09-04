import { ITaskData, FilterCriteria } from "./task";

export interface IStorage {
  create: (task: ITaskData) => Promise<void>;
  read: () => Promise<ITaskData[] | []>;
  update: (task: ITaskData) => Promise<void>;
  delete: (task: ITaskData) => Promise<void>;
  clear: (dataIdentifier: string) => Promise<void>;
  filter: (criteria: FilterCriteria) => Promise<ITaskData[] | []>;
}
