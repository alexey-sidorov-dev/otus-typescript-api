import { JsonDB } from "node-json-db";
import { IStorage } from "./istorage";
import { IInputData, ITaskData, TCriteria } from "./itask";

export class JsonDatabase implements IStorage {
  readonly db: JsonDB;

  readonly dataPath: string;

  readonly saveOnPush: boolean;

  constructor(db: JsonDB, dataPath: string, saveOnPush: boolean) {
    this.db = db;
    this.dataPath = dataPath;
    this.saveOnPush = saveOnPush;
  }

  create: <T extends IInputData>(inputData: T) => void = () => {
    console.log(this.dataPath);
  };

  read: (id?: string | undefined) => ITaskData | ITaskData[] | undefined = () => {
    console.log(this.dataPath);
    return undefined;
  };

  update: <T extends IInputData>(taskData: T) => void = () => {
    console.log(this.dataPath);
  };

  delete: (id?: string | undefined) => void = () => {
    console.log(this.dataPath);
  };

  filter: (criteria: TCriteria) => ITaskData[] | undefined = () => {
    console.log(this.dataPath);
    return undefined;
  };

  find: (criteria: TCriteria) => ITaskData | undefined = () => {
    console.log(this.dataPath);
    return undefined;
  };
}
