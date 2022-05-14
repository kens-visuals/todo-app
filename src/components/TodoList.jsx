import { useState } from 'react';

// components
import TodoItem from './TodoItem';
import ActivityPanel from './ActivityPanel';

export default function TodoList({ todos, dispatch }) {
  const [show, setShow] = useState([
    { all: true, active: false, completed: false },
  ]);

  const allToDos = todos.map((todo, index) => (
    <TodoItem key={todo.id} {...todo} index={index} dispatch={dispatch} />
  ));

  const otherToDos = (isActive) =>
    todos
      .filter((todo) => (isActive ? !todo.completed : todo.completed))
      .map((todo, index) => (
        <TodoItem key={todo.id} {...todo} index={index} dispatch={dispatch} />
      ));

  return (
    <div className="mt-4">
      <ul className="w-full">
        {show.active
          ? otherToDos(true)
          : show.completed
          ? otherToDos(false)
          : allToDos}
      </ul>

      {todos.length > 0 && (
        <ActivityPanel
          todos={todos}
          dispatch={dispatch}
          show={show}
          setShow={setShow}
        />
      )}
    </div>
  );
}
