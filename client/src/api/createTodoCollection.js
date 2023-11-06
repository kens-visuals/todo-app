import axiosInstance from './axiosConfig';

export default async function createTodoCollection(title) {
  try {
    const response = await axiosInstance.post('/todo-collections', {
      title,
    });

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
  }
}
