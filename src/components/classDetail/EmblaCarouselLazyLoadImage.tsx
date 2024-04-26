import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import style from './embla.module.css';

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

type PropType = {
  imgSrc: string;
  inView: boolean;
  index: number;
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  console.log(hasLoaded ? '로딩완료' : '로딩중');

  return (
    <div className={style.embla__slide}>
      <div className={style.embla__slide__inner}>
        <div className={'embla__lazy-load'.concat(hasLoaded ? ' embla__lazy-load--has-loaded' : '')}>
          {!hasLoaded && <span className="embla__lazy-load__spinner" />}
          <Image
            className="embla__lazy-load__img h-full w-full rounded-md object-cover"
            onLoad={setLoaded}
            src={inView ? imgSrc : PLACEHOLDER_SRC}
            fill={true}
            alt="Your alt text"
            data-src={imgSrc}
          />
        </div>
      </div>
    </div>
  );
};
