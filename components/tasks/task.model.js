const { Schema, model } = require("mongoose");
const User = require("../users/user.model");

const taskSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  done: { type: Boolean },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = model("Task", taskSchema);
module.exports = Task;
