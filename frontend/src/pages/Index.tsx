import { createContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { AddTask } from "../components/AddTask";
import { ItemsCounters } from "../components/ItemsCounters";
import { ProgressBarLine } from "../components/ProgressBarLine";
import { Task } from "../components/Task";
import { Empty } from "../components/Empty";
import api from "../services/api";

export interface ListTasksProps {
  id?: string;
  title: string;
  isDone: boolean;
}

interface ListItemsContextType {
  tasks: ListTasksProps[] | undefined;
  handleAddTask: (newTaskToAdd: ListTasksProps) => void;
  handleUpdateTasks: (newListTasks: ListTasksProps[] | undefined) => void;
  totalTasks: number;
  totalTasksCompleted: number;
  percentOfTasksCompleted: number;
}

export const ListItemsContext = createContext({} as ListItemsContextType);

export function Index() {
  const [tasks, setTasks] = useState<ListTasksProps[]>([]);

  useEffect(() => {
    api
      .get("tasks")
      .then((response) => setTasks(response.data))
      .catch((err) => {
        console.error("Ops! ocorreu um erro" + err);
      });
  }, []);

  async function handleAddTask(newListTasksToAdd: ListTasksProps) {
    await api
      .post("tasks", newListTasksToAdd)
      .then((response) => setTasks((tasks) => [response.data, ...tasks]));
  }

  function handleUpdateTasks(newListTasks: ListTasksProps[] | undefined) {
    if (newListTasks) setTasks(newListTasks);
  }

  const totalTasks = tasks.length;
  const totalTasksCompleted = tasks.filter((task) => task.isDone).length;
  const percentOfTasksCompleted = totalTasks
    ? Math.round((totalTasksCompleted / totalTasks) * 100)
    : 0;

  return (
    <div className="w-screen max-w-full min-h-screen bg-gray-600 text-gray-100">
      <Header />

      <div className="max-w-2xl md:m-auto mx-6 pb-4">
        <ListItemsContext.Provider
          value={{
            tasks,
            handleAddTask,
            handleUpdateTasks,
            totalTasks,
            totalTasksCompleted,
            percentOfTasksCompleted,
          }}
        >
          <AddTask />

          <ItemsCounters />
          <ProgressBarLine />

          {totalTasks ? (
            <ul>
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </ListItemsContext.Provider>
      </div>
    </div>
  );
}
