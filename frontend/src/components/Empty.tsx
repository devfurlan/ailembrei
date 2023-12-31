import {Clipboard} from '@icon-park/react';

export function Empty() {
  return (
    <div className="flex flex-col items-center my-14 text-gray-300">
      <Clipboard theme="filled" size="56" fill="#333" className="mb-4"/>
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}