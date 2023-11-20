import axiosInstance from './axiosConfig';

export default async function createTodoCollection(title, userID) {
  try {
    const response = await axiosInstance.post('/todo-collections', {
      title,
      userID,
    });

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
  }
}
