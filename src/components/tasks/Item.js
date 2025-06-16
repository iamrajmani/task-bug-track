import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/taskActions';
import TaskForm from './Form';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'in-progress') {
      setIsTimerRunning(true);
    } else if (newStatus === 'pending-approval') {
      setIsTimerRunning(false);
      dispatch(updateTask(task.id, {
        status: newStatus,
        timeSpent
      }));
      return;
    } else if (newStatus === 'closed') {
      dispatch(updateTask(task.id, {
        status: newStatus
      }));
      return;
    } else if (newStatus === 'open') {
      dispatch(updateTask(task.id, {
        status: newStatus,
        timeSpent: 0
      }));
      setTimeSpent(0);
      return;
    }
    dispatch(updateTask(task.id, { status: newStatus }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <TaskForm
          task={task}
          onCancel={() => setIsEditing(false)}
          onSave={(updatedTask) => {
            dispatch(updateTask(task.id, updatedTask));
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <div className="task-header">
            <h4>{task.title}</h4>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <span className={`status ${task.status}`}>{task.status}</span>
          </div>
          <p>{task.description}</p>

          <div className="task-details-row">
            <div className="detail-item">
              <span className="detail-label">Assignee:</span>
              <span>{task.assignee}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Created:</span>
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Due:</span>
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Time Spent:</span>
              <span>
                {formatTime(
                  task.status === 'in-progress'
                    ? timeSpent
                    : task.timeSpent || 0
                )}
              </span>
            </div>
          </div>

          <div className="task-actions">
            {user.role === 'developer' && (
              <>
                {task.status === 'open' && (
                  <button onClick={() => handleStatusChange('in-progress')}>
                    Start Work
                  </button>
                )}
                {task.status === 'in-progress' && (
                  <button onClick={() => handleStatusChange('pending-approval')}>
                    Mark as Resolved
                  </button>
                )}
                {task.status !== 'pending-approval' && task.status !== 'closed' && (
                  <>
                    <button onClick={() => setIsEditing(true)}>
                      <FiEdit /> Edit
                    </button>
                    <button onClick={handleDelete}>
                      <FiTrash2 /> Delete
                    </button>
                  </>
                )}
              </>
            )}

            {user.role === 'manager' && task.status === 'pending-approval' && (
              <>
                <button onClick={() => handleStatusChange('closed')}>
                  Approve
                </button>
                <button onClick={() => handleStatusChange('open')}>
                  Re-open
                </button>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
