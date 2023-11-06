import axiosInstance from './axiosConfig';

export default async function createTodo(id, todo) {
  console.log('createTodo:', id, todo);
  try {
    const response = await axiosInstance.post(`/todo-collections/${id}`, {
      todo: { text: todo.text },
    });

    console.log('Todo Added:', response.data);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error.message);
    throw error;
  }
}
