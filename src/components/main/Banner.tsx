import Image from 'next/image';
import banner1 from '@/assets/images/배너 디자인 6.png';
import banner2 from '@/assets/images/배너 디자인 7.png';
import banner3 from '@/assets/images/배너 디자인 8.png';

export const Banner = () => {
  return (
    <>
      <div className="carousel w-[85vw] h-[40vh]">
        <div id="slide1" className="carousel-item relative w-full">
          <Image src={banner1} alt="banner" className="w-full" fill unoptimized={true} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Image src={banner2} alt="banner" className="w-full" fill unoptimized={true} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Image src={banner3} alt="banner" className="w-full" fill unoptimized={true} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
