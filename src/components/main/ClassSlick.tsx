import { SlickArrowProps } from '@/types/reactSlick';

export const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 4000,
  cssEase: 'linear',
  centerMode: true,
  centerPadding: '60px',
  responsive: [
    {
      breakpoint: 1980,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: '30px'
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '30px'
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: '30px'
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '30px'
      }
    }
  ]
};
