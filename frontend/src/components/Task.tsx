import { FormEvent, useContext } from "react";
import { ListItemsContext, ListTasksProps } from "../pages/Index";
import { CheckOne, Delete, Round } from "@icon-park/react";
import { Button } from "./Button";
import api from "../services/api";

interface TaskProps {
  task: ListTasksProps;
}

export function Task({ task }: TaskProps) {
  const { tasks, handleUpdateTasks } = useContext(ListItemsContext);

  function handleChangeStatus(event: FormEvent) {
    const idTaskToChangeStatus = event.currentTarget.getAttribute("data-id");

    const newListTasksWithChangeStatusById: ListTasksProps[] | undefined =
      tasks?.map((task) => {
        if (task.id === idTaskToChangeStatus) {
          const isDone = !task.isDone;

          api.patch(`tasks/${idTaskToChangeStatus}`, { isDone });

          return {
            ...task,
            isDone,
          };
        } else {
          return { ...task };
        }
      });

    handleUpdateTasks(newListTasksWithChangeStatusById);
  }

  function handleDeleteTask(e: FormEvent) {
    e.stopPropagation();

    const idTaskToDelete = task.id;

    const newListTaskWithoutTaskToDelete = tasks?.filter((task) => {
      return task.id !== idTaskToDelete;
    });

    api.delete(`tasks/${idTaskToDelete}`);

    handleUpdateTasks(newListTaskWithoutTaskToDelete);
  }

  return (
    <li
      key={task.id}
      className={`flex items-baseline gap-3 p-4 mb-4 border rounded-md
        transition-all duration-300 cursor-pointer
        ${
          task.isDone
            ? "bg-gray-500 text-gray-300 border-gray-500 line-through"
            : "bg-gray-500 text-gray-100 border-gray-400 hover:bg-gray-400"
        }
      `}
      data-id={task.id}
      onClick={handleChangeStatus}
    >
      <span
        className="w-4 h-4 stroke-blue-600 text-lg
            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
      >
        {task.isDone ? (
          <CheckOne theme="filled" fill="#5E60CE" />
        ) : (
          <Round theme="outline" fill="#8284FA" />
        )}
      </span>

      <span className="w-full">{task.title}</span>

      <Button
        className="text-gray-300 p-2 -mr-2 rounded-sm cursor-pointer transition-all duration-300
          hover:text-red
          focus:outline-none focus:border-red focus:ring-2 focus:ring-red"
        aria-label={`Excluir ${task.title}`}
        onClick={handleDeleteTask}
      >
        <Delete theme="outline" size={12} />
      </Button>
    </li>
  );
}
