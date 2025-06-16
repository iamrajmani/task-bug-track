import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterTasks } from '../../actions/taskActions';

const FilterControls = () => {
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    dispatch(filterTasks(newFilters));
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      priority: ''
    });
    dispatch(filterTasks({}));
  };

  return (
    <div className="filter-controls">
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
      >
        <option value="">All Statuses</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="pending-approval">Pending Approval</option>
        <option value="closed">Closed</option>
      </select>
      
      <select
        name="priority"
        value={filters.priority}
        onChange={handleFilterChange}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
};

export default FilterControls;