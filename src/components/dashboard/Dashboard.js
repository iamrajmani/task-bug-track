import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, addTask } from '../../actions/taskActions';
import TaskList from './TaskList';
import TaskChart from './Chart';
import FilterControls from '../ui/FilterControls';
import TaskForm from '../tasks/Form';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { tasks } = useSelector(state => state.tasks);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      dispatch(fetchTasks(user.id, user.role));
    }
  }, [dispatch, isAuthenticated, navigate, user]);

  const handleCreateTask = (taskData) => {
    const taskWithAssignee = {
      ...taskData,
      assignee: user.id
    };
    dispatch(addTask(taskWithAssignee));
    setShowForm(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h2>Welcome, {user.name}</h2>
        <p>Role: {user.role}</p>

        <FilterControls />

        <div className="task-header-row">
          <h3 className="task-title">Your Tasks</h3>
          {user.role === 'developer' && (
            <button className="create-task-btn" onClick={() => setShowForm(true)}>
              <span className="plus-icon">+</span> Create Task
            </button>
          )}
        </div>

        <div className="dashboard-grid">
          <div className="task-list-container">
            <TaskList tasks={tasks} />
          </div>
          <div className="task-chart-container">
            <TaskChart tasks={tasks} />
          </div>
        </div>

        {showForm && (
          <div className="form-modal-overlay">
            <div className="form-modal">
              <button
                className="close-modal-btn"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
              <TaskForm onSave={handleCreateTask} onCancel={() => setShowForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

