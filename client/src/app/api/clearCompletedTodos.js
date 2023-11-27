import axiosInstance from './axiosConfig';

export default async function clearCompletedTodos(id) {
  try {
    const response = await axiosInstance.delete(`/todo-collections/${id}/todo`);

    if (response.data) {
      console.log('Todos Cleared:', response.data);
    }

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
  }
}
