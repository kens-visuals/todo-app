import axiosInstance from './axiosConfig';

export default async function updateTodo(todo) {
  try {
    const response = await axiosInstance.put(`/todos/${todo?._id}`, {
      text: todo.text,
      completed: todo.completed,
    });

    console.log('Todo Completed:', response.data);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
    throw error;
  }
}
