import { Task } from "../src/api/task.class";

describe("Task", () => {
  it("should be instance of class Task", () => {
    expect(new Task(new Date(), "task description", "cancelled", "#private")).toBeInstanceOf(Task);
  });
});
