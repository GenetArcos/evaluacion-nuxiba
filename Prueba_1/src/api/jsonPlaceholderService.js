import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jsonPlaceholderService = {
  getUsers: () => apiClient.get('/users'),
  getUserPosts: (userId) => apiClient.get(`/users/${userId}/posts`),
  getPostComments: (postId) => apiClient.get(`/posts/${postId}/comments`),
  getUserTodos: (userId) => apiClient.get(`/users/${userId}/todos`),
  addTodo: (todoData) => apiClient.post('/todos', todoData),
}; 