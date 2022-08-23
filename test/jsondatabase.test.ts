import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { JsonDatabase } from "../src/api/jsondatabase";
import { ITaskData } from "../src/interfaces/task";

describe("JsonDatabase", () => {
  const dataPath = "/calendar/tasks";
  const storage = new JsonDatabase(
    new JsonDB(new Config("resources/calendar-db.json", true, false, "/")),
    dataPath
  );

  const taskOne: ITaskData = {
    id: 1,
    name: "planned task",
    date: Date.parse("2022-08-22 23:23:23"),
    status: "planned",
    tag: "personal",
    description: "do the job",
  };
  const taskTwo: ITaskData = {
    id: 1234567,
    name: "new task",
    date: Date.parse("2022-08-22 11:11:11"),
    status: "new",
    tag: "home",
    description: "relax",
  };
  const taskThree: ITaskData = {
    id: 999999999999,
    name: "cancelled task",
    date: Date.parse("2022-08-22"),
    status: "cancelled",
    tag: "public",
    description: "do some stuff",
  };

  const taskTest: ITaskData = {
    id: 1234567,
    name: "updated task",
    date: Date.parse("2022-08-23"),
    status: "updated",
    tag: "test",
    description: "do my homework",
  };

  beforeAll(async () => {
    await storage.create(taskOne);
    await storage.create(taskTwo);
    await storage.create(taskThree);
  });

  afterAll(async () => {
    await storage.db.delete("/");
  });

  it("should read data from json-database", async () => {
    expect(await storage.read()).toStrictEqual([taskOne, taskTwo, taskThree]);
  });

  it("should update data in json-database", async () => {
    await storage.update(taskTest);

    expect(await storage.read()).toStrictEqual([taskOne, taskTest, taskThree]);
  });

  it("should remove data from json-database", async () => {
    await storage.delete(taskTest);

    expect(await storage.read()).toStrictEqual([taskOne, taskThree]);
  });

  it("should filter data by tag from json-database", async () => {
    expect(await storage.filter({ k: "tag", v: "personal" })).toStrictEqual([taskOne]);
  });

  it("should filter data by status from json-database", async () => {
    expect(await storage.filter({ k: "status", v: "cancelled" })).toStrictEqual([taskThree]);
  });

  it("should filter data by description from json-database", async () => {
    expect(await storage.filter({ k: "description", v: "do" })).toStrictEqual([taskOne, taskThree]);
  });

  it("should filter data by date from json-database", async () => {
    expect(await storage.filter({ k: "date", v: Date.parse("2022-08-22 23:23:23") })).toStrictEqual(
      [taskOne]
    );
  });
});
