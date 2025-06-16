import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from '../tasks/Item';

const TaskList = () => {
  const { filteredTasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

  return (
    <div className="task-list">
      <h3>{user.role === 'manager' ? 'All Tasks' : 'Your Tasks'}</h3>
      {filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList; 