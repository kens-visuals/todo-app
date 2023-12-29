export type Todo = {
  _id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TodoCollection = {
  _id: string;
  title: string;
  todos: Todo[];
  userID: string;
};
