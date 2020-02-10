import React from 'react';
import PropTypes from 'prop-types';

import {
  ITEM_SET,
  ITEMS_LOAD,
  ITEM_IMAGE_SET
} from './Constants.js';

export const Store = React.createContext();

const initialState = {
  current: 0,
  quality: 0,
  items: [{
    name: 'empty',
    size: 1,
    images: [[{'image': './empty.jpg'}], [{'image': './empty.jpg'}]]
  }]
};

function imager(state, action) {
    console.log('action: ', action);
    console.log('state: ', state);

    switch (action.type) {
      case ITEM_SET: {
        return {...state, current: action.payload};
      }
      case ITEM_IMAGE_SET: {
        const items_new = state.items.slice()
        const images_new = items_new[state.current]['images'].slice();
        images_new[state.quality][action.payload.index]['image'] = action.payload.image;
        items_new[state.current]['images'] = images_new;
        return { ...state, items_new};
      }
      case ITEMS_LOAD: {
        return {...state, items: action.payload};
      }
      default: {
        return state;
      }
    }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(imager, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.object
};
