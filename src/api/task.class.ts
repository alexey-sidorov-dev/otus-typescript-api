import { ITask } from "./task.interface";

export class Task implements ITask {
  private id: string;

  private datestamp: Date;

  date: Date;

  description: string;

  status: string;

  tag?: string | undefined;

  constructor(date: Date, description: string, status: string, tag?: string | undefined) {
    this.id = (Math.random() + 1).toString(36).substring(7);
    this.datestamp = new Date();
    this.date = date;
    this.description = description;
    this.status = status || "planned";
    this.tag = tag;
  }
}
