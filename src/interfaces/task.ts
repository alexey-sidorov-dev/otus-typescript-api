import { Unionize } from "../types/utils";

export interface IFilterData {
  date: number;
  description: string;
  status: string;
  tag: string;
}

export interface ITaskData extends IFilterData {
  readonly id: number;
  name: string;
}

export type FilterCriteria = Unionize<IFilterData>;
