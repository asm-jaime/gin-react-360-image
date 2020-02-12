import React  from 'react';
import PropTypes from 'prop-types';

import './MainMenu.css';

const MenuElement = (props) => {
  return (
    <div className='menu-element'>{props.children}</div>
  );
}

MenuElement.propTypes = {
  children: PropTypes.element.isRequired
};

const MainMenu = () => {
  return (
    <div className='main-menu'>
      <MenuElement>click on an item in the item list</MenuElement>
      <MenuElement>mouse down on the pic and move</MenuElement>
      <MenuElement>mouse down on the pic and scroll</MenuElement>
    </div>
  );
}

export default MainMenu;
