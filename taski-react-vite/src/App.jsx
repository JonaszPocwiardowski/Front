import { useReducer } from 'react';
import './App.css';
import InputComponent from './Components/InputComponent';
import Task from './Models/Task.mjs';
import { ListGroup, Button } from 'flowbite-react';
import { useEffect } from 'react';

const ACTIONS = {
  ADD_TASK: 'add-task',
  REMOVE_TASK: 'remove-task',
  TOGGLE_TASK: 'toggle-task'
};

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...tasks, Task(action.payload)];
    case ACTIONS.REMOVE_TASK:
      return tasks.filter(task => task.id !== action.payload);
    case ACTIONS.TOGGLE_TASK:
      return tasks.map(task =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    default:
      return tasks;
  }
};


const App = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  
  const addNewTask = taskContent => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: taskContent });
    //console.log(tasks.value);
  };
  
  useEffect(() => {
    console.log('Updated tasks:', tasks); 
  }, [tasks]); 
  
  const removeTask = taskID => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: taskID });
  };

  const toggleTaskStatus = taskID => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: taskID });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        To-Do List
      </h1>
      <InputComponent addButtonAction={addNewTask} />
      <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="py-4 px-6 flex justify-between items-center"
          >
            <span
              className={`text-lg ${
                task.done ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.content}
            </span>
            <div className="flex gap-2">
              <Button
                color="success"
                size="xs"
                onClick={() => toggleTaskStatus(task.id)}
              >
                {task.done ? 'Undo' : 'Done'}
              </Button>
              <Button
                color="failure"
                size="xs"
                onClick={() => removeTask(task.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
