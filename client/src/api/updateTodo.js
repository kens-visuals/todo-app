import axiosInstance from './axiosConfig';

export default async function updateTodo(id, todoID, todo) {
  try {
    const response = await axiosInstance.put(
      `/todo-collections/${id}/todo/${todoID}`,
      {
        text: todo?.text,
        completed: todo?.completed,
      }
    );

    console.log('Todo Updated:', response.data);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
    throw error;
  }
}
