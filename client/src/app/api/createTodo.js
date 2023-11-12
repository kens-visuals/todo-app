import axiosInstance from './axiosConfig';

export default async function createTodo(id, text) {
  console.log(id, text);

  try {
    const response = await axiosInstance.post(`/todo-collections/${id}`, {
      todo: { text },
    });

    return response.data;
  } catch (error) {
    console.error('Request Error:', error.message);
    throw error;
  }
}
