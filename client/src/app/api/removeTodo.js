import axiosInstance from './axiosConfig';

export default async function removeTodo(id, todoID) {
  try {
    const response = await axiosInstance.delete(
      `/todo-collections/${id}/todo/${todoID}`,
      { data: { todoID } }
    );

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
    throw error;
  }
}
