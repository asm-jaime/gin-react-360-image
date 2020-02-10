import React from 'react';
import './App.css';
import ItemList from './ItemList';
import MainMenu from './MainMenu';
import Item360 from './Item360';

import { Store } from './Store';
import {
  ITEM_SET,
  ITEMS_LOAD,
  ITEM_IMAGE_SET,
  API_URL_GET_ITEMS,
  API_URL_GET_IMAGES
} from './Constants';

function App() {
  const { state, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    fetch(API_URL_GET_ITEMS)
      .then(res => res.json())
      .then(data => {
        console.log('data: ', data);
        return data.body.map(e => ({
        name: e.name, size: e.size,
        images: [
          Array.apply(null, {length: e.size}).map(() => ({'image': ''})),
          Array.apply(null, {length: e.size}).map(() => ({'image': ''}))
        ],
      }))})
      .then(items => dispatch({type: ITEMS_LOAD, payload: items}))
      .catch(err => console.log(err));
  }, [dispatch]);

  return (
    <div className="App">
      <MainMenu/>
      <ItemList
        items={state.items}
        set={num => dispatch({type: ITEM_SET, payload: num})}
      />
      <Item360 item={state.items[state.current]} getImage={num => {
        console.log(num);
        const item = state.items[state.current];
        fetch(`${API_URL_GET_IMAGES}/${item.name}/${state.quality}/${num}`)
          .then(res => res.json())
          .then(data => dispatch({
            type: ITEM_IMAGE_SET,
            payload: {index: num, image: data['body']['image']}
          }));
      }}/>
    </div>
  );
}

export default App;
