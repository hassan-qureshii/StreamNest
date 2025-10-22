import { Layout, Menu, Button, Dropdown } from "antd";
import { HiHome } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { CgGames } from "react-icons/cg";
import { FaCarSide, FaMusic } from "react-icons/fa";
import { BiTennisBall, BiNews, BiFilm } from "react-icons/bi";
import { PiTelevision } from "react-icons/pi";
import { GrTechnology } from "react-icons/gr";
import { LiaBlogSolid } from "react-icons/lia";
import { MdPets } from "react-icons/md";
import "./Sidebar.css";
import { useState, useEffect } from "react";

const Sidebar = ({ category, setCategory }) => {
  const { Sider } = Layout;
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Categories
  const categories = [
    { key: "home", label: "Home", icon: <HiHome />, value: 0 },
    { key: "games", label: "Games", icon: <CgGames />, value: 20 },
    { key: "automobiles", label: "Automobiles", icon: <FaCarSide />, value: 2 },
    { key: "sports", label: "Sports", icon: <BiTennisBall />, value: 17 },
    { key: "entertainment", label: "Entertainment", icon: <PiTelevision />, value: 24 },
    { key: "tech", label: "Tech", icon: <GrTechnology />, value: 28 },
    { key: "blogs", label: "Blogs", icon: <LiaBlogSolid />, value: 22 },
    { key: "music", label: "Music", icon: <FaMusic />, value: 10 },
    { key: "news", label: "News", icon: <BiNews />, value: 25 },
    { key: "films", label: "Films", icon: <BiFilm />, value: 1 },
    { key: "pets", label: "Pets & Animals", icon: <MdPets />, value: 15 },
  ];

  // ✅ Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setMenuOpen(false); // Close dropdown on resize
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Menu items (used in sidebar & dropdown)
  const menuItems = categories.map(({ key, label, icon, value }) => ({
    key,
    label: (
      <div
        className={`menu-item ${category === value ? "active" : ""}`}
        onClick={() => {
          setCategory(value);
          setMenuOpen(false); // Close dropdown when clicking a menu item
        }}
      >
        <span className="icon">{icon}</span> {label}
      </div>
    ),
  }));

  return (
    <>
      {/* ✅ Mobile: Dropdown Menu */}
      {isMobile ? (
        <div className="mobile-menu">
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomLeft"
            open={menuOpen}
            onOpenChange={(open) => setMenuOpen(open)}
          >
            <Button
              className="sidebar-toggle-btn"
              icon={menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </Dropdown>
        </div>
      ) : (
        /* ✅ Desktop: Fixed Sidebar */
        <div className="sidebar-container">
          <Sider
            className="sidebar"
            collapsedWidth="0"
            trigger={null}
            breakpoint="md"
          >
            <Menu
              mode="inline"
              selectedKeys={[String(category)]}
              items={menuItems}
            />
          </Sider>
        </div>
      )}
    </>
  );
};

export default Sidebar;
