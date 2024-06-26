'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
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

  return (
    <div className={style.embla__slide}>
      <div className={style.embla__slide__inner}>
        {/* concat으로 이미지가 로드됐을 때 embla__lazyLoadHasLoaded 클래스를 추가 */}
        <div className={`${style.embla__lazyLoad}`.concat(hasLoaded ? ` ${style.embla__lazyLoadHasLoaded}` : '')}>
          {!hasLoaded && <span className={`${style.embla__lazyLoad__spinner}`} />}
          <div className={`${style.embla__lazyLoad__img} h-full w-full rounded-md`}>
            <Image
              onLoad={setLoaded}
              src={inView ? imgSrc : PLACEHOLDER_SRC}
              fill={true}
              alt="class Detail Image"
              data-src={imgSrc}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
