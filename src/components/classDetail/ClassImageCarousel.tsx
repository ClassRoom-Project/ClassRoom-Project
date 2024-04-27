'use client';

import { ListDetailClassInfo } from '@/types/class';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import noImage from '../../assets/images/clroom_no_img_purple.png';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import style from './embla.module.css';
import { useCallback, useEffect, useState } from 'react';
import DetailWishButton from './DetailWishButton';
import { LazyLoadImage } from './EmblaCarouselLazyLoadImage';
import { EmblaCarouselType } from 'embla-carousel';

const ClassImageCarousel = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000 })]);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // 로딩 후 emblaApi 초기화
  useEffect(() => {
    if (emblaApi && classData?.image.length !== 0) {
      emblaApi.reInit();
    }
  }, [emblaApi, classData?.image]);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView);
      }
      const inView = emblaApi.slidesInView().filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on('slidesInView', updateSlidesInView);
    emblaApi.on('reInit', updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <div className="relative h-[300px] sm:h-[500px] lg:h-auto lg:w-[40%] lg:min-w-[450px]">
      <div className=" badge absolute right-2 top-3 z-30 h-6 scale-90 opacity-90 md:right-4 md:top-4 md:scale-100">
        <DetailWishButton classId={classData?.class_id} />
      </div>
      <section className={`${style.embla}`}>
        <div className={`${style.embla__viewport} rounded-2xl`} ref={emblaRef}>
          <div className={style.embla__container}>
            {classData && classData.image.length !== 0 ? (
              classData?.image.map((image, index) => (
                <LazyLoadImage key={image} index={index} imgSrc={image} inView={slidesInView.indexOf(index) > -1} />
              ))
            ) : (
              <div className="relative h-full w-full">
                <Image fill className=" h-full w-full rounded-md object-cover" src={noImage} alt="clroom no Image" />
              </div>
            )}
          </div>
          <div className={style.embla__controls}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>

          <div className={style.embla__dots}>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`${style.embla__dot} ${index === selectedIndex ? style.embla__dotSelected : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassImageCarousel;
