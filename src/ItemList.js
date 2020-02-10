import React from 'react';
import PropTypes from 'prop-types';

import './ItemList.css';

const ItemList = (props) => {
  return <div className='item-list'>
    {props.items.map((e, num) => (
      <div
        key={num} className='item-text'
        onClick={() => props.set(num)}
      >{e.name}</div>)
    )}
  </div>;
};

ItemList.propTypes = {
  items: PropTypes.array,
  set: PropTypes.func
};

export default ItemList;
