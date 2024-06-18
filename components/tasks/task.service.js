const Task = require("./task.model");

async function getTasksByUser(userId) {
  try {
    const tasks = await Task.find({ user: userId }).exec();
    return tasks;
  } catch (err) {
    throw new Error(
      `Error retrieving tasks for user ${userId}: ${err.message}`
    );
  }
}

async function getTaskById(taskId) {
  try {
    const task = await Task.findById(taskId).exec();
    return task;
  } catch (err) {
    throw new Error(`Task ${taskId} doesn't exist !`);
  }
}

async function createTask(taskData) {
  try {
    const task = new Task(taskData);
    await task.save();
    return task;
  } catch (err) {
    throw new Error(`Error creating task: ${err.message}`);
  }
}

async function updateTask(taskId, updateData) {
  try {
    const task = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (err) {
    throw new Error(`Error updating task: ${err.message}`);
  }
}

async function markTaskAsDone(taskId) {
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { done: true },
      { new: true }
    );
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (err) {
    throw new Error(`Error marking task as done: ${err.message}`);
  }
}

async function deleteTask(taskId) {
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (err) {
    throw new Error(`Error deleting task: ${err.message}`);
  }
}

const TaskService = {
  createTask,
  deleteTask,
  getTasksByUser,
  getTaskById,
  markTaskAsDone,
  updateTask,
};

module.exports = TaskService;
