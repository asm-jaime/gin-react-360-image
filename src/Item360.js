import React  from 'react';
import PropTypes from 'prop-types';
import './Item360.css';

import { PIXELS_PER_DEG } from './Constants';

const Item360 = (props) => {
  const [drag, setDrag] = React.useState({start: 0, startIndex: 0});
  const [dragging, setDragging] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [quality, setQuality] = React.useState(0);

  const [image, setImage] = React.useState('./loading.gif');

  const handleMouseWheel = e => {
    e.preventDefault();

    if(e.deltaY < 0 && quality < props.item.qualitysize - 1) {
      setQuality(quality + 1);
      props.getImage(imageIndex, quality).then(setImage);
    } else if (e.deltaY > 0 && quality > 0) {
      setQuality(quality - 1);
      props.getImage(imageIndex, quality).then(setImage);
    }
  };

  const handleMouseDown = e => {
    e.persist();
    setDragging(true);
    setDrag({start: e.screenX, startIndex: imageIndex});
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const updateImageIndex = currentPosition => {
    const numImages = props.item.size;
    const pixelsPerImage = PIXELS_PER_DEG * (360 / numImages);

    // pixels moved
    const dx = (drag.start - currentPosition) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + drag.startIndex) % numImages;

    if (index !== imageIndex) {
      setImageIndex(index);
      props.getImage(imageIndex, quality).then(setImage);
    }
  };

  const handleMouseMove = e => {
    if (dragging) {
      updateImageIndex(e.screenX);
    }
  };

  React.useEffect(() => {
    props.getImage(imageIndex, quality).then(setImage);
  }, [props.getImage, props, imageIndex, quality]);

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseup', handleMouseUp, false);
    document.getElementById('item360').addEventListener('wheel', handleMouseWheel, false);
    return () => {
      document.getElementById('item360')
        .removeEventListener('wheel', handleMouseWheel, false);
      document.removeEventListener('mousemove', handleMouseMove, false);
      document.removeEventListener('mouseup', handleMouseUp, false);
    };
  });

  const preventDragHandler = e => {
    e.preventDefault();
  };

  return (
    <div className='item360'>
      <div className='item360-quality'>quality: {quality}</div>
      <div className='image-container'
        onMouseDown={handleMouseDown}
        onDragStart={preventDragHandler}
        id='item360'
      >
        <img className='image-360' alt='' src={image} />
      </div>
    </div>
  );
}

Item360.propTypes = {
  item: PropTypes.object,
  getImage: PropTypes.func
};

export default Item360;
