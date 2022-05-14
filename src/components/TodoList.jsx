// components
import TodoItem from './TodoItem';
import ActivityPanel from './ActivityPanel';

export default function TodoList({ todos, dispatch }) {
  const allToDos = todos.map((todo, index) => (
    <TodoItem key={todo.id} {...todo} index={index} dispatch={dispatch} />
  ));

  return (
    <div className="mt-4">
      <ul className="w-full">{allToDos}</ul>

      {todos.length > 0 && <ActivityPanel todos={todos} dispatch={dispatch} />}
    </div>
  );
}
