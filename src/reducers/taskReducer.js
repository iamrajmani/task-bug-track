  import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FILTER_TASKS
} from '../actions/types';

const loadTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  tasks: loadTasks(),
  filteredTasks: loadTasks(),
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
        filteredTasks: action.payload
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        filteredTasks: [...state.filteredTasks, action.payload]
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        filteredTasks: state.filteredTasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        filteredTasks: state.filteredTasks.filter(task => task.id !== action.payload)
      };
    case FILTER_TASKS:
      return {
        ...state,
        filteredTasks: action.payload
      };
    default:
      return state;
  }
}
