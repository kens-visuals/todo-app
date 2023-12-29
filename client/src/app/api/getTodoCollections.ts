import axiosInstance from './axiosConfig';

import { TodoCollection } from '../types';

export default async function getTodoCollection(userID: string) {
  try {
    const response = await axiosInstance.get(`/todo-collections/${userID}`);

    return response.data as TodoCollection[];
  } catch (error) {
    console.error('Request Error:', error);
  }
}
