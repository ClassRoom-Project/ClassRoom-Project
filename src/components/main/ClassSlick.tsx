import { SlickArrowProps } from '@/types/reactSlick';

function SampleNextArrow(props: SlickArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: '20px',
        height: '20px',
        display: 'block',
        borderRadius: '50%',
        background: 'black'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: SlickArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: '20px',
        height: '20px',
        display: 'block',
        borderRadius: '50%',
        background: 'black'
      }}
      onClick={onClick}
    />
  );
}

export const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 4000,
  cssEase: 'linear',
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};
