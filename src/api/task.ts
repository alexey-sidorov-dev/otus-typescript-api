import { ITaskData, IInputData } from "./itask";
// import { v4 } from "uuid";

export class Task implements ITaskData {
  readonly id: string;

  name: string;

  date: Date;

  description: string;

  status: string;

  tag: string;

  constructor(inputData: IInputData) {
    this.id = (Math.random() + 1).toString(36).substring(7);
    // this.id = v4();
    this.name = inputData.name;
    this.date = inputData.date;
    this.description = inputData.description;
    this.status = inputData.status || "planned";
    this.tag = inputData.tag;
  }
}
