import axiosInstance from './axiosConfig';

export default async function deleteTodoCollection(id) {
  try {
    const response = await axiosInstance.delete(`/todo-collections/${id}`);

    console.log('Todo Collection Removed:', response.data);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
  }
}
