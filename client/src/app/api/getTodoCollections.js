import axiosInstance from './axiosConfig';

export default async function getTodoCollection(userID) {
  try {
    const response = await axiosInstance.get(`/todo-collections/${userID}`);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error);
  }
}
