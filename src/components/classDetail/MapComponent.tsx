import { useDetailClassInfoStore } from '@/store/classInfoStore';
import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapComponent = () => {
  const { classInfo } = useDetailClassInfoStore();
  console.log('classInfo', classInfo);

  // 클래스 위치 주소
  const classLocation = classInfo?.location;
  // 2. 상세주소 -> 위도 경도로 바꾸기
  const lat = 33.5563;
  const lng = 126.79581;
  return (
    <div>
      <Map
        className="w-[400px] h-[300px] m-4" // 지도 크기
        center={{ lat, lng }} // 지도의 중심 좌표
        level={3} // 지도 확대 레벨
      >
        <MapMarker position={{ lat, lng }} />
      </Map>
      <p>
        주소 : {classLocation} {classInfo?.detail_location}
      </p>
    </div>
  );
};

export default MapComponent;
