const express = require("express");
const TaskService = require("./task.service");
const auth = require("../../middleware/auth");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    const userId = req.params.userId;

    try {
      const tasks = await TaskService.getTasksByUser(userId);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(auth, async (req, res) => {
    const taskData = req.body;

    try {
      const task = await TaskService.createTask(taskData);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router
  .route("/:taskId")
  .get(auth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
      const task = await TaskService.getTaskById(taskId);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .put(auth, async (req, res) => {
    const taskId = req.params.taskId;
    const updateData = req.body;

    try {
      const task = await TaskService.updateTask(taskId, updateData);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .delete(auth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
      const task = await TaskService.deleteTask(taskId);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.put("/:taskId/done", auth, async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await TaskService.markTaskAsDone(taskId);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
