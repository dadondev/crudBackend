import express from "express";
import { v4 as uuid } from "uuid";
import { toJson } from "./functions/functions.js";
const app = express();
const PORT = 8080;

let todos = [];
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send(todos);
});

app.post("/", (req, res) => {
  const newTodo = {
    text: req.body.text,
    completed: false,
    id: uuid(),
  };
  todos.push(newTodo);
  res.status(200).send(toJson(newTodo));
});

app.delete("/:id", ({ params: { id } }, res) => {
  const STodo = todos.find((e) => e.id === id);
  if (STodo.text) {
    todos = todos.filter((e) => e.id !== id);
    res.status(200).send("The todo was deleted");
  } else {
    res.send("The todo is not defined");
  }
});

app.put("/:id", ({ params: { id }, body }, res) => {
  const oldTodo = todos.find((e) => e.id === id);
  console.log(id);
  if (oldTodo) {
    todos = [
      ...todos.filter((e) => e.id !== id),
      {
        text: body.text !== undefined ? body.text : oldTodo.text,
        id: oldTodo.id,
        completed:
          body.completed !== undefined ? body.completed : oldTodo.completed,
      },
    ];
    res.status(200).send("The todo was edited !");
  } else {
    res.status(404).send("The todo is not defined");
  }
});

app.listen(PORT, () => {
  console.log("server is working");
});
