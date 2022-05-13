// components
import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  console.log(todos);

  return (
    <div className="mt-4">
      <ul className="w-full">
        {todos.map((todo, index) => (
          <TodoItem key={todo.id} {...todo} index={index} />
        ))}
      </ul>
    </div>
  );
}
