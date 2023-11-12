import axiosInstance from './axiosConfig';

export default async function signup(email, password) {
  try {
    const response = await axiosInstance.post('/login', { email, password });

    console.log('response.data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error.message);
    throw error;
  }
}
