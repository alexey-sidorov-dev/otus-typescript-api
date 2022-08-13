export interface ITask {
  date: Date;
  description: string;
  status: string | number;
  tag?: string | undefined;
}
