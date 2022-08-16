import { Unionize } from "../utils/types";

export interface ISearchData {
  date: Date;
  description: string;
  status: string;
  tag: string;
}

export interface IInputData extends ISearchData {
  name: string;
}

export interface ITaskData extends IInputData {
  readonly id: string | number;
}

export type TCriteria = Unionize<ISearchData>;
