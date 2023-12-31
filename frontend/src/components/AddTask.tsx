import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ListItemsContext, ListTasksProps } from "../pages/Index";
import { Button } from "./Button";
import { Input } from "./Input";
import { AddOne } from "@icon-park/react";

export function AddTask() {
  const { tasks, handleAddTask } = useContext(ListItemsContext);
  const [newTask, setNewTask] = useState("");

  function handleChangeNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    const newTaskTyping = event.target.value;
    setNewTask(newTaskTyping);

    setTimeout(() => {
      const tasksListFilteredByNewTask = tasks?.filter(
        (task) =>
          task.title.toLowerCase().trim() === newTaskTyping.toLowerCase().trim()
      );
      if (tasksListFilteredByNewTask && tasksListFilteredByNewTask.length > 0) {
        event.target.classList.add("border-red");
        event.target.classList.add("text-red");
        event.target.classList.add("focus:border-red");
        event.target.classList.add("focus:ring-red");

        event.target.classList.remove("text-gray-100");
        event.target.classList.remove("border-gray-700");
        event.target.classList.remove("focus:border-dark-purple");
        event.target.classList.remove("focus:ring-dark-purple");
      } else {
        event.target.classList.remove("border-red");
        event.target.classList.remove("text-red");
        event.target.classList.remove("focus:border-red");
        event.target.classList.remove("focus:ring-red");

        event.target.classList.add("text-gray-100");
        event.target.classList.add("border-gray-700");
        event.target.classList.add("focus:border-dark-purple");
        event.target.classList.add("focus:ring-dark-purple");
      }
    }, 500);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const tasksListFilteredByNewTask = tasks?.filter(
      (task) => task.title.toLowerCase().trim() === newTask.toLowerCase().trim()
    );
    if (
      !newTask ||
      (tasksListFilteredByNewTask && tasksListFilteredByNewTask.length > 0)
    ) {
      return;
    }

    const newTaskToAdd: ListTasksProps = {
      title: newTask,
      isDone: false,
    };

    handleAddTask(newTaskToAdd);
    setNewTask("");
  }

  return (
    <form
      onSubmit={handleCreateNewTask}
      className="flex justify-center gap-2 mb-16 -mt-8"
    >
      <Input
        className="w-full p-4 bg-gray-500 text-gray-100 border border-gray-700 rounded-lg shadow
          placeholder-gray-300
          focus:outline-none focus:border-dark-purple focus:ring-2 focus:ring-dark-purple"
        type="text"
        value={newTask}
        placeholder="Digite uma tarefa"
        onChange={handleChangeNewTaskChange}
      />

      <Button
        type="submit"
        className="p-4 bg-dark-blue text-gray-100 rounded-lg border-none flex items-center gap-1.5
            transition-all duration-300
            hover:bg-blue
            focus:outline-none focus:boring-gray-100 focus:ring-4 focus:ring-gray-100"
      >
        <strong className="text-sm">Criar</strong>
        <AddOne theme="outline" title="Adicionar item" />
      </Button>
    </form>
  );
}
