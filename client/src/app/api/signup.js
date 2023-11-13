import axiosInstance from './axiosConfig';

export default async function signup(user) {
  try {
    const response = await axiosInstance.post('/signup', user);

    console.log('response.data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Request Error:', error.message);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data?.error);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);

      // Assuming the error message is in the response data
      const errorMessage = error.response.data?.error;

      // Now you can use the errorMessage to show it to the user
      // For example, you can display it in a notification or an alert
      throw `Error: ${errorMessage}`;
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error during request setup:', error.message);
    }

    throw error; // Re-throw the error to allow higher-level error handling
  }
}
