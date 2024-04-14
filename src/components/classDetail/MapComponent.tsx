import { useDetailClassInfoStore } from '@/store/classInfoStore';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapComponent = () => {
  const { classInfo } = useDetailClassInfoStore();

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const classLocation = classInfo?.location;
  const placeAddress = classLocation || null;

  useEffect(() => {
    const fetchData = async () => {
      if (!placeAddress) return;

      const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(placeAddress)}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY}`
          }
        });

        if (!response.ok) {
          throw new Error('Kakao API 요청 실패');
        }

        const data = await response.json();

        const fetchLongitue = data.documents[0].x; // 경도
        const fetchLatitude = data.documents[0].y; // 위도
        setLatitude(fetchLatitude);
        setLongitude(fetchLongitue);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [placeAddress]);
  // console.log('latitude', latitude);
  // console.log('longitude', longitude);

  return (
    <div className="flex justify-center items-center w-[400px] h-[300px] m-10">
      {classLocation ? (
        <div>
          <Map
            className="w-[400px] h-[300px] m-4 p-4" // 지도 크기
            center={{ lat: latitude ?? 0, lng: longitude ?? 0 }} // 지도의 중심 좌표
            level={3} // 지도 확대 레벨
          >
            <MapMarker position={{ lat: latitude ?? 0, lng: longitude ?? 0 }} />
          </Map>
          <p className="m-4">
            주소 : {classLocation} {classInfo?.detail_location}
          </p>
        </div>
      ) : (
        <p>등록된 주소가 없습니다.</p>
      )}
    </div>
  );
};

export default MapComponent;
