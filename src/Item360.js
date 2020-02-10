import React  from 'react';
import PropTypes from 'prop-types';
import './Item360.css';

import { PIXELS_PER_DEG } from './Constants';

const Item360 = (props) => {
  const [state, setState] = React.useState({
    dragging: false,
    prevIndex: 0,
    imageIndex: 0,
    dragStart: 0,
    dragStartIndex: 0
  });

  const handleMouseDown = e => {
    e.persist();
    setState(state => ({ ...state, dragging: true }));
  };

  const handleMouseUp = () => {
    setState(state => ({ ...state, dragging: false }));
  };

  const updateImageIndex = currentPosition => {
    const numImages = props.item.size;
    const pixelsPerImage = PIXELS_PER_DEG * (360 / numImages);
    const { dragStart, imageIndex, dragStartIndex } = state;

    // pixels moved
    const dx = (dragStart - currentPosition) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;
    if (index !== imageIndex) {
      setState(state => ({
        ...state,
        prevIndex: state.imageIndex,
        imageIndex: index
      }));
    }
  };

  const handleMouseMove = e => {
    if (state.dragging) {
      updateImageIndex(e.screenX);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseup', handleMouseUp, false);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove, false);
      document.removeEventListener('mouseup', handleMouseUp, false);
    };
  });


  const preventDragHandler = e => {
    e.preventDefault();
  };

  const renderImage = () => {
    const { prevIndex, imageIndex } = state;
    if(props.item.images[0][imageIndex]['image'] === '') {
      props.getImage(imageIndex);
      return (
        <div className='item360'>
          <img className='react-360-img' alt=''
            src={props.item.images[0][prevIndex]['image']}
          />
        </div>
      );
    }

    // console.log('image: ', props.item.images[0]);
    return (
      <div className='item360'>
        <img className='react-360-img' alt=''
          src={props.item.images[0][imageIndex]['image']}
        />
      </div>
    );
  };

  return (
    <div
      className='react-360-img'
      onMouseDown={handleMouseDown}
      onDragStart={preventDragHandler}
    >
      {renderImage()}
    </div>
  );
}

Item360.propTypes = {
  item: PropTypes.object,
  getImage: PropTypes.func
};

export default Item360;
