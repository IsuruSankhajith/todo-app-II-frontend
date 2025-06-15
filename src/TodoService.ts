import axios from 'axios';
import type { TodoTypes } from './todo';

const TodoService = {
  //////// Get Todos from Backend ////////
  getTodos: async (): Promise<TodoTypes[]> => {
    try {
      const response = await axios.get<TodoTypes[]>('http://localhost:8080/api/todos');
      return response.data ?? [];
    } catch (error) {
      console.error("Failed to fetch todos", error);
      return [];
    }
  },

  //////// Add Todo ////////
  addTodos: async (text: string): Promise<TodoTypes | null> => {
    try {
      const newTodo = { title: text, completed: false };
      const response = await axios.post<TodoTypes>('http://localhost:8080/api/todos', newTodo);
      return response.data;
    } catch (error) {
      console.error('Failed to add todo', error);
      return null;
    }
  },

  //////// Update Todo ////////
  updateTodo: async (id: number, updatedData: Partial<TodoTypes>): Promise<TodoTypes | null> => {
    try {
      const response = await axios.put<TodoTypes>(`http://localhost:8080/api/todos/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update todo with id ${id}`, error);
      return null;
    }
  },

  //////// Delete Todo ////////
  deleteTodo: async (id: number): Promise<boolean> => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete todo with id ${id}`, error);
      return false;
    }
  }
};

export default TodoService;
