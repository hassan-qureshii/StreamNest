import { Layout, Menu, Avatar, Button } from 'antd'
import { HiHome } from 'react-icons/hi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgGames } from 'react-icons/cg'
import { FaCarSide, FaMusic } from 'react-icons/fa'
import { BiTennisBall, BiNews, BiFilm } from 'react-icons/bi'
import { PiTelevision } from 'react-icons/pi'
import { GrTechnology } from 'react-icons/gr'
import { LiaBlogSolid } from 'react-icons/lia'
import { MdPets } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'  

import jack from '../../assets/jack.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'

import { useState } from 'react'
import './Sidebar.css'

const Sidebar = ({ category, setCategory }) => {
  const [collapsed, setCollapsed] = useState(true) 
  const { Sider } = Layout

  // Categories 
  const categories = [
    { key: 'home', label: 'Home', icon: <HiHome />, value: 0 },
    { key: 'games', label: 'Games', icon: <CgGames />, value: 20 },
    { key: 'automobiles', label: 'Automobiles', icon: <FaCarSide />, value: 2 },
    { key: 'sports', label: 'Sports', icon: <BiTennisBall />, value: 17 },
    { key: 'entertainment', label: 'Entertainment', icon: <PiTelevision />, value: 24 },
    { key: 'tech', label: 'Tech', icon: <GrTechnology />, value: 28 },
    { key: 'blogs', label: 'Blogs', icon: <LiaBlogSolid />, value: 22 },
    { key: 'music', label: 'Music', icon: <FaMusic />, value: 10 },
    { key: 'news', label: 'News', icon: <BiNews />, value: 25 },
    { key: 'films', label: 'Films', icon: <BiFilm />, value: 1 },
    { key: 'pets', label: 'Pets & Animals', icon: <MdPets />, value: 15 }
  ]

  // Subscribed users
  const subscribedUsers = [
    { key: 'jack', name: 'Jack', avatar: jack },
    { key: 'simon', name: 'Simon', avatar: simon },
    { key: 'tom', name: 'Tom', avatar: tom },
    { key: 'megan', name: 'Megan', avatar: megan },
    { key: 'cameron', name: 'Cameron', avatar: cameron }
  ]

  return (
    <>
      {/* Toggle Button (Hamburger <-> Cross) */}
      <Button
        className='sidebar-toggle-btn'
        icon={collapsed ? <GiHamburgerMenu /> : <IoMdClose />} 
        onClick={() => setCollapsed(!collapsed)}
      />

      <div className='sidebar-container'>
        <Sider
          className={`sidebar ${collapsed ? 'collapsed' : 'open'}`} 
          collapsed={collapsed}
          collapsedWidth="0"
          trigger={null}
          breakpoint="md"
          onBreakpoint={(broken) => setCollapsed(broken)}
        >
          <Menu mode='inline' selectedKeys={[String(category)]}>
            {categories.map(({ key, label, icon, value }) => (
              <Menu.Item
                key={key}
                icon={icon}
                className={category === value ? 'active' : ''}
                onClick={() => setCategory(value)}
              >
                {!collapsed && label}
              </Menu.Item>
            ))}
          </Menu>

          <hr />

          <div className='subscribed'>
            <Menu mode='vertical' className='sidebar-subscribed'>
              {subscribedUsers.map(({ key, name, avatar }) => (
                <Menu.Item key={key} icon={<Avatar src={avatar} />}>
                  {!collapsed && name}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Sider>
      </div>
    </>
  )
}

export default Sidebar
