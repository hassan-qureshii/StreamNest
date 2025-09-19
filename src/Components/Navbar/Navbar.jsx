import './Navbar.css';
import logo from '../../assets/logo.png';
import { BiSearch, BiBell, BiUser } from 'react-icons/bi';
import { FaUpload } from 'react-icons/fa';
import { CgMore } from 'react-icons/cg';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex-div'>
      {/* Left: Logo */}
      <div className='nav-left flex-div'>
        <Link to='/'><img src={logo} className='logo' alt='App Logo' /></Link>
      </div>

      {/* Middle: Search */}
      <div className='nav-middle flex-div'>
        <div className='search-box flex-div'>
          <input type='text' placeholder='Search' />
          <BiSearch className='search-icon' />
        </div>
      </div>

      {/* Right: Icons */}
      <div className='nav-right flex-div'>
        <CgMore className='icon' />
        <BiBell className='icon' />
        <FaUpload className='icon' />
        <Avatar className='avatar' icon={<BiUser />} />
      </div>
    </nav>
  );
};

export default Navbar;
