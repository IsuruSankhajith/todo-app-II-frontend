import type { TodoTypes } from './todo';

const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {
  getTodos: (): TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todoStr ? JSON.parse(todoStr) : [];
  },

  addTodos: (text: string): TodoTypes[] => {
    const todos = TodoService.getTodos();
    const newTodo: TodoTypes = {
      id: Date.now(),
      text,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return updatedTodos;
  },

  updateTodo: (id: number, updatedData: Partial<TodoTypes>): TodoTypes[] => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedData } : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return updatedTodos;
  },

  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  }
};

export default TodoService;
