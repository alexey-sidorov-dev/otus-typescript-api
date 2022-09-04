export enum STORAGES {
  JsonDatabase = "JsonDatabase",
  localStorage = "LocalStorage",
}

export interface ICalendar {
  type: STORAGES;
}
