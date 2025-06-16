import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { FaUserCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Task/Bug Tracker</div>
      {user && (
        <div className="navbar-user">
          <div className="user-container" onClick={toggleDropdown}>
            <div className="user-info">
              <FaUserCircle size={18} />
              <span className="user-name">{user.name} ({user.role})</span>
              {showDropdown ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </div>
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleLogout} className="logout-button">
                <IoLogOutOutline size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;