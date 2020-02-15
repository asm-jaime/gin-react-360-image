import React from 'react';
import './App.css';
import ItemList from './ItemList';
import MainMenu from './MainMenu';
import Item360 from './Item360';

import { Store } from './Store';
import {
  STATE_LOAD,
  ITEM_SET,
  ITEMS_LOAD,
  ITEM_IMAGE_SET,
  API_URL_GET_ITEMS,
  API_URL_GET_IMAGES,
  URL_DATA_TEST
} from './Constants';

function App() {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    fetch(API_URL_GET_ITEMS)
      .then(res => res.json())
      .then(data => data.body.map(e => ({
        name: e.name, size: e.size, quality: 0, qualitysize: e.qualitysize,
        images: Array.apply(null, {length: e.qualitysize}).map(() =>
          Array.apply(null, {length: e.size}).map(() => ({'image': ''}))
        ),
      })))
      .then(items => {
        dispatch({type: ITEMS_LOAD, payload: items});
      })
      .catch(() => {
        fetch(`${URL_DATA_TEST}`)
          .then(res => res.json())
          .then(data => dispatch({type: STATE_LOAD, payload: data}))
          .catch(console.log);
      });
  }, [dispatch]);

  const fetchImage = (num, quality) => {
    const item = state.items[state.current];

    return fetch(`${API_URL_GET_IMAGES}/${item.name}/${quality}/${num}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: ITEM_IMAGE_SET,
          payload: {index: num, quality: quality, image: data['body']['image']}
        });
        return data['body']['image'];
      });
  };

  const getImage = (num, quality) => {

    const item = state.items[state.current];
    if(num > item.size - 1) {
      num = item.size - 1;
    }
    if(quality > item.qualitysize - 1){
      quality = item.qualitysize - 1;
    }

    if(item['images'][quality][num]['image'] === '') {
      return fetchImage(num, quality);
    } else {
      return new Promise((resolve) => {
        resolve(item['images'][quality][num]['image']);
      });
    }
  };

  return (
    <div className="App">
      <MainMenu/>
      <ItemList
        selected={state.current}
        items={state.items}
        set={num => dispatch({type: ITEM_SET, payload: num})}
      />
      <Item360 item={state.items[state.current]} getImage={getImage}/>
    </div>
  );
}

export default App;
