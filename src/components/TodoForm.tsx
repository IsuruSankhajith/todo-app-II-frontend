import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import TodoService from '../TodoService';
import type { TodoTypes } from '../todo';
import "../CSS/TodoForm.css" 


interface PropTypes {
  setTods: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTods }) => {
  const [newTodoText, setNewTodoText] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = TodoService.addTodos(newTodoText); 
      setTods(prevTodos => [
        ...prevTodos,
        ...(Array.isArray(newTodo) ? newTodo : [newTodo])
      ]);
      setNewTodoText('');
    }
  };
 
  return (
    <div className='inputform'>
      <input  
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>  
  );
};

export default TodoForm;
