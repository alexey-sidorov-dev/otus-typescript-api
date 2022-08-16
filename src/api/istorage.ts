import { ITaskData, IInputData, TCriteria } from "./itask";

export interface IStorage {
  create: <T extends IInputData>(inputData: T) => void;
  read: (_id?: string) => Array<ITaskData> | ITaskData | undefined;
  update: <T extends IInputData>(taskData: T) => void;
  delete: (_id?: string) => void;
  filter: (criteria: TCriteria) => Array<ITaskData> | undefined;
  find: (criteria: TCriteria) => ITaskData | undefined;
}
