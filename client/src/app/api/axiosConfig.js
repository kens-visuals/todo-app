import axios from 'axios';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTY5NzMzMDE3OX0.PGGn4q_n0Jr8rcjSNY0ALxpUqHNHU75UoWn4E0f4K70';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 1000,
  headers: { Authorization: token, 'Content-Type': 'application/json' },
});

export default axiosInstance;
