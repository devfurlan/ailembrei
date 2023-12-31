import LogoToDo from '../assets/logo-todo.svg';

export function Header() {
  return (
    <header className="bg-gray-700 pt-14 pb-20 flex justify-center">
      <img src={LogoToDo} alt="Logo ToDo" className="w-32"/>
    </header>
  );
}