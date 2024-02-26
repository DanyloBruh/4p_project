/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Blurhash } from 'react-blurhash';
import React, { useState, useEffect } from 'react';

export default function ImageComponent({
  src,
  alt,
  hash,
  height,
  width,
  className = '',
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <div
        className={
          width === '100%'
            ? height === 410
              ? 'position-absolute'
              : ''
            : 'position-absolute'
        }
        style={{
          width,
          display: imageLoaded ? 'none' : 'inline',
          left: '0px',
        }}
      >
        <Blurhash
          hash={hash}
          width={width}
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ display: !imageLoaded ? 'none' : 'inline' }}
      />
    </>
  );
}
