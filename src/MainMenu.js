import React  from 'react';

import './MainMenu.css';

import { Store } from './Store';

const MainMenu = () => {
  const { state } = React.useContext(Store);
  return (
    <div className='main-menu'>
      <button onClick={()=>{
        const myjson = JSON.stringify(state, null, 2);
        const x = window.open();
        x.document.open();
        x.document.write('<html><body><pre>' + myjson + '</pre></body></html>');
        x.document.close();
      }}>open</button>
      <div className='menu-element'>click on an item in the item list</div>
      <div className='menu-element'>mouse down on the pic and move</div>
      <div className='menu-element'>mouse down on the pic and scroll</div>
    </div>
  );
}

export default MainMenu;
