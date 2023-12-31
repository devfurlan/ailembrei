import {useContext} from 'react';
import {ListItemsContext} from '../pages/Index';

export function ProgressBarLine() {
  const {percentOfTasksCompleted} = useContext(ListItemsContext);
  
  return (
    <div className="w-full bg-gray-400 h-1 rounded-lg mb-6">
      <div className="bg-purple h-1 rounded-lg"
           style={{width: `${percentOfTasksCompleted}%`, transition: 'width 0.5s linear'}}></div>
    </div>
  );
}