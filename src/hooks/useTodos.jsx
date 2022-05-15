export const ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  COMPLETE: 'complete',
  EDIT: 'edit',
  CLEAR: 'clear_completed',
};

export default function todosReducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD: {
      if (!payload.task) return todos;

      return [
        ...todos,
        { id: payload.id, todo: payload.task, completed: payload.completed },
      ];
    }
    case ACTIONS.REMOVE: {
      return todos.filter((todo) => todo.id !== payload.id);
    }
    case ACTIONS.COMPLETE: {
      return todos.map((todo) =>
        todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    }
    case ACTIONS.EDIT: {
      if (!payload.updatedTodo) return todos;

      return todos.map((todo) =>
        todo.id === payload.id ? { ...todo, todo: payload.updatedTodo } : todo
      );
    }
    case ACTIONS.CLEAR: {
      return todos.filter((todo) => !todo.completed);
    }

    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}
