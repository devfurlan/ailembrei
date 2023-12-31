import {useContext} from 'react';
import {ListItemsContext} from '../pages/Index';

export function ItemsCounters() {
  const {totalTasks, totalTasksCompleted} = useContext(ListItemsContext);
  
  return (
    <div className="flex justify-between items-center text-sm font-bold mb-3">
      <div className="text-blue">
        Tarefas criadas
        <span className="bg-gray-400 text-gray-200 text-xs rounded-lg py-0.5 px-2 ml-1.5">
          {totalTasks}
        </span>
      </div>
      
      <div className="text-purple">
        Concluídas
        <span className="bg-gray-400 text-gray-200 text-xs rounded-lg py-0.5 px-2 ml-1.5">
          {totalTasksCompleted && `${totalTasksCompleted} de ${totalTasks}`}
        </span>
      </div>
    </div>
  );
}