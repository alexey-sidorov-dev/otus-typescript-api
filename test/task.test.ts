import { Task } from "../src/api/task";

describe("Task", () => {
  it("should be instance of class Task", () => {
    expect(
      new Task({
        name: "Name",
        date: new Date(),
        description: "task description",
        status: "cancelled",
        tag: "#private",
      })
    ).toBeInstanceOf(Task);
  });
});
