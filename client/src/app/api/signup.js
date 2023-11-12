import axiosInstance from './axiosConfig';

export default async function signup(user) {
  try {
    const response = await axiosInstance.post('/signup', user);

    console.log('response.data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error.message);
    throw error;
  }
}
