import React from 'react';
import {LuCheck} from "react-icons/lu";
import clsx from "clsx";

interface MediaGalleryProps {
  data: any[];
  selected: any | null;
  onSelect: (image: any) => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({data, selected, onSelect}) => {
  return (
    <div className="media-gallery">
      {data.map((image, index) => (
        <div
          key={image.id || index}
          className={clsx('media-item', {
            'media-item--selected': selected?.id === image?.id,
            'media-item--uploading': !Boolean(image?.id)
          })}
          onClick={() => onSelect(image)}
        >
          {image?.id && <div className="media-item__checkbox">
            {selected?.id === image.id && <LuCheck aria-hidden="true"/>}
          </div>}

          <div className="media-item__image-wrapper">
            <img src={image.url} alt={image.display_name}/>
          </div>

          <div className="media-item__info">
            <div className="media-item__name">{image.display_name}</div>
            <div className="media-item__details">
              <span>{image.format.toUpperCase()}</span>
              <span> • </span>
              <span>{image?.width} x {image?.height}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;

