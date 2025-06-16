import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FILTER_TASKS
} from './types';

const loadTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const fetchTasks = (userId, role) => dispatch => {
  let tasks = loadTasks();

  if (role === 'developer') {
    tasks = tasks.filter(task => task.assignee === userId);
  }

  dispatch({
    type: FETCH_TASKS,
    payload: tasks
  });
};

export const addTask = (task) => dispatch => {
  const tasks = loadTasks();
  const newTask = {
    ...task,
    id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'open',
    timeSpent: 0
  };

  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);

  dispatch({
    type: ADD_TASK,
    payload: newTask
  });
};

export const updateTask = (taskId, updates) => dispatch => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));

  if (taskIndex !== -1) {
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;
    saveTasks(tasks);

    dispatch({
      type: UPDATE_TASK,
      payload: updatedTask
    });
  }
};

export const deleteTask = (taskId) => dispatch => {
  let tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.id !== parseInt(taskId));
  saveTasks(updatedTasks);

  dispatch({
    type: DELETE_TASK,
    payload: taskId
  });
};

export const filterTasks = (filters) => (dispatch, getState) => {
  const { tasks } = getState().tasks;
  let filteredTasks = [...tasks];

  if (filters.status) {
    filteredTasks = filteredTasks.filter(task => task.status === filters.status);
  }

  if (filters.priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
  }

  dispatch({
    type: FILTER_TASKS,
    payload: filteredTasks
  });
};

