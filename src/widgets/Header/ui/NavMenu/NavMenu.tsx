import React from 'react';
import cls from './NavMenu.module.scss';
import { Link } from 'react-router-dom';
import { BarsOutlined } from '@ant-design/icons';

export const NavMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <BarsOutlined
        className={cls.burger}
        onClick={() => setOpen(!open)}
        style={{ fontSize: '45px' }}
      />
      <div
        className={open ? `${cls.navmenu} ${cls.navmenu_active}` : cls.navmenu}
      >
        <ul className={cls.menu_items}>
          <li>
            <h2>Menu</h2>
          </li>
          <li onClick={() => setOpen(!open)}>
            <Link to='/'>Home</Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <Link to='/login'>Login</Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <Link to='/signup'>Registration</Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <Link to='/create_club'>Create Club</Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
