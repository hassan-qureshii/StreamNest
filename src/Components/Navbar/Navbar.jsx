import './Navbar.css';
import logo from '../../assets/logo.png';
import { BiSearch, BiUser } from 'react-icons/bi';
import { MdNotificationsActive, MdOutlineVideoCall, MdOutlineMoreVert } from 'react-icons/md';
import { Avatar, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearchFocus = () => setSearchActive(true);
  const handleSearchBlur = () => setSearchActive(false);

  return (
    <nav className="navbar-container">
      {/* Left: Logo */}
      <div className="nav-left">
        <Link to="/">
          <img src={logo} className="logo" alt="App Logo" />
        </Link>
      </div>

      {/* Middle: Search Box */}
      <div className={`nav-middle ${searchActive ? 'active' : ''}`}>
        <div className="search-box">
          <input
            type="text"
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <BiSearch className="search-icon" />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="nav-right">
        <Tooltip title="Upload video">
          <MdOutlineVideoCall className="icon" />
        </Tooltip>
        <Tooltip title="Notifications">
          <MdNotificationsActive className="icon" />
        </Tooltip>
        <Tooltip title="More options">
          <MdOutlineMoreVert className="icon" />
        </Tooltip>
        <Tooltip title="User profile">
          <Avatar className="avatar" icon={<BiUser />} />
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;