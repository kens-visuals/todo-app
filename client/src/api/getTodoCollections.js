import axiosInstance from './axiosConfig';

export default async function getTodoCollection() {
  try {
    const response = await axiosInstance.get('/todo-collections');

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
  }
}
