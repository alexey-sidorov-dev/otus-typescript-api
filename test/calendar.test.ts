import { Calendar } from "../src/api/calendar";
import { STORAGES } from "../src/interfaces/calendar";
import { ITaskData } from "../src/interfaces/task";

describe("Calendar", () => {
  const calendar1 = new Calendar(STORAGES.JsonDatabase);
  const calendar2 = new Calendar(STORAGES.JsonDatabase);
  const calendar3 = new Calendar(STORAGES.localStorage);
  const calendar4 = new Calendar(STORAGES.localStorage);
  const taskOne: ITaskData = {
    id: 1234567,
    name: "planned task",
    date: Date.parse("2022-08-22 23:23:23"),
    status: "planned",
    tag: "personal",
    description: "do the job",
  };
  const taskTwo: ITaskData = {
    id: 7654321,
    name: "new task",
    date: Date.parse("2022-08-22 11:11:11"),
    status: "new",
    tag: "home",
    description: "relax",
  };
  const taskThree: ITaskData = {
    id: 1,
    name: "cancelled task",
    date: Date.parse("2022-08-22"),
    status: "cancelled",
    tag: "public",
    description: "do some stuff",
  };

  const taskFour: ITaskData = {
    id: 999999999,
    name: "suspended task",
    date: Date.parse("2022-09-03"),
    status: "suspended",
    tag: "private",
    description: "live that life",
  };

  const taskTestOne: ITaskData = {
    id: 1234567,
    name: "updated task",
    date: Date.parse("2022-08-23"),
    status: "renewed",
    tag: "test",
    description: "do my homework",
  };

  const taskTestTwo: ITaskData = {
    id: 7654321,
    name: "updated task",
    date: Date.parse("2022-09-04"),
    status: "updated",
    tag: "spec",
    description: "do my homework",
  };

  beforeAll(async () => {
    await calendar1.create(taskOne);
    await calendar1.create(taskThree);
    await calendar2.create(taskTwo);
    await calendar2.create(taskFour);
    await calendar3.create(taskOne);
    await calendar3.create(taskThree);
    await calendar4.create(taskTwo);
    await calendar4.create(taskFour);
  });

  afterAll(async () => {
    await calendar1.clear();
    await calendar2.clear();
    await calendar3.clear();
    await calendar4.clear();
  });

  it("should read data from calendars", async () => {
    expect(await calendar1.read()).toStrictEqual([taskOne, taskThree]);
    expect(await calendar2.read()).toStrictEqual([taskTwo, taskFour]);
    expect(await calendar3.read()).toStrictEqual([taskOne, taskThree]);
    expect(await calendar4.read()).toStrictEqual([taskTwo, taskFour]);
  });

  it("should update data in calendars", async () => {
    await calendar1.update(taskTestOne);
    expect(await calendar1.read()).toStrictEqual([taskTestOne, taskThree]);

    await calendar2.update(taskTestTwo);
    expect(await calendar2.read()).toStrictEqual([taskTestTwo, taskFour]);

    await calendar3.update(taskTestOne);
    expect(await calendar3.read()).toStrictEqual([taskTestOne, taskThree]);

    await calendar4.update(taskTestTwo);
    expect(await calendar4.read()).toStrictEqual([taskTestTwo, taskFour]);
  });

  it("should remove data from calendars", async () => {
    await calendar1.delete(taskTestOne);
    await calendar2.delete(taskTestTwo);
    await calendar3.delete(taskThree);
    await calendar4.delete(taskFour);
    expect(await calendar1.read()).toStrictEqual([taskThree]);
    expect(await calendar2.read()).toStrictEqual([taskFour]);
    expect(await calendar3.read()).toStrictEqual([taskTestOne]);
    expect(await calendar4.read()).toStrictEqual([taskTestTwo]);
  });

  it("should filter data by tag from calendars", async () => {
    expect(await calendar1.filter({ k: "tag", v: "public" })).toStrictEqual([taskThree]);
    expect(await calendar2.filter({ k: "tag", v: "public" })).toStrictEqual([]);
    expect(await calendar3.filter({ k: "tag", v: "test" })).toStrictEqual([taskTestOne]);
    expect(await calendar4.filter({ k: "tag", v: "test" })).toStrictEqual([]);
  });

  it("should filter data by status from calendars", async () => {
    expect(await calendar1.filter({ k: "status", v: "suspended" })).toStrictEqual([]);
    expect(await calendar2.filter({ k: "status", v: "suspended" })).toStrictEqual([taskFour]);
    expect(await calendar3.filter({ k: "status", v: "updated" })).toStrictEqual([]);
    expect(await calendar4.filter({ k: "status", v: "updated" })).toStrictEqual([taskTestTwo]);
  });

  it("should filter data by description from calendars", async () => {
    expect(await calendar1.filter({ k: "description", v: "do" })).toStrictEqual([taskThree]);
    expect(await calendar2.filter({ k: "description", v: "life" })).toStrictEqual([taskFour]);
    expect(await calendar3.filter({ k: "description", v: "homework" })).toStrictEqual([
      taskTestOne,
    ]);
    expect(await calendar4.filter({ k: "description", v: "my" })).toStrictEqual([taskTestTwo]);
  });

  it("should filter data by date from calendars", async () => {
    expect(await calendar1.filter({ k: "date", v: Date.parse("2022-08-22") })).toStrictEqual([
      taskThree,
    ]);
    expect(await calendar2.filter({ k: "date", v: Date.parse("2022-09-03") })).toStrictEqual([
      taskFour,
    ]);
    expect(await calendar3.filter({ k: "date", v: Date.parse("2022-08-23") })).toStrictEqual([
      taskTestOne,
    ]);
    expect(await calendar4.filter({ k: "date", v: Date.parse("2022-09-04") })).toStrictEqual([
      taskTestTwo,
    ]);
  });

  it("should clear data from calendar", async () => {
    await calendar1.clear();
    await calendar3.clear();

    expect(await calendar1.read()).toStrictEqual([]);
    expect(await calendar3.read()).toStrictEqual([]);
  });
});
