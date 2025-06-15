import React, { useEffect, useState } from 'react';
import type { TodoTypes } from '../todo';
import TodoService from '../TodoService';
import { FaEdit, FaCheck } from "react-icons/fa";
import TodoForm from './TodoForm';
import { GiCancel } from "react-icons/gi";
import { RiDeleteBinFill } from 'react-icons/ri';
import "../CSS/TodoList.css" // 

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const todoList = await TodoService.getTodos(); 
      setTodos(todoList); 
    };

    fetchTodos(); 
  }, []);

  const handleEditStart = (id: number, text: string) => {
    setEditingTodo(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditingTodo(null);
    setEditedTodoText('');
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== '') {
      const updatedTodos = TodoService.updateTodo(id, {
        title: editedTodoText,
        completed: false,
      });

      setTodos(updatedTodos);
      setEditingTodo(null);
      setEditedTodoText('');
    }
  };

  //Function to handle deleting a todo
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTods={setTodos} /> {/* Make sure prop name matches TodoForm */}
      </div>

      {todos.map((todo) => (
        <div className="items" key={todo.id}>
          {editingTodo === todo.id ? (
            <div className="editedText">
              <input
                type="text"
                value={editedTodoText}
                onChange={(e) => setEditedTodoText(e.target.value)}
                autoFocus = {true} 
              />
              <button onClick={() => handleEditSave(todo.id)}>
                <FaCheck />
              </button>
              <button className='cancelBtn' onClick={handleEditCancel}>Cancel</button>
              <GiCancel />
            </div>
          ) : (
            <div className="editBtn">
              <span>{todo.title}</span>
              <button onClick={() => handleEditStart(todo.id, todo.title)}>
                <FaEdit />
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          )}
          <button onClick={() => handleDeleteTodo(todo.id)}>
            <RiDeleteBinFill />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
