import React from 'react';
import PropTypes from 'prop-types';

import './ItemList.css';

const ItemList = (props) => {
  return <div className='item-list'>
    <div className='item-list-title'>item list</div>
    {props.items.map((e, num) => {
      if(num === props.selected) {
        return (
          <div
            key={num} className='item-text item-selected'
            onClick={() => props.set(num)}
          >{e.name}</div>
        );
      }
      return (
        <div
          key={num} className='item-text'
          onClick={() => props.set(num)}
        >{e.name}</div>
      );
    }
    )}
  </div>;
};

ItemList.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.number,
  set: PropTypes.func
};

export default ItemList;
