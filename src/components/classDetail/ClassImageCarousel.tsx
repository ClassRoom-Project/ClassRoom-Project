'use client';

import { ListDetailClassInfo } from '@/types/class';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import noImage from '../../assets/images/clroom_no_img_purple.png';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import './embla.css';

const ClassImageAndSummary = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000 })]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="w-[50%]  ">
      <section className="embla">
        <div className="embla__viewport rounded-2xl" ref={emblaRef}>
          <div className="embla__container">
            {classData && classData.image.length !== 0 ? (
              classData?.image.map((image, index) => (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    <Image
                      fill={true}
                      className="embla-slide-img h-full w-full rounded-md object-cover"
                      src={image}
                      alt={classData.title}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="relative h-full w-full">
                <Image
                  fill
                  className="embla-slide-img h-full w-full rounded-md object-cover"
                  src={noImage}
                  alt="clroom no Image"
                />
              </div>
            )}
          </div>
          <div className="embla__controls">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassImageAndSummary;